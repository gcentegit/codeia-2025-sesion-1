class SimpleCache {
  constructor(defaultTTL = 3600000) {
    // 1 hora (3600000 ms) por defecto
    this.cache = new Map();
    this.defaultTTL = defaultTTL;
  }

  set(key, value, ttl) {
    const expires = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, { value, expires });
    console.log(`Cache SET: ${key} (TTL: ${ttl || this.defaultTTL}ms)`);
  }

  get(key) {
    const item = this.cache.get(key);

    if (!item) {
      console.log(`Cache MISS: ${key}`);
      return null;
    }

    // Verificar si ha expirado
    if (Date.now() > item.expires) {
      console.log(`Cache EXPIRED: ${key}`);
      this.cache.delete(key);
      return null;
    }

    console.log(`Cache HIT: ${key}`);
    return item.value;
  }

  has(key) {
    return this.get(key) !== null;
  }

  clear() {
    console.log('Cache CLEARED');
    this.cache.clear();
  }

  delete(key) {
    console.log(`Cache DELETE: ${key}`);
    this.cache.delete(key);
  }

  // Obtener estadísticas del caché
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }

  // Limpiar entradas expiradas
  cleanup() {
    const now = Date.now();
    let cleaned = 0;

    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
        cleaned++;
      }
    }

    if (cleaned > 0) {
      console.log(`Cache CLEANUP: Removed ${cleaned} expired entries`);
    }

    return cleaned;
  }

  // Obtener tamaño actual del caché
  get size() {
    return this.cache.size;
  }
}

// Crear instancia singleton con TTL de 1 hora
const cache = new SimpleCache(3600000); // 1 hora

// Cleanup automático cada 10 minutos
if (typeof window !== 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 600000); // 10 minutos
}

export default cache;
