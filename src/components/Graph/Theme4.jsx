import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Theme.css';
import videoFile1 from '../../../public/videos/2_yaqinlashuvchi_ketma_ketlik/2_1.mp4';
import videoFile2 from '../../../public/videos/2_yaqinlashuvchi_ketma_ketlik/2_2.mp4';

function Theme4() {
  return (
    <div className="page-container">
      <div className="detailed-view theme-study-view">
        <Link to="/models" className="back-btn">
          <FaArrowLeft /> Orqaga
        </Link>

        <div className="article-header">
          <h1 className="article-title">Yaqinlashuvchi ketma-ketliklarning xossalari</h1>
          <p className="article-intro">
            Ketma-ketliklarning yaqinlashish xususiyatlari va ularning isbotlari.
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
              <h4>Limit yagonaligi</h4>
              <p>Sonli ketma-ketlik faqat <b>bitta limitga</b> ega bo‘lishi mumkin.</p>
              <p className="proof-text">
                <i>𝜀 &gt; 0</i> sonni shunday tanlashimiz mumkinki, <b>a</b> va <b>b</b> nuqtalarning <i>𝜀</i>
                atroflari o‘zaro kesishmasin. U holda qarama-qarshilikka kelinadi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme4;