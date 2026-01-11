import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaPlay } from 'react-icons/fa';
import { MdSlideshow } from 'react-icons/md';
import './Theme.css';
import videoFile2 from '../../../public/videos/3_qismiy_ketma_ketlik/3_.mp4';

function Theme3() {
  return (
    <div className="page-container">
      <div className="detailed-view theme-study-view">
        <Link to="/models" className="back-btn">
          <FaArrowLeft /> Orqaga
        </Link>

        <div className="article-header">
          <h1 className="article-title">Qismiy ketma-ketliklar va qismiy limitlar. Koshi kriteriyasi</h1>
          <p className="article-intro">
            Ketma-ketlikning qismiy hadlari va ularning yaqinlashish xususiyatlarini o'rganing.
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
                Ushbu bo'limda siz ketma-ketlikning qismiy hadlari qanday shakllanishi va
                Koshi kriteriyasi orqali ularning yaqinlashishini isbotlash usullari bilan tanishasiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme3;