import axios from 'axios';
import { Movie } from '../domain/models/Movie';
import { MovieRepository } from '../domain/repositories/MovieRepository';
import config from '../config/index'
import Actor from '../domain/models/Actor';
import MovieDetail from '../domain/models/MovieDetail';

export class IMDbAdapter extends MovieRepository {
  constructor() {
    super();
    this.apiKey = config.apiKey;
    this.baseUrl = config.url
  }





  async getMovieById(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/movie/${id}?language=es-ES`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      const {
        original_title: originalTitle,
        overview,
        popularity,
        poster_path: posterPath,
        release_date: releaseDate,
        runtime,
        title
      } = response.data;

      
      return {
        originalTitle,
        overview,
        popularity,
        posterPath: `https://image.tmdb.org/t/p/w500${posterPath}`,
        releaseDate,
        runtime,
        title
      };
    } catch (error) {
      console.error('Error en api de detalle pelicula:', error);
      throw error;
    }
  }


  async getMovieCredits(id) {
    try {
      const response = await axios.get(`${this.baseUrl}/movie/${id}/credits`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        }
      });

      return response.data.cast.map(actor => new Actor(actor));
    } catch (error) {
      console.error('Error fetching movie credits:', error);
      throw error;
    }
  }
  async searchMovies(query) {
    try {
      const response = await axios.get(`${this.baseUrl}/search/movie`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        params: {
          query: query,
          language: 'es'
        }
      });


      return response.data.results.map(movieData => {
        return new Movie(movieData);
      }

      );
    } catch (error) {
      console.error('Error en api de peliculas:', error);
      throw error;
    }
  }
}