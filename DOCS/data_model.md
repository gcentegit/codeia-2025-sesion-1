# Modelo de Datos Normalizado

## Estructura de Base de Datos

### Tabla: `movies`

```sql
CREATE TABLE movies (
  id INTEGER PRIMARY KEY,
  tmdb_id INTEGER UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  original_title VARCHAR(255),
  overview TEXT,
  release_date DATE,
  poster_path VARCHAR(500),
  backdrop_path VARCHAR(500),
  budget BIGINT,
  revenue BIGINT,
  runtime INTEGER,
  popularity DECIMAL(10, 2),
  vote_average DECIMAL(3, 1),
  vote_count INTEGER,
  status VARCHAR(50),
  original_language VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tabla: `genres`

```sql
CREATE TABLE genres (
  id INTEGER PRIMARY KEY,
  tmdb_id INTEGER UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL
);
```

### Tabla: `movie_genres` (Relación M:M)

```sql
CREATE TABLE movie_genres (
  movie_id INTEGER NOT NULL,
  genre_id INTEGER NOT NULL,
  PRIMARY KEY (movie_id, genre_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);
```

### Tabla: `cast_members`

```sql
CREATE TABLE cast_members (
  id INTEGER PRIMARY KEY,
  tmdb_id INTEGER UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  profile_path VARCHAR(500),
  biography TEXT,
  birthday DATE,
  birthplace VARCHAR(255)
);
```

### Tabla: `movie_cast` (Relación M:M)

```sql
CREATE TABLE movie_cast (
  movie_id INTEGER NOT NULL,
  cast_id INTEGER NOT NULL,
  character_name VARCHAR(255),
  cast_order INTEGER,
  PRIMARY KEY (movie_id, cast_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (cast_id) REFERENCES cast_members(id) ON DELETE CASCADE
);
```

---

## Reglas de Transformación

### 1. Normalización de Datos TMDB

**Entrada (API):**
```json
{
  "id": 27205,
  "genres": [
    { "id": 28, "name": "Action" },
    { "id": 12, "name": "Adventure" }
  ]
}
```

**Transformación:**
- Separar géneros en tabla relacionada
- Usar `tmdb_id` para mapeo con API
- Validar unicidad de IDs

**Salida (BD):**
```sql
INSERT INTO movies (tmdb_id, title, ...) VALUES (27205, 'Inception', ...);
INSERT INTO movie_genres (movie_id, genre_id) VALUES (1, 28), (1, 12);
```

### 2. Manejo de Valores Nulos

| Campo | Acción |
|-------|--------|
| `overview` | Permitir NULL |
| `release_date` | Permitir NULL |
| `budget` | Establecer a 0 si no disponible |
| `revenue` | Establecer a 0 si no disponible |
| `runtime` | Permitir NULL |

### 3. Deduplicación

- Verificar `tmdb_id` antes de insertar
- Actualizar campos si registro existe (upsert)
- Evitar duplicados en géneros y cast

### 4. Validación de Datos

```python
def validate_movie(data: dict) -> bool:
    required_fields = ['id', 'title', 'release_date']
    
    # Validar campos requeridos
    if not all(field in data for field in required_fields):
        return False
    
    # Validar tipos
    if not isinstance(data['id'], int):
        return False
    
    if not isinstance(data['title'], str) or len(data['title']) == 0:
        return False
    
    # Validar fecha
    try:
        datetime.strptime(data['release_date'], '%Y-%m-%d')
    except ValueError:
        return False
    
    return True
```

### 5. Índices para Optimización

```sql
CREATE INDEX idx_tmdb_id ON movies(tmdb_id);
CREATE INDEX idx_release_date ON movies(release_date);
CREATE INDEX idx_popularity ON movies(popularity DESC);
CREATE INDEX idx_vote_average ON movies(vote_average DESC);
CREATE INDEX idx_genre_id ON movie_genres(genre_id);
CREATE INDEX idx_cast_id ON movie_cast(cast_id);
```

---

## Mapeo de Entidades

```
TMDB API          →  Tabla DB        →  Objeto Python
─────────────────────────────────────────────────────
movie.id          →  movies.tmdb_id  → Movie.tmdb_id
movie.genres[]    →  movie_genres    → Movie.genres[]
movie.credits     →  movie_cast      → Movie.cast[]
```

---

## Ejemplo de Transformación Completa

**Entrada API:**
```json
{
  "id": 27205,
  "title": "Inception",
  "genres": [{"id": 28, "name": "Action"}],
  "credits": {
    "cast": [
      {
        "id": 3,
        "name": "Leonardo DiCaprio",
        "character": "Cobb"
      }
    ]
  }
}
```

**Salida Normalizada:**
```sql
INSERT INTO movies (tmdb_id, title, ...) VALUES (27205, 'Inception', ...);
INSERT INTO genres (tmdb_id, name) VALUES (28, 'Action');
INSERT INTO movie_genres (movie_id, genre_id) VALUES (1, 1);
INSERT INTO cast_members (tmdb_id, name) VALUES (3, 'Leonardo DiCaprio');
INSERT INTO movie_cast (movie_id, cast_id, character_name) VALUES (1, 1, 'Cobb');
```

