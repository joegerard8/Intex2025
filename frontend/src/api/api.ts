const devUrl: string = "https://localhost:5000/api/";
const prodUrl: string = "https://intex2025backend-fsh2fcgnacaycebx.eastus-01.azurewebsites.net/api/";


import { MoviesRating } from "../types/rating";
import { MoviesTitle } from "../types/movie";
import { ItemRecommendation } from "../types/recommendation";
import { MoviesUser } from "../types/user";

interface FetchMovieResponse {
  movies: MoviesTitle[];
  totalNumBooks: number;
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

export const getMovies = async (showId: string): Promise<FetchMovieResponse> => {
  try {
    const response = await fetch(`${API_URL}/GetMovies?showId=${showId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching movie:", error);
    throw error;
  }
}

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

// getting all the movie details for the similar movies. 
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

export const updateMovie = async (showId: string, updatedMovie: MoviesTitle): Promise<MoviesTitle> => {
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



