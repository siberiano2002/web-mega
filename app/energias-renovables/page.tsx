"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { YouTubeThumbnail } from "@/components/youtube-thumbnail"
import { ArrowRight, CheckCircle, Play, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import Head from "next/head"

export default function RenovablesPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true) // Auto play activado por defecto
  const videoRef = useRef<HTMLIFrameElement>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(true)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isEnergiasModalOpen, setIsEnergiasModalOpen] = useState(false)
  const [isServiciosSolaresModalOpen, setIsServiciosSolaresModalOpen] = useState(false)
  const [isBiomasaModalOpen, setIsBiomasaModalOpen] = useState(false)
  const [isHornoModalOpen, setIsHornoModalOpen] = useState(false)
  const [isDepositoModalOpen, setIsDepositoModalOpen] = useState(false)
  const [isAlimentacionModalOpen, setIsAlimentacionModalOpen] = useState(false)
  const [isHornoSectionModalOpen, setIsHornoSectionModalOpen] = useState(false)
  const [isHornoDetalleModalOpen, setIsHornoDetalleModalOpen] = useState(false)
  const [isConexionModalOpen, setIsConexionModalOpen] = useState(false)

  const handlePlayVideo = () => {
    setIsPlaying(true)
  }

  // Marcar video como listo después de cargar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoReady(true)
    }, 2000) // Esperar 2 segundos para que el video cargue

    return () => clearTimeout(timer)
  }, [])

  // Intersection Observer para pausar/reanudar video
  useEffect(() => {
    if (!isVideoReady) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isVisible = entry.isIntersecting
          setIsVideoVisible(isVisible)
          
          // Control del video usando API de YouTube
          if (videoRef.current) {
            const iframe = videoRef.current
            const command = isVisible ? 'playVideo' : 'pauseVideo'
            
            // Enviar comando a YouTube iframe API con mejor manejo
            try {
              iframe.contentWindow?.postMessage(
                { event: 'command', func: command, args: [] },
                'https://www.youtube.com'
              )
              
              console.log(`Video energías ${command}: ${isVisible ? 'Reproduciendo' : 'Pausado'}`)
            } catch (error) {
              console.error('Error al controlar video energías:', error)
            }
          }
        })
      },
      {
        threshold: 0.1, // El video se considera visible cuando 10% está en pantalla
        rootMargin: '0px' // Sin margen adicional
      }
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [isVideoReady])

  // Control de video cuando la pestaña pierde el foco
  useEffect(() => {
    if (!isVideoReady) return

    const handleVisibilityChange = () => {
      if (document.hidden && videoRef.current) {
        // Pausar video cuando la pestaña no está visible
        try {
          videoRef.current.contentWindow?.postMessage(
            { event: 'command', func: 'pauseVideo', args: [] },
            'https://www.youtube.com'
          )
          console.log('Video energías pausado: Pestaña no visible')
        } catch (error) {
          console.error('Error al pausar video energías:', error)
        }
      } else if (!document.hidden && isVideoVisible && videoRef.current) {
        // Reanudar solo si el video está visible y la pestaña está activa
        try {
          videoRef.current.contentWindow?.postMessage(
            { event: 'command', func: 'playVideo', args: [] },
            'https://www.youtube.com'
          )
          console.log('Video energías reanudado: Pestaña visible y video en pantalla')
        } catch (error) {
          console.error('Error al reanudar video energías:', error)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isVideoReady, isVideoVisible])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section
        id="inicio-renovables"
        className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 bg-primary text-primary-foreground"
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <picture>
            <source
              srcSet="/images/slide-energias-renovables-mobile.jpg"
              media="(max-width: 640px)"
            />
            <source
              srcSet="/images/slide-energias-renovables-tablet.jpg"
              media="(min-width: 641px) and (max-width: 1024px)"
            />
            <Image
              src="/images/slide-energias-renovables.jpg"
              alt="Energías renovables MEGA - hornos de biomasa y paneles solares"
              fill
              className="object-cover"
              priority
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 sm:px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
              Energías Renovables
            </p>
            <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
              El diseño innovador que nos posiciona como{" "}
              <span className="text-accent">líderes</span>
              {" "}
              en el sector
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-primary-foreground/80 leading-relaxed">
              Especialistas en hornos de biomasa y sistemas solares fotovoltaicos. 
              Reduzca costos operativos y su huella de carbono con soluciones 
              energéticas sustentables y de alto rendimiento.
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="#contacto"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
              >
                <span className="hidden sm:inline">Contactar con la empresa</span>
                <span className="sm:hidden">Contactar</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Energías Renovables Title Section */}
      <section className="pt-8 lg:pt-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Título Centrado */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-tight mb-4 whitespace-nowrap">
              ENERGÍAS <span className="text-accent">RENOVABLES</span>
            </h2>
            
            {/* Preview de la descripción */}
            <div className="mt-4 sm:mt-6 max-w-4xl mx-auto px-2 sm:px-0">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Se denomina energía renovable a la energía que se obtiene de fuentes naturales virtualmente inagotables, ya sea por la inmensa cantidad de energía que contienen o porque son capaces de regenerarse por medios naturales.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <button
                onClick={() => setIsEnergiasModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
              >
                <span className="hidden sm:inline">Ver información completa</span>
                <span className="sm:hidden">Ver más</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Energía Solar Fotovoltaica Section */}
      <section id="solar" className="pt-8 lg:pt-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Título y Descripción Centrados */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-4">
              ENERGÍA SOLAR <span className="text-accent">FOTOVOLTAICA</span>
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-prose mx-auto">
              Planificación y desarrollo de parques solares. Proyectos integrales de autoconsumo industrial con energía solar. 
              Diseño, instalación y mantenimiento de sistemas.
            </p>
          </div>
          
          {/* Video Section */}
          <AnimatedSection delay={200}>
            <div className="mb-16 max-w-5xl mx-auto">
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
                          src="https://img.youtube.com/vi/M-FO7AmRIfM/maxresdefault.jpg"
                          alt="Video preview"
                          fill
                          className="object-cover opacity-70"
                          sizes="(max-width: 768px) 100vw, 1200px"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Play Button Overlay */}
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-20 h-20 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                          <Play className="w-10 h-10 text-accent-foreground fill-current ml-1" />
                        </div>
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-foreground mb-2">
                            Energías Renovables en Acción
                          </h3>
                          <p className="text-muted-foreground max-w-md">
                            Descubre nuestras soluciones de biomasa y energía solar fotovoltaica. Tecnología sustentable para reducir costos y huella de carbono.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // YouTube Video with thumbnail-first loading
                    <div className="relative w-full h-full">
                      <YouTubeThumbnail
                        videoId="M-FO7AmRIfM"
                        title="Energías Renovables MEGA - Biomasa y Solar Fotovoltaica"
                        id="energias-video"
                        autoplay={true}
                        mute={true}
                        loop={true}
                        enableJsApi={true}
                        onVideoLoad={() => {
                          // Update video visibility state when video loads
                          const iframe = document.querySelector('#energias-video') as HTMLIFrameElement
                          if (iframe) {
                            videoRef.current = iframe
                          }
                        }}
                      />
                      {!isVideoVisible && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="text-white text-center">
                            <Play className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Video pausado</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Características - Preview y Botón */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            {/* Preview - Izquierda */}
            <div className="order-2 lg:order-1">
              <div className="space-y-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  Servicios <span className="text-accent">Solares</span> Integrales
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Planificación y desarrollo:</strong> Estudios de viabilidad, diseño ingenieril y gestión de permisos para proyectos solares a escala industrial.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Instalación:</strong> Montaje de estructuras de soporte y módulos fotovoltaicos con estándares de calidad internacional.
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      <strong>Mantenimiento:</strong> Servicio de mantenimiento preventivo y correctivo para garantizar óptimo rendimiento del sistema.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <button
                    onClick={() => setIsServiciosSolaresModalOpen(true)}
                    className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg hover:bg-accent/90 transition-colors"
                  >
                    Ver todos los servicios
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Espacio vacío - Derecha */}
            <div className="order-1 lg:order-2"></div>
          </div>
        </div>
      </section>

      {/* Biomasa Section */}
      <section id="biomasa" className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              ENERGÍAS <span className="text-accent">RENOVABLES</span> - BIOMASA
            </h2>
            
            {/* Preview de la descripción */}
            <div className="mt-4 sm:mt-6 max-w-4xl mx-auto px-2 sm:px-0">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Ingeniería Mega S.A. cuenta con un área de investigación y desarrollo en Energías Renovables (Biomasa y Fotovoltaica). 
                Actualmente ha desarrollado una solución de equipamiento dentro de la categoría de energía renovable BIOMASA.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <button
                onClick={() => setIsBiomasaModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
              >
                <span className="hidden sm:inline">Ver más sobre biomasa</span>
                <span className="sm:hidden">Ver biomasa</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Horno */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Título Centrado en Toda la Pantalla */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              HORNO PARA QUEMA DE <span className="text-accent">BIOMASA</span> - GENERADOR DE AIRE CALIENTE
            </h2>
            
            {/* Preview de la descripción */}
            <div className="mt-4 sm:mt-6 max-w-4xl mx-auto px-2 sm:px-0">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Los hornos para quema de biomasa utilizados para generación de aire caliente, funcionan producto de la combustión de biomasa de origen vegetal. 
                Para este fin utilizan distintos tipos de combustibles: cáscara de arroz, chips de madera, troncos, residuos de cosecha, marlo, chala, paja, etc.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <button
                onClick={() => setIsHornoSectionModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
              >
                <span className="hidden sm:inline">Ver modelos y componentes</span>
                <span className="sm:hidden">Ver modelos</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sistema de Conexión */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Título Centrado en Toda la Pantalla */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              DEPÓSITO DE <span className="text-accent">BIOMASA</span>
            </h2>
            
            {/* Preview de la descripción */}
            <div className="mt-4 sm:mt-6 max-w-4xl mx-auto px-2 sm:px-0">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Silo almacenador. Es donde se dispone la biomasa para alimentar el horno. 
                El mismo puede tener un volumen de 15/20/25 m³, posee su transporte dosificador incluido 
                y un motovibrador para facilitar el descenso del producto.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <button
                onClick={() => setIsDepositoModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
              >
                <span className="hidden sm:inline">Ver especificaciones técnicas</span>
                <span className="sm:hidden">Ver especificaciones</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sistema de Alimentación */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Título Centrado en Toda la Pantalla */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              SISTEMA DE <span className="text-accent">ALIMENTACIÓN</span>
            </h2>
            
            {/* Preview de la descripción */}
            <div className="mt-4 sm:mt-6 max-w-4xl mx-auto px-2 sm:px-0">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Es el sistema que permite transportar el combustible (biomasa) desde el depósito de biomasa al horno; está formado por un transportador que en forma automática alimenta al horno para mantener la condición de temperatura deseada al final del proceso.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <button
                onClick={() => setIsAlimentacionModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
              >
                <span className="hidden sm:inline">Ver componentes del sistema</span>
                <span className="sm:hidden">Ver componentes</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HORNO */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Título Centrado en Toda la Pantalla */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              HORNO
            </h2>
            
            {/* Preview de la descripción */}
            <div className="mt-4 sm:mt-6 max-w-4xl mx-auto px-2 sm:px-0">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Aquí se realiza la combustión de la biomasa. La parrilla de quema está constituida con placas de fundición. ​El hogar, construido por paneles de fibras cerámicas con propiedades aislantes, está diseñado para obtener la temperatura de trabajo necesaria para el quemado total de la biomasa asegurando una combustión completa.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <button
                onClick={() => setIsHornoDetalleModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
              >
                <span className="hidden sm:inline">Ver modelos y componentes</span>
                <span className="sm:hidden">Ver modelos</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sistema de Conexión */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Título Centrado en Toda la Pantalla */}
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              SISTEMA DE <span className="text-accent">CONEXIÓN</span>
            </h2>
            
            {/* Preview de la descripción */}
            <div className="mt-4 sm:mt-6 max-w-4xl mx-auto px-2 sm:px-0">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Según las necesidades y requerimientos del aire a suministrar a la secadora de granos y el tipo de biomasa que se utilice, se puede optar por diferentes opciones de vinculación con el horno para quema de biomasa.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <button
                onClick={() => setIsConexionModalOpen(true)}
                className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
              >
                <span className="hidden sm:inline">Ver opciones de vinculación</span>
                <span className="sm:hidden">Ver opciones</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-8">
            ¿Listo para reducir sus costos energéticos?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-12">
            Contáctenos para evaluar su proyecto de energías renovables y descubra cómo nuestras soluciones de biomasa y energía solar pueden optimizar su operación.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:info@ingenieriamega.com?subject=Solicitud%20de%20Asesoramiento%20T%C3%A9cnico%20-%20Energ%C3%ADas%20Renovables&body=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20asesoramiento%20t%C3%A9cnico%20para%20un%20proyecto%20de%20energ%C3%ADas%20renovables.%0A%0ADatos%20de%20contacto%3A%0ANombre%3A%20%5Bsu%20nombre%5D%0AEmpresa%3A%20%5Bsu%20empresa%5D%0ATel%C3%A9fono%3A%20%5Bsu%20tel%C3%A9fono%5D%0ATipo%20de%20proyecto%3A%20%5Bdescripci%C3%B3n%20breve%5D%0A%0AGracias%2C%20espero%20su%20pronta%20respuesta."
              className="inline-flex items-center rounded-full bg-accent px-8 py-4 text-lg font-semibold text-accent-foreground shadow-lg hover:bg-accent/90 transition-colors"
            >
              Solicitar asesoramiento
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center rounded-full border border-primary-foreground/30 px-8 py-4 text-lg font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-accent text-accent-foreground rounded-full shadow-lg transition-all duration-300 hover:bg-accent/90 hover:scale-110 ${
          showScrollTop 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Volver al inicio"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Energías Renovables Modal */}
      {isEnergiasModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                ENERGÍAS <span className="text-accent">RENOVABLES</span>
              </h2>
              <button
                onClick={() => setIsEnergiasModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Se denomina energía renovable a la energía que se obtiene de fuentes naturales virtualmente inagotables, ya sea por la inmensa cantidad de energía que contienen o porque son capaces de regenerarse por medios naturales.
                  </p>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Ingeniería Mega S.A. cuenta con un área de investigación y desarrollo en Energías Renovables (Biomasa y Fotovoltaica). Actualmente ha desarrollado una solución de equipamiento dentro de la categoría de energía renovable BIOMASA.
                  </p>
                </div>
                
                <hr className="w-24 mx-auto border-t-2 border-blue-500 my-6" />
                
                <div className="space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    La luz solar es una fuente de energía que produce electricidad de origen renovable, obtenida directamente a partir de la radiación solar mediante un dispositivo captador. Gracias a los avances tecnológicos y la economía de escala, el costo de la energía solar fotovoltaica se ha reducido de forma constante desde que se fabricaron las primeras células solares comerciales. Su eficiencia ha aumentado considerablemente y el costo medio de generación eléctrica es muy competitivo comparado con el de las energías no renovables.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Fuentes naturales inagotables</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Regeneración por medios naturales</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Área de I+D en Biomasa y Fotovoltaica</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Equipamiento de biomasa desarrollado</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Energía solar fotovoltaica competitiva</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Eficiencia aumentada considerablemente</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Tipo de energías</span>
                    <span className="font-semibold text-foreground">Biomasa y Fotovoltaica</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Costo solar vs no renovables</span>
                    <span className="font-semibold text-foreground">Muy competitivo</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Eficiencia solar</span>
                    <span className="font-semibold text-foreground">Aumentada considerablemente</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Desarrollo propio</span>
                    <span className="font-semibold text-foreground">Equipamiento biomasa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Servicios Solares Modal */}
      {isServiciosSolaresModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Servicios <span className="text-accent">Solares</span>
              </h2>
              <button
                onClick={() => setIsServiciosSolaresModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Planificación y desarrollo de parques solares. Proyectos integrales de autoconsumo industrial con energía solar. 
                  Diseño, instalación y mantenimiento de sistemas.
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-2">Planificación y desarrollo</h3>
                  <p className="text-sm text-muted-foreground">
                    Estudios de viabilidad, diseño ingenieril y gestión de permisos para proyectos solares a escala industrial.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-2">Instalación</h3>
                  <p className="text-sm text-muted-foreground">
                    Montaje de estructuras de soporte y módulos fotovoltaicos con estándares de calidad internacional.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-2">Mantenimiento</h3>
                  <p className="text-sm text-muted-foreground">
                    Servicio de mantenimiento preventivo y correctivo para garantizar óptimo rendimiento del sistema.
                  </p>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-2">Productos y servicios</h3>
                  <p className="text-sm text-muted-foreground">
                    Estructuras de soporte, Módulos fotovoltaicos, Planificación de proyectos, Asesoramiento, Adquisición de componentes, Instalación de campo a gran escala, Mantenimiento y servicio, Investigación de soluciones innovadoras.
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Estudios de viabilidad completos</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Diseño ingenieril especializado</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Gestión de permisos integral</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Estándares de calidad internacional</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Mantenimiento preventivo y correctivo</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Instalación a gran escala</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Escala de proyectos</span>
                    <span className="font-semibold text-foreground">Industrial</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Tipos de instalación</span>
                    <span className="font-semibold text-foreground">Autoconsumo industrial</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Calidad de componentes</span>
                    <span className="font-semibold text-foreground">Estándar internacional</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Servicio post-instalación</span>
                    <span className="font-semibold text-foreground">Completo</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Parque Solar Fotovoltaico</h3>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/energias-renovables/parquesfotovoitaicos.png"
                    alt="Parque Solar Fotovoltaico Ingeniería Mega"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Biomasa Modal */}
      {isBiomasaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                ENERGÍAS <span className="text-accent">RENOVABLES</span> - BIOMASA
              </h2>
              <button
                onClick={() => setIsBiomasaModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ingeniería Mega S.A. cuenta con un área de investigación y desarrollo en Energías Renovables (Biomasa y Fotovoltaica). 
                  Actualmente ha desarrollado una solución de equipamiento dentro de la categoría de energía renovable BIOMASA.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  <strong>Tipos de biomasa:</strong> Cáscara de arroz, cáscaras de café, aserrín, leña, marlos de maíz y otros tipos.
                </p>
              </div>

              {/* Biomasa Types Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-card rounded-3xl p-8 border border-border">
                  <div className="relative w-full h-40 rounded-t-2xl object-cover mb-4">
                    <Image
                      src="/images/energias-renovables/choclo.jpg"
                      alt="Biomasa no particulada - Leña y marlos de maíz"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">BIOMASA NO PARTICULADA</h3>
                  <p className="text-xl text-muted-foreground mb-6">
                    Leña, marlos de maíz y otros residuos de tamaño mayor que requieren procesamiento especial.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">Leña</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">Marlos de maíz</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">Consultar por otro tipo de biomasa</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-3xl p-8 border border-border">
                  <div className="relative w-full h-40 rounded-t-2xl object-cover mb-4">
                    <Image
                      src="/images/energias-renovables/arroz.jpg"
                      alt="Biomasa particulada - Cáscaras de arroz y residuos finos"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-6">BIOMASA PARTICULADA</h3>
                  <p className="text-xl text-muted-foreground mb-6">
                    Cáscaras de arroz, de café, aserrín y otros residuos finos de tamaño uniforme.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">Cáscaras de arroz</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">Cáscaras de café</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">Aserrín</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Horno Modal */}
      {isHornoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                HORNO PARA QUEMA DE <span className="text-accent">BIOMASA</span> - GENERADOR DE AIRE CALIENTE
              </h2>
              <button
                onClick={() => setIsHornoModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Los hornos para quema de biomasa utilizados para generación de aire caliente, funcionan producto de la combustión de biomasa de origen vegetal. Para este fin utilizan distintos tipos de combustibles: cáscara de arroz, chips de madera, troncos, residuos de cosecha, marlo, chala, paja, etc. Cada combustible tiene características morfológicas particulares y los Hornos Mega ofrecen diferentes tipos y tamaños de quemador así como distintos sistemas de alimentación entre otras características.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Combustión de biomasa vegetal</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Múltiples tipos de combustibles</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Diferentes tipos de quemador</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Sistemas de alimentación variados</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Generación de aire caliente</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Características morfológicas específicas</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Tipo de combustible</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Biomasa vegetal</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Combustibles compatibles</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Múltiples tipos</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Sistema de alimentación</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Variable según necesidad</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                    <span className="text-muted-foreground text-sm">Aplicación</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Generación de aire caliente</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Generadores de Aire Caliente</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/1.jpg"
                      alt="Generador de aire caliente - Imagen 1"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/2.jpg"
                      alt="Generador de aire caliente - Imagen 2"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/3.jpg"
                      alt="Generador de aire caliente - Imagen 3"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Depósito Modal */}
      {isDepositoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                DEPÓSITO DE <span className="text-accent">BIOMASA</span>
              </h2>
              <button
                onClick={() => setIsDepositoModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Silo almacenador. Es donde se dispone la biomasa para alimentar el horno. 
                  El mismo puede tener un volumen de 15/20/25 m³, posee su transporte dosificador incluido 
                  y un motovibrador para facilitar el descenso del producto.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Silos de 15/20/25 m³ de capacidad</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Transporte dosificador incluido</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Motovibrador para descenso automático</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Alimentación para Generadores de aire caliente</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Capacidad disponible</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">15/20/25 m³</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Sistema de transporte</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Dosificador incluido</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Sistema de descenso</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Motovibrador automático</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                    <span className="text-muted-foreground text-sm">Aplicación</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Generadores de aire caliente</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Silo de Almacenamiento</h3>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/energias-renovables/Silo-Biomasa.jpg"
                    alt="Silo de almacenamiento de biomasa"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sistema de Alimentación Modal */}
      {isAlimentacionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                SISTEMA DE <span className="text-accent">ALIMENTACIÓN</span>
              </h2>
              <button
                onClick={() => setIsAlimentacionModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Es el sistema que permite transportar el combustible (biomasa) desde el depósito de biomasa al horno; está formado por un transportador que en forma automática alimenta al horno para mantener la condición de temperatura deseada al final del proceso.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Transporte automático desde depósito</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Alimentación continua al horno</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Mantenimiento de condiciones de operación</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Control de temperatura del proceso</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Tipo de transporte</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Transportador automático</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Función principal</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Alimentación continua</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Control de proceso</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Temperatura deseada</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                    <span className="text-muted-foreground text-sm">Aplicación</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Proceso de combustión</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Componentes del Sistema</h3>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <div className="grid grid-cols-2 gap-2 h-full">
                    <div className="relative flex-1">
                      <Image
                        src="/images/energias-renovables/Cinta-transportadora.jpg"
                        alt="Sistema de alimentación de biomasa - Cinta transportadora"
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-xs font-medium">
                        CINTA TRANSPORTADORA
                      </div>
                    </div>
                    <div className="relative flex-1">
                      <Image
                        src="/images/energias-renovables/chimango.jpg"
                        alt="Sistema de alimentación de biomasa - Chimango"
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 600px"
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-xs font-medium">
                        ROSCA HELICOIDAL
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Horno Section Modal */}
      {isHornoSectionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                HORNO PARA QUEMA DE <span className="text-accent">BIOMASA</span> - GENERADOR DE AIRE CALIENTE
              </h2>
              <button
                onClick={() => setIsHornoSectionModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Los hornos para quema de biomasa utilizados para generación de aire caliente, funcionan producto de la combustión de biomasa de origen vegetal. Para este fin utilizan distintos tipos de combustibles: cáscara de arroz, chips de madera, troncos, residuos de cosecha, marlo, chala, paja, etc. Cada combustible tiene características morfológicas particulares y los Hornos Mega ofrecen diferentes tipos y tamaños de quemador así como distintos sistemas de alimentación entre otras características.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Combustión de biomasa vegetal</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Múltiples tipos de combustibles</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Diferentes tipos de quemador</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Sistemas de alimentación variados</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Generación de aire caliente</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Características morfológicas específicas</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Tipo de combustible</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Biomasa vegetal</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Combustibles compatibles</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Múltiples tipos</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Sistema de alimentación</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Variable según necesidad</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                    <span className="text-muted-foreground text-sm">Aplicación</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Generación de aire caliente</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Generadores de Aire Caliente</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/1.jpg"
                      alt="Generador de aire caliente - Imagen 1"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/2.jpg"
                      alt="Generador de aire caliente - Imagen 2"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/3.jpg"
                      alt="Generador de aire caliente - Imagen 3"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Horno Detalle Modal */}
      {isHornoDetalleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                HORNO
              </h2>
              <button
                onClick={() => setIsHornoDetalleModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Aquí se realiza la combustión de la biomasa. La parrilla de quema está constituida con placas de fundición. ​El hogar, construido por paneles de fibras cerámicas con propiedades aislantes, está diseñado para obtener la temperatura de trabajo necesaria para el quemado total de la biomasa asegurando una combustión completa.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Parrilla de quema con placas de fundición</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Hogar con fibras cerámicas aislantes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Temperatura de trabajo optimizada</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Combustión completa de biomasa</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Sistema de extracción automático o manual de cenizas</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Parrilla de quema</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Placas de fundición</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Hogar</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Fibras cerámicas aislantes</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Temperatura</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Optimizada para quemado total</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                    <span className="text-muted-foreground text-sm">Sistema de cenizas</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Automático o manual</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Modelos y Componentes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/QPI-24.jpg"
                      alt="Modelo QPI (Biomasa particulada)"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-xs font-medium">
                      Modelo QPI (Biomasa particulada)
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/QC-16.jpg"
                      alt="Modelo QC (Biomasa no particulada)"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-xs font-medium">
                      Modelo QC (Biomasa no particulada)
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/cenizas-05.jpg"
                      alt="DESCARGA DE CENIZAS"
                      fill
                      className="object-contain"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-xs font-medium">
                      DESCARGA DE CENIZAS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sistema de Conexión Modal */}
      {isConexionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                SISTEMA DE <span className="text-accent">CONEXIÓN</span>
              </h2>
              <button
                onClick={() => setIsConexionModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Según las necesidades y requerimientos del aire a suministrar a la secadora de granos y el tipo de biomasa que se utilice, se puede optar por diferentes opciones de vinculación con el horno para quema de biomasa.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Opciones de vinculación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Opción VENTURI disponible</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Intercambiador de calor gases-aire</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Eductor ciclónico de succión</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Vinculación adaptable a secadoras</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Conexión según tipo de biomasa</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Aplicación destino</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Secadora de granos</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Factor determinante</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Tipo de biomasa utilizada</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border gap-1">
                    <span className="text-muted-foreground text-sm">Sistema de aire</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Requerimientos específicos</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 gap-1">
                    <span className="text-muted-foreground text-sm">Flexibilidad</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Múltiples opciones disponibles</span>
                  </div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Componentes de Conexión</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/venturi.jpg"
                      alt="VENTURI"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-xs font-medium">
                      VENTURI
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/intercambiador.jpg"
                      alt="INTERCAMBIADOR DE CALOR"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-xs font-medium">
                      INTERCAMBIADOR DE CALOR
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg bg-slate-50 p-1">
                    <Image
                      src="/images/energias-renovables/eductor.jpg"
                      alt="EDUCTOR CICLÓNICO"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2 text-center text-xs font-medium">
                      EDUCTOR CICLÓNICO
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
