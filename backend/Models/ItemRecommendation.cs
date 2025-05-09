﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("item_recommendations")]
public class ItemRecommendation
{
    [Key]
    [Required]
    [Column("show_id")]
    public string ShowId { get; set; } 

    public string Movie { get; set; } = null!;

    public string Recommendation1 { get; set; } = null!;

    public string Recommendation2 { get; set; } = null!;

    public string Recommendation3 { get; set; } = null!;

    public string Recommendation4 { get; set; } = null!;

    public string Recommendation5 { get; set; } = null!;

    public string Recommendation6 { get; set; } = null!;

    public string Recommendation7 { get; set; } = null!;

    public string Recommendation8 { get; set; } = null!;

    public string Recommendation9 { get; set; } = null!;

    public string Recommendation10 { get; set; } = null!;
}
