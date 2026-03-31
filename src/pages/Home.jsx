import { useEffect, useState, useMemo, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import MovieFilter from '@/components/MovieFilter';

export default function Home() {
  const movies = useStore((state) => state.movies.popular);
  const loading = useStore((state) => state.loading.popular);
  const fetchPopularMovies = useStore((state) => state.fetchPopularMovies);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Estado de los filtros
  const [filters, setFilters] = useState({
    search: '',
    year: '',
    minRating: '0'
  });

  // Handler para actualizar filtros (memorizado para evitar re-renders innecesarios)
  const handleFilterChange = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchPopularMovies(page);
      setTotalPages(data?.total_pages || 1);
    };
    loadMovies();
  }, [page, fetchPopularMovies]);

  // Filtrar películas localmente según los criterios
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // Filtro por nombre (búsqueda insensible a mayúsculas y acentos)
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Quitar acentos
        const titleLower = (movie.title || '').toLowerCase()
          .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Quitar acentos
        if (!titleLower.includes(searchLower)) {
          return false;
        }
      }

      // Filtro por año
      if (filters.year) {
        const movieYear = movie.release_date
          ? new Date(movie.release_date).getFullYear()
          : null;
        if (movieYear !== parseInt(filters.year)) {
          return false;
        }
      }

      // Filtro por ranking mínimo
      if (filters.minRating !== '0') {
        const rating = movie.vote_average || 0;
        if (rating < parseFloat(filters.minRating)) {
          return false;
        }
      }

      return true;
    });
  }, [movies, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con título y filtros */}
      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Películas Populares</h1>
          <p className="text-muted-foreground">
            Descubre las películas más populares del momento
            {filteredMovies.length !== movies.length && (
              <span className="ml-2 font-medium text-foreground">
                ({filteredMovies.length} de {movies.length} mostradas)
              </span>
            )}
          </p>
        </div>

        <MovieFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <MovieGrid movies={filteredMovies} loading={loading} />

      {filteredMovies.length === 0 && !loading && movies.length > 0 && (
        <div className="py-12 text-center">
          <p className="text-xl text-muted-foreground">
            No se encontraron películas con los filtros aplicados
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Intenta ajustar los criterios de búsqueda
          </p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
