import { useState, useRef, useEffect } from 'react'

/**
 * Lazy loading image component
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text
 * @param {string} className - CSS classes
 * @param {React.ReactNode} fallback - Fallback content (emoji, placeholder, etc.)
 * @param {Object} props - Other image props
 */
const LazyImage = ({ src, alt, className = '', fallback = null, width, height, style, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef(null)

  useEffect(() => {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.disconnect()
          }
        })
      },
      {
        rootMargin: '50px' // Start loading 50px before image enters viewport
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current)
      }
      observer.disconnect()
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(false)
  }

  const wrapperStyle = {
    aspectRatio: width && height ? `${width}/${height}` : undefined,
    ...style,
  }

  // Show fallback if error or no src
  if (hasError || !src) {
    return fallback ? (
      <div className={className} ref={imgRef} style={wrapperStyle} {...props}>
        {fallback}
      </div>
    ) : (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`} 
        ref={imgRef}
        role="img"
        aria-label={alt || 'Image placeholder'}
        style={wrapperStyle}
        {...props}
      >
        <span className="text-4xl">🏊</span>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} ref={imgRef} style={wrapperStyle}>
      {/* Placeholder while loading */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 animate-pulse"
          aria-hidden="true"
        >
          {fallback || <span className="text-4xl opacity-50">🏊</span>}
        </div>
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt || ''}
          width={width}
          height={height}
          className={`${className} transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
          {...props}
        />
      )}
    </div>
  )
}

export default LazyImage

