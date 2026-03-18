'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageNextProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  fallback?: string
}

export function OptimizedImageNext({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'blur',
  fallback = '/placeholder.webp'
}: OptimizedImageNextProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Generar blur placeholder
  const generateBlurDataURL = (width: number, height: number) => {
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
          Loading...
        </text>
      </svg>`
    )}`
  }

  // Determinar si la imagen existe basado en el src
  const imageExists = (src: string) => {
    // Si empieza con / es una ruta relativa al public
    if (src.startsWith('/')) {
      return true // Asumir que existe si está en /public
    }
    // Si es URL externa, asumir que existe
    return true
  }

  const finalSrc = imageExists(src) ? src : fallback

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={finalSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder === 'blur' ? 'blur' : undefined}
        blurDataURL={placeholder === 'blur' ? generateBlurDataURL(width, height) : undefined}
        className={`
          transition-opacity duration-300 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          object-cover
        `}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{
          contentVisibility: priority ? 'auto' : 'auto',
          containIntrinsicSize: `${width}px ${height}px`
        }}
      />
      
      {/* Fallback para imágenes rotas */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="text-gray-500 text-sm">Imagen no disponible</div>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente para imágenes hero con fallback robusto
export function HeroImage({
  src,
  alt,
  priority = true,
  className = ''
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
}) {
  return (
    <OptimizedImageNext
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      priority={priority}
      className={`w-full h-full object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
      quality={90}
      placeholder="blur"
      fallback="/images/MEGA440.webp"
    />
  )
}
