import { create } from 'zustand';
import { movieService } from '@/services/movieService';

/**
 * Store principal de Zustand
 * Gestiona el estado global de la aplicación
 */
export const useStore = create((set, get, api) => ({
  // ==================== ESTADO ====================

  // Películas
  movies: {
    popular: [],
    upcoming: [],
    topRated: [],
    nowPlaying: [],
  },

  // Géneros
  genres: [],

  // Película actual
  currentMovie: null,

  // Resultados de búsqueda
  searchResults: [],

  // Favoritos
  favorites: [],

  // Estados de carga
  loading: {
    popular: false,
    upcoming: false,
    topRated: false,
    nowPlaying: false,
    search: false,
    details: false,
    genres: false,
  },

  // Estados de error
  errors: {},

  // ==================== ACTIONS - PELÍCULAS ====================

  /**
   * Obtener películas populares
   * @param {number} page - Página de resultados
   */
  fetchPopularMovies: async (page = 1) => {
    set((state) => ({
      loading: { ...state.loading, popular: true },
      errors: { ...state.errors, popular: null },
    }));

    try {
      const data = await movieService.getPopularMovies(page);
      set((state) => ({
        movies: {
          ...state.movies,
          popular: page === 1 ? data.results : [...state.movies.popular, ...data.results],
        },
        loading: { ...state.loading, popular: false },
      }));
      return data;
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, popular: error.message },
        loading: { ...state.loading, popular: false },
      }));
      throw error;
    }
  },

  /**
   * Obtener próximas películas
   * @param {number} page - Página de resultados
   */
  fetchUpcomingMovies: async (page = 1) => {
    set((state) => ({
      loading: { ...state.loading, upcoming: true },
      errors: { ...state.errors, upcoming: null },
    }));

    try {
      const data = await movieService.getUpcomingMovies(page);
      set((state) => ({
        movies: {
          ...state.movies,
          upcoming: page === 1 ? data.results : [...state.movies.upcoming, ...data.results],
        },
        loading: { ...state.loading, upcoming: false },
      }));
      return data;
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, upcoming: error.message },
        loading: { ...state.loading, upcoming: false },
      }));
      throw error;
    }
  },

  /**
   * Obtener películas mejor valoradas
   * @param {number} page - Página de resultados
   */
  fetchTopRatedMovies: async (page = 1) => {
    set((state) => ({
      loading: { ...state.loading, topRated: true },
      errors: { ...state.errors, topRated: null },
    }));

    try {
      const data = await movieService.getTopRatedMovies(page);
      set((state) => ({
        movies: {
          ...state.movies,
          topRated: page === 1 ? data.results : [...state.movies.topRated, ...data.results],
        },
        loading: { ...state.loading, topRated: false },
      }));
      return data;
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, topRated: error.message },
        loading: { ...state.loading, topRated: false },
      }));
      throw error;
    }
  },

  /**
   * Obtener películas en cartelera
   * @param {number} page - Página de resultados
   */
  fetchNowPlayingMovies: async (page = 1) => {
    set((state) => ({
      loading: { ...state.loading, nowPlaying: true },
      errors: { ...state.errors, nowPlaying: null },
    }));

    try {
      const data = await movieService.getNowPlayingMovies(page);
      set((state) => ({
        movies: {
          ...state.movies,
          nowPlaying: page === 1 ? data.results : [...state.movies.nowPlaying, ...data.results],
        },
        loading: { ...state.loading, nowPlaying: false },
      }));
      return data;
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, nowPlaying: error.message },
        loading: { ...state.loading, nowPlaying: false },
      }));
      throw error;
    }
  },

  // ==================== ACTIONS - GÉNEROS ====================

  /**
   * Obtener lista de géneros
   */
  fetchGenres: async () => {
    set((state) => ({
      loading: { ...state.loading, genres: true },
      errors: { ...state.errors, genres: null },
    }));

    try {
      const data = await movieService.getMovieGenres();
      set({ genres: data.genres, loading: { ...get().loading, genres: false } });
      return data.genres;
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, genres: error.message },
        loading: { ...state.loading, genres: false },
      }));
      throw error;
    }
  },

  // ==================== ACTIONS - DETALLES ====================

  /**
   * Obtener detalles de una película
   * @param {number} id - ID de la película
   */
  fetchMovieDetails: async (id) => {
    set({ loading: { ...get().loading, details: true } });

    try {
      const data = await movieService.getMovieDetails(id);
      set({ currentMovie: data, loading: { ...get().loading, details: false } });
      return data;
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, details: error.message },
        loading: { ...state.loading, details: false },
      }));
      throw error;
    }
  },

  // ==================== ACTIONS - BÚSQUEDA ====================

  /**
   * Buscar películas
   * @param {string} query - Término de búsqueda
   * @param {number} page - Página de resultados
   */
  searchMovies: async (query, page = 1) => {
    set({ loading: { ...get().loading, search: true } });

    try {
      const data = await movieService.searchMovies(query, page);
      set((state) => ({
        searchResults: page === 1 ? data.results : [...state.searchResults, ...data.results],
        loading: { ...state.loading, search: false },
      }));
      return data;
    } catch (error) {
      set((state) => ({
        errors: { ...state.errors, search: error.message },
        loading: { ...state.loading, search: false },
      }));
      throw error;
    }
  },

  /**
   * Limpiar resultados de búsqueda
   */
  clearSearchResults: () => {
    set({ searchResults: [] });
  },

  // ==================== ACTIONS - FAVORITOS ====================

  /**
   * Alternar favorito
   * @param {Object} movie - Película a agregar/quitar de favoritos
   */
  toggleFavorite: (movie) => {
    set((state) => {
      const exists = state.favorites.some((m) => m.id === movie.id);
      return {
        favorites: exists
          ? state.favorites.filter((m) => m.id !== movie.id)
          : [...state.favorites, movie],
      };
    });
  },

  /**
   * Verificar si una película es favorita
   * @param {number} movieId - ID de la película
   * @returns {boolean} True si es favorita
   */
  isFavorite: (movieId) => {
    return get().favorites.some((m) => m.id === movieId);
  },

  /**
   * Establecer lista de favoritos (para cargar desde localStorage)
   * @param {Array} favorites - Lista de favoritos
   */
  setFavorites: (favorites) => {
    set({ favorites });
  },

  // ==================== ACTIONS - RESET ====================

  /**
   * Resetear todas las películas
   */
  resetMovies: () => {
    set({
      movies: {
        popular: [],
        upcoming: [],
        topRated: [],
        nowPlaying: [],
      },
    });
  },

  /**
   * Limpiar película actual
   */
  clearCurrentMovie: () => {
    set({ currentMovie: null });
  },
}));

export default useStore;


