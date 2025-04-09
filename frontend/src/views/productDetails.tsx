import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './productDetails.css';
import { getMovies, getSimilarMovies, fetchSimilarMoviesDetails } from '../api/api.ts';
import { MoviesTitle } from '../types/movie.ts';
import MovieCard from '../components/MovieCard.tsx';   
import MovieCarousel from '../components/MovieCarousel.tsx';


interface SimilarMovie {
    id: string;
    title: string;
    posterUrl: string;
}


const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MoviesTitle | null>(null);
    const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const showId = useParams<{ id: string }>().id || '0';

    const getSimilarTitles = async () => {
        try {
            const response = await getSimilarMovies(showId);
            const recommendationIds = Object.entries(response)
                .filter(([key]) => key.startsWith("recommendation"))
                .map(([, value]) => value);
            getSimilarTitlesDetails(recommendationIds);
        }
        catch (err) {
            console.error('Failed to load similar titles', err);
        }
    };

    const getSimilarTitlesDetails = async (recommendations: string[]) => {
        try {
            const movies = await fetchSimilarMoviesDetails(recommendations);
            const similarMoviesData = movies.map((movieData: any) => ({
                id: movieData.movies[0].showId,
                title: movieData.movies[0].title,
                posterUrl: movieData.movies[0].image_url
            }));
            setSimilarMovies(similarMoviesData);
        } catch (err) {
            console.error('Failed to load similar movie details', err);
        }
    };


    useEffect(() => {
        setLoading(true);
        const fetchMovie = async () => {
            try {
                const response = await getMovies(showId);
                console.log(response.movies[0])
                setMovie(response.movies[0] || null);
            } catch (err) {
                setError('Failed to load movie details');
            }
        };
        fetchMovie();
        getSimilarTitles();
        setLoading(false);
    }, [showId]);


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
                        <img src="/barcode.png" alt="CineNiche" />
                    </div>
                    <div className="brand-name">CineNiche</div>
                </div>

                <div className="movie-details">
                    <h1 className="movie-title">{movie.title}</h1>

                    <div className="rating">
                        {[...Array(5)].map((_, i) => (
                            <span
                                key={i}
                                className={`star ${i < Math.floor(parseInt(movie.rating || '0')) ? 'filled' : ''}`}
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
                            <span className="meta-value">{movie.cast}</span>
                        </div>

                        <div className="meta-item">
                            <span className="meta-label">Country of Origin:</span>
                            <span className="meta-value">{movie.country}</span>
                        </div>

                        {/* <div className="meta-item">
                            <span className="meta-label">Genres:</span>
                            <span className="meta-value">{movie.genres.join(', ')}</span>
                        </div> */}
                    </div>

                    <div className="movie-description">
                        <p>{movie.description}</p>
                    </div>
                </div>

                <div className="movie-poster-container">
                    <div className="movie-poster-placeholder">
                        <img 
                            src={movie.image_url} 
                            className="w-100 h-100" 
                            style={{ objectFit: 'cover' }} 
                            alt={movie.title}
                        />
                    </div>
                </div>

                {/* <div className="similar-movies">
                    <h2>Similar Titles</h2>
                    <div className="similar-movies-grid">
                        {similarMovies.map(similar => (
                            <MovieCard
                                key={similar.id}
                                url={similar.posterUrl}
                                title={similar.title}
                                showId={similar.id}
                            />
                        ))}
                    </div>
                </div> */}
            </div>
            <MovieCarousel movies={similarMovies} title="Similar Titles" />
        </Layout>
    );
};

export default ProductDetailPage;