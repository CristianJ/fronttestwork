import axios from 'axios';
import { Movie } from '../domain/models/Movie';
import { MovieRepository } from '../domain/repositories/MovieRepository';
import config from '../config/index' 
import Actor from '../domain/models/Actor';

export class IMDbAdapter extends MovieRepository {
  constructor() {
    super();
    this.apiKey = config.apiKey;
    this.baseUrl = config.url
  }

  async getMovieById(id) {
    const response = await axios.get(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=es-Es`);
    const data = response.data;
    return new Movie(data.id, data.title, data.overview, data.vote_average);
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
          language:'es'
        }
      });
  
      
      return response.data.results.map(movieData=>{
        return new Movie(movieData);
      }
       
      );
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error; 
    }
  }
}