## Planificación para Consumo de TMDB

### 1. Configuración del entorno
- Crear archivo `.env` con: `API_KEY`, `BASE_URL`, `LANGUAGE`, `IMAGE_BASE_URL`.
- Instalar `dotenv` en Node.js para cargar variables de entorno.

### 2. Backend Node.js
- Implementar endpoints propios: `/api/movies`, `/api/series`, `/api/search`, `/api/genres`, `/api/detail/:id`, `/api/recommendations/:id`.
- Usar `fetch` o `axios` para consumir TMDB.

### 3. Frontend React 18 (legacy)
- Instalar y configurar Tailwind.
- Instalar shadcn/ui y seleccionar componentes necesarios.

### 4. Componentes UI recomendados
- Navbar
- Hero
- Card
- Grid/List
- Modal/Dialog
- SearchBar
- GenreFilter
- Pagination
- Loader/Spinner
- Footer
- Skeleton de carga
- Dropdown modernos
- Soporte colores claro/oscuro

### 5. Flujo de datos
- Frontend consume endpoints del backend.
- Backend obtiene datos de TMDB usando variables de entorno.
- Componentes UI muestran los datos.

### 6. Consideraciones
- Manejo de errores y estados de carga.
- Lazy loading para imágenes.
- Tailwind para estilos rápidos.
- shadcn/ui para componentes accesibles.
- Filtros comunes en listados.
- Paginación.
- Skeleton de carga.
- Dropdown modernos.
- Colores claros/oscuro.
# API Endpoints TMDB

## Configuración Base

**Base URL**: `https://api.themoviedb.org/3/`  
**Autenticación**: Bearer Token (v4) o API Key (v3)  
**Rate Limit**: 40 solicitudes/10 segundos (por IP o cuenta)  

---

## Endpoints Principales

### 1. Búsqueda de Películas

#### `GET /search/movie`

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| query | string | Sí | Término de búsqueda |
| page | integer | No | Página de resultados (default: 1) |
| include_adult | boolean | No | Incluir contenido adulto |
| language | string | No | Idioma (ej: es-ES) |

**Ejemplo de Solicitud:**
```bash
curl -X GET "https://api.themoviedb.org/3/search/movie?query=Inception&api_key=YOUR_API_KEY"
```

**Ejemplo de Respuesta:**
```json
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/path/to/image.jpg",
      "genre_ids": [28, 12, 878],
      "id": 27205,
      "original_language": "en",
      "original_title": "Inception",
      "overview": "Cobb es un ladrón especializado...",
      "popularity": 85.5,
      "poster_path": "/path/to/poster.jpg",
      "release_date": "2010-07-16",
      "title": "Inception",
      "video": false,
      "vote_average": 8.8,
      "vote_count": 25000
    }
  ],
  "total_pages": 10,
  "total_results": 250
}
```

---

### 2. Detalles de Película

#### `GET /movie/{movie_id}`

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| movie_id | integer | Sí | ID de la película |
| append_to_response | string | No | Datos adicionales (videos, credits, reviews) |
| language | string | No | Idioma |

**Ejemplo de Respuesta:**
```json
{
  "id": 27205,
  "title": "Inception",
  "budget": 160000000,
  "revenue": 839000000,
  "runtime": 148,
  "status": "Released",
  "release_date": "2010-07-16",
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" },
    { "id": 878, "name": "Science Fiction" }
  ],
  "vote_average": 8.8,
  "vote_count": 25000,
  "popularity": 85.5
}
```

---

### 3. Películas Populares

#### `GET /movie/popular`

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| page | integer | No | Página de resultados |
| region | string | No | Códigos ISO 3166-1 |
| language | string | No | Idioma |

---

### 4. Películas en Cines

#### `GET /movie/now_playing`

Mismos parámetros que `/movie/popular`

---

### 5. Películas Próximas

#### `GET /movie/upcoming`

Mismos parámetros que `/movie/popular`

---

### 6. Películas Mejor Valoradas

#### `GET /movie/top_rated`

Mismos parámetros que `/movie/popular`

---

## Límites y Consideraciones

| Aspecto | Valor |
|--------|-------|
| Rate Limit | 40 req/10 seg |
| Datos por página | 20 resultados |
| Imágenes | URL base: `https://image.tmdb.org/t/p/` |
| Tamaño máximo query | 1000 caracteres |

---

## Códigos de Respuesta

| Código | Significado |
|--------|------------|
| 200 | Éxito |
| 400 | Bad Request |
| 401 | Unauthorized (API key inválida) |
| 404 | Not Found |
| 429 | Too Many Requests (rate limit) |
| 500 | Internal Server Error |

---

## Imagen Base URL

```
https://image.tmdb.org/t/p/w500{poster_path}
https://image.tmdb.org/t/p/w1280{backdrop_path}
```

**Tamaños disponibles**: w92, w154, w185, w342, w500, w780, w1280

