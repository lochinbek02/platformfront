import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { Link } from 'react-router-dom';
import {
    FaBook,
    FaDesktop,
    FaVideo,
    FaCheckCircle,
    FaQuestionCircle,
    FaArrowRight,
    FaPlay,
    FaTimes,
    FaInfoCircle,
    FaProjectDiagram
} from 'react-icons/fa';
import { MdSlideshow } from 'react-icons/md';
import './Dashboard.css';

function Dashboard() {
    // Quick actions
    const quickActions = [
        {
            icon: <FaInfoCircle />,
            title: "Fan ma'lumotlari",
            desc: "Fan haqida umumiy ma'lumotlar",
            link: "/subject-info",
            color: "#6366f1"
        },
        {
            icon: <FaBook />,
            title: "Nazariy ma'lumotlar",
            desc: "Mavzular bo'yicha nazariy materiallar",
            link: "/mainview",
            color: "#8b5cf6"
        },
        {
            icon: <MdSlideshow />,
            title: "Interaktiv taqdimot",
            desc: "PowerPoint slaydlar to'plami",
            link: "/slide",
            color: "#ec4899"
        },
        {
            icon: <FaDesktop />,
            title: "Imitatsion modellar",
            desc: "Interaktiv kompyuter modellari",
            link: "/models",
            color: "#14b8a6"
        },
        {
            icon: <FaVideo />,
            title: "Videodars (+audio)",
            desc: "Ta'limiy video materiallar",
            link: "/vedios",
            color: "#f59e0b"
        },
        {
            icon: <FaCheckCircle />,
            title: "Testlar",
            desc: "O'zini-o'zi baholovchi testlar",
            link: "/tests",
            color: "#10b981"
        },
        {
            icon: <FaProjectDiagram />,
            title: "Innovatsion ta'lim sxemasi",
            desc: "Zamonaviy o'qitish metodikasi",
            link: "/innovative-scheme",
            color: "#f43f5e"
        },
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
            alert("Server bilan bog'lanishda xatolik yuz berdi.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="dashboard">
            {/* Hero Section - Only Image */}
            <div className="dashboard-hero">
                <div className="hero-content">
                    <div className="hero-greeting">
                        <span className="greeting-text">Xush kelibsiz! 👋</span>
                        <h1>Matematik Analiz <span className="highlight">Platformasi</span></h1>
                        <p className="hero-desc">
                            Oliy ta'lim muassasalari uchun mo'ljallangan zamonaviy o'quv platformasi.
                            Fan ma'lumotlari, nazariy materiallar, interaktiv taqdimotlar, imitatsion modellar,
                            videodarslar va innovatsion ta'lim sxemalarini o'z ichiga oladi.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/mainview" className="btn-primary">
                                <FaPlay /> O'rganishni boshlash
                            </Link>
                            <Link to="/tests" className="btn-secondary">
                                <FaCheckCircle /> Testlarni ko'rish
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <img src="https://estudy.com.mx/web/img/float_h.png" alt="Learning" className="hero-image" />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="actions-section">
                <h2 className="section-title">Tez kirish</h2>
                <div className="actions-grid">
                    {quickActions.map((action, idx) => (
                        <Link to={action.link} className="action-card" key={idx}>
                            <div className="action-icon" style={{ background: `${action.color}15`, color: action.color }}>
                                {action.icon}
                            </div>
                            <div className="action-content">
                                <h3>{action.title}</h3>
                                <p>{action.desc}</p>
                            </div>
                            <div className="action-arrow" style={{ color: action.color }}>
                                <FaArrowRight />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Contact CTA */}
            <div className="contact-section">
                <div className="contact-card" onClick={() => setIsModalOpen(true)}>
                    <div className="contact-icon">
                        <FaQuestionCircle />
                    </div>
                    <div className="contact-content">
                        <h3>Savollaringiz bormi?</h3>
                        <p>Biz bilan bog'laning va savollaringizga javob oling!</p>
                    </div>
                    <button className="contact-btn">
                        Savol yo'llash <FaArrowRight />
                    </button>
                </div>
            </div>

            {/* Question Modal */}
            {isModalOpen && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setIsModalOpen(false)}>
                            <FaTimes />
                        </button>
                        <div className="modal-header">
                            <div className="modal-icon">
                                <FaQuestionCircle />
                            </div>
                            <h2>Savol yo'llash</h2>
                            <p>Savolingizni yozing, biz tez orada javob beramiz</p>
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
                                    placeholder="To'liq ismingizni kiriting"
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
                                    placeholder="email@example.com"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="question">Savolingiz</label>
                                <textarea
                                    id="question"
                                    name="question"
                                    rows="4"
                                    value={formData.question}
                                    onChange={handleInputChange}
                                    placeholder="Savolingizni batafsil yozing..."
                                    required
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>
                            <button type="submit" className="submit-btn" disabled={isSubmitting}>
                                {isSubmitting ? 'Yuborilmoqda...' : 'Yuborish'}
                                {!isSubmitting && <FaArrowRight />}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
