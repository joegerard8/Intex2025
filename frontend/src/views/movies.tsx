import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import './movies.css';
import logoForMovies from '../assets/logoForMovies.png';
import AuthorizeView from '../AuthorizeView';

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

    useEffect(() => {
        // In a real app, you would fetch movies from your API
        const fetchMovies = async () => {
            setLoading(true);
            setError('');

            try {
                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 500));

                // Mock data
                const mockMovies = [
                    { id: '1', title: '4th Man Out', posterUrl: '', genres: ['Comedy', 'Drama'], year: 2015 },
                    { id: '2', title: '3 Turken & 1 Baby', posterUrl: '', genres: ['Comedy'], year: 2015 },
                    { id: '3', title: '5x7', posterUrl: '', genres: ['Drama', 'Romance'], year: 2011 },
                    { id: '4', title: '6 cm', posterUrl: '', genres: ['Adventure', 'Drama'], year: 2017 },
                    { id: '5', title: 'Khon Maat', posterUrl: '', genres: ['Horror', 'Thriller'], year: 2019 },
                    { id: '6', title: '10 Days In City', posterUrl: '', genres: ['Drama', 'Crime'], year: 2014 },
                    { id: '7', title: '10 Jours En Or', posterUrl: '', genres: ['Comedy', 'Drama'], year: 2012 },
                    { id: '8', title: '24 Hours', posterUrl: '', genres: ['Action', 'Thriller'], year: 2016 },
                    { id: '9', title: '50 Kills', posterUrl: '', genres: ['Horror', 'Thriller'], year: 2018 },
                    { id: '10', title: '6-5=2', posterUrl: '', genres: ['Horror'], year: 2013 },
                ];

                setMovies(mockMovies);
            } catch (err) {
                setError('Failed to load movies');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    // Filter movies based on search term
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
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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

            {loading ? (
              <div className="loading">Loading...</div>
            ) : error ? (
              <div className="error-message">{error}</div>
            ) : (
              <>
                <h1 className="section-title">Top Films</h1>

                <div className="movies-grid">
                  {filteredMovies.map((movie) => (
                    <Link
                      key={movie.id}
                      to={`/movie/${movie.id}`}
                      className="movie-card"
                    >
                      <div className="movie-poster-container">
                        <div className="movie-poster-placeholder">
                          <span className="movie-title-placeholder">
                            {movie.title}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {filteredMovies.length === 0 && (
                  <div className="no-results">
                    No movies found matching "{searchTerm}"
                  </div>
                )}
              </>
            )}
          </div>
    );
};

export default Movies;