import { MoviesTitle } from "../types/movie";

interface FetchMoviesResponse {
  movies: MoviesTitle[];
  totalNumMovies: number;
}

interface SimilarMoviesResponse {
  title: string;
  recommendation1: string;
  recommendation2: string;
  recommendation3: string;
  recommendation4: string;
  recommendation5: string;
  recommendation6: string;
  recommendation7: string;
  recommendation8: string;
  recommendation9: string;
  recommendation10: string;
}

// Function to fetch movies from the API
export const API_URL = "https://localhost:5000/api/Movie";

// getting all the similar movies, queries the item recommendation table.
export const getSimilarMovies = async (showId: string): Promise<SimilarMoviesResponse> => {
  try {
    const response = await fetch(`${API_URL}/GetSimilarMovies/${showId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch similar movies");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    throw error;
  }
}

// Fetch movies (with pagination, genre filtering, and optional search)
export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[],
  search?: string,
): Promise<FetchMoviesResponse> => {
  try {
    const genreParams = selectedGenres
      .map((g) => `genres=${encodeURIComponent(g)}`)
      .join("&");

    const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";

    const response = await fetch(
      `${API_URL}/GetMovies?pageSize=${pageSize}&pageNum=${pageNum}${
        genreParams ? `&${genreParams}` : ""
      }${searchParam}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Fetch one specific movie by showId
export const fetchMovieById = async (
  showId: string
): Promise<FetchMoviesResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/GetMovies?showId=${showId}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch movie");
    }
    const data = await response.json();
    return data || null;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
  }
};

export const fetchSimilarMoviesDetails = async (recommendations: string[]) => {
  try {
    const promises = recommendations.map((id) =>
      fetch(`${API_URL}/GetMovies?showId=${id}`).then(res => res.json())
    );
    const movies = await Promise.all(promises);
    return movies;
  } catch (err) {
    console.error('Error fetching recommended movie details:', err);
    throw err;
  }
};

// Add a new movie
export const addMovie = async (newMovie: MoviesTitle): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    });

    if (!response.ok) {
      throw new Error("Failed to add movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding movie:", error);
    throw error;
  }
};

// Update a movie
export const updateMovie = async (
  showId: string,
  updatedMovie: MoviesTitle
): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${showId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMovie),
    });

    if (!response.ok) {
      throw new Error("Failed to update movie");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

// Delete a movie
export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${showId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

// Get genres list (like GetBookCategories)
export const fetchGenres = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/GetGenres`);
    if (!response.ok) {
      throw new Error("Failed to fetch genres");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
};
