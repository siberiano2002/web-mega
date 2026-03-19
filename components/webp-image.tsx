'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'

interface WebPImageProps {
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

export function WebPImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80,
  placeholder = 'blur',
  fallback = '/placeholder.webp'
}: WebPImageProps) {
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

  // Determinar la mejor fuente de imagen
  const getImageSource = (originalSrc: string) => {
    // Si ya es WebP, usarla directamente
    if (originalSrc.endsWith('.webp')) {
      return { src: originalSrc, hasWebP: true }
    }

    // Intentar usar versión WebP
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    
    // Para desarrollo, verificar si existe el archivo WebP
    if (typeof window !== 'undefined') {
      // En el cliente, podemos intentar cargar la WebP
      return { src: webpSrc, hasWebP: true }
    }
    
    // En el servidor, usar la original
    return { src: originalSrc, hasWebP: false }
  }

  const { src: finalSrc, hasWebP } = getImageSource(src)
  const actualFallback = fallback || src.replace(/\.(jpg|jpeg|png)$/i, '.jpg')

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
        onError={(e) => {
          // Si falla la WebP, intentar con la original
          if (hasWebP && !hasError) {
            setHasError(true)
            const target = e.target as HTMLImageElement
            target.src = actualFallback
          }
        }}
        style={{
          contentVisibility: priority ? 'auto' : 'auto',
          containIntrinsicSize: `${width}px ${height}px`
        }}
      />
      
      {/* Fallback para imágenes completamente rotas */}
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

// Componente para imágenes hero con WebP prioritario
export function HeroWebPImage({
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
    <WebPImage
      src={src}
      alt={alt}
      width={1920}
      height={1080}
      priority={priority}
      className={`w-full h-full object-cover ${className}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
      quality={60}
      placeholder="blur"
      fallback="/images/MEGA440.webp"
    />
  )
}

// Componente para imágenes de contenido
export function ContentWebPImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = ''
}: {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}) {
  return (
    <WebPImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes="(max-width: 768px) 100vw, 360px"
      quality={60}
      placeholder="blur"
    />
  )
}

// Hook para detectar soporte WebP
export function useWebPSupport() {
  const [supportsWebP, setSupportsWebP] = useState(true)

  useEffect(() => {
    // Detectar soporte WebP
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext('2d')
    
    if (ctx) {
      const dataURL = canvas.toDataURL('image/webp')
      setSupportsWebP(dataURL.indexOf('data:image/webp') === 0)
    }
  }, [])

  return supportsWebP
}
