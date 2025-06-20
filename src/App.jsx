import React, { useEffect, useState } from 'react';
import Login from './registration/Login';
import axios from 'axios';
import Main from './components/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import videoFile from '../public/videos/2_yaqinlashuvchi_ketma_ketlik/2_1.mp4';
import videoFile2 from '../public/videos/2_yaqinlashuvchi_ketma_ketlik/2_2.mp4';
import Navbar from './components/navbar/Navbar';
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
import Footer from './components/footer/Footer';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuperAdmin,setIsSuperAdmin]=useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('access');
    const superAdminStatus = localStorage.getItem('isSuperAdmin');
    
    if (token) {
      // Token mavjud bo'lsa autentifikatsiya qilishni tekshirish
      axios.get('http://localhost:8000/api/some_protected_route/', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(() => {
          setIsAuthenticated(true);  // Agar token yaroqli bo'lsa foydalanuvchini autentifikatsiya qilamiz
          setMessage('Welcome back!');
          if (superAdminStatus === 'true') {
            setIsSuperAdmin(true);
          } else {
            setIsSuperAdmin(false);
          }
        })
        .catch(() => {
          // Token yaroqsiz bo'lsa localStoragedan o'chirish
          localStorage.removeItem('access');
          localStorage.removeItem('isSuperAdmin');
          setIsAuthenticated(false);
          setMessage('Session expired. Please login again.');
        });
    } else {
      setIsAuthenticated(false);  // Token yo'q bo'lsa autentifikatsiya false
      setMessage('Please login to continue.');
    }
  }, [isAuthenticated]);  // isAuthenticated o'zgarganda useEffect qayta ishlaydi
  
  
  
  const handleLogout = () => {
    localStorage.removeItem('testResults');
    localStorage.removeItem('access');
    localStorage.removeItem('isSuperAdmin');
    setIsAuthenticated(false);
    setMessage('Logged out.');
  };

  return (
    <Router>
      <div className="app-wrapper">
        {isAuthenticated ? (
          <>
          <Navbar setIsAuthenticated={setIsAuthenticated} isSuperAdmin={isSuperAdmin}/> 
          <div className="main-content">
          <Routes>
            
            
            <Route path="/" element={<Main message={message} handleLogout={handleLogout} />} />
            {/* {isSuperAdmin && <Route path="/classification" element={<Classification />} />} */}
            <Route path="/mainview" element={<MainView isSuperAdmin={isSuperAdmin}/>} />
            <Route path="/theme1" element={<Theme videoFile={videoFile}/>} />
            <Route path="/theme2" element={<Theme2 videoFile2={videoFile2}/>} />
            <Route path="/theme3" element={<Theme3 />} />
            <Route path="/theme4" element={<Theme4 />} />
            <Route path="/theme5" element={<Theme5 />} />
            <Route path="/theme6" element={<Theme6 />} />
            <Route path="/theme7" element={<Theme7 />} />
            <Route path="/slide" element={<SlideView isSuperAdmin={isSuperAdmin}/>} />
            <Route path="/models" element={<ModelsView/>} />
            <Route path="/vedios" element={<VideosView/>}  />
            <Route path="/tests" element={<TestView isSuperAdmin={isSuperAdmin}/>}  />
            <Route path="/nazariy/:id" element={<Themes />} />
            <Route path="/test-start/:id" element={<TestStart />} />
            <Route path="/test-natija/:id" element={<TestNatija />} />

          </Routes>
          </div>
          <Footer />
          </>
         
        ) : (
          <Login message={message} setMessage={setMessage} setIsAuthenticated={setIsAuthenticated} setIsSuperAdmin={setIsSuperAdmin} />
        )}
        
      </div>
    </Router>
  );
};

export default App;
