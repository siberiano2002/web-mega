'use client'

import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  placeholder?: 'blur' | 'empty'
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  placeholder = 'blur'
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Generar placeholder blur
  const generateBlurDataURL = (src: string) => {
    // Para imágenes críticas, generar placeholder
    if (placeholder === 'blur' && priority) {
      return `data:image/svg+xml;base64,${btoa(
        `<svg width="${width || 400}" height="${height || 300}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f3f4f6"/>
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">
            Loading...
          </text>
        </svg>`
      )}`
    }
    return undefined
  }

  // Determinar formatos soportados
  const imageSrc = src.replace(/\.(jpg|jpeg|png)$/i, '')
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        placeholder={placeholder === 'blur' ? 'blur' : undefined}
        blurDataURL={placeholder === 'blur' ? generateBlurDataURL(src) : undefined}
        className={`
          transition-opacity duration-300 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          object-cover
        `}
        onLoad={() => setIsLoaded(true)}
        // Optimización para LCP
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: `${width || 400}px ${height || 300}px`
        }}
      />
      
      {/* Preload para imágenes críticas */}
      {priority && (
        <link
          rel="preload"
          as="image"
          href={src}
          imageSrcSet={`
            ${imageSrc}.webp ${width || 400}w,
            ${imageSrc}.avif ${width || 400}w
          `}
          sizes={sizes}
        />
      )}
    </div>
  )
}
