using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class MoviesUser
{
    [Key]
    [Required]
    public byte UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public byte Age { get; set; }

    public string Gender { get; set; } = null!;

    public bool Netflix { get; set; }

    public bool AmazonPrime { get; set; }

    public bool Disney { get; set; }

    public bool Paramount { get; set; }

    public bool Max { get; set; }

    public bool Hulu { get; set; }

    public bool AppleTv { get; set; }

    public bool Peacock { get; set; }

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public int Zip { get; set; }
}
