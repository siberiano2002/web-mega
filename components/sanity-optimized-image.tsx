'use client'

import Image from 'next/image'
import { useState } from 'react'
import { urlFor } from '@/sanity/lib/image'

interface SanityImageSource {
  asset?: {
    _ref?: string
    _id?: string
    url?: string
  }
  alt?: string
  caption?: string
}

interface SanityOptimizedImageProps {
  image: SanityImageSource
  alt?: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  quality?: number
  format?: 'webp' | 'avif' | 'jpg' | 'png'
}

export function SanityOptimizedImage({
  image,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80,
  format = 'webp'
}: SanityOptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // Generar URL optimizada de Sanity
  const optimizedUrl = urlFor(image)
    .width(width)
    .height(height)
    .quality(quality)
    .format(format as any)
    .url()

  // Generar fallback URL
  const fallbackUrl = urlFor(image)
    .width(width)
    .height(height)
    .quality(60)
    .format('jpg')
    .url()

  // Generar placeholder blur
  const generateBlurDataURL = () => {
    return `data:image/svg+xml;base64,${btoa(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f3f4f6"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af" font-family="Arial, sans-serif" font-size="14">
          Loading...
        </text>
      </svg>`
    )}`
  }

  // Generar srcset para diferentes tamaños
  const generateSrcSet = () => {
    const sizes = [320, 640, 768, 1024, 1280, 1536]
    return sizes
      .map(size => {
        const aspectRatio = width / height
        const newHeight = Math.round(size / aspectRatio)
        return `${urlFor(image).width(size).height(newHeight).quality(quality).format(format as any).url()} ${size}w`
      })
      .join(', ')
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={optimizedUrl}
        alt={alt || image.alt || 'Imagen'}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        placeholder="blur"
        blurDataURL={generateBlurDataURL()}
        className={`
          transition-opacity duration-300 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          object-cover
        `}
        onLoad={() => setIsLoaded(true)}
        // Optimización para LCP
        style={{
          contentVisibility: priority ? 'auto' : 'auto',
          containIntrinsicSize: `${width}px ${height}px`
        }}
        // Fallback para navegadores que no soportan el formato
        onError={(e) => {
          const target = e.target as HTMLImageElement
          if (target.src !== fallbackUrl) {
            target.src = fallbackUrl
          }
        }}
      />
      
      {/* Preload para imágenes críticas */}
      {priority && (
        <link
          rel="preload"
          as="image"
          href={optimizedUrl}
          imageSrcSet={generateSrcSet()}
          sizes={sizes}
        />
      )}

      {/* Caption si existe */}
      {image.caption && (
        <p className="text-sm text-gray-600 mt-2 text-center italic">
          {image.caption}
        </p>
      )}
    </div>
  )
}

// Componente para imágenes en PortableText
export const PortableTextImage = ({ value }: { value: SanityImageSource }) => {
  return (
    <div className="my-6">
      <SanityOptimizedImage
        image={value}
        alt={value.alt || 'Imagen'}
        width={800}
        height={600}
        className="rounded-lg shadow-md w-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
    </div>
  )
}
