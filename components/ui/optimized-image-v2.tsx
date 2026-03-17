"use client"

import Image from "next/image"
import { useState } from "react"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  loading?: "lazy" | "eager"
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

// ✅ Tamaños optimizados por tipo de imagen
const getImageDimensions = (src: string) => {
  // Hero images - LCP priority
  if (src.includes('secadoras5')) {
    return {
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px",
      priority: true,
      loading: "eager" as const
    }
  }
  
  // Slide images - Full width
  if (src.includes('slide-')) {
    return {
      width: 1920,
      height: 1080,
      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px",
      priority: false,
      loading: "lazy" as const
    }
  }
  
  // Service cards - Medium size
  if (src.includes('secadoras2') || src.includes('renewable-energy')) {
    return {
      width: 800,
      height: 600,
      sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      priority: false,
      loading: "lazy" as const
    }
  }
  
  // Gallery images - Large but lazy
  if (src.includes('full_') || src.includes('IMG')) {
    return {
      width: 1200,
      height: 800,
      sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px",
      priority: false,
      loading: "lazy" as const
    }
  }
  
  // Small icons and logos
  if (src.includes('logo') || src.includes('icon') || src.includes('Ingeniaria-MEGA')) {
    return {
      width: 200,
      height: 100,
      sizes: "200px",
      priority: false,
      loading: "lazy" as const
    }
  }
  
  // Default for other images
  return {
    width: 800,
    height: 600,
    sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    priority: false,
    loading: "lazy" as const
  }
}

// ✅ Generar placeholder blur optimizado
const generateBlurDataURL = (width: number, height: number) => {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.4"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#e5e7eb"/>
          <stop offset="100%" stop-color="#d1d5db"/>
        </linearGradient>
      </defs>
    </svg>`
  ).toString('base64')}`
}

export function OptimizedImage({
  src,
  alt,
  width: propWidth,
  height: propHeight,
  className = "",
  priority: propPriority,
  loading,
  sizes: propSizes,
  quality = 85,
  placeholder = "blur",
  blurDataURL: propBlurDataURL
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // ✅ Obtener dimensiones optimizadas automáticamente
  const autoDimensions = getImageDimensions(src)
  const width = propWidth || autoDimensions.width
  const height = propHeight || autoDimensions.height
  const sizes = propSizes || autoDimensions.sizes
  const priority = propPriority ?? autoDimensions.priority
  const imgLoading = loading || autoDimensions.loading
  
  // ✅ Generar placeholder si no se proporciona
  const blurDataURL = propBlurDataURL || generateBlurDataURL(width, height)
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={imgLoading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        quality={quality}
        className={`transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadingComplete={() => setIsLoaded(true)}
        onError={(e) => {
          console.error(`Error loading image: ${src}`, e)
        }}
      />
      
      {/* ✅ Preload hints para WebP/AVIF */}
      <link
        rel="preload"
        as="image"
        href={src}
        imageSrcSet={`
          ${src.replace(/\.(jpg|jpeg|png)$/i, '.webp')} ${width}w,
          ${src.replace(/\.(jpg|jpeg|png)$/i, '.avif')} ${width}w
        `}
        sizes={sizes}
      />
    </div>
  )
}
