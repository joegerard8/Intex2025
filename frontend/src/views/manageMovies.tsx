import React, { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import "./manageMovies.css";
import { UserContext } from "../AuthorizeView";

interface Movie {
  id: string;
  title: string;
  manager: string;
  email: string;
}

const ManageMovies: React.FC = () => {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));

        const mockMovies: Movie[] = Array.from({ length: 30 }, (_, i) => ({
          id: (i + 1).toString(),
          title: `Movie Title ${i + 1}`,
          manager: "Product Manager",
          email: "username@company.com",
        }));

        setMovies(mockMovies);
      } catch (err) {
        setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const toggleSelectAll = () => {
    if (selectedMovies.size === paginatedMovies.length) {
      setSelectedMovies(new Set());
    } else {
      const newSelected = new Set(selectedMovies);
      paginatedMovies.forEach((movie) => newSelected.add(movie.id));
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

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const paginatedMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];

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
    <div className="manage-movies-page">
      <div className="barcode-logo">
        <div className="barcode-image">
          <img src="/barcode.png" alt="CineNiche" />
        </div>
        <div className="brand-name">CineNiche</div>
      </div>

      <h1 className="welcome-title">Welcome, {user?.email}</h1>

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
                      selectedMovies.size === paginatedMovies.length &&
                      paginatedMovies.length > 0
                    }
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
              {paginatedMovies.map((movie) => (
                <tr key={movie.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedMovies.has(movie.id)}
                      onChange={() => toggleSelectMovie(movie.id)}
                    />
                  </td>
                  <td>{movie.title}</td>
                  <td>Product manager</td>
                  <td>{movie.email}</td>
                  <td>
                    <button className="action-button edit-button">
                      <span className="action-dot"></span>
                    </button>
                  </td>
                  <td>
                    <button className="action-button delete-button">
                      <span className="action-dot"></span>
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