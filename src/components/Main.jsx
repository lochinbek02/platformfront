import React, { useState } from 'react';
import axiosInstance from '../axiosInstance/axiosInstance';
import './Main.css'
import Footer from './footer/Footer';
import { FaUsers, FaFileAlt, FaCheckCircle, FaBookOpen, FaMobileAlt, FaChalkboardTeacher, FaChartLine, FaQuestionCircle, FaVideo, FaRocket } from 'react-icons/fa';

function Main() {
  // Statik yoki dinamik qiymatlar (hozircha statik)
  const stats = [
    { icon: <FaUsers />, label: "Foydalanuvchilar", value: 1245 },
    { icon: <FaFileAlt />, label: "Yuklangan fayllar", value: 378 },
    { icon: <FaCheckCircle />, label: "Testlar", value: 56 },
    { icon: <FaBookOpen />, label: "Mavzular", value: 18 },
  ];

  const features = [
    { icon: <FaChalkboardTeacher />, title: "Interaktiv darslar", desc: "Har bir mavzu uchun animatsiya va video darslar mavjud." },
    { icon: <FaCheckCircle />, title: "Test va baholash", desc: "O‘zini-o‘zi baholovchi testlar va natijalarni ko‘rish imkoniyati." },
    { icon: <FaMobileAlt />, title: "Mobil moslik", desc: "Platforma barcha qurilmalarda to‘liq ishlaydi." },
    { icon: <FaVideo />, title: "Video va taqdimotlar", desc: "Har bir mavzu uchun zamonaviy video va taqdimotlar." },
    { icon: <FaChartLine />, title: "Statistika va monitoring", desc: "O‘quvchilar faoliyati va natijalari bo‘yicha monitoring." },
    { icon: <FaRocket />, title: "Tez va qulay", desc: "Platforma tez ishlaydi va foydalanish uchun qulay interfeysga ega." },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post('questions/', formData);

      if (response.status === 201) {
        alert("Savolingiz muvaffaqiyatli yuborildi!");
        setIsModalOpen(false);
        setFormData({ name: '', email: '', question: '' });
      } else {
        alert("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
      }
    } catch (error) {
      console.error("Savolni yuborishda xatolik:", error);
      alert("Server bilan bog'lanishda xatolik yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="containermain">
        <div className="maintext">
          <div className="textizoh">
            <div className="textMain">
              <h1>Matematik analiz kursiga xush kelibsiz!</h1>
            </div>
            <div className="pMain">
              <p>
                Ushbu o‘quv kursi matematik analiz fanidan oliy ta'lim muassasalariga mo‘ljallangan dastur asosida o‘qitiladigan mavzular bo‘yicha nazariy ma'umotlar, taqdimotlar, kompyuter imitatsion modellar va video materiallar, misol va masalalarni qiymatlarni o'zgartirish va real vaqt rejimida jarayonlarni kuzatish imkonini beruvchi modella, o‘zini-o‘zi baholovchi testlar to‘plamini o‘z ichiga olgan
              </p>
            </div>
          </div>
          <div className="images">
            <img src="https://estudy.com.mx/web/img/float_h.png" alt="" />
          </div>
        </div>
      </div>

      {/* Statistik blok */}
      <div className="main-stats">
        {stats.map((item, idx) => (
          <div className="stat-card" key={idx}>
            <div className="stat-icon">{item.icon}</div>
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Platforma afzalliklari mavzusi */}
      <div className="main-features-title">
        <h2>Platforma afzalliklari</h2>
        <p>Nima uchun ushbu platformani tanlash kerak?</p>
      </div>

      {/* Platforma afzalliklari */}
      <div className="main-features">
        {features.map((item, idx) => (
          <div className="feature-card" key={idx}>
            <div className="feature-icon">{item.icon}</div>
            <div className="feature-title">{item.title}</div>
            <div className="feature-desc">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="main-cta" onClick={() => setIsModalOpen(true)}>
        <FaQuestionCircle className="cta-icon" />
        <div className="cta-text">
          Savollar bormi? <span>Biz bilan bog‘laning!</span>
        </div>
      </div>

      {/* Question Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Savol yo'llash</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)} disabled={isSubmitting}>&times;</button>
            </div>
            <form className="modal-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Ismingiz</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email manzilingiz</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="question">Savolingiz</label>
                <textarea
                  id="question"
                  name="question"
                  rows="5"
                  value={formData.question}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>
              <button type="submit" className="modal-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Main;