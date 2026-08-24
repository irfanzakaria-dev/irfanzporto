import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LazyImageProps } from '../../types/components';

/**
 * LazyImage component with IntersectionObserver for performance
 * Loads images only when within 200px of the viewport
 * Maintains dimensions to prevent Cumulative Layout Shift (CLS)
 * Requirements: 4.1, 4.2, 4.3, 4.5, 4.7, 4.8
 */
function LazyImage({
  src,
  alt,
  placeholder,
  threshold = 200,
  className = '',
  onLoad,
  onError,
}: LazyImageProps): React.ReactElement {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Setup IntersectionObserver
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${threshold}px` }
    );

    observer.observe(element);
    return (): void => observer.disconnect();
  }, [threshold]);

  // Start 10s timeout once image begins loading
  useEffect((): (() => void) | undefined => {
    if (!isInView || isLoaded || isError) return;

    timeoutRef.current = setTimeout(() => {
      if (!isLoaded) {
        setIsError(true);
        onError?.();
      }
    }, 10_000);

    return (): void => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isInView, isLoaded, isError, onError]);

  const handleLoad = useCallback((): void => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback((): void => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsError(true);
    onError?.();
  }, [onError]);


  return (
    <div ref={containerRef} className="relative overflow-hidden w-full h-full">
      {/* Placeholder / Loading state */}
      {!isLoaded && !isError && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-neutral-800"
          aria-label={isInView ? 'Loading image' : 'Image placeholder'}
          role="img"
        >
          {placeholder ? (
            <img src={placeholder} alt="" className="w-full h-full object-cover opacity-40" />
          ) : (
            <div className="flex flex-col items-center gap-2">
              {isInView && (
                <svg
                  className="animate-spin h-8 w-8 text-primary-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}
              {!isInView && (
                <div className="w-8 h-8 rounded-full bg-neutral-700" />
              )}
            </div>
          )}
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-800 text-neutral-400"
          aria-label="Image failed to load"
          role="img"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 mb-2 text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-xs">Image unavailable</span>
        </div>
      )}

      {/* Actual image – loaded only when in view */}
      {isInView && !isError && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={[
            className || 'w-full h-full object-cover',
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
          ].join(' ')}
        />
      )}
    </div>
  );
}

export default LazyImage;
