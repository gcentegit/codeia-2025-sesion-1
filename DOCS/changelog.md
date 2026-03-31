## [1.0.1] - 2026-03-18
### Changed
- Actualización menor en documentación de endpoints y reglas TMDB.
- Revisión de artifacts en carpeta DOCS.
### Commit
- docs: actualización de endpoints y reglas TMDB, versión 1.0.1
## [1.0.0] - 2026-03-25
### Added
- Planificación para consumo de TMDB usando Node.js, dotenv, React 18, Tailwind y shadcn/ui.
- Endpoints recomendados y reglas de consumo.
- Componentes UI: filtros comunes, paginación, skeleton de carga, dropdown modernos, soporte colores claro/oscuro.
### Deadline
- 25 de marzo de 2026
# CHANGELOG

Todos los cambios notables en este proyecto se documentan en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/) y este proyecto adhiere a [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Added
- Estructura base del proyecto
- Documentación inicial (arquitectura, API endpoints)
- Pipeline CI/CD básico

### Changed
- N/A

### Fixed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Security
- N/A

---

## [0.4.0] - 2024-03-18

### Added
- `feat(auth)`: Autenticación JWT tokens
  - Endpoints de login/logout
  - Token refresh mechanism
  - Rate limiting por usuario
- `feat(docs)`: Documentación OpenAPI/Swagger
  - Descripción completa de endpoints
  - Ejemplos de respuesta
  - Modelo de errores

### Changed
- `refactor(error)`: Mejora en manejo de excepciones
  - Excepciones personalizadas por tipo de error
  - Logging centralizado
  - Respuestas de error estandarizadas

### Fixed
- `fix(search)`: Validación mejorada de query
  - Prevenir SQL injection
  - Sanitizar caracteres especiales
- `fix(api)`: Manejo correcto de errores 404

### Performance
- `perf(db)`: Optimización de queries
  - Agregar índices en `release_date`, `popularity`
  - Lazy loading de relaciones
  - Caché de búsquedas frecuentes

---

## [0.3.0] - 2024-03-11

### Added
- `feat(service)`: Servicio de sincronización TMDB-BD
  - Sync automático de películas
  - Deduplicación de registros
  - Transformación de datos normalizada
- `feat(db)`: Repositorio de películas
  - CRUD completo
  - Filtering y sorting
  - Paginación

### Changed
- `refactor(data)`: Implementar DTO pattern
  - MovieDTO para transferencia de datos
  - Validación de Pydantic

### Testing
- `test(repository)`: Unit tests MovieRepository
  - Coverage: 85%
- `test(service)`: Unit tests SyncService
  - Coverage: 88%

---

## [0.2.0] - 2024-03-04

### Added
- `feat(db)`: Esquema de base de datos normalizado
  - Tabla `movies`
  - Tabla `genres` con relación M:M
  - Tabla `cast_members`
  - Migraciones Alembic
- `feat(tmdb)`: Cliente TMDB wrapper
  - Métodos para endpoints principales
  - Rate limiting
  - Caché local de respuestas (1 hora)

### Dependencies
- ⬆️ SQLAlchemy 2.0.0
- ⬆️ Alembic 1.10.0
- ⬆️ Python-dotenv 1.0.0

### Fixed
- `fix(config)`: Variables de entorno correctamente cargadas

---

## [0.1.0] - 2024-02-25

### Added
- `feat(api)`: Endpoints TMDB iniciales
  - `GET /api/search/movie` - Búsqueda de películas
  - `GET /api/movie/{id}` - Detalles de película
  - `GET /api/movies/popular` - Películas populares
  - `GET /api/movies/upcoming` - Películas próximas
  - `GET /api/movies/top_rated` - Mejor valoradas
- `feat(api)`: Validación de parámetros
  - Query string validation
  - Error responses estandarizadas
  - Documentación automática

### Tech Stack
- FastAPI 0.95.0
- Uvicorn 0.21.0
- Requests 2.28.2
- Python 3.10+

### Documentation
- Documentación de endpoints API
- Modelo de datos inicial
- Guía de setup

---

## [0.0.4] - 2024-02-18

### Added
- `ci`: GitHub Actions workflows
  - Workflow de tests
  - Workflow de linting (black, flake8)
  - Workflow de cobertura de código

### Dependencies
- Pytest 7.2.0
- Black 23.1.0
- Flake8 6.0.0

---

## [0.0.3] - 2024-02-16

### Added
- `chore(deps)`: Configuración inicial de dependencias
  - requirements.txt
  - requirements-dev.txt
  - pyproject.toml

### Dependencies
- FastAPI 0.95.0
- Uvicorn 0.21.0
- SQLAlchemy 2.0.0
- Pytest 7.2.0
- Black 23.1.0

---

## [0.0.2] - 2024-02-14

### Added
- `docs`: Documentación base del proyecto
  - README.md con instrucciones de setup
  - CONTRIBUTING.md con guía de contribución
  - API endpoints documentation
  - Data model specification
  - Architecture overview

### Documentation Files
- DOCS/api_endpoints.md
- DOCS/data_model.md
- DOCS/arquitectura.md
- CONTRIBUTING.md
- README.md

---

## [0.0.1] - 2024-02-12

### Added
- `chore`: Setup inicial del proyecto
  - Estructura de carpetas base
  - .gitignore configurado
  - README.md inicial
  - LICENSE (MIT)
  - Archivos de configuración (editorconfig, etc)

### Project Structure
```
codeia-2025-sesion-1/
├── DOCS/
│   ├── api_endpoints.md
│   ├── data_model.md
│   └── arquitectura.md
├── src/
├── tests/
├── .gitignore
├── README.md
├── LICENSE
└── requirements.txt
```

---

## Convenciones de Cambios

### Tipos de Cambios

- **Added**: Para nuevas funcionalidades
- **Changed**: Para cambios en funcionalidad existente
- **Deprecated**: Para características que se removerán pronto
- **Removed**: Para características removidas
- **Fixed**: Para correcciones de bugs
- **Security**: Para parches de seguridad

### Convención de Commits

Cada entrada hace referencia a commits usando formato:
```
`<type>(<scope>): <subject>` - Conventional Commits format
```

### Versiones

- **[Unreleased]**: Cambios en desarrollo (rama `develop`)
- **[X.X.X]**: Versiones estables con fecha de release (rama `main`)

---

## Guía de Lectores

### Para Usuarios

Buscar por **version** para ver qué se cambió entre releases.

Buscar por **tipo** (Added, Fixed, Security) para ver cambios relevantes.

### Para Desarrolladores

Cada entry incluye `commit-style` para rastrear cambios en Git.

Nuevos cambios van en la sección **[Unreleased]** durante PR/MR.

### Para DevOps/SRE

Revisar **Security** y **Breaking Changes** antes de deploy.

Verificar **Dependencies** para vulnerabilidades.

---

## Links de Referencia

- **Commits**: https://github.com/project/commits/
- **Releases**: https://github.com/project/releases/
- **Compare**: https://github.com/project/compare/v0.3.0...v0.4.0

---

**[Última actualización: 2024-03-18]**
