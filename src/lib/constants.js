export const TMDB_CONFIG = {
  baseUrl: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  imageBaseUrl: import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
  language: import.meta.env.VITE_TMDB_LANGUAGE || 'es-ES',
  apiKey: import.meta.env.VITE_TMDB_API_KEY,
};

export const IMAGE_SIZES = {
  poster: 'w500',
  backdrop: 'w1280',
  profile: 'w185',
};
