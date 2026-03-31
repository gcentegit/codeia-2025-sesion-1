export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <span className="text-xl">🎬</span>
              <h3 className="text-lg font-semibold">TMDB Movie App</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Aplicación para explorar películas usando The Movie Database API.
              Descubre películas populares, busca tus favoritos y crea tu lista personal.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 font-semibold">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  TMDB
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Inicio
                </a>
              </li>
              <li>
                <a
                  href="/favorites"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Favoritos
                </a>
              </li>
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h3 className="mb-4 font-semibold">Tecnologías</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>React 19</li>
              <li>Vite</li>
              <li>Tailwind CSS</li>
              <li>shadcn/ui</li>
              <li>Zustand</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mb-2">
            Este producto utiliza la API de TMDB pero no está avalado ni certificado por TMDB.
          </p>
          <p>
            Hecho con ❤️ usando React 19 y Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
