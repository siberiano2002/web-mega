"use client"

import { useState, useEffect } from "react"
import { ArrowUp, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"
import Link from "next/link"

interface Section {
  title: string
  content: string
  image: string
}

const sections = [
  {
    title: "RECURSOS TÉCNICOS",
    content: "Ingeniería Mega S.A. cuenta con modernas Máquinas Herramientas (máquinas de corte láser, punzonadoras, plegadoras con CNC, robots), programas CAD - Computer-Aided Design - para diseños en 3D y 2D (AutoCAD - Inventor), programa CAM - Computer-Aided Manufacturing – para fabricación (RADAN) y un sistema ERP- Enterprise Resource Planning – para gestión (SIFAB) que permite instrumentar los avances tecnológicos.",
    image: "/images/MEGA440.webp"
  },
  {
    title: "RECURSOS HUMANOS",
    content: "Las personas son el mayor capital de Ingeniería Mega S.A. Contamos con equipos interdisciplinarios de profesionales, ingenieros, técnicos, dibujantes y programadores, quienes generan nuevos proyectos, gestionan y ejecutan mejoras continuas de productos y servicios.\n\nEl equipo gerencial determina metas y objetivos a partir de análisis de oportunidades y conduce el desarrollo de las actividades de nuestra cadena de valor.",
    image: "/images/964cce36-a5c4-48a9-9a72-0ab973046f7e.webp"
  },
  {
    title: "POSVENTA",
    content: "El equipo de capacitación y entrenamiento de Ingeniería Mega S.A., conformado por ingenieros y técnicos con una amplia experiencia en nuestros productos y servicios, está preparado para dar respuesta efectiva a la demanda de los clientes por su profundo conocimiento sobre el funcionamiento y mantenimiento de los productos.\n\nLos cursos y seminarios de formación que brinda este equipo se implementan en las oficinas del cliente, en el lugar de instalación del proyecto o en Ingeniería Mega S.A.\n\nLas capacitaciones están a cargo de:\n\nIng. Mauricio Heidenreich\nIng. Marcelo Lombardo\nIng. Dario Morales",
    image: "/images/a120d424-bddf-4c44-922d-7796dda90f87.webp"
  }
]

export default function RecursosPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedSection, setSelectedSection] = useState<Section | null>(null)

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

  const openModal = (section: Section) => {
    setSelectedSection(section)
  }

  const closeModal = () => {
    setSelectedSection(null)
  }

  return (
    <main className="overflow-hidden">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative py-24 lg:py-32 bg-background">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/engineering-team.webp"
            alt="Ingeniería MEGA - Recursos"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/90 mb-4">
                Recursos
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                Nuestros <span className="text-accent">Recursos</span>
              </h1>
              <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
                Tecnología de vanguardia, equipo profesional y servicio de posventa 
                para garantizar la máxima calidad y satisfacción del cliente.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Sections */}
      <section id="recursos" className="py-16 sm:py-20 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Recursos Title and Description */}
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Recursos
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                En Ingeniería Mega S.A. contamos con una completa infraestructura de recursos técnicos, humanos y de capacitación que nos permite ofrecer soluciones integrales de alta calidad para el secado de granos y energías renovables.
              </p>
            </div>
          </AnimatedSection>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {sections.map((section, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div 
                  className="text-center cursor-pointer group hover:scale-105 transition-transform duration-300 h-full flex flex-col"
                  onClick={() => openModal(section)}
                >
                  {/* Title */}
                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 group-hover:text-accent transition-colors">
                    {section.title}
                  </h3>

                  {/* Preview Content */}
                  <div className="text-sm lg:text-base text-muted-foreground leading-relaxed mb-6 flex-grow">
                    <div className="line-clamp-4">
                      {section.content.split('\n')[0].substring(0, 100)}...
                    </div>
                  </div>

                  {/* Image */}
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mt-auto">
                    <Image
                      src={section.image}
                      alt={`INGENIERÍA MEGA - ${section.title} - Imagen 1`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>

                  {/* Click Button */}
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-accent text-accent-foreground rounded-full text-xs sm:text-sm font-medium hover:bg-accent/90 transition-colors group-hover:shadow-lg group-hover:shadow-accent/25">
                      Click para ampliar
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Policy Section */}
          <AnimatedSection delay={400}>
            <div className="mt-24 space-y-16">
              {/* Policy Title */}
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Política
                </h2>
              </div>

              {/* Policy Preview */}
              <div className="text-center max-w-4xl mx-auto">
                <div className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  <p className="font-semibold mb-4">SISTEMA DE GESTIÓN INTEGRADO DE LA CALIDAD, AMBIENTAL Y SEGURIDAD Y SALUD EN EL TRABAJO</p>
                  <p className="mb-4">En MEGA nos comprometemos a aplicar los siguientes puntos en la investigación, el desarrollo y la comercialización de soluciones de secado y de energía:</p>
                  <p className="mt-4 text-muted-foreground/60 italic">... Ver política completa para los 7 puntos detallados</p>
                </div>
              </div>

              {/* Policy Images */}
              <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/valfio2.webp"
                    alt="INGENIERÍA MEGA - Política - Imagen 1"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/lomba3.webp"
                    alt="INGENIERÍA MEGA - Política - Imagen 2"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Policy Button */}
              <div className="text-center">
                <button 
                  onClick={() => openModal({
                    title: "POLÍTICA",
                    content: `SISTEMA DE GESTIÓN INTEGRADO DE LA CALIDAD, AMBIENTAL Y SEGURIDAD Y SALUD EN EL TRABAJO

En MEGA nos comprometemos a aplicar los siguientes puntos en la investigación, el desarrollo y la comercialización de soluciones de secado y de energía:

1 - Concientizar a nuestros colaboradores acerca del contexto actual y brindar capacitación continua para actualizar sus conocimientos en lo relacionado al puesto de trabajo para la mejora de la calidad, el cuidado del medio ambiente, la seguridad y la salud en el trabajo.

2 - Proporcionar condiciones de trabajo seguras y saludables para la prevención de lesiones y deterioro de la salud relacionados con el trabajo.

3 - Implementar una gestión que elimine peligros y mitigue riesgos, tomando acciones preventivas para evitar impactos negativos en nuestro entorno, en la calidad de nuestros productos y servicios, y en el cuidado de nuestro personal, colaborando para mitigar los efectos del cambio climático.

4 - Cumplir con todos los requisitos legales aplicables, basándonos en nuestro Sistema de Gestión Integrado, con un enfoque en las necesidades del cliente, promoviendo la protección del medio ambiente y un espacio de trabajo seguro y saludable.

5 - El involucramiento de la dirección para asegurar el cumplimiento de esta Política Integrada en toda la organización y para establecer objetivos claros y medibles para la mejora continua.

6 - Promover la consulta y participación de nuestros empleados.

7 - La implementación, gestión y actualización de nuestro Sistema de Gestión Integrado para mejorar los procesos alcanzados por esta política, y fortalecerlo, volviéndolo más maduro, confiable y respaldatorio.

Esta política será difundida en todos los niveles de la organización, estará disponible a todas las partes interesadas y será revisada periódicamente para asegurar su adecuación.`,
                    image: "/images/valfio2.webp"
                  })}
                  className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:bg-accent/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Ver Política Completa
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Modal */}
      {selectedSection && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-2xl font-bold text-foreground">
                {selectedSection.title}
              </h3>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {/* Content */}
              <div className="text-base lg:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {selectedSection.content}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border">
              <button
                onClick={closeModal}
                className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-accent text-accent-foreground rounded-full shadow-lg hover:bg-accent/90 transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </main>
  )
}
