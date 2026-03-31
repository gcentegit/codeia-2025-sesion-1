# Política de Versionado y Release

## Semantic Versioning (SemVer)

Seguimos [Semantic Versioning 2.0.0](https://semver.org/)

### Formato

```
MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]

Ejemplo: 1.2.3-alpha.1+build.123
```

### Significado

| Segmento | Incremento | Ejemplo |
|----------|-----------|---------|
| **MAJOR** | Cambios incompatibles (breaking changes) | 1.0.0 → 2.0.0 |
| **MINOR** | Nuevas funcionalidades compatibles | 1.0.0 → 1.1.0 |
| **PATCH** | Correcciones de bugs | 1.0.0 → 1.0.1 |
| **PRERELEASE** | Versión preliminar (alpha, beta, rc) | 1.0.0-alpha.1 |
| **BUILD** | Metadata de compilación | 1.0.0+20130313144700 |

---

## Ciclo de Versionado

```
DEVELOPMENT (Main Branch)
    ↓
v0.X.X (Pre-release alphas)
    ↓
v1.0.0-alpha.1, alpha.2, ...
    ↓
v1.0.0-beta.1, beta.2, ...
    ↓
v1.0.0-rc.1, rc.2 (Release Candidate)
    ↓
v1.0.0 (Stable Release)
    ↓
MAINTENANCE/PATCHES
    ↓
v1.0.1, v1.0.2, ... (Hotfixes)
```

---

## Política de Releases

### Release Cadence

| Tipo | Frecuencia | Descripción |
|------|-----------|-----------|
| **Alpha** | Semanal | Características nuevas inestables |
| **Beta** | Bi-semanal | Características completadas, pruebas |
| **RC** | Según sea necesario | Última verificación antes stable |
| **Stable** | Mensual | Release lista para producción |
| **Hotfix** | Ad-hoc | Parches de seguridad/bugs críticos |

### Criterios para Release

**Alpha Release:**
- ✅ Nuevo desarrollo completado
- ✅ Tests unitarios pasados
- ❌ No requiere documentación

**Beta Release:**
- ✅ Funcionalidades completadas
- ✅ Tests al 80%+ coverage
- ✅ Documentación básica
- ✅ Sin cambios de API esperados

**Release Candidate (RC):**
- ✅ Todos los tests pasados
- ✅ Documentación completa
- ✅ API estabilizada
- ✅ Performance aceptable
- ✅ Revisión de seguridad

**Stable Release:**
- ✅ Criterios de RC cumplidos
- ✅ Aprobación de QA
- ✅ Release notes redactadas
- ✅ Anunciado públicamente

---

## Branches y Versiones

### Naming Convention

```
main                    → latest stable (v1.0.0)
develop                 → next minor version (v1.1.0-dev)
release/v1.1.0          → release staging
hotfix/v1.0.1           → urgent fixes
feature/*               → desarrollo
bugfix/*                → correcciones
```

### Branch Flow

```
hotfix/v1.0.1
    │
    └──→ main ──tag: v1.0.1──┐
    │                        │
    └──→ develop ────────────┘

feature/auth
    │
    └──→ develop ──→ release/v1.1.0 ──→ main ──tag: v1.1.0

develop ──→ release/v1.1.0-rc.1 ──→ main ──tag: v1.1.0-rc.1
```

---

## Tags en Git

### Creación de Tags

**Anotated Tags (Recomendado):**
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

**Lightweight Tags:**
```bash
git tag v1.0.0
git push origin v1.0.0
```

### Formato del Mensaje

```
v1.0.0: Release principal

Cambios principales:
- Nueva integración TMDB
- Persistencia en BD
- Autenticación JWT

Breaking Changes:
- API endpoint cambió de /api/movie a /api/movies

Actualizaciones:
- FastAPI 0.95.0
- SQLAlchemy 2.0.0
```

---

## Release Notes Template

```markdown
# Release v1.0.0

**Release Date:** 2024-03-18  
**Status:** Production Ready

## 🎉 Highlights

- Integración completa con TMDB API
- Sincronización automática de películas
- Autenticación JWT y rate limiting

## ✨ New Features

### TMDB Integration
- `feat(tmdb)`: Búsqueda de películas
- `feat(api)`: Detalles de película
- `feat(api)`: Listados (popular, upcoming, etc)

### Database
- `feat(db)`: Esquema normalizado
- `feat(service)`: Sincronización API-BD

### Security
- `feat(auth)`: JWT authentication
- `feat(api)`: Rate limiting por token

## 🐛 Bug Fixes

- `fix(search)`: Validación de query mejorada
- `fix(api)`: Manejo de errores 404

## ⚡ Performance

- `perf(db)`: Índices en tablas principales
- `perf(cache)`: Caché de respuestas TMDB

## 📚 Documentation

- `docs`: API documentation completa
- `docs`: Guía de contribución

## 🔄 Dependency Updates

- FastAPI 0.95.0
- SQLAlchemy 2.0.0
- Pytest 7.2.0

## ⚠️ Breaking Changes

**NONE**

## 🚀 Migration Guide

No cambios de API. Update normal.

## 🙏 Contributors

- Alice Developer (@alice)
- Bob Programmer (@bob)

---

**[Descargar v1.0.0](https://github.com/project/releases/v1.0.0)**  
**[Comparar con v0.9.0](https://github.com/project/compare/v0.9.0...v1.0.0)**
```

---

## Versionado de Dependencias

### Policy

| Tipo | Versionado | Ejemplo |
|------|-----------|---------|
| **Patch** | Auto-update | `1.2.x` |
| **Minor** | Manual review | `~1.2.0` (≥1.2.0, <1.3.0) |
| **Major** | Deliberate | `^1.0.0` (≥1.0.0, <2.0.0) |

### Archivo de Versión

**package.json / pyproject.toml:**
```json
{
  "name": "tmdb-movie-system",
  "version": "1.0.0",
  "description": "TMDB Movie Management System"
}
```

---

## Estrategia de Soporte

### Versiones Soportadas

| Versión | Soporte | Fin de Vida |
|---------|--------|-----------|
| v1.x.x | LTS | 2025-12-31 |
| v0.x.x | EOL | 2024-06-30 |

### LongTerm Support (LTS)

- Parches de seguridad críticos
- Correcciones de bugs importantes
- 12 meses de soporte
- No nuevas features

---

## Ejemplo de Flujo Release

```bash
# 1. Crear rama de release
git checkout -b release/v1.0.0 develop

# 2. Actualizar versión
echo '1.0.0' > VERSION
git commit -m "chore(release): bump to v1.0.0"

# 3. Merge a main
git checkout main
git merge --no-ff release/v1.0.0

# 4. Tag
git tag -a v1.0.0 -m "Release v1.0.0 - Initial stable"

# 5. Merge back a develop
git checkout develop
git merge --no-ff release/v1.0.0

# 6. Push
git push origin main develop --tags
```

