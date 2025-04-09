import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import HomePageLogo from "../assets/HomePageLogo.png";
import { UserContext } from "../AuthorizeView";
import { getUserRecommendedMovies, getUserId, fetchSimilarMoviesDetails } from "../api/api.ts";
import MovieCarousel from "../components/MovieCarousel.tsx";
import { Movie } from "@mui/icons-material";

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

const HomePage: React.FC = () => {
  const { user } = useContext(UserContext);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  // different types of recommendations
  const [actionRecommendations, setActionRecommendations] = useState<Movie[]>([]);
  const [comedyRecommendations, setComedyRecommendations] = useState<Movie[]>([]);
  const [familyRecommendations, setFamilyRecommendations] = useState<Movie[]>([]);


  // getting the user id to then get their curated list of recommended movies
  const fetchUserId = async () => {
    try {
      if (user) {
        const response = await getUserId(user.email);
        console.log(response);
        setUserId(response);
      }
      return userId;
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  }

  //getting the recommended movies for the user
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
          getRecommendedMoviesDetails(familyIds, setFamilyRecommendations)
        ]);
      }
    } catch (error) {
      console.error("Error fetching user recommended movies:", error);
    }
  };

  //getting the details and setting the movies using the recommended details
  const getRecommendedMoviesDetails = async (
    recommendations: string[],
    setState: React.Dispatch<React.SetStateAction<Movie[]>>
  ) => {
    try {
      const movies = await fetchSimilarMoviesDetails(recommendations);
      const recommendedMoviesData = movies.map((movieData: any) => ({
        id: movieData.movies[0].showId,
        title: movieData.movies[0].title,
        posterUrl: movieData.movies[0].image_url
      }));
      setState(recommendedMoviesData);
    } catch (err) {
      console.error("Failed to load similar movie details", err);
    }
  };

  // use effect to get their recommended movies
  useEffect(() => {
    const getData = async () => {
      await fetchUserId();
      await fetchUserRecommendedMovies();
    }
    getData();
  }, [userId, user]);

  return (
    <>
    <div className="home-page">
      <div className="logo-banner">
        <div className="main-logo">
          <img
            src={HomePageLogo}
            alt="CineNiche Logo"
            className="huge-centered-logo"
          />
        </div>
      </div>

      {/* Welcome message if logged in */}
      {user && (
        <div className="welcome-section">
          <h1>Welcome, {user.email}</h1>
        </div>
      )}
    </div>
    <MovieCarousel movies={recommendedMovies} title="Your Top Picks" />
    <MovieCarousel movies={actionRecommendations} title="High-Octane Hits" />
    <MovieCarousel movies={comedyRecommendations} title="Need a Laugh?" />
    <MovieCarousel movies={familyRecommendations} title="Fun for the Whole Family" />
    </>
  );
};

export default HomePage;
