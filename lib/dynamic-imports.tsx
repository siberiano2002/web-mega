'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'

// Componentes pesados - Lazy loading para carga bajo demanda
export const DynamicComponents = {
  TechnologySection: dynamic(
    () => import('@/components/technology-section').then(mod => ({ default: mod.TechnologySection })),
    { 
      ssr: false,
      loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded">Cargando tecnología...</div>
    }
  ),
  InternationalSection: dynamic(
    () => import('@/components/international-section').then(mod => ({ default: mod.InternationalSection })),
    { 
      ssr: false,
      loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded">Cargando proyectos internacionales...</div>
    }
  ),
  ContactSection: dynamic(
    () => import('@/components/contact-section').then(mod => ({ default: mod.ContactSection })),
    { 
      ssr: false,
      loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded">Cargando contacto...</div>
    }
  ),
  ServicesSection: dynamic(
    () => import('@/components/services-section').then(mod => ({ default: mod.ServicesSection })),
    { 
      ssr: false,
      loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded">Cargando servicios...</div>
    }
  ),
}

// Wrapper para componentes con lazy loading
export function LazyWrapper({ 
  children, 
  fallback = <div className="animate-pulse bg-gray-200 h-64 rounded">Cargando...</div> 
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  return (
    <div className="lazy-wrapper">
      {children}
    </div>
  )
}

// Hook para detectar scroll y cargar componentes bajo demanda
export function useScrollLoader(threshold = 600) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > threshold) {
        setShouldLoad(true)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return shouldLoad
}

// Componente de carga condicional basado en scroll
export function ScrollLoadedComponent({ 
  component: Component, 
  threshold = 600,
  fallback 
}: {
  component: React.ComponentType<any>
  threshold?: number
  fallback?: React.ReactNode
}) {
  const shouldLoad = useScrollLoader(threshold)

  if (!shouldLoad) {
    return fallback || <div className="animate-pulse bg-gray-200 h-64 rounded">Cargando...</div>
  }

  return <Component />
}
