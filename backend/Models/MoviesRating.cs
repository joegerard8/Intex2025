using System;
using System.Collections.Generic;

namespace backend.Models;

public class MoviesRating
{

    public byte UserId { get; set; }

    public string ShowId { get; set; }

    public byte Rating { get; set; }
}
