import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TestStart.css';

function TestStart() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedTest, setSelectedTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:8000/api/test/${id}/`);
                    setSelectedTest(response.data);
                } else {
                    console.error("ID mavjud emas");
                }
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            }
        };

        fetchTest();
    }, [id]);

    const handleAnswerChange = (question, answer) => {
        setAnswers({
            ...answers,
            [question]: answer
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let correctCount = 0;
        let incorrectCount = 0;
        const detailedResults = {}; // To'liq natijalar uchun ob'ekt

        // Natijani hisoblash
        Object.keys(selectedTest).forEach((question) => {
            const correctAnswer = Object.keys(selectedTest[question]).find(
                (option) => selectedTest[question][option] === true
            );
            const userAnswer = answers[question];

            // Savol va tanlangan javoblarni saqlash
            detailedResults[question] = {
                selectedAnswer: userAnswer,
                correctAnswer: correctAnswer,
                isCorrect: userAnswer === correctAnswer,
                options: selectedTest[question] // Savolning barcha variantlari
            };

            if (userAnswer === correctAnswer) {
                correctCount += 1;
            } else {
                incorrectCount += 1;
            }
        });
        localStorage.setItem("testResults", JSON.stringify(detailedResults));
        const resultData = {
            correct: correctCount,
            incorrect: incorrectCount,
            details: detailedResults // To'liq natijalarni qo'shish
        };

        setResult(resultData);

        try {
            const userId = localStorage.getItem("user_id");

            // POST request to save test result
            const response = await axios.post("http://localhost:8000/api/save_test_result/", {
                user_id: userId,
                test_id: id,
                score: correctCount,
                total_questions: Object.keys(selectedTest).length
            });

            console.log("Natijalar saqlandi:", response.data);
            navigate("/tests");  // Foydalanuvchini "/tests" manziliga qaytarish
        } catch (error) {
            console.error("Natijani saqlashda xatolik yuz berdi:", error);
        }
    };

    if (!selectedTest) {
        return <div className="loading">Yuklanmoqda...</div>;
    }

    return (
        <form className="test-container" onSubmit={handleSubmit}>
            <h2>Test Boshlandi</h2>
            {Object.keys(selectedTest).map((question, index) => (
                <div key={index} className="question-block">
                    <h3 className="question">{question}</h3>
                    <div className="options">
                        {Object.keys(selectedTest[question]).map((option, i) => (
                            <label key={i} className="option">
                                <input
                                    type="radio"
                                    name={question}
                                    value={option}
                                    onChange={() => handleAnswerChange(question, option)}
                                    checked={answers[question] === option}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button type="submit" className="submit-btn">Testni yakunlash</button>

            
        </form>
    );
}

export default TestStart;
