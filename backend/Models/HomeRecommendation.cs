using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

[Table("home_recommendations")] // use the exact table name in the DB
public class HomeRecommendation
{
    [Key]
    [Column("user_id")]
    public int user_id { get; set; }

    public string collaborative { get; set; } = null!;
    public string content { get; set; } = null!;
    public string hybrid { get; set; } = null!;

    // Match the real DB columns exactly
}