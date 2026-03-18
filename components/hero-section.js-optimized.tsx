"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { heroIcons } from "@/lib/icons"
import { useEffect, useState, useMemo } from "react"

const stats = [
  { value: "+30", label: "Años de experiencia" },
  { value: "500+", label: "Proyectos completados" },
  { value: "+30", label: "Países" },
]

export function HeroSection() {
  const [loaded, setLoaded] = useState(false)
  const [screenSize, setScreenSize] = useState('desktop')

  useEffect(() => {
    setLoaded(true)
    
    const updateScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile')
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  // ✅ Optimización LCP: Memoizar la selección de imagen
  const heroImage = useMemo(() => {
    switch (screenSize) {
      case 'mobile':
        return {
          src: '/images/secadoras5-mobile.webp',
          width: 768,
          height: 1024,
          sizes: '100vw'
        }
      case 'tablet':
        return {
          src: '/images/secadoras5-tablet.webp',
          width: 1024,
          height: 768,
          sizes: '100vw'
        }
      default:
        return {
          src: '/images/secadoras5.webp',
          width: 1920,
          height: 1080,
          sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px'
        }
    }
  }, [screenSize])

  // ✅ Optimización LCP: Placeholder blur optimizado
  const blurDataURL = useMemo(() => {
    return `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=`
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const yOffset = -80
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <section id="inicio" className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-20 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 lg:pb-16">
      {/* ✅ LCP Optimized Background Image */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <Image
            src={heroImage.src}
            alt="Ingeniería MEGA S.A. - Soluciones industriales integrales"
            width={heroImage.width}
            height={heroImage.height}
            className="object-cover object-center"
            sizes={heroImage.sizes}
            priority={true}
            loading="eager"
            placeholder="blur"
            blurDataURL={blurDataURL}
            quality={85}
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Stats */}
          <div 
            className={`flex flex-wrap gap-6 sm:gap-8 mb-8 sm:mb-12 transition-all duration-700 delay-200 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-accent leading-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-primary-foreground/80 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Title and Description */}
          <div className="space-y-4 sm:space-y-6">
            <h1 
              className={`text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1] transition-all duration-700 delay-100 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="block">Soluciones</span>
              <span className="block mt-1 sm:mt-2">
                <span className="text-accent">Industriales</span> Integrales
              </span>
            </h1>

            <div className="mt-4 sm:mt-6 lg:mt-8 max-w-2xl text-left">
              <p 
                className={`text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed transition-all duration-700 delay-200 ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Ingeniería MEGA S.A. es líder en soluciones industriales integrales con más de 25 años de experiencia. 
                Especialistas en automatización, energías renovables, gas e infraestructura industrial.
              </p>
              <p 
                className={`mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg font-medium text-white/90 transition-all duration-700 delay-200 ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Ofrecemos tecnología de punta y compromiso con la calidad en todos nuestros proyectos.
              </p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div 
            className={`mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 justify-start transition-all duration-700 delay-300 ${
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <Button 
              size="default" 
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 sm:px-8 lg:px-10 h-10 sm:h-12 text-sm sm:text-base font-semibold"
              onClick={() => scrollToSection("soluciones")}
            >
              Explorar Divisiones
              <heroIcons.ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
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
              <heroIcons.Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
              Ver Videos
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
