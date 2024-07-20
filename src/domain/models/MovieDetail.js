export default class MovieDetail {
  constructor({
      originalTitle = '',
      overview = '',
      popularity = 0,
      posterPath = '',
      releaseDate = '',
      runtime = 0,
      title = ''
    }) {
      this.originalTitle = originalTitle;
      this.overview = overview;
      this.popularity = popularity;
      this.posterPath = posterPath;
      this.releaseDate = releaseDate;
      this.runtime = runtime;
      this.title = title;
  }

  


  getFullPosterPath() {
      return `https://image.tmdb.org/t/p/w500${this.posterPath}`;
  }
}