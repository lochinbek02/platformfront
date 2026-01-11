import React, { useEffect, useState } from 'react';
import Login from './registration/Login';
import axiosInstance from './axiosInstance/axiosInstance';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import videoFile from '../public/videos/2_yaqinlashuvchi_ketma_ketlik/2_1.mp4';
import videoFile2 from '../public/videos/2_yaqinlashuvchi_ketma_ketlik/2_2.mp4';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import Users from './components/Users/Users';

// Existing Pages
import MainView from './components/Graph/mavzu/MainView';
import Theme from './components/Graph/Theme';
import Theme2 from './components/Graph/Theme2';
import Theme3 from './components/Graph/Theme3';
import Theme4 from './components/Graph/Theme4';
import Theme5 from './components/Graph/Theme5';
import Theme6 from './components/Graph/Theme6';
import Theme7 from './components/Graph/Theme7';
import SlideView from './components/Graph/mavzu/SlideView';
import ModelsView from './components/Graph/mavzu/ModelsView';
import VideosView from './components/Graph/mavzu/VideosView';
import TestView from './components/Graph/mavzu/TestView';
import Themes from './components/Graph/nazariy/Themes';
import TestNatija from './components/Graph/test/TestNatija';
import TestStart from './components/Graph/test/TestStart';
import SubjectInfo from './components/Graph/mavzu/SubjectInfo';
import InnovativeScheme from './components/Graph/mavzu/InnovativeScheme';

import { SettingsProvider, useSettings } from './context/SettingsContext';

import './App.css';

// JWT tokenni decode qilish funksiyasi
const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
};

// Token muddatini tekshirish
const isTokenValid = (token) => {
  if (!token) return false;
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.exp) return false;
  // Token muddati (sekundlarda) hozirgi vaqtdan katta bo'lishi kerak
  return decoded.exp * 1000 > Date.now();
};

// Refresh token orqali yangi access token olish
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh');
  if (!refreshToken) return false;

  try {
    const response = await axiosInstance.post('token/refresh/', {
      refresh: refreshToken
    });
    if (response.data.access) {
      localStorage.setItem('access', response.data.access);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const AppContent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuperAdmin, setIsSuperAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchSettings } = useSettings();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access');
      const superAdminStatus = localStorage.getItem('isSuperAdmin');

      if (token) {
        // Token yaroqliligini tekshirish
        if (isTokenValid(token)) {
          // Token yaroqli - foydalanuvchini kirgazish
          setIsAuthenticated(true);
          setMessage('Welcome back!');

          // Settings ni bir marta olish
          const alreadyFetched = sessionStorage.getItem('settingsFetched');
          if (!alreadyFetched) {
            fetchSettings();
            sessionStorage.setItem('settingsFetched', 'true');
          }

          if (superAdminStatus === 'true') {
            setIsSuperAdmin(true);
          } else {
            setIsSuperAdmin(false);
          }
        } else {
          // Token muddati o'tgan - refresh token orqali yangilash
          const refreshed = await refreshAccessToken();
          if (refreshed) {
            setIsAuthenticated(true);
            setMessage('Session refreshed!');
            if (superAdminStatus === 'true') {
              setIsSuperAdmin(true);
            } else {
              setIsSuperAdmin(false);
            }
          } else {
            // Refresh ham ishlamadi - chiqish
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('isSuperAdmin');
            sessionStorage.removeItem('settingsFetched');
            setIsAuthenticated(false);
            setMessage('Session expired. Please login again.');
          }
        }
      } else {
        setIsAuthenticated(false);
        sessionStorage.removeItem('settingsFetched');
        setMessage('Please login to continue.');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <>
      {isAuthenticated ? (
        <Layout setIsAuthenticated={setIsAuthenticated} isSuperAdmin={isSuperAdmin}>

          <Routes>
            {/* Default redirect to Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Main content pages */}
            <Route path="/subject-info" element={<SubjectInfo isSuperAdmin={isSuperAdmin} />} />
            <Route path="/mainview" element={<MainView isSuperAdmin={isSuperAdmin} />} />
            <Route path="/slide" element={<SlideView isSuperAdmin={isSuperAdmin} />} />
            <Route path="/models" element={<ModelsView />} />
            <Route path="/vedios" element={<VideosView />} />
            <Route path="/tests" element={<TestView isSuperAdmin={isSuperAdmin} />} />
            <Route path="/innovative-scheme" element={<InnovativeScheme isSuperAdmin={isSuperAdmin} />} />

            {/* Sub-pages and themes */}
            <Route path="/theme1" element={<Theme videoFile={videoFile} />} />
            <Route path="/theme2" element={<Theme2 videoFile2={videoFile2} />} />
            <Route path="/theme3" element={<Theme3 />} />
            <Route path="/theme4" element={<Theme4 />} />
            <Route path="/theme5" element={<Theme5 />} />
            <Route path="/theme6" element={<Theme6 />} />
            <Route path="/theme7" element={<Theme7 />} />
            <Route path="/nazariy/:id" element={<Themes />} />
            <Route path="/test-start/:id" element={<TestStart />} />
            <Route path="/test-natija/:id" element={<TestNatija />} />

            {/* Admin pages */}
            {isSuperAdmin && <Route path="/users" element={<Users />} />}

            {/* Settings */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      ) : (
        <Login
          message={message}
          setMessage={setMessage}
          setIsAuthenticated={setIsAuthenticated}
          setIsSuperAdmin={setIsSuperAdmin}
          onLoginSuccess={fetchSettings}
        />
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </Router>
  );
};

export default App;
