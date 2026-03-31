import { Button } from '@/components/ui/button';

export default function Pagination({ page, totalPages, onPageChange }) {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  const handlePrevPage = () => {
    if (canGoPrev) {
      onPageChange(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (canGoNext) {
      onPageChange(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <Button
        onClick={handlePrevPage}
        disabled={!canGoPrev}
        variant="outline"
        size="icon"
        aria-label="Página anterior"
      >
        ←
      </Button>

      <span className="text-sm font-medium">
        Página <span className="font-bold">{page}</span> de <span className="font-bold">{totalPages}</span>
      </span>

      <Button
        onClick={handleNextPage}
        disabled={!canGoNext}
        variant="outline"
        size="icon"
        aria-label="Página siguiente"
      >
        →
      </Button>
    </div>
  );
}
