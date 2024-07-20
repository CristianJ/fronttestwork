import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IMDbAdapter } from '../../adapters/ImdbAdapter';

const DetailMovie = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchMovieDetails = async () => {
      setLoading(true);
      const imdbAdapter = new IMDbAdapter();

      try {
        const movieData = await imdbAdapter.getMovieById(id);
        setMovie(movieData);

        const castData = await imdbAdapter.getMovieCredits(id);
        setCast(castData);

        setError(null);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!movie) return <p className="text-center text-gray-500">No existe la pelicula.</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <button
          onClick={() => router.back()}
          className="block text-blue-500 hover:underline mb-4 p-4 text-lg font-semibold"
        >
          &larr; Volver
        </button>
        <div className="relative">
          <img
            src={movie.posterPath}
            alt={movie.title}
            className="w-full h-96 object-cover"
          />
          <div className="absolute top-0 left-0 bg-gradient-to-t from-gray-800 via-transparent to-transparent w-full h-full flex items-end p-6">
            <h1 className="text-4xl font-bold text-white">{movie.title}</h1>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-200 text-xl mb-4">{movie.overview}</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <p className="text-gray-600"><span className="font-semibold">Nombre:</span> {movie.originalTitle}</p>
            <p className="text-gray-600"><span className="font-semibold">Fecha Estreno:</span> {movie.releaseDate}</p>
            <p className="text-gray-600"><span className="font-semibold">Duración:</span> {movie.runtime} minutos</p>
            <p className="text-gray-600"><span className="font-semibold">Calificación:</span> {movie.popularity}</p>
          </div>

          <h3 className="text-2xl font-semibold mt-6 mb-4">Cast</h3>
          {cast.length > 0 ? (
            <ul className="list-none space-y-4">
              {cast.map(actor => (
                <li key={actor.id} className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
                  <img
                    src={actor.getFullProfilePath()}
                    alt={actor.name}
                    className="w-20 h-20 object-cover rounded-full mr-4"
                  />
                  <div>
                    <span className="text-lg font-semibold">{actor.name}</span>
                    <p className="text-gray-600">as {actor.character}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !loading && <p className="text-gray-600">No hay informacion de los actores de la pelicula</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;