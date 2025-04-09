import Slider from "react-slick";
import MovieCard from "./MovieCard"; // adjust path as needed

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
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="movie-carousel" style={{ marginTop: "2rem", padding: "0 1rem" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: 500, marginBottom: "1rem", borderBottom: "1px solid #333", paddingBottom: "0.5rem" }}>
        {title}
      </h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ padding: "0 0.20rem" }}>

            <MovieCard
              url={movie.posterUrl}
              title={movie.title}
              showId={movie.id}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
