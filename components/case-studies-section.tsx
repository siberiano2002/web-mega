"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Quote, TrendingUp, Clock, Award } from "lucide-react"
import { AnimatedSection, StaggeredChildren } from "./animated-section"
import { Button } from "@/components/ui/button"

const caseStudies = [
  {
    id: 1,
    company: "Agroexportadora del Sur",
    industry: "Agroexportación",
    challenge: "Necesitaban aumentar su capacidad de secado en un 150% para la temporada alta sin aumentar costos operativos.",
    solution: "Implementamos un sistema de secado híbrido con recuperación de calor y control automatizado.",
    results: [
      { metric: "+180%", label: "Capacidad" },
      { metric: "-32%", label: "Costos energéticos" },
      { metric: "15 días", label: "Instalación" },
    ],
    testimonial: "MEGA transformó completamente nuestra operación. El retorno de inversión fue menor a 18 meses.",
    author: "Carlos Rodríguez",
    role: "Director de Operaciones",
    image: "/images/slide-secadoras.jpg",
    url: "/secadoras",
  },
  {
    id: 2,
    company: "Cooperativa Agrícola Lincoln",
    industry: "Cooperativa Agrícola",
    challenge: "Reducir el impacto ambiental de sus operaciones y acceder a certificaciones de sustentabilidad.",
    solution: "Diseñamos e instalamos un sistema de biomasa integrado con paneles solares para autoconsumo.",
    results: [
      { metric: "-60%", label: "Emisiones CO2" },
      { metric: "100%", label: "Energía renovable" },
      { metric: "ISO 14001", label: "Certificación" },
    ],
    testimonial: "Gracias a MEGA somos la primera cooperativa de la región en lograr la neutralidad de carbono.",
    author: "María Fernández",
    role: "Presidenta",
    image: "/images/educacionyempresas.jpg",
    url: "/energias-renovables#biomasa",
  },
  {
    id: 3,
    company: "Industrias Pampeanas",
    industry: "Procesamiento Industrial",
    challenge: "Modernizar la infraestructura de gas de una planta de 40 años sin detener la producción.",
    solution: "Ejecutamos una migración por fases con sistemas redundantes y monitoreo continuo.",
    results: [
      { metric: "0 días", label: "Parada producción" },
      { metric: "+25%", label: "Eficiencia" },
      { metric: "20 años", label: "Vida útil" },
    ],
    testimonial: "La planificación y ejecución de MEGA fue impecable. Nunca perdimos un día de producción.",
    author: "Roberto García",
    role: "Gerente de Planta",
    image: "/images/slide-gas.jpg",
    url: "/gas",
  },
  {
    id: 4,
    company: "Capacitaciones Gratuitas MEGA",
    industry: "Educación y Capacitación",
    challenge: "Capacitar gratuitamente a clientes sobre uso y mantenimiento de equipos de secado.",
    solution: "Programa de educación y soporte técnico especializado para clientes.",
    results: [
      { metric: "100%", label: "Gratuito" },
      { metric: "50+", label: "Participantes" },
      { metric: "Lincoln", label: "Ubicación" },
    ],
    testimonial: "La capacitación gratuita nos ayudó a optimizar el uso de nuestros equipos.",
    author: "Cliente MEGA",
    role: "Usuario",
    image: "/images/6708074350c14_IMG20241004125700.webp",
    url: "/secadoras",
  },
]

export function CaseStudiesSection() {
  return (
    <section id="casos" className="py-32 bg-secondary relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Casos de Éxito
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Resultados que hablan por sí solos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Conozca cómo hemos ayudado a empresas líderes a transformar sus operaciones 
              con soluciones de ingeniería de clase mundial.
            </p>
          </div>
        </AnimatedSection>

        {/* Case Studies */}
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <AnimatedSection key={study.id}>
              <Link href={study.url} className="block">
                <div className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-16 items-center group cursor-pointer`}>
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative group">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                      <Image
                        src={study.image}
                        alt={study.company}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="space-y-6">
                    {/* Challenge */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        El Desafío
                      </h4>
                      <p className="text-foreground leading-relaxed">
                        {study.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Nuestra Solución
                      </h4>
                      <p className="text-foreground leading-relaxed">
                        {study.solution}
                      </p>
                    </div>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                      {study.results.map((result, i) => (
                        <div key={i} className="text-center">
                          <div className="text-2xl lg:text-3xl font-bold text-accent">
                            {result.metric}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                            {result.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="bg-card border border-border rounded-xl p-6">
                      <Quote className="h-8 w-8 text-accent/30 mb-4" />
                      <p className="text-foreground italic leading-relaxed mb-4">
                        {`"${study.testimonial}"`}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-sm font-semibold text-foreground">
                            {study.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-foreground text-sm">
                            {study.author}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {study.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={300}>
          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-6">
              ¿Quiere ser nuestro próximo caso de éxito?
            </p>
            <Button
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 h-14 text-base font-semibold"
              onClick={() => {
                const element = document.getElementById("contacto")
                if (!element) return

                const yOffset = -80
                const y =
                  element.getBoundingClientRect().top +
                  window.pageYOffset +
                  yOffset

                window.scrollTo({ top: y, behavior: "smooth" })
              }}
            >
              Solicitar Evaluación Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
