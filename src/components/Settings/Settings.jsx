import React from 'react';
import { FaUser, FaPalette, FaBell, FaLock, FaSave, FaCheck } from 'react-icons/fa';
import axiosInstance from '../../axiosInstance/axiosInstance';
import { useSettings } from '../../context/SettingsContext';
import './Settings.css';

function Settings() {
    const [activeTab, setActiveTab] = React.useState('profile');
    const [saved, setSaved] = React.useState(false);
    const [savedPrefs, setSavedPrefs] = React.useState(false);

    const { preferences, updateSettings, user, setUser } = useSettings();
    const [passwords, setPasswords] = React.useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handlePreferenceChange = (key, value) => {
        // Update locally for immediate preview, but don't persist to backend yet
        updateSettings({ [key]: value }, false);
    };

    const handleSavePreferences = async () => {
        // Sync the current preferences to the backend
        await updateSettings(preferences, true);
        setSavedPrefs(true);
        setTimeout(() => setSavedPrefs(false), 2000);
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            alert("Yangi parollar mos kelmadi!");
            return;
        }

        try {
            await axiosInstance.post('users/change-password/', {
                current_password: passwords.current,
                new_password: passwords.new
            });
            alert("Parol muvaffaqiyatli o'zgartirildi!");
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (error) {
            console.error("Password change error:", error);
            alert("Parolni o'zgartirishda xatolik yuz berdi.");
        }
    };

    const handleSaveProfile = async () => {
        try {
            await axiosInstance.post('user/update-profile/', {
                username: user.username,
                email: user.email
            });

            localStorage.setItem('userName', user.username);
            localStorage.setItem('userEmail', user.email);

            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (error) {
            console.error("Profile save error:", error);
            alert("Ma'lumotlarni saqlashda xatolik yuz berdi. Backendda 'user/update-profile/' endpointi mavjudligini tekshiring.");
        }
    };

    const tabs = [
        { id: 'profile', icon: <FaUser />, label: 'Profil' },
        { id: 'appearance', icon: <FaPalette />, label: "Ko'rinish" },
        { id: 'notifications', icon: <FaBell />, label: 'Bildirishnomalar' },
        { id: 'security', icon: <FaLock />, label: 'Xavfsizlik' },
    ];

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="page-header-content">
                    <h1>Sozlamalar</h1>
                    <p>Profilingiz va tizim sozlamalarini boshqaring</p>
                </div>
            </div>

            <div className="settings-layout">
                <div className="settings-sidebar-nav">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`settings-nav-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="nav-icon">{tab.icon}</span>
                            <span className="nav-label">{tab.label}</span>
                        </button>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="settings-main-card">
                    {activeTab === 'profile' && (
                        <div className="settings-panel">
                            <div className="panel-header">
                                <h2>Profil ma'lumotlari</h2>
                                <p>Shaxsiy ma'lumotlaringizni yangilang</p>
                            </div>

                            <div className="settings-form">
                                <div className="form-group">
                                    <label>Foydalanuvchi nomi</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={user.username}
                                        onChange={handleProfileChange}
                                        placeholder="Foydalanuvchi nomini kiriting"
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={user.email}
                                        onChange={handleProfileChange}
                                        placeholder="Email manzilingiz"
                                    />
                                </div>

                                <button className="settings-save-btn" onClick={handleSaveProfile}>
                                    {saved ? <><FaCheck /> Saqlandi!</> : <><FaSave /> O'zgarishlarni saqlash</>}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'appearance' && (
                        <div className="settings-panel">
                            <div className="panel-header">
                                <h2>Ko'rinish sozlamalari</h2>
                                <p>Interfeys ko'rinishini sozlang</p>
                            </div>

                            <div className="settings-list">
                                <div className="setting-row">
                                    <div className="setting-text">
                                        <span className="setting-name">Qorong'i rejim</span>
                                        <span className="setting-description">Interfeys rangini qorong'i rejimga o'zgartirish</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={preferences.darkMode}
                                            onChange={(e) => handlePreferenceChange('darkMode', e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <div className="setting-row">
                                    <div className="setting-text">
                                        <span className="setting-name">Til</span>
                                        <span className="setting-description">Interfeys tilini tanlang</span>
                                    </div>
                                    <select
                                        value={preferences.language}
                                        onChange={(e) => handlePreferenceChange('language', e.target.value)}
                                        className="settings-select"
                                    >
                                        <option value="uz">O'zbek</option>
                                        <option value="ru">Русский</option>
                                        <option value="en">English</option>
                                    </select>
                                </div>

                                <button className="settings-save-btn" onClick={handleSavePreferences} style={{ marginTop: '24px' }}>
                                    {savedPrefs ? <><FaCheck /> Saqlandi!</> : <><FaSave /> Sozlamalarni saqlash</>}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="settings-panel">
                            <div className="panel-header">
                                <h2>Bildirishnoma sozlamalari</h2>
                                <p>Bildirishnomalarni boshqaring</p>
                            </div>

                            <div className="settings-list">
                                <div className="setting-row">
                                    <div className="setting-text">
                                        <span className="setting-name">Bildirishnomalar</span>
                                        <span className="setting-description">Tizim bildirishnomalarini olish</span>
                                    </div>
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={preferences.notifications}
                                            onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                                        />
                                        <span className="toggle-slider"></span>
                                    </label>
                                </div>

                                <button className="settings-save-btn" onClick={handleSavePreferences} style={{ marginTop: '24px' }}>
                                    {savedPrefs ? <><FaCheck /> Saqlandi!</> : <><FaSave /> Bildirishnomalarni saqlash</>}
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="settings-panel">
                            <div className="panel-header">
                                <h2>Xavfsizlik sozlamalari</h2>
                                <p>Hisob xavfsizligini boshqaring</p>
                            </div>

                            <form className="settings-form" onSubmit={handlePasswordChange}>
                                <div className="form-group">
                                    <label>Joriy parol</label>
                                    <input
                                        type="password"
                                        placeholder="Joriy parolingiz"
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Yangi parol</label>
                                    <input
                                        type="password"
                                        placeholder="Yangi parol"
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Parolni tasdiqlash</label>
                                    <input
                                        type="password"
                                        placeholder="Yangi parolni qayta kiriting"
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                        required
                                    />
                                </div>

                                <button type="submit" className="settings-save-btn">
                                    <FaLock /> Parolni yangilash
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Settings;
