"use client"

import { useEffect } from "react"
import Script from "next/script"

interface OptimizedScriptProps {
  src?: string
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload"
  defer?: boolean
  async?: boolean
  children?: React.ReactNode
  id?: string
}

export function OptimizedScript({ 
  src, 
  strategy = "afterInteractive", 
  defer = true, 
  async = false,
  children,
  id 
}: OptimizedScriptProps) {
  return (
    <Script
      src={src}
      id={id}
      strategy={strategy}
      defer={defer}
      async={async}
    >
      {children}
    </Script>
  )
}

// Componente para scripts analíticos no críticos
export function AnalyticsScript() {
  return (
    <OptimizedScript
      src="https://vercel-analytics.edge.app/api/v1/web"
      strategy="afterInteractive"
      defer
      id="vercel-analytics"
    />
  )
}

// Componente para structured data
export function StructuredDataScript({ data }: { data: object }) {
  return (
    <OptimizedScript
      id="structured-data"
      strategy="lazyOnload"
    >
      {JSON.stringify(data)}
    </OptimizedScript>
  )
}

// Componente para scripts de terceros
export function ThirdPartyScript({ 
  src, 
  id, 
  defer = true 
}: { 
  src: string
  id: string
  defer?: boolean 
}) {
  return (
    <OptimizedScript
      src={src}
      id={id}
      strategy="afterInteractive"
      defer={defer}
    />
  )
}

// Hook para carga diferida de scripts
export function useDeferredScript(src: string, delay: number = 1000) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.defer = true
      document.head.appendChild(script)
    }, delay)

    return () => clearTimeout(timer)
  }, [src, delay])
}
