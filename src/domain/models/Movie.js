export class Movie {
    constructor({
      adult,
      backdrop_path,
      genre_ids,
      id,
      original_language,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      video,
      vote_average,
      vote_count
    }) {
      this.adult = adult;
      this.backdropPath = backdrop_path;
      this.genreIds = genre_ids;
      this.id = id;
      this.originalLanguage = original_language;
      this.originalTitle = original_title;
      this.overview = overview;
      this.popularity = popularity;
      this.posterPath = poster_path;
      this.releaseDate = release_date;
      this.title = title;
      this.video = video;
      this.voteAverage = vote_average;
      this.voteCount = vote_count;
    }
    getFormattedReleaseDate() {
      const date = new Date(this.releaseDate);
      return date.toLocaleDateString();
    }
  
    getFullPosterPath() {
      return `https://image.tmdb.org/t/p/w500${this.posterPath}`;
    }
  }
  
  export default Movie;