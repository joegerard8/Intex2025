using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("movies_users")]
public class MoviesUser
{
    [Key]
    [Required]
    [Column("user_id")]
    public byte UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public byte Age { get; set; }

    public string Gender { get; set; } = null!;

    [Column("Netflix")]
    public bool Netflix { get; set; }

    [Column("Amazon_Prime")]
    public bool AmazonPrime { get; set; }

    [Column("Disney")]
    public bool Disney { get; set; }

    [Column("Paramount")]
    public bool Paramount { get; set; }

    [Column("Max")]
    public bool Max { get; set; }

    [Column("Hulu")]
    public bool Hulu { get; set; }

    [Column("Apple_TV")]
    public bool AppleTv { get; set; }

    [Column("Peacock")]
    public bool Peacock { get; set; }

    public string City { get; set; } = null!;

    public string State { get; set; } = null!;

    public int Zip { get; set; }
}
