import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">404</h1>
        <p className="mb-8 text-xl text-muted-foreground">
          Página no encontrada
        </p>
        <Button asChild>
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
