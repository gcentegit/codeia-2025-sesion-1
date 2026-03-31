import tmdbClient from './tmdbClient';

/**
 * Servicio de películas de TMDB
 * Proporciona métodos para interactuar con la API de películas de TMDB
 */
export const movieService = {
  // ==================== BÚSQUEDA ====================

  /**
   * Buscar películas por título
   * @param {string} query - Término de búsqueda
   * @param {number} page - Página de resultados (default: 1)
   * @returns {Promise<Object>} Respuesta de TMDB con resultados
   */
  async searchMovies(query, page = 1) {
    return await tmdbClient.get('/search/movie', { query, page });
  },

  // ==================== DETALLES ====================

  /**
   * Obtener detalles de una película
   * @param {number} id - ID de la película
   * @returns {Promise<Object>} Detalles de la película
   */
  async getMovieDetails(id) {
    return await tmdbClient.get(`/movie/${id}`, {
      append_to_response: 'credits,videos,similar,recommendations',
    });
  },

  // ==================== LISTADOS ====================

  /**
   * Obtener películas populares
   * @param {number} page - Página de resultados (default: 1)
   * @returns {Promise<Object>} Lista de películas populares
   */
  async getPopularMovies(page = 1) {
    return await tmdbClient.get('/movie/popular', { page });
  },

  /**
   * Obtener próximas películas
   * @param {number} page - Página de resultados (default: 1)
   * @returns {Promise<Object>} Lista de próximas películas
   */
  async getUpcomingMovies(page = 1) {
    return await tmdbClient.get('/movie/upcoming', { page });
  },

  /**
   * Obtener películas mejor valoradas
   * @param {number} page - Página de resultados (default: 1)
   * @returns {Promise<Object>} Lista de películas mejor valoradas
   */
  async getTopRatedMovies(page = 1) {
    return await tmdbClient.get('/movie/top_rated', { page });
  },

  /**
   * Obtener películas en cartelera
   * @param {number} page - Página de resultados (default: 1)
   * @returns {Promise<Object>} Lista de películas en cartelera
   */
  async getNowPlayingMovies(page = 1) {
    return await tmdbClient.get('/movie/now_playing', { page });
  },

  // ==================== DESCUBRIMIENTO ====================

  /**
   * Descubrir películas con filtros
   * @param {Object} params - Parámetros de filtrado
   * @returns {Promise<Object>} Lista de películas descubiertas
   */
  async discoverMovies(params = {}) {
    return await tmdbClient.get('/discover/movie', params);
  },

  // ==================== GÉNEROS ====================

  /**
   * Obtener lista de géneros de películas
   * @returns {Promise<Object>} Lista de géneros
   */
  async getMovieGenres() {
    return await tmdbClient.get('/genre/movie/list');
  },

  // ==================== RECOMENDACIONES Y SIMILARES ====================

  /**
   * Obtener recomendaciones para una película
   * @param {number} id - ID de la película
   * @param {number} page - Página de resultados (default: 1)
   * @returns {Promise<Object>} Lista de películas recomendadas
   */
  async getRecommendations(id, page = 1) {
    return await tmdbClient.get(`/movie/${id}/recommendations`, { page });
  },

  /**
   * Obtener películas similares
   * @param {number} id - ID de la película
   * @param {number} page - Página de resultados (default: 1)
   * @returns {Promise<Object>} Lista de películas similares
   */
  async getSimilar(id, page = 1) {
    return await tmdbClient.get(`/movie/${id}/similar`, { page });
  },

  // ==================== VIDEOS Y REPARTO ====================

  /**
   * Obtener videos de una película (trailers, teasers, etc.)
   * @param {number} id - ID de la película
   * @returns {Promise<Object>} Lista de videos
   */
  async getMovieVideos(id) {
    return await tmdbClient.get(`/movie/${id}/videos`);
  },

  /**
   * Obtener reparto y equipo de una película
   * @param {number} id - ID de la película
   * @returns {Promise<Object>} Reparto y equipo
   */
  async getMovieCredits(id) {
    return await tmdbClient.get(`/movie/${id}/credits`);
  },

  // ==================== RESEÑAS ====================

  /**
   * Obtener reseñas de una película
   * @param {number} id - ID de la película
   * @param {number} page - Página de resultados (default: 1)
   * @returns {Promise<Object>} Lista de reseñas
   */
  async getMovieReviews(id, page = 1) {
    return await tmdbClient.get(`/movie/${id}/reviews`, { page });
  },
};

export default movieService;
