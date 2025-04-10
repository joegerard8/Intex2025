// Header.tsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../AuthorizeView"; // Update path if needed
import Logout from "../Logout";
import logo from '../assets/logoForMovies.png';

const Header: React.FC = () => {
    const { user } = useContext(UserContext);
    const isAdmin = user?.roles?.includes("Administrator") ?? false;

    return (
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="CineNiche Logo" className="logo-icon" />
          </Link>
        </div>
        <nav className="nav">
          {/* Logged-in users */}
          {user && (
            <>
              <Link to="/" className="nav-link">
                Recommendations
              </Link>
              <Link to="/movies" className="nav-link">
                All Movies
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
            <div className="auth-links">
              <Link to="/login" className="nav-link sign-in">
                Sign In
              </Link>
              <Link to="/register" className="nav-link register">
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>
    );
};

export default Header;