import React from 'react';
import { Link } from 'react-router-dom';
import videoFile1 from '../../../../public/videos/1_sonli_ketma_ketlik/1_.mp4';
import videoFile4 from '../../../../public/videos/4_funksiya_limit/4_1.mp4';
import './ModelsView.css';
import { FaDesktop, FaPlay } from 'react-icons/fa';

const topics = [
  {
    title: "Sonli ketma-ketlik va uning limiti",
    mincontent: "Bu modelda sonli ketma-ketliklar va ularning limitlari haqida animatsion video ko'rasiz.",
    video: videoFile1,
    link: "/theme2"
  },
  {
    title: "Funksiyaning limiti",
    mincontent: "Funksiyaning limitini tushuntiruvchi qisqa video.",
    video: videoFile4,
    link: "/theme1"
  },
];

function ModelsView() {
  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1>Kompyuter imitatsion modellar</h1>
          <p>Interaktiv animatsiya va modellar to'plami</p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="cards-grid">
        {topics.map((topic, idx) => (
          <div className="content-card" key={idx}>
            <div className="card-image-wrapper">
              <video src={topic.video} className="card-video" muted />
              <div className="card-badge model">
                <FaDesktop /> Model
              </div>
            </div>
            <div className="card-body">
              <h3 className="card-title">{topic.title}</h3>
              <p className="card-desc">{topic.mincontent}</p>
              <div className="card-actions">
                <Link to={topic.link} className="card-btn view">
                  <FaPlay /> Ko'rish
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ModelsView;