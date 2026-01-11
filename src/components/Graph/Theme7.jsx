import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Theme.css';
import videoFile2 from '../../../public/videos/7_/7_1.mp4';

function Theme7() {
  return (
    <div className="page-container">
      <div className="detailed-view theme-study-view">
        <Link to="/models" className="back-btn">
          <FaArrowLeft /> Orqaga
        </Link>

        <div className="article-header">
          <h1 className="article-title">Uzulish turlari</h1>
          <p className="article-intro">
            Funksiyaning uzilish nuqtalarini klassifikatsiyalash va tahlil qilish.
          </p>
        </div>

        <div className="theme-content-grid single-col">
          <div className="theory-section-card">
            <div className="video-main-wrapper">
              <video controls>
                <source src={videoFile2} type="video/mp4" />
              </video>
            </div>
            <div className="theory-text-block" style={{ marginTop: '24px' }}>
              <p>
                Ushbu bo'limda funksiyaning birinchi va ikkinchi tur uzilish nuqtalari,
                tuzatish mumkin bo'lgan uzilishlar haqida batafsil ma'lumot olasiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme7;