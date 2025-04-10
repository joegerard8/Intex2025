import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

// Format genre name by adding spaces between capital letters
const formatGenreName = (genre: string) => {
  return genre.replace(/([a-z])([A-Z])/g, '$1 $2');
};

function GenreFilter({
                       selectedGenres,
                       setSelectedGenres
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
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreCheckboxChange = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const clearAllFilters = () => setSelectedGenres([]);
  const toggleFilters = () => setShowFilters(!showFilters);

  return (
      <div className="filter-container">
        <div className="filter-icon" onClick={toggleFilters}>
          <FilterListIcon style={{ fontSize: 20 }} />
          {selectedGenres.length > 0 && (
              <span className="selected-count">{selectedGenres.length}</span>
          )}
        </div>

        {showFilters && (
            <div className="filter-dropdown">
              <div className="filter-dropdown-header">
                <h5>Filter by Genre</h5>
                <div className="filter-actions">
                  {selectedGenres.length > 0 && (
                      <button onClick={clearAllFilters} className="clear-filters-btn">
                        Clear Filters
                      </button>
                  )}
                  <CloseIcon
                      onClick={toggleFilters}
                      style={{ fontSize: 20, cursor: "pointer" }}
                  />
                </div>
              </div>

              <div className="genre-checkboxes">
                {genres.map((genre) => (
                    <div key={genre} className="form-check">
                      <input
                          className="form-check-input"
                          type="checkbox"
                          id={genre}
                          value={genre}
                          checked={selectedGenres.includes(genre)}
                          onChange={() => handleGenreCheckboxChange(genre)}
                      />
                      <label className="form-check-label" htmlFor={genre}>
                        {formatGenreName(genre)}
                      </label>
                    </div>
                ))}
              </div>
            </div>
        )}
      </div>
  );
}

export default GenreFilter;
