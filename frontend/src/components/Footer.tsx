// src/components/Footer.tsx
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-text.png';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white py-4 px-6 flex justify-between items-center border-t">
            <div className="flex items-center">
                <img src={logo} alt="CineNiche" className="h-6" />
            </div>

            <div>
                <Link to="/privacy" className="text-gray-700 hover:text-gray-900">
                    Privacy
                </Link>
            </div>
        </footer>
    );
};

export default Footer;