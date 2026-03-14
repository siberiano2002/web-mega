"use client"

import { useState, useEffect } from "react"
import { ArrowUp, X } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"
import Link from "next/link"

const sections = [
  {
    title: "SISTEMA DE GESTIÓN",
    content: "Nuestro Sistema de Gestión Integrado se basa en los siguientes principios:\n\n• Enfoque al cliente: Comprender y superar las expectativas de nuestros clientes.\n• Liderazgo: Establecer dirección y crear condiciones para que el personal se involucre en el logro de los objetivos.\n• Compromiso de las personas: Asegurar que el personal es competente, empoderado y comprometido.\n• Enfoque a procesos: Gestionar las actividades como procesos interrelacionados.\n• Mejora: Buscar continuamente la mejora del desempeño.\n• Toma de decisiones basada en evidencia: Utilizar datos y análisis para tomar decisiones informadas.\n• Gestión de relaciones: Mantener relaciones mutuamente beneficiosas con proveedores y socios.",
    image: ""
  },
  {
    title: "CERTIFICACIONES",
    content: "Contamos con las siguientes certificaciones internacionales que validan nuestro compromiso con la calidad y la sostenibilidad:\n\n• ISO 9001:2015 - Sistema de Gestión de la Calidad\n• ISO 14001:2015 - Sistema de Gestión Ambiental\n• ISO 45001:2018 - Sistema de Gestión de Seguridad y Salud en el Trabajo\n\nEstas certificaciones demuestran nuestra capacidad para proporcionar consistentemente productos y servicios que cumplen con los requisitos del cliente y los reglamentarios, mejorando continuamente nuestros procesos y minimizando nuestro impacto ambiental.",
    image: ""
  }
]

export default function CalidadPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedSection, setSelectedSection] = useState(null)

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

  const openModal = (section) => {
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
            src="/images/engineering-team.jpg"
            alt="Ingeniería MEGA - Calidad"
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
                CALIDAD
              </p>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
                Sistema de Gestión
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Certificaciones internacionales y compromiso con la excelencia en todos nuestros procesos
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Quality Section with Modal */}
          <AnimatedSection delay={300}>
            <div className="mb-24 space-y-16">
              {/* Quality Title */}
              <div className="text-center">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                  Calidad
                </h2>
              </div>

              {/* Quality Preview */}
              <div className="text-center max-w-4xl mx-auto">
                <div className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  <p className="font-semibold">SISTEMAS DE GESTIÓN DE CALIDAD, SEGURIDAD, SALUD OCUPACIONAL Y MEDIO AMBIENTE</p>
                  <p className="mt-4 text-muted-foreground/60 italic">... Ver calidad completa para más detalles sobre certificaciones y compromisos</p>
                </div>
              </div>

              {/* Quality Image */}
              <div className="text-center max-w-sm mx-auto">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src="/images/QR-Certificados_ISO_9001_14001_45001_2025.png"
                    alt="INGENIERÍA MEGA - Calidad - Certificaciones ISO 9001, 14001, 45001 - 2025"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
                </div>
              </div>

              {/* Quality Button */}
              <div className="text-center">
                <button 
                  onClick={() => openModal({
                    title: "CALIDAD",
                    content: `SISTEMAS DE GESTIÓN DE CALIDAD, SEGURIDAD, SALUD OCUPACIONAL Y MEDIO AMBIENTE

Implementamos y mantenemos Sistemas de Gestión de Calidad, Seguridad, Salud Ocupacional y Medio Ambiente de acuerdo a la norma ISO 9001 & ISO 14001.

Nuestro compromiso con la excelencia nos impulsa a establecer estándares rigurosos en todos nuestros procesos, garantizando la satisfacción de nuestros clientes y el cumplimiento de los requisitos normativos.

La certificación ISO 9001 demuestra nuestra capacidad para proporcionar productos y servicios que cumplen con los requisitos del cliente y los reglamentarios aplicables, mientras que la certificación ISO 14001 evidencia nuestro compromiso con la protección ambiental y la sostenibilidad.

Nuestros sistemas de gestión incluyen:

• Procesos estandarizados y documentados
• Auditorías internas y externas regulares
• Capacitación continua del personal
• Mejora continua basada en datos y evidencias
• Cumplimiento normativo y legal
• Monitoreo ambiental y de seguridad
• Satisfacción garantizada del cliente
• Sostenibilidad y responsabilidad social

Estas certificaciones nos posicionan como líderes en la industria, demostrando nuestra capacidad para ofrecer soluciones de alta calidad con un enfoque responsable hacia el medio ambiente y la seguridad de nuestro personal.`,
                    image: "/images/QR-Certificados_ISO_9001_14001_45001_2025.png"
                  })}
                  className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:bg-accent/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Ver Calidad Completa
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Other Sections */}
          <div className="space-y-24">
            {/* Sistema de Gestión Section with Modal */}
            <AnimatedSection delay={400}>
              <div className="space-y-16">
                {/* Sistema de Gestión Title */}
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                    {sections[0].title}
                  </h2>
                </div>

                {/* Sistema de Gestión Preview */}
                <div className="text-center max-w-4xl mx-auto">
                  <div className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                    <p className="font-semibold">Nuestro Sistema de Gestión Integrado se basa en los siguientes principios:</p>
                    <p className="mt-4 text-muted-foreground/60 italic">... Ver sistema completo para los 7 principios detallados</p>
                  </div>
                </div>

                {/* Sistema de Gestión Button */}
                <div className="text-center">
                  <button 
                    onClick={() => openModal(sections[0])}
                    className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:bg-accent/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    Ver Sistema Completo
                  </button>
                </div>
              </div>
            </AnimatedSection>

            {/* Certificaciones Section with Modal */}
            <AnimatedSection delay={500}>
              <div className="space-y-16">
                {/* Certificaciones Title */}
                <div className="text-center">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                    {sections[1].title}
                  </h2>
                </div>

                {/* Certificaciones Preview */}
                <div className="text-center max-w-4xl mx-auto">
                  <div className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                    <p className="font-semibold">Contamos con las siguientes certificaciones internacionales que validan nuestro compromiso con la calidad y la sostenibilidad:</p>
                    <p className="mt-4 text-muted-foreground/60 italic">... Ver certificaciones completas para los 3 sistemas detallados</p>
                  </div>
                </div>

                {/* Certificaciones Button */}
                <div className="text-center">
                  <button 
                    onClick={() => openModal(sections[1])}
                    className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:bg-accent/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
                  >
                    Ver Certificaciones Completas
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
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

      {/* CTA Button */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-full font-semibold text-lg hover:bg-accent/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Trabaje con nosotros</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-12">
                Explorar más sobre MEGA
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link
                  href="/energias-renovables"
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    Energías Renovables
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Soluciones sostenibles para el futuro
                  </p>
                </Link>
                <Link
                  href="/noticias"
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    Noticias
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Últimos proyectos y desarrollos
                  </p>
                </Link>
                <Link
                  href="/empresa"
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    Empresa
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Historia y valores corporativos
                  </p>
                </Link>
                <Link
                  href="/"
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    Inicio
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Volver al inicio
                  </p>
                </Link>
              </div>
            </div>
          </AnimatedSection>
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
    </main>
  )
}
