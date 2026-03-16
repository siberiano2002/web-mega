"use client"

import { useState, useEffect } from "react"
import { OptimizedImage } from "@/components/ui/optimized-image-v2"

interface YouTubeThumbnailProps {
  videoId: string
  title: string
  className?: string
}

export function YouTubeThumbnail({ videoId, title, className = "" }: YouTubeThumbnailProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // ✅ Optimización: Preload de thumbnail cuando el componente está en viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsLoaded(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`youtube-thumb-${videoId}`)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [videoId, isLoaded])

  // ✅ Optimización: Generar thumbnail URL optimizada
  const getThumbnailUrl = () => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  // ✅ Optimización: Generar embed URL con parámetros de rendimiento
  const getEmbedUrl = () => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  if (isPlaying) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <iframe
          src={getEmbedUrl()}
          title={title}
          className="absolute inset-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div 
      id={`youtube-thumb-${videoId}`}
      className={`relative w-full h-full group cursor-pointer ${className}`}
      onClick={handlePlay}
    >
      {isLoaded && (
        <>
          <div className="relative w-full h-full">
            <OptimizedImage
              src={getThumbnailUrl()}
              alt={title}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
              width={1280}
              height={720}
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/30" />
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
              <div className="w-0 h-0 border-l-[20px] border-l-black border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1" />
            </div>
          </div>
          
          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <p className="text-white font-semibold text-sm line-clamp-2">{title}</p>
          </div>
        </>
      )}
    </div>
  )
}
