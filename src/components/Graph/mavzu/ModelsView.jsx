import React from 'react';
import videoFile1 from '../../../../public/videos/1_sonli_ketma_ketlik/1_.mp4';
import videoFile2 from '../../../../public/videos/2_yaqinlashuvchi_ketma_ketlik/2_1.mp4';
import videoFile3 from '../../../../public/videos/3_qismiy_ketma_ketlik/3_.mp4';
import videoFile4 from '../../../../public/videos/4_funksiya_limit/4_1.mp4';
import videoFile5 from '../../../../public/videos/5_bir_tomonli_limit/5_.mp4';
import videoFile6 from '../../../../public/videos/6_funksiya_uzluksiz/6_1.mp4';
import videoFile7 from '../../../../public/videos/7_/7_1.mp4';

import './ModelsView.css';

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
    <div className="card-list-ki-model">
      {topics.map((topic, idx) => (
        <article className="card-ki-model" key={idx}>
          <figure className="card-image-ki-model">
            <video src={topic.video} controls width="100%" height="180" style={{borderRadius: "10px"}} />
          </figure>
          <div className="card-header-ki-model">
            <span className="card-title-ki-model">{topic.title}</span>
          </div>
          <div className="card-mincontent-ki-model">{topic.mincontent}</div>
          <div className="card-footer-ki-model">
            <a href={topic.link} className="btn-view-ki-model">Ko'rish</a>
          </div>
        </article>
      ))}
    </div>
  );
}

export default ModelsView;