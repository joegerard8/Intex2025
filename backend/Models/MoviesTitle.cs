using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models;

[Table("movies_titles")]
public class MoviesTitle
{
    [Key]
    [Required]
    [Column("show_id")]
    public string ShowId { get; set; }

    public string Type { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Director { get; set; }

    public string? Cast { get; set; }

    public string? Country { get; set; }

    [Column("release_year")]
    public short? ReleaseYear { get; set; }

    public string? Rating { get; set; }

    public string? Duration { get; set; }

    public string Description { get; set; } = null!;

    [Column("image_url")]
    public string image_url { get; set; } = null!;

    [Column("Action")]
    public bool Action { get; set; }

    [Column("Adventure")]
    public bool Adventure { get; set; }

    [Column("Anime_Series_International_TV_Shows")]
    public bool AnimeSeriesInternationalTvShows { get; set; }

    [Column("British_TV_Shows_Docuseries_International_TV_Shows")]
    public bool BritishTvShowsDocuseriesInternationalTvShows { get; set; }

    [Column("Children")]
    public bool Children { get; set; }

    [Column("Comedies")]
    public bool Comedies { get; set; }

    [Column("Comedies_Dramas_International_Movies")]
    public bool ComediesDramasInternationalMovies { get; set; }

    [Column("Comedies_International_Movies")]
    public bool ComediesInternationalMovies { get; set; }

    [Column("Comedies_Romantic_Movies")]
    public bool ComediesRomanticMovies { get; set; }

    [Column("Crime_TV_Shows_Docuseries")]
    public bool CrimeTvShowsDocuseries { get; set; }

    [Column("Documentaries")]
    public bool Documentaries { get; set; }

    [Column("Documentaries_International_Movies")]
    public bool DocumentariesInternationalMovies { get; set; }

    [Column("Docuseries")]
    public bool Docuseries { get; set; }

    [Column("Dramas")]
    public bool Dramas { get; set; }

    [Column("Dramas_International_Movies")]
    public bool DramasInternationalMovies { get; set; }

    [Column("Dramas_Romantic_Movies")]
    public bool DramasRomanticMovies { get; set; }

    [Column("Family_Movies")]
    public bool FamilyMovies { get; set; }

    [Column("Fantasy")]
    public bool Fantasy { get; set; }

    [Column("Horror_Movies")]
    public bool HorrorMovies { get; set; }

    [Column("International_Movies_Thrillers")]
    public bool InternationalMoviesThrillers { get; set; }

    [Column("International_TV_Shows_Romantic_TV_Shows_TV_Dramas")]
    public bool InternationalTvShowsRomanticTvShowsTvDramas { get; set; }

    [Column("Kids_TV")]
    public bool KidsTv { get; set; }

    [Column("Language_TV_Shows")]
    public bool LanguageTvShows { get; set; }

    [Column("Musicals")]
    public bool Musicals { get; set; }

    [Column("Nature_TV")]
    public bool NatureTv { get; set; }

    [Column("Reality_TV")]
    public bool RealityTv { get; set; }

    [Column("Spirituality")]
    public bool Spirituality { get; set; }

    [Column("TV_Action")]
    public bool TvAction { get; set; }

    [Column("TV_Comedies")]
    public bool TvComedies { get; set; }

    [Column("TV_Dramas")]
    public bool TvDramas { get; set; }

    [Column("Talk_Shows_TV_Comedies")]
    public byte TalkShowsTvComedies { get; set; }

    [Column("Thrillers")]
    public bool Thrillers { get; set; }

}

