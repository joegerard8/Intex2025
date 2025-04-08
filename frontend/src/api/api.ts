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

// Function to fetch movies from the API
export const API_URL = "https://localhost:5000/api/Movie";

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



