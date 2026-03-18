"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

// ✅ Componentes atómicos para reducir DOM
function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/secadoras5.webp"
        alt="Ingeniería MEGA S.A. - Soluciones industriales integrales"
        width={1920}
        height={1080}
        className="object-cover object-center"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1200px) 80vw, 70vw"
        priority={true}
        loading="eager"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        quality={85}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
    </div>
  )
}

function HeroDecorations() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-3xl" />
    </div>
  )
}

function HeroContent() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const yOffset = -80
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <div className="relative z-10 mx-auto max-w-7xl px-6 text-center animate-fade-in">
      <p className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground/80 mb-6">
        especialistas en
      </p>
      
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-6">
        <span className="block">Soluciones</span>
        <span className="block text-accent">Industriales</span>
      </h1>

      <p className="text-lg text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
        Ingeniería MEGA S.A. es líder en soluciones industriales integrales con más de 25 años de experiencia. 
        Especialistas en automatización, energías renovables, gas e infraestructura industrial.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-4 text-lg font-semibold"
          onClick={() => scrollToSection("soluciones")}
        >
          Explorar Divisiones
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-8 py-4 text-lg font-semibold"
          onClick={() => window.open("https://www.youtube.com/@MEGA-ingenieria", "_blank", "noopener,noreferrer")}
        >
          <Play className="mr-2 h-5 w-5 fill-current" />
          Ver Videos
        </Button>
      </div>
    </div>
  )
}

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex items-center overflow-hidden pt-20 sm:pt-24 lg:pt-32">
      <HeroBackground />
      <HeroDecorations />
      <HeroContent />
    </section>
  )
}
