import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './productDetails.css';
import logoForMovies from './logoForMovies.png';

interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    duration: number;
    director: string;
    cast: string[];
    country: string;
    genres: string[];
    rating: number;
    description: string;
    year: number;
}

interface SimilarMovie {
    id: string;
    title: string;
    posterUrl: string;
}

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // In a real app, you would fetch the movie data from your API
        // For now, we'll simulate an API call with a timeout
        const fetchMovie = async () => {
            setLoading(true);
            setError('');

            try {
                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 500));

                // Mock data - in real app, this would come from your API
                if (id === '1') {
                    setMovie({
                        id: '1',
                        title: 'Jaws',
                        posterUrl: '',
                        duration: 118,
                        director: 'Steven Spielberg',
                        cast: ['Roy Scheider', 'Richard Dreyfuss', 'Robert Shaw', 'Murray Hamilton', 'Lorraine Gary'],
                        country: 'USA',
                        genres: ['Horror', 'Action', 'Adventure'],
                        rating: 4.5,
                        description: "When a young woman is killed by a shark while skinny-dipping near the New England tourist town of Amity Island, police chief Martin Brody wants to close the beaches but is overruled by the mayor who fears for the summer economy. With help from a marine biologist and a professional shark hunter, Brody attempts to hunt down the killer great white shark that threatens their summer beach community.",
                        year: 1975
                    });

                    setSimilarMovies([
                        { id: '16', title: 'Jaws 3-D', posterUrl: '' },
                        { id: '17', title: 'The Third Chronicles of Terror', posterUrl: '' },
                        { id: '18', title: 'Jaws 2', posterUrl: '' }
                    ]);
                } else {
                    // Default movie data if ID doesn't match
                    setMovie({
                        id: id || '0',
                        title: 'Sample Movie',
                        posterUrl: '',
                        duration: 120,
                        director: 'Sample Director',
                        cast: ['Actor 1', 'Actor 2', 'Actor 3'],
                        country: 'Country',
                        genres: ['Genre 1', 'Genre 2'],
                        rating: 4.0,
                        description: 'This is a sample movie description.',
                        year: 2020
                    });

                    setSimilarMovies([
                        { id: '19', title: 'Similar Movie 1', posterUrl: '' },
                        { id: '20', title: 'Similar Movie 2', posterUrl: '' },
                        { id: '21', title: 'Similar Movie 3', posterUrl: '' }
                    ]);
                }
            } catch (err) {
                setError('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="loading">Loading...</div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout>
                <div className="error-message">{error}</div>
            </Layout>
        );
    }

    if (!movie) {
        return (
            <Layout>
                <div className="error-message">Movie not found</div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="movie-detail-page">
                <div className="barcode-logo">
                    <div className="barcode-image">
                        <img src={logoForMovies} alt="CineNiche" />
                    </div>
                    <div className="brand-name">CineNiche</div>
                </div>

                <div className="movie-details">
                    <h1 className="movie-title">{movie.title}</h1>

                    <div className="rating">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`star ${i < Math.floor(movie.rating) ? 'filled' : ''}`}
                            >
                ★
              </span>
                        ))}
                        <span className="rating-value">({movie.rating})</span>
                    </div>

                    <div className="movie-meta">
                        <div className="meta-item">
                            <span className="meta-label">Duration:</span>
                            <span className="meta-value">{movie.duration} minutes</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Director:</span>
                            <span className="meta-value">{movie.director}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Cast:</span>
                            <span className="meta-value">{movie.cast.join(', ')}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Country of Origin:</span>
                            <span className="meta-value">{movie.country}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Genres:</span>
                            <span className="meta-value">{movie.genres.join(', ')}</span>
                        </div>
                    </div>

                    <div className="movie-description">
                        <p>{movie.description}</p>
                    </div>
                </div>

                <div className="movie-poster-container">
                    <div className="movie-poster-placeholder">
                        <span className="movie-title-placeholder">{movie.title}</span>
                    </div>
                </div>

                <div className="similar-movies">
                    <h2>Similar Titles</h2>
                    <div className="similar-movies-grid">
                        {similarMovies.map(similar => (
                            <Link key={similar.id} to={`/movie/${similar.id}`} className="similar-movie">
                                <div className="similar-movie-placeholder">
                                    <span className="similar-title-placeholder">{similar.title}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetailPage;