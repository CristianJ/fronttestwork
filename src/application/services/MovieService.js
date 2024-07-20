export class MovieService {
    constructor(movieRepository) {
      this.movieRepository = movieRepository;
    }
  
    async getMovieDetails(id) {
      return this.movieRepository.getMovieById(id);
    }
  
    async searchMovies(query) {
      return this.movieRepository.searchMovies(query);
    }
  }