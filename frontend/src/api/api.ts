import { MoviesTitle } from "../types/movie";

interface FetchMoviesResponse {
  movies: MoviesTitle[];
  totalNumMovies: number;
}

const API_URL = "https://localhost:5000/api/Movie"; // Swap this out with prodUrl when deploying

// Fetch movies (with pagination, genre filtering, and optional search)
export const fetchMovies = async (
  pageSize: number,
  pageNum: number,
  selectedGenres: string[],
  search?: string
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
): Promise<MoviesTitle | null> => {
  try {
    const response = await fetch(`${API_URL}/GetMovies?showId=${showId}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error("Failed to fetch movie");
    }
    const data = await response.json();
    return data.movies?.[0] ?? null;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    throw error;
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
