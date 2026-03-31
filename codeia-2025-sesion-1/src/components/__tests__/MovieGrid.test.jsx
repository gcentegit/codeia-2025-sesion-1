import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MovieGrid from '@/components/MovieGrid';

describe('MovieGrid', () => {
  const mockMovies = [
    {
      id: 1,
      title: 'Movie 1',
      poster_path: '/poster1.jpg',
      release_date: '2024-01-01',
      vote_average: 7.5,
    },
    {
      id: 2,
      title: 'Movie 2',
      poster_path: '/poster2.jpg',
      release_date: '2024-02-01',
      vote_average: 8.0,
    },
  ];

  it('renders loading skeletons when loading is true', () => {
    const { container } = render(
      <MovieGrid movies={[]} loading={true} />
    );

    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBe(12);
  });

  it('renders movies when not loading', () => {
    render(
      <MovieGrid movies={mockMovies} loading={false} />
    );

    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('Movie 2')).toBeInTheDocument();
  });

  it('renders empty state when no movies', () => {
    render(
      <MovieGrid movies={[]} loading={false} />
    );

    expect(screen.getByText(/No se encontraron películas/i)).toBeInTheDocument();
  });

  it('renders correct number of movies', () => {
    const { container } = render(
      <MovieGrid movies={mockMovies} loading={false} />
    );

    const movieCards = container.querySelectorAll('a');
    expect(movieCards.length).toBe(2);
  });

  it('passes showFavorite prop to MovieCard', () => {
    const { container } = render(
      <MovieGrid movies={mockMovies} loading={false} showFavorite={true} />
    );

    const favoriteButtons = container.querySelectorAll('button');
    expect(favoriteButtons.length).toBe(2);
  });
});
