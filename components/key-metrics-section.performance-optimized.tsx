"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import { useIdleAnimation } from "@/hooks/performance-hooks"

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
  // ✅ Usar hook optimizado para animaciones
  const visibleMetrics = useIdleAnimation(keyMetrics, 300, 200)

  return (
    <section className="relative bg-zinc-800 text-white">
      <div className="relative z-10 px-2 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-12">
            {keyMetrics.map((metric, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-700 ${
                  visibleMetrics.has(index) 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="mb-2 sm:mb-3">
                  <span className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold text-accent block leading-tight">
                    {metric.value}
                  </span>
                </div>
                <div className="text-[9px] sm:text-[10px] text-accent-foreground/80 uppercase tracking-wider">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
