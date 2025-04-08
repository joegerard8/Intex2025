using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("movies_ratings")]
public class MoviesRating
{

    [Column("user_id")]
    public byte UserId { get; set; }
    
    [Column("show_id")]
    public string ShowId { get; set; }

    public byte Rating { get; set; }
}
