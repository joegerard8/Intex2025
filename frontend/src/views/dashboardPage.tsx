import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import './dashboardPage.css'; 
import HomePageLogo from '../assets/HomePageLogo.png';

interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    progress?: number;
    lastWatched?: string;
}

interface WatchlistMovie {
    id: string;
    title: string;
    posterUrl: string;
    dateAdded: string;
}

const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [continueWatching, setContinueWatching] = useState<Movie[]>([]);
    const [recommended, setRecommended] = useState<Movie[]>([]);
    const [watchlist, setWatchlist] = useState<WatchlistMovie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, you would fetch this data from your API
        const fetchDashboardData = async () => {
            setLoading(true);

            try {
                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 500));

                // Mock data
                setContinueWatching([
                    {
                        id: '1',
                        title: '4th Man Out',
                        posterUrl: '',
                        progress: 45,
                        lastWatched: '2 days ago'
                    },
                    {
                        id: '6',
                        title: '10 Days In City',
                        posterUrl: '',
                        progress: 72,
                        lastWatched: 'yesterday'
                    },
                    {
                        id: '8',
                        title: '24 Hours',
                        posterUrl: '',
                        progress: 15,
                        lastWatched: '3 days ago'
                    },
                ]);

                setRecommended([
                    { id: '2', title: '3 Turken & 1 Baby', posterUrl: '' },
                    { id: '3', title: '5x7', posterUrl: '' },
                    { id: '4', title: '6 cm', posterUrl: '' },
                    { id: '5', title: 'Khon Maat', posterUrl: '' },
                ]);

                setWatchlist([
                    {
                        id: '7',
                        title: '10 Jours En Or',
                        posterUrl: '',
                        dateAdded: '2 weeks ago'
                    },
                    {
                        id: '9',
                        title: '50 Kills',
                        posterUrl: '',
                        dateAdded: '3 days ago'
                    },
                    {
                        id: '10',
                        title: '6-5=2',
                        posterUrl: '',
                        dateAdded: 'today'
                    },
                ]);
            } catch (err) {
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="loading">Loading your dashboard...</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="dashboard-page">
                <div className="barcode-logo">
                    <div className="barcode-image">
                        <img src={HomePageLogo} alt="CineNiche" />
                    </div>
                    <div className="brand-name">CineNiche</div>
                </div>

                <h1 className="welcome-title">Welcome, {user?.username}</h1>

                <section className="dashboard-section">
                    <h2 className="section-title">Continue Watching</h2>
                    <div className="movies-grid">
                        {continueWatching.map(movie => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                                <div className="movie-poster-container">
                                    <div className="movie-poster-placeholder">
                                        <span className="movie-title-placeholder">{movie.title}</span>
                                    </div>
                                    <div className="movie-progress-container">
                                        <div
                                            className="movie-progress-bar"
                                            style={{ width: `${movie.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="movie-details">
                                        <h3 className="movie-title">{movie.title}</h3>
                                        <p className="last-watched">Watched {movie.lastWatched}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="dashboard-section">
                    <h2 className="section-title">Recommended for You</h2>
                    <div className="movies-grid">
                        {recommended.map(movie => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                                <div className="movie-poster-container">
                                    <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
                                    <div className="movie-details">
                                        <h3 className="movie-title">{movie.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="dashboard-section">
                    <h2 className="section-title">Your Watchlist</h2>
                    <div className="movies-grid">
                        {watchlist.map(movie => (
                            <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card">
                                <div className="movie-poster-container">
                                    <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
                                    <div className="movie-details">
                                        <h3 className="movie-title">{movie.title}</h3>
                                        <p className="date-added">Added {movie.dateAdded}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default DashboardPage;