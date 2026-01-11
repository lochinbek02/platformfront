import React, { useState, useEffect } from 'react';
import axiosInstance, { getVideoUrl } from '../../axiosInstance/axiosInstance';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaCalculator, FaVideo } from 'react-icons/fa';
import './Theme.css';
import videoFile1 from '../../../public/videos/1_sonli_ketma_ketlik/1_.mp4';

function Theme2() {
  const [epsilon, setEpsilon] = useState('');
  const [xEnd, setXEnd] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Default videolar uchun state
  const [defaultVideos, setDefaultVideos] = useState([]);
  const [loadingDefaults, setLoadingDefaults] = useState(true);

  // Default videolarni API dan olish
  useEffect(() => {
    const fetchDefaultVideos = async () => {
      try {
        const response = await axiosInstance.get('custom-plot-default-video/');
        setDefaultVideos(response.data);
      } catch (error) {
        console.error('Default videolarni yuklashda xatolik:', error);
      } finally {
        setLoadingDefaults(false);
      }
    };

    fetchDefaultVideos();
  }, []);

  const handleEpsilonChange = (event) => {
    setEpsilon(event.target.value);
  };

  const handleXEndChange = (event) => {
    setXEnd(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setVideoUrl('');
    try {
      const response = await axiosInstance.post('create_custom_plot_video/', {
        epsilon: parseFloat(epsilon),
        x_end: parseFloat(xEnd)
      });

      if (response.data.video_path) {
        setVideoUrl(response.data.video_path);
      } else {
        console.error('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="detailed-view theme-study-view">
        <Link to="/models" className="back-btn">
          <FaArrowLeft /> Orqaga
        </Link>

        <div className="article-header">
          <h1 className="article-title">Sonli ketma-ketlik limitini ta'rif yordamida ko'rsatish</h1>
          <p className="article-intro">
            Ushbu amaliyotda ixtiyoriy musbat epsilon sonni va ketma-ketlikning nechta hadi ko'rsatilishini kiriting.
          </p>
        </div>

        <div className="theme-content-grid">
          <div className="theory-section-card">
            <h3>Vizualizatsiya</h3>
            <div className="video-card-full">
              <video controls>
                <source src={videoFile1} type="video/mp4" />
              </video>
            </div>
            <div className="theory-text-block" style={{ marginTop: '24px' }}>
              <p>
                Ushbu vizuallashtirish jarayoni orqali siz ixtiyoriy musbat epsilon(ε) soni olinganda ham,
                ketma-ketlikning qaysidir n<sub>0</sub> nomerdan keyingi barcha hadlari (0-ε, 0+ε) oraliqda
                yotishini kuzatish va tahlil qilish imkoniyatiga ega bo'lasiz.
              </p>
            </div>
          </div>

          <div className="practical-section-card">
            <div className="card-header-icon">
              <FaCalculator />
              <h3>Parametrlarni kiriting</h3>
            </div>

            <form onSubmit={handleSubmit} className="calculation-form">
              <div className="form-group">
                <label htmlFor="epsilonInput">Epsilon (ε) qiymati:</label>
                <input
                  id="epsilonInput"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={epsilon}
                  onChange={handleEpsilonChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="xEndInput">Hadlar soni:</label>
                <input
                  id="xEndInput"
                  type="number"
                  min="1"
                  step="1"
                  value={xEnd}
                  onChange={handleXEndChange}
                  required
                />
              </div>
              <button type="submit" className="calculate-btn" disabled={isLoading}>
                {isLoading ? 'Tayyorlanmoqda...' : <><FaPlay /> Simulyatsiyani boshlash</>}
              </button>
            </form>

            {videoUrl && (
              <div className="result-video-area">
                <h4>Natija:</h4>
                <div className="result-video-wrapper">
                  <video controls key={videoUrl}>
                    <source src={getVideoUrl(videoUrl)} type="video/mp4" />
                  </video>
                </div>
              </div>
            )}

            {isLoading && (
              <div className="simulation-loader">
                <div className="spinner"></div>
                <p>Grafik chizilmoqda...</p>
              </div>
            )}
          </div>
        </div>

        {/* Default Videolar Bo'limi */}
        <div className="default-videos-section">
          <div className="section-header">
            <FaVideo className="section-icon" />
            <h2>Tayyor simulyatsiyalar</h2>
            <p>Turli epsilon va hadlar soni uchun oldindan tayyorlangan simulyatsiyalar</p>
          </div>

          {loadingDefaults ? (
            <div className="loading-defaults">
              <div className="spinner"></div>
              <p>Yuklanmoqda...</p>
            </div>
          ) : defaultVideos.length > 0 ? (
            <div className="default-videos-grid">
              {defaultVideos.map((video) => (
                <div key={video.id} className="default-video-card">
                  <div className="video-wrapper">
                    <video controls>
                      <source src={getVideoUrl(video.video)} type="video/mp4" />
                      Brauzeringiz video formatini qo'llab-quvvatlamaydi.
                    </video>
                  </div>
                  <div className="video-info">
                    <h4>{video.title}</h4>
                    <div className="video-params">
                      <span className="epsilon-badge">ε = {video.epsilon}</span>
                      <span className="xend-badge">Hadlar: {video.x_end}</span>
                    </div>
                    {video.description && <p>{video.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-videos-message">
              <p>Hozircha tayyor simulyatsiyalar mavjud emas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Theme2;
