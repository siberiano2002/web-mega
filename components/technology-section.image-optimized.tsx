"use client"

import { OptimizedImage } from "@/components/ui/optimized-image-v2"
import { Cpu, Gauge, Shield, Zap, Wifi, BarChart3 } from "lucide-react"

const technologies = [
  {
    icon: Cpu,
    title: "Control Automatizado",
    description: "Sistemas PLC de última generación para control preciso de todos los procesos industriales.",
    image: "/images/tecnologia-control.jpg"
  },
  {
    icon: Gauge,
    title: "Monitoreo en Tiempo Real",
    description: "Sensores avanzados que permiten seguimiento continuo de temperatura, humedad y flujo.",
    image: "/images/tecnologia-monitoreo.jpg"
  },
  {
    icon: Shield,
    title: "Seguridad Industrial",
    description: "Protocolos de seguridad certificados que superan los estándares internacionales.",
    image: "/images/tecnologia-seguridad.jpg"
  },
  {
    icon: Zap,
    title: "Eficiencia Energética",
    description: "Optimización del consumo energético con recuperación de calor y sistemas híbridos.",
    image: "/images/tecnologia-eficiencia.jpg"
  },
  {
    icon: Wifi,
    title: "IoT Industrial",
    description: "Conectividad remota para gestión y diagnóstico a distancia de todos los equipos.",
    image: "/images/tecnologia-iot.jpg"
  },
  {
    icon: BarChart3,
    title: "Análisis Predictivo",
    description: "Algoritmos de machine learning para mantenimiento predictivo y optimización.",
    image: "/images/tecnologia-analisis.jpg"
  },
]

const specs = [
  { label: "Capacidad de Secado", value: "50-500 tn/día" },
  { label: "Eficiencia Térmica", value: "hasta 92%" },
  { label: "Reducción Consumo", value: "-35% energía" },
  { label: "Tiempo Respuesta", value: "<24h soporte" },
]

export function TechnologySection() {
  return (
    <section id="tecnologia" className="py-16 sm:py-20 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "80px 80px"
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Header */}
        <div className="grid grid-cols-1 gap-12 lg:gap-20 items-end mb-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Centro de I+D Propio
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Nuestro laboratorio de investigación y desarrollo trabaja continuamente en mejorar la eficiencia y sustentabilidad de nuestros sistemas.
            </h2>
          </div>
          <div>
            <p className="text-primary-foreground/70 text-lg leading-relaxed">
              Desarrollamos tecnología propia que combina décadas de experiencia en campo con 
              los últimos avances en automatización, IoT y análisis de datos para maximizar 
              el rendimiento de su operación.
            </p>
          </div>
        </div>

        {/* Technology Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-20">
          {technologies.map((tech, index) => (
            <div key={index} className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 sm:p-8 lg:p-10 hover:bg-white/10 hover:border-accent/30 transition-all duration-500 flex flex-col h-full">
              {/* ✅ Optimized Technology Image */}
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4 sm:mb-6 lg:mb-8">
                <OptimizedImage
                  src={tech.image || "/images/placeholder-tech.jpg"}
                  alt={tech.title}
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
              </div>
              
              <div className="flex flex-col flex-1">
                <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-3 sm:mb-4">
                  {tech.title}
                </h3>
                <p className="text-sm sm:text-base text-primary-foreground/60 leading-relaxed flex-1">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((spec, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent mb-2">
                {spec.value}
              </div>
              <div className="text-sm text-primary-foreground/70 uppercase tracking-wider">
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
