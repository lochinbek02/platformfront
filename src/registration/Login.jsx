import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance/axiosInstance';
import './Login.css'

const Login = ({ message, setMessage, setIsAuthenticated, setIsSuperAdmin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Sahifa yuklanganda tokenlarni tekshirish
        const token = localStorage.getItem('access');
        if (token) {
            setIsAuthenticated(true);
            const isSuperAdmin = localStorage.getItem('isSuperAdmin') === 'true';
            setIsSuperAdmin(isSuperAdmin);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('login/', {
                username,
                password
            });

            // Tokenlarni localStoragega saqlash
            localStorage.setItem('access', response.data.access);
            if (response.data.refresh) {
                localStorage.setItem('refresh', response.data.refresh);
            }

            const userId = response.data.user_id;
            localStorage.setItem('user_id', userId);
            localStorage.setItem('isAuthenticated', 'true');

            const isSuperuser = response.data.is_superuser;
            const isStaff = response.data.is_staff;

            if (isSuperuser) {
                setMessage('Super Admin login successful!');
                setIsSuperAdmin(true);
                localStorage.setItem('isSuperAdmin', 'true');
            } else if (isStaff) {
                setMessage('Staff Admin login successful!');
                setIsSuperAdmin(false);
                localStorage.setItem('isSuperAdmin', 'false');
            } else {
                setMessage('Login successful!');
                setIsSuperAdmin(false);
                localStorage.setItem('isSuperAdmin', 'false');
            }

            setIsAuthenticated(true);
        } catch (error) {
            setMessage('Login failed');
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('isSuperAdmin');
            setIsAuthenticated(false);
        }
        setUsername('');
        setPassword('');
    };

    return (


        <div className="homewrappper">
            <div className="wrapper" >
                <form className="form-signin" onSubmit={handleSubmit}>
                    <h2 className="form-signin-heading">Please login</h2>

                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Password"
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {/* <label className="checkbox">
                    <input type="checkbox" value="remember-me" id="rememberMe" name="rememberMe"/> Remember me
                    </label> */}
                    <button className="wrapperbtn wrapperbtn-lg wrapperbtn-primary wrapperbtn-block" type="submit">Login</button>
                    {/* {message} */}
                </form>
            </div>

        </div>

    );
};

export default Login;
