import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IMAGE_SIZES, TMDB_CONFIG } from '@/lib/constants';
import { useStore } from '@/store/useStore';
import OptimizedImage from '@/components/OptimizedImage';

export default function MovieCard({ movie, showFavorite = true }) {
  const { toggleFavorite, isFavorite } = useStore();
  const favorite = isFavorite(movie.id);

  const posterUrl = movie.poster_path
    ? `${TMDB_CONFIG.imageBaseUrl}/${IMAGE_SIZES.poster}${movie.poster_path}`
    : '/placeholder-poster.jpg';

  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : 'N/A';

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    toggleFavorite(movie);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
        <div className="relative aspect-[2/3] overflow-hidden bg-muted">
          <OptimizedImage
            src={posterUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.target.src = '/placeholder-poster.jpg';
            }}
          />

          {showFavorite && (
            <button
              onClick={handleFavoriteClick}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-xl opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
              aria-label={favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              type="button"
            >
              {favorite ? '❤️' : '🤍'}
            </button>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="line-clamp-2 font-semibold leading-tight" title={movie.title}>
            {movie.title}
          </h3>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{year}</p>
            <div className="flex items-center gap-1 text-sm font-medium">
              <span>⭐</span>
              <span>{rating}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
