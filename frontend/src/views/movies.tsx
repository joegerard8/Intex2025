import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './movies.css';
import logoForMovies from '../assets/logoForMovies.png';
import AuthorizeView from '../AuthorizeView';
import { fetchMovies } from '../api/api.ts';
import MovieCard from '../components/MovieCard.tsx';

interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    genres: string[];
    year: number;
}

const Movies: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage] = useState(20); // or whatever chunk size works
    const [hasMore, setHasMore] = useState(true);
    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const [totalMovies, setTotalMovies] = useState(0);

    const handleSearchChage = (searchTerm: string ) => {
      setMovies([]);
      setCurrentPage(1);
      setHasMore(true);
      setSearchTerm(searchTerm);
    };

    const loadMovies = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(
          moviesPerPage,
          currentPage,
          selectedGenres,
          searchTerm
        );

        const moviesData = data.movies
          .filter((movieData: any) => movieData.image_url && movieData.image_url.trim() !== '')
          .map((movieData: any) => ({
            id: movieData.showId,
            title: movieData.title,
            posterUrl: movieData.image_url,
            genres: movieData.genres || [],
            year: movieData.year ?? 0
        }));


        setMovies(prev => [...prev, ...moviesData]);
      // append new movies
        setTotalMovies(data.totalNumMovies);
        if (movies.length + data.movies.length >= data.totalNumMovies) {
          setHasMore(false);
        }
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
  };

    useEffect(() => {
      loadMovies();
    }, [currentPage, searchTerm, selectedGenres]);

    useEffect(() => {
      setMovies([]);
      setCurrentPage(1);
      setHasMore(true);
    }, [searchTerm, selectedGenres]);

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

    // // Filter movies based on search term
    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
          <div className="movies-page">
            <div className="barcode-logo">
              <div className="barcode-image">
                <img src={logoForMovies} alt="CineNiche Logo" />
              </div>
              {/* Removed brand name text */}
            </div>

            <div className="search-container">
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
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>
            </div>

            {error && (
            <div className="error-message">{error}</div>
          )}

          <h1 className="section-title">Our Catalog</h1>

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

          {filteredMovies.length === 0 && !loading && (
            <div className="no-results">
              No movies found matching "{searchTerm}"
            </div>
          )}

          {loading && (
            <div className="loading-indicator">
              Loading more movies...
            </div>
          )}
        </div>

    );
};

export default Movies;