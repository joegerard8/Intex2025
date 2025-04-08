﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class MoviesTitle
{
    [Key]
    [Required]
    public string ShowId { get; set; }

    public string Type { get; set; } = null!;

    public string Title { get; set; } = null!;

    public string? Director { get; set; }

    public string? Cast { get; set; }

    public string? Country { get; set; }

    public short? ReleaseYear { get; set; }

    public string? Rating { get; set; }

    public string? Duration { get; set; }

    public string Description { get; set; } = null!;

    public bool Action { get; set; }

    public bool Adventure { get; set; }

    public bool AnimeSeriesInternationalTvShows { get; set; }

    public bool BritishTvShowsDocuseriesInternationalTvShows { get; set; }

    public bool Children { get; set; }

    public bool Comedies { get; set; }

    public bool ComediesDramasInternationalMovies { get; set; }

    public bool ComediesInternationalMovies { get; set; }

    public bool ComediesRomanticMovies { get; set; }

    public bool CrimeTvShowsDocuseries { get; set; }

    public bool Documentaries { get; set; }

    public bool DocumentariesInternationalMovies { get; set; }

    public bool Docuseries { get; set; }

    public bool Dramas { get; set; }

    public bool DramasInternationalMovies { get; set; }

    public bool DramasRomanticMovies { get; set; }

    public bool FamilyMovies { get; set; }

    public bool Fantasy { get; set; }

    public bool HorrorMovies { get; set; }

    public bool InternationalMoviesThrillers { get; set; }

    public bool InternationalTvShowsRomanticTvShowsTvDramas { get; set; }

    public bool KidsTv { get; set; }

    public bool LanguageTvShows { get; set; }

    public bool Musicals { get; set; }

    public bool NatureTv { get; set; }

    public bool RealityTv { get; set; }

    public bool Spirituality { get; set; }

    public bool TvAction { get; set; }

    public bool TvComedies { get; set; }

    public bool TvDramas { get; set; }

    public byte TalkShowsTvComedies { get; set; }

    public bool Thrillers { get; set; }
}
