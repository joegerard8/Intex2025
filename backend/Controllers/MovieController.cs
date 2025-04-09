using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;


namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public MovieController(ApplicationDbContext temp)
        {
            _dbContext = temp;
        }
        
        [HttpGet("GetMovies")]
        public IActionResult GetMovies(
            [FromQuery] int pageSize = 20,
            [FromQuery] int pageNum = 1,
            [FromQuery] List<string>? genres = null,
            [FromQuery] string? search = null,
            [FromQuery] string? showId = null)
        {
            try
            {
                IQueryable<MoviesTitle> query = _dbContext.MoviesTitles.AsQueryable();

                // Return one specific movie if showId is provided
                if (!string.IsNullOrEmpty(showId))
                {
                    var movie = query.FirstOrDefault(m => m.ShowId == showId);
                    if (movie == null)
                    {
                        return NotFound(new { message = "Movie not found." });
                    }

                    return Ok(new
                    {
                        Movies = new List<MoviesTitle> { movie },
                        TotalNumMovies = 1
                    });
                }

                // Optional title search
                if (!string.IsNullOrEmpty(search))
                {
                    query = query.Where(m => m.Title.Contains(search));
                }

                // Optional genre filtering
                if (genres != null && genres.Any())
                {
                    foreach (var genre in genres)
                    {
                        switch (genre)
                        {
                            case "Action": query = query.Where(m => m.Action); break;
                            case "Adventure": query = query.Where(m => m.Adventure); break;
                            case "AnimeSeriesInternationalTvShows": query = query.Where(m => m.AnimeSeriesInternationalTvShows); break;
                            case "BritishTvShowsDocuseriesInternationalTvShows": query = query.Where(m => m.BritishTvShowsDocuseriesInternationalTvShows); break;
                            case "Children": query = query.Where(m => m.Children); break;
                            case "Comedies": query = query.Where(m => m.Comedies); break;
                            case "ComediesDramasInternationalMovies": query = query.Where(m => m.ComediesDramasInternationalMovies); break;
                            case "ComediesInternationalMovies": query = query.Where(m => m.ComediesInternationalMovies); break;
                            case "ComediesRomanticMovies": query = query.Where(m => m.ComediesRomanticMovies); break;
                            case "CrimeTvShowsDocuseries": query = query.Where(m => m.CrimeTvShowsDocuseries); break;
                            case "Documentaries": query = query.Where(m => m.Documentaries); break;
                            case "DocumentariesInternationalMovies": query = query.Where(m => m.DocumentariesInternationalMovies); break;
                            case "Docuseries": query = query.Where(m => m.Docuseries); break;
                            case "Dramas": query = query.Where(m => m.Dramas); break;
                            case "DramasInternationalMovies": query = query.Where(m => m.DramasInternationalMovies); break;
                            case "DramasRomanticMovies": query = query.Where(m => m.DramasRomanticMovies); break;
                            case "FamilyMovies": query = query.Where(m => m.FamilyMovies); break;
                            case "Fantasy": query = query.Where(m => m.Fantasy); break;
                            case "HorrorMovies": query = query.Where(m => m.HorrorMovies); break;
                            case "InternationalMoviesThrillers": query = query.Where(m => m.InternationalMoviesThrillers); break;
                            case "InternationalTvShowsRomanticTvShowsTvDramas": query = query.Where(m => m.InternationalTvShowsRomanticTvShowsTvDramas); break;
                            case "KidsTv": query = query.Where(m => m.KidsTv); break;
                            case "LanguageTvShows": query = query.Where(m => m.LanguageTvShows); break;
                            case "Musicals": query = query.Where(m => m.Musicals); break;
                            case "NatureTv": query = query.Where(m => m.NatureTv); break;
                            case "RealityTv": query = query.Where(m => m.RealityTv); break;
                            case "Spirituality": query = query.Where(m => m.Spirituality); break;
                            case "TvAction": query = query.Where(m => m.TvAction); break;
                            case "TvComedies": query = query.Where(m => m.TvComedies); break;
                            case "TvDramas": query = query.Where(m => m.TvDramas); break;
                            case "Thrillers": query = query.Where(m => m.Thrillers); break;
                        }
                    }
                }

                var totalNumMovies = query.Count();

                var movies = query
                    .Skip((pageNum - 1) * pageSize)
                    .Take(pageSize)
                    .ToList();

                var result = new
                {
                    Movies = movies,
                    TotalNumMovies = totalNumMovies
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while fetching movies.",
                    error = ex.Message,
                    stackTrace = ex.StackTrace // optionally remove for production
                });
            }
        }

      // getting the similar movies to then pull all of the information we need.
        [HttpGet("GetSimilarMovies/{showId}")]
        public IActionResult GetSimilarMovies(string showId)
        {
        // Assuming 'show_id' is the primary key or matches exactly in ItemRecommendations
        var recommendation = _dbContext.ItemRecommendations
            .FirstOrDefault(r => r.ShowId == showId);

        if (recommendation == null)
        {
            return NotFound("Recommendation not found.");
        }

        return Ok(recommendation);
        }
    
    // getting movies recommended to a specific user
        [HttpGet("GetUserRecommendedMovies/{userId}")]
        public IActionResult GetUserRecommendedMovies(byte userId) 
        {
            var recommendations = _dbContext.HomeRecommendations
                .Where(r => r.user_id == userId)
                .ToList();

            if (recommendations == null || !recommendations.Any())
            {
                return NotFound(new { message = "No recommendations found for this user." });
            }

            return Ok(recommendations);
        }

        // getting the users id to get their unique recommendations
        [HttpGet("GetUserId")]
        public IActionResult GetUserId(string email)
        {
            var user = _dbContext.ApplicationUsers.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return NotFound(new { message = "User not found." });
            }
            return Ok(new { userId = user.UserId });
        }

        [HttpPost("AddMovie")]
        [Authorize(Roles = "Administrator")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            if (newMovie == null)
            {
                return BadRequest(new { message = "Movie data is null." });
            }

            var existing = _dbContext.MoviesTitles.Find(newMovie.ShowId);
            if (existing != null)
            {
                return Conflict(new { message = "A movie with the same ShowId already exists." });
            }

            _dbContext.MoviesTitles.Add(newMovie);
            _dbContext.SaveChanges();

            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{showId}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _dbContext.MoviesTitles.Find(showId);
            if (existingMovie == null)
            {
                return NotFound(new { message = "Movie not found." });
            }

            if (updatedMovie == null || updatedMovie.ShowId != showId)
            {
                return BadRequest(new { message = "Movie data is null or ShowId mismatch." });
            }

            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Description = updatedMovie.Description;
            // Optionally update genres here if needed...

            _dbContext.MoviesTitles.Update(existingMovie);
            _dbContext.SaveChanges();

            return Ok(existingMovie);
        }

        [HttpDelete("DeleteMovie/{showId}")]
        [Authorize(Roles = "Administrator")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _dbContext.MoviesTitles.Find(showId);
            if (movie == null)
            {
                return NotFound(new { message = "Movie not found." });
            }

            _dbContext.MoviesTitles.Remove(movie);
            _dbContext.SaveChanges();

            return NoContent();
        }


        [HttpGet("GetGenres")]
        public IActionResult GetGenres()
        {
            var genreList = new List<string>
            {
                "Action",
                "Adventure",
                "AnimeSeriesInternationalTvShows",
                "BritishTvShowsDocuseriesInternationalTvShows",
                "Children",
                "Comedies",
                "ComediesDramasInternationalMovies",
                "ComediesInternationalMovies",
                "ComediesRomanticMovies",
                "CrimeTvShowsDocuseries",
                "Documentaries",
                "DocumentariesInternationalMovies",
                "Docuseries",
                "Dramas",
                "DramasInternationalMovies",
                "DramasRomanticMovies",
                "FamilyMovies",
                "Fantasy",
                "HorrorMovies",
                "InternationalMoviesThrillers",
                "InternationalTvShowsRomanticTvShowsTvDramas",
                "KidsTv",
                "LanguageTvShows",
                "Musicals",
                "NatureTv",
                "RealityTv",
                "Spirituality",
                "TvAction",
                "TvComedies",
                "TvDramas",
                "Thrillers"
            };

            return Ok(genreList);
}
    }
}