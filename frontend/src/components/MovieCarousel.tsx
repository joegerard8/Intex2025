import MovieCard from "./MovieCard"; // adjust path as needed
import { useEffect, useRef, useState } from 'react';
import "./MovieCarousel.css"; // Our CSS file for numbered carousels

type Movie = {
    id: string;
    title: string;
    posterUrl: string;
};

interface MovieCarouselProps {
    movies: Movie[];
    title?: string; // optional heading
    isNumbered?: boolean; // Add this prop to determine if we show numbers
}

const MovieCarousel = ({
                           movies,
                           title = "Movies",
                           isNumbered = false
                       }: MovieCarouselProps) => {
    const movieScrollRef = useRef<HTMLDivElement>(null);
    const topSprocketRef = useRef<HTMLDivElement>(null);
    const bottomSprocketRef = useRef<HTMLDivElement>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        // Only set up film strip scrolling for non-numbered carousels
        if (!isNumbered) {
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
        }
    }, [isNumbered]);

    return (
        <div className={`movie-carousel ${isNumbered ? 'numbered-carousel' : ''}`} style={{ marginTop: "2rem", padding: "0 1rem" }}>
            {/* Apply special styling only if isNumbered is true */}
            <h2 style={{
                fontSize: isNumbered ? "2.5rem" : "1.25rem",
                fontWeight: isNumbered ? 700 : 500,
                marginBottom: "1rem",
                borderBottom: "1px solid #333",
                paddingBottom: "0.5rem",
                ...(isNumbered ? {
                    letterSpacing: "0.5px",
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(200,200,200,0.7))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    textShadow: "0px 2px 3px rgba(0,0,0,0.3)"
                } : {})
            }}>
                {title}
            </h2>

            {isNumbered ? (
                // Numbered carousel without film strip
                <div>
                    {/* Movie scroll area with adjusted spacing for numbered view */}
                    <div
                        ref={movieScrollRef}
                        className="d-flex movie-scroll-wrapper"
                        style={{
                            gap: '2rem', // Much bigger gap for numbered view
                            overflowX: 'auto',
                            paddingBottom: '0.5rem',
                            paddingLeft: '120px', // Increased left padding to make room for the numbers
                            paddingTop: '1rem'
                        }}
                    >
                        {movies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className="movie-item-container"
                                style={{
                                    marginRight: '50px', // Bigger spacing between cards for numbered view
                                    position: 'relative'
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Only show numbers if isNumbered is true */}
                                <div
                                    className={`movie-number ${hoveredIndex === index ? 'hovered' : ''}`}
                                    data-number={index + 1} // Add data attribute for styling double-digit numbers
                                >
                                    {index + 1}
                                </div>
                                <MovieCard url={movie.posterUrl} title={movie.title} showId={movie.id} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                // Regular carousel with film strip
                <div className="film-strip">
                    {/* Top sprockets */}
                    <div
                        ref={topSprocketRef}
                        className="sprockets d-flex overflow-x-auto no-scrollbar"
                    >
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div key={i} className="sprocket-hole" />
                        ))}
                    </div>

                    {/* Movie scroll area */}
                    <div
                        ref={movieScrollRef}
                        className="d-flex movie-scroll-wrapper"
                        style={{
                            gap: '0.5rem',
                            overflowX: 'auto',
                            paddingBottom: '0.5rem'
                        }}
                    >
                        {movies.map((movie, index) => (
                            <div
                                key={movie.id}
                                className="movie-item-container"
                                style={{ position: 'relative' }}
                            >
                                <MovieCard url={movie.posterUrl} title={movie.title} showId={movie.id} />
                            </div>
                        ))}
                    </div>

                    {/* Bottom sprockets */}
                    <div
                        ref={bottomSprocketRef}
                        className="sprockets d-flex overflow-x-auto no-scrollbar"
                    >
                        {Array.from({ length: 100 }).map((_, i) => (
                            <div key={i} className="sprocket-hole" />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MovieCarousel;