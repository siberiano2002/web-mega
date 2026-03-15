'use client'

import { useState, useEffect } from 'react'

interface CriticalCSSProps {
  children: React.ReactNode
  criticalCSS?: string
}

export function CriticalCSS({ children, criticalCSS }: CriticalCSSProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Cargar CSS no crítico después del render inicial
    if (!isLoaded) {
      const timer = setTimeout(() => {
        setIsLoaded(true)
      }, 100) // Pequeño delay para priorizar render

      return () => clearTimeout(timer)
    }
  }, [isLoaded])

  return (
    <>
      {/* CSS Crítico Inline */}
      {criticalCSS && (
        <style
          dangerouslySetInnerHTML={{
            __html: criticalCSS
          }}
        />
      )}
      
      {/* Contenido Principal */}
      <div className={isLoaded ? '' : 'css-non-critical'}>
        {children}
      </div>
      
      {/* CSS No Crítico Diferido */}
      {isLoaded && (
        <style jsx global>{`
          .css-non-critical * {
            opacity: 1 !important;
          }
          
          /* Prevenir parpadeo */
          .css-non-critical {
            transition: opacity 0.3s ease-in-out;
          }
        `}</style>
      )}
    </>
  )
}
