import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CkEditorComponent from '../CkEditorComponent';
import './MainView.css';
import { Link } from 'react-router-dom';

function MainView({ isSuperAdmin }) {
    const [editorData, setEditorData] = useState("");
    const [title, setTitle] = useState("");
    const [shortdata, setShortData] = useState("");
    const [image, setImage] = useState(null);
    const [pdfFile, setPdfFile] = useState(null); // State for storing PDF file
    const [articles, setArticles] = useState([]);
    const [articlesPdf, setArticlesPdf] = useState([]);

    const [refresh, setRefresh] = useState(false);

    // PDF file input uchun ref
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
            await axios.post('http://localhost:8000/api/articles/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setEditorData("");
            setShortData("");
            setTitle("");
            setImage(null);
            setRefresh(!refresh);
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };

    const handleSubmitPdf = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title); // Ensure title is passed
        if (pdfFile) {
            formData.append('file', pdfFile); // Append PDF file with key 'file'
        }
    
        try {
            const response = await axios.post('http://localhost:8000/api/upload-articlepdf/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log('PDF uploaded:', response.data);
            setTitle("");
            setPdfFile(null);
            if (pdfInputRef.current) pdfInputRef.current.value = '';
            setRefresh(!refresh);
        
        } catch (error) {
            console.error("Error uploading PDF:", error.response.data);
        }
    };

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/articles-view/');
                setArticles(response.data);
                
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            }
        };

        fetchArticles();
    }, [refresh]);

    useEffect(() => {
        const fetchArticlesPdf = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/see-upload-articlepdf/');
                setArticlesPdf(response.data);
            } catch (error) {
                console.error("Xatolik yuz berdi:", error);
            }
        };

        fetchArticlesPdf();
    }, [refresh]);

    // console.log(articlesPdf);
    
    const handleDelete = async (id) => {
        try {
            if (id) {
                const isConfirmed = window.confirm("O'chirishga ishonchingiz komilmi?");
                if (isConfirmed) {
                    await axios.delete(`http://localhost:8000/api/delete-item/${id}/`);
                    setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
                }
            } else {
                console.error("ID not found");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };
    const handleDeletePdf = async (id) => {
        try {
            if (id) {
                const isConfirmed = window.confirm("O'chirishga ishonchingiz komilmi?");
                if (isConfirmed) {
                    await axios.delete(`http://localhost:8000/api/delete-item-pdf/${id}/`);
                    setArticlesPdf(prevArticles => prevArticles.filter(article => article.id !== id));
                }
            } else {
                console.error("ID not found");
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };
    return (
        <>
            <div className="container-graphv">
                <div className="cards-container">
                    {articles.map((topic, index) => (
                        <div key={index} className="card">
                            <img src={`http://localhost:8000${topic.image}`} alt="" className="card-image" />
                            <div className="card-body">
                                <h5 className="card-title">{topic.title}</h5>
                                <div className="card-actions">
                                    <Link className="batafsil" to={`/nazariy/${topic.id}`}>Ko'rish</Link>
                                    {isSuperAdmin && <button className='deleteitem' onClick={() => handleDelete(topic.id)}>Delete</button>}
                                </div>
                            </div>
                        </div>
                    ))}
                    {articlesPdf.map((topic, index) => (
                        <div key={index} className="card">
                            <img src="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ=w600-h300-pc0xffffff-pd" alt="" className="card-image" />
                            <div className="card-body">
                                <h5 className="card-title1112" title={topic.title}>{topic.title}</h5>
                                <div className="card-actions">
                                    <a 
                                        href={`http://localhost:8000${topic.file}`}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="pdf-view-link"
                                    >
                                        Ko'rish
                                    </a>
                                    {isSuperAdmin && <button className='deleteitem' onClick={() => handleDeletePdf(topic.id)}>O'chirish</button>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isSuperAdmin && 
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="main-view-form">
                        <h2>Mavzu kiriting:</h2>
                        <input 
                            type="text" 
                            placeholder="Sarlavha" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Mavzu Haqida qisqa ma'lumot" 
                            value={shortdata}
                            onChange={(e) => setShortData(e.target.value)} 
                        />
                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])} 
                        />
                        <CkEditorComponent
                            initialValue={editorData}
                            onChange={setEditorData}
                        />
                        <button className='ckditor-submit' type="submit">Yuborish</button>
                    </form>

                    <form onSubmit={handleSubmitPdf} className="pdf-upload-form">
                        <h2>PDF yuklash:</h2>
                        <input 
                            type="text" 
                            placeholder="PDF Sarlavha" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <input 
                            type="file" 
                            accept=".pdf"
                            onChange={(e) => setPdfFile(e.target.files[0])} 
                            ref={pdfInputRef}
                        />
                        <button className='ckditor-submit' type="submit">PDF Yuborish</button>
                    </form>
                </div>
            }
        </>
    );
}

export default MainView;
