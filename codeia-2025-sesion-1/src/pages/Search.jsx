import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from '@/store/useStore';
import MovieGrid from '@/components/MovieGrid';
import Pagination from '@/components/Pagination';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useStore((state) => state.searchResults);
  const loading = useStore((state) => state.loading.search);
  const searchMovies = useStore((state) => state.searchMovies);
  const clearSearchResults = useStore((state) => state.clearSearchResults);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (query.trim()) {
      const search = async () => {
        const data = await searchMovies(query, page);
        setTotalPages(data?.total_pages || 1);
      };
      search();
    } else {
      clearSearchResults();
    }
  }, [query, page, searchMovies, clearSearchResults]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">
          {query ? `Resultados para "${query}"` : 'Buscar'}
        </h1>
        <p className="text-muted-foreground">
          {results.length > 0 && `${results.length} resultados encontrados`}
        </p>
      </div>

      <MovieGrid movies={results} loading={loading} />

      {totalPages > 1 && query && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
