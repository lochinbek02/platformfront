import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa6";
import { FaSignOutAlt } from "react-icons/fa";
import './Navbar.css';

function Navbar({ setIsAuthenticated, isSuperAdmin }) {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const buttonClickLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('testResults');
        setIsAuthenticated(false);
    };

    const navLinks = [
        { to: '/', label: 'Bosh sahifa' },
        { to: '/mainview', label: "Nazariy ma'lumotlar" },
        { to: '/slide', label: 'Taqdimot' },
        { to: '/models', label: 'Kompyuter imitatsion model' },
        { to: '/vedios', label: 'Kompyuter imitatsion model 2' },
        { to: '/tests', label: 'Test' },
    ];

    return (
        <nav className="navbar">
            <div className="logo">
                <img src="https://www.samdu.uz/new/images/SamDU%20logo%20full%201.png" alt="SAMTUIT" />
                <h1>A.Safarov</h1>
            </div>
            <ul className="nav-links">
                {navLinks.map(link => (
                    <li key={link.to}>
                        <Link
                            to={link.to}
                            className={location.pathname === link.to ? 'active' : ''}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
                <li className="user-section">

                    <button type="button" className="logout-btn-adv" onClick={buttonClickLogout}>
                        <FaSignOutAlt className="logout-icon" />
                        <span className="logout-text">Logout</span>
                    </button>
                </li>
            </ul>
            <div className="hamburger" onClick={toggleMenu}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
            {/* Mobil menyu */}
            <div className={`menubar${isOpen ? ' active' : ''}`} onClick={toggleMenu}>
                <ul>
                    {navLinks.map(link => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={location.pathname === link.to ? 'active' : ''}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li className="user-section">
                        <button type="button" className="logout-btn-adv" onClick={buttonClickLogout}>
                            <FaSignOutAlt className="logout-icon" />
                            <span className="logout-text">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;