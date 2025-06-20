import React from 'react'
// import videoFile1 from '../../../public/videos/PlotConditionalGraphs2.mp4';
import videoFile2 from '../../../public/videos/5_bir_tomonli_limit/5_.mp4';
function Theme5() {
  return (
    <div className='alldisplayy'>
      <div className="fortheoryy">
        <h1>Bir tomonli limitlar</h1>
        <p>
          <b>(Bolsano-Veyershtrass).</b> Har qanday chegaralangan ketma-ketlikdan yaqinlashuvchi qismiy ketma-ketlik ajratish mumkin.<br />
          <b>Isbot.</b> <b>{`{xₙ}`}</b> chegaralangan ketma-ketlik bo‘lsin. U holda <b>∃a, ∃b, ∀n ∈ N → xₙ ∈ [a, b]</b>.<br />
          <span style={{ display: "block", marginLeft: "1.5em" }}>
            ∆ = [a, b] kesmani <b>d</b>-nuqta yordamida teng ikkiga bo‘lamiz. <b>[a, d]</b> va <b>[d, b]</b> kesmalarning hech bo‘lmaganda birontasida <b>{`{xₙ}`}</b> ketma-ketlikning cheksiz ko‘p elementlari yotadi.
            <br />
            Agar ikkala kesmada ham cheksiz ko‘p element yotsa, u holda o‘ng tomondagi kesmani olamiz. (Bundan keyin ham ikkala kesmada ham cheksiz ko‘p element yotsa, o‘ng tomondagisini olamiz).
            <br />
            Ketma-ketlikning cheksiz ko‘p elementi yotgan kesmani <b>∆₁ = [a₁, b₁]</b> deb belgilaymiz. Ko‘rinib turibdiki, ∆₁ kesmaning uzunligi <b>b₁ − a₁ = (b − a)/2</b> ga teng.
            <br />
            ∆₁ kesmani yana teng ikkiga bo‘lamiz, hosil bo‘lgan 2 ta kesmalardan <b>{`{xₙ}`}</b> ketma-ketlikning cheksiz ko‘p elementi saqlanganini <b>∆₂</b> orqali belgilaymiz. <b>∆₂ = [a₂, b₂]</b> kesmaning uzunligi <b>(b − a)/4</b> ga teng.
          </span>
        </p>
        <div className="newAtributee">
          <div className="" style={{ maxWidth: '50%', margin: '0 auto' }}>
            
            <video width="600" controls style={{ maxWidth: '100%', margin: '0' }}>
              <source src={videoFile2} type="video/mp4" />
              Sizning brauzeringiz video oynasini qo'llab-quvvatlamaydi.
            </video>
          </div>
          {/* <div className="" style={{ maxWidth: '50%', margin: '10px' }}>
            
            <video width="600" controls style={{ maxWidth: '100%', margin: '0' }}>
              <source src={videoFile1} type="video/mp4" />
              Sizning brauzeringiz video oynasini qo'llab-quvvatlamaydi.
            </video>

          </div> */}
        </div>

        {/* Include your descriptive text here */}
      </div>

      
    </div>
  );
}

export default Theme5