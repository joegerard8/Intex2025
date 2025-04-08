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

        // [HttpDelete("DeleteBook/{BookId}")] // route to delete a book. 
        // public IActionResult DeleteBook(int BookId)
        // {
        //     var book = _dbContext.Books.Find(BookId);
        //     if (book == null)
        //     {
        //         return NotFound("Book not found.");
        //     }

        //     _dbContext.Books.Remove(book); // Remove the book from the DbSet
        //     _dbContext.SaveChanges(); // Save changes to the database

        //     return NoContent(); // Return 204 No Content
    }
}
