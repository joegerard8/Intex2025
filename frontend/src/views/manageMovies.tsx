import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import './manageMovies.css';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface Movie {
    id: string;
    title: string;
    averageRating: number;
    releaseYear: number;
    duration: string;
}

interface MovieFormData {
    id?: string;
    title: string;
    averageRating: number;
    releaseYear: number;
    duration: string;
}

const ManageMovies: React.FC = () => {
    const { user } = useAuth();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedMovies, setSelectedMovies] = useState<Set<string>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [moviesPerPage, setMoviesPerPage] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [formData, setFormData] = useState<MovieFormData>({
        title: '',
        averageRating: 0,
        releaseYear: new Date().getFullYear(),
        duration: ''
    });
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [movieToDelete, setMovieToDelete] = useState<string | null>(null);

    // Redirect if not admin
    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    /**
     * Fetches movies from the API
     *
     * REPLACE THIS WITH YOUR API IMPLEMENTATION:
     *
     * const fetchMovies = async () => {
     *   setLoading(true);
     *   setError('');
     *
     *   try {
     *     // Make API call to fetch movies
     *     const response = await fetch('/api/movies');
     *
     *     if (!response.ok) {
     *       throw new Error('Failed to fetch movies');
     *     }
     *
     *     const data = await response.json();
     *     setMovies(data);
     *   } catch (err) {
     *     setError('Failed to load movies');
     *     console.error(err);
     *   } finally {
     *     setLoading(false);
     *   }
     * };
     */

        // Mock implementation for now
    const fetchMovies = async () => {
            setLoading(true);
            setError('');

            try {
                // Simulating API call
                await new Promise(resolve => setTimeout(resolve, 500));

                // Mock data
                const mockMovies: Movie[] = Array.from({ length: 30 }, (_, i) => ({
                    id: (i + 1).toString(),
                    title: `Movie Title ${i + 1}`,
                    averageRating: Number((Math.random() * 5).toFixed(1)),
                    releaseYear: Math.floor(Math.random() * 24) + 2000, // Random year between 2000-2023
                    duration: `${Math.floor(Math.random() * 60) + 90} min`, // Random duration between 90-150 min
                }));

                setMovies(mockMovies);
            } catch (err) {
                setError('Failed to load movies');
            } finally {
                setLoading(false);
            }
        };

    const toggleSelectAll = () => {
        if (selectedMovies.size === paginatedMovies.length) {
            // If all are selected, deselect all
            setSelectedMovies(new Set());
        } else {
            // Otherwise, select all
            const newSelected = new Set(selectedMovies);
            paginatedMovies.forEach(movie => newSelected.add(movie.id));
            setSelectedMovies(newSelected);
        }
    };

    const toggleSelectMovie = (id: string) => {
        const newSelected = new Set(selectedMovies);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedMovies(newSelected);
    };

    // Add movie function
    const handleAddMovie = () => {
        setModalMode('add');
        setFormData({
            title: '',
            averageRating: 0,
            releaseYear: new Date().getFullYear(),
            duration: ''
        });
        setShowModal(true);
    };

    // Edit movie function
    const handleEditMovie = (movie: Movie) => {
        setModalMode('edit');
        setFormData({
            id: movie.id,
            title: movie.title,
            averageRating: movie.averageRating,
            releaseYear: movie.releaseYear,
            duration: movie.duration
        });
        setShowModal(true);
    };

    // Delete movie function
    const handleDeleteClick = (id: string) => {
        setMovieToDelete(id);
        setShowDeleteConfirm(true);
    };

    /**
     * Confirms and executes movie deletion
     *
     * REPLACE THIS WITH YOUR API IMPLEMENTATION:
     *
     * const confirmDelete = async () => {
     *   if (movieToDelete) {
     *     try {
     *       // API call to delete a movie
     *       const response = await fetch(`/api/movies/${movieToDelete}`, {
     *         method: 'DELETE',
     *       });
     *
     *       if (!response.ok) {
     *         throw new Error('Failed to delete movie');
     *       }
     *
     *       // Update local state after successful deletion
     *       setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieToDelete));
     *
     *       // Also remove from selected if it was selected
     *       if (selectedMovies.has(movieToDelete)) {
     *         const newSelected = new Set(selectedMovies);
     *         newSelected.delete(movieToDelete);
     *         setSelectedMovies(newSelected);
     *       }
     *     } catch (err) {
     *       console.error(err);
     *       setError('Failed to delete movie');
     *       // You might want to show an error message to the user here
     *     }
     *   }
     *   setShowDeleteConfirm(false);
     *   setMovieToDelete(null);
     * };
     */

        // Mock implementation for now
    const confirmDelete = () => {
            if (movieToDelete) {
                // In a real app, you would call your API to delete the movie
                setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieToDelete));

                // Also remove from selected if it was selected
                if (selectedMovies.has(movieToDelete)) {
                    const newSelected = new Set(selectedMovies);
                    newSelected.delete(movieToDelete);
                    setSelectedMovies(newSelected);
                }
            }
            setShowDeleteConfirm(false);
            setMovieToDelete(null);
        };

    /**
     * Handles bulk deletion of selected movies
     *
     * REPLACE THIS WITH YOUR API IMPLEMENTATION:
     *
     * const handleBulkDelete = async () => {
     *   try {
     *     // API call to delete multiple movies
     *     const response = await fetch('/api/movies/bulk-delete', {
     *       method: 'DELETE',
     *       headers: {
     *         'Content-Type': 'application/json',
     *       },
     *       body: JSON.stringify({
     *         ids: Array.from(selectedMovies)
     *       }),
     *     });
     *
     *     if (!response.ok) {
     *       throw new Error('Failed to delete selected movies');
     *     }
     *
     *     // Update local state after successful deletion
     *     setMovies(prevMovies => prevMovies.filter(movie => !selectedMovies.has(movie.id)));
     *     setSelectedMovies(new Set());
     *   } catch (err) {
     *     console.error(err);
     *     setError('Failed to delete selected movies');
     *     // You might want to show an error message to the user here
     *   }
     * };
     */

        // Mock implementation for now
    const handleBulkDelete = () => {
            // In a real app, you would call your API to delete multiple movies
            setMovies(prevMovies => prevMovies.filter(movie => !selectedMovies.has(movie.id)));
            setSelectedMovies(new Set());
        };

    /**
     * Handles form submission for adding/editing a movie
     *
     * REPLACE THIS WITH YOUR API IMPLEMENTATION:
     *
     * const handleSubmit = async (e: React.FormEvent) => {
     *   e.preventDefault();
     *
     *   try {
     *     if (modalMode === 'add') {
     *       // API call to create a new movie
     *       const response = await fetch('/api/movies', {
     *         method: 'POST',
     *         headers: {
     *           'Content-Type': 'application/json',
     *         },
     *         body: JSON.stringify(formData),
     *       });
     *
     *       if (!response.ok) {
     *         throw new Error('Failed to create movie');
     *       }
     *
     *       const newMovie = await response.json();
     *       setMovies(prevMovies => [...prevMovies, newMovie]);
     *     } else {
     *       // API call to update an existing movie
     *       const response = await fetch(`/api/movies/${formData.id}`, {
     *         method: 'PUT',
     *         headers: {
     *           'Content-Type': 'application/json',
     *         },
     *         body: JSON.stringify(formData),
     *       });
     *
     *       if (!response.ok) {
     *         throw new Error('Failed to update movie');
     *       }
     *
     *       const updatedMovie = await response.json();
     *       setMovies(prevMovies =>
     *         prevMovies.map(movie =>
     *           movie.id === updatedMovie.id ? updatedMovie : movie
     *         )
     *       );
     *     }
     *
     *     setShowModal(false);
     *   } catch (err) {
     *     console.error(err);
     *     setError('Failed to save movie');
     *     // You might want to show an error message to the user here
     *   }
     * };
     */

        // Mock implementation for now
    const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();

            if (modalMode === 'add') {
                // In a real app, you would call your API to add the movie
                const newMovie: Movie = {
                    id: (movies.length + 1).toString(),
                    ...formData
                };
                setMovies(prevMovies => [...prevMovies, newMovie]);
            } else {
                // In a real app, you would call your API to update the movie
                setMovies(prevMovies =>
                    prevMovies.map(movie =>
                        movie.id === formData.id ? { ...movie, ...formData } : movie
                    )
                );
            }

            setShowModal(false);
        };

    // Form input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'averageRating' || name === 'releaseYear'
                ? Number(value)
                : value
        }));
    };

    // Pagination
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const paginatedMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleMoviesPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMoviesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const renderPagination = () => {
        const pages = [];

        // Previous button
        pages.push(
            <button
                key="prev"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Prev
            </button>
        );

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 ||
                i === totalPages ||
                (i >= currentPage - 1 && i <= currentPage + 1)
            ) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={`pagination-button ${currentPage === i ? 'active' : ''}`}
                    >
                        {i}
                    </button>
                );
            } else if (
                i === currentPage - 2 ||
                i === currentPage + 2
            ) {
                pages.push(
                    <span key={`ellipsis-${i}`} className="pagination-ellipsis">...</span>
                );
            }
        }

        // Next button
        pages.push(
            <button
                key="next"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Next
            </button>
        );

        return pages;
    };

    return (
        <Layout>
            <div className="manage-movies-page">
                <div className="barcode-logo">
                    <div className="barcode-image">
                        <img src="/barcode.png" alt="CineNiche" />
                    </div>
                    <div className="brand-name">CineNiche</div>
                </div>

                <h1 className="welcome-title">Welcome, {user.username}</h1>

                <div className="admin-controls">
                    <button className="action-button edit-button" onClick={handleAddMovie}>
                        Add New Movie
                    </button>
                    {selectedMovies.size > 0 && (
                        <button className="action-button delete-button" onClick={handleBulkDelete}>
                            Delete Selected ({selectedMovies.size})
                        </button>
                    )}
                    <div className="page-size-control">
                        <label htmlFor="moviesPerPage">Movies per page:</label>
                        <select
                            id="moviesPerPage"
                            value={moviesPerPage}
                            onChange={handleMoviesPerPageChange}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Loading...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : (
                    <div className="movies-table-container">
                        <table className="movies-table">
                            <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={selectedMovies.size === paginatedMovies.length && paginatedMovies.length > 0}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th>Title</th>
                                <th>Average Rating</th>
                                <th>Release Year</th>
                                <th>Duration</th>
                                <th colSpan={2}>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {paginatedMovies.map(movie => (
                                <tr key={movie.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedMovies.has(movie.id)}
                                            onChange={() => toggleSelectMovie(movie.id)}
                                        />
                                    </td>
                                    <td>{movie.title}</td>
                                    <td>{movie.averageRating.toFixed(1)}</td>
                                    <td>{movie.releaseYear}</td>
                                    <td>{movie.duration}</td>
                                    <td>
                                        <button
                                            className="action-button edit-button"
                                            onClick={() => handleEditMovie(movie)}
                                        >
                                            <span className="action-dot"></span>
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="action-button delete-button"
                                            onClick={() => handleDeleteClick(movie.id)}
                                        >
                                            <span className="action-dot"></span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="pagination">
                            {renderPagination()}
                        </div>
                    </div>
                )}

                {/* Add/Edit Movie Modal */}
                {showModal && (
                    <div className="modal-backdrop">
                        <div className="modal">
                            <h2>{modalMode === 'add' ? 'Add New Movie' : 'Edit Movie'}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="title">Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="averageRating">Average Rating (0-5)</label>
                                    <input
                                        type="number"
                                        id="averageRating"
                                        name="averageRating"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={formData.averageRating}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="releaseYear">Release Year</label>
                                    <input
                                        type="number"
                                        id="releaseYear"
                                        name="releaseYear"
                                        min="1900"
                                        max={new Date().getFullYear()}
                                        value={formData.releaseYear}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="duration">Duration</label>
                                    <input
                                        type="text"
                                        id="duration"
                                        name="duration"
                                        placeholder="e.g. 120 min"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="modal-actions">
                                    <button
                                        type="button"
                                        className="action-button edit-button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="action-button edit-button"
                                    >
                                        {modalMode === 'add' ? 'Add Movie' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                    <div className="modal-backdrop">
                        <div className="modal delete-confirm-modal">
                            <h2>Confirm Delete</h2>
                            <p>Are you sure you want to delete this movie?</p>
                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="action-button edit-button"
                                    onClick={() => setShowDeleteConfirm(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="action-button delete-button"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                
            </div>
        </Layout>
    );
};

export default ManageMovies;