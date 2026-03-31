import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

const FAVORITES_KEY = 'tmdb_favorites';

/**
 * Hook para persistir favoritos en localStorage
 * Carga favoritos al inicio y guarda cambios automáticamente
 */
export function usePersistStore() {
  useEffect(() => {
    // Cargar favoritos desde localStorage al inicio
    const loadFavorites = () => {
      try {
        const savedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites);
          console.log('Loaded favorites from localStorage:', favorites.length);
          // Actualizar el store si hay favoritos guardados
          useStore.getState().setFavorites(favorites);
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    };

    loadFavorites();

    // Suscribirse a cambios en favoritos y guardar en localStorage
    const unsubscribe = useStore.subscribe(
      (state) => state.favorites,
      (favorites) => {
        try {
          localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
          console.log('Saved favorites to localStorage:', favorites.length);
        } catch (error) {
          console.error('Error saving favorites to localStorage:', error);
        }
      }
    );

    // Cleanup al desmontar
    return unsubscribe;
  }, []);
}

/**
 * Hook para limpiar favoritos del localStorage
 */
export function useClearFavoritesStorage() {
  const clearFavorites = () => {
    try {
      localStorage.removeItem(FAVORITES_KEY);
      console.log('Cleared favorites from localStorage');
    } catch (error) {
      console.error('Error clearing favorites from localStorage:', error);
    }
  };

  return { clearFavorites };
}

export default usePersistStore;
