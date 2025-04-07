using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public partial class Intex2025DbContext : DbContext
{
    public Intex2025DbContext()
    {
    }

    public Intex2025DbContext(DbContextOptions<Intex2025DbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<ItemRecommendation> ItemRecommendations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:intex2025.database.windows.net,1433;Initial Catalog=Intex2025DB;Persist Security Info=False;User ID=Intexadmin;Password=Figmaboy1!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ItemRecommendation>(entity =>
        {
            entity.HasKey(e => e.ShowId);

            entity.ToTable("item_recommendations");

            entity.Property(e => e.ShowId)
                .HasMaxLength(50)
                .HasColumnName("show_id");
            entity.Property(e => e.Movie).HasColumnName("movie");
            entity.Property(e => e.Recommendation1)
                .HasMaxLength(50)
                .HasColumnName("recommendation1");
            entity.Property(e => e.Recommendation10)
                .HasMaxLength(50)
                .HasColumnName("recommendation10");
            entity.Property(e => e.Recommendation2)
                .HasMaxLength(50)
                .HasColumnName("recommendation2");
            entity.Property(e => e.Recommendation3)
                .HasMaxLength(50)
                .HasColumnName("recommendation3");
            entity.Property(e => e.Recommendation4)
                .HasMaxLength(50)
                .HasColumnName("recommendation4");
            entity.Property(e => e.Recommendation5)
                .HasMaxLength(50)
                .HasColumnName("recommendation5");
            entity.Property(e => e.Recommendation6)
                .HasMaxLength(50)
                .HasColumnName("recommendation6");
            entity.Property(e => e.Recommendation7)
                .HasMaxLength(50)
                .HasColumnName("recommendation7");
            entity.Property(e => e.Recommendation8)
                .HasMaxLength(50)
                .HasColumnName("recommendation8");
            entity.Property(e => e.Recommendation9)
                .HasMaxLength(50)
                .HasColumnName("recommendation9");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
