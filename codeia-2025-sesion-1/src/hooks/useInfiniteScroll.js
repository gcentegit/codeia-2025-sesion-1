import { useEffect, useState, useCallback } from 'react';

/**
 * Hook para implementar infinite scroll
 * @param {Function} callback - Función a ejecutar cuando se llega al final
 * @param {boolean} hasMore - Si hay más datos para cargar
 * @returns {[boolean, Function]} [isFetching, setIsFetching]
 */
export function useInfiniteScroll(callback, hasMore = true) {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      // Si estamos a 500px o menos del final
      if (scrollHeight - scrollTop - clientHeight < 500 && hasMore && !isFetching) {
        setIsFetching(true);
      }
    };

    // Agregar event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isFetching]);

  useEffect(() => {
    if (!isFetching) return;

    const fetchData = async () => {
      await callback();
      setIsFetching(false);
    };

    fetchData();
  }, [isFetching, callback]);

  return [isFetching, setIsFetching];
}

/**
 * Hook para infinite scroll con parámetros adicionales
 * @param {Function} callback - Función async que recibe page como parámetro
 * @param {boolean} hasMore - Si hay más datos
 * @param {number} initialPage - Página inicial
 * @returns {Object} { page, isFetching, loadMore, reset }
 */
export function useInfiniteScrollWithPage(callback, hasMore = true, initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [isFetching, setIsFetching] = useState(false);

  const loadMore = useCallback(async () => {
    if (isFetching || !hasMore) return;

    setIsFetching(true);
    try {
      await callback(page + 1);
      setPage((prev) => prev + 1);
    } finally {
      setIsFetching(false);
    }
  }, [callback, page, isFetching, hasMore]);

  const reset = useCallback(() => {
    setPage(initialPage);
    setIsFetching(false);
  }, [initialPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;

      if (scrollHeight - scrollTop - clientHeight < 500 && hasMore && !isFetching) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isFetching, loadMore]);

  return { page, isFetching, loadMore, reset };
}

export default useInfiniteScroll;
