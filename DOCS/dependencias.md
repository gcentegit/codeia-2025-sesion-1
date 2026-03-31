# Política de Dependencias y Version Bump

## Gestión de Dependencias

### Estructura de Dependencias

```
dependencies/
├── production          (Requeridas para runtime)
├── development         (Solo para desarrollo)
├── testing             (Solo para testing)
└── optional            (Características opcionales)
```

---

## Categorías de Dependencias

### 1. Production (Requeridas)

Dependencias esenciales para la aplicación en producción.

**Backend Stack:**
```txt
fastapi==0.95.0              # Framework web
uvicorn==0.21.0             # ASGI server
sqlalchemy==2.0.0           # ORM
```

**TMDB Integration:**
```txt
requests==2.28.2            # HTTP client
python-dotenv==1.0.0        # Variables de entorno
```

**Database:**
```txt
psycopg2-binary==2.9.6      # PostgreSQL driver
alembic==1.10.0             # DB migrations
```

**Security:**
```txt
pydantic==1.10.0            # Data validation
python-jose==3.3.0          # JWT
passlib==1.7.4              # Password hashing
```

### 2. Development

Herramientas y utilidades para desarrollo.

```txt
black==23.1.0               # Code formatting
flake8==6.0.0               # Linting
isort==5.12.0               # Import sorting
mypy==1.0.0                 # Type checking
```

### 3. Testing

Frameworks y herramientas de pruebas.

```txt
pytest==7.2.0               # Test framework
pytest-cov==4.0.0           # Coverage
pytest-asyncio==0.20.0      # Async support
httpx==0.23.0               # HTTP client testing
```

### 4. Optional

Dependencias opcionales para características adicionales.

```txt
redis==4.5.0                # Caching (opcional)
pillow==9.5.0               # Image processing (opcional)
```

---

## Política de Version Bump

### Semver Versioning

```
Current: 1.2.3
         ↓   ↓ ↓
      Major Minor Patch
```

### Decisión de Bump

| Escenario | Acción | Ejemplo |
|-----------|--------|---------|
| **Security fix** | Patch | 1.2.3 → 1.2.4 |
| **Bug fix** | Patch | 1.2.3 → 1.2.4 |
| **New feature** | Minor | 1.2.3 → 1.3.0 |
| **Breaking change** | Major | 1.2.3 → 2.0.0 |
| **Deprecation** | Minor | 1.2.3 → 1.3.0-beta |

---

## Estrategia de Actualización

### Conservative (Recomendado)

```
fastapi==0.95.0      (fijo)           ✓ Estable
requests~=2.28.0     (minor updates)  → 2.28.x
python-jose^3.3.0    (compatible)     → 3.x (no 4.x)
```

### Aggressive

```
fastapi>=0.95.0      (cualquier)
requests>=2.28.0     (cualquier)
python-jose>=3.3.0   (cualquier)
```

**No recomendado en producción.**

---

## Procesos de Update

### Patch Update (1.2.3 → 1.2.4)

**Automatizable, sin breaking changes esperados:**

```bash
# 1. Update dependencias
pip install --upgrade --patch <package>

# 2. Ejecutar tests
pytest

# 3. Deploy rápido
git commit -m "chore(deps): bump patch versions"
git tag v1.2.4
git push --tags
```

### Minor Update (1.2.0 → 1.3.0)

**Requiere testing, puede tener deprecations:**

```bash
# 1. Crear rama
git checkout -b chore/update-dependencies

# 2. Update selectivas
pip install --upgrade --minor <package1> <package2>

# 3. Testing exhaustivo
pytest --cov
pytest -v

# 4. Review
git diff requirements.txt

# 5. Commit
git commit -m "chore(deps): update minor versions

- fastapi 0.95.0 → 0.96.0
- sqlalchemy 2.0.0 → 2.1.0"

# 6. Pull request y review
```

### Major Update (1.0.0 → 2.0.0)

**Requiere análisis completo y posibles cambios de código:**

```bash
# 1. Análisis previo
# - Revisar changelog del package
# - Identificar breaking changes
# - Evaluar impacto en el código

# 2. Crear rama dedicada
git checkout -b chore/major-update-<package>

# 3. Update selectiva
pip install <package>==2.0.0

# 4. Revisar errores
pytest -v --tb=short

# 5. Actualizar código si es necesario
# (editar archivos affected)

# 6. Tests exhaustivos
pytest --cov -v

# 7. Documentar cambios
# - Actualizar CHANGELOG
# - Notas de migración

# 8. Commit con detalle
git commit -m "feat(deps): upgrade to fastapi 1.0 (breaking)

BREAKING CHANGE: FastAPI 1.0 requiere Python 3.9+

Changes:
- Updated import statements for new API
- Migrated deprecated middleware
- Updated type hints for compatibility

Migration guide:
See MIGRATION.md"

# 9. PR, review, merge a rama develop
```

---

## Archivo de Dependencias

### requirements.txt (Python)

```txt
# Production dependencies
fastapi==0.95.0
uvicorn==0.21.0
sqlalchemy==2.0.0
requests==2.28.2
python-dotenv==1.0.0
psycopg2-binary==2.9.6
alembic==1.10.0
pydantic==1.10.0
python-jose==3.3.0
passlib==1.7.4

# Development
-e .[dev]
```

### requirements-dev.txt

```txt
-r requirements.txt

# Development tools
black==23.1.0
flake8==6.0.0
isort==5.12.0
mypy==1.0.0
pylint==2.17.0

# Testing
pytest==7.2.0
pytest-cov==4.0.0
pytest-asyncio==0.20.0
httpx==0.23.0
factory-boy==3.2.1

# Documentation
sphinx==6.1.0
sphinx-rtd-theme==1.2.0
```

### pyproject.toml

```toml
[project]
name = "tmdb-movie-system"
version = "1.0.0"
dependencies = [
    "fastapi>=0.95.0,<1.0.0",
    "uvicorn>=0.21.0",
    "sqlalchemy>=2.0.0,<3.0.0",
    "requests>=2.28.0",
    "python-dotenv>=1.0.0",
]

[project.optional-dependencies]
dev = [
    "black>=23.1.0",
    "flake8>=6.0.0",
    "mypy>=1.0.0",
]
test = [
    "pytest>=7.2.0",
    "pytest-cov>=4.0.0",
]
```

---

## Auditoría de Seguridad

### Verificar Vulnerabilidades

```bash
# Usando Safety
pip install safety
safety check

# Usando pip-audit
pip install pip-audit
pip-audit

# Usando Snyk
snyk test
```

### Vulnerabilidades Críticas

- 🔴 **Critical**: Update inmediato
- 🟠 **High**: Update en próxima release
- 🟡 **Medium**: Update planificada
- 🟢 **Low**: Update cuando sea viable

---

## CI/CD Integration

### GitHub Actions Workflow

```yaml
name: Dependencies Check

on:
  schedule:
    - cron: '0 0 * * 1'  # Weekly
  workflow_dispatch:

jobs:
  check-deps:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'
      
      - name: Install dependencies
        run: pip install -r requirements.txt -r requirements-dev.txt
      
      - name: Security audit
        run: |
          pip install safety
          safety check
      
      - name: Run tests
        run: pytest --cov
      
      - name: Create PR if updates available
        if: failure()
        run: |
          # Script para crear PR con actualizaciones
          echo "Updates needed"
```

---

## Template de Release Notes (Deps)

```markdown
## Dependencies Updated

### Production
- ✨ fastapi 0.95.0 → 0.96.0 (perf improvements)
- 🐛 sqlalchemy 2.0.0 → 2.0.1 (bug fixes)
- ⬆️ requests 2.28.2 → 2.29.0

### Development
- 🔨 black 23.1.0 → 23.2.0
- 🔍 mypy 1.0.0 → 1.0.1

No breaking changes.
```

