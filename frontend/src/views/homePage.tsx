import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import HomePageLogo from "../assets/HomePageLogo.png";
import { UserContext } from "../AuthorizeView";
import {
  getUserRecommendedMovies,
  getUserId,
  fetchSimilarMoviesDetails,
} from "../api/api.ts";
import MovieCarousel from "../components/MovieCarousel.tsx";
import { Movie } from "@mui/icons-material";
import Layout from "../components/Layout.tsx";

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

const HomePage: React.FC = () => {
  const { user } = useContext(UserContext);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [actionRecommendations, setActionRecommendations] = useState<Movie[]>(
      []
  );
  const [comedyRecommendations, setComedyRecommendations] = useState<Movie[]>(
      []
  );
  const [familyRecommendations, setFamilyRecommendations] = useState<Movie[]>(
      []
  );
  const [userId, setUserId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);

  const fetchUserId = async () => {
    try {
      if (user) {
        const response = await getUserId(user.email);
        setUserId(response);
      }
      return userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };

  const fetchUserRecommendedMovies = async () => {
    try {
      if (userId) {
        const response = await getUserRecommendedMovies(userId);
        const rec = response[0];

        const movieIds = rec.hybrid.split(", ");
        const actionIds = rec.action_recs.split(", ");
        const comedyIds = rec.comedy_recs.split(", ");
        const familyIds = rec.family_recs.split(", ");

        await Promise.all([
          getRecommendedMoviesDetails(movieIds, setRecommendedMovies),
          getRecommendedMoviesDetails(actionIds, setActionRecommendations),
          getRecommendedMoviesDetails(comedyIds, setComedyRecommendations),
          getRecommendedMoviesDetails(familyIds, setFamilyRecommendations),
        ]);
      }
    } catch (error) {
      console.error("Error fetching user recommended movies:", error);
    }
  };

  const getRecommendedMoviesDetails = async (
      recommendations: string[],
      setState: React.Dispatch<React.SetStateAction<Movie[]>>
  ) => {
    try {
      const movies = await fetchSimilarMoviesDetails(recommendations);
      const recommendedMoviesData = movies.map((movieData: any) => ({
        id: movieData.movies[0].showId,
        title: movieData.movies[0].title,
        posterUrl: movieData.movies[0].image_url,
      }));
      setState(recommendedMoviesData);
    } catch (err) {
      console.error("Failed to load similar movie details", err);
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await fetchUserId();
      await fetchUserRecommendedMovies();
      setLoading(false);
    };
    getData();
  }, [userId, user]);

  if (loading) {
    return (
        <Layout>
          <div className="loading">Loading...</div>
        </Layout>
    );
  }

  return (
      <>
        <div className={`home-page ${!user ? "logged-out" : ""}`}>
          {user && (
              <div className="logo-banner">
                <div className="main-logo">
                  <img
                      src={HomePageLogo}
                      alt="CineNiche Logo"
                      className="huge-centered-logo"
                  />
                </div>
              </div>
          )}

          {!user && (
              <div className="landing-actions">
                <h1 className="landing-heading">
                  For those who crave more than the mainstream.
                </h1>
                <div className="auth-buttons-large">
                  <Link to="/login" className="login-btn large">
                    Sign In
                  </Link>
                  <Link to="/register" className="register-btn large">
                    Register
                  </Link>
                </div>
              </div>
          )}

          {user && (
              <div className="welcome-section">
                <h1 style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                  letterSpacing: "0.5px",
                  color: "white",  // Solid white instead of gradient
                  textShadow: "0px 2px 3px rgba(0,0,0,0.3)"
                }}>
                  Welcome, {user.email}
                </h1>
              </div>
          )}
        </div>

        {/* Movie carousels only shown to logged-in users */}
        {user && (
            <>
              <MovieCarousel
                  movies={recommendedMovies.slice(0, 10)}
                  title="Top Ten Picks For You!"
                  isNumbered={true}
              />
              <MovieCarousel
                  movies={actionRecommendations}
                  title="High-Octane Hits"
              />
              <MovieCarousel movies={comedyRecommendations} title="Need a Laugh?" />
              <MovieCarousel
                  movies={familyRecommendations}
                  title="Fun for the Whole Family"
              />
            </>
        )}

        {/* Public content section below the background image */}
        {!user && (
            <>
              <div className="cineniche-wrapper">
                <h2 className="cineniche-heading">
                  More Reasons to Join CineNiche
                </h2>
                <div className="cineniche-section">
                  <div className="cineniche-card">
                    <p>
                      <strong>CineNiche is not your average movie site.</strong>
                      <br />
                      We focus on the overlooked, the underappreciated, and the
                      unforgettable. From arthouse horror to cult gems, this is
                      where the true cinephiles dig deeper.
                    </p>
                  </div>
                  <div className="cineniche-card">
                    <p>
                      <strong>Start with your personalized recommendations.</strong>
                      <br />
                      Not sure what to watch? We've got curated suggestions based on
                      your taste — just sign in to see what we've picked for you.
                    </p>
                  </div>
                  <div className="cineniche-card">
                    <p>
                      <strong>Leave ratings & explore by genre.</strong>
                      <br />
                      Whether you're into mind-bending thrillers or cozy family
                      flicks, CineNiche makes it easy to find films that match your
                      vibe.
                    </p>
                  </div>
                </div>
                <div className="learn-more-container">
                  <a
                      href="https://cineniche.blogspot.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="learn-more-btn"
                  >
                    Learn More About CineNiche
                  </a>
                </div>
              </div>
            </>
        )}
      </>
  );
};

export default HomePage;