import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';
import HomePageLogo from '../assets/HomePageLogo.png'; // Import the logo

interface Movie {
    id: string;
    title: string;
    posterUrl: string;
}

const HomePage: React.FC = () => {
    const { user } = useAuth();
    const [topMovies, setTopMovies] = useState<Movie[]>([]);
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        // In a real app, you would fetch this data from your API
        // For now, we're using mock data
        const mockTopMovies = [
            { id: '1', title: 'Extraordinary Stories', posterUrl: '' },
            { id: '2', title: '1 Mile To You', posterUrl: '' },
            { id: '3', title: 'TBR', posterUrl: '' },
            { id: '4', title: '1st Summoning', posterUrl: '' },
            { id: '5', title: '30% Skill', posterUrl: '' },
        ];

        const mockRecommendedMovies = [
            { id: '6', title: '4th Man Out', posterUrl: '' },
            { id: '7', title: '3 Turken & 1 Baby', posterUrl: '' },
            { id: '8', title: '5x7', posterUrl: '' },
            { id: '9', title: '6 cm', posterUrl: '' },
            { id: '10', title: 'Khon Maat', posterUrl: '' },
            { id: '11', title: '10 Days In City', posterUrl: '' },
            { id: '12', title: '10 Jours En Or', posterUrl: '' },
            { id: '13', title: '24 Hours', posterUrl: '' },
            { id: '14', title: '50 Kills', posterUrl: '' },
            { id: '15', title: '6-5=2', posterUrl: '' },
        ];

        setTopMovies(mockTopMovies);
        setRecommendedMovies(mockRecommendedMovies);
    }, []);

    return (
        <Layout>
            <div className="home-page">
                <div className="logo-banner">
                    <div className="main-logo">
                        <img src={HomePageLogo} alt="CineNiche Logo" className="huge-centered-logo" />
                    </div>
                </div>

                {!user ? (
                    <div className="auth-buttons">
                        <Link to="/register" className="auth-button register-btn">Register</Link>
                        <Link to="/signin" className="auth-button login-btn">Login</Link>
                    </div>
                ) : (
                    <div className="welcome-section">
                        <h1>Welcome, {user.username}</h1>
                    </div>
                )}

                <div className="movies-section">
                    <h2>{!user ? 'Top Films' : 'Recommended for you'}</h2>
                    <div className="movie-grid">
                        {(!user ? topMovies : recommendedMovies).map((movie) => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                                <div className="movie-poster-placeholder">
                                    <span className="movie-title-placeholder">{movie.title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;