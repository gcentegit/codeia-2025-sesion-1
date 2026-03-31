import { Button } from '@/components/ui/button';
import { useGenres } from '@/store/selectors';

export default function GenreFilter({ selected, onSelect }) {
  const genres = useGenres();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selected === null ? 'default' : 'outline'}
        onClick={() => onSelect(null)}
        size="sm"
      >
        Todas
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre.id}
          variant={selected === genre.id ? 'default' : 'outline'}
          onClick={() => onSelect(genre.id)}
          size="sm"
        >
          {genre.name}
        </Button>
      ))}
    </div>
  );
}
