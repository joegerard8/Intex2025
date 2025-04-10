import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import "./manageMovies.css";
import { UserContext } from "../AuthorizeView";
import GenreFilter from "../components/GenreFilter";
import SearchIcon from '@mui/icons-material/Search'; // Use Material UI icon instead 
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  fetchMovies,
  deleteMovie,
  updateMovie,
  addMovie,
  fetchMovieById,
} from "../api/api";
import { MoviesTitle } from "../types/movie";
import Modal from "../components/Modal";
import MovieForm from "../components/MovieForm";

const ManageMovies: React.FC = () => {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState<MoviesTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [totalMovies, setTotalMovies] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState<MoviesTitle | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  const moviesPerPage = 10;

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies(
          moviesPerPage,
          currentPage,
          selectedGenres,
          searchTerm
      );
      setMovies(data.movies);
      setTotalMovies(data.totalNumMovies);
    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [currentPage, selectedGenres, searchTerm]);

  const handleDeleteMovie = async (id: string) => {
    setSelectedMovieId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteMovie = async () => {
    if (!selectedMovieId) return;

    try {
      await deleteMovie(selectedMovieId);
      loadMovies();
      setIsDeleteModalOpen(false);
      setSelectedMovieId(null);
      // Remove from selected movies if it was selected
      if (selectedMovies.has(selectedMovieId)) {
        const updated = new Set(selectedMovies);
        updated.delete(selectedMovieId);
        setSelectedMovies(updated);
      }
    } catch (error) {
      setError("Failed to delete movie");
    }
  };

  const handleEditMovie = async (id: string) => {
    try {
      const movie = await fetchMovieById(id);
      if (movie) {
        setCurrentMovie(movie.movies[0]);
        setIsEditModalOpen(true);
      }
    } catch (error) {
      setError("Failed to load movie details");
    }
  };

  const handleAddMovie = () => {
    setCurrentMovie(null);
    setIsAddModalOpen(true);
  };

  const handleSubmitAdd = async (movie: MoviesTitle) => {
    try {
      await addMovie(movie);
      setIsAddModalOpen(false);
      loadMovies();
    } catch (error) {
      setError("Failed to add movie");
    }
  };

  const handleSubmitEdit = async (movie: MoviesTitle) => {
    try {
      await updateMovie(movie.showId, movie);
      setIsEditModalOpen(false);
      loadMovies();
    } catch (error) {
      setError("Failed to update movie");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedMovies.size === 0) return;

    try {
      setLoading(true);
      const promises = Array.from(selectedMovies).map((id) => deleteMovie(id));
      await Promise.all(promises);
      setSelectedMovies(new Set());
      loadMovies();
    } catch (error) {
      setError("Failed to delete selected movies");
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    if (selectedMovies.size === movies.length) {
      setSelectedMovies(new Set());
    } else {
      setSelectedMovies(new Set(movies.map((m) => m.showId)));
    }
  };

  const toggleSelectMovie = (id: string) => {
    const updated = new Set(selectedMovies);
    updated.has(id) ? updated.delete(id) : updated.add(id);
    setSelectedMovies(updated);
  };

  const renderPagination = () => {
    const pages = [];
    const totalPages = Math.ceil(totalMovies / moviesPerPage);

    pages.push(
        <button
            key="prev"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-button"
        >
          Prev
        </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (
          i === 1 ||
          i === totalPages ||
          (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
            <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`pagination-button ${currentPage === i ? "active" : ""}`}
            >
              {i}
            </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push(
            <span key={`ellipsis-${i}`} className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    pages.push(
        <button
            key="next"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="pagination-button"
        >
          Next
        </button>
    );

    return pages;
  };

  return (
    <div className="manage-movies-page">
      <div className="barcode-logo">
        <div className="barcode-image">
        </div>
        <div className="brand-name"></div>
      </div>

      <h1 className="welcome-title">Welcome, {user?.email}</h1>

      <div className="management-toolbar">
        <div className="filter-search-container">
          {/* Updated GenreFilter with filter icon */}
          <GenreFilter
            selectedGenres={selectedGenres}
            setSelectedGenres={setSelectedGenres}
          />

          <div style={{ position: "relative", width: "100%" }}>
            <SearchIcon
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#666",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 3rem", // left padding for icon
                backgroundColor: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "4px",
                color: "#ddd",
                fontSize: "1rem",
              }}
            />
          </div>
        </div>

        <div className="action-buttons">
          <button className="add-button" onClick={handleAddMovie}>
            Add New Movie
          </button>
          {selectedMovies.size > 0 && (
            <button className="bulk-delete-button" onClick={handleBulkDelete}>
              Delete Selected ({selectedMovies.size})
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="movies-table-container">
          {movies.length === 0 ? (
            <div className="no-movies-message">
              No movies found. Try changing your filters or add a new movie.
            </div>
          ) : (
            <table className="movies-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={
                        selectedMovies.size === movies.length &&
                        movies.length > 0
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Release Year</th>
                  <th>Duration</th>
                  <th>Rating</th>
                  <th colSpan={2}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.showId}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedMovies.has(movie.showId)}
                        onChange={() => toggleSelectMovie(movie.showId)}
                      />
                    </td>
                    <td>{movie.title}</td>
                    <td>{movie.type}</td>
                    <td>{movie.releaseYear}</td>
                    <td>{movie.duration}</td>
                    <td>{movie.rating}</td>
                    <td>
                      <button
                          className="action-button edit-button"
                          onClick={() => handleEditMovie(movie.showId)}
                          style={{
                            background: "linear-gradient(to bottom, #6ba5e7, #5089d3)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                            width: "100px",  // Fixed width
                            height: "36px",  // Fixed height
                            margin: "0 auto" // Center in cell
                          }}
                      >
                        <EditIcon style={{ fontSize: "18px", marginRight: "6px" }} /> Edit
                      </button>
                    </td>
                    <td>
                      <button
                          className="action-button delete-button"
                          onClick={() => handleDeleteMovie(movie.showId)}
                          style={{
                            background: "linear-gradient(to bottom, #e9807a, #d15a52)",
                            color: "white",
                            border: "none",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                            width: "100px",  // Fixed width
                            height: "36px",  // Fixed height
                            margin: "0 auto" // Center in cell
                          }}
                      >
                        <DeleteIcon style={{ fontSize: "18px", marginRight: "6px" }} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="pagination">{renderPagination()}</div>
        </div>
      )}

      {/* Add Movie Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Movie"
      >
        <MovieForm
          onSubmit={handleSubmitAdd}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Movie Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Movie"
      >
        {currentMovie && (
          <MovieForm
            movie={currentMovie}
            onSubmit={handleSubmitEdit}
            onCancel={() => setIsEditModalOpen(false)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="delete-confirmation">
          <p>Are you sure you want to delete this movie?</p>
          <div className="modal-actions">
            <button
              className="cancel-button"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button className="delete-button" onClick={confirmDeleteMovie}>
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageMovies;