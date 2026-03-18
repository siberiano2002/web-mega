'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import { useState, useEffect } from 'react'

interface HeroSectionProps {
  title: string
  description: string
  backgroundImage: string
  ctaText?: string
  ctaHref?: string
}

export function HeroSectionLCP({ 
  title, 
  description, 
  backgroundImage,
  ctaText = "Contactar",
  ctaHref = "#contacto"
}: HeroSectionProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Priorizar carga del hero inmediatamente
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-primary text-primary-foreground">
      {/* Background image - Responsive */}
      <div className="absolute inset-0">
        {/* Mobile Image - Visible only on small screens */}
        <div className="lg:hidden absolute inset-0">
          <Image
            src="/images/secadoras5-mobile.webp"
            alt="Ingeniería MEGA - Soluciones industriales - Mobile"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        </div>
        
        {/* Tablet Image - Visible only on medium screens */}
        <div className="hidden lg:block xl:hidden absolute inset-0">
          <Image
            src="/images/secadoras5-tablet.webp"
            alt="Ingeniería MEGA - Soluciones industriales - Tablet"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        </div>
        
        {/* Desktop Image - Visible only on large screens */}
        <div className="hidden xl:block absolute inset-0">
          <Image
            src="/images/secadoras5.webp"
            alt="Ingeniería MEGA - Soluciones industriales - Desktop"
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
          <div className={`transition-all duration-1000 transform ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <p className="inline-flex items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
              especialistas en
            </p>
            <h1 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-tight">
              Ingeniería Industrial de{" "}
              <span className="text-accent">Alta Tecnología</span>
            </h1>
            <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-primary-foreground/80 leading-relaxed">
              {description}
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                asChild
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-black/10 hover:bg-white/10 transition-colors"
              >
                <a href={ctaHref}>
                  {ctaText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button 
                asChild
                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-black/10 hover:bg-white/10 transition-colors"
              >
                <a href="https://www.youtube.com/@MEGA-ingenieria" target="_blank" rel="noopener noreferrer">
                  Ver videos
                  <Play className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
