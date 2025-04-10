import MovieCard from "./MovieCard"; // adjust path as needed
import { useEffect, useRef } from 'react';

type Movie = {
  id: string;
  title: string;
  posterUrl: string;
};

interface MovieCarouselProps {
  movies: Movie[];
  title?: string; // optional heading
}

const MovieCarousel = ({ movies, title = "Movies" }: MovieCarouselProps) => {
  const movieScrollRef = useRef<HTMLDivElement>(null);
  const topSprocketRef = useRef<HTMLDivElement>(null);
  const bottomSprocketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollLeft = movieScrollRef.current?.scrollLeft ?? 0;
      if (topSprocketRef.current) {
        topSprocketRef.current.scrollLeft = scrollLeft;
      }
      if (bottomSprocketRef.current) {
        bottomSprocketRef.current.scrollLeft = scrollLeft;
      }
    };

    const scrollContainer = movieScrollRef.current;
    scrollContainer?.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="movie-carousel" style={{ marginTop: "2rem", padding: "0 1rem" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 500, marginBottom: "1rem", borderBottom: "1px solid #333", paddingBottom: "0.5rem" }}>
        {title}
      </h2>

      <div className="film-strip">
        {/* Top sprockets (needs ref!) */}
        <div
          ref={topSprocketRef}
          className="sprockets d-flex overflow-x-auto no-scrollbar"
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>

        {/* Movie scroll area (needs ref!) */}
        <div
          ref={movieScrollRef}
          className="d-flex movie-scroll-wrapper"
          style={{ gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} url={movie.posterUrl} title={movie.title} showId={movie.id} />
          ))}
        </div>

        {/* Bottom sprockets (needs ref!) */}
        <div
          ref={bottomSprocketRef}
          className="sprockets d-flex overflow-x-auto no-scrollbar"
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="sprocket-hole" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;
