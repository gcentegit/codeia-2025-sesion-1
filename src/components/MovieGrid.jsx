import MovieCard from './MovieCard';
import { Skeleton } from '@/components/ui/skeleton';

export default function MovieGrid({ movies, loading, showFavorite = true }) {
  // Mostrar skeletons mientras carga
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[2/3] w-full" />
        ))}
      </div>
    );
  }

  // Estado vacío
  if (!movies || movies.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold">No se encontraron películas</p>
          <p className="text-muted-foreground">
            Intenta con otra búsqueda o categoría
          </p>
        </div>
      </div>
    );
  }

  // Mostrar películas
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          showFavorite={showFavorite}
        />
      ))}
    </div>
  );
}
