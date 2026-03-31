# ⚠️ Configuración Requerida - TMDB API Key

La aplicación requiere una API key de The Movie Database (TMDB) para funcionar.

## 🎬 ¿Cómo obtener tu API Key de TMDB?

1. Ve a [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Regístrate gratuitamente
3. Ve a Configuración > API
4. Crea una nueva API key
5. Copia tu API key

## ⚙️ Configuración Local

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
VITE_TMDB_API_KEY=tu_api_key_aqui
```

## ✅ Verificar

Una vez configurado, reinicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación debería cargar las películas populares correctamente.

## 📝 Nota

- El archivo `.env.local` **NO** se debe commitear a git (está en .gitignore)
- Esta API key es gratuita y no tiene límites para desarrollo personal
- Sin esta API key, la aplicación mostrará un error 401 (Unauthorized)
