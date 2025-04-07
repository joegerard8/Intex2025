using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class MoviesRating
{
    public byte UserId { get; set; }

    public string ShowId { get; set; } = null!;

    public byte Rating { get; set; }
}
