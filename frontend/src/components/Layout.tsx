import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../AuthorizeView"; // Update path if needed
import Logout from "../Logout";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useContext(UserContext);
const isAdmin = user?.roles?.includes("Administrator") ?? false;

  return (
    <div className="layout">
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img alt="CineNiche Logo" className="logo-icon" />
          </Link>
        </div>
        <nav className="nav">
          {/* Always visible */}
          <Link to="/privacy" className="nav-link">
            Privacy
          </Link>

          {/* Logged-in users */}
          {user && (
            <>
              <Link to="/movies" className="nav-link">
                My Movies
              </Link>
              {isAdmin && (
                <Link to="/managemovies" className="nav-link">
                  Manage Movies
                </Link>
              )}
              <Logout>
                <button className="nav-link sign-out">Sign Out</button>
              </Logout>
            </>
          )}

          {/* Logged-out users */}
          {!user && (
            <>
              <Link to="/login" className="nav-link sign-in">
                Sign In
              </Link>
              <Link to="/register" className="nav-link register">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
