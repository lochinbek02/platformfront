import React, { useState, useEffect, useRef } from 'react';
import axiosInstance, { API_URL } from '../../../axiosInstance/axiosInstance';
import { FaPlus, FaTimes, FaFilePdf, FaEye, FaTrash, FaInfoCircle, FaBook, FaListUl, FaUserTie } from 'react-icons/fa';
import ConfirmModal from '../../Common/ConfirmModal';
import '../mavzu/MainView.css';

function SubjectInfo({ isSuperAdmin }) {
    const [title, setTitle] = useState("");
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfs, setPdfs] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });
    const pdfInputRef = useRef(null);

    useEffect(() => {
        const fetchPdfs = async () => {
            try {
                // Eslatma: Backendda 'subject-info-pdfs/' endpointi bo'lishi kerak
                const response = await axiosInstance.get('subject-info-pdfs/');
                setPdfs(response.data);
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            }
        };
        fetchPdfs();
    }, [refresh]);

    const handleSubmitPdf = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        if (pdfFile) formData.append('file', pdfFile);

        try {
            await axiosInstance.post('upload-subject-pdf/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setTitle("");
            setPdfFile(null);
            if (pdfInputRef.current) pdfInputRef.current.value = '';
            setRefresh(!refresh);
            setShowPdfModal(false);
        } catch (error) {
            console.error("Error uploading PDF:", error);
        }
    };

    const handleDelete = (id) => {
        setConfirmModal({ isOpen: true, id });
    };

    const confirmDelete = async () => {
        try {
            await axiosInstance.delete(`delete-subject-pdf/${confirmModal.id}/`);
            setPdfs(prev => prev.filter(item => item.id !== confirmModal.id));
            setConfirmModal({ isOpen: false, id: null });
        } catch (error) {
            console.error("Error deleting PDF:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>Fan ma'lumotlari</h1>
                    <p>Matematik analiz fani haqida umumiy ma'lumotlar va hujjatlar</p>
                </div>
                {isSuperAdmin && (
                    <div className="page-header-actions">
                        <button className="add-btn secondary" onClick={() => setShowPdfModal(true)}>
                            <FaFilePdf /> PDF yuklash
                        </button>
                    </div>
                )}
            </div>

            <div className="cards-grid">
                {pdfs.map((item) => (
                    <div key={item.id} className="content-card pdf-card">
                        <div className="card-image-wrapper">
                            <div className="pdf-placeholder">
                                <FaFilePdf />
                            </div>
                            <div className="card-badge pdf">
                                <FaFilePdf /> PDF
                            </div>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title" title={item.title}>{item.title}</h3>
                            <div className="card-actions">
                                <a href={`${API_URL}${item.file}`} target="_blank" rel="noopener noreferrer" className="card-btn view">
                                    <FaEye /> Ko'rish
                                </a>
                                {isSuperAdmin && (
                                    <button className="card-btn delete" onClick={() => handleDelete(item.id)}>
                                        <FaTrash /> O'chirish
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Upload Modal */}
            {showPdfModal && (
                <div className="modal-overlay" onClick={() => setShowPdfModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowPdfModal(false)}>
                            <FaTimes />
                        </button>
                        <div className="modal-header">
                            <h2>PDF yuklash</h2>
                            <p>Fan ma'lumotlari uchun PDF hujjat yuklang</p>
                        </div>
                        <form onSubmit={handleSubmitPdf} className="modal-form">
                            <div className="form-group">
                                <label>Hujjat nomi</label>
                                <input
                                    type="text"
                                    placeholder="Masalan: Fan dasturi"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>PDF fayl</label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    ref={pdfInputRef}
                                    onChange={(e) => setPdfFile(e.target.files[0])}
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

            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, id: null })}
                onConfirm={confirmDelete}
                title="Hujjatni o'chirish"
                message="Haqiqatan ham ushbu hujjatni o'chirib tashlamoqchimisiz?"
            />
        </div>
    );
}

export default SubjectInfo;
