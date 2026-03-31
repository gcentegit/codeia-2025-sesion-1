import { useStore } from './useStore';

// ==================== SELECTORES DE ESTADO ====================

/**
 * Selector para todas las películas
 */
export const useMovies = () => useStore((state) => state.movies);

/**
 * Selector para géneros
 */
export const useGenres = () => useStore((state) => state.genres);

/**
 * Selector para película actual
 */
export const useCurrentMovie = () => useStore((state) => state.currentMovie);

/**
 * Selector para resultados de búsqueda
 */
export const useSearchResults = () => useStore((state) => state.searchResults);

/**
 * Selector para favoritos
 */
export const useFavorites = () => useStore((state) => state.favorites);

/**
 * Selector para estados de carga
 */
export const useLoading = () => useStore((state) => state.loading);

/**
 * Selector para errores
 */
export const useErrors = () => useStore((state) => state.errors);

// ==================== SELECTORES ESPECÍFICOS DE PELÍCULAS ====================

/**
 * Selector para películas populares
 */
export const usePopularMovies = () => useStore((state) => state.movies.popular);

/**
 * Selector para próximas películas
 */
export const useUpcomingMovies = () => useStore((state) => state.movies.upcoming);

/**
 * Selector para películas mejor valoradas
 */
export const useTopRatedMovies = () => useStore((state) => state.movies.topRated);

/**
 * Selector para películas en cartelera
 */
export const useNowPlayingMovies = () => useStore((state) => state.movies.nowPlaying);

// ==================== SELECTORES DE ESTADOS DE CARGA ====================

/**
 * Selector para loading de películas populares
 */
export const usePopularLoading = () => useStore((state) => state.loading.popular);

/**
 * Selector para loading de próximas películas
 */
export const useUpcomingLoading = () => useStore((state) => state.loading.upcoming);

/**
 * Selector para loading de películas mejor valoradas
 */
export const useTopRatedLoading = () => useStore((state) => state.loading.topRated);

/**
 * Selector para loading de películas en cartelera
 */
export const useNowPlayingLoading = () => useStore((state) => state.loading.nowPlaying);

/**
 * Selector para loading de búsqueda
 */
export const useSearchLoading = () => useStore((state) => state.loading.search);

/**
 * Selector para loading de detalles
 */
export const useDetailsLoading = () => useStore((state) => state.loading.details);

// ==================== SELECTOR DE ACTIONS ====================

// Nota: Los selectores que devuelven objetos pueden causar re-renders infinitos
// Es mejor usar useStore directamente en los componentes o crear selectores individuales

export default useStore;
