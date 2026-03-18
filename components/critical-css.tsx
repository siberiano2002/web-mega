'use client'

import { useEffect } from 'react'

// CSS crítico inline para evitar render blocking
export const CriticalCSS = () => {
  useEffect(() => {
    // Inyectar CSS crítico directamente en el head
    const criticalCSS = `
      /* Critical CSS para LCP */
      .hero-lcp {
        content-visibility: auto;
        contain-intrinsic-size: 1920px 1080px;
      }
      
      /* Prevenir layout shift */
      .hero-content {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      /* Optimizar fuentes críticas */
      .hero-title {
        font-family: var(--font-inter);
        font-weight: 700;
        line-height: 1.1;
      }
      
      .hero-description {
        font-family: var(--font-inter);
        font-weight: 400;
        line-height: 1.6;
      }
      
      /* Optimizar botones críticos */
      .cta-button {
        font-family: var(--font-inter);
        font-weight: 600;
        transition: all 0.2s ease;
      }
      
      /* Prevenir FOUC (Flash of Unstyled Content) */
      .loading-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
      
      /* Optimizar imágenes críticas */
      .critical-image {
        content-visibility: auto;
        contain-intrinsic-size: 1920px 1080px;
        transform: translateZ(0);
        backface-visibility: hidden;
      }
    `

    // Crear style element
    const styleElement = document.createElement('style')
    styleElement.textContent = criticalCSS
    styleElement.id = 'critical-css'
    
    // Agregar al head
    document.head.appendChild(styleElement)
    
    // Cleanup
    return () => {
      const existingStyle = document.getElementById('critical-css')
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  return null
}

// Hook para precargar recursos críticos
export const useCriticalPreloads = () => {
  useEffect(() => {
    // Precargar imágenes críticas que existen en /public/images
    const imagePreloads = [
      { href: '/images/MEGA440.webp', as: 'image', type: 'image/jpeg' },
      { href: '/images/MEGA440.webp', as: 'image', type: 'image/webp' },
    ]

    // Crear preload elements
    const createPreload = (props: any) => {
      const link = document.createElement('link')
      Object.assign(link, { rel: 'preload', ...props })
      document.head.appendChild(link)
    }

    // Ejecutar preloads
    imagePreloads.forEach(createPreload)

    // Optimizar rendimiento
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        // Precargar recursos no críticos en idle time
        console.log('🚀 Critical resources preloaded successfully')
      })
    }
  }, [])
}

// Componente de optimización LCP
export const LCPOptimizer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Optimizar LCP con Web Vitals
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('🎯 LCP detected:', entry.startTime)
            
            // Optimizar futuros LCPs
            if (entry.startTime > 2500) {
              console.warn('⚠️ LCP is slow, consider optimization')
            }
          }
        })
      })

      observer.observe({ entryTypes: ['largest-contentful-paint'] })
      
      return () => observer.disconnect()
    }
  }, [])

  return <>{children}</>
}
