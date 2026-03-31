import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MovieCard from '@/components/MovieCard';

// Mock del store
vi.mock('@/store/useStore', () => ({
  useStore: () => ({
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(() => false),
  }),
}));

describe('MovieCard', () => {
  const mockMovie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    release_date: '2024-01-01',
    vote_average: 8.5,
  };

  it('renders movie title', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
  });

  it('renders release year', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    expect(screen.getByText('2024')).toBeInTheDocument();
  });

  it('renders rating', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('has correct link to movie detail', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/movie/1');
  });

  it('shows favorite button when showFavorite is true', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} showFavorite={true} />
      </BrowserRouter>
    );
    const favButton = screen.getByRole('button');
    expect(favButton).toBeInTheDocument();
  });

  it('does not show favorite button when showFavorite is false', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} showFavorite={false} />
      </BrowserRouter>
    );
    const favButton = screen.queryByRole('button');
    expect(favButton).not.toBeInTheDocument();
  });
});
