"use client"

import { useEffect, useState, useRef, useCallback, useMemo } from "react"

// ✅ Hook optimizado para throttling de resize
export function useThrottledResize(callback: () => void, delay: number = 100) {
  const callbackRef = useRef(() => {})
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const throttledCallback = () => {
      if (timeoutRef.current) return

      timeoutRef.current = setTimeout(() => {
        callbackRef.current()
        timeoutRef.current = null
      }, delay)
    }

    window.addEventListener('resize', throttledCallback, { passive: true })
    return () => {
      window.removeEventListener('resize', throttledCallback)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay])
}

// ✅ Hook para animaciones con requestIdleCallback
export function useIdleAnimation(items: any[], delay: number = 300, stagger: number = 200) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemsRef = useRef<any[]>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    itemsRef.current = items
  }, [items])

  useEffect(() => {
    const scheduleAnimation = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback((deadline) => {
          animateItems(deadline)
        }, { timeout: 1000 })
      } else {
        setTimeout(() => animateItems({ 
          timeRemaining: () => 16, 
          didTimeout: false 
        } as IdleDeadline), 100)
      }
    }

    const animateItems = (deadline: IdleDeadline) => {
      const items = itemsRef.current
      let index = 0

      const animateNext = () => {
        while (index < items.length && deadline.timeRemaining() > 1) {
          setVisibleItems(prev => new Set([...prev, index]))
          index++
        }

        if (index < items.length) {
          requestIdleCallback(animateNext)
        }
      }

      animateNext()
    }

    timeoutRef.current = setTimeout(scheduleAnimation, delay)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [delay, stagger])

  return visibleItems
}

// ✅ Hook para lazy loading con Intersection Observer
export function useLazyLoad(threshold: number = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { elementRef, isVisible }
}

// ✅ Hook para manejo de estados consolidados
export function useComponentState<T extends Record<string, any>>(initialState: T) {
  const [state, setState] = useState<T>(initialState)

  const updateState = useCallback((updates: Partial<T>) => {
    setState(prev => ({ ...prev, ...updates }))
  }, [])

  return { state, updateState }
}

// ✅ Hook para debouncing
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// ✅ Hook para memoización de cálculos pesados
export function useHeavyCalculation<T, R>(
  calculation: (input: T) => R,
  input: T,
  dependencies: any[] = []
): R {
  return useMemo(() => calculation(input), [input, ...dependencies])
}

// ✅ Hook para manejo de Web Workers
export function useWebWorker<T, R>(
  workerScript: string,
  initialMessage?: T
) {
  const [result, setResult] = useState<R | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const workerRef = useRef<Worker | null>(null)

  useEffect(() => {
    workerRef.current = new Worker(workerScript)

    workerRef.current.onmessage = (event) => {
      setResult(event.data)
      setLoading(false)
    }

    workerRef.current.onerror = (error) => {
      setError(error.message)
      setLoading(false)
    }

    return () => {
      workerRef.current?.terminate()
    }
  }, [workerScript])

  const postMessage = useCallback((message: T) => {
    if (workerRef.current) {
      setLoading(true)
      setError(null)
      workerRef.current.postMessage(message)
    }
  }, [])

  useEffect(() => {
    if (initialMessage && workerRef.current) {
      postMessage(initialMessage)
    }
  }, [initialMessage, postMessage])

  return { result, loading, error, postMessage }
}
