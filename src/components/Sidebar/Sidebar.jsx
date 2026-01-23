import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    FaHome,
    FaBook,
    FaDesktop,
    FaVideo,
    FaClipboardList,
    FaCog,
    FaUsers,
    FaSignOutAlt,
    FaBars,
    FaTimes,
    FaChartBar,
    FaChalkboardTeacher,
    FaInfoCircle,
    FaProjectDiagram
} from 'react-icons/fa';
import { MdSlideshow } from 'react-icons/md';
import { useSettings } from '../../context/SettingsContext';
import './Sidebar.css';

// Memoized Nav Item for extra performance
const NavItem = React.memo(({ item, isActive, isCollapsed, onClick }) => (
    <li>
        <Link
            to={item.to}
            className={`nav-link ${isActive ? 'active' : ''}`}
            onClick={onClick}
            title={isCollapsed ? item.label : ''}
        >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
        </Link>
    </li>
));

// Main Sidebar UI - Memoized to prevent re-renders unless specific props change
const SidebarContent = React.memo(({
    username,
    isSuperAdmin,
    isCollapsed,
    setIsCollapsed,
    handleLogout,
    pathname
}) => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const toggleMobile = () => setIsMobileOpen(!isMobileOpen);

    const mainMenuItems = [
        { to: '/dashboard', icon: <FaChartBar />, label: 'Dashboard' },
        { to: '/subject-info', icon: <FaInfoCircle />, label: "Fan ma'lumotlari" },
        { to: '/mainview', icon: <FaBook />, label: "Nazariy ma'lumotlar" },
        { to: '/slide', icon: <MdSlideshow />, label: 'Interaktiv taqdimot' },
        { to: '/models', icon: <FaDesktop />, label: 'Kompyuter imitatsion model' },
        { to: '/vedios', icon: <FaVideo />, label: 'Kompyuter imitatsion model 2' },
        { to: '/tests', icon: <FaClipboardList />, label: 'Test' },
        { to: '/innovative-scheme', icon: <FaProjectDiagram />, label: "Innovatsion ta'lim sxemasi" },
    ];

    const bottomMenuItems = [
        ...(isSuperAdmin ? [{ to: '/users', icon: <FaUsers />, label: 'Foydalanuvchilar' }] : []),
        { to: '/settings', icon: <FaCog />, label: 'Sozlamalar' },
    ];

    return (
        <>
            <button className="sidebar-mobile-toggle" onClick={toggleMobile}>
                {isMobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            {isMobileOpen && <div className="sidebar-overlay" onClick={toggleMobile}></div>}

            <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <img src="https://www.samdu.uz/new/images/SamDU%20logo%20full%201.png" alt="SamDU" />
                        {!isCollapsed && <span className="logo-text" title={username}>{username}</span>}
                    </div>
                    <button className="collapse-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
                        <FaBars />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <div className="nav-section">
                        {!isCollapsed && <span className="nav-section-title">Asosiy</span>}
                        <ul className="nav-list">
                            {mainMenuItems.map((item) => (
                                <NavItem
                                    key={item.to}
                                    item={item}
                                    isActive={pathname === item.to}
                                    isCollapsed={isCollapsed}
                                    onClick={() => setIsMobileOpen(false)}
                                />
                            ))}
                        </ul>
                    </div>

                    <div className="nav-section bottom-section">
                        {!isCollapsed && <span className="nav-section-title">Boshqaruv</span>}
                        <ul className="nav-list">
                            {bottomMenuItems.map((item) => (
                                <NavItem
                                    key={item.to}
                                    item={item}
                                    isActive={pathname === item.to}
                                    isCollapsed={isCollapsed}
                                    onClick={() => setIsMobileOpen(false)}
                                />
                            ))}
                        </ul>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <button className="logout-btn" onClick={handleLogout} title={isCollapsed ? 'Chiqish' : ''}>
                        <FaSignOutAlt className="logout-icon" />
                        {!isCollapsed && <span>Chiqish</span>}
                    </button>
                </div>
            </aside>
        </>
    );
});

function Sidebar({ setIsAuthenticated, isSuperAdmin, isCollapsed, setIsCollapsed }) {
    const { user } = useSettings();
    const location = useLocation();

    const handleLogout = React.useCallback(() => {
        localStorage.clear();
        sessionStorage.removeItem('settingsFetched');
        setIsAuthenticated(false);
    }, [setIsAuthenticated]);

    return (
        <SidebarContent
            username={user.username}
            isSuperAdmin={isSuperAdmin}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            handleLogout={handleLogout}
            pathname={location.pathname}
        />
    );
}

export default Sidebar;
