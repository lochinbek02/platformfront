import React from 'react'
import videoFile1 from '../../../public/videos/6_funksiya_uzluksiz/6_1.mp4';
import videoFile2 from '../../../public/videos/6_funksiya_uzluksiz/6_2.mp4';
function Theme6() {
  return (
    <div className='alldisplayy'>
      <div className="fortheoryy">
        <h1>Funksiya uzluksizligi</h1>
        <p>

          Lorem ipsum dolor sit, amet consectetur adipisicing elit. In voluptatum quae dignissimos possimus unde fuga iure, nobis quod consequuntur autem. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, neque.

        </p>
        <div className="newAtributee" style={{margin:'0 auto'}}>
          <div className="" style={{ maxWidth: '50%', margin: '10px' }}>
            
            <video width="600" controls style={{ maxWidth: '100%', margin: '0' }}>
              <source src={videoFile2} type="video/mp4" />
              Sizning brauzeringiz video oynasini qo'llab-quvvatlamaydi.
            </video>
          </div>
          <div className="" style={{ maxWidth: '50%', margin: '10px' }}>
            
            <video width="600" controls style={{ maxWidth: '100%', margin: '0' }}>
              <source src={videoFile1} type="video/mp4" />
              Sizning brauzeringiz video oynasini qo'llab-quvvatlamaydi.
            </video>

          </div>
        </div>

        {/* Include your descriptive text here */}
      </div>

      
    </div>
  );
}

export default Theme6