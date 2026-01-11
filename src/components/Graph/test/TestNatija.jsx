import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaArrowLeft, FaTrophy, FaRedo } from 'react-icons/fa';
import './TestNatija.css';

function TestNatija() {
    const { id } = useParams();
    const [testResults, setTestResults] = useState(null);
    const [stats, setStats] = useState({ correct: 0, total: 0, percent: 0 });

    useEffect(() => {
        const results = localStorage.getItem("testResults");
        if (results) {
            const parsed = JSON.parse(results);
            setTestResults(parsed);

            let correct = 0;
            const total = Object.keys(parsed).length;
            Object.values(parsed).forEach(item => {
                if (item.isCorrect) correct++;
            });
            setStats({
                correct,
                total,
                percent: Math.round((correct / total) * 100)
            });
        }
    }, [id]);

    if (!testResults) {
        return (
            <div className="page-container">
                <div className="error-state">
                    <p>Natijalar topilmadi.</p>
                    <Link to="/tests" className="back-link">Testlar ro'yxatiga qaytish</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container">
            <div className="result-view">
                <div className="result-header-card">
                    <div className="result-main-info">
                        <div className="trophy-icon">
                            <FaTrophy />
                        </div>
                        <div className="score-summary">
                            <h2>Sizning natijangiz</h2>
                            <div className="score-value">{stats.percent}%</div>
                            <p className="score-detail">
                                {stats.total} tadan {stats.correct} ta to'g'ri javob
                            </p>
                        </div>
                    </div>
                    <div className="result-actions">
                        <Link to={`/test-start/${id}`} className="retry-btn">
                            <FaRedo /> Qayta urinish
                        </Link>
                        <Link to="/tests" className="back-to-list-btn">
                            <FaArrowLeft /> Ro'yxatga qaytish
                        </Link>
                    </div>
                </div>

                <div className="result-details">
                    <h3 className="details-title">Batafsil tahlil</h3>
                    <div className="questions-review">
                        {Object.keys(testResults).map((question, index) => {
                            const { selectedAnswer, correctAnswer, options, isCorrect } = testResults[question];

                            return (
                                <div key={index} className={`review-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    <div className="review-header">
                                        <span className="question-index">Savol {index + 1}</span>
                                        <span className={`status-tag ${isCorrect ? 'success' : 'danger'}`}>
                                            {isCorrect ? <><FaCheck /> To'g'ri</> : <><FaTimes /> Noto'g'ri</>}
                                        </span>
                                    </div>
                                    <h4 className="review-question">{question}</h4>
                                    <div className="review-options">
                                        {Object.keys(options).map((option, i) => {
                                            const isSelected = option === selectedAnswer;
                                            const isCorrectOption = option === correctAnswer;

                                            let optionClass = 'review-option';
                                            if (isCorrectOption) optionClass += ' correct-option';
                                            if (isSelected && !isCorrectOption) optionClass += ' wrong-selection';

                                            return (
                                                <div key={i} className={optionClass}>
                                                    <span className="option-marker">{String.fromCharCode(65 + i)}</span>
                                                    <span className="option-text">{option}</span>
                                                    {isCorrectOption && <FaCheck className="check-icon" />}
                                                    {isSelected && !isCorrectOption && <FaTimes className="times-icon" />}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestNatija;
