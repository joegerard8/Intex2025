import React, { useState, useEffect } from "react";
import { MoviesTitle } from "../types/movie";
import { fetchGenres } from "../api/api";
import "./MovieForm.css";

interface MovieFormProps {
  movie?: MoviesTitle;
  onSubmit: (movie: MoviesTitle) => void;
  onCancel: () => void;
}

const emptyMovie: MoviesTitle = {
  showId: "",
  type: "",
  title: "",
  director: "",
  cast: "",
  country: "",
  releaseYear: 0,
  rating: "",
  duration: "",
  description: "",
  // Initialize all genre booleans as false
  action: false,
  adventure: false,
  animeSeriesInternationalTvShows: false,
  britishTvShowsDocuseriesInternationalTvShows: false,
  children: false,
  comedies: false,
  comediesDramasInternationalMovies: false,
  comediesInternationalMovies: false,
  comediesRomanticMovies: false,
  crimeTvShowsDocuseries: false,
  documentaries: false,
  documentariesInternationalMovies: false,
  docuseries: false,
  dramas: false,
  dramasInternationalMovies: false,
  dramasRomanticMovies: false,
  familyMovies: false,
  fantasy: false,
  horrorMovies: false,
  internationalMoviesThrillers: false,
  internationalTvShowsRomanticTvShowsTvDramas: false,
  kidsTv: false,
  languageTvShows: false,
  musicals: false,
  natureTv: false,
  realityTv: false,
  spirituality: false,
  tvAction: false,
  tvComedies: false,
  tvDramas: false,
  talkShowsTvComedies: 0,
  thrillers: false,
};

const MovieForm: React.FC<MovieFormProps> = ({ movie, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<MoviesTitle>(
    movie || { ...emptyMovie }
  );
  const [allGenres, setAllGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genres = await fetchGenres();
        setAllGenres(genres);
      } catch (error) {
        console.error("Failed to load genres", error);
      }
    };
    loadGenres();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    // Convert genre name to camelCase to match the property names in the interface
    const genreProp = name.charAt(0).toLowerCase() + name.slice(1);

    // Special case for talkShowsTvComedies which is a number
    if (genreProp === "talkShowsTvComedies") {
      setFormData({ ...formData, [genreProp]: checked ? 1 : 0 });
    } else {
      setFormData({ ...formData, [genreProp]: checked });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // If this is a new movie and no ID was provided, generate a unique ID
    if (!formData.showId) {
      formData.showId = `s${Date.now()}`;
    }

    onSubmit(formData);
  };

  // Convert a genre name from API (PascalCase) to camelCase for property access
  const toCamelCase = (genreName: string): string => {
    return genreName.charAt(0).toLowerCase() + genreName.slice(1);
  };

  // Check if a genre is selected in the current movie
  const isGenreSelected = (genreName: string): boolean => {
    const propName = toCamelCase(genreName);
    const value = formData[propName as keyof MoviesTitle];

    if (propName === "talkShowsTvComedies") {
      return (value as number) > 0;
    }

    return Boolean(value);
  };

  return (
    <form onSubmit={handleSubmit} className="movie-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Type*</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="director">Director</label>
          <input
            type="text"
            id="director"
            name="director"
            value={formData.director || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="releaseYear">Release Year</label>
          <input
            type="number"
            id="releaseYear"
            name="releaseYear"
            value={formData.releaseYear || ""}
            onChange={handleChange}
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="cast">Cast</label>
          <input
            type="text"
            id="cast"
            name="cast"
            value={formData.cast || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating || ""}
            onChange={handleChange}
          >
            <option value="">Select Rating</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="NC-17">NC-17</option>
            <option value="TV-Y">TV-Y</option>
            <option value="TV-Y7">TV-Y7</option>
            <option value="TV-G">TV-G</option>
            <option value="TV-PG">TV-PG</option>
            <option value="TV-14">TV-14</option>
            <option value="TV-MA">TV-MA</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration || ""}
            onChange={handleChange}
            placeholder="e.g., 2h 30min or 6 Seasons"
          />
        </div>
      </div>

      <div className="form-group full-width">
        <label htmlFor="description">Description*</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          required
        />
      </div>

      <div className="form-group full-width">
        <label>Genres</label>
        <div className="genres-container">
          {allGenres.map((genre) => (
            <div key={genre} className="genre-checkbox">
              <input
                type="checkbox"
                id={genre}
                name={genre}
                checked={isGenreSelected(genre)}
                onChange={handleGenreChange}
              />
              <label htmlFor={genre}>{genre}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-button">
          Cancel
        </button>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Saving..." : movie ? "Update Movie" : "Add Movie"}
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
