import { useState } from 'react'

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  loading = 'lazy',
  fetchPriority = 'auto',
  ...props 
}) => {
  const [hasError, setHasError] = useState(false)
  
  // Generate WebP and AVIF paths from original source
  const getOptimizedSrc = (originalSrc, format) => {
    // Handle external URLs or data URIs
    if (originalSrc.startsWith('http') || originalSrc.startsWith('data:')) {
      return originalSrc
    }
    
    // Remove any query parameters
    const cleanSrc = originalSrc.split('?')[0]
    
    // Replace extension with new format
    return cleanSrc.replace(/\.(jpg|jpeg|png|gif|webp)$/i, `.${format}`)
  }
  
  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc) => {
    if (baseSrc.startsWith('http') || baseSrc.startsWith('data:')) {
      return undefined
    }
    
    const widths = [320, 640, 960, 1280, 1920]
    return widths
      .map(w => `${baseSrc.replace(/\.(jpg|jpeg|png|gif|webp)$/i, `-${w}w.$1`)} ${w}w`)
      .join(', ')
  }
  
  if (hasError) {
    return (
      <div 
        className={`bg-midnight-lighter flex items-center justify-center ${className}`}
        {...props}
      >
        <span className="text-white/30 text-xs">Image non disponible</span>
      </div>
    )
  }
  
  // External URLs don't get optimization
  if (src.startsWith('http') || src.startsWith('data:')) {
    return (
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        className={className}
        onError={() => setHasError(true)}
        {...props}
      />
    )
  }
  
  const webpSrc = getOptimizedSrc(src, 'webp')
  const avifSrc = getOptimizedSrc(src, 'avif')
  const srcSet = generateSrcSet(src)
  
  return (
    <picture>
      {/* AVIF for modern browsers - smallest file size */}
      <source 
        srcSet={avifSrc} 
        type="image/avif"
        srcSet={srcSet ? generateSrcSet(avifSrc) : undefined}
      />
      {/* WebP for most browsers */}
      <source 
        srcSet={webpSrc} 
        type="image/webp"
        srcSet={srcSet ? generateSrcSet(webpSrc) : undefined}
      />
      {/* Fallback to original format */}
      <img
        src={src}
        alt={alt}
        loading={loading}
        fetchPriority={fetchPriority}
        className={className}
        onError={() => setHasError(true)}
        {...props}
      />
    </picture>
  )
}

export default OptimizedImage
