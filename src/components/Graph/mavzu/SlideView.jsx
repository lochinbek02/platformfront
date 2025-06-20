import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SlideView.css';

function SlideView({ isSuperAdmin }) {
    const [title, setTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [slides, setSlides] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/slides-view/');
                setSlides(response.data);
            } catch (error) {
                console.error("Error fetching slides:", error);
            }
        };

        fetchSlides();
    }, [refresh]);

    const handleDelete = async (id) => {
        try {
            const isConfirmed = window.confirm("O'chirishga ishonchingiz komilmi?");
            if (isConfirmed) {
                await axios.delete(`http://localhost:8000/api/delete-slide/${id}/`);
                setSlides(prevSlides => prevSlides.filter(slide => slide.id !== id));
            }
        } catch (error) {
            console.error("Error deleting slide:", error);
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
            await axios.post('http://localhost:8000/api/slides/', formData, {
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
    console.log(slides)
    return (
        <>
            <div className="container-graphslide">
                <div className="cards-containerslide">
                    {slides.map((topic) => (
                        <div key={topic.id} className="cardslide">
                            <img src="https://cdn.pixabay.com/photo/2021/12/13/06/33/powerpoint-6867647_640.png" alt="" className="card-image" />
                            <div className="card-bodyslide">
                                <p className="card-title1">{topic.title}</p>
                                <div className="button-container">
                                    {/* Ensure the href is a complete URL to the file */}
                                    <a href={`http://localhost:8000/${topic.file}`} download className="batafsil">Ko'rish</a>
                                    {isSuperAdmin && (
                                        <button className='deleteitem' onClick={() => handleDelete(topic.id)}>O'chirish</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isSuperAdmin && (
                <div className="upload-section">
                    <input 
                        type="text" 
                        placeholder="Sarlavha" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    <h3>PowerPoint faylini yuklash:</h3>
                    <input 
                        type="file" 
                        accept=".pptx" 
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

export default SlideView;
