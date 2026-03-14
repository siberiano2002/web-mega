"use client"

import { Building2, Users, Leaf, Award, ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { AnimatedSection, StaggeredChildren } from "./animated-section"
import { useState } from "react"

const features = [
  {
    title: "La Empresa",
    description: "Deseamos que conozca nuestra empresa y a sus integrantes. Forme parte de nuestra red de contactos en Linkedin.",
    icon: Building2,
    metric: "1995",
    metricLabel: "Fundación",
    url: "/empresa",
  },
  {
    title: "Recursos",
    description: "Nuestro equipo de profesionales es nuestro mayor capital, potenciado con los mejores recursos técnicos.",
    icon: Users,
    metric: "50+",
    metricLabel: "Ingenieros",
    url: "/recursos",
  },
  {
    title: "Renovables",
    description: "Contamos con un área I&D en esta temática, con desarrollos para biomasa y parques fotovoltaicos.",
    icon: Leaf,
    metric: "100MW",
    metricLabel: "Instalados",
    url: "/energias-renovables",
  },
  {
    title: "Calidad",
    description: "Implementamos y mantenemos Sistemas de Gestión de Calidad, Seguridad, Salud Ocupacional y Medio Ambiente de acuerdo a la norma ISO 9001 & ISO 14001.",
    icon: Award,
    metric: "ISO",
    metricLabel: "Certificados",
    url: "/calidad",
  },
]

export function FeaturesSection() {
  const [isPlaying, setIsPlaying] = useState(true) // Auto play activado por defecto

  const handlePlayVideo = () => {
    setIsPlaying(true)
  }

  return (
    <section className="py-16 sm:py-20 lg:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: "40px 40px"
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative text-center">
        <AnimatedSection>
          <div className="max-w-2xl mb-20 mx-auto">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              La Empresa
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
              Conozca nuestra empresa y divisiones
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Ingeniería Mega S.A. — especialistas en sistemas de secado de granos, 
              con equipos de alto nivel y compromiso con la calidad y el medio ambiente.
            </p>
          </div>
        </AnimatedSection>

        <StaggeredChildren 
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
          staggerDelay={100}
        >
          {features.map((feature, index) => (
            <Link
              key={index}
              href={feature.url}
              className="group relative bg-card border border-border rounded-xl p-3 sm:p-4 lg:p-8 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 shadow-gray-200/50 block"
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl bg-muted flex items-center justify-center mb-3 sm:mb-6 group-hover:bg-accent/10 transition-colors duration-300">
                <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-foreground group-hover:text-accent transition-colors duration-300" />
              </div>

              {/* Content */}
              <h3 className="text-sm sm:text-base lg:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3 sm:mb-4 lg:mb-6 line-clamp-2">
                {feature.description}
              </p>

              {/* Metric */}
              <div className="flex items-baseline gap-1 sm:gap-2">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">{feature.metric}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">{feature.metricLabel}</span>
              </div>

              {/* Arrow */}
              <div className="absolute top-3 sm:top-4 lg:top-8 right-3 sm:right-4 lg:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="h-4 w-4 text-accent" />
              </div>
            </Link>
          ))}
        </StaggeredChildren>
        
        {/* Video Section */}
        <AnimatedSection delay={500}>
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-xl">
              {/* Video Container */}
              <div className="relative aspect-video">
                {!isPlaying ? (
                  // Video Thumbnail with Play Button
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-card/90 via-card/70 to-card/40 flex items-center justify-center cursor-pointer group"
                    onClick={handlePlayVideo}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image
                        src="https://img.youtube.com/vi/gzRgG9d_dRk/maxresdefault.jpg"
                        alt="Video preview"
                        fill
                        className="object-cover opacity-70"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    
                    {/* Play Button Overlay */}
                    <div className="relative z-10 flex flex-col items-center gap-4">
                      <div className="w-20 h-20 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <Play className="w-10 h-10 text-accent-foreground fill-current ml-1" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          Descubre Nuestra Historia
                        </h3>
                        <p className="text-muted-foreground max-w-md">
                          Conoce más sobre Ingeniería Mega S.A., nuestra trayectoria y los proyectos que nos posicionan como líderes en la industria.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Embedded YouTube Video
                  <div className="relative w-full h-full">
                    <iframe
                      src="https://www.youtube.com/embed/gzRgG9d_dRk?autoplay=1&mute=1&loop=1&playlist=gzRgG9d_dRk"
                      title="Ingeniería Mega S.A. - Nuestra Historia"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
