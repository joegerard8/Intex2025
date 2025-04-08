using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class FreshStart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ItemRecommendations",
                columns: table => new
                {
                    ShowId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Movie = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation1 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation2 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation3 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation4 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation5 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation6 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation7 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation8 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation9 = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Recommendation10 = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRecommendations", x => x.ShowId);
                });

            migrationBuilder.CreateTable(
                name: "MoviesRatings",
                columns: table => new
                {
                    UserId = table.Column<byte>(type: "tinyint", nullable: false),
                    ShowId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<byte>(type: "tinyint", nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "MoviesTitles",
                columns: table => new
                {
                    ShowId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Director = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cast = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReleaseYear = table.Column<short>(type: "smallint", nullable: true),
                    Rating = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Duration = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Action = table.Column<bool>(type: "bit", nullable: false),
                    Adventure = table.Column<bool>(type: "bit", nullable: false),
                    AnimeSeriesInternationalTvShows = table.Column<bool>(type: "bit", nullable: false),
                    BritishTvShowsDocuseriesInternationalTvShows = table.Column<bool>(type: "bit", nullable: false),
                    Children = table.Column<bool>(type: "bit", nullable: false),
                    Comedies = table.Column<bool>(type: "bit", nullable: false),
                    ComediesDramasInternationalMovies = table.Column<bool>(type: "bit", nullable: false),
                    ComediesInternationalMovies = table.Column<bool>(type: "bit", nullable: false),
                    ComediesRomanticMovies = table.Column<bool>(type: "bit", nullable: false),
                    CrimeTvShowsDocuseries = table.Column<bool>(type: "bit", nullable: false),
                    Documentaries = table.Column<bool>(type: "bit", nullable: false),
                    DocumentariesInternationalMovies = table.Column<bool>(type: "bit", nullable: false),
                    Docuseries = table.Column<bool>(type: "bit", nullable: false),
                    Dramas = table.Column<bool>(type: "bit", nullable: false),
                    DramasInternationalMovies = table.Column<bool>(type: "bit", nullable: false),
                    DramasRomanticMovies = table.Column<bool>(type: "bit", nullable: false),
                    FamilyMovies = table.Column<bool>(type: "bit", nullable: false),
                    Fantasy = table.Column<bool>(type: "bit", nullable: false),
                    HorrorMovies = table.Column<bool>(type: "bit", nullable: false),
                    InternationalMoviesThrillers = table.Column<bool>(type: "bit", nullable: false),
                    InternationalTvShowsRomanticTvShowsTvDramas = table.Column<bool>(type: "bit", nullable: false),
                    KidsTv = table.Column<bool>(type: "bit", nullable: false),
                    LanguageTvShows = table.Column<bool>(type: "bit", nullable: false),
                    Musicals = table.Column<bool>(type: "bit", nullable: false),
                    NatureTv = table.Column<bool>(type: "bit", nullable: false),
                    RealityTv = table.Column<bool>(type: "bit", nullable: false),
                    Spirituality = table.Column<bool>(type: "bit", nullable: false),
                    TvAction = table.Column<bool>(type: "bit", nullable: false),
                    TvComedies = table.Column<bool>(type: "bit", nullable: false),
                    TvDramas = table.Column<bool>(type: "bit", nullable: false),
                    TalkShowsTvComedies = table.Column<byte>(type: "tinyint", nullable: false),
                    Thrillers = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MoviesTitles", x => x.ShowId);
                });

            migrationBuilder.CreateTable(
                name: "MoviesUsers",
                columns: table => new
                {
                    UserId = table.Column<byte>(type: "tinyint", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<byte>(type: "tinyint", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Netflix = table.Column<bool>(type: "bit", nullable: false),
                    AmazonPrime = table.Column<bool>(type: "bit", nullable: false),
                    Disney = table.Column<bool>(type: "bit", nullable: false),
                    Paramount = table.Column<bool>(type: "bit", nullable: false),
                    Max = table.Column<bool>(type: "bit", nullable: false),
                    Hulu = table.Column<bool>(type: "bit", nullable: false),
                    AppleTv = table.Column<bool>(type: "bit", nullable: false),
                    Peacock = table.Column<bool>(type: "bit", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    State = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Zip = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MoviesUsers", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "ItemRecommendations");

            migrationBuilder.DropTable(
                name: "MoviesRatings");

            migrationBuilder.DropTable(
                name: "MoviesTitles");

            migrationBuilder.DropTable(
                name: "MoviesUsers");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
