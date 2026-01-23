import React, { useState, useEffect } from 'react';
import './VideosView.css';
import axiosInstance, { API_URL } from '../../../axiosInstance/axiosInstance';
import { FaPlay, FaTimes, FaTrash, FaVideo } from 'react-icons/fa';
import ConfirmModal from '../../Common/ConfirmModal';

function VideosView() {
    const [videoLessons, setVideoLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

    // Upload states
    const [title, setTitle] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const checkSuperAdmin = () => {
            const superAdminStatus = localStorage.getItem('isSuperAdmin');
            setIsSuperAdmin(superAdminStatus === 'true');
        };
        checkSuperAdmin();
    }, []);

    const fetchVideoLessons = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('video-lessons/');
            setVideoLessons(response.data);
            setError(null);
        } catch (error) {
            console.error("Videolarni yuklashda xatolik:", error);
            setError("Videolarni yuklashda xatolik yuz berdi");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitVideo = async (e) => {
        e.preventDefault();
        if (!videoFile) return;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', videoFile);

        try {
            await axiosInstance.post('video-lessons-create/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setTitle("");
            setVideoFile(null);
            setShowUploadModal(false);
            setRefresh(!refresh);
        } catch (error) {
            console.error("Video yuklashda xatolik:", error);
            alert("Video yuklashda xatolik yuz berdi. Backendda 'video-lessons-create/' endpointini tekshiring.");
        }
    };

    const openVideo = (video) => {
        setSelectedVideo(video);
        setShowVideoModal(true);
    };

    const closeVideoModal = () => {
        setShowVideoModal(false);
        setSelectedVideo(null);
    };

    const deleteVideo = (videoId) => {
        if (!isSuperAdmin) {
            alert("Sizda videoni o'chirish huquqi yo'q!");
            return;
        }
        setConfirmModal({ isOpen: true, id: videoId });
    };

    const confirmDelete = async () => {
        const { id } = confirmModal;
        try {
            await axiosInstance.delete(`delete-video-lessons/${id}/`);
            setVideoLessons(prevVideos => prevVideos.filter(video => video.id !== id));
            setConfirmModal({ isOpen: false, id: null });
        } catch (error) {
            console.error("Videoni o'chirishda xatolik:", error);
            alert("Videoni o'chirishda xatolik yuz berdi");
        }
    };

    useEffect(() => {
        fetchVideoLessons();
    }, [refresh]);

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading-state">Yuklanmoqda...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="page-container">
                <div className="error-state">
                    <p>{error}</p>
                    <button onClick={fetchVideoLessons} className="retry-btn">Qayta urinish</button>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-content">
                    <h1>Kompyuter imitatsion model 2</h1>
                    <p>Ta'limiy video materiallar to'plami</p>
                </div>
                {isSuperAdmin && (
                    <div className="page-header-actions">
                        <button className="add-btn secondary" onClick={() => setShowUploadModal(true)}>
                            <FaVideo /> Video yuklash
                        </button>
                    </div>
                )}
            </div>

            {videoLessons.length === 0 ? (
                <div className="empty-state">
                    <FaVideo className="empty-icon" />
                    <p>Hozircha videolar mavjud emas</p>
                </div>
            ) : (
                <div className="cards-grid">
                    {videoLessons.map((video) => (
                        <div key={video.id} className="content-card">
                            <div className="card-image-wrapper">
                                <div className="video-placeholder">
                                    <FaVideo />
                                </div>
                                <div className="card-badge video">
                                    <FaVideo /> Video
                                </div>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">{video.title}</h3>
                                <p className="card-date">
                                    Yuklangan: {new Date(video.uploaded_at).toLocaleDateString('uz-UZ')}
                                </p>
                                <div className="card-actions">
                                    <button className="card-btn view" onClick={() => openVideo(video)}>
                                        <FaPlay /> O'ynatish
                                    </button>
                                    {isSuperAdmin && (
                                        <button className="card-btn delete" onClick={() => deleteVideo(video.id)}>
                                            <FaTrash /> O'chirish
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Video Player Modal */}
            {showVideoModal && selectedVideo && (
                <div className="modal-overlay" onClick={closeVideoModal}>
                    <div className="modal-content video-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={closeVideoModal}>
                            <FaTimes />
                        </button>
                        <div className="modal-header">
                            <h2>{selectedVideo.title}</h2>
                        </div>
                        <div className="video-player-wrapper">
                            <video
                                controls
                                autoPlay
                                className="video-player"
                                src={`${API_URL}${selectedVideo.file}`}
                            >
                                Brauzeringiz video elementini qo'llab-quvvatlamaydi.
                            </video>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Video Modal */}
            {showUploadModal && (
                <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowUploadModal(false)}>
                            <FaTimes />
                        </button>
                        <div className="modal-header">
                            <h2>Yangi video dars</h2>
                            <p>Tizimga video fayl yuklash</p>
                        </div>
                        <form onSubmit={handleSubmitVideo} className="modal-form">
                            <div className="form-group">
                                <label>Video nomi</label>
                                <input
                                    type="text"
                                    placeholder="Video dars mavzusini kiriting"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Video fayl (MP4)</label>
                                <input
                                    type="file"
                                    accept="video/mp4,video/x-m4v,video/*"
                                    onChange={(e) => setVideoFile(e.target.files[0])}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                <FaVideo /> Yuklashni boshlash
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, id: null })}
                onConfirm={confirmDelete}
                title="Videoni o'chirish"
                message="Haqiqatan ham ushbu videoni o'chirib tashlamoqchimisiz?"
            />
        </div>
    );
}

export default VideosView;
