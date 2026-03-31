# Plan de Commits y Puntos de Tag

## Convención de Commits

Seguimos **Conventional Commits** para mantener un historial legible y automatizable.

### Formato

```
[<type>](<scope>): <subject>

<body>

<footer>
```

### Tipos de Commits

| Tipo | Descripción | Ejemplo |
|------|------------|---------|
| `feat` | Nueva funcionalidad | `feat(search): agregar búsqueda avanzada` |
| `fix` | Corrección de bug | `fix(api): corregir validación de query` |
| `docs` | Cambios en documentación | `docs: actualizar README` |
| `style` | Cambios de formato (sin lógica) | `style: formato de código` |
| `refactor` | Refactorización sin cambio funcional | `refactor(service): simplificar lógica` |
| `perf` | Mejoras de rendimiento | `perf(db): optimizar índices` |
| `test` | Agregar/modificar tests | `test(movie): agregar casos de prueba` |
| `chore` | Mantenimiento (deps, configs) | `chore(deps): actualizar pytest` |
| `ci` | Cambios CI/CD | `ci: agregar GitHub Actions` |

### Scopes Principales

- `api` - API REST endpoints
- `service` - Capas de lógica de negocio
- `db` - Cambios de base de datos
- `tmdb` - Integración TMDB API
- `auth` - Autenticación/autorización
- `config` - Configuración general

---

## Plan de Commits Fase 1

### Sprint 1: Inicialización y Setup

```
1. chore: setup inicial del proyecto
   └─ Crear estructura de carpetas
   └─ Configurar .gitignore, requirements.txt
   └─ Tag: v0.0.1-setup

2. docs: agregar documentación base
   └─ README.md, CONTRIBUTING.md
   └─ Tag: v0.0.2-docs-initial

3. chore: configurar dependencias
   └─ Flask/FastAPI, SQLAlchemy, pytest
   └─ Tag: v0.0.3-deps

4. ci: configurar GitHub Actions
   └─ Workflows de test y lint
   └─ Tag: v0.0.4-ci
```

### Sprint 2: Integración TMDB API

```
5. feat(tmdb): crear cliente TMDB
   └─ Wrapper para requests a API
   └─ Implementar rate limiting
   └─ Tag: v0.1.0-tmdb-client

6. feat(tmdb): búsqueda de películas
   └─ Endpoint /api/search/movie
   └─ Validación de parámetros
   └─ Tag: v0.1.1-search

7. feat(api): obtener detalles de película
   └─ Endpoint /api/movie/{id}
   └─ Caché de respuestas
   └─ Tag: v0.1.2-movie-details

8. feat(api): listar películas populares
   └─ Endpoint /api/movies/popular
   └─ Paginación
   └─ Tag: v0.1.3-popular
```

### Sprint 3: Persistencia de Datos

```
9. feat(db): crear esquema de base de datos
   └─ Tablas: movies, genres, cast_members
   └─ Migraciones iniciales
   └─ Tag: v0.2.0-db-schema

10. feat(db): repositorio de películas
    └─ CRUD operations
    └─ Implementar pattern Repository
    └─ Tag: v0.2.1-repository

11. feat(service): servicio de sincronización
    └─ Sync TMDB API con BD local
    └─ Transformación de datos
    └─ Tag: v0.2.2-sync-service

12. test: agregar unit tests
    └─ MovieRepository, SearchService
    └─ Coverage > 80%
    └─ Tag: v0.2.3-tests
```

### Sprint 4: Mejoras y Polish

```
13. feat(auth): autenticación básica
    └─ JWT tokens
    └─ Rate limiting por usuario
    └─ Tag: v0.3.0-auth

14. perf(db): optimizar queries
    └─ Agregar índices
    └─ Lazy loading de relaciones
    └─ Tag: v0.3.1-perf

15. refactor: mejorar error handling
    └─ Excepciones personalizadas
    └─ Logging centralizado
    └─ Tag: v0.3.2-error-handling

16. docs: documentación API completa
    └─ OpenAPI/Swagger
    └─ Ejemplos de uso
    └─ Tag: v0.3.3-api-docs
```

---

## Estrategia de Tagging

### Nomenclatura de Tags

```
v<MAJOR>.<MINOR>.<PATCH>[-<PRE-RELEASE>]

Ejemplo:
  v0.1.0         - Release
  v0.1.0-alpha   - Pre-release alpha
  v0.1.0-beta    - Pre-release beta
  v0.1.0-rc1     - Release candidate
```

### Milestones

| Tag | Hito | Funcionalidades |
|-----|------|-----------------|
| `v0.1.x` | TMDB API Integration | Búsqueda, detalles, listados |
| `v0.2.x` | Database Persistence | Sincronización, almacenamiento |
| `v0.3.x` | Authentication & Perf | JWT, optimizaciones |
| `v1.0.0` | Stable Release | Producción lista |

---

## Reglas para Commits

✅ **HACER:**
- Commits pequeños y atómicos
- Mensajes descriptivos en presente
- Un cambio lógico por commit
- Signed commits con GPG

❌ **NO HACER:**
- Commits mixtos (fix + feature)
- Mensajes en español + inglés (consistencia)
- Mensajes capitalizados (empezar con minúscula)
- Commits WIP sin descripción

---

## Ejemplo de Commits en Rama

```bash
git checkout -b feat/tmdb-search

# Commit 1
git commit -m "feat(tmdb): crear cliente TMDB con rate limiting"

# Commit 2
git commit -m "feat(api): implementar endpoint /api/search/movie"

# Commit 3
git commit -m "test(search): agregar unit tests para búsqueda"

# Pull Request y merge
git tag v0.1.0
git push origin v0.1.0
```

---

## Flujo de Release

```
1. Actualizar VERSION en package.json
2. Ejecutar tests: npm test
3. Generar CHANGELOG desde commits
4. Commit: chore(release): v0.X.X
5. Tag: git tag v0.X.X
6. Push: git push && git push --tags
7. GitHub Release con notas
```

