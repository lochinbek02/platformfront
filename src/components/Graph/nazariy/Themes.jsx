import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Themes.css';

function Themes() {
    const { id } = useParams();
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                if (id) {
                    const response = await axios.get(`http://localhost:8000/api/articles/${id}/`);
                    setSelectedArticle(response.data);
                } else {
                    console.error("ID mavjud emas");
                }
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            }
        };

        fetchArticle();
    }, [id]);

    if (!selectedArticle) {
        return <div>Yuklanmoqda...</div>;
    }

    return (
        <div className="themes-container">
            <h1 className="themes-title">{selectedArticle.title}</h1>
            {/* {selectedArticle.image && (
                <img src={selectedArticle.image} alt={selectedArticle.title} className="themes-image" />
            )} */}
            <div className="themes-content" dangerouslySetInnerHTML={{ __html: selectedArticle.content }} />
        </div>
    );
}

export default Themes;
