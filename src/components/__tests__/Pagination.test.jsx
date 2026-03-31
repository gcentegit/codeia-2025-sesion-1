import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from '@/components/Pagination';

describe('Pagination', () => {
  const mockOnPageChange = vi.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders current page and total pages', () => {
    render(
      <Pagination
        page={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText(/Página/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        page={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getAllByRole('button')[0];
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        page={10}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getAllByRole('button')[1];
    expect(nextButton).toBeDisabled();
  });

  it('calls onPageChange when clicking next button', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        page={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getAllByRole('button')[1];
    await user.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange when clicking previous button', async () => {
    const user = userEvent.setup();
    render(
      <Pagination
        page={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getAllByRole('button')[0];
    await user.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
});
