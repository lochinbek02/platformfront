import React, { useState, useEffect } from 'react';
import './VideosView.css'; // CSS faylni ulash
import axios from 'axios';

function VideosView() {
    const [videoLessons, setVideoLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showVideoModal, setShowVideoModal] = useState(false);

    // Super admin ekanligini tekshirish
    useEffect(() => {
        const checkSuperAdmin = () => {
            const superAdminStatus = localStorage.getItem('isSuperAdmin');
            setIsSuperAdmin(superAdminStatus === 'true');
        };
        
        checkSuperAdmin();
    }, []);

    // Videolarni yuklash
    const fetchVideoLessons = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8000/api/video-lessons/');
            setVideoLessons(response.data);
            setError(null);
        } catch (error) {
            console.error("Videolarni yuklashda xatolik:", error);
            setError("Videolarni yuklashda xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    // Videoni ochish
    const openVideo = (video) => {
        setSelectedVideo(video);
        setShowVideoModal(true);
    };

    // Modal yopish
    const closeVideoModal = () => {
        setShowVideoModal(false);
        setSelectedVideo(null);
    };

    // Videoni o'chirish (faqat super admin uchun)
    const deleteVideo = async (videoId) => {
        if (!isSuperAdmin) {
            alert("Sizda videoni o'chirish huquqi yo'q!");
            return;
        }

        if (window.confirm("Bu videoni o'chirishni xohlaysizmi?")) {
            try {
                await axios.delete(`http://localhost:8000/api/delete-video-lessons/${videoId}/`);
                // O'chirilgan videoni ro'yxatdan olib tashlash
                setVideoLessons(prevVideos => prevVideos.filter(video => video.id !== videoId));
                alert("Video muvaffaqiyatli o'chirildi!");
            } catch (error) {
                console.error("Videoni o'chirishda xatolik:", error);
                alert("Videoni o'chirishda xatolik yuz berdi");
            }
        }
    };

    // Sahifa yuklanganda videolarni yuklash
    useEffect(() => {
        fetchVideoLessons();
    }, []);

    if (loading) {
        return (
            <div className="container-graphv">
                <div className="loading">Yuklanmoqda...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-graphv">
                <div className="error">{error}</div>
                <button onClick={fetchVideoLessons} className="retry-btn">
                    Qayta urinish
                </button>
            </div>
        );
    }

    return (
        <div className="container-graphv">
            <div className="videos-header">
                
            </div>

            {videoLessons.length === 0 ? (
                <div className="no-videos">
                    <p>Hozircha videolar mavjud emas</p>
                </div>
            ) : (
                <div className="videos-grid">
                    {videoLessons.map((video) => (
                        <div key={video.id} className="video-card">
                            <div className="video-thumbnail">
                                <div className="video-placeholder">
                                    <span>🎥</span>
                                </div>
                            </div>
                            
                            <div className="video-info">
                                <h3 className="video-title">{video.title}</h3>
                                <p className="video-upload-date">
                                    Yuklangan: {new Date(video.uploaded_at).toLocaleDateString('uz-UZ')}
                                </p>
                            </div>

                            <div className="video-actions">
                                <button 
                                    className="play-btn"
                                    onClick={() => openVideo(video)}
                                >
                                    O'ynatish
                                </button>
                                {isSuperAdmin && (
                                    <button 
                                        className="delete-btn"
                                        onClick={() => deleteVideo(video.id)}
                                    >
                                        O'chirish
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Video Modal */}
            {showVideoModal && selectedVideo && (
                <div className="video-modal-overlay" onClick={closeVideoModal}>
                    <div className="video-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="video-modal-header">
                            <h3>{selectedVideo.title}</h3>
                            <button className="close-btn" onClick={closeVideoModal}>
                                ✕
                            </button>
                        </div>
                        <div className="video-modal-content">
                            <video 
                                controls 
                                autoPlay
                                className="video-player"
                                src={`http://localhost:8000${selectedVideo.file}`}
                            >
                                Brauzeringiz video elementini qo'llab-quvvatlamaydi.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default VideosView;
