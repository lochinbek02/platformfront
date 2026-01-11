import axios from 'axios';

// API manzilini bitta o'zgaruvchida saqlaymiz
export const API_URL = 'http://localhost:8087';
export const API_BASE_URL = `${API_URL}/api/`;

// Video URL ni to'g'ri hosil qilish (global helper)
export const getVideoUrl = (videoPath) => {
    if (!videoPath) return '';
    // Agar URL allaqachon http yoki https bilan boshlansa, qaytarish
    if (videoPath.startsWith('http://') || videoPath.startsWith('https://')) {
        return videoPath;
    }
    // Aks holda API_URL qo'shish
    return `${API_URL}${videoPath}`;
};

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Har bir so'rovga tokenni qo'shish
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('access');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
