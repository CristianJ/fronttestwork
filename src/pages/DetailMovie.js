import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IMDbAdapter } from '../adapters/ImdbAdapter';

const DetailMovie = ({ isOpen, onClose, movie }) => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modalRef = useRef(null);

 
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchCast = async () => {
      if (!movie) return;

      setLoading(true);
      const imdbAdapter = new IMDbAdapter();

      try {
        const castData = await imdbAdapter.getMovieCredits(movie.id);
        setCast(castData);
        setError(null);
      } catch (error) {
        console.error('Error fetching movie credits:', error);
        setError('Failed to fetch cast.');
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchCast();
    }
  }, [isOpen, movie]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-xl"
        >
          &times;
        </button>
        <div className="flex mb-4">
          <img
            src={movie.getFullPosterPath()}
            alt={movie.title}
            className="w-32 h-48 object-cover rounded-md mr-4"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <p className="text-gray-700 mb-4">{movie.overview}</p>
            <p className="text-gray-500">Fecha de Estreno: {movie.getFormattedReleaseDate()}</p>
            <p className="text-gray-500">Calificación: {movie.voteAverage}</p>
          </div>
        </div>
        {loading && <p className="text-gray-500">Loading cast...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <h3 className="text-xl font-semibold mb-2">Cast</h3>
        <ul className="list-disc pl-5 space-y-2 max-h-40 overflow-y-auto">
          {cast.length > 0 ? (
            cast.map(actor => (
              <li key={actor.id} className="flex items-center mb-2">
                <img
                  src={actor.getFullProfilePath()}
                  alt={actor.name}
                  className="w-16 h-16 object-cover rounded-full mr-4"
                />
                <div>
                  <span className="font-semibold">{actor.name}</span>
                  <p className="text-gray-600">as {actor.character}</p>
                </div>
              </li>
            ))
          ) : (
            !loading && <p className="text-gray-600">No se encontró información del cast de la película</p>
          )}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default DetailMovie;