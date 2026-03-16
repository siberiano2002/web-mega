"use client"

import { useState } from "react"
import { OptimizedImage } from "@/components/ui/optimized-image-v2"
import { CheckCircle, Zap, Shield, Globe, Award, Wrench, Play, X, Eye, ArrowUp } from "lucide-react"
import Link from "next/link"
import { YouTubeThumbnail } from "@/components/youtube-thumbnail"

export default function SecadorasPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isVideoVisible, setIsVideoVisible] = useState(true)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const handlePlayVideo = () => {
    setIsPlaying(true)
  }

  return (
    <>
      {/* Hero Section with Optimized Image */}
      <section
        id="inicio-secadoras"
        className="relative pt-24 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24 bg-primary text-primary-foreground"
      >
        {/* ✅ Optimized Background Images */}
        <div className="absolute inset-0">
          {/* Mobile Image */}
          <div className="lg:hidden absolute inset-0">
            <OptimizedImage
              src="/images/secadoras5-mobile.jpg"
              alt="Secadoras de granos MEGA en operación - Mobile"
              className="object-cover"
              sizes="100vw"
              priority={true}
              loading="eager"
            />
          </div>
          
          {/* Tablet Image */}
          <div className="hidden lg:block xl:hidden absolute inset-0">
            <OptimizedImage
              src="/images/secadoras5-tablet.jpg"
              alt="Secadoras de granos MEGA en operación - Tablet"
              className="object-cover"
              sizes="100vw"
              priority={true}
              loading="eager"
            />
          </div>
          
          {/* Desktop Image */}
          <div className="hidden xl:block absolute inset-0">
            <OptimizedImage
              src="/images/secadoras5.jpg"
              alt="Secadoras de granos MEGA en operación - Desktop"
              className="object-cover"
              sizes="100vw"
              priority={true}
              loading="eager"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
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
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-primary-foreground/70 leading-relaxed">
              Secadoras de granos MEGA con tecnología de flujo mixto. 140 equipos anuales con capacidad de 17.000 tn/h. 
              Certificaciones ISO 9001, 14001, 45001.
            </p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              Conozca nuestra tecnología en acción
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Vea cómo nuestras secadoras de granos transforman la agricultura moderna con eficiencia y precisión.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <YouTubeThumbnail
              videoId="dQw4w9WgXcQ"
              title="Secadoras de Granos MEGA - Tecnología de Flujo Mixto"
              className="rounded-2xl overflow-hidden shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features Section with Optimized Images */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              Tecnología de <span className="text-accent">flujo mixto</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-8">
              Nuestro sistema patentado de flujo mixto combina las ventajas del flujo concurrente y counterflow 
              para lograr el secado más eficiente del mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Alta Eficiencia",
                description: "Reducción del 35% en consumo energético comparado con sistemas tradicionales.",
                image: "/images/secadoras-eficiencia.jpg"
              },
              {
                title: "Calidad Superior",
                description: "Preservación máxima de la calidad del grano con control preciso de temperatura.",
                image: "/images/secadoras-calidad.jpg"
              },
              {
                title: "Capacidad Variable",
                description: "Sistemas modulares desde 50 hasta 500 toneladas por día.",
                image: "/images/secadoras-capacidad.jpg"
              }
            ].map((feature, index) => (
              <div key={index} className="group bg-card rounded-xl p-6 border border-border hover:border-accent/30 transition-all duration-300">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-4">
                  <OptimizedImage
                    src={feature.image}
                    alt={feature.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section with Lazy Loading */}
      <section className="py-16 sm:py-20 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight mb-6">
              Galería de proyectos realizados
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Conozca algunos de nuestros proyectos más recientes en toda América Latina.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "/images/592471de85052_20160829174057.jpg",
              "/images/5924733dda5a7_20160831TMSASimersExpointerfotoNiltonSantolinIMG6852.jpg",
              "/images/59d4f254b20b6_IMG20150221102103.jpg",
              "/images/5a3a5d3f32ffd_BICEFINANCIACION2017.jpg",
              "/images/6708074350c14_IMG20241004125700.jpg",
              "/images/964cce36-a5c4-48a9-9a72-0ab973046f7e.png"
            ].map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-xl">
                <OptimizedImage
                  src={image}
                  alt={`Proyecto MEGA ${index + 1}`}
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold">Proyecto #{index + 1}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-accent text-accent-foreground p-3 rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  )
}
