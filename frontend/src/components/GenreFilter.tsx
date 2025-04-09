import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function GenreFilter({
  selectedGenres,
  setSelectedGenres,
}: {
  selectedGenres: string[];
  setSelectedGenres: (genres: string[]) => void;
}) {
  const [genres, setGenres] = useState<string[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          "https://localhost:5000/api/Movie/GetGenres"
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

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedGenres = selectedGenres.includes(target.value)
      ? selectedGenres.filter((g) => g !== target.value)
      : [...selectedGenres, target.value];

    setSelectedGenres(updatedGenres);
  }

  return (
    <div className="card shadow-sm p-3 mb-4 bg-white rounded border-0">
      <div className="card-body">
        <h5 className="card-title text-center text-primary">Filter by Genre</h5>
        <div className="category-list d-flex flex-wrap gap-2">
          {genres.map((g) => (
            <div key={g} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={g}
                value={g}
                checked={selectedGenres.includes(g)}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label" htmlFor={g}>
                {g}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreFilter;
