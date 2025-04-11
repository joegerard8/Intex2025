// Footer component. Shows the privacy policy link and copyright information.
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>© {new Date().getFullYear()} CineNiche. All rights reserved.</p>
            </div>
            <div className="footer-links">
                <Link to="/privacy" className="footer-link">
                    Privacy
                </Link>
            </div>
        </footer>
    );
};

export default Footer;