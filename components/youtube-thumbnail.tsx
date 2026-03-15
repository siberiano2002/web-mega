"use client"

import { useState } from "react"
import Image from "next/image"
import { Play } from "lucide-react"

interface YouTubeThumbnailProps {
  videoId: string
  title: string
  className?: string
  id?: string
  autoplay?: boolean
  mute?: boolean
  loop?: boolean
  startTime?: number
  enableJsApi?: boolean
  onVideoLoad?: () => void
}

export function YouTubeThumbnail({
  videoId,
  title,
  className = "",
  id,
  autoplay = true,
  mute = true,
  loop = true,
  startTime = 0,
  enableJsApi = false,
  onVideoLoad
}: YouTubeThumbnailProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  const handleClick = () => {
    setIsVideoLoaded(true)
    onVideoLoad?.()
  }

  const getThumbnailUrl = () => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  const getIframeSrc = () => {
    // Force autoplay=1, mute=1, loop=1, and playlist=VIDEO_ID for all videos after user clicks thumbnail
    const params = new URLSearchParams({
      autoplay: "1", // Always autoplay after user interaction
      mute: "1", // Always muted for mobile compatibility
      loop: "1", // Force looping to prevent related videos
      playlist: videoId, // Required for loop parameter to work
      start: startTime.toString(),
      ...(enableJsApi && { enablejsapi: "1", origin: window.location.origin })
    })
    
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  if (isVideoLoaded) {
    return (
      <iframe
        id={id}
        src={getIframeSrc()}
        title={title}
        className={`w-full h-full border-0 ${className}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    )
  }

  return (
    <div 
      className={`relative w-full h-full cursor-pointer group ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      aria-label={`Play ${title}`}
    >
      <Image
        src={getThumbnailUrl()}
        alt={title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        priority
      />
      
      {/* Overlay gradient for better text visibility */}
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
      
      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-red-600 rounded-full p-4 group-hover:bg-red-700 transition-colors shadow-lg group-hover:scale-110 transition-transform">
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        </div>
      </div>
      
      {/* Video title overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white text-sm font-medium line-clamp-2">{title}</p>
      </div>
    </div>
  )
}
