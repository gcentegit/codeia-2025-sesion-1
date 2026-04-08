import { useEffect, useState, useMemo, useCallback } from 'react';
import { useStore } from '@/store/useStore';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';
import MovieFilter from '@/components/MovieFilter';
import { movieService } from '@/services/movieService';

export default function Home() {
  const movies = useStore((state) => state.movies.popular);
  const popularLoading = useStore((state) => state.loading.popular);
  const fetchPopularMovies = useStore((state) => state.fetchPopularMovies);
  const clearSearchResults = useStore((state) => state.clearSearchResults);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Estado de los filtros
  const [filters, setFilters] = useState({
    search: '',
    year: '',
    minRating: '0'
  });

  // Estado para resultados de búsqueda simple
  const [simpleSearchResults, setSimpleSearchResults] = useState([]);
  const [simpleSearchLoading, setSimpleSearchLoading] = useState(false);
  const [simpleSearchTotalPages, setSimpleSearchTotalPages] = useState(1);

  // Estado para resultados de búsqueda con filtros
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);
  const [isSearchingWithFilters, setIsSearchingWithFilters] = useState(false);
  const [totalFilteredPages, setTotalFilteredPages] = useState(1);

  // Handler para actualizar filtros (memorizado para evitar re-renders innecesarios)
  const handleFilterChange = useCallback((newFilters) => {
    // Si se limpia la búsqueda, limpiar resultados de búsqueda y resetear página
    if (newFilters.search === '' && filters.search !== '') {
      clearSearchResults();
      setSimpleSearchResults([]);
      setFilteredSearchResults([]);
      setPage(1);
    }
    // Si cambia la búsqueda, resetear página
    if (newFilters.search !== filters.search) {
      setPage(1);
    }
    setFilters(newFilters);
  }, [filters.search, clearSearchResults]);

  // Determinar si estamos en modo búsqueda o películas populares
  const isSearching = filters.search.trim() !== '';
  const hasAdditionalFilters = filters.year !== '' || filters.minRating !== '0';

  // Función para buscar en múltiples páginas hasta encontrar suficientes resultados
  const searchWithFilters = useCallback(async (query, currentFilters, currentPage) => {
    setIsSearchingWithFilters(true);
    const allResults = [];
    let searchPage = 1;
    let hasMorePages = true;
    const maxPages = 5; // Limitar a 5 páginas para evitar demasiadas peticiones

    while (hasMorePages && searchPage <= maxPages) {
      try {
        const data = await movieService.searchMovies(query, searchPage);

        // Filtrar resultados por año y rating
        const filteredPageResults = data.results.filter(movie => {
          // Filtro por año
          if (currentFilters.year) {
            const movieYear = movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : null;
            if (movieYear !== parseInt(currentFilters.year)) {
              return false;
            }
          }

          // Filtro por ranking mínimo
          if (currentFilters.minRating !== '0') {
            const rating = movie.vote_average || 0;
            if (rating < parseFloat(currentFilters.minRating)) {
              return false;
            }
          }

          return true;
        });

        allResults.push(...filteredPageResults);

        // Verificar si hay más páginas con resultados que podrían cumplir los filtros
        hasMorePages = searchPage < data.total_pages && allResults.length < 100; // Limitar a 100 resultados
        searchPage++;

      } catch (error) {
        console.error('Error searching with filters:', error);
        hasMorePages = false;
      }
    }

    setFilteredSearchResults(allResults);
    setTotalFilteredPages(Math.ceil(allResults.length / 20) || 1);
    setIsSearchingWithFilters(false);
  }, []);

  // Búsqueda simple (solo por nombre)
  const performSimpleSearch = useCallback(async (query, currentPage) => {
    setSimpleSearchLoading(true);
    try {
      const data = await movieService.searchMovies(query, currentPage);
      setSimpleSearchResults(data.results || []);
      setSimpleSearchTotalPages(data?.total_pages || 1);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSimpleSearchResults([]);
      setSimpleSearchTotalPages(1);
    } finally {
      setSimpleSearchLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      if (isSearching) {
        if (hasAdditionalFilters) {
          // Buscar con filtros adicionales (búsqueda múltiple)
          await searchWithFilters(filters.search, filters, page);
        } else {
          // Búsqueda simple sin filtros adicionales
          await performSimpleSearch(filters.search, page);
        }
      } else {
        // Cargar películas populares
        const data = await fetchPopularMovies(page);
        setTotalPages(data?.total_pages || 1);
      }
    };
    loadMovies();
  }, [page, filters.search, filters.year, filters.minRating, isSearching, hasAdditionalFilters, fetchPopularMovies, searchWithFilters, performSimpleSearch]);

  // Elegir películas base según el modo
  const baseMovies = isSearching
    ? (hasAdditionalFilters ? filteredSearchResults : simpleSearchResults)
    : movies;
  const loading = isSearching
    ? (hasAdditionalFilters ? isSearchingWithFilters : simpleSearchLoading)
    : popularLoading;
  const displayTotalPages = isSearching
    ? (hasAdditionalFilters ? totalFilteredPages : simpleSearchTotalPages)
    : totalPages;

  // Filtrar películas localmente según los criterios (solo cuando no hay filtros adicionales en búsqueda)
  const filteredMovies = useMemo(() => {
    if (isSearching && hasAdditionalFilters) {
      // Cuando ya aplicamos filtros en la búsqueda, solo paginar
      const startIndex = (page - 1) * 20;
      const endIndex = startIndex + 20;
      return filteredSearchResults.slice(startIndex, endIndex);
    }

    return baseMovies.filter(movie => {
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
  }, [baseMovies, filters, filteredSearchResults, page, isSearching, hasAdditionalFilters]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con título y filtros */}
      <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto] lg:items-start">
        <div>
          <h1 className="mb-2 text-4xl font-bold">
            {isSearching ? `Resultados para "${filters.search}"` : 'Películas Populares'}
          </h1>
          <p className="text-muted-foreground">
            {isSearching
              ? hasAdditionalFilters
                ? `Resultados filtrados (${filteredSearchResults.length} películas encontradas)`
                : 'Resultados de búsqueda en TMDB'
              : 'Descubre las películas más populares del momento'
            }
            {filteredMovies.length !== baseMovies.length && !hasAdditionalFilters && !isSearching && (
              <span className="ml-2 font-medium text-foreground">
                ({filteredMovies.length} de {baseMovies.length} mostradas)
              </span>
            )}
          </p>
        </div>

        <MovieFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <MovieGrid movies={filteredMovies} loading={loading} />

      {filteredMovies.length === 0 && !loading && (
        <div className="py-12 text-center">
          <p className="text-xl text-muted-foreground">
            No se encontraron películas con los filtros aplicados
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Intenta ajustar los criterios de búsqueda
          </p>
        </div>
      )}

      {displayTotalPages > 1 && (
        <Pagination
          page={page}
          totalPages={displayTotalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
