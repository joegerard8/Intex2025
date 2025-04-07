// src/components/Header.tsx
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
            <Link to="/" className="flex items-center">
                <div className="rounded-full bg-gray-900 w-10 h-10 flex items-center justify-center">
                    <span className="text-white text-xl">★</span>
                </div>
            </Link>

            <nav className="flex items-center space-x-6">
                <Link to="/movies" className="text-gray-700 hover:text-gray-900">
                    Movies
                </Link>
                <Link to="/privacy" className="text-gray-700 hover:text-gray-900">
                    Privacy
                </Link>

                <div className="flex items-center space-x-4">
                    <Link
                        to="/signin"
                        className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
                    >
                        Sign in
                    </Link>
                    <Link
                        to="/register"
                        className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
                    >
                        Register
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
