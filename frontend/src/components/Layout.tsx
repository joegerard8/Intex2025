import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../AuthorizeView"; // Adjust if path is different
import Logout from "../Logout";
import "./Layout.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const user = useContext(UserContext);

  return (
    <div className="layout">
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img alt="CineNiche Logo" className="logo-icon" />
          </Link>
        </div>
        <nav className="nav">
          <Link to="/movies" className="nav-link">
            My Movies
          </Link>
          <Link to="/privacy" className="nav-link">
            Privacy
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="nav-link sign-in">
                Sign In
              </Link>
              <Link to="/register" className="nav-link register">
                Register
              </Link>
            </>
          ) : (
            <>
              {user.roles.includes("Administrator") && (
                <Link to="/manage-movies" className="nav-link">
                  Manage Movies
                </Link>
              )}
              <Logout>
                <button className="nav-link sign-out">Sign Out</button>
              </Logout>
            </>
          )}
        </nav>
      </header>
      <main className="main-content">{children}</main>
    </div>
  );
};

export default Layout;
