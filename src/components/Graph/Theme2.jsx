import React, { useState } from 'react';
import './Theme.css';
import videoFile1 from '../../../public/videos/1_sonli_ketma_ketlik/1_.mp4';

function Theme2() {
  const [epsilon, setEpsilon] = useState('');
  const [xEnd, setXEnd] = useState(''); // State for x_end
  const [videoUrl, setVideoUrl] = useState(''); // State for video URL
  const [isLoading, setIsLoading] = useState(false);
  // Epsilon value update
  const handleEpsilonChange = (event) => {
    setEpsilon(event.target.value);
  };
  
  // x_end value update
  const handleXEndChange = (event) => {
    setXEnd(event.target.value);
  };

  // Form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form's default behavior
    setIsLoading(true);
    setVideoUrl('');
    try {
      const response = await fetch('http://localhost:8000/api/create_custom_plot_video/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          epsilon: parseFloat(epsilon),  // Send epsilon as a float
          x_end: parseFloat(xEnd)        // Send x_end as a float
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data); // Log the response
        setVideoUrl(data.video_path); // Set the video URL in the state
      } else {
        console.error('Error:', data.message); // Log errors
      }
    } catch (error) {
      console.error('Error:', error); // Log errors
    }finally {
        setIsLoading(false); // Loadingni o'chirish
      }
  };

  return (
    <div className='alldisplay'>
      <div className="fortheory">
        <h1>Sonli ketma-ketlikning limitini ta’rif yordamida ko‘rsatish bo‘yicha imitatsion model</h1>
        <p>
        
        Ushbu amaliyotda ixtiyoriy musbat epsilon sonni va ketma-ketlikning nechta hadi ko'rsatilishini kiriting va yuborish tugmasini bosing. Natijada sizga mana shu jarayonning video formati taqdim etiladi.
        Ushbu vizuallashtirish jarayoni orqali siz ixtiyoriy musbat epsilon(ε) soni olinganganda ham, ketma-ketlikning qaysidir n<sub>0   </sub>
        nomerdan keyingi barcha hadlari (0-ε,0+ε) oraliqda yotishini kuzatish va tahlil qilib o‘rganish imkoniyatiga ega bo‘lasiz.

        </p>
        <div className="newAtribute">
        <div className="" style={{ maxWidth: '50%' ,margin:'0 auto'}}>
        {/* <p>ε=0.2 bo'lgan holat</p> */}
          <video width="600" controls  style={{ maxWidth: '100%', margin:'0'}}>
              <source src={videoFile1} type="video/mp4" />
              Sizning brauzeringiz video oynasini qo'llab-quvvatlamaydi.
            </video>
        </div>
        {/* <div className="" style={{ maxWidth:'50%',margin:'10px'}}>
        <p>ε=0.5 bo'lgan holat</p>
        <video width="600" controls style={{ maxWidth: '100%' ,margin:'0'}}>
              <source src={videoFile1} type="video/mp4" />
              Sizning brauzeringiz video oynasini qo'llab-quvvatlamaydi.
            </video>

        </div> */}
        </div>
        
        {/* Include your descriptive text here */}
      </div>
      
      <div className="forpractical">
        <form onSubmit={handleSubmit}>
          <label htmlFor="epsilonInput">Epsilonning qiymatini kiriting:</label>
          <br />
          
          <input
            id="epsilonInput"
            type="number"
            value={epsilon}
            onChange={handleEpsilonChange}
            required // Make input required
          />
          <br />
            <br />
          <label htmlFor="xEndInput">Nechta had ko'rsatilsin</label>
          <br />
          <input
            id="xEndInput"
            type="number"
            value={xEnd}
            onChange={handleXEndChange}
            required // Make input required
          />
          <br />
          
          <button type="submit">Yuborish</button>
        </form>
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

export default Theme2;
