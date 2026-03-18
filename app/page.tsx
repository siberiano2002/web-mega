"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowUp } from "lucide-react"
import Head from "next/head"
import Script from "next/script"
import dynamic from 'next/dynamic'
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { KeyMetricsSection } from "@/components/key-metrics-section"
import { FeaturesSection } from "@/components/features-section"

// ✅ Componentes pesados con lazy loading para reducir bundle inicial
const ServicesSection = dynamic(
  () => import("@/components/services-section").then(mod => ({ default: mod.ServicesSection })),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
  }
)

const TechnologySection = dynamic(
  () => import("@/components/technology-section").then(mod => ({ default: mod.TechnologySection })),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
  }
)

const InternationalSection = dynamic(
  () => import("@/components/international-section").then(mod => ({ default: mod.InternationalSection })),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
  }
)

const NewsPreviewSection = dynamic(
  () => import("@/components/news-preview-section").then(mod => ({ default: mod.NewsPreviewSection })),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
  }
)

const ContactSection = dynamic(
  () => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })),
  { 
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 animate-pulse rounded-lg" />
  }
)

const Footer = dynamic(
  () => import("@/components/footer").then(mod => ({ default: mod.Footer })),
  { 
    ssr: false,
    loading: () => <div className="h-32 bg-gray-100 animate-pulse" />
  }
)

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // ✅ useEffect optimizado con throttling para evitar long tasks
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const handleScroll = () => {
      // ✅ Throttling para no ejecutar en cada pixel de scroll
      if (timeoutId) return

      timeoutId = setTimeout(() => {
        setShowScrollTop(window.scrollY > 400)
      }, 100) // 100ms de throttling
      timeoutId = null
    }

    // ✅ Event listener con passive: true para mejor performance
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  // ✅ Memoizar función de scroll para evitar re-renders
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }, [])

  return (
    <>
      <Head>
        <title>Ingeniería MEGA S.A. | Soluciones Industriales Integrales</title>
        <meta name="description" content="Ingeniería MEGA S.A.: líderes en soluciones industriales integrales. Más de 25 años de experiencia en automatización, energías renovables, gas e ingeniería de proyectos en Argentina y América Latina." />
        <meta name="keywords" content="ingeniería industrial, automatización, energías renovables, gas natural, proyectos industriales, ingeniería MEGA, Argentina, América Latina, soluciones integrales" />
        <meta property="og:title" content="Ingeniería MEGA S.A. | Soluciones Industriales Integrales" />
        <meta property="og:description" content="Líderes en soluciones industriales integrales con más de 25 años de experiencia. Automatización, energías renovables, gas e ingeniería de proyectos." />
        <meta property="og:image" content="https://ingenieriamega.com/images/og-home.jpg" />
        <meta property="og:url" content="https://ingenieriamega.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ingeniería MEGA S.A. | Soluciones Industriales Integrales" />
        <meta name="twitter:description" content="Líderes en soluciones industriales integrales con más de 25 años de experiencia." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://ingenieriamega.com" />
        
        {/* ✅ DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//vercel.live" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Ingeniería MEGA S.A.",
              "url": "https://ingenieriamega.com",
              "logo": "https://ingenieriamega.com/images/logo.png",
              "description": "Líderes en soluciones industriales integrales con más de 25 años de experiencia en automatización, energías renovables, gas e ingeniería de proyectos.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Argentina"
              },
              "areaServed": "Argentina y América Latina",
              "certification": ["ISO 9001", "ISO 14001", "ISO 45001"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Catálogo de Servicios Industriales"
              },
              "serviceType": ["Ingeniería Industrial", "Automatización", "Energías Renovables", "Gas Natural", "Proyectos Integrales"],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+54-11-xxxx-xxxx",
                "contactType": "sales",
                "areaServed": "Argentina y América Latina"
              }
            })
          }} 
        />
      </Head>

      <main className="overflow-hidden">
        {/* ✅ Componentes críticos cargados síncronamente */}
        <Header />
        <HeroSection />
        <KeyMetricsSection />
        <FeaturesSection />
        
        {/* ✅ Componentes pesados con lazy loading */}
        <ServicesSection />
        <TechnologySection />
        <InternationalSection />
        <NewsPreviewSection />
        <ContactSection />
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
