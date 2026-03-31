# Arquitectura del Proyecto (Legacy)

## Descripción General

Proyecto **TMDB Movie Management System** - Sistema de gestión de películas integrado con The Movie Database (TMDB) API. Arquitectura en capas con separación de responsabilidades.

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────┐
│           CAPA PRESENTACIÓN (UI/API)            │
│  ┌─────────────────────────────────────────┐    │
│  │      API REST Layer / Web Interface     │    │
│  │  - Rutas: /api/movies, /api/search      │    │
│  │  - Controllers/Handlers                 │    │
│  └─────────────────────────────────────────┘    │
└──────────────┬────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────┐
│         CAPA LÓGICA DE NEGOCIO (BL)           │
│  ┌─────────────────────────────────────────┐  │
│  │      Service Layer                      │  │
│  │  - MovieService                         │  │
│  │  - SearchService                        │  │
│  │  - DataTransformationService            │  │
│  └─────────────────────────────────────────┘  │
└──────────────┬────────────────────────────────┘
               │
┌──────────────▼────────────────────────────────┐
│         CAPA DE ACCESO A DATOS (DAL)          │
│  ┌──────────────┬──────────────┐             │
│  │  Repository  │  DTOs        │             │
│  │   Pattern    │              │             │
│  └──────────────┴──────────────┘             │
└──────────────┬────────────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼──────┐   ┌─────▼──────────┐
│  TMDB API   │   │  Base de Datos │
│  (Externa)  │   │  (Local)       │
└─────────────┘   └────────────────┘
```

---

## Componentes Principales

### 1. **API Layer (Presentación)**

**Responsabilidades:**
- Recibir solicitudes HTTP
- Validar entrada del usuario
- Formatear respuestas JSON
- Manejo de errores y códigos de estado

**Archivos típicos:**
```
src/
  api/
    routes/
      - movies.py
      - search.py
    handlers/
      - movie_handler.py
```

---

### 2. **Service Layer (Lógica de Negocio)**

**Responsabilidades:**
- Implementar reglas de negocio
- Orquestar operaciones complejas
- Transformar datos entre capas
- Validación de datos de negocio

**Servicios principales:**

#### MovieService
```python
class MovieService:
    def get_movie(id: int) -> Movie
    def search_movies(query: str) -> List[Movie]
    def get_popular_movies(page: int) -> List[Movie]
    def update_movie(id: int, data: dict) -> Movie
```

#### SearchService
```python
class SearchService:
    def search_multi(query: str) -> SearchResults
    def filter_by_genre(movies: List[Movie], genre: str) -> List[Movie]
    def sort_by_popularity(movies: List[Movie]) -> List[Movie]
```

#### DataTransformationService
```python
class DataTransformationService:
    def tmdb_to_domain(tmdb_data: dict) -> Movie
    def domain_to_db(movie: Movie) -> dict
    def normalize_genres(genres: list) -> list
```

---

### 3. **Data Access Layer (DAL)**

**Responsabilidades:**
- Persistencia de datos
- Consultas a BD
- Mapeo objeto-relacional
- Transacciones

**Estructuras:**

#### Repository Pattern
```python
class MovieRepository:
    def find_by_id(id: int) -> Optional[Movie]
    def find_all() -> List[Movie]
    def create(movie: Movie) -> Movie
    def update(id: int, movie: Movie) -> Movie
    def delete(id: int) -> bool
```

#### Data Transfer Objects (DTOs)
```python
@dataclass
class MovieDTO:
    id: int
    title: str
    release_date: str
    genres: List[str]
    vote_average: float
```

---

### 4. **Externa: TMDB API**

**Responsabilidades:**
- Fuente de datos de películas
- Rest Client wrapper
- Caché local de respuestas
- Rate limiting

**Cliente:**
```python
class TMDBClient:
    def search_movie(query: str) -> dict
    def get_movie_details(id: int) -> dict
    def get_popular_movies(page: int) -> dict
```

---

### 5. **Base de Datos (Local)**

**Responsabilidades:**
- Persistencia permanente
- Consultas optimizadas
- Integridad referencial
- Auditoría de cambios

**Tablas principales:**
- `movies`
- `genres`
- `movie_genres`
- `cast_members`
- `movie_cast`

---

## Flujo de Datos (Ejemplo: Búsqueda de Película)

```
1. POST /api/search?query=Inception
           │
           ▼
2. [API Handler] search_movies_handler()
   - Validar query
   - Llamar a SearchService
           │
           ▼
3. [SearchService] search(query)
   - Validar negocio
   - Llamar a TMDB API
   - Llamar a Repository
           │
           ├─────────────┬──────────────┐
           │             │              │
           ▼             ▼              ▼
   [TMDB API]    [DB Repository]    [TransformationService]
   Obtener datos    Buscar local      Normalizar
           │             │              │
           └─────────────┴──────────────┘
                       │
                       ▼
   4. [TransformationService] transform_list()
      - Mapear TMDB → Domain
                       │
                       ▼
   5. [API Handler] format_response()
      - JSON + status 200
                       │
                       ▼
   6. HTTP 200 OK
      {
        "movies": [...],
        "total": 250
      }
```

---

## Patrones de Diseño

| Patrón | Uso | Ubicación |
|--------|-----|----------|
| **Repository** | Abstracción de datos | DAL |
| **Dependency Injection** | Inyección de dependencias | Service Layer |
| **DTO** | Transferencia de datos | Entre capas |
| **Adapter** | Integración TMDB API | External Integration |
| **Factory** | Creación de objetos | Service Layer |
| **Cache** | Optimización TMDB | External Integration |

---

## Tecnología Stack (Legacy)

| Componente | Tecnología |
|-----------|-----------|
| Backend | Python/Flask o FastAPI |
| Base de Datos | PostgreSQL / MySQL |
| ORM | SQLAlchemy |
| API Client | Requests library |
| Testing | Pytest |
| Documentación | Sphinx / OpenAPI |

---

## Considéraciones de Legacy

⚠️ **Notas importantes:**
- Esta arquitectura es de referencia/legacy
- Puede contener decisiones técnicas antiguas
- Se espera refactorización progresiva
- Mantener compatibilidad hacia atrás durante transición
- Documentar cambios significativos en CHANGELOG

