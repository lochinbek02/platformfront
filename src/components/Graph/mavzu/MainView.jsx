import React, { useState, useEffect, useRef } from 'react';
import axiosInstance, { API_URL } from '../../../axiosInstance/axiosInstance';
import CkEditorComponent from '../CkEditorComponent';
import './MainView.css';
import { Link } from 'react-router-dom';
import { FaPlus, FaTimes, FaFilePdf, FaBook, FaEye, FaTrash } from 'react-icons/fa';
import ConfirmModal from '../../Common/ConfirmModal';

function MainView({ isSuperAdmin }) {
    const [editorData, setEditorData] = useState("");
    const [title, setTitle] = useState("");
    const [shortdata, setShortData] = useState("");
    const [image, setImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [articles, setArticles] = useState([]);
    const [articlesPdf, setArticlesPdf] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [showArticleModal, setShowArticleModal] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null, type: null });

    const pdfInputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('mincontent', shortdata);
        formData.append('content', editorData);
        if (image) {
            formData.append('image', image);
        }
        try {
            await axiosInstance.post('articles/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setEditorData("");
            setShortData("");
            setTitle("");
            setImage(null);
            setRefresh(!refresh);
            setShowArticleModal(false);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    const handleSubmitPdf = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        if (pdfFile) {
            formData.append('file', pdfFile);
        }
        try {
            await axiosInstance.post('upload-articlepdf/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setTitle("");
            setPdfFile(null);
            if (pdfInputRef.current) pdfInputRef.current.value = '';
            setRefresh(!refresh);
            setShowPdfModal(false);
        } catch (error) {
            console.error("Error uploading PDF:", error.response?.data);
        }
    };

    useEffect(() => {
        const controller = new AbortController();
        const fetchArticles = async () => {
            try {
                const response = await axiosInstance.get('articles-view/', {
                    signal: controller.signal
                });
                setArticles(response.data);
            } catch (error) {
                if (error.name !== 'CanceledError') {
                    console.error("Xatolik yuz berdi:", error);
                }
            }
        };
        fetchArticles();
        return () => controller.abort();
    }, [refresh]);

    useEffect(() => {
        const controller = new AbortController();
        const fetchArticlesPdf = async () => {
            try {
                const response = await axiosInstance.get('see-upload-articlepdf/', {
                    signal: controller.signal
                });
                setArticlesPdf(response.data);
            } catch (error) {
                if (error.name !== 'CanceledError') {
                    console.error("Xatolik yuz berdi:", error);
                }
            }
        };
        fetchArticlesPdf();
        return () => controller.abort();
    }, [refresh]);

    const handleDelete = (id) => {
        setConfirmModal({ isOpen: true, id, type: 'article' });
    };

    const confirmDelete = async () => {
        const { id, type } = confirmModal;
        try {
            if (type === 'article') {
                await axiosInstance.delete(`delete-item/${id}/`);
                setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
            } else if (type === 'pdf') {
                await axiosInstance.delete(`delete-item-pdf/${id}/`);
                setArticlesPdf(prevArticles => prevArticles.filter(article => article.id !== id));
            }
            setConfirmModal({ isOpen: false, id: null, type: null });
        } catch (error) {
            console.error("Error occurred during deletion:", error);
            alert("Xatolik yuz berdi!");
        }
    };

    const handleDeletePdf = (id) => {
        setConfirmModal({ isOpen: true, id, type: 'pdf' });
    };

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-content">
                    <h1>Nazariy ma'lumotlar</h1>
                    <p>Mavzular bo'yicha nazariy materiallar va PDF hujjatlar</p>
                </div>
                {isSuperAdmin && (
                    <div className="page-header-actions">
                        <button className="add-btn primary" onClick={() => setShowArticleModal(true)}>
                            <FaPlus /> Mavzu qo'shish
                        </button>
                        <button className="add-btn secondary" onClick={() => setShowPdfModal(true)}>
                            <FaFilePdf /> PDF yuklash
                        </button>
                    </div>
                )}
            </div>

            {/* Cards Grid */}
            <div className="cards-grid">
                {articles.map((topic, index) => (
                    <div key={index} className="content-card">
                        <div className="card-image-wrapper">
                            <img src={`${API_URL}${topic.image}`} alt="" className="card-img" />
                            <div className="card-badge">
                                <FaBook /> Mavzu
                            </div>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title">{topic.title}</h3>
                            <div className="card-actions">
                                <Link className="card-btn view" to={`/nazariy/${topic.id}`}>
                                    <FaEye /> Ko'rish
                                </Link>
                                {isSuperAdmin && (
                                    <button className="card-btn delete" onClick={() => handleDelete(topic.id)}>
                                        <FaTrash /> O'chirish
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
                {articlesPdf.map((topic, index) => (
                    <div key={`pdf-${index}`} className="content-card pdf-card">
                        <div className="card-image-wrapper">
                            <div className="pdf-placeholder">
                                <FaFilePdf />
                            </div>
                            <div className="card-badge pdf">
                                <FaFilePdf /> PDF
                            </div>
                        </div>
                        <div className="card-body">
                            <h3 className="card-title" title={topic.title}>{topic.title}</h3>
                            <div className="card-actions">
                                <a
                                    href={`${API_URL}${topic.file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="card-btn view"
                                >
                                    <FaEye /> Ko'rish
                                </a>
                                {isSuperAdmin && (
                                    <button className="card-btn delete" onClick={() => handleDeletePdf(topic.id)}>
                                        <FaTrash /> O'chirish
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Article Modal */}
            {showArticleModal && (
                <div className="modal-overlay" onClick={() => setShowArticleModal(false)}>
                    <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowArticleModal(false)}>
                            <FaTimes />
                        </button>
                        <div className="modal-header">
                            <h2>Yangi mavzu qo'shish</h2>
                            <p>Nazariy ma'lumot qo'shing</p>
                        </div>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label>Sarlavha</label>
                                <input
                                    type="text"
                                    placeholder="Mavzu sarlavhasi"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Qisqa tavsif</label>
                                <input
                                    type="text"
                                    placeholder="Mavzu haqida qisqa ma'lumot"
                                    value={shortdata}
                                    onChange={(e) => setShortData(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Rasm</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="file-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Kontent</label>
                                <CkEditorComponent
                                    initialValue={editorData}
                                    onChange={setEditorData}
                                />
                            </div>
                            <button className="submit-btn" type="submit">
                                <FaPlus /> Qo'shish
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* PDF Modal */}
            {showPdfModal && (
                <div className="modal-overlay" onClick={() => setShowPdfModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowPdfModal(false)}>
                            <FaTimes />
                        </button>
                        <div className="modal-header">
                            <h2>PDF yuklash</h2>
                            <p>PDF formatdagi hujjat yuklang</p>
                        </div>
                        <form onSubmit={handleSubmitPdf} className="modal-form">
                            <div className="form-group">
                                <label>Sarlavha</label>
                                <input
                                    type="text"
                                    placeholder="PDF sarlavhasi"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>PDF fayl</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setPdfFile(e.target.files[0])}
                                    ref={pdfInputRef}
                                    className="file-input"
                                    required
                                />
                            </div>
                            <button className="submit-btn" type="submit">
                                <FaFilePdf /> Yuklash
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModal.isOpen}
                onClose={() => setConfirmModal({ isOpen: false, id: null, type: null })}
                onConfirm={confirmDelete}
                title="Ma'lumotni o'chirish"
                message="Haqiqatan ham ushbu ma'lumotni o'chirib tashlamoqchimisiz?"
            />
        </div>
    );
}

export default MainView;
