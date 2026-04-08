import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import MovieHero from '@/components/MovieHero';
import MovieGrid from '@/components/MovieGrid';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MovieDetail() {
  const { id } = useParams();
  const movie = useStore((state) => state.currentMovie);
  const fetchMovieDetails = useStore((state) => state.fetchMovieDetails);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      try {
        await fetchMovieDetails(id);
      } finally {
        setLoading(false);
      }
    };
    loadMovie();
  }, [id, fetchMovieDetails]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
          <p className="mt-4 text-muted-foreground">Cargando detalles de la película...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Película no encontrada</h1>
          <p className="text-muted-foreground">
            Lo sentimos, no pudimos encontrar los detalles de esta película.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MovieHero movie={movie} />

      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="about">
          <TabsList className="mb-8">
            <TabsTrigger value="about">Sobre la película</TabsTrigger>
            <TabsTrigger value="cast">Reparto</TabsTrigger>
            <TabsTrigger value="similar">Similares</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <div>
              <h2 className="mb-4 text-2xl font-bold">Sinopsis</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {movie.overview || 'No hay sinopsis disponible.'}
              </p>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Estado</p>
                <p className="font-medium">{movie.status || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Fecha de estreno</p>
                <p className="font-medium">{movie.release_date || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Idioma original</p>
                <p className="font-medium">
                  {movie.original_language?.toUpperCase() || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Presupuesto</p>
                <p className="font-medium">
                  ${movie.budget?.toLocaleString() || 'N/A'}
                </p>
              </div>
            </div>

            {movie.revenue && movie.revenue > 0 && (
              <>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="font-medium">
                    ${movie.revenue.toLocaleString()}
                  </p>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="cast">
            <h2 className="mb-6 text-2xl font-bold">Reparto Principal</h2>
            {movie.credits?.cast && movie.credits.cast.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {movie.credits.cast.slice(0, 12).map((person) => (
                  <div key={person.id} className="text-center">
                    <img
                      src={
                        person.profile_path
                          ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                          : '/images/placeholder-avatar.svg'
                      }
                      alt={person.name}
                      className="mx-auto mb-2 aspect-square rounded-full object-cover"
                      loading="lazy"
                    />
                    <p className="font-medium">{person.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {person.character}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No hay información del reparto disponible.</p>
            )}
          </TabsContent>

          <TabsContent value="similar">
            <h2 className="mb-6 text-2xl font-bold">Películas Similares</h2>
            <MovieGrid
              movies={movie.similar?.results || []}
              showFavorite={true}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
