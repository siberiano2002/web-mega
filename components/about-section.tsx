"use client"

import Image from "next/image"
import { AnimatedSection } from "./animated-section"

const sections = [
  {
    title: "HISTORIA",
    content: "Fundada en 1990, INGENIERÍA MEGA S.A. comenzó como un taller familiar dedicado a la fabricación de equipos para la industria agropecuaria. Con el tiempo, hemos evolucionado hasta convertirnos en líderes en sistemas de secado de granos, expandiendo nuestras operaciones a más de 30 países y desarrollando soluciones integrales para energía renovable."
  },
  {
    title: "MISIÓN Y VISIÓN",
    content: "Nuestra misión es proporcionar soluciones de ingeniería de alta calidad que optimicen los procesos industriales de nuestros clientes, promoviendo la sustentabilidad y la innovación tecnológica. Nuestra visión es ser reconocidos a nivel mundial como líderes en ingeniería agroindustrial y energías renovables, contribuyendo al desarrollo sostenible del sector."
  },
  {
    title: "VALORES",
    content: "Innovación constante para ofrecer tecnología de vanguardia. Calidad certificada con procesos ISO 9001 e ISO 14001. Compromiso con relaciones duraderas basadas en confianza y resultados. Sustentabilidad con soluciones que respetan el medio ambiente. Integridad en todas nuestras operaciones y relaciones comerciales."
  },
  {
    title: "COMERCIO EXTERIOR",
    content: "Con presencia en más de 30 países, hemos desarrollado una sólida red de distribución y servicios internacionales. Nuestra experiencia en comercio exterior nos permite adaptar nuestras soluciones a diferentes mercados y regulaciones, garantizando el cumplimiento de estándares internacionales y ofreciendo soporte técnico local dondequiera que operemos."
  }
]

export function AboutSection() {
  return (
    <section id="empresa" className="py-32 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection>
          <div className="text-center mb-20">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              La Empresa
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Conozca <span className="text-accent">MEGA</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Más de 30 años de experiencia en ingeniería agroindustrial y energías renovables, 
              con presencia internacional y compromiso con la calidad.
            </p>
          </div>
        </AnimatedSection>

        {/* Content Sections */}
        <div className="space-y-24">
          {sections.map((section, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                {/* Content */}
                <div className="space-y-6">
                  <h3 className="text-4xl lg:text-5xl font-bold text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </div>

                {/* Image */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/engineering-team.webp"
                    alt={`INGENIERÍA MEGA - ${section.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={500}>
          <div className="mt-24 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold">
              <span>Forme parte de nuestra red de contactos</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
