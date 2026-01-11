import React, { useState, useEffect } from 'react';
import axiosInstance, { API_URL } from '../../../axiosInstance/axiosInstance';
import './SlideView.css';
import { FaPlus, FaTimes, FaEye, FaTrash, FaFilePowerpoint } from 'react-icons/fa';
import { MdSlideshow } from 'react-icons/md';
import ConfirmModal from '../../Common/ConfirmModal';

function SlideView({ isSuperAdmin }) {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [slides, setSlides] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axiosInstance.get('slides-view/');
                setSlides(response.data);
            } catch (error) {
                console.error("Error fetching slides:", error);
            }
        };
        fetchSlides();
    }, [refresh]);

    const handleDelete = (id) => {
        setConfirmModal({ isOpen: true, id });
    };

    const confirmDelete = async () => {
        const { id } = confirmModal;
        try {
            await axiosInstance.delete(`delete-slide/${id}/`);
            setSlides(prevSlides => prevSlides.filter(slide => slide.id !== id));
            setConfirmModal({ isOpen: false, id: null });
        } catch (error) {
            console.error("Error deleting slide:", error);
            alert("Xatolik yuz berdi!");
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            alert('Iltimos, yuklash uchun fayl tanlang');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', selectedFile);

        try {
            await axiosInstance.post('slides/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setRefresh(!refresh);
            setSelectedFile(null);
            setTitle('');
            setShowModal(false);
        } catch (error) {
            console.error('Upload error:', error);
            alert('Fayl yuklanmadi!');
        }
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-content">
                    <h1>Taqdimotlar</h1>
                    <p>PowerPoint slaydlar to'plami</p>
                </div>
                {isSuperAdmin && (
                    <div className="page-header-actions">
                        <button className="add-btn primary" onClick={() => setShowModal(true)}>
                            <FaPlus /> Taqdimot qo'shish
                        </button>
                    </div>
                )}
            </div>

            {/* Cards Grid */}
            <div className="cards-grid">
                {slides.map((topic) => (
                    <div key={topic.id} className="content-card">
                        <div className="card-image-wrapper">
                            <div className="ppt-placeholder">
                                <MdSlideshow />
                            </div>
                            <div className="card-badge ppt">
                                <FaFilePowerpoint /> PPT
                            </div>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title" title={topic.title}>{topic.title}</h3>
                            <div className="card-actions">
                                <a href={`${API_URL}${topic.file.startsWith('/') ? '' : '/'}${topic.file}`} download className="card-btn view">
                                    <FaEye /> Ko'rish
                                </a>
                                {isSuperAdmin && (
                                    <button className="card-btn delete" onClick={() => handleDelete(topic.id)}>
                                        <FaTrash /> O'chirish
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowModal(false)}>
                            <FaTimes />
                        </button>
                        <div className="modal-header">
                            <h2>Taqdimot yuklash</h2>
                            <p>PowerPoint faylini yuklang</p>
                        </div>
                        <form onSubmit={handleFileUpload} className="modal-form">
                            <div className="form-group">
                                <label>Sarlavha</label>
                                <input
                                    type="text"
                                    placeholder="Taqdimot sarlavhasi"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>PowerPoint fayl (.pptx)</label>
                                <input
                                    type="file"
                                    accept=".pptx"
                                    onChange={handleFileChange}
                                    className="file-input"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn">
                                <FaPlus /> Yuklash
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, id: null })}
                onConfirm={confirmDelete}
                title="Taqdimotni o'chirish"
                message="Haqiqatan ham ushbu taqdimotni o'chirib tashlamoqchimisiz?"
            />
        </div>
    );
}

export default SlideView;
