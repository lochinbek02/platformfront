import React, { useState } from 'react';
import './Theme.css';
// import image from '/C:/Users/User/Desktop/platform/Limitimage.png'
import videoFile3 from '../../../public/videos/4_funksiya_limit/4_1.mp4';
import videoFile from '../../../public/videos/4_funksiya_limit/4_2.mp4';

function Theme() {
  const [epsilon, setEpsilon] = useState('');
  const [videoUrl, setVideoUrl] = useState(''); // Video URL uchun state
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Epsilon qiymatini yangilash
  const handleInputChange = (event) => {
    setEpsilon(event.target.value);
  };

  // Formani yuborish
  const handleSubmit = async (event) => {
    event.preventDefault(); // Formaning default behaviorini to'xtatish
    setIsLoading(true); // Loadingni yoqish
    setVideoUrl('');
    try {
      const response = await fetch('http://localhost:8000/api/create-video/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ epsilon: parseFloat(epsilon) }), // Epsilonni JSON formatida yuborish
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data); // Yuborilgan javobni konsolga chiqarish
        setVideoUrl(data.video_path); // Video URL'ni state ga qo'shish
      } else {
        console.error('Error:', data.message); // Xatolarni konsolga chiqarish
      }
    } catch (error) {
      console.error('Error:', error); // Xatolarni konsolga chiqarish
    } finally {
      setIsLoading(false); // Loadingni o'chirish
    }
  };

  return (
    <div className='alldisplay'>
      <div className="fortheory">
        <h1>Funksiya limitini Koshi ta’rifi (ε-δ)  yordamida ko‘rsatish bo‘yicha imitatsion model</h1>
        <p>
        
        Ushbu amaliyotda ixtiyoriy musbat epsilon sonni kiriting va yuborish tugmasini bosing. Natijada sizga mana shu jarayonning video formati taqdim etiladi.
        Ushbu vizuallashtirish jarayoni orqali siz ixtiyoriy musbat epsilon(ε) soni olinganganda ham, shunday δ musbat son topilib, a=2 ning δ atrofidan olingan ixtiyoriy x larning  f(x)=x<sup>2 </sup> 
        funksiyadagi qaiymatlari b=4 ning ε atrofida joylashishini kuzatish va tahlil qilib o‘rganish imkoniyatiga ega bo‘lasiz.

         </p>
        <div className="newAtribute" style={{margin:'0 auto'}}>
        <div className="" style={{ maxWidth: '50%' ,margin:'10px'}}>
       
          <video width="600" controls  style={{ maxWidth: '100%', margin:'0'}}>
              <source src={videoFile3} type="video/mp4" />
              Sizning brauzeringiz video oynasini qo'llab-quvvatlamaydi.
            </video>
        </div>
        <div className="" style={{ maxWidth:'50%',margin:'10px'}}>
        
        <video width="600" controls style={{ maxWidth: '100%' ,margin:'0'}}>
              <source src={videoFile} type="video/mp4" />
              Sizning brauzeringiz video oynasini qo'llab-quvvatlamaydi.
            </video>

        </div>
        </div>
        
            
      </div>
      
      <div className="forpractical">
        <form onSubmit={handleSubmit}>
          <label htmlFor="epsilonInput">Epsilonning qiymatini kiriting:</label>
          
          <input
            id="epsilonInput"
            type="number"
            value={epsilon}
            onChange={handleInputChange}
            required // Make input required
          />
          <br />
          <button type="submit">Yuborish</button>
        </form>
        {/* <p>{`http://localhost:8000/media/videos/videos/1080p60/limit_graph.mp4`}</p> */}
        
        {isLoading && <div className="loader"></div>} 
        {isLoading && <h2 style={{textAlign:'center'}}>Loading...</h2>}
        {videoUrl && (
          <div>

            
            <h2>Yaratilgan video:</h2>
            <video width="600" controls style={{ maxWidth: '100%' }}>
              <source src={`http://localhost:8000/${videoUrl}`} type="video/mp4" />
              Sizning brauzeringiz video oynasini qo'llab-quvvatlamaydi.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default Theme;
