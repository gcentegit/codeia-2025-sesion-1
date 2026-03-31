import axios from 'axios';
import { TMDB_CONFIG } from '@/lib/constants';
import cache from '@/lib/cache';

class TMDBClient {
  constructor() {
    this.client = axios.create({
      baseURL: TMDB_CONFIG.baseUrl,
      params: {
        api_key: TMDB_CONFIG.apiKey,
        language: TMDB_CONFIG.language,
      },
      timeout: 10000, // 10 segundos timeout
    });

    // Rate limiting: 40 requests per 10 seconds
    this.rateLimit = {
      requests: 40,
      period: 10000, // 10 segundos
      count: 0,
      resetTime: Date.now() + 10000,
    };

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`TMDB API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 429) {
          console.warn('Rate limit exceeded, cooling down...');
        }
        return Promise.reject(error);
      }
    );
  }

  async waitIfNeeded() {
    const now = Date.now();

    // Reset counter si el período ha terminado
    if (now >= this.rateLimit.resetTime) {
      this.rateLimit.count = 0;
      this.rateLimit.resetTime = now + this.rateLimit.period;
    }

    // Esperar si hemos alcanzado el límite
    if (this.rateLimit.count >= this.rateLimit.requests) {
      const waitTime = this.rateLimit.resetTime - now;
      console.log(`Rate limit reached, waiting ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.rateLimit.count = 0;
      this.rateLimit.resetTime = Date.now() + this.rateLimit.period;
    }

    this.rateLimit.count++;
  }

  async get(endpoint, params = {}) {
    // Crear clave de caché
    const cacheKey = `${endpoint}:${JSON.stringify(params)}`;

    // Verificar caché
    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }

    // Si no está en caché, hacer la petición
    await this.waitIfNeeded();
    const response = await this.client.get(endpoint, { params });

    // Guardar en caché (1 hora por defecto)
    cache.set(cacheKey, response.data);

    return response.data;
  }

  async post(endpoint, data = {}, params = {}) {
    await this.waitIfNeeded();
    const response = await this.client.post(endpoint, data, { params });
    return response.data;
  }
}

// Exportar una instancia singleton
export default new TMDBClient();
