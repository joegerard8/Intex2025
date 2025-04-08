using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{
    [Column("user_id")]
    public int UserId { get; set; }
}
