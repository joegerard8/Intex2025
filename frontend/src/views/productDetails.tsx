import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import './productDetails.css';
import {
  fetchMovieById,
  getSimilarMovies,
  fetchSimilarMoviesDetails,
  getUserId,
  submitUserRating,
  getUserRatings
} from '../api/api.ts';
import { useNavigate } from 'react-router-dom';
import { MoviesTitle } from '../types/movie.ts';
import MovieCard from '../components/MovieCard.tsx';
import MovieCarousel from '../components/MovieCarousel.tsx';
import { UserContext } from '../AuthorizeView';

interface SimilarMovie {
  id: string;
  title: string;
  posterUrl: string;
}

const ProductDetailPage: React.FC = () => {
    const { user } = useContext(UserContext);
    const [movie, setMovie] = useState<MoviesTitle | null>(null);
    const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userId, setUserId] = useState<number | null>(0);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);
    const [userRating, setUserRating] = useState<number>(0);

    const navigate = useNavigate();

    const showId = useParams<{ id: string }>().id || '0';

    // get the userId
    const fetchUserId = async (): Promise<number | null> => {
        try {
            if (user) {
            const response = await getUserId(user.email);
            setUserId(response); // for future use
            return response;     // for immediate use
            }
            return null;
        } catch (error) {
            console.error("Error fetching user ID:", error);
            return null;
        }
    };

    //get the similar movies
    const getSimilarTitles = async () => {
        try {
        const response = await getSimilarMovies(showId);
        const recommendationIds = Object.entries(response)
            .filter(([key]) => key.startsWith('recommendation'))
            .map(([, value]) => value);
        await getSimilarTitlesDetails(recommendationIds);
        } catch (err) {
        console.error('Failed to load similar titles', err);
        }
    };

    // get the details for similar movies to create movie cards
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

    // handle the click to the start to set the rating
    const handleStarClick = async (index: number) => {
        const rating = index + 1;
        setUserRating(rating);

        if (userId && movie?.showId) {
            await submitUserRating(userId, movie.showId, rating);
        }
    };

    const fetchMovie = async () => {
        try {
            const movieResponse = await fetchMovieById(showId);
            if (movieResponse) {
                setMovie(movieResponse.movies[0]);
            }
        } catch (err) {
            console.error('Error fetching movie:', err);
            setError('Failed to load movie details');
        }
    };

    const fetchUserRatings = async (userId: number, showId: string) => {
        try {
            const ratings = await getUserRatings(userId, showId);

            // Handle if ratings is null, undefined, or missing .rating
            const ratingValue = ratings?.rating ?? 0;

            setUserRating(ratingValue);
        } catch (err) {
            console.error('Error fetching user ratings:', err);
            setUserRating(0); // fallback to 0 if it completely fails
        }
    };


    // loads on mount
    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const uid = await fetchUserId();
            await fetchMovie();
            await getSimilarTitles();
            if (uid !== null && showId !== null) {
                await fetchUserRatings(uid, showId);
            }
            setLoading(false);
        }
        getData();
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
                <div className="back-button" onClick={() => navigate(-1)}>
                    &times;
                </div>
                <div className="barcode-logo">
                    <div className="barcode-image">
                    </div>
                </div>

                <div className="movie-details">
                    <h1 className="movie-title">{movie.title}</h1>

                    <div className="movie-meta">
                        <div className="meta-item">
                            <span className="meta-label">Duration:</span>
                            <span className="meta-value">
                            {movie.duration && movie.duration.includes('Season')
                                ? movie.duration
                                : `${movie.duration}utes`}
                            </span>
                        </div>

                        {movie.director && movie.director.trim() !== '' && (
                        <div className="meta-item">
                            <span className="meta-label">Director:</span>
                            <span className="meta-value">
                            {(() => {
                                const parts = movie.director.trim().split(' ');
                                if (parts.length < 3) {
                                // 1 director or something simple
                                return movie.director;
                                }
                                // Group every two words as one name
                                const grouped = [];
                                for (let i = 0; i < parts.length; i += 2) {
                                grouped.push(`${parts[i]} ${parts[i + 1] || ''}`);
                                }
                                return grouped.join(', ');
                            })()}
                            </span>
                        </div>
                        )}

                        {movie.cast && movie.cast.trim() !== '' && (
                        <div className="meta-item">
                            <span className="meta-label">Cast:</span>
                            <span className="meta-value">
                            {(() => {
                                const parts = movie.cast.trim().split(' ');
                                const grouped = [];

                                for (let i = 0; i < parts.length; i += 2) {
                                const first = parts[i];
                                const last = parts[i + 1] || '';
                                grouped.push(`${first} ${last}`);
                                }

                                return grouped.join(', ');
                            })()}
                            </span>
                        </div>
                        )}

                        {movie.country && movie.country.trim() !== '' && (
                        <div className="meta-item">
                            <span className="meta-label">Country of Origin:</span>
                            <span className="meta-value">{movie.country}</span>
                        </div>
                        )}

                        {movie.rating && movie.rating.trim() !== '' && (
                        <div className="meta-item">
                            <span className="meta-label">MPAA Rating:</span>
                            <span className="meta-value">{movie.rating}</span>
                        </div>
                        )}


                        {/* <div className="meta-item">
                            <span className="meta-label">Genres:</span>
                            <span className="meta-value">{movie.genres.join(', ')}</span>
                        </div> */}
                    </div>

                    <div className="movie-description">
                        <p>{movie.description}</p>
                    </div>

                    <div className="rating">
                        <div className="rating-label">Leave your rating:</div>
                        {[...Array(5)].map((_, i) => (
                        <span
                            key={i}
                            className={`star ${i < (hoveredRating ?? userRating) ? 'filled' : ''}`}
                            onClick={() => handleStarClick(i)} // ✅ changed this
                            onMouseEnter={() => setHoveredRating(i + 1)}
                            onMouseLeave={() => setHoveredRating(null)}
                        >
                            ★
                        </span>
                        ))}

                        <span className="rating-value">({userRating || 0})</span>
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

            </div>
            <MovieCarousel movies={similarMovies} title="Similar Titles" />
        </Layout>
    );
};

export default ProductDetailPage;