# 🎬 TMDB Movie Management System

Aplicación web SPA (Single Page Application) para explorar películas usando The Movie Database (TMDB) API.

## 🚀 Características

- ✨ **Búsqueda de películas**: Busca tus películas favoritas
- 🏆 **Listados populares**: Películas populares, próximas, mejor valoradas
- 📄 **Detalles completos**: Información detallada de cada película
- ❤️ **Sistema de favoritos**: Guarda tus películas favoritas
- 📱 **Diseño responsivo**: Funciona en móvil, tablet y desktop
- ⚡ **Optimizado**: Lazy loading, imágenes optimizadas, caching
- 🌙 **Soporte claro/oscuro**: Temas para mejor visibilidad

## 🛠️ Tecnologías

- **React 19** - Framework UI
- **Vite** - Build tool
- **Tailwind CSS v4** - Estilos
- **shadcn/ui** - Componentes UI
- **Zustand** - State management
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Vitest** - Testing framework

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/gcentegit/codeia-2025-sesion-1.git
cd codeia-2025-sesion-1
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
VITE_TMDB_LANGUAGE=es-ES
```

> **Nota**: Necesitas una API key de TMDB. Obtenla gratis en [https://www.themoviedb.org/](https://www.themoviedb.org/)

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🏗️ Build

```bash
npm run build
```

El build se generará en la carpeta `dist/`.

## 📱 Preview del Build

```bash
npm run preview
```

## 🧪 Tests

```bash
npm run test        # Ejecutar tests
npm run test:ui     # Tests con interfaz gráfica
```

## 🎯 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia servidor de desarrollo |
| `npm run build` | Crea build de producción |
| `npm run preview` | Previsualiza build de producción |
| `npm run test` | Ejecuta tests |
| `npm run test:ui` | Tests con UI |
| `npm run lint` | Ejecuta ESLint |
| `npm run format` | Formatea código con Prettier |

## 📁 Estructura del Proyecto

```
codeia-2025-sesion-1/
├── src/
│   ├── components/       # Componentes UI
│   │   ├── ui/           # Componentes shadcn/ui
│   │   ├── layout/       # Navbar, Footer
│   │   ├── MovieCard.jsx
│   │   ├── MovieGrid.jsx
│   │   └── ...
│   ├── pages/            # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── Search.jsx
│   │   └── Favorites.jsx
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API services
│   │   ├── tmdbClient.js
│   │   └── movieService.js
│   ├── store/          # Zustand store
│   │   ├── useStore.js
│   │   └── selectors.js
│   ├── lib/            # Utilidades
│   └── tests/          # Tests setup
├── public/             # Archivos estáticos
└── DOCS/              # Documentación
```

## 🎨 Características Técnicas

### State Management
- **Zustand** para estado global
- **Persistencia** automática de favoritos en localStorage
- **Selectores optimizados** para evitar re-renders

### Performance
- **Lazy loading** de páginas con React.lazy()
- **Imagenes optimizadas** con Intersection Observer
- **Caché en memoria** de respuestas TMDB (1 hora)
- **Code splitting** automático

### Testing
- **Vitest** como framework de testing
- **Testing Library** para componentes UI
- **Tests de componentes** principales

### API Integration
- **Rate limiting** automático (40 req/10s)
- **Manejo de errores** robusto
- **Retry mechanism** para fallos
- **Logging** de requests

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Arrastra la carpeta dist/ a Netlify
```

### GitHub Pages
1. Crear archivo `vercel.json` o configurar en Vercel
2. Conectar repositorio a Vercel
3. Deploy automático en cada push a main

## 📄 Licencia

MIT

## ℹ️ TMDB

Este producto utiliza la API de TMDB pero no está avalado ni certificado por TMDB.

## 🙏 Agradecimientos

- [The Movie Database](https://www.themoviedb.org/) por la API
- [Vite](https://vitejs.dev/) por el build tool
- [React](https://react.dev/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por el sistema de diseño
- [shadcn/ui](https://ui.shadcn.com/) por los componentes

## 📞 Soporte

Para reportar issues o sugerencias, por favor abre un issue en el repositorio.

---

**Version**: 1.0.0
**Última actualización**: Marzo 2026
