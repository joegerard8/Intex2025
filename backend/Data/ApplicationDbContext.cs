using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace backend.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options):
        base(options){}

    public DbSet<MoviesTitle> MoviesTitles { get; set; } = null!;
    public DbSet<MoviesRating> MoviesRatings { get; set; } = null!;
    public DbSet<ItemRecommendation> ItemRecommendations { get; set; } = null!;
    public DbSet<MoviesUser> MoviesUsers { get; set; } = null!;
    public DbSet<ApplicationUser> ApplicationUsers { get; set; } = null!;
    public DbSet<HomeRecommendation> HomeRecommendations { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    
    {
        base.OnModelCreating(builder);

        builder.Entity<MoviesRating>().HasNoKey();

        builder.Entity<ApplicationUser>(entity =>
        {
        entity.Property(e => e.UserId)
            .HasColumnName("user_id")
            .HasColumnType("int")
            .ValueGeneratedOnAdd() // ✅ Let SQL Server auto-increment it
            .Metadata.SetAfterSaveBehavior(PropertySaveBehavior.Ignore);
        });
    }
}