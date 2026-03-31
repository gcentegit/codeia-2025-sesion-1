import { useFavorites } from '@/store/selectors';
import MovieGrid from '@/components/MovieGrid';

export default function Favorites() {
  const favorites = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Mis Favoritos</h1>
        <p className="text-muted-foreground">
          {favorites.length > 0
            ? `${favorites.length} películas guardadas`
            : 'Aún no tienes películas favoritas'}
        </p>
      </div>

      <MovieGrid movies={favorites} showFavorite={true} />
    </div>
  );
}
