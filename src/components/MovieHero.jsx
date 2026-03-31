import { IMAGE_SIZES, TMDB_CONFIG } from '@/lib/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function MovieHero({ movie }) {
  const backdropUrl = movie.backdrop_path
    ? `${TMDB_CONFIG.imageBaseUrl}/${IMAGE_SIZES.backdrop}${movie.backdrop_path}`
    : null;

  const rating = movie.vote_average?.toFixed(1) || 'N/A';
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'N/A';
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'N/A';

  return (
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
      {/* Backdrop */}
      {backdropUrl && (
        <div className="absolute inset-0">
          <img
            src={backdropUrl}
            alt={movie.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container relative z-10 flex h-full items-end pb-12">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="text-lg text-muted-foreground italic">
              {movie.tagline}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              ⭐ {rating}
            </Badge>

            <Badge variant="outline" className="flex items-center gap-1">
              📅 {year}
            </Badge>

            {movie.runtime && (
              <Badge variant="outline" className="flex items-center gap-1">
                ⏱️ {runtime}
              </Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {movie.genres?.map((genre) => (
              <Badge key={genre.id} variant="default">
                {genre.name}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4">
            {movie.videos?.results?.length > 0 && (
              <Button size="lg" className="gap-2">
                ▶️ Ver Trailer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
