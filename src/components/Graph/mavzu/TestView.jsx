import { useState, useEffect } from 'react';
import React from 'react';
import './TestView.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance/axiosInstance';
import { FaPlus, FaTimes, FaPlay, FaChartBar, FaTrash, FaClipboardCheck } from 'react-icons/fa';
import ConfirmModal from '../../Common/ConfirmModal';

function TestView({ isSuperAdmin, isAuthenticated }) {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [tests, setTests] = useState([]);
    const [results, setResults] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axiosInstance.get('test-view/');
                setTests(response.data);
            } catch (error) {
                console.error("Error fetching tests:", error);
            }
        };
        fetchTests();
    }, [refresh]);

    useEffect(() => {
        const fetchResults = async () => {
            if (!isAuthenticated) return;
            const user_id = localStorage.getItem('user_id');
            try {
                const response = await axiosInstance.get('test-results/', {
                    params: { user_id }
                });
                const resultsData = {};
                response.data.forEach(result => {
                    resultsData[result.test] = result;
                });
                setResults(resultsData);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };
        fetchResults();
    }, [isAuthenticated]);

    const handleDelete = (id) => {
        setConfirmModal({ isOpen: true, id });
    };

    const confirmDelete = async () => {
        const { id } = confirmModal;
        try {
            await axiosInstance.delete(`delete-test/${id}/`);
            setTests(prevTests => prevTests.filter(test => test.id !== id));
            setConfirmModal({ isOpen: false, id: null });
        } catch (error) {
            console.error("Error deleting test:", error);
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
            await axiosInstance.post('tests/', formData, {
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
                    <h1>Testlar bo'limi</h1>
                    <p>O'z bilim va ko'nikmalaringizni sinab ko'ring!</p>
                </div>
                {isSuperAdmin && (
                    <div className="page-header-actions">
                        <button className="add-btn primary" onClick={() => setShowModal(true)}>
                            <FaPlus /> Test qo'shish
                        </button>
                    </div>
                )}
            </div>

            {/* Tests Table */}
            <div className="tests-container">
                <div className="tests-table-wrapper">
                    <table className="tests-table">
                        <thead>
                            <tr>
                                <th>Mavzu</th>
                                <th>Natija</th>
                                <th>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((topic, index) => (
                                <tr key={index}>
                                    <td className="topic-cell">
                                        <div className="topic-icon">
                                            <FaClipboardCheck />
                                        </div>
                                        <span>{topic.title}</span>
                                    </td>
                                    <td>
                                        {results[topic.id] ? (
                                            <span className="result-badge success">
                                                {Math.round(results[topic.id].score * 100 / results[topic.id].total_questions)}%
                                            </span>
                                        ) : (
                                            <span className="result-badge pending">Ishlanmagan</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <Link className="table-btn result" to={`/test-natija/${topic.id}`}>
                                                <FaChartBar /> Natija
                                            </Link>
                                            <Link className="table-btn start" to={`/test-start/${topic.id}`}>
                                                <FaPlay /> Boshlash
                                            </Link>
                                            {isSuperAdmin && (
                                                <button className="table-btn delete" onClick={() => handleDelete(topic.id)}>
                                                    <FaTrash />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upload Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setShowModal(false)}>
                            <FaTimes />
                        </button>
                        <div className="modal-header">
                            <h2>Test qo'shish</h2>
                            <p>Test faylini yuklang</p>
                        </div>
                        <form onSubmit={handleFileUpload} className="modal-form">
                            <div className="form-group">
                                <label>Test mavzusi</label>
                                <input
                                    type="text"
                                    placeholder="Test sarlavhasi"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Test fayli (.txt, .docx)</label>
                                <input
                                    type="file"
                                    accept=".txt, .docx"
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
                title="Testni o'chirish"
                message="Haqiqatan ham ushbu testni o'chirib tashlamoqchimisiz?"
            />
        </div>
    );
}

export default TestView;
