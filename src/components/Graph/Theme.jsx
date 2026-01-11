import React, { useState, useEffect } from 'react';
import axiosInstance, { getVideoUrl } from '../../axiosInstance/axiosInstance';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay, FaCalculator, FaVideo } from 'react-icons/fa';
import './Theme.css';
import videoFile3 from '../../../public/videos/4_funksiya_limit/4_1.mp4';
import videoFile from '../../../public/videos/4_funksiya_limit/4_2.mp4';

function Theme() {
  const [epsilon, setEpsilon] = useState('');
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
        const response = await axiosInstance.get('limit-graph-default-video/');
        setDefaultVideos(response.data);
      } catch (error) {
        console.error('Default videolarni yuklashda xatolik:', error);
      } finally {
        setLoadingDefaults(false);
      }
    };

    fetchDefaultVideos();
  }, []);

  const handleInputChange = (event) => {
    setEpsilon(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setVideoUrl('');
    try {
      const response = await axiosInstance.post('create-video/', {
        epsilon: parseFloat(epsilon)
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
          <h1 className="article-title">Funksiya limitini Koshi ta'rifi (ε-δ) bo'yicha imitatsion model</h1>
          <p className="article-intro">
            Ushbu amaliyotda ixtiyoriy musbat epsilon sonni kiriting va yuborish tugmasini bosing.
            Natijada sizga mana shu jarayonning video formati taqdim etiladi.
          </p>
        </div>

        <div className="theme-content-grid">
          <div className="theory-section-card">
            <h3>Vizualizatsiya</h3>
            <div className="theme-videos-grid">
              <div className="video-card-simple">
                <video controls>
                  <source src={videoFile3} type="video/mp4" />
                </video>
                <span>Vizuallashtirish 1</span>
              </div>
              <div className="video-card-simple">
                <video controls>
                  <source src={videoFile} type="video/mp4" />
                </video>
                <span>Vizuallashtirish 2</span>
              </div>
            </div>
            <div className="theory-text-block">
              <p>
                Ushbu vizuallashtirish jarayoni orqali siz ixtiyoriy musbat epsilon(ε) soni olinganganda ham,
                shunday δ musbat son topilib, a=2 ning δ atrofidan olingan ixtiyoriy x larning f(x)=x<sup>2</sup>
                funksiyadagi qiymatlari b=4 ning ε atrofida joylashishini kuzatish imkoniyatiga ega bo'lasiz.
              </p>
            </div>
          </div>

          <div className="practical-section-card">
            <div className="card-header-icon">
              <FaCalculator />
              <h3>Amaliy mashg'ulot</h3>
            </div>

            <form onSubmit={handleSubmit} className="calculation-form">
              <div className="form-group">
                <label htmlFor="epsilonInput">Epsilon (ε) qiymatini kiriting:</label>
                <input
                  id="epsilonInput"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={epsilon}
                  onChange={handleInputChange}
                  placeholder="Masalan: 0.05"
                  required
                />
              </div>
              <button type="submit" className="calculate-btn" disabled={isLoading}>
                {isLoading ? 'Tayyorlanmoqda...' : <><FaPlay /> Yuborish</>}
              </button>
            </form>

            {videoUrl && (
              <div className="result-video-area">
                <h4>Yaratilgan video:</h4>
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
                <p>Simulyatsiya tayyorlanmoqda...</p>
              </div>
            )}
          </div>
        </div>

        {/* Default Videolar Bo'limi */}
        <div className="default-videos-section">
          <div className="section-header">
            <FaVideo className="section-icon" />
            <h2>Tayyor simulyatsiyalar</h2>
            <p>Turli epsilon qiymatlar uchun oldindan tayyorlangan simulyatsiyalar</p>
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
                    <span className="epsilon-badge">ε = {video.epsilon}</span>
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

export default Theme;
