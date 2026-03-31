import { useState, useEffect } from 'react';

/**
 * Hook genérico para llamadas a la API de TMDB
 * @param {Function} apiCall - Función que retorna una Promise
 * @param {Array} dependencies - Array de dependencias para useEffect
 * @returns {Object} { data, loading, error, refetch }
 */
export function useTMDB(apiCall, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      setData(result);
    } catch (err) {
      setError(err);
      console.error('TMDB API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchDataWrapper = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiCall();
        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
          console.error('TMDB API Error:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchDataWrapper();

    return () => {
      cancelled = true;
    };
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook específico para obtener detalles de una película
 * @param {number} movieId - ID de la película
 * @returns {Object} { movie, loading, error }
 */
export function useMovie(movieId) {
  const { data: movie, loading, error } = useTMDB(
    async () => {
      const { movieService } = await import('@/services/movieService');
      return await movieService.getMovieDetails(movieId);
    },
    [movieId]
  );

  return { movie, loading, error };
}

/**
 * Hook específico para buscar películas
 * @param {string} query - Término de búsqueda
 * @returns {Object} { movies, loading, error }
 */
export function useMovieSearch(query) {
  const { data: movies, loading, error } = useTMDB(
    async () => {
      if (!query || query.trim() === '') return null;
      const { movieService } = await import('@/services/movieService');
      return await movieService.searchMovies(query);
    },
    [query]
  );

  return { movies, loading, error };
}

export default useTMDB;
