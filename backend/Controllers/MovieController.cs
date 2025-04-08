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
        public IActionResult GetMovies(
            [FromQuery] string? search = null,  // Optional search by title
            [FromQuery] int skip = 0,           // Optional pagination start
            [FromQuery] int take = 20)          // Optional pagination amount
        {
            try
            {
            // Start the query from the database
            var query = _dbContext.MoviesTitles.AsQueryable();

            // If the user typed something into search, filter by title
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(m => m.Title.Contains(search));
            }

            // Count total after filtering
            var totalCount = query.Count();

            // Apply pagination
            var movies = query.Skip(skip).Take(take).ToList();

            // Build the response object
            var response = new
            {
                Movies = movies,
                Count = totalCount
            };

            return Ok(response); // return 200 + the data
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new
            {
                message = "An error occurred while retrieving movies.",
                error = ex.Message
            });
        }
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
