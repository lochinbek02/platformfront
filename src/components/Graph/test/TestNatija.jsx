import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function TestNatija() {
    const { id } = useParams();
    const [testResults, setTestResults] = useState(null);

    useEffect(() => {
        // localStorage dan natijalarni olish
        const results = localStorage.getItem("testResults");
        if (results) {
            setTestResults(JSON.parse(results)); // JSON dan ob'ektga aylantirish
        }
    }, []);

    // Natijalar topilmasa
    if (!testResults) {
        return <div>Natijalar topilmadi.</div>;
    }

    return (
        <div className="result-container">
            <h2>Test Natijalari</h2>
            {Object.keys(testResults).map((question, index) => {
                const { selectedAnswer, correctAnswer, options } = testResults[question];

                return (
                    <div key={index} className="question-block">
                        <h3 className="question">{question}</h3>
                        <div className="options">
                            {Object.keys(options).map((option, i) => {
                                // To'g'ri yoki noto'g'ri ranglarni belgilash
                                const isSelected = option === selectedAnswer; // Tanlangan javobni tekshirish
                                const isCorrect = option === correctAnswer; // To'g'ri javobni tekshirish
                                
                                return (
                                    <label 
                                        key={i} 
                                        className="option" 
                                        style={{ 
                                            color: isSelected ? (isCorrect ? 'green' : 'red') : 'black' 
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name={question}
                                            value={option}
                                            disabled // Foydalanuvchilar uchun o'qish imkoniyatini berish
                                            checked={isSelected}
                                        />
                                        {option}
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default TestNatija;
