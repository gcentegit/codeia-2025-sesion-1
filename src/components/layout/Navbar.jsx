import { Link } from 'react-router-dom';
import { useFavorites } from '@/store/selectors';

export default function Navbar() {
  const favorites = useFavorites();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl">🎬</span>
            <span className="hidden font-bold sm:inline-block">
              TMDB App
            </span>
          </Link>

          {/* Navegación principal */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Inicio
            </Link>
            <Link
              to="/favorites"
              className="flex items-center space-x-1 text-sm font-medium transition-colors hover:text-primary"
            >
              <span>❤️</span>
              <span className="hidden sm:inline">Favoritos</span>
              {favorites.length > 0 && (
                <span className="ml-1 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
