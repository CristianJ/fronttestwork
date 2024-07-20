import { useState } from 'react';
import { useRouter } from 'next/router';
import { IMDbAdapter } from '../adapters/ImdbAdapter';

export default function SearchMovie() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query) return;

    setLoading(true);
    const imdbAdapter = new IMDbAdapter();

    try {
      const results = await imdbAdapter.searchMovies(query);
      setMovies(results);
      setError(null);
    } catch (error) {
      console.error('Error al traer las peliculas', error);
      setError('Error al traer las peliculas');
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = (movieId) => {
    router.push(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">Buscador de Peliculas</h1>
        <form onSubmit={handleSearch} className="mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscador de Peliculas"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Buscar
          </button>
        </form>

        {loading && (
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div>
          {movies.length > 0 ? (
            <ul className="space-y-4">
              {movies.map(movie => (
                <li
                  key={movie.id}
                  className="flex flex-col p-4 border-b border-gray-300"
                >
                  <div className="flex items-center">
                    <img
                      src={movie.getFullPosterPath()}
                      alt={movie.title}
                      className="w-24 h-36 object-cover rounded-md"
                    />
                    <div className="ml-4 flex-1">
                      <span className="block text-lg font-semibold mb-2">{movie.title}</span>
                      <p className="text-gray-700 mb-2">{movie.overview.slice(0, 200)}{movie.overview.length > 200 ? '...' : ''}</p>
                      <button
                        onClick={() => handleViewMore(movie.id)}
                        className="mt-2 text-blue-500 hover:underline"
                      >
                        Ver más
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p>No se encontró películas</p>
          )}
        </div>
      </div>
    </div>
  );
}