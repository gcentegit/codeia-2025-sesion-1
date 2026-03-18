# Reglas para Consumo de TMDB

## Configuración del entorno
- Usar archivo `.env` con las variables: `API_KEY`, `BASE_URL`, `LANGUAGE`, `IMAGE_BASE_URL`.
- Cargar variables con `dotenv` en Node.js.

## Backend Node.js
- Crear endpoints propios para abstraer TMDB.
- Usar `fetch` o `axios`.
- Endpoints recomendados: `/api/movies`, `/api/series`, `/api/search`, `/api/genres`, `/api/detail/:id`, `/api/recommendations/:id`.

## Frontend React 18 (legacy)
- Instalar Tailwind y shadcn/ui.
- Configurar Tailwind.
- Seleccionar componentes shadcn/ui necesarios.

## Componentes UI
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

## Flujo de datos
- Frontend consume endpoints del backend.
- Backend obtiene datos de TMDB usando variables de entorno.
- Componentes UI muestran los datos.

## Consideraciones
- Manejo de errores y estados de carga.
- Lazy loading para imágenes.
- Tailwind para estilos rápidos.
- shadcn/ui para componentes accesibles.
- Filtros comunes en listados.
- Paginación.
- Skeleton de carga.
- Dropdown modernos.
- Colores claros/oscuro.
