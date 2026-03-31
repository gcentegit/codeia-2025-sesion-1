import { Input } from './ui/input';
import { Label } from './ui/label';
import { Search, Star, Calendar } from 'lucide-react';

export default function MovieFilter({ filters, onFilterChange }) {
  const { search, year, minRating } = filters;

  // Generar años dinámicamente (desde 1950 hasta año actual)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => 1950 + i).reverse();

  // Generar opciones de rating (de 1 a 10)
  const ratings = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border bg-background/95 p-4 shadow-sm">
      {/* Filtro por nombre */}
      <div className="flex-1 min-w-[200px]">
        <Label htmlFor="search" className="mb-2 flex items-center gap-2 text-sm">
          <Search className="h-4 w-4" />
          Nombre
        </Label>
        <Input
          id="search"
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          className="w-full"
        />
      </div>

      {/* Filtro por año */}
      <div className="w-full sm:w-auto">
        <Label htmlFor="year" className="mb-2 flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4" />
          Año
        </Label>
        <select
          id="year"
          value={year}
          onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
          className="flex h-10 w-full sm:w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="">Todos</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro por ranking */}
      <div className="w-full sm:w-auto">
        <Label htmlFor="rating" className="mb-2 flex items-center gap-2 text-sm">
          <Star className="h-4 w-4" />
          Ranking mín.
        </Label>
        <select
          id="rating"
          value={minRating}
          onChange={(e) => onFilterChange({ ...filters, minRating: e.target.value })}
          className="flex h-10 w-full sm:w-[140px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <option value="0">Todos</option>
          {ratings.map((r) => (
            <option key={r} value={r}>
              {r}+ ⭐
            </option>
          ))}
        </select>
      </div>

      {/* Botón limpiar filtros */}
      {(search || year || minRating !== '0') && (
        <div className="w-full sm:w-auto">
          <Label className="mb-2 text-sm invisible">Acción</Label>
          <button
            onClick={() => onFilterChange({ search: '', year: '', minRating: '0' })}
            className="flex h-10 w-full sm:w-auto items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            type="button"
          >
            Limpiar
          </button>
        </div>
      )}
    </div>
  );
}
