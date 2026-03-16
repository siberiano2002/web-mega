"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useCallback, useMemo } from "react"
import { useThrottledResize } from "@/hooks/performance-hooks"

export function HeroSection() {
  // ✅ Calcular tamaño de pantalla con throttling
  const updateScreenSize = useCallback(() => {
    // No necesitamos estado, solo memoizamos los cálculos
  }, [])

  // ✅ Usar hook throttled para resize (sin estado innecesario)
  useThrottledResize(updateScreenSize, 100)

  // ✅ Memoizar cálculos de imagen basados en viewport
  const heroImage = useMemo(() => {
    if (typeof window === 'undefined') return '/images/secadoras5.jpg'
    
    const width = window.innerWidth
    if (width < 768) return '/images/secadoras5-mobile.jpg'
    if (width < 1024) return '/images/secadoras5-tablet.jpg'
    return '/images/secadoras5.jpg'
  }, [])

  const imageDimensions = useMemo(() => {
    if (typeof window === 'undefined') return { width: 1920, height: 1080 }
    
    const width = window.innerWidth
    if (width < 768) return { width: 768, height: 1024 }
    if (width < 1024) return { width: 1024, height: 768 }
    return { width: 1920, height: 1080 }
  }, [])

  // ✅ Memoizar función de scroll
  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const yOffset = -80
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
  }, [])

  // ✅ Memoizar blur data
  const blurDataURL = useMemo(() => 
    `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`,
    []
  )

  return (
    <section id="inicio" className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-20 sm:pt-24 lg:pt-32">
      {/* Background Image - Optimizada para LCP */}
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Ingeniería MEGA S.A. - Soluciones industriales integrales"
          width={imageDimensions.width}
          height={imageDimensions.height}
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority={true}
          loading="eager"
          placeholder="blur"
          blurDataURL={blurDataURL}
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative w-full flex items-center justify-start lg:justify-start">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl text-left lg:text-left">
            {/* Badge/Reseña */}
            <p className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80 mb-4 sm:mb-6">
              especialistas en
            </p>
            
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              <span className="block">Soluciones</span>
              <span className="block mt-1 sm:mt-2">
                <span className="text-accent">Industriales</span> Integrales
              </span>
            </h1>

            {/* Description */}
            <div className="mt-4 sm:mt-6 lg:mt-8 max-w-2xl text-left">
              <p className="text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed">
                Ingeniería MEGA S.A. es líder en soluciones industriales integrales con más de 25 años de experiencia. 
                Especialistas en automatización, energías renovables, gas e ingeniería de proyectos.
              </p>
              <p className="mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg font-medium text-white/90">
                Ofrecemos tecnología de punta y compromiso con la calidad en todos nuestros proyectos.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 justify-start">
              <Button 
                size="default" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 sm:px-8 lg:px-10 h-10 sm:h-12 text-sm sm:text-base font-semibold"
                onClick={() => scrollToSection("soluciones")}
              >
                Explorar Divisiones
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                size="default" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-6 sm:px-8 lg:px-10 h-10 sm:h-12 text-sm sm:text-base font-semibold bg-transparent"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/@MEGA-ingenieria",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                Ver Videos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
