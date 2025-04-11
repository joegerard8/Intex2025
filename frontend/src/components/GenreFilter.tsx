import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

/**
 * Formats genre strings from camelCase or PascalCase to spaced names.
 * Example: "ScienceFiction" -> "Science Fiction"
 */
const formatGenreName = (genre: string) => {
  return genre.replace(/([a-z])([A-Z])/g, '$1 $2');
};

/**
 * GenreFilter component
 * Props:
 *  - selectedGenres: list of currently selected genre strings
 *  - setSelectedGenres: function to update the selectedGenres list
 */
function GenreFilter({
  selectedGenres,
  setSelectedGenres
}: {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}) {
  // All available genres fetched from the backend
  const [genres, setGenres] = useState<string[]>([]);
  // Controls whether the filter dropdown is visible
  const [showFilters, setShowFilters] = useState(false);

  /**
   * Fetch the list of genres on component mount
   */
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

  /**
   * Handles selection/deselection of a genre checkbox
   * If already selected, remove it. Otherwise, add it.
   */
  const handleGenreCheckboxChange = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  // Clears all selected genres
  const clearAllFilters = () => setSelectedGenres([]);

  // Toggles the visibility of the filter panel
  const toggleFilters = () => setShowFilters(!showFilters);

  return (
    <div className="position-relative">
      {/* Filter button with icon and badge */}
      <div
        className="d-flex align-items-center gap-2"
        onClick={toggleFilters}
        style={{ cursor: 'pointer' }}
      >
        <FilterListIcon style={{ fontSize: 20 }} />
        {selectedGenres.length > 0 && (
          <span className="badge bg-secondary">{selectedGenres.length}</span>
        )}
      </div>

      {/* Filter dropdown panel */}
      {showFilters && (
        <div
          className="bg-dark text-light border rounded shadow p-3 mt-2 position-absolute"
          style={{
            minWidth: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1000
          }}
        >
          {/* Header with title, Clear button, and close icon */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-0">Filter by Genre</h6>
            <div className="d-flex align-items-center gap-2">
              {selectedGenres.length > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="btn btn-sm btn-outline-light"
                >
                  Clear
                </button>
              )}
              <CloseIcon style={{ cursor: 'pointer' }} onClick={toggleFilters} />
            </div>
          </div>

          {/* List of genres with checkboxes */}
          <div className="d-flex flex-column gap-2">
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
