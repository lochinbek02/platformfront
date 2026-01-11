import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance/axiosInstance';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [preferences, setPreferences] = useState({
        darkMode: localStorage.getItem('darkMode') === 'true',
        language: localStorage.getItem('language') || 'uz',
        notifications: localStorage.getItem('notifications') !== 'false',
    });

    const [user, setUser] = useState({
        username: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
    });

    const updateSettings = React.useCallback(async (newSettings, persist = true) => {
        setPreferences(prev => {
            const updated = { ...prev, ...newSettings };

            // Sync with localStorage for immediate effect
            if (newSettings.darkMode !== undefined) {
                localStorage.setItem('darkMode', newSettings.darkMode);
                document.body.classList.toggle('dark-mode', newSettings.darkMode);
            }
            if (newSettings.language !== undefined) localStorage.setItem('language', newSettings.language);
            if (newSettings.notifications !== undefined) localStorage.setItem('notifications', newSettings.notifications);

            return updated;
        });

        // Sync with Backend if authenticated and persist is true
        const token = localStorage.getItem('access');
        if (token && persist) {
            try {
                // Get current updated state for backend sync
                setPreferences(current => {
                    axiosInstance.post('user/settings/', {
                        dark_mode: current.darkMode,
                        language: current.language,
                        notifications_enabled: current.notifications
                    }).catch(err => console.error("Backend settings sync error:", err));
                    return current;
                });
            } catch (error) {
                console.error("Async error handling sync:", error);
            }
        }
    }, []);

    const fetchSettings = React.useCallback(async () => {
        const token = localStorage.getItem('access');
        if (token) {
            try {
                const response = await axiosInstance.get('user/settings/');
                const data = response.data;

                // Update Preferences
                const backendPrefs = {
                    darkMode: data.dark_mode,
                    language: data.language,
                    notifications: data.notifications_enabled
                };
                setPreferences(backendPrefs);

                // Update User Info from response
                const userInfo = {
                    username: data.username || '',
                    email: data.email || ''
                };
                setUser(userInfo);
                localStorage.setItem('userName', userInfo.username);
                localStorage.setItem('userEmail', userInfo.email);

                // apply dark mode class
                document.body.classList.toggle('dark-mode', data.dark_mode);
                localStorage.setItem('darkMode', data.dark_mode);
                localStorage.setItem('language', data.language);
                localStorage.setItem('notifications', data.notifications_enabled);
            } catch (error) {
                console.error("Failed to fetch backend settings:", error);
            }
        }
    }, []);

    useEffect(() => {
        // Initial class application
        document.body.classList.toggle('dark-mode', preferences.darkMode);
    }, []);

    const value = React.useMemo(() => ({
        preferences,
        user,
        setUser,
        updateSettings,
        fetchSettings
    }), [preferences, user, updateSettings, fetchSettings]);

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};
