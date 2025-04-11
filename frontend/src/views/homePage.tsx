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

// Movie interface for type safety
interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

const HomePage: React.FC = () => {
  // Accessing user data from the UserContext
  const { user } = useContext(UserContext);
  
  // State hooks for storing movie recommendations and other data
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [actionRecommendations, setActionRecommendations] = useState<Movie[]>([]);
  const [comedyRecommendations, setComedyRecommendations] = useState<Movie[]>([]);
  const [familyRecommendations, setFamilyRecommendations] = useState<Movie[]>([]);
  
  // User ID for making requests
  const [userId, setUserId] = useState<number | null>(null);

  // Loading state to show loading indicator while fetching data
  const [loading, setLoading] = useState(false);

  // Function to fetch the user ID based on their email
  const fetchUserId = async () => {
    try {
      if (user) {
        // Fetch user ID from the backend using the email
        const response = await getUserId(user.email);
        setUserId(response); // Set the fetched user ID to state
      }
      return userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };

  // Function to fetch user recommended movies based on user ID
  const fetchUserRecommendedMovies = async () => {
    try {
      if (userId) {
        // Fetch the recommended movie categories for the user
        const response = await getUserRecommendedMovies(userId);
        const rec = response[0];

        // Split movie IDs into their respective categories
        const movieIds = rec.hybrid.split(", ");
        const actionIds = rec.action_recs.split(", ");
        const comedyIds = rec.comedy_recs.split(", ");
        const familyIds = rec.family_recs.split(", ");

        // Fetch the movie details for each category and update the state
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

  // Helper function to fetch movie details for a given list of movie IDs
  const getRecommendedMoviesDetails = async (
    recommendations: string[],
    setState: React.Dispatch<React.SetStateAction<Movie[]>>
  ) => {
    try {
      // Fetch movie details for the given list of movie IDs
      const movies = await fetchSimilarMoviesDetails(recommendations);

      // Map movie data to the required format
      const recommendedMoviesData = movies.map((movieData: any) => ({
        id: movieData.movies[0].showId,
        title: movieData.movies[0].title,
        posterUrl: movieData.movies[0].image_url,
      }));

      // Update the state with the fetched movie data
      setState(recommendedMoviesData);
    } catch (err) {
      console.error("Failed to load similar movie details", err);
    }
  };

  // useEffect hook to trigger data fetching when the component mounts or when the user or userId changes
  useEffect(() => {
    const getData = async () => {
      setLoading(true); // Set loading to true when starting the data fetch
      await fetchUserId(); // Fetch user ID
      await fetchUserRecommendedMovies(); // Fetch recommended movies based on the user ID
      setLoading(false); // Set loading to false after data fetching is complete
    };
    getData();
  }, [userId, user]); // Trigger the effect whenever userId or user changes

  // If the data is still loading, display a loading indicator
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
        {/* Display logo and banner only if the user is logged in */}
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

        {/* Display sign-in and register buttons for non-logged-in users */}
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

        {/* Welcome message for logged-in users */}
        {user && (
          <div className="welcome-section">
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                letterSpacing: "0.5px",
                color: "white", // Solid white instead of gradient
                textShadow: "0px 2px 3px rgba(0,0,0,0.3)",
              }}
            >
              Welcome, {user.email}
            </h1>
          </div>
        )}
      </div>

      {/* Display movie carousels for logged-in users */}
      {user && (
        <>
          <MovieCarousel
            movies={recommendedMovies.slice(0, 10)} // Show first 10 recommended movies
            title="Top Ten Picks For You!"
            isNumbered={true} // Number the movies in the carousel
          />
          <MovieCarousel
            movies={actionRecommendations}
            title="High-Octane Hits"
          />
          <MovieCarousel
            movies={comedyRecommendations}
            title="Need a Laugh?"
          />
          <MovieCarousel
            movies={familyRecommendations}
            title="Fun for the Whole Family"
          />
        </>
      )}

      {/* Display public content for non-logged-in users */}
      {!user && (
        <>
          <div className="cineniche-wrapper">
            <h2
              className="cineniche-heading"
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "1rem",
                letterSpacing: "0.5px",
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(200,200,200,0.7))",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0px 2px 3px rgba(0,0,0,0.3)",
              }}
            >
              More Reasons to Join CineNiche
            </h2>
            <div className="cineniche-section">
              <div className="cineniche-card">
                <p>
                  <strong
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      display: "inline-block",
                      marginBottom: "0.5rem",
                      letterSpacing: "0.5px",
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(200,200,200,0.7))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      textShadow: "0px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    CineNiche is not your average movie site.
                  </strong>
                  <br />
                  We focus on the overlooked, the underappreciated, and the
                  unforgettable. From arthouse horror to cult gems, this is
                  where the true cinephiles dig deeper.
                </p>
              </div>
              <div className="cineniche-card">
                <p>
                  <strong
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      display: "inline-block",
                      marginBottom: "0.5rem",
                      letterSpacing: "0.5px",
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(200,200,200,0.7))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      textShadow: "0px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    Start with your personalized recommendations.
                  </strong>
                  <br />
                  Not sure what to watch? We've got curated suggestions based on
                  your taste — just sign in to see what we've picked for you.
                </p>
              </div>
              <div className="cineniche-card">
                <p>
                  <strong
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      display: "inline-block",
                      marginBottom: "0.5rem",
                      letterSpacing: "0.5px",
                      background:
                        "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(200,200,200,0.7))",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                      textShadow: "0px 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    Leave ratings & explore by genre.
                  </strong>
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
