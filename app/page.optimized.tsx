"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from 'next/dynamic'
import { ArrowUp } from "lucide-react"

// Dynamic imports para componentes pesados
const HeroSection = dynamic(() => import("@/components/hero-section").then(mod => ({ default: mod.HeroSection })), {
  ssr: false,
  loading: () => <div className="h-screen bg-primary animate-pulse" />
})

const KeyMetricsSection = dynamic(() => import("@/components/key-metrics-section").then(mod => ({ default: mod.KeyMetricsSection })), {
  ssr: false,
  loading: () => <div className="h-32 bg-zinc-800 animate-pulse rounded-lg" />
})

const FeaturesSection = dynamic(() => import("@/components/features-section.optimized").then(mod => ({ default: mod.FeaturesSection })), {
  ssr: true,
  loading: () => <div className="h-64 bg-background animate-pulse rounded-lg" />
})

const ServicesSection = dynamic(() => import("@/components/services-section.server").then(mod => ({ default: mod.ServicesSection })), {
  ssr: true,
  loading: () => <div className="h-96 bg-background animate-pulse rounded-lg" />
})

const TechnologySection = dynamic(() => import("@/components/technology-section.server").then(mod => ({ default: mod.TechnologySection })), {
  ssr: true,
  loading: () => <div className="h-96 bg-primary animate-pulse rounded-lg" />
})

const InternationalSection = dynamic(() => import("@/components/international-section").then(mod => ({ default: mod.InternationalSection })), {
  ssr: false,
  loading: () => <div className="h-96 bg-background animate-pulse rounded-lg" />
})

const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })), {
  ssr: false,
  loading: () => <div className="h-96 bg-background animate-pulse rounded-lg" />
})

const Header = dynamic(() => import("@/components/header/header-optimized").then(mod => ({ default: mod.Header })), {
  ssr: false,
  loading: () => <div className="h-16 bg-background animate-pulse" />
})

const Footer = dynamic(() => import("@/components/footer").then(mod => ({ default: mod.Footer })), {
  ssr: true,
  loading: () => <div className="h-32 bg-background animate-pulse" />
})

export default function Home() {
  const [showScrollToTop, setShowScrollToTop] = useState(false)

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    setShowScrollToTop(window.scrollY > 400)
  }, [])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const throttledHandleScroll = () => {
      if (timeoutId) return
      timeoutId = setTimeout(() => {
        handleScroll()
        timeoutId = null as any
      }, 16) // ~60fps
    }

    window.addEventListener("scroll", throttledHandleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", throttledHandleScroll)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [handleScroll])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main>
        <HeroSection />
        <KeyMetricsSection />
        <FeaturesSection />
        <ServicesSection />
        <TechnologySection />
        <InternationalSection />
        <ContactSection />
      </main>

      <Footer />

      {/* Scroll to top button */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 bg-accent text-accent-foreground p-3 rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
