import './Footer.css';
import { FaPhoneAlt, FaTelegramPlane, FaEnvelope, FaUserGraduate } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3><FaPhoneAlt /> Kontakt ma'lumotlar</h3>
          <div className="content-body">
            <p><FaPhoneAlt /> Tel: +998 91 227 98 17</p>
            <p><FaTelegramPlane /> Telegram: @AbbosSafarov15</p>
            <p><FaEnvelope /> Email: abbossafarov@gmail.com</p>
          </div>
        </div>
        <div className="footer-section footer-section--highlight">
          <h3><FaUserGraduate /> Muallif haqida</h3>
          <div className="content-body">
            <p>Aftor: Safarov Abbos</p>
            <p>Samarqand davlat universiteti, doktoranti</p>
            <p>Samarqand, 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;