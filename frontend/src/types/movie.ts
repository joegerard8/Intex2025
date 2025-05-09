// essentially a movie object, just has a strange name
export interface MoviesTitle {
  showId: string;
  type: string;
  title: string;
  director?: string;
  cast: string;
  country?: string;
  releaseYear?: number;
  rating?: string;
  duration?: string;
  description: string;
  image_url: string;

  // All genre boolean fields
  action: boolean;
  adventure: boolean;
  animeSeriesInternationalTvShows: boolean;
  britishTvShowsDocuseriesInternationalTvShows: boolean;
  children: boolean;
  comedies: boolean;
  comediesDramasInternationalMovies: boolean;
  comediesInternationalMovies: boolean;
  comediesRomanticMovies: boolean;
  crimeTvShowsDocuseries: boolean;
  documentaries: boolean;
  documentariesInternationalMovies: boolean;
  docuseries: boolean;
  dramas: boolean;
  dramasInternationalMovies: boolean;
  dramasRomanticMovies: boolean;
  familyMovies: boolean;
  fantasy: boolean;
  horrorMovies: boolean;
  internationalMoviesThrillers: boolean;
  internationalTvShowsRomanticTvShowsTvDramas: boolean;
  kidsTv: boolean;
  languageTvShows: boolean;
  musicals: boolean;
  natureTv: boolean;
  realityTv: boolean;
  spirituality: boolean;
  tvAction: boolean;
  tvComedies: boolean;
  tvDramas: boolean;
  talkShowsTvComedies: number;
  thrillers: boolean;
}
