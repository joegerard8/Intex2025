import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterListIcon from '@mui/icons-material/FilterList'; // Use Material UI icon instead

// Define the mapping between parent genres and database genres
const genreMapping = {
  "Action": [
    "Action",
    "Adventure",
    "TvAction"
  ],
  "International": [
    "AnimeSeriesInternationalTvshows",
    "BritishTvShowsDocuseriesInternationalTvShows",
    "ComediesDramasInternationalMovies",
    "ComediesInternationalMovies",
    "DocumentariesInternationalMovies",
    "DramasInternationalMovies",
    "InternationalMoviesThrillers",
    "InternationalTvShowsRomanticTvShowsTvDramas"
  ],
  "Documentaries": [
    "BritishTvShowsDocuseriesInternationalTvShows",
    "CrimeTvShowsDocuseries",
    "Documentaries",
    "DocumentariesInternationalMovies",
    "Docuseries"
  ],
  "Children & Family Movies": [
    "Children",
    "FamilyMovies",
    "KidsTv"
  ],
  "Comedies": [
    "Comedies",
    "ComediesDramasInternationalMovies",
    "ComediesInternationalMovies",
    "ComediesRomanticMovies",
    "TvComedies"
  ],
  "Romance": [
    "ComediesRomanticMovies",
    "DramasRomanticMovies",
    "InternationalTvShowsRomanticTvShowsTvDramas"
  ],
  "Dramas & Reality": [
    "Dramas",
    "DramasInternationalMovies",
    "DramasRomanticMovies",
    "InternationalTvShowsRomanticTvShowsTvDramas",
    "RealityTv",
    "TvDramas"
  ],
  "Fantasy": [
    "Fantasy"
  ],
  "Horror & Thriller": [
    "HorrorMovies",
    "InternationalMoviesThrillers",
    "Thrillers"
  ],
  "Musicals": [
    "Musicals"
  ],
  "Nature": [
    "NatureTv"
  ],
  "Spirituality": [
    "Spirituality"
  ],
  "Language & TV Shows": [
    "LanguageTvShows"
  ]
};

function GenreFilter({
                       selectedGenres,
                       setSelectedGenres,
                     }: {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}) {
  const [genres, setGenres] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
            "https://intex2025backend-fsh2fcgnacaycebx.eastus-01.azurewebsites.net/api/Movie/GetGenres"
        );
        const data = await response.json();
        console.log("Fetched genres:", data);
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  // Helper function to check if a parent genre is selected
  const isParentGenreSelected = (parentGenre: string) => {
    const childGenres = genreMapping[parentGenre as keyof typeof genreMapping] || [];
    // A parent is selected if ANY of its child genres are selected
    return childGenres.some(genre => selectedGenres.includes(genre));
  };

  // Helper function to get the partially selected state (some but not all children selected)
  const isPartiallySelected = (parentGenre: string) => {
    const childGenres = genreMapping[parentGenre as keyof typeof genreMapping] || [];
    const selectedChildCount = childGenres.filter(genre => selectedGenres.includes(genre)).length;
    return selectedChildCount > 0 && selectedChildCount < childGenres.length;
  };

  // Handle parent genre checkbox change
  const handleParentCheckboxChange = (parentGenre: string) => {
    const childGenres = genreMapping[parentGenre as keyof typeof genreMapping] || [];

    // If the parent is already fully or partially selected, remove all its children
    if (isParentGenreSelected(parentGenre)) {
      const newSelectedGenres = selectedGenres.filter(genre => !childGenres.includes(genre));
      setSelectedGenres(newSelectedGenres);
    }
    // Otherwise, add all its children
    else {
      // Only add child genres that exist in our database
      const validChildGenres = childGenres.filter(genre => genres.includes(genre));
      const newSelectedGenres = [...selectedGenres, ...validChildGenres];
      // Remove duplicates
      setSelectedGenres([...new Set(newSelectedGenres)]);
    }
  };

  // Toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
      <div className="filter-container">
        <div className="filter-icon" onClick={toggleFilters}>
          <FilterListIcon style={{ fontSize: 20 }} />
          {selectedGenres.length > 0 && (
              <span className="selected-count">{selectedGenres.length}</span>
          )}
        </div>

        {showFilters && (
            <div className="card shadow-sm p-3 mb-4 bg-white rounded border-0 filter-dropdown">
              <div className="card-body">
                <h5 className="card-title text-center text-primary">Filter by Genre</h5>
                <div className="parent-categories">
                  {Object.keys(genreMapping).map((parentGenre) => (
                      <div key={parentGenre} className="parent-category">
                        <div className="form-check">
                          <input
                              className="form-check-input parent-checkbox"
                              type="checkbox"
                              id={`parent-${parentGenre}`}
                              checked={isParentGenreSelected(parentGenre)}
                              onChange={() => handleParentCheckboxChange(parentGenre)}
                          />
                          <label
                              className={`form-check-label parent-label ${isPartiallySelected(parentGenre) ? 'partially-selected' : ''}`}
                              htmlFor={`parent-${parentGenre}`}
                          >
                            {parentGenre}
                          </label>
                        </div>
                      </div>
                  ))}
                </div>

                {/* We can also keep the original checkboxes if needed, but hidden by default */}
                <div className="advanced-options">
                  <button
                      className="btn btn-sm btn-link mt-2"
                      onClick={() => document.getElementById('advanced-filters')?.classList.toggle('show')}
                  >
                    Advanced Options
                  </button>
                  <div id="advanced-filters" className="category-list d-flex flex-wrap gap-2" style={{display: 'none'}}>
                    {genres.map((g) => (
                        <div key={g} className="form-check">
                          <input
                              className="form-check-input"
                              type="checkbox"
                              id={g}
                              value={g}
                              checked={selectedGenres.includes(g)}
                              onChange={({ target }) => {
                                const updatedGenres = selectedGenres.includes(target.value)
                                    ? selectedGenres.filter((genre) => genre !== target.value)
                                    : [...selectedGenres, target.value];
                                setSelectedGenres(updatedGenres);
                              }}
                          />
                          <label className="form-check-label" htmlFor={g}>
                            {g}
                          </label>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default GenreFilter;