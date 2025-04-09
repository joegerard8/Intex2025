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

        [HttpGet("GetMovies")]
        public IActionResult GetMovies(
            [FromQuery] int pageSize = 20,
            [FromQuery] int pageNum = 1,
            [FromQuery] List<string>? genres = null,
            [FromQuery] string? search = null,
            [FromQuery] string? showId = null)
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
        // method to updated a current movie
        // [HttpPut("Updatemovie/{MovieId}")]
        // PUT: Update an existing movie
        [HttpPut("UpdateMovie/{MovieId}")]
        public IActionResult UpdateMovie(string MovieId, [FromBody] MoviesTitle updatedMovie)
        {
            if (updatedMovie == null || updatedMovie.ShowId != MovieId)
            {
                return BadRequest("Movie data is null or MovieId mismatch.");
            }

            var existingMovie = _dbContext.MoviesTitles.Find(MovieId);
            if (existingMovie == null)
            {
                return NotFound("Movie not found.");
            }

            // Update the existing movie's properties
            existingMovie.Title = updatedMovie.Title;
            existingMovie.Director = updatedMovie.Director;
            existingMovie.ReleaseYear = updatedMovie.ReleaseYear;
            existingMovie.Rating = updatedMovie.Rating;
            existingMovie.Description = updatedMovie.Description;

            _dbContext.MoviesTitles.Update(existingMovie);
            _dbContext.SaveChanges();

            return Ok(existingMovie);
        }


        // [HttpPost("AddBook")]
        // // creating a new book. 
        // public IActionResult AddBook([FromBody] Book newBook)
        // {
        //     if (newBook == null)
        //     {
        //         return BadRequest("Book data is null.");
        //     }

        //     // Add the new book to the database
        //     _dbContext.Books.Add(newBook);
        //     _dbContext.SaveChanges(); // Save changes to the database

        //     return CreatedAtAction(nameof(Get), new { id = newBook.BookId }, newBook); // Return 201 Created with the new book details
        // } // end of AddBook method

        // method to updated a current book
        // [HttpPut("UpdateBook/{BookId}")]
        // public IActionResult UpdateBook(int BookId, [FromBody] Book updatedBook)
        // {
        //     if (updatedBook == null || updatedBook.BookId != BookId)
        //     {
        //         return BadRequest("Book data is null or BookId mismatch.");
        //     }

        //     var existingBook = _dbContext.Books.Find(BookId);
        //     if (existingBook == null)
        //     {
        //         return NotFound("Book not found.");
        //     }

        //     // Update the existing book's properties
        //     existingBook.Title = updatedBook.Title;
        //     existingBook.Author = updatedBook.Author;
        //     existingBook.Publisher = updatedBook.Publisher;
        //     existingBook.Isbn = updatedBook.Isbn;
        //     existingBook.Classification = updatedBook.Classification;
        //     existingBook.Category = updatedBook.Category;
        //     existingBook.PageCount = updatedBook.PageCount;
        //     existingBook.Price = updatedBook.Price;

        //     _dbContext.Books.Update(existingBook); // Mark the existing book as modified
        //     _dbContext.SaveChanges(); // Save changes to the database

        //     return Ok(existingBook); // Return 204 No Content
        // }

        // DELETE: api/Movie/DeleteMovie/{showId}
        [HttpDelete("DeleteMovie/{showId}")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _dbContext.MoviesTitles.Find(showId);
            if (movie == null)
            {
                return NotFound("Movie not found.");
            }

            _dbContext.MoviesTitles.Remove(movie);
            _dbContext.SaveChanges();

            return NoContent(); // 204 No Content
        }
    }
}

