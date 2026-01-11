import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

function Layout({ children, setIsAuthenticated, isSuperAdmin }) {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <div className={`layout ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            <Sidebar
                setIsAuthenticated={setIsAuthenticated}
                isSuperAdmin={isSuperAdmin}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />
            <main className="layout-main">
                {children}
            </main>
        </div>
    );
}

export default Layout;
