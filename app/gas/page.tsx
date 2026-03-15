"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Flame, Droplets, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Head from "next/head"

export default function GasPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isDivisionGasModalOpen, setIsDivisionGasModalOpen] = useState(false)
  const [isPlantasGlpModalOpen, setIsPlantasGlpModalOpen] = useState(false)
  const [isPlantasCityGateModalOpen, setIsPlantasCityGateModalOpen] = useState(false)
  const [isGasoductosRamalesModalOpen, setIsGasoductosRamalesModalOpen] = useState(false)
  const [isRedesDomiciliariaModalOpen, setIsRedesDomiciliariaModalOpen] = useState(false)
  const [isFabricacionEquiposModalOpen, setIsFabricacionEquiposModalOpen] = useState(false)
  const [isPruebasEnsayosModalOpen, setIsPruebasEnsayosModalOpen] = useState(false)
  const [isIngenieriaModalOpen, setIsIngenieriaModalOpen] = useState(false)

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
    <>
      <Head>
        <title>División Gas MEGA | Redes, Gasoductos y Plantas GLP</title>
        <meta name="description" content="División Gas MEGA: especialistas en redes de gas, gasoductos y plantas GLP. Más de 500 obras realizadas con certificación oficial y habilitación Camuzzi Gas Pampeana." />
        <meta name="keywords" content="división gas, redes de gas, gasoductos, plantas GLP, gas natural, gas licuado de petróleo, regulación gas, Camuzzi Gas Pampeana, Litoral Gas" />
        <meta property="og:title" content="División Gas MEGA" />
        <meta property="og:description" content="Especialistas en redes de gas, gasoductos y plantas GLP. Más de 500 obras realizadas con certificación oficial." />
        <meta property="og:image" content="https://ingenieriamega.com/images/gas-division.jpg" />
        <meta property="og:url" content="https://ingenieriamega.com/gas" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="División Gas MEGA" />
        <meta name="twitter:description" content="Especialistas en redes de gas, gasoductos y plantas GLP con certificación oficial." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ingenieriamega.com/gas" />
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "División Gas MEGA",
              "description": "Especialistas en soluciones integrales de gas natural, gasoductos y plantas GLP con certificación oficial y habilitación Camuzzi Gas Pampeana",
              "provider": {
                "@type": "Organization",
                "name": "Ingeniería MEGA S.A.",
                "url": "https://ingenieriamega.com",
                "certification": ["ISO 9001", "ISO 14001", "ISO 45001"]
              },
              "areaServed": "Argentina y América Latina",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Catálogo de Servicios de Gas"
              },
              "serviceType": ["Redes de Gas", "Gasoductos", "Plantas GLP", "Regulación de Gas"]
            })
          }} 
        />
      </Head>

      <main className="overflow-hidden bg-background text-foreground">
        <Header />
        <section
          id="inicio-gas"
          className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 bg-primary text-primary-foreground"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <picture>
              <source
                srcSet="/images/slide-gas-mobile.jpg"
                media="(max-width: 640px)"
              />
              <source
                srcSet="/images/slide-gas-tablet.jpg"
                media="(min-width: 641px) and (max-width: 1024px)"
              />
              <Image
                src="/images/slide-gas.jpg"
                alt="División Gas MEGA - redes, gasoductos y plantas GLP"
                fill
                className="object-cover bg-muted/50"
                priority
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
          </div>

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 sm:px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
                División Gas MEGA
              </p>
              <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
                El diseño innovador que nos posiciona como{" "}
                <span className="text-accent">líderes</span>
                {" "}
                en el sector
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-primary-foreground/80 leading-relaxed">
                Especialistas en redes de gas, gasoductos y plantas de GLP. 
                Más de 500 obras realizadas con certificación y habilitación oficial.
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

      {/* División Gas Section */}
      <section id="division-gas" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-foreground leading-tight mb-4 sm:mb-6">
              DIVISIÓN <span className="text-accent">GAS</span>
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0">
              Desde 1996, especialistas en soluciones integrales para Gas Natural (GN) y Gas Licuado de Petróleo (GLP).
            </p>
            
            <button
              onClick={() => setIsDivisionGasModalOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
            >
              <span className="hidden sm:inline">Conocer más sobre División Gas</span>
              <span className="sm:hidden">Conocer más</span>
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Gas Networks Section */}
      <section
        id="redes"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-secondary"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <div className="text-center mb-6 sm:mb-8">
              <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-accent mx-auto mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Plantas de <span className="text-accent">almacenamiento y vaporización</span> para gas licuado de petróleo
              </h2>
              
              {/* Preview de la descripción */}
              <div className="mt-4 sm:mt-6 max-w-3xl mx-auto px-2 sm:px-0">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Ingeniería Mega S.A. diseña y construye plantas de GLP para abastecimientos de localidades e industrias, incluyendo descargadero, áreas de almacenamiento, vaporización, separación, regulación y medición, con instalaciones eléctricas industriales y sistemas antiexplosivos.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => setIsPlantasGlpModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
                >
                  <span className="hidden sm:inline">Ver detalles completos</span>
                  <span className="sm:hidden">Ver detalles</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plantas City Gate Section */}
      <section
        id="plantas-city-gate"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-secondary"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <div className="text-center mb-6 sm:mb-8">
              <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-accent mx-auto mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Plantas de <span className="text-accent">regulación y medición</span> de gas
              </h2>
              
              {/* Preview de la descripción */}
              <div className="mt-4 sm:mt-6 max-w-3xl mx-auto px-2 sm:px-0">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Ingeniería Mega S.A. diseña y proyecta plantas de regulación y medición de alta y media presión, plantas City Gate para distribuidoras y plantas paquetizadas modulares para industrias, con mantenimiento y calibración de equipos instalados.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => setIsPlantasCityGateModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
                >
                  <span className="hidden sm:inline">Ver detalles completos</span>
                  <span className="sm:hidden">Ver detalles</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gasoductos y Ramales Section */}
      <section
        id="gasoductos-ramales"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <div className="text-center mb-6 sm:mb-8">
              <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-accent mx-auto mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Gasoductos y <span className="text-accent">Ramales</span>
              </h2>
              
              {/* Preview de la descripción */}
              <div className="mt-4 sm:mt-6 max-w-3xl mx-auto px-2 sm:px-0">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Ingeniería Mega S.A. está habilitada por Camuzzi Gas Pampeana y Litoral Gas para construir y soldar cañerías ramales y gasoductos con presión máxima de 70 Bar, con procedimientos calificados según norma API 1104.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => setIsGasoductosRamalesModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
                >
                  <span className="hidden sm:inline">Ver detalles completos</span>
                  <span className="sm:hidden">Ver detalles</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Redes para distribución domiciliaria Section */}
      <section
        id="redes-distribucion-domiciliaria"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-secondary"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <div className="text-center mb-6 sm:mb-8">
              <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-accent mx-auto mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Redes para <span className="text-accent">distribución domiciliaria</span>
              </h2>
              
              {/* Preview de la descripción */}
              <div className="mt-4 sm:mt-6 max-w-3xl mx-auto px-2 sm:px-0">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Cálculo y dimensionado de cañerías para redes, proyecto e instalación de cañería de polietileno. Más de 200.000 metros de cañerías para redes domiciliarias instalados en toda la región.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => setIsRedesDomiciliariaModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
                >
                  <span className="hidden sm:inline">Ver detalles completos</span>
                  <span className="sm:hidden">Ver detalles</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fabricación de equipos Section */}
      <section
        id="fabricacion-equipos"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <div className="text-center mb-6 sm:mb-8">
              <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-accent mx-auto mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Fabricación de <span className="text-accent">equipos</span>
              </h2>
              
              {/* Preview de la descripción */}
              <div className="mt-4 sm:mt-6 max-w-3xl mx-auto px-2 sm:px-0">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Ingeniería Mega S.A. desarrolla, diseña, construye y realiza servicio posventa de calentadores indirectos, odorizadores, separadores, tanques de choque y filtros FM para gas natural, todos con calidad certificada.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => setIsFabricacionEquiposModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
                >
                  <span className="hidden sm:inline">Ver detalles completos</span>
                  <span className="sm:hidden">Ver detalles</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pruebas y ensayos no destructivos Section */}
      <section
        id="pruebas-ensayos-no-destructivos"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-secondary"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <div className="text-center mb-6 sm:mb-8">
              <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-accent mx-auto mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Pruebas y ensayos <span className="text-accent">no destructivos</span>
              </h2>
              
              {/* Preview de la descripción */}
              <div className="mt-4 sm:mt-6 max-w-3xl mx-auto px-2 sm:px-0">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Ingeniería Mega S.A. dispone de equipamiento para pruebas hidráulicas, secado de gasoductos, medición de punto de rocío, detección de fallas y pruebas de tintas penetrantes, con instrumental certificado y personal capacitado.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => setIsPruebasEnsayosModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
                >
                  <span className="hidden sm:inline">Ver detalles completos</span>
                  <span className="sm:hidden">Ver detalles</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ingeniería básica y de detalle Section */}
      <section
        id="ingenieria-basica-detalle"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-background"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            <div className="text-center mb-6 sm:mb-8">
              <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-accent mx-auto mb-3 sm:mb-4" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
                Ingeniería básica y de <span className="text-accent">detalle</span>
              </h2>
              
              {/* Preview de la descripción */}
              <div className="mt-4 sm:mt-6 max-w-3xl mx-auto px-2 sm:px-0">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Los proyectos se diseñan y desarrollan según los requerimientos del cliente obteniendo la mejor opción técnico - comercial.
                </p>
              </div>
              
              <div className="mt-6 sm:mt-8">
                <button
                  onClick={() => setIsIngenieriaModalOpen(true)}
                  className="inline-flex items-center justify-center rounded-full bg-accent px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
                >
                  <span className="hidden sm:inline">Ver detalles completos</span>
                  <span className="sm:hidden">Ver detalles</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="contacto"
        className="py-16 sm:py-20 md:py-24 lg:py-28 bg-primary text-primary-foreground"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            ¿Necesita soluciones de gas profesional?
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg text-primary-foreground/80 leading-relaxed px-2 sm:px-0">
            Contáctenos para una evaluación técnica de su proyecto de gas. 
            Nuestros ingenieros especializados lo ayudarán a encontrar la solución 
            óptima para sus necesidades industriales o domiciliarias.
          </p>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="mailto:info@ingenieriamega.com?subject=Solicitud%20de%20Asesoramiento%20T%C3%A9cnico%20-%20Divisi%C3%B3n%20Gas&body=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20asesoramiento%20t%C3%A9cnico%20para%20un%20proyecto%20de%20gas.%0A%0ADatos%20de%20contacto%3A%0ANombre%3A%20%5Bsu%20nombre%5D%0AEmpresa%3A%20%5Bsu%20empresa%5D%0ATel%C3%A9fono%3A%20%5Bsu%20tel%C3%A9fono%5D%0ATipo%20de%20proyecto%3A%20%5Bdescripci%C3%B3n%20breve%5D%0A%0AGracias%2C%20espero%20su%20pronta%20respuesta."
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-accent-foreground shadow-lg shadow-black/10 hover:bg-accent/90 transition-colors"
            >
              <span className="hidden sm:inline">Solicitar asesoramiento técnico</span>
              <span className="sm:hidden">Asesoramiento técnico</span>
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
            >
              <span className="hidden sm:inline">Volver al inicio</span>
              <span className="sm:hidden">Inicio</span>
              <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
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

      {/* División Gas Modal */}
      {isDivisionGasModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                DIVISIÓN <span className="text-accent">GAS</span>
              </h2>
              <button
                onClick={() => setIsDivisionGasModalOpen(false)}
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
                  Desde 1996, Ingeniería Mega S.A. ofrece soluciones integrales para la realización de obras para la provisión de Gas Natural (GN) y Gas Licuado de Petróleo (GLP). Se llevan a cabo proyectos, dimensionado, desarrollo, fabricación, construcción, ensamblaje de plantas para almacenamiento de GLP, estaciones de regulación y medición, extensiones de gasoductos, ramales y redes para distribución domiciliaria.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Cada una de las obras es realizada con la más alta tecnología, maquinaria de avanzada y el mejor grupo humano conformado por ingenieros especializados, soldadores, fusionistas y personal idóneo con una vasta experiencia en el rubro. Los trabajos se realizan bajo la supervisión de las distintas distribuidoras y en un todo de acuerdo a la normativa vigente de ENARGAS.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ingeniería Mega S.A. división Gas cuenta con Sistemas de Gestión de Calidad, Seguridad, Salud Ocupacional y Medio Ambiente de acuerdo a la norma ISO 9001, así como el cumplimiento de normativas nacionales e internacionales de aplicación en el lugar de emplazamiento de cada una de las obras.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ingeniería Mega S.A. cuenta con una prestigiosa cartera de clientes y cuenta con el aval de más de 500 obras realizadas para sectores privados y públicos, como Municipios o entidades provinciales. Con el número de registro de Licitadores de la Provincia de Buenos Aires 6589, la Empresa está habilitada para realizar obras de tipo públicas.
                </p>
              </div>

              {/* Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                <Image
                  src="/images/gas/4e301881-b210-4bdd-a59f-a7c379111652.png"
                  alt="División Gas MEGA - soluciones integrales de gas natural y GLP"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plantas GLP Modal */}
      {isPlantasGlpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Plantas de <span className="text-accent">almacenamiento y vaporización</span> para gas licuado de petróleo
              </h2>
              <button
                onClick={() => setIsPlantasGlpModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                  Ingeniería Mega S.A. diseña y construye plantas de GLP para abastecimientos de localidades e industrias, incluyendo el descargadero, el área de tanque para almacenamiento, el área de vaporización, separación, regulación y medición. También diseña y fabrica odorizadores y chimeneas de quemado.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                  La Empresa realiza en forma integral instalaciones eléctricas industriales, instalaciones eléctricas antiexplosivos e instala los sistemas de vigilancia y control exigidos por la normativa vigente.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Descargadero para camiones cisterna</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Área de tanques de almacenamiento</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Área de vaporización</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Sistema de separación</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Regulación y medición</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Odorizadores y chimeneas de quemado</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Instalaciones eléctricas industriales</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Sistemas antiexplosivos</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm sm:text-base text-muted-foreground">Capacidad de almacenamiento</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Hasta 100 m³</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm sm:text-base text-muted-foreground">Capacidad de vaporización</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">100 - 10.000 kg/h</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-sm sm:text-base text-muted-foreground">Presión de operación</span>
                    <span className="font-semibold text-foreground text-sm sm:text-base">Según requerimiento</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-xs sm:text-sm text-muted-foreground">Normativas aplicadas</span>
                    <span className="font-semibold text-foreground text-xs sm:text-sm">API, ASME, normas locales</span>
                  </div>
                </div>
              </div>

              {/* Images Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Galería de plantas</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/4.jpg"
                      alt="Planta de GLP MEGA - Imagen 4"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/2.jpg"
                      alt="Planta de GLP MEGA - Imagen 2"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/1.jpg"
                      alt="Planta de GLP MEGA - Imagen 1"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Plantas City Gate Modal */}
      {isPlantasCityGateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Plantas de <span className="text-accent">regulación y medición</span> de gas
              </h2>
              <button
                onClick={() => setIsPlantasCityGateModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed text-justify">
                  Ingeniería Mega S.A. diseña y proyecta plantas de regulación y medición de alta y media presión, plantas City Gate para distribuidoras y plantas paquetizadas modulares para industrias. La Empresa lleva a cabo el mantenimiento y calibración de equipos instalados.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Regulación de alta y media presión</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Plantas City Gate para distribuidoras</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Plantas paquetizadas modulares</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Aplicaciones industriales</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Mantenimiento preventivo</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-[10px] sm:text-xs text-muted-foreground">Calibración de equipos</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Presión de operación</span>
                    <span className="font-semibold text-foreground">Alta y media presión</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Tipo de plantas</span>
                    <span className="font-semibold text-foreground">City Gate y modulares</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Aplicaciones</span>
                    <span className="font-semibold text-foreground">Distribuidoras e industrias</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Servicios post-instalación</span>
                    <span className="font-semibold text-foreground">Mantenimiento y calibración</span>
                  </div>
                </div>
              </div>

              {/* Images Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Galería de plantas</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/d.jpg"
                      alt="Planta de regulación y medición de gas MEGA - Imagen 1"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/e.jpg"
                      alt="Planta de regulación y medición de gas MEGA - Imagen 2"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/3.jpg"
                      alt="Planta de regulación y medición de gas MEGA - Imagen 3"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gasoductos y Ramales Modal */}
      {isGasoductosRamalesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Gasoductos y <span className="text-accent">Ramales</span>
              </h2>
              <button
                onClick={() => setIsGasoductosRamalesModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                  Ingeniería Mega S.A. se halla habilitada por las distribuidoras Camuzzi Gas Pampeana S.A. y Litoral Gas S.A. para construir y soldar cañerías ramales y gasoductos con una presión máxima de operación autorizada de 70 Bar.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                  Para soldaduras de cañería activa, la Empresa ha calificado los procedimientos de soldaduras y soldadores de acuerdo a la norma API 1104, Apéndice B.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Habilitación Camuzzi Gas Pampeana</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Habilitación Litoral Gas S.A.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Construcción de gasoductos</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Construcción de ramales</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Soldadura de cañerías</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Certificación API 1104</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Presión máxima operación</span>
                    <span className="font-semibold text-foreground">70 Bar</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Normativa soldadura</span>
                    <span className="font-semibold text-foreground">API 1104 Apéndice B</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Distribuidoras habilitantes</span>
                    <span className="font-semibold text-foreground">Camuzzi y Litoral Gas</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Tipo de obras</span>
                    <span className="font-semibold text-foreground">Gasoductos y ramales</span>
                  </div>
                </div>
              </div>

              {/* Images Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Galería de obras</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/f.jpg"
                      alt="Gasoducto y ramal MEGA - Imagen 1"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/g.jpg"
                      alt="Gasoducto y ramal MEGA - Imagen 2"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/h.jpg"
                      alt="Gasoducto y ramal MEGA - Imagen 3"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Redes para distribución domiciliaria Modal */}
      {isRedesDomiciliariaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Redes para <span className="text-accent">distribución domiciliaria</span>
              </h2>
              <button
                onClick={() => setIsRedesDomiciliariaModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                  Cálculo y dimensionado de cañerías para redes.
                  Proyecto e Instalación de cañería de polietileno.
                  Más de 200.000 metros de cañerías para redes domiciliarias para gas instalados en toda la región.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Cálculo de cañerías</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Dimensionado de redes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Proyecto de redes</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Instalación de cañerías</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Cañería de polietileno</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Redes domiciliarias</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Redes instaladas</span>
                    <span className="font-semibold text-foreground">+200.000 metros</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Material de cañerías</span>
                    <span className="font-semibold text-foreground">Polietileno certificado</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Tipo de aplicación</span>
                    <span className="font-semibold text-foreground">Distribución domiciliaria</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Cobertura geográfica</span>
                    <span className="font-semibold text-foreground">Toda la región</span>
                  </div>
                </div>
              </div>

              {/* Images Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Galería de redes</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/i.jpg"
                      alt="Redes para distribución domiciliaria MEGA - Imagen 1"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/j.jpg"
                      alt="Redes para distribución domiciliaria MEGA - Imagen 2"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/k.jpg"
                      alt="Redes para distribución domiciliaria MEGA - Imagen 3"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fabricación de equipos Modal */}
      {isFabricacionEquiposModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Fabricación de <span className="text-accent">equipos</span>
              </h2>
              <button
                onClick={() => setIsFabricacionEquiposModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                  Ingeniería Mega S.A. desarrolla, diseña, construye y realiza el servicio posventa de:
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Calentadores indirectos:</strong>
                      <p className="text-sm text-muted-foreground mt-1">Los calentadores producen una elevación de la temperatura del gas, a expensas de la combustión de un combustible gaseoso en el tubo de fuego, ubicado en la parte inferior del cuerpo de presión. El calentamiento tiene como propósito, evitar la formación de hidrato al momento de regular la presión del gas para consumo.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Odorizadores:</strong>
                      <p className="text-sm text-muted-foreground mt-1">Se diseñan y construyen del tipo por goteo y por arrastre según los requerimientos del cliente.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Separadores de polvo y líquido:</strong>
                      <p className="text-sm text-muted-foreground mt-1">Utilizados en plantas de regulación y medición de gas natural para la separación de partículas sólidas y líquidas.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Tanques de choque:</strong>
                      <p className="text-sm text-muted-foreground mt-1">Recipiente destinado a recepcionar el drenaje de separadores de polvo y líquido, filtros, etc.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <strong className="text-foreground">Filtros FM:</strong>
                      <p className="text-sm text-muted-foreground mt-1">Utilizados para la eliminación de partículas sólidas en líneas de gas natural. Construidos de acuerdo a norma ASME VIII Div. 1.</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed text-justify font-semibold">
                  Todos nuestros productos son de calidad certificada.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Desarrollo y diseño propio</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Fabricación integral</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Servicio posventa</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Calidad certificada</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Normas ASME VIII Div. 1</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Equipos para gas natural</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Normativa de construcción</span>
                    <span className="font-semibold text-foreground">ASME VIII Div. 1</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Tipo de equipos</span>
                    <span className="font-semibold text-foreground">Calentadores, odorizadores, separadores</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Aplicación</span>
                    <span className="font-semibold text-foreground">Gas natural y GLP</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Certificación</span>
                    <span className="font-semibold text-foreground">Calidad certificada</span>
                  </div>
                </div>
              </div>

              {/* Images Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Galería de equipos</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/aa.jpg"
                      alt="Fabricación de equipos MEGA - Imagen 1"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/bb.jpg"
                      alt="Fabricación de equipos MEGA - Imagen 2"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/cc.jpg"
                      alt="Fabricación de equipos MEGA - Imagen 3"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pruebas y ensayos no destructivos Modal */}
      {isPruebasEnsayosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Pruebas y ensayos <span className="text-accent">no destructivos</span>
              </h2>
              <button
                onClick={() => setIsPruebasEnsayosModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                  Ingeniería Mega S.A. dispone de equipamiento para realizar pruebas hidráulicas de gasoductos y recipientes sometidos a presión, secado de gasoductos con aire deshidratado, medición de punto de rocío, envíos de corriente, medición de puesta a tierra, detección de fallas de revestimientos. Todo el instrumental está debidamente calibrado con su correspondiente certificado de calibración.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                  La Empresa dispone de tecnología y personal capacitado y habilitado para realizar pruebas de tintas penetrantes en todo tipo de soldaduras.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Pruebas hidráulicas</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Secado de gasoductos</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Medición de punto de rocío</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Envíos de corriente</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Medición de puesta a tierra</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Pruebas de tintas penetrantes</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Certificación instrumental</span>
                    <span className="font-semibold text-foreground">Certificados de calibración</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Personal habilitado</span>
                    <span className="font-semibold text-foreground">Tecnología especializada</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Tipo de pruebas</span>
                    <span className="font-semibold text-foreground">No destructivas</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Aplicación</span>
                    <span className="font-semibold text-foreground">Gasoductos y recipientes</span>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Galería de ensayos</h3>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden max-w-2xl mx-auto">
                  <Image
                    src="/images/gas/aaa.jpg"
                    alt="Pruebas y ensayos no destructivos MEGA"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Ingeniería básica y de detalle Modal */}
      {isIngenieriaModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                Ingeniería básica y de <span className="text-accent">detalle</span>
              </h2>
              <button
                onClick={() => setIsIngenieriaModalOpen(false)}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed text-justify">
                  Los proyectos se diseñan y desarrollan según los requerimientos del cliente obteniendo la mejor opción técnico - comercial.
                </p>
              </div>

              {/* Features */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Características principales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Diseño según requerimientos del cliente</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Mejor opción técnico-comercial</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Ingeniería básica</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Ingeniería de detalle</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Desarrollo de proyectos</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">Optimización de soluciones</p>
                  </div>
                </div>
              </div>

              {/* Technical Specs */}
              <div className="bg-card rounded-2xl p-6 border border-border">
                <h3 className="text-xl font-bold text-foreground mb-4">Especificaciones técnicas</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Tipo de ingeniería</span>
                    <span className="font-semibold text-foreground">Básica y de detalle</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Enfoque</span>
                    <span className="font-semibold text-foreground">Requerimientos del cliente</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Objetivo</span>
                    <span className="font-semibold text-foreground">Mejor opción técnico-comercial</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Desarrollo</span>
                    <span className="font-semibold text-foreground">Proyectos integrales</span>
                  </div>
                </div>
              </div>

              {/* Images Grid */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Galería de proyectos</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/bbb.jpg"
                      alt="Ingeniería básica y de detalle MEGA - Imagen 1"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/ccc.jpg"
                      alt="Ingeniería básica y de detalle MEGA - Imagen 2"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                    <Image
                      src="/images/gas/ddd.jpg"
                      alt="Ingeniería básica y de detalle MEGA - Imagen 3"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
    </>
  )
}