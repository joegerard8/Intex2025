using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace backend.Models;

public partial class Intex2025DbContext : DbContext
{
    public Intex2025DbContext()
    {
    }

    public Intex2025DbContext(DbContextOptions<Intex2025DbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AspNetRole> AspNetRoles { get; set; }

    public virtual DbSet<AspNetUser> AspNetUsers { get; set; }

    public virtual DbSet<MoviesRating> MoviesRatings { get; set; }

    public virtual DbSet<MoviesTitle> MoviesTitles { get; set; }

    public virtual DbSet<MoviesUser> MoviesUsers { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:intex2025.database.windows.net,1433;Initial Catalog=Intex2025DB;Persist Security Info=False;User ID=Intexadmin;Password=Figmaboy1!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AspNetRole>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AspNetRo__3214EC07281DA58B");

            entity.Property(e => e.Name).HasMaxLength(256);
            entity.Property(e => e.NormalizedName).HasMaxLength(256);
        });

        modelBuilder.Entity<AspNetUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__AspNetUs__3214EC0721C12DF7");

            entity.HasIndex(e => e.UserId, "UQ__AspNetUs__B9BE370E58561448").IsUnique();

            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.NormalizedEmail).HasMaxLength(256);
            entity.Property(e => e.NormalizedUserName).HasMaxLength(256);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.UserId)
                .ValueGeneratedOnAdd()
                .HasColumnName("user_id");
            entity.Property(e => e.UserName).HasMaxLength(256);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "AspNetUserRole",
                    r => r.HasOne<AspNetRole>().WithMany().HasForeignKey("RoleId"),
                    l => l.HasOne<AspNetUser>().WithMany().HasForeignKey("UserId"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId");
                        j.ToTable("AspNetUserRoles");
                    });
        });

        modelBuilder.Entity<MoviesRating>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ShowId });

            entity.ToTable("movies_ratings");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.ShowId)
                .HasMaxLength(50)
                .HasColumnName("show_id");
            entity.Property(e => e.Rating).HasColumnName("rating");
        });

        modelBuilder.Entity<MoviesTitle>(entity =>
        {
            entity.HasKey(e => e.ShowId);

            entity.ToTable("movies_titles");

            entity.Property(e => e.ShowId)
                .HasMaxLength(50)
                .HasColumnName("show_id");
            entity.Property(e => e.AnimeSeriesInternationalTvShows).HasColumnName("Anime_Series_International_TV_Shows");
            entity.Property(e => e.BritishTvShowsDocuseriesInternationalTvShows).HasColumnName("British_TV_Shows_Docuseries_International_TV_Shows");
            entity.Property(e => e.Cast).HasColumnName("cast");
            entity.Property(e => e.ComediesDramasInternationalMovies).HasColumnName("Comedies_Dramas_International_Movies");
            entity.Property(e => e.ComediesInternationalMovies).HasColumnName("Comedies_International_Movies");
            entity.Property(e => e.ComediesRomanticMovies).HasColumnName("Comedies_Romantic_Movies");
            entity.Property(e => e.Country)
                .HasMaxLength(550)
                .HasColumnName("country");
            entity.Property(e => e.CrimeTvShowsDocuseries).HasColumnName("Crime_TV_Shows_Docuseries");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .HasColumnName("description");
            entity.Property(e => e.Director)
                .HasMaxLength(550)
                .HasColumnName("director");
            entity.Property(e => e.DocumentariesInternationalMovies).HasColumnName("Documentaries_International_Movies");
            entity.Property(e => e.DramasInternationalMovies).HasColumnName("Dramas_International_Movies");
            entity.Property(e => e.DramasRomanticMovies).HasColumnName("Dramas_Romantic_Movies");
            entity.Property(e => e.Duration)
                .HasMaxLength(50)
                .HasColumnName("duration");
            entity.Property(e => e.FamilyMovies).HasColumnName("Family_Movies");
            entity.Property(e => e.HorrorMovies).HasColumnName("Horror_Movies");
            entity.Property(e => e.InternationalMoviesThrillers).HasColumnName("International_Movies_Thrillers");
            entity.Property(e => e.InternationalTvShowsRomanticTvShowsTvDramas).HasColumnName("International_TV_Shows_Romantic_TV_Shows_TV_Dramas");
            entity.Property(e => e.KidsTv).HasColumnName("Kids_TV");
            entity.Property(e => e.LanguageTvShows).HasColumnName("Language_TV_Shows");
            entity.Property(e => e.NatureTv).HasColumnName("Nature_TV");
            entity.Property(e => e.Rating)
                .HasMaxLength(50)
                .HasColumnName("rating");
            entity.Property(e => e.RealityTv).HasColumnName("Reality_TV");
            entity.Property(e => e.ReleaseYear).HasColumnName("release_year");
            entity.Property(e => e.TalkShowsTvComedies).HasColumnName("Talk_Shows_TV_Comedies");
            entity.Property(e => e.Title)
                .HasMaxLength(250)
                .HasColumnName("title");
            entity.Property(e => e.TvAction).HasColumnName("TV_Action");
            entity.Property(e => e.TvComedies).HasColumnName("TV_Comedies");
            entity.Property(e => e.TvDramas).HasColumnName("TV_Dramas");
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .HasColumnName("type");
        });

        modelBuilder.Entity<MoviesUser>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.ToTable("movies_users");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Age).HasColumnName("age");
            entity.Property(e => e.AmazonPrime).HasColumnName("Amazon_Prime");
            entity.Property(e => e.AppleTv).HasColumnName("Apple_TV");
            entity.Property(e => e.City)
                .HasMaxLength(50)
                .HasColumnName("city");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.Gender)
                .HasMaxLength(50)
                .HasColumnName("gender");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(50)
                .HasColumnName("phone");
            entity.Property(e => e.State)
                .HasMaxLength(50)
                .HasColumnName("state");
            entity.Property(e => e.Zip).HasColumnName("zip");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
