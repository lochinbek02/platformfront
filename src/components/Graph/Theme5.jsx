import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Theme.css';
import videoFile2 from '../../../public/videos/5_bir_tomonli_limit/5_.mp4';

function Theme5() {
  return (
    <div className="page-container">
      <div className="detailed-view theme-study-view">
        <Link to="/models" className="back-btn">
          <FaArrowLeft /> Orqaga
        </Link>

        <div className="article-header">
          <h1 className="article-title">Bir tomonli limitlar</h1>
          <p className="article-intro">
            Bolsano-Veyershtrass teoremasi va uning isboti.
          </p>
        </div>

        <div className="theme-content-grid">
          <div className="theory-section-card">
            <h3>Vizuallashtirish</h3>
            <div className="video-main-wrapper">
              <video controls>
                <source src={videoFile2} type="video/mp4" />
              </video>
            </div>
          </div>

          <div className="theory-info-card">
            <div className="info-block">
              <h4>Bolsano-Veyershtrass</h4>
              <p>Har qanday chegaralangan ketma-ketlikdan yaqinlashuvchi qismiy ketma-ketlik ajratish mumkin.</p>
              <p className="proof-text">
                ∆ = [a, b] kesmani d-nuqta yordamida teng ikkiga bo‘lamiz. Kesmaning uzunligi har gal ikki barobar kamayib boradi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme5;