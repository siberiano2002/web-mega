import { useCallback, useRef } from 'react'

// ✅ Hook optimizado para scroll sin layout thrashing
export function useOptimizedScroll() {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const scrollToSection = useCallback((elementId: string, yOffset: number = -80) => {
    // ✅ Usar requestAnimationFrame para evitar layout thrashing
    requestAnimationFrame(() => {
      const element = document.getElementById(elementId)
      if (!element) return

      // ✅ Cache del cálculo para evitar lecturas repetidas
      const rect = element.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      // ✅ Cálculo optimizado sin forzar layout
      const targetY = rect.top + scrollTop + yOffset

      // ✅ Scroll nativo (más eficiente que smooth scroll JS)
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      })
    })
  }, [])

  return { scrollToSection }
}

// ✅ Hook para throttling de eventos de scroll
export function useThrottledScroll(callback: () => void, delay: number = 16) {
  const isThrottled = useRef(false)

  const throttledCallback = useCallback(() => {
    if (!isThrottled.current) {
      isThrottled.current = true
      callback()
      
      setTimeout(() => {
        isThrottled.current = false
      }, delay)
    }
  }, [callback, delay])

  return throttledCallback
}

// ✅ Hook para detección de viewport sin layout thrashing
export function useViewportDetection() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const observeElement = useCallback((element: HTMLElement, callback: (isIntersecting: boolean) => void) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            callback(entry.isIntersecting)
          })
        },
        { threshold: 0.1 }
      )
    }

    observerRef.current.observe(element)
  }, [])

  const unobserveElement = useCallback((element: HTMLElement) => {
    if (observerRef.current) {
      observerRef.current.unobserve(element)
    }
  }, [])

  return { observeElement, unobserveElement }
}

// ✅ Hook para resize optimizado con debouncing
export function useOptimizedResize(callback: () => void, delay: number = 250) {
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleResize = useCallback(() => {
    // ✅ Cancelar timeout anterior
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current)
    }

    // ✅ Debounce para evitar ejecuciones múltiples
    resizeTimeoutRef.current = setTimeout(() => {
      callback()
    }, delay)
  }, [callback, delay])

  return handleResize
}
