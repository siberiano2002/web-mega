"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowUp, CheckCircle, Zap, Shield, Globe, Award, Wrench, Play, ArrowRight, X, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { YouTubeThumbnail } from "@/components/youtube-thumbnail"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection, StaggeredChildren } from "@/components/animated-section"
import Head from "next/head"

export default function SecadorasPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const videoRef = useRef<HTMLIFrameElement>(null)
  const [isVideoVisible, setIsVideoVisible] = useState(true)
  const [videoSrc, setVideoSrc] = useState("https://www.youtube.com/embed/wfM6UUHISRk?autoplay=1&mute=1&start=1&enablejsapi=1")
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTemperingModalOpen, setIsTemperingModalOpen] = useState(false)
  const [isAutolimpianteModalOpen, setIsAutolimpianteModalOpen] = useState(false)
  const [isDescargaModalOpen, setIsDescargaModalOpen] = useState(false)
  const [isModularModalOpen, setIsModularModalOpen] = useState(false)
  const [isMontajeModalOpen, setIsMontajeModalOpen] = useState(false)
  const [isTableroModalOpen, setIsTableroModalOpen] = useState(false)
  const [isSeparadoresModalOpen, setIsSeparadoresModalOpen] = useState(false)
  const [isAspiracionModalOpen, setIsAspiracionModalOpen] = useState(false)
  const [isIncendiosModalOpen, setIsIncendiosModalOpen] = useState(false)
  const [isRuidoModalOpen, setIsRuidoModalOpen] = useState(false)
  const [isAireComprimidoModalOpen, setIsAireComprimidoModalOpen] = useState(false)
  const [isAislacionModalOpen, setIsAislacionModalOpen] = useState(false)
  const [isRecuperacionModalOpen, setIsRecuperacionModalOpen] = useState(false)
  const [isGeneradoresModalOpen, setIsGeneradoresModalOpen] = useState(false)
  const [isSerieTCVModalOpen, setIsSerieTCVModalOpen] = useState(false)
  const [isFlujoMixtoModalOpen, setIsFlujoMixtoModalOpen] = useState(false)
  const [isGaleriaModalOpen, setIsGaleriaModalOpen] = useState(false)
  const [isCertificacionesModalOpen, setIsCertificacionesModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
              
              console.log(`Video ${command}: ${isVisible ? 'Reproduciendo' : 'Pausado'}`)
            } catch (error) {
              console.error('Error al controlar video:', error)
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
          console.log('Video pausado: Pestaña no visible')
        } catch (error) {
          console.error('Error al pausar video:', error)
        }
      } else if (!document.hidden && isVideoVisible && videoRef.current) {
        // Reanudar solo si el video está visible y la pestaña está activa
        try {
          videoRef.current.contentWindow?.postMessage(
            { event: 'command', func: 'playVideo', args: [] },
            'https://www.youtube.com'
          )
          console.log('Video reanudado: Pestaña visible y video en pantalla')
        } catch (error) {
          console.error('Error al reanudar video:', error)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [isVideoReady, isVideoVisible])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <>
      <Head>
        <title>Secadoras de Granos Industriales MEGA | Tecnología de Flujo Mixto</title>
        <meta name="description" content="Secadoras de granos MEGA con tecnología de flujo mixto. Líderes en secado industrial con 140 equipos anuales, capacidad de 17.000 tn/h. Certificaciones ISO 9001, 14001, 45001." />
        <meta name="keywords" content="secadoras de granos, secado industrial, flujo mixto, tecnología MEGA, secadoras agrícolas, ISO 9001, secado de granos industriales" />
        <meta property="og:title" content="Secadoras de Granos Industriales MEGA" />
        <meta property="og:description" content="Líderes en secado industrial con tecnología de flujo mixto. 140 equipos anuales con capacidad de 17.000 tn/h." />
        <meta property="og:image" content="https://ingenieriamega.com/images/secadoras5.jpg" />
        <meta property="og:url" content="https://ingenieriamega.com/secadoras" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Secadoras de Granos MEGA" />
        <meta name="twitter:description" content="Secadoras industriales con tecnología de flujo mixto para óptimo secado de granos." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ingenieriamega.com/secadoras" />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "Secadoras de Granos MEGA",
              "description": "Secadoras industriales con tecnología de flujo mixto para óptimo secado de granos con capacidad de 17.000 tn/h",
              "brand": "Ingeniería MEGA S.A.",
              "category": "Secadoras Industriales",
              "material": "Granos y cereales",
              "offers": {
                "@type": "Offer",
                "priceCurrency": "USD",
                "availability": "InStock"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "150"
              },
              "certification": ["ISO 9001", "ISO 14001", "ISO 45001"]
            })
          }} 
        />
      </Head>

      <main className="overflow-hidden bg-background text-foreground">
        <Header />

      {/* Hero */}
      <section
        id="inicio-secadoras"
        className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-primary text-primary-foreground"
      >
        {/* Background image - Responsive */}
        <div className="absolute inset-0">
          {/* Mobile Image - Visible only on small screens */}
          <div className="lg:hidden absolute inset-0">
            <Image
              src="/images/secadoras5-mobile.jpg"
              alt="Secadoras de granos MEGA en operación - Mobile"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
          
          {/* Tablet Image - Visible only on medium screens */}
          <div className="hidden lg:block xl:hidden absolute inset-0">
            <Image
              src="/images/secadoras5-tablet.jpg"
              alt="Secadoras de granos MEGA en operación - Tablet"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
          
          {/* Desktop Image - Visible only on large screens */}
          <div className="hidden xl:block absolute inset-0">
            <Image
              src="/images/secadoras5.jpg"
              alt="Secadoras de granos MEGA en operación - Desktop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
              Secadoras de granos MEGA
            </p>
            <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
              El diseño innovador que nos posiciona como{" "}
              <span className="text-accent">líderes en el sector</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-primary-foreground/80 leading-relaxed">
              Especialidad en I+D y fabricación de sistemas de secado de granos. 
              La capacidad de producción anual de MEGA lidera el mercado: 140 equipos de secado 
              (850 módulos de 20 tn/H) que logran una capacidad de 17.000 tn/h de secado.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="#contacto"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
              >
                Contactar con la empresa
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="#tecnologia"
                className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
              >
                Conocer la tecnología
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <AnimatedSection delay={200}>
        <div className="py-16 lg:py-20 bg-background">
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
            <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-xl">
              {/* Video Container */}
              <div className="relative aspect-video">
                {/* YouTube Video with thumbnail-first loading */}
                <div className="relative w-full h-full">
                  <YouTubeThumbnail
                    videoId="wfM6UUHISRk"
                    title="Secadoras de Granos MEGA - Tecnología de Flujo Mixto"
                    id="mega-video"
                    startTime={1}
                    autoplay={true}
                    mute={true}
                    loop={true}
                    enableJsApi={true}
                    onVideoLoad={() => {
                      // Update video reference when video loads
                      const iframe = document.querySelector('#mega-video') as HTMLIFrameElement
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
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      
      {/* Tecnología MEGA */}
      <section id="tecnologia" className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              Tecnología de <span className="text-accent">flujo mixto</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Sistema innovador que combina columnas y caballetes, generando un movimiento en zig-zag del grano con intermitencias de calor para máximo rendimiento.
            </p>
            <button
              onClick={() => setIsFlujoMixtoModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles de la tecnología de flujo mixto
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Tecnología de Flujo Mixto */}
      {isFlujoMixtoModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Tecnología de <span className="text-accent">flujo mixto</span>
              </h3>
              <button
                onClick={() => setIsFlujoMixtoModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Al diseño del sistema de secado MEGA también se lo puede llamar de flujo mixto, porque combina los sistemas existentes de columnas y caballetes. En este tipo de sistemas, el producto que se debe secar desciende por dentro de columnas (sin chapa perforada) que tienen medios caballetes en su interior.

                    Esta combinación genera un movimiento en zig-zag del grano secado, el cual es acompañado por aire a alta temperatura durante un tramo de las columnas, seguido de una zona de tempering en la que no se produce circulación de aire dentro de la masa de grano, hasta que este es atravesado una vez más por otra corriente de aire caliente.

                    Estas "intermitencias" de exposición al calor y de momentos de espera se producen varias veces en el trayecto de descenso del grano por las columnas de la secadora, optimizando el proceso de secado y garantizando una calidad superior del producto final.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Combinación de sistemas de columnas y caballetes</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Movimiento en zig-zag del grano</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Intermitencias de exposición al calor</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Zonas de tempering sin circulación de aire</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Calidad superior del producto final</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alta calidad de secado */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Alta calidad de <span className="text-accent">secado</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              El diseño de las columnas que transportan los granos permite la distribución homogénea del aire, optimizando el proceso de secado con máxima eficiencia.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles de alta calidad
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Alta calidad de secado */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Alta calidad de <span className="text-accent">secado</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    El diseño de las columnas que transportan los granos permite la distribución homogénea del aire.

                    El flujo mixto del grano que desciende por la columna ofrece baja resistencia al paso del aire. Este diseño permite reducir el consumo de energía, manteniendo un gran volumen de caudal específico.

                    La masa de grano desciende en zig-zag dentro de la columna y una corriente de aire seco y caliente rodea al grano de forma homogénea cuando este realiza su movimiento rotación. El aire potencia la transmisión de energía y absorbe la humedad. Como resultado de este funcionamiento eficaz, aumenta el rendimiento por tonelada de grano en proceso.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Distribución homogénea del aire</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Baja resistencia al paso del aire</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Reducción del consumo de energía</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Movimiento en zig-zag optimizado</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Zap className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Aumento del rendimiento por tonelada</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/image_8bf16561.png"
                      alt="Recorrido del grano en sistema de flujo mixto"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

          {/* Sistema de tempering cíclico */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Sistema de tempering <span className="text-accent">cíclico</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              El tempering cíclico mejora la migración de la humedad hacia la capa externa del grano, optimizando el proceso de secado con períodos controlados de circulación y espera.
            </p>
            <button
              onClick={() => setIsTemperingModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles del tempering cíclico
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Sistema de tempering cíclico */}
      {isTemperingModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Sistema de tempering <span className="text-accent">cíclico</span>
              </h3>
              <button
                onClick={() => setIsTemperingModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    El tempering cíclico mejora la migración de la humedad hacia la capa externa del grano. Este sistema logra alternar los períodos de circulación de aire caliente con los períodos de espera durante el movimiento descendente de la masa de granos dentro de la columna.

                    Esta alternancia permite que la humedad del interior del grano migre hacia la superficie de manera más eficiente, reduciendo el tiempo de secado total y mejorando la calidad final del producto.

                    El sistema controla automáticamente los ciclos de calentamiento y reposo, optimizando el proceso según el tipo de grano y las condiciones ambientales para asegurar un secado uniforme y eficiente.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Mejora la migración de humedad</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Alternancia de períodos de circulación</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Períodos de espera optimizados</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Movimiento descendente controlado</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/image_5728765c.png"
                      alt="Sistema de tempering cíclico"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

          {/* Sistema autolimpiante MEGA */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Sistema autolimpiante <span className="text-accent">MEGA</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              MEGA ha creado un sistema sencillo y confiable que previene la formación de atascamientos y focos ígneos, asegurando un proceso de secado sin interferencias.
            </p>
            <button
              onClick={() => setIsAutolimpianteModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles del sistema autolimpiante
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Sistema autolimpiante MEGA */}
      {isAutolimpianteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Sistema autolimpiante <span className="text-accent">MEGA</span>
              </h3>
              <button
                onClick={() => setIsAutolimpianteModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    MEGA ha creado un sistema sencillo y confiable que previene la formación de atascamientos o potenciales focos ígneos. Al no producirse interferencias en el descenso del grano durante el proceso de secado, una parte de partículas livianas cae sobre la tolva de descarga, mientras que la parte restante es dirigida hacia los ventiladores, que la conducen hasta el sistema de captación de partículas livianas.

                    Este diseño inteligente asegura un cuerpo de secado sin interferencias, manteniendo el flujo constante de granos y evitando acumulaciones que podrían comprometer la eficiencia del proceso o la seguridad del sistema.

                    El sistema opera de forma automática y continua, requiriendo mínima intervención manual y garantizando un funcionamiento óptimo durante largos períodos de operación.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Prevención de atascamientos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Sistema confiable y sencillo</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Prevención de focos ígneos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Cuerpo de secado sin interferencias</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_000_autolimpiante.jpg"
                      alt="Sistema autolimpiante MEGA"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sistema de Descarga */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Sistema de <span className="text-accent">descarga MEGA</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Con su exclusiva placa de barrido, garantiza la proporcionalidad de las toneladas que se descargan en función de la regulación del caudal de secado.
            </p>
            <button
              onClick={() => setIsDescargaModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles del sistema de descarga
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Sistema de Descarga */}
      {isDescargaModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Sistema de <span className="text-accent">descarga MEGA</span>
              </h3>
              <button
                onClick={() => setIsDescargaModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Con su exclusiva placa de barrido, garantiza la proporcionalidad de las toneladas que se descargan en función de la regulación de la velocidad del caudal de secado.

                    Este sistema innovador permite un control preciso y continuo del flujo de descarga, asegurando que el proceso de secado mantenga su eficiencia óptima en todo momento. La placa de barrido está diseñada para operar de manera suave y uniforme, evitando interrupciones en el flujo de granos.

                    El control electrónico mediante simple movimiento de perilla facilita la operación del sistema, permitiendo ajustes rápidos y precisos según las necesidades específicas del proceso de secado y las características del grano.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Control electrónico mediante simple movimiento de perilla</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Evita la rotura del grano</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Requerimientos mínimos de mantenimiento</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Baja potencia eléctrica (0,5 HP cada 140 Tn de secado)</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0003_descarga.jpg"
                      alt="Sistema de descarga MEGA"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sistema Modular */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Sistema <span className="text-accent">modular</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              El original sistema de módulos autoportantes MEGA permite adaptar la capacidad del equipo a las necesidades de cada caso, brindando rigidez estructural y escalabilidad.
            </p>
            <button
              onClick={() => setIsModularModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles del sistema modular
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Sistema Modular */}
      {isModularModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Sistema <span className="text-accent">modular</span>
              </h3>
              <button
                onClick={() => setIsModularModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    El original sistema de módulos autoportantes MEGA permite adaptar la capacidad del equipo a las necesidades de cada caso. El equipo brinda rigidez estructural y escalabilidad.

                    Esta innovadora solución modular ofrece flexibilidad total para ajustar la capacidad de secado según los requerimientos específicos de cada operación, permitiendo expansiones futuras sin necesidad de reemplazar el equipo existente.

                    El diseño autoportante de los módulos garantiza una instalación segura y eficiente, con la posibilidad de armado en suelo y posterior elevación, lo que reduce significativamente los riesgos y costos asociados al trabajo en altura.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Posibilidad de aumentar la cantidad de módulos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Montaje seguro y rápido en obra</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Armado de módulos en suelo con posterior elevación</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Reduce drásticamente el trabajo en altura</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0002_sistema_modular.jpg"
                      alt="Sistema modular MEGA"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Montaje en Obra MEGA */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Montaje en <span className="text-accent">obra MEGA</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              La concepción modular MEGA permite un montaje seguro y rápido, realizando la mayor parte del armado en el suelo y luego elevando los módulos con grúa.
            </p>
            <button
              onClick={() => setIsMontajeModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles del montaje en obra
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Montaje en Obra MEGA */}
      {isMontajeModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Montaje en <span className="text-accent">obra MEGA</span>
              </h3>
              <button
                onClick={() => setIsMontajeModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    La concepción modular MEGA permite un montaje seguro y rápido, que implica la realización de la mayor parte del proceso de armado de los módulos en el suelo. Una vez que están completamente terminados, los módulos se elevan y se posicionan usando una grúa, lo que reduce drásticamente el trabajo en altura.

                    Este innovador método de montaje garantiza una instalación eficiente y segura, minimizando los riesgos asociados al trabajo en altura y optimizando los tiempos de construcción. Los módulos se ensamblan completamente en el suelo, permitiendo un control de calidad superior antes de la elevación.

                    Todos los supervisores y operarios se capacitan y se entrenan en planta para la realización de este tipo de tareas, asegurando que cada montaje se realice según los más altos estándares de calidad y seguridad.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Montaje seguro y rápido</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Armado de módulos en el suelo</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Elevación con grúa</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Reduce drásticamente el trabajo en altura</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Wrench className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Personal capacitado y entrenado</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0001_montaje.jpg"
                      alt="Montaje en obra MEGA"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tablero Digital */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Tablero <span className="text-accent">digital</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              A través de una pantalla táctil, el operador puede controlar todo el proceso de secado, programando parámetros y monitoreando en tiempo real para máxima eficiencia.
            </p>
            <button
              onClick={() => setIsTableroModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles del tablero digital
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Tablero Digital */}
      {isTableroModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Tablero <span className="text-accent">digital</span>
              </h3>
              <button
                onClick={() => setIsTableroModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    A través de una pantalla táctil, el operador puede controlar el funcionamiento de la secadora durante todo el proceso. Simplemente elige el tipo de grano, programa la temperatura y la velocidad de descarga e inicia el secado. La pantalla detalla gráficamente todo el proceso y le muestra los mensajes al operario, lo que le permite tomar decisiones de forma rápida y segura para lograr así una mayor eficiencia en el secado.

                    Este proceso, además, se almacena en una base de datos (yellow box), permitiendo el análisis histórico y la optimización continua de los parámetros de secado.

                    El tablero se puede integrar con el resto de la automatización implementada en las plantas de los clientes, ofreciendo una solución completa de control y monitoreo centralizado.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Control PLC programable</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Monitoreo en tiempo real</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Regulación automática de temperatura</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0009_tablero_digital.jpg"
                      alt="Tablero de control digital"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Separadores de Partículas Livianas */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              <span className="text-accent">Separadores</span> de partículas livianas
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Los separadores captan las partículas del aire servido con alta eficiencia, evitando perturbaciones ambientales y reduciendo la concentración de polvo.
            </p>
            <button
              onClick={() => setIsSeparadoresModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles de los separadores
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Separadores de Partículas Livianas */}
      {isSeparadoresModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                <span className="text-accent">Separadores</span> de partículas livianas
              </h3>
              <button
                onClick={() => setIsSeparadoresModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    La secadora de granos expulsa aire junto con partículas en suspensión que alteran y perturban el entorno próximo al equipo. Los separadores de materiales livianos captan las partículas del aire servido con una alta eficiencia y evitan este tipo de problemas.

                    Cuando hay viviendas, oficinas, caminos, etc. en el entorno de la secadora de granos, se incorpora a la máquina un sistema colector de polvos que disminuye considerablemente la concentración de partículas sólidas en el aire servido. Cada turbina de la máquina cuenta con un equipo separador de polvos.

                    Este sistema es especialmente importante en instalaciones cercanas a zonas urbanas o sensibles, donde el control de emisiones es crucial para mantener buenas relaciones con la comunidad y cumplir con las regulaciones ambientales.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Captación eficiente de partículas</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Alta eficiencia de separación</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Reducción de perturbaciones ambientales</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Sistema colector de polvos integrado</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0008_Separadores de polvo.jpg"
                      alt="Separadores de partículas livianas"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sistema de Aspiración Secundaria de Polvo */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Sistema de <span className="text-accent">aspiración secundaria de polvo</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Este equipo automatiza la recolección de partículas, impide obstrucciones y aumenta la eficiencia de los extractores de polvo.
            </p>
            <button
              onClick={() => setIsAspiracionModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles del sistema de aspiración
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Sistema de Aspiración Secundaria de Polvo */}
      {isAspiracionModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Sistema de <span className="text-accent">aspiración secundaria de polvo</span>
              </h3>
              <button
                onClick={() => setIsAspiracionModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Este equipo automatiza la recolección de las partículas que decantan por los conductos de los extractores de polvo.

                    Este sistema de aspiración secundaria produce la depresión del caño colector principal, impide la obstrucción de los conductos de decantación de partículas livianas y, además, aumenta la eficiencia de los extractores de partículas de la secadora.

                    También se utiliza para recoger el polvo que se acumula en la cámara de ventiladores de la secadora. De esta manera, se logra automatizar por completo la limpieza del equipo de secado, reduciendo la necesidad de intervención manual y mejorando la continuidad operativa.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Automatización de la recolección de partículas</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Depresión del caño colector principal</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Impide obstrucción de conductos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Aumenta eficiencia de extractores</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Automatización completa de limpieza</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0007_Aspiracion_secundario_polvo.jpg"
                      alt="Sistema de aspiración secundaria de polvo"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Red Contra Incendios */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Red contra <span className="text-accent">incendios</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Sistema de inyección de agua en el núcleo portador de granos que enfría el material combustible y protege la estructura de la máquina.
            </p>
            <button
              onClick={() => setIsIncendiosModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles de la red contra incendios
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Red Contra Incendios */}
      {isIncendiosModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Red contra <span className="text-accent">incendios</span>
              </h3>
              <button
                onClick={() => setIsIncendiosModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    El diseño de la red contra incendios consiste en la inyección de agua en el núcleo portador de granos, lo que enfría el material combustible y sus envolventes para resguardar la estructura de la máquina.

                    Esto se logra por medio de inyectores abiertos distribuidos en tres niveles: uno se coloca sobre la tolva de carga de la máquina y los otros dos, debajo de esta.

                    El sistema está diseñado para actuar rápidamente en caso de emergencia, proporcionando una respuesta inmediata que minimiza el riesgo de propagación del fuego y protege tanto el equipo como las instalaciones circundantes.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Inyección de agua en núcleo portador</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Enfriamiento del material combustible</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Protección de la estructura de la máquina</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Inyectores distribuidos en tres niveles</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Respuesta rápida en emergencias</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0006_red_incendio.jpg"
                      alt="Red contra incendios"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Atenuadores de Ruido */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Atenuadores de <span className="text-accent">ruido</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Al incorporar los atenuadores de ruido en cada uno de los separadores de polvo, se consigue disminuir el nivel de ruido generado por la secadora en casi 5/10 dBA.
            </p>
            <button
              onClick={() => setIsRuidoModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles de los atenuadores de ruido
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Atenuadores de Ruido */}
      {isRuidoModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Atenuadores de <span className="text-accent">ruido</span>
              </h3>
              <button
                onClick={() => setIsRuidoModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Al incorporar los atenuadores de ruido en cada uno de los separadores de polvo, se consigue disminuir el nivel de ruido generado por la secadora en casi 5/10 dBA.

                    Esta reducción significativa del nivel sonoro mejora considerablemente las condiciones de trabajo para el personal operativo y reduce el impacto ambiental en las instalaciones circundantes.

                    Los atenuadores están diseñados para mantener la eficiencia del sistema de separación de polvo mientras proporcionan una barrera acústica efectiva, logrando un equilibrio óptimo entre rendimiento operativo y confort acústico.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Reducción de 5/10 dBA en nivel de ruido</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Incorporados en cada separador de polvo</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Mejora condiciones de trabajo</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Reduce impacto ambiental</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Mantiene eficiencia de separación</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0005_atenuadores_ruido.jpg"
                      alt="Atenuadores de ruido"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sistema de Limpieza con Aire Comprimido */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Sistema de limpieza con <span className="text-accent">aire comprimido</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Red de aire comprimido con cañería galvanizada y acoplamientos rápidos distribuidos en cuatro niveles para limpieza minuciosa entre variedades de grano.
            </p>
            <button
              onClick={() => setIsAireComprimidoModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles del sistema de limpieza
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Sistema de Limpieza con Aire Comprimido */}
      {isAireComprimidoModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Sistema de limpieza con <span className="text-accent">aire comprimido</span>
              </h3>
              <button
                onClick={() => setIsAireComprimidoModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    La red de aire comprimido consta de una cañería galvanizada con acoplamientos rápidos distribuidos en cuatro niveles que permiten la conexión de una manguera con una pistola para sopletear.

                    Esta red se utiliza en secadoras de semilleras en las que es necesario realizar una limpieza minuciosa cada vez que se cambia la variedad de grano que se debe secar.

                    El sistema proporciona una solución eficiente para mantener la higiene y pureza del producto, evitando la contaminación cruzada entre diferentes variedades de granos y asegurando que cada lote se procese en condiciones óptimas de limpieza.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Cañería galvanizada resistente</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Acoplamientos rápidos en cuatro niveles</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Conexión de manguera con pistola</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Limpieza minuciosa entre variedades</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Evita contaminación cruzada</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0004_aire_comprimido.jpg"
                      alt="Sistema de limpieza con aire comprimido"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Aislación Térmica */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Aislación <span className="text-accent">térmica</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Paneles de aislamiento térmica que disminuyen las pérdidas de calor por conducción y evitan condensación en climas fríos.
            </p>
            <button
              onClick={() => setIsAislacionModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles de la aislación térmica
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Aislación Térmica */}
      {isAislacionModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Aislación <span className="text-accent">térmica</span>
              </h3>
              <button
                onClick={() => setIsAislacionModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Los paneles de aislación térmica se colocan en la cámara de aire caliente o en toda la secadora.

                    Esta protección disminuye las pérdidas de calor por conducción. Además, en regiones con climas muy fríos, los paneles de aislación térmica se colocan en la cámara de aire servido para evitar la condensación de agua en el interior de la secadora.

                    El sistema de aislamiento está diseñado para optimizar la eficiencia energética del proceso de secado, manteniendo las temperaturas operativas ideales y reduciendo el consumo de combustible, lo que resulta en un menor costo operativo y un menor impacto ambiental.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Paneles en cámara de aire caliente</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Disminuye pérdidas de calor por conducción</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Evita condensación en climas fríos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Optimiza eficiencia energética</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Reduce consumo de combustible</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0003_aislacion_termica (1).jpg"
                      alt="Aislación térmica"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recuperación de Calor */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Recuperación de <span className="text-accent">calor</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Sistema diseñado para reducir costos de secado preservando el medio ambiente, analizando factores internos y externos para optimizar la eficiencia energética.
            </p>
            <button
              onClick={() => setIsRecuperacionModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles de la recuperación de calor
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Recuperación de Calor */}
      {isRecuperacionModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Recuperación de <span className="text-accent">calor</span>
              </h3>
              <button
                onClick={() => setIsRecuperacionModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Un importante compromiso de Ingeniería MEGA SA es el de reducir los costos de secado preservando el medio ambiente. Por esa razón, cada tipo de recuperación se diseña y se calcula analizando en detalle los factores internos y externos de la unidad de secado, tales como las condiciones climáticas del lugar, la clase de grano que se debe secar, las temperaturas máximas y mínimas de secado permitidas por el proceso, el combustible que se utilizará y el generador de calor, entre otros aspectos.

                    Este análisis detallado permite optimizar cada sistema de recuperación según las condiciones específicas de operación, asegurando la máxima eficiencia energética posible.

                    El resultado es una solución personalizada que no solo reduce significativamente los costos operativos, sino que también minimiza el impacto ambiental, cumpliendo con los más altos estándares de sostenibilidad y responsabilidad corporativa.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Reducción de costos de secado</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Preservación del medio ambiente</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Análisis detallado de factores internos y externos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Diseño personalizado según condiciones climáticas</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Optimización de eficiencia energética</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0002_recuperacion_calor (1).jpg"
                      alt="Recuperación de calor"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Generadores de Calor MEGA */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Generadores de <span className="text-accent">calor MEGA</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Generadores de calor que funcionan con distintos combustibles: gas natural, GLP, gasoil, vapor, leña, biomasa y otros, con tecnología exclusiva y certificación.
            </p>
            <button
              onClick={() => setIsGeneradoresModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles de los generadores de calor
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Generadores de Calor MEGA */}
      {isGeneradoresModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Generadores de <span className="text-accent">calor MEGA</span>
              </h3>
              <button
                onClick={() => setIsGeneradoresModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Las secadoras de granos MEGA disponen de generadores de calor que funcionan con distintos combustibles, como gas natural, gas licuado de petróleo (GLP), gasoil, vapor de agua, leña (madera en chips o troncos), biomasa y otros.

                    Esta versatilidad en el uso de combustibles permite adaptar cada instalación a las necesidades específicas del cliente y a la disponibilidad de recursos energéticos en cada región, optimizando siempre la eficiencia y reduciendo los costos operativos.

                    Cada generador está diseñado con tecnología exclusiva MEGA y cuenta con las certificaciones necesarias para garantizar un funcionamiento seguro, eficiente y confiable en todas las condiciones de operación.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Quemadores de gas MEGA (diseño exclusivo y certificado)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Hornos para leña MEGA</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Hornos para quema de biomasa</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Quemadores a gas oil</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Intercambiadores de calor de vapor-aire</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0000_quemador_render.jpg"
                      alt="Generadores de calor MEGA"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SERIE TC-V */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              SERIE <span className="text-accent">TC-V</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              La evolución de las secadoras MEGA con últimas tecnologías en eficiencia energética y automatización avanzada para máximo rendimiento.
            </p>
            <button
              onClick={() => setIsSerieTCVModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver detalles de la serie TC-V
            </button>
          </div>
        </div>
      </section>

      {/* Modal de SERIE TC-V */}
      {isSerieTCVModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                SERIE <span className="text-accent">TC-V</span>
              </h3>
              <button
                onClick={() => setIsSerieTCVModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    La serie TC-V representa la evolución de las secadoras MEGA, incorporando las últimas tecnologías en eficiencia energética y automatización avanzada para ofrecer el máximo rendimiento en el secado de granos.

                    Esta nueva generación de secadoras ha sido diseñada pensando en el futuro, con sistemas de control inteligentes que optimizan cada etapa del proceso de secado, reduciendo el consumo energético y mejorando la calidad final del producto.

                    La serie TC-V está especialmente indicada para operaciones que requieren los más altos estándares de eficiencia y sostenibilidad, siendo ideal para climas fríos gracias a su superior aislación térmica y sistemas de control avanzados.
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Menos impacto Ambiental</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Menos Polución acústica y de polvo</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Ideal para climas fríos</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base text-foreground">Mayor aislación térmica</span>
                    </div>
                  </div>
                </div>
                
                <div className="max-w-2xl mx-auto">
                  <div className="relative aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/secadoras/full_0010_TCV.jpg"
                      alt="SERIE TC-V"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificaciones */}
      <section className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Certificaciones y <span className="text-accent">homologaciones</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Como parte de su compromiso con la mejora continua, Ingeniería MEGA S.A. cuenta con certificación trinorma 
              y homologaciones internacionales.
            </p>
            <button
              onClick={() => setIsCertificacionesModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver certificaciones completas
            </button>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="py-16 sm:py-20 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              Proyectos e <span className="text-accent">instalaciones</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Conozca algunas de nuestras instalaciones recientes en diferentes partes del mundo.
            </p>
            <button
              onClick={() => setIsGaleriaModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Eye className="h-5 w-5" />
              Ver galería de proyectos
            </button>
          </div>
        </div>
      </section>

      {/* Modal de Galería de Proyectos */}
      {isGaleriaModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Proyectos e <span className="text-accent">instalaciones</span>
              </h3>
              <button
                onClick={() => setIsGaleriaModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Conozca algunas de nuestras instalaciones recientes en diferentes partes del mundo. Estos proyectos demuestran la versatilidad y calidad de nuestras secadoras MEGA en diversas aplicaciones y condiciones operativas.

                    Cada instalación está diseñada para satisfacer las necesidades específicas de nuestros clientes, optimizando el proceso de secado y garantizando la máxima calidad del producto final.

                    Desde plantas industriales a gran escala hasta instalaciones agrícolas especializadas, nuestras secadoras MEGA están presentes en los proyectos más exigentes a nivel mundial.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="relative group overflow-hidden rounded-2xl">
                    <div className="max-w-2xl mx-auto lg:w-full">
                      <Image
                        src="/images/secadoras/secadoras2.jpg"
                        alt="Instalación de secadora MEGA"
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                        className="aspect-video object-contain rounded-2xl shadow-lg w-full h-80 group-hover:scale-105 transition-transform duration-500 bg-muted/50"
                      />
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <div className="max-w-2xl mx-auto lg:w-full">
                      <Image
                        src="/images/secadoras/secadoras3.jpg"
                        alt="Montaje de secadora modular"
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                        className="aspect-video object-contain rounded-2xl shadow-lg w-full h-80 group-hover:scale-105 transition-transform duration-500 bg-muted/50"
                      />
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <div className="max-w-2xl mx-auto lg:w-full">
                      <Image
                        src="/images/secadoras/secadoras4.jpg"
                        alt="Planta de secado MEGA"
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                        className="aspect-video object-contain rounded-2xl shadow-lg w-full h-80 group-hover:scale-105 transition-transform duration-500 bg-muted/50"
                      />
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <div className="max-w-2xl mx-auto lg:w-full">
                      <Image
                        src="/images/secadoras/secadoras1.jpg"
                        alt="Sistema de control digital"
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                        className="aspect-video object-contain rounded-2xl shadow-lg w-full h-80 group-hover:scale-105 transition-transform duration-500 bg-muted/50"
                      />
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <div className="max-w-2xl mx-auto lg:w-full">
                      <Image
                        src="/images/secadoras/secadoras6.jpg"
                        alt="Instalación industrial completa"
                        width={400}
                        height={300}
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 400px"
                        className="aspect-video object-contain rounded-2xl shadow-lg w-full h-80 group-hover:scale-105 transition-transform duration-500 bg-muted/50"
                      />
                    </div>
                  </div>
                  <div className="relative group overflow-hidden rounded-2xl">
                    <div className="max-w-2xl mx-auto lg:w-full">
                      <Image
                        src="/images/secadoras/full_0001_montaje.jpg"
                        alt="Proceso de montaje en obra"
                        width={400}
                        height={300}
                        className="aspect-video object-contain rounded-2xl shadow-lg w-full h-80 group-hover:scale-105 transition-transform duration-500 bg-muted/50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Certificaciones y Homologaciones */}
      {isCertificacionesModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Certificaciones y <span className="text-accent">homologaciones</span>
              </h3>
              <button
                onClick={() => setIsCertificacionesModalOpen(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
              >
                <X className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    Como parte de su compromiso con la mejora continua, Ingeniería MEGA S.A. cuenta con certificación trinorma 
                    y homologaciones internacionales que validan la calidad, seguridad y sostenibilidad de nuestros procesos 
                    y productos.

                    Estas certificaciones demuestran nuestro cumplimiento con los estándares internacionales 
                    y nuestro compromiso con la excelencia operativa y la responsabilidad ambiental y social.

                    Nuestro sistema de gestión integrado asegura la consistencia y mejora continua 
                    en todos los aspectos de nuestra operación, desde el diseño y fabricación hasta el servicio 
                    postventa y soporte técnico.
                  </p>
                </div>
              </div>

              {/* Certificaciones Images */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Nuestras Certificaciones</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Award className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">ISO 9001</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">Sistema de Gestión de Calidad</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Globe className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">ISO 14001</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">Sistema de Gestión Ambiental</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center hover:bg-white/15 hover:border-white/30 transition-all duration-300 shadow-lg">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-foreground mb-2">ISO 45001</h4>
                    <p className="text-sm sm:text-base text-muted-foreground">Sistema de Gestión de Salud y Seguridad Ocupacional</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border">
              <button
                onClick={() => setIsCertificacionesModalOpen(false)}
                className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section id="contacto" className="py-16 sm:py-20 lg:py-32 bg-accent text-accent-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
            ¿Listo para optimizar su proceso de secado?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Contáctenos hoy mismo para recibir asesoramiento técnico especializado y descubra cómo nuestras 
            secadoras MEGA pueden transformar su operación.
          </p>
          <div className="flex justify-center">
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center rounded-full bg-accent-foreground px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-accent shadow-lg shadow-black/10 hover:bg-accent-foreground/90 transition-colors"
            >
              Solicitar asesoramiento técnico
              <ArrowRight className="ml-2 h-4 w-4" />
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
    </main>
    </>
  )
}
