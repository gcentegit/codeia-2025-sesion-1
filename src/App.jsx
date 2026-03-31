import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';

// Lazy loading de páginas
const Home = lazy(() => import('@/pages/Home'));
const MovieDetail = lazy(() => import('@/pages/MovieDetail'));
const Search = lazy(() => import('@/pages/Search'));
const Favorites = lazy(() => import('@/pages/Favorites'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Componente de carga
function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent">
          <span className="sr-only">Cargando...</span>
        </div>
        <p className="mt-4 text-muted-foreground">Cargando...</p>
      </div>
    </div>
  );
}

function App() {
  return <AppRoutes />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="movie/:id"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <MovieDetail />
            </Suspense>
          }
        />
        <Route
          path="search"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Search />
            </Suspense>
          }
        />
        <Route
          path="favorites"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <Favorites />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
