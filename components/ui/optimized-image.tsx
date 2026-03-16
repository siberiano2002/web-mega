import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
}

export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'blur'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Generar placeholder blur optimizado
  const generateBlurDataURL = () => {
    if (placeholder === 'blur') {
      return `data:image/svg+xml;base64,${btoa(
        `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="14">
            Cargando...
          </text>
        </svg>`
      )}`
    }
    return undefined
  }

  // Determinar si es imagen crítica (LCP)
  const isLCP = priority || src.includes('secadoras5') || src.includes('hero')

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={isLCP}
        loading={isLCP ? "eager" : "lazy"}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={generateBlurDataURL()}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadingComplete={() => setIsLoaded(true)}
        style={{
          objectFit: 'cover',
          width: '100%',
          height: '100%'
        }}
      />
      
      {/* Placeholder mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}
