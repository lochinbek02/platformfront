import React from 'react'
import videoFile1 from '../../../public/videos/2_yaqinlashuvchi_ketma_ketlik/2_1.mp4';
import videoFile2 from '../../../public/videos/2_yaqinlashuvchi_ketma_ketlik/2_2.mp4';

function Theme4() {
  return (
    <div className='alldisplayy'>
      <div className="fortheoryy">
        <h1>Yaqinlashuvchi ketma-ketliklarning xossalari</h1>
        <p>
          Sonli ketma-ketlik faqat <b>bitta limitga</b> ega bo‘lishi mumkin.<br />
          <b>Isbot.</b> Faraz qilaylik ketma-ketlik <b>a</b> va <b>b</b> limitlarga ega bo‘lib, <b>b &gt; a</b> bo‘lsin.
          <br />
          <i>𝜀 &gt; 0</i> sonni shunday tanlashimiz mumkinki, <b>a</b> va <b>b</b> nuqtalarning <i>𝜀</i> atroflari o‘zaro kesishmasin.
          <span style={{ display: "block", marginLeft: "1.5em" }}>
            (Masalan: <i>𝜀 &lt; b − a</i> deb olsak, bu atroflar kesishmaydi)
          </span>
          U holda <b>a</b> nuqta ketma-ketlikning limiti bo‘lganligi uchun <b>a</b> ning <i>𝜀</i> atrofida <b>{`{xₙ}`}</b> ketma-ketlikning cheksizta elementi joylashgan bo‘ladi, uning tashqarisida cheklita element yotadi.
          <br />
          Jumladan <b>b</b> nuqtaning <i>𝜀</i> atrofida cheklita element qoladi. Bu esa <b>b</b> nuqtaning limit ekanligiga qarama-qarshi.
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

export default Theme4