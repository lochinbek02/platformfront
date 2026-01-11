import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance/axiosInstance';
import { FaArrowLeft, FaCheckCircle, FaClock, FaQuestionCircle } from 'react-icons/fa';
import './TestStart.css';

function TestStart() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedTest, setSelectedTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                if (id) {
                    const response = await axiosInstance.get(`test/${id}/`);
                    setSelectedTest(response.data);
                }
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTest();
    }, [id]);

    const handleAnswerChange = (question, option) => {
        setAnswers(prev => ({ ...prev, [question]: option }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(answers).length < Object.keys(selectedTest).length) {
            if (!window.confirm("Barcha savollarga javob berilmadi. Testni yakunlamoqchimisiz?")) return;
        }

        setIsSubmitting(true);
        let correctCount = 0;
        const detailedResults = {};

        Object.keys(selectedTest).forEach((question) => {
            const correctAnswer = Object.keys(selectedTest[question]).find(
                (option) => selectedTest[question][option] === true
            );
            const userAnswer = answers[question];

            detailedResults[question] = {
                selectedAnswer: userAnswer,
                correctAnswer: correctAnswer,
                isCorrect: userAnswer === correctAnswer,
                options: selectedTest[question]
            };

            if (userAnswer === correctAnswer) {
                correctCount += 1;
            }
        });

        localStorage.setItem("testResults", JSON.stringify(detailedResults));

        try {
            const userId = localStorage.getItem("user_id");
            await axiosInstance.post("save_test_result/", {
                user_id: userId,
                test_id: id,
                score: correctCount,
                total_questions: Object.keys(selectedTest).length
            });
            navigate(`/test-natija/${id}`);
        } catch (error) {
            console.error("Natijani saqlashda xatolik yuz berdi:", error);
            navigate(`/test-natija/${id}`); // Still navigate to show local results
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="page-container">
                <div className="loading-state">Test yuklanmoqda...</div>
            </div>
        );
    }

    if (!selectedTest) {
        return (
            <div className="page-container">
                <div className="error-state">
                    <p>Test topilmadi.</p>
                    <Link to="/tests" className="back-link">Orqaga qaytish</Link>
                </div>
            </div>
        );
    }

    const questionsList = Object.keys(selectedTest);
    const progress = Math.round((Object.keys(answers).length / questionsList.length) * 100);

    return (
        <div className="page-container">
            <div className="test-interface">
                <div className="test-sidebar">
                    <Link to="/tests" className="back-btn-simple">
                        <FaArrowLeft /> Orqaga
                    </Link>
                    <div className="test-stats">
                        <div className="stat-item">
                            <FaQuestionCircle />
                            <span>Savollar: {questionsList.length}</span>
                        </div>
                        <div className="stat-item">
                            <FaClock />
                            <span>Vaqt: Cheklanmagan</span>
                        </div>
                    </div>
                    <div className="test-progress-card">
                        <div className="progress-info">
                            <span>Jarayon</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>

                <form className="test-main" onSubmit={handleSubmit}>
                    <div className="test-header-simple">
                        <h1>Bilimingizni sinab ko'ring</h1>
                        <p>Barcha savollarga diqqat bilan javob bering</p>
                    </div>

                    <div className="questions-list">
                        {questionsList.map((question, index) => (
                            <div key={index} className={`question-card ${answers[question] ? 'answered' : ''}`}>
                                <div className="question-num">Savol {index + 1}</div>
                                <h3 className="question-text">{question}</h3>
                                <div className="options-grid">
                                    {Object.keys(selectedTest[question]).map((option, i) => (
                                        <label key={i} className={`option-label ${answers[question] === option ? 'selected' : ''}`}>
                                            <input
                                                type="radio"
                                                name={`q-${index}`}
                                                value={option}
                                                onChange={() => handleAnswerChange(question, option)}
                                                checked={answers[question] === option}
                                                className="hidden-radio"
                                            />
                                            <span className="option-marker">{String.fromCharCode(65 + i)}</span>
                                            <span className="option-text">{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="test-footer">
                        <button type="submit" className="finish-btn" disabled={isSubmitting}>
                            {isSubmitting ? 'Saqlanmoqda...' : <><FaCheckCircle /> Testni yakunlash</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TestStart;
