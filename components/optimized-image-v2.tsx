'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  loading?: 'lazy' | 'eager'
  sizes?: string
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'blur',
  blurDataURL
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Generar placeholder blur si no se proporciona
  const generateBlurDataURL = (imageSrc: string, imgWidth?: number, imgHeight?: number) => {
    if (blurDataURL) return blurDataURL
    
    const w = imgWidth || 400
    const h = imgHeight || 300
    
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial" font-size="14">
          Loading...
        </text>
      </svg>`
    )}`
  }

  // Determinar si es imagen crítica (hero)
  const isCritical = priority || src.includes('secadoras5') || src.includes('hero')

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={isCritical}
        loading={isCritical ? 'eager' : loading}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={generateBlurDataURL(src, width, height)}
        className={`
          transition-opacity duration-500 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          object-cover
        `}
        onLoadingComplete={() => setIsLoaded(true)}
        onError={(e) => {
          console.error(`Error loading image: ${src}`, e)
        }}
      />
      
      {/* Skeleton mientras carga */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      {/* Preload para imágenes críticas */}
      {isCritical && (
        <link
          rel="preload"
          as="image"
          href={src}
          imageSrcSet={`
            ${src.replace(/\.(jpg|jpeg|png)$/i, '.webp')} ${width || 1920}w,
            ${src.replace(/\.(jpg|jpeg|png)$/i, '.avif')} ${width || 1920}w
          `}
          sizes={sizes}
        />
      )}
    </div>
  )
}

// Componente para imágenes responsivas con múltiples tamaños
export function ResponsiveImage({
  src,
  alt,
  className = '',
  priority = false
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
}) {
  // Tamaños según el tipo de imagen
  const getImageSizes = (imageSrc: string) => {
    if (imageSrc.includes('secadoras5')) {
      return {
        width: 1920,
        height: 1080,
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw'
      }
    }
    
    if (imageSrc.includes('logo') || imageSrc.includes('icon')) {
      return {
        width: 120,
        height: 60,
        sizes: '120px'
      }
    }
    
    if (imageSrc.includes('secadoras2') || imageSrc.includes('slide-')) {
      return {
        width: 800,
        height: 600,
        sizes: '(max-width: 768px) 100vw, 50vw'
      }
    }
    
    // Default para imágenes de servicios/certificaciones
    return {
      width: 400,
      height: 300,
      sizes: '(max-width: 768px) 100vw, 33vw'
    }
  }

  const { width, height, sizes } = getImageSizes(src)

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  )
}

// Componente para logos y certificaciones (tamaño fijo)
export function LogoImage({
  src,
  alt,
  className = '',
  size = 'medium'
}: {
  src: string
  alt: string
  className?: string
  size?: 'small' | 'medium' | 'large'
}) {
  const sizes = {
    small: { width: 80, height: 40 },
    medium: { width: 120, height: 60 },
    large: { width: 200, height: 100 }
  }

  const { width, height } = sizes[size]

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={`${width}px`}
      className={className}
      priority={false}
      loading="lazy"
    />
  )
}

// Componente para imágenes de galería (aspect ratio fijo)
export function GalleryImage({
  src,
  alt,
  className = '',
  aspectRatio = '4/3'
}: {
  src: string
  alt: string
  className?: string
  aspectRatio?: '4/3' | '16/9' | '1/1' | '21/9'
}) {
  const aspectRatios = {
    '4/3': { width: 800, height: 600 },
    '16/9': { width: 1920, height: 1080 },
    '1/1': { width: 600, height: 600 },
    '21/9': { width: 1920, height: 823 }
  }

  const { width, height } = aspectRatios[aspectRatio]

  return (
    <div className={`relative aspect-${aspectRatio} ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="absolute inset-0"
      />
    </div>
  )
}
