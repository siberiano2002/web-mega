'use client'

import { OptimizedImage } from './optimized-image'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  title: string
  description: string
  backgroundImage: string
  ctaText?: string
  ctaHref?: string
}

export function HeroSection({ 
  title, 
  description, 
  backgroundImage,
  ctaText = "Contactar",
  ctaHref = "#contacto"
}: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Priorizar carga del hero
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setIsLoaded(true)
      })
    } else {
      setTimeout(() => setIsLoaded(true), 100)
    }
  }, [])

  return (
    <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo optimizada para LCP */}
      <div className="absolute inset-0">
        <OptimizedImage
          src={backgroundImage}
          alt={title}
          width={1920}
          height={1080}
          priority={true} // Máxima prioridad para LCP
          className="w-full h-full object-cover"
          placeholder="blur"
          sizes="100vw"
        />
      </div>
      
      {/* Overlay para mejor legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-10" />
      
      {/* Contenido */}
      <div className="hero-content relative z-20 text-center text-white px-6 py-12">
        {/* Skeleton mientras carga */}
        {!isLoaded ? (
          <div className="skeleton rounded-lg p-8 max-w-4xl mx-auto">
            <div className="h-12 bg-white/20 rounded mb-4 w-3/4 mx-auto" />
            <div className="h-4 bg-white/20 rounded mb-8 w-full" />
            <div className="h-12 bg-white/20 rounded w-1/2 mx-auto" />
          </div>
        ) : (
          <>
            {/* Título principal - elemento crítico para LCP */}
            <h1 className="hero-title font-bold mb-6 animate-fade-in">
              {title}
            </h1>
            
            {/* Descripción */}
            <p className="hero-description text-lg mb-8 animate-fade-in-delay">
              {description}
            </p>
            
            {/* CTA */}
            <a 
              href={ctaHref}
              className="hero-cta inline-flex items-center gap-2 animate-fade-in-delay-2"
            >
              {ctaText}
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </>
        )}
      </div>
      
      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.2s forwards;
        }
        
        .animate-fade-in-delay-2 {
          animation: fade-in 0.6s ease-out 0.4s forwards;
        }
      `}</style>
    </section>
  )
}
