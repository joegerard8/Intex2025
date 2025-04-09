import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import "./manageMovies.css";
import { UserContext } from "../AuthorizeView";
import GenreFilter from "../components/GenreFilter";
import {
  fetchMovies,
  deleteMovie,
  updateMovie,
  addMovie,
  fetchGenres,
} from "../api/api.ts";
import { MoviesTitle } from "../types/movie";

const ManageMovies: React.FC = () => {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState<MoviesTitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const moviesPerPage = 10;

  const loadMovies = async () => {
    setLoading(true);
    try {
      const data = await fetchMovies(
        moviesPerPage,
        currentPage,
        selectedGenres
      );
      setMovies(data.movies);
    } catch (err) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [currentPage, selectedGenres]);

  const handleDeleteMovie = async (id: string) => {
    try {
      await deleteMovie(id);
      loadMovies();
    } catch (error) {
      setError("Failed to delete movie");
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
    const totalPages = Math.ceil(movies.length / moviesPerPage);

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
        onClick={() => setCurrentPage((p) => p + 1)}
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
          <img src="/barcode.png" alt="CineNiche" />
        </div>
        <div className="brand-name">CineNiche</div>
      </div>

      <h1 className="welcome-title">Welcome, {user?.email}</h1>

      <GenreFilter
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
      />

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
                    checked={
                      selectedMovies.size === movies.length && movies.length > 0
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th>Title</th>
                <th>Release Year</th>
                <th>Duration</th>
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
                  <td>{movie.releaseYear}</td>
                  <td>{movie.duration}</td>
                  <td>
                    <button
                      className="action-button edit-button"
                      onClick={() => alert("Edit functionality coming soon")}
                    >
                      ✏️
                    </button>
                  </td>
                  <td>
                    <button
                      className="action-button delete-button"
                      onClick={() => handleDeleteMovie(movie.showId)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">{renderPagination()}</div>
        </div>
      )}
    </div>
  );
};

export default ManageMovies;
