"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { useEffect, useState } from "react"

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

  const getHeroImage = () => {
    switch (screenSize) {
      case 'mobile':
        return '/images/slide-secadoras-mobile.jpg'
      case 'tablet':
        return '/images/slide-secadoras-tablet.jpg'
      default:
        return '/images/slide-secadoras.jpg'
    }
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const yOffset = -80
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <section id="inicio" className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={getHeroImage()}
          alt="Instalaciones industriales de secado de granos"
          fill
          className="object-cover object-center"
          priority
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
      <div className="relative w-full flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl mx-auto text-center">
            {/* Main Heading */}
            <h1 
              className={`text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1] transition-all duration-700 delay-100 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="block">Sistemas de</span>
              <span className="block mt-1 sm:mt-2">
                <span className="text-accent">Secado</span> de Granos
              </span>
            </h1>

            {/* Description */}
            <div className="mt-4 sm:mt-6 lg:mt-8 max-w-2xl mx-auto">
              <p 
                className={`text-sm sm:text-base lg:text-lg text-white/70 leading-relaxed transition-all duration-700 delay-200 ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                El proceso de secado en su planta o industria es clave en el acondicionamiento de granos. 
                En Ingeniería Mega S.A. usted encontrará el asesoramiento de especialistas en soluciones de secado.
              </p>
              <p 
                className={`mt-2 sm:mt-4 text-sm sm:text-base lg:text-lg font-medium text-white/90 transition-all duration-700 delay-200 ${
                  loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Ofrecemos la más alta tecnología en secado de granos.
              </p>
            </div>

            {/* CTA Buttons */}
            <div 
              className={`mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button 
                size="default" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 sm:px-8 lg:px-10 h-12 sm:h-14 lg:h-16 text-sm sm:text-base font-semibold"
                onClick={() => scrollToSection("soluciones")}
              >
                Explorar Soluciones
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button 
                size="default" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-6 sm:px-8 lg:px-10 h-12 sm:h-14 lg:h-16 text-sm sm:text-base font-semibold bg-transparent"
                onClick={() =>
                  window.open(
                    "https://www.youtube.com/@MEGA-ingenieria",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                <Play className="mr-2 h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                Ver Video
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
