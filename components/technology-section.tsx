"use client"

import Image from "next/image"
import { Cpu, Gauge, Shield, Zap, Wifi, BarChart3 } from "lucide-react"
import { AnimatedSection, StaggeredChildren } from "./animated-section"

const technologies = [
  {
    icon: Cpu,
    title: "Control Automatizado",
    description: "Sistemas PLC de última generación para control preciso de todos los procesos industriales.",
  },
  {
    icon: Gauge,
    title: "Monitoreo en Tiempo Real",
    description: "Sensores avanzados que permiten seguimiento continuo de temperatura, humedad y flujo.",
  },
  {
    icon: Shield,
    title: "Seguridad Industrial",
    description: "Protocolos de seguridad certificados que superan los estándares internacionales.",
  },
  {
    icon: Zap,
    title: "Eficiencia Energética",
    description: "Optimización del consumo energético con recuperación de calor y sistemas híbridos.",
  },
  {
    icon: Wifi,
    title: "IoT Industrial",
    description: "Conectividad remota para gestión y diagnóstico a distancia de todos los equipos.",
  },
  {
    icon: BarChart3,
    title: "Análisis Predictivo",
    description: "Algoritmos de machine learning para mantenimiento predictivo y optimización.",
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
        <AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
                Tecnología
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                Innovación que impulsa la productividad
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
        </AnimatedSection>

        {/* Technology Grid */}
        <StaggeredChildren 
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-20"
          staggerDelay={100}
        >
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 hover:bg-white/10 hover:border-accent/30 transition-all duration-500"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-accent/20 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 group-hover:bg-accent/30 transition-colors">
                <tech.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-accent" />
              </div>
              <h3 className="text-sm sm:text-base md:text-xl font-semibold text-white mb-2 sm:mb-3">
                {tech.title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-primary-foreground/60 leading-relaxed line-clamp-3">
                {tech.description}
              </p>
            </div>
          ))}
        </StaggeredChildren>

        {/* Specs Bar */}
        <AnimatedSection delay={300}>
          <div className="bg-accent rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-12">
              {specs.map((spec, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-base sm:text-lg lg:text-4xl font-bold text-accent-foreground mb-0.5 sm:mb-1">
                    {spec.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-accent-foreground/80 uppercase tracking-wider">
                    {spec.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Image with floating elements - Full Width */}
        <div className="relative -mx-6 lg:-mx-8">
          <AnimatedSection delay={400}>
            <div className="mt-20 relative">
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image
                  src="/images/4d97461e-ec6f-49f2-b5f1-38ce434ce7db.png"
                  alt="Control de calidad y tecnología industrial"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 flex items-start justify-center pt-8 sm:pt-12 lg:pt-16">
                  <div className="px-8 lg:px-12 text-center">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                      Centro de I+D Propio
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      Nuestro laboratorio de investigación y desarrollo trabaja continuamente 
                      en mejorar la eficiencia y sustentabilidad de nuestros sistemas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
