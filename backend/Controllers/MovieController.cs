using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration.UserSecrets;
// full backend controller for getting movies

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationDbContext _dbContext;
        public MovieController(ApplicationDbContext temp)
        {
            _dbContext = temp;
        }

        [HttpGet("Movies")]
        // setting the parameters, as well as their default values if nothing is passed. 
        // was having touble getting the query string, so I passed the fromquery to the categories to help it
        public IActionResult GetMovies()
        {
            // Initialize the queryable object from the DbSet
            var movies = _dbContext.MoviesTitles.AsQueryable();

            // Get the total count of books after filtering
            var totalCount = movies.Count();

            // Create the response object
            var response = new
            {
                Movies = movies,
                Count = totalCount
            };

            // Return the response with a 200 OK status
            return Ok(response);
        }
        
        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            if (newMovie == null)
            {
                return BadRequest("Movie data is null.");
            }

            // Optionally: Check if ShowId already exists
            var existing = _dbContext.MoviesTitles.Find(newMovie.ShowId);
            if (existing != null)
            {
                return Conflict("A movie with the same ShowId already exists.");
            }

            _dbContext.MoviesTitles.Add(newMovie);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetMovies), new { id = newMovie.ShowId }, newMovie);
        }
    }
}

        // method to updated a current movie
        // [HttpPut("Updatemovie/{MovieId}")]
        // PUT: Update an existing movie
        [HttpPut("UpdateMovie/{MovieId}")]
        public IActionResult UpdateMovie(int MovieId, [FromBody] Movie updatedMovie)
        {
            if (updatedMovie == null || updatedMovie.MovieId != MovieId)
            {
                return BadRequest("Movie data is null or MovieId mismatch.");
            }

            var existingMovie = _dbContext.Movies.Find(MovieId);
            if (existingMovie == null)
            {
                return NotFound("Movie not found.");
            }

            // Update the existing movie's properties
            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.Genre = updatedMovie.Genre;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Description = updatedMovie.Description;

            _dbContext.Movies.Update(existingMovie);
            _dbContext.SaveChanges();

            return Ok(existingMovie);
        }


    }
}
