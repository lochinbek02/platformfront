import { useState, useEffect } from 'react';
import React from 'react';
import './TestView.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function TestView({ isSuperAdmin, isAuthenticated }) { // Added isAuthenticated prop
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [tests, setTests] = useState([]);
    const [results, setResults] = useState({});
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/test-view/');
                setTests(response.data);
            } catch (error) {
                console.error("Error fetching tests:", error);
            }
        };

        fetchTests();
    }, [refresh]);

    useEffect(() => {
        const fetchResults = async () => {
            
            if (!isAuthenticated) console.log('kirilmagan'); // Foydalanuvchi autentifikatsiyadan o'tmagan bo'lsa, qaytish
    
            const user_id = localStorage.getItem('user_id'); // user_id ni olish
            try {
                const response = await axios.get('http://localhost:8000/api/test-results/', {
                    params: { user_id } // user_id ni params sifatida yuborish
                });
                const resultsData = {};
                response.data.forEach(result => {
                    resultsData[result.test] = result;
                });
                console.log(resultsData)
                setResults(resultsData);
            } catch (error) {
                console.error("Error fetching results:", error);
            }
        };
    
        fetchResults();
    }, []);
    // console.log(results)
    const handleDelete = async (id) => {
        try {
            const isConfirmed = window.confirm("O'chirishga ishonchingiz komilmi?");
            if (isConfirmed) {
                await axios.delete(`http://localhost:8000/api/delete-test/${id}/`);
                setTests(prevTests => prevTests.filter(test => test.id !== id));
            }
        } catch (error) {
            console.error("Error deleting test:", error);
        }
    };
    
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert('Iltimos, yuklash uchun fayl tanlang');
            return;
        }
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('file', selectedFile);
    
        try {
            await axios.post('http://localhost:8000/api/tests/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setRefresh(!refresh);
            setSelectedFile(null);
            setTitle('');
        } catch (error) {
            console.error('Upload error:', error);
            alert('Fayl yuklanmadi!');
        }
    };
    
    return (
        <>
            {/* Testlar bo‘limi mavzusi */}
            <div className="testview-title">
                <h2>Testlar bo‘limi</h2>
                <p>O‘z bilim va ko‘nikmalaringizni sinab ko‘ring!</p>
            </div>
            <div className="container-grapht">
                <table className="styled-table-grapht">
                    <thead>
                        <tr>
                            <th>Mavzular</th>
                            <th>Natija</th>
                            <th></th>
                            {isSuperAdmin && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((topic, index) => (
                            <tr key={index}>
                                <td>{topic.title}</td>
                                <td>
                                    {results[topic.id] ? (
                                        <span> {results[topic.id].score*100/results[topic.id].total_questions}%</span>
                                    ) : (
                                        <span>Test ishlanmagan</span>
                                    )}
                                </td>
                                <td>
                                    <Link className="result-button-grapht" to={`/test-natija/${topic.id}`}>Natija</Link>
                                    <Link className="start-button-grapht" to={`/test-start/${topic.id}`}>Boshlash</Link>
                                </td>
                                {isSuperAdmin && (
                                    <td>
                                        <button 
                                            onClick={() => handleDelete(topic.id)} 
                                            className='delete-button-grapht'>
                                            O'chirish
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isSuperAdmin && (
                <div className="upload-section">
                    <label htmlFor="">Test mavzusi:</label>
                    <input 
                        type="text" 
                        placeholder="Sarlavha" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <h3>Test fileni yuklang:</h3>
                    <input 
                        type="file" 
                        accept=".txt, .docx"
                        onChange={handleFileChange} 
                        className="file-input"
                    />
                    <button onClick={handleFileUpload} className="upload-button">
                        Yuklash
                    </button>
                </div>
            )}
        </>
    );
}

export default TestView;
