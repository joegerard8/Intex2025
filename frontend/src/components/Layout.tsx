import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { user, logout } = useAuth();

    return (
        <div className="layout">
            <header className="header">
                <div className="logo-container">
                    <Link to="/">
                        <img
                            alt="CineNiche Logo"
                            className="logo-icon"
                        />
                    </Link>
                </div>
                <nav className="nav">
                    <Link to="/movies" className="nav-link">Movies</Link>
                    <Link to="/privacy" className="nav-link">Privacy</Link>
                    {!user ? (
                        <>
                            <button onClick={() => alert('Sign in functionality would be here')} className="nav-link sign-in">Sign In</button>
                            <button onClick={() => alert('Register functionality would be here')} className="nav-link register">Register</button>
                        </>
                    ) : (
                        <>
                            {user.isAdmin && (
                                <Link to="/manage-movies" className="nav-link">Manage Movies</Link>
                            )}
                            <button onClick={logout} className="nav-link sign-out">Sign Out</button>
                        </>
                    )}
                </nav>
            </header>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;