"use client"

import { useEffect, useState } from "react"

const keyMetrics = [
  { 
    value: "+30", 
    label: "Países"
  },
  { 
    value: "+270", 
    label: "Proyectos internacionales"
  },
  { 
    value: "+30", 
    label: "Años de experiencia"
  }
]

export function KeyMetricsSection() {
  const [loaded, setLoaded] = useState(false)
  const [visibleMetrics, setVisibleMetrics] = useState<number[]>([])

  useEffect(() => {
    setLoaded(true)
    
    // Animación progresiva de las métricas
    const timer = setTimeout(() => {
      const intervals: NodeJS.Timeout[] = []
      
      keyMetrics.forEach((_, index) => {
        const interval = setTimeout(() => {
          setVisibleMetrics(prev => [...prev, index])
        }, index * 200)
        intervals.push(interval)
      })
      
      return () => intervals.forEach(clearTimeout)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative bg-zinc-800 text-white">
      {/* Contenido principal */}
      <div className="relative z-10 px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-12">
        <div className="max-w-7xl mx-auto">
          {/* Métricas */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-12">
            {keyMetrics.map((metric, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  visibleMetrics.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
              >
                {/* Valor principal */}
                <div className="mb-2 sm:mb-3">
                  <span className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-accent block leading-tight">
                    {metric.value}
                  </span>
                </div>
                
                {/* Etiqueta */}
                <h3 className="text-sm sm:text-base lg:text-2xl xl:text-3xl font-bold mb-2 sm:mb-3 text-white">
                  {metric.label}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
