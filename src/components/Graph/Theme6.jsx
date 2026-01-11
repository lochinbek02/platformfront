import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Theme.css';
import videoFile1 from '../../../public/videos/6_funksiya_uzluksiz/6_1.mp4';
import videoFile2 from '../../../public/videos/6_funksiya_uzluksiz/6_2.mp4';

function Theme6() {
  return (
    <div className="page-container">
      <div className="detailed-view theme-study-view">
        <Link to="/models" className="back-btn">
          <FaArrowLeft /> Orqaga
        </Link>

        <div className="article-header">
          <h1 className="article-title">Funksiya uzluksizligi</h1>
          <p className="article-intro">
            Funksiyaning nuqtada va oraliqda uzluksizligini vizual o'rganing.
          </p>
        </div>

        <div className="theme-content-grid">
          <div className="theory-section-card">
            <h3>Vizualizatsiya</h3>
            <div className="theme-videos-grid">
              <div className="video-card-simple">
                <video controls>
                  <source src={videoFile2} type="video/mp4" />
                </video>
              </div>
              <div className="video-card-simple">
                <video controls>
                  <source src={videoFile1} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          <div className="theory-info-card">
            <div className="info-block">
              <h4>Uzluksizlik ta'rifi</h4>
              <p>
                Agar funksiyaning nuqtadagi limiti uning shu nuqtadagi qiymatiga teng bo'lsa,
                funksiya shu nuqtada uzluksiz deyiladi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme6;