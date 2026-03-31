import { useState, useRef, useEffect } from 'react';

export default function OptimizedImage({ src, alt, className, ...props }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px', // Cargar 50px antes de que sea visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={`relative ${className || ''}`}>
      {/* Skeleton/Placeholder mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" />
      )}

      {/* Imagen */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
}
