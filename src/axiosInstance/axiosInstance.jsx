import axios from 'axios';

// axios instance yaratamiz
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

// Har bir so'rovga tokenni qo'shish
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
