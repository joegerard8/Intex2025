// Importing the movie type definition
import { MoviesTitle } from "../types/movie";

// ===============================
// Interfaces for API responses
// ===============================

/**
 * Response shape for fetching a paginated list of movies.
 */
interface FetchMoviesResponse {
  movies: MoviesTitle[];
  totalNumMovies: number;
}

/**
 * Response shape for user-specific movie recommendations.
 */
interface UserRecommendedResponse {
  user_id: number;
  collaborative: string;
  content: string;
  hybrid: string;
  comedy_recs: string;
  action_recs: string;
  family_recs: string;
}

/**
 * Response shape for similar movies using item-based recommendations.
 */
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

// Base URL of the API
export const API_URL =
  "https://intex2025backend-fsh2fcgnacaycebx.eastus-01.azurewebsites.net/api/Movie";

// =====================================================
// Fetch similar movies using item-based recommendation
// =====================================================
export const getSimilarMovies = async (
  showId: string
): Promise<SimilarMoviesResponse> => {
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
};

// =====================================================
// Fetch user rating for a specific movie
// =====================================================
export const getUserRatings = async (
  userId: number,
  showId: string
): Promise<any> => {
  try {
    const response = await fetch(
      `${API_URL}/GetUserRating/${userId}/${showId}`,
      {
        credentials: "include", // Includes session cookies
      }
    );

    if (response.status === 404) {
      return null; // No rating found for this user and show
    }

    if (!response.ok) {
      throw new Error("Failed to fetch user ratings");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Unexpected error fetching user ratings:", error);
    return null;
  }
};

// =====================================================
// Submit a user's rating for a movie
// =====================================================
export const submitUserRating = async (
  userId: number,
  showId: string,
  rating: number
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/SubmitUserRating`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, showId, rating }),
    });

    if (!response.ok) {
      throw new Error("Failed to submit rating");
    }

    await response.json(); // No-op for now, can be logged if needed
  } catch (error) {
    console.error("Error submitting user rating:", error);
  }
};

// =====================================================
// Fetch paginated movies with genre filters and search
// =====================================================
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

// =====================================================
// Fetch recommended movies for a specific user
// =====================================================
export const getUserRecommendedMovies = async (
  userId: number
): Promise<UserRecommendedResponse[]> => {
  try {
    const response = await fetch(
      `${API_URL}/GetUserRecommendedMovies/${userId}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user recommended movies");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user recommended movies:", error);
    throw error;
  }
};

// =====================================================
// Get user ID based on their email address
// =====================================================
export const getUserId = async (email: string): Promise<number | null> => {
  try {
    const response = await fetch(
      `${API_URL}/GetUserId?email=${encodeURIComponent(email)}`,
      {
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user ID");
    }

    const data = await response.json();
    return data.userId || null;
  } catch (error) {
    console.error("Error fetching user ID:", error);
    throw error;
  }
};

// =====================================================
// Fetch details for a single movie by showId
// =====================================================
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

// =====================================================
// Fetch movie details for an array of recommendation IDs
// =====================================================
export const fetchSimilarMoviesDetails = async (
  recommendations: string[]
): Promise<any[]> => {
  try {
    const promises = recommendations.map((id) =>
      fetch(`${API_URL}/GetMovies?showId=${id}`).then((res) => res.json())
    );
    const movies = await Promise.all(promises);
    return movies;
  } catch (err) {
    console.error("Error fetching recommended movie details:", err);
    throw err;
  }
};

// =====================================================
// Add a new movie to the database
// =====================================================
export const addMovie = async (newMovie: MoviesTitle): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/AddMovie`, {
      method: "POST",
      credentials: "include",
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

// =====================================================
// Update an existing movie by showId
// =====================================================
export const updateMovie = async (
  showId: string,
  updatedMovie: MoviesTitle
): Promise<MoviesTitle> => {
  try {
    const response = await fetch(`${API_URL}/UpdateMovie/${showId}`, {
      method: "PUT",
      credentials: "include",
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

// =====================================================
// Delete a movie from the database
// =====================================================
export const deleteMovie = async (showId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteMovie/${showId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete movie");
    }
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};

// =====================================================
// Fetch the list of all available movie genres
// =====================================================
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
