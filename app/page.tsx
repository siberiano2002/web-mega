"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import Head from "next/head"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ServicesSection } from "@/components/services-section"
import { TechnologySection } from "@/components/technology-section"
import { InternationalSection } from "@/components/international-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false)

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
        <script 
          type="application/ld+json" 
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
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <TechnologySection />
      <InternationalSection />
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
