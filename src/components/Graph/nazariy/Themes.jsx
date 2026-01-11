import React, { useState, useEffect } from 'react';
import axiosInstance, { API_URL } from '../../../axiosInstance/axiosInstance';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './Themes.css';

function Themes() {
    const { id } = useParams();
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (id) {
                    const response = await axiosInstance.get(`articles/${id}/`);
                    setSelectedArticle(response.data);
                }
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading-state">Ma'lumotlar yuklanmoqda...</div>
            </div>
        );
    }

    if (!selectedArticle) {
        return (
            <div className="page-container">
                <div className="error-state">
                    <p>Ma'lumot topilmadi.</p>
                    <Link to="/mainview" className="back-link">
                        <FaArrowLeft /> Orqaga qaytish
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="detailed-view">
                <Link to="/mainview" className="back-btn">
                    <FaArrowLeft /> Orqaga
                </Link>

                <div className="article-header">
                    <h1 className="article-title">{selectedArticle.title}</h1>
                    {selectedArticle.image && (
                        <div className="article-banner">
                            <img src={`${API_URL}${selectedArticle.image}`} alt={selectedArticle.title} />
                        </div>
                    )}
                </div>

                <div className="article-content">
                    <div
                        className="content-body"
                        dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                    />
                </div>
            </div>
        </div>
    );
}

export default Themes;
