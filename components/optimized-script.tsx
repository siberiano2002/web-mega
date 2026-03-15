'use client'

import { useEffect } from 'react'

interface OptimizedScriptProps {
  src: string
  strategy?: 'afterInteractive' | 'beforeInteractive' | 'lazyOnload'
  defer?: boolean
  async?: boolean
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedScript({ 
  src, 
  strategy = 'afterInteractive',
  defer = true,
  async = false,
  onLoad,
  onError
}: OptimizedScriptProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = src
    script.async = async
    script.defer = defer
    
    if (strategy === 'beforeInteractive') {
      // Insertar antes del render principal
      document.head.insertBefore(script, document.head.firstChild)
    } else if (strategy === 'afterInteractive') {
      // Cargar después del DOM listo
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          document.head.appendChild(script)
        })
      } else {
        document.head.appendChild(script)
      }
    } else if (strategy === 'lazyOnload') {
      // Cargar solo cuando sea necesario
      const loadScript = () => {
        document.head.appendChild(script)
      }
      
      // Intersection Observer para carga lazy
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              loadScript()
              observer.disconnect()
            }
          })
        },
        { threshold: 0.1 }
      )
      
      observer.observe(document.body)
    }

    script.onload = onLoad || (() => {})
    script.onerror = onError || (() => {})

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [src, strategy, defer, async, onLoad, onError])

  return null
}
