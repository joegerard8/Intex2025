import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './movies.css';
import logoForMovies from '../assets/logoForMovies.png';
import AuthorizeView from '../AuthorizeView';
import { fetchMovies } from '../api/api.ts';
import MovieCard from '../components/MovieCard.tsx';
import GenreFilter from '../components/GenreFilter.tsx';

// Define Movie interface structure
interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    genres: string[];
    year: number;
}

const Movies: React.FC = () => {
    // State management
    const [movies, setMovies] = useState<Movie[]>([]); // List of loaded movies
    const [loading, setLoading] = useState(true); // Loading indicator
    const [error, setError] = useState(''); // Error message
    const [searchTerm, setSearchTerm] = useState(''); // User search input

    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
    const [moviesPerPage] = useState(20); // Number of movies to fetch per page
    const [hasMore, setHasMore] = useState(true); // Flag to determine if more movies can be loaded
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // Active genre filters
    const [totalMovies, setTotalMovies] = useState(0); // Total number of movies available

    // Called when search input changes
    const handleSearchChage = (searchTerm: string) => {
        setMovies([]);
        setCurrentPage(1);
        setHasMore(true);
        setSearchTerm(searchTerm);
    };

    // Fetch movies from API
    const loadMovies = async () => {
        setLoading(true);
        try {
            const data = await fetchMovies(
                moviesPerPage,
                currentPage,
                selectedGenres,
                searchTerm
            );

            // Filter out movies without valid image URLs
            const newMovies = data.movies
                .filter((movieData: any) => movieData.image_url && movieData.image_url.trim() !== '')
                .map((movieData: any) => ({
                    id: movieData.showId,
                    title: movieData.title,
                    posterUrl: movieData.image_url,
                    genres: movieData.genres || [],
                    year: movieData.year ?? 0
                }));

            // Merge new unique movies into state
            setMovies(prev => {
                const existingIds = new Set(prev.map(m => m.id));
                const uniqueNewMovies = newMovies.filter(m => !existingIds.has(m.id));
                return [...prev, ...uniqueNewMovies];
            });

            setTotalMovies(data.totalNumMovies);

            // Determine if more movies should be loaded
            if (movies.length + data.movies.length >= data.totalNumMovies) {
                setHasMore(false);
            }
        } catch (err) {
            setError("Failed to load movies");
        } finally {
            setLoading(false);
        }
    };

    // Load more movies when user scrolls to the bottom
    useEffect(() => {
        if (currentPage === 1) return; // Avoid duplicate fetch when filters/search reset
        loadMovies();
    }, [currentPage]);

    // Reload movies when search term or genre filters change
    useEffect(() => {
        setMovies([]);
        setCurrentPage(1);
        setHasMore(true);

        loadMovies();
    }, [searchTerm, selectedGenres]);

    // Scroll event listener for infinite scroll behavior
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
                !loading &&
                hasMore
            ) {
                setCurrentPage(prev => prev + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);

    // Optionally filter movies again on client-side for UI reactivity
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Render the movies page
    return (
        <div className="movies-page">
            {/* Logo section */}
            <div className="barcode-logo">
                <div className="barcode-image">
                    <img src={logoForMovies} alt="CineNiche Logo" />
                </div>
            </div>

            {/* Search and Genre Filter section */}
            <div className="search-bar-wrapper">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Find your next movie..."
                        value={searchTerm}
                        onChange={(e) => handleSearchChage(e.target.value)}
                        className="search-input"
                    />
                    <button className="search-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>
                </div>

                {/* Genre filter dropdown */}
                <div className="filter-button">
                    <GenreFilter selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="error-message">{error}</div>
            )}

            {/* Section title */}
            <h1 className="section-title" style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                borderBottom: "1px solid #333",
                paddingBottom: "0.5rem",
                letterSpacing: "0.5px",
                background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(200,200,200,0.7))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0px 2px 3px rgba(0,0,0,0.3)"
            }}>
                Our Catalog
            </h1>

            {/* Display list of movies */}
            <div className="movies-grid">
                {filteredMovies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        url={movie.posterUrl}
                        title={movie.title}
                        showId={movie.id}
                    />
                ))}
            </div>

            {/* Display message when no movies found */}
            {filteredMovies.length === 0 && !loading && (
                <div className="no-results">
                    No movies found matching "{searchTerm}"
                </div>
            )}

            {/* Loading indicator */}
            {loading && (
                <div className="loading-indicator">
                    Loading more movies...
                </div>
            )}
        </div>
    );
};

export default Movies;
