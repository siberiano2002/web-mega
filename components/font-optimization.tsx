"use client"

import { useEffect } from "react"

// ✅ Hook para optimización de carga de fuentes
export function useFontOptimization() {
  useEffect(() => {
    // Optimización de carga de fuentes
    if ('fonts' in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded')
        // Remover clase de loading cuando las fuentes estén listas
        document.body.classList.remove('fonts-loading')
      })
    }

    // Prevenir Flash of Unstyled Text (FOUT)
    document.body.classList.add('fonts-loading')

    // Timeout para evitar bloqueo indefinido
    const timeout = setTimeout(() => {
      document.documentElement.classList.add('fonts-loaded')
      document.body.classList.remove('fonts-loading')
    }, 3000) // 3 segundos máximo

    return () => clearTimeout(timeout)
  }, [])
}

// ✅ Hook para preload de fuentes críticas
export function useCriticalFontPreload() {
  useEffect(() => {
    const criticalFonts = [
      '/fonts/Inter-400.woff2',
      '/fonts/Inter-600.woff2',
      '/fonts/Inter-700.woff2'
    ]

    criticalFonts.forEach(fontUrl => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'font'
      link.type = 'font/woff2'
      link.crossOrigin = 'anonymous'
      link.href = fontUrl
      document.head.appendChild(link)
    })
  }, [])
}

// ✅ Componente para manejo de fuentes
export function FontOptimization() {
  useFontOptimization()
  useCriticalFontPreload()

  return null
}
