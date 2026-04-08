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

  // Buscar el primer trailer disponible
  const trailer = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  const handleWatchTrailer = () => {
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
    }
  };

  return (
    <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
      {/* Backdrop */}
      {backdropUrl && (
        <img
          src={backdropUrl}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Content */}
      <div className="container relative z-10 flex h-full items-end pb-12">
        <div className="max-w-2xl rounded-2xl bg-black/50 p-6 shadow-2xl backdrop-blur-sm sm:p-8 md:p-10">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {movie.title}
          </h1>

          {movie.tagline && (
            <p className="mb-6 text-lg italic text-gray-200">
              {movie.tagline}
            </p>
          )}

          <div className="mb-6 flex flex-wrap items-center gap-4">
            <Badge variant="secondary" className="flex items-center gap-1 bg-yellow-500 text-black hover:bg-yellow-400 border-yellow-600">
              ⭐ {rating}
            </Badge>

            <Badge variant="outline" className="flex items-center gap-1 bg-gray-900 text-white hover:bg-gray-800 border-gray-600">
              📅 {year}
            </Badge>

            {movie.runtime && (
              <Badge variant="outline" className="flex items-center gap-1 bg-gray-900 text-white hover:bg-gray-800 border-gray-600">
                ⏱️ {runtime}
              </Badge>
            )}
          </div>

          <div className="mb-8 flex flex-wrap gap-3">
            {movie.genres?.map((genre) => (
              <Badge key={genre.id} className="bg-blue-600 text-white hover:bg-blue-500 border-blue-700">
                {genre.name}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4">
            {trailer && (
              <Button
                size="lg"
                className="gap-2 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleWatchTrailer}
              >
                ▶️ Ver Trailer
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
