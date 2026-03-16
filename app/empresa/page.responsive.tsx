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
    title: "HISTORIA",
    content: "Ingeniería Mega S.A. nace en el 1995, del trabajo en equipo de dos ingenieros en la ejecución de obras de MECÁNICA (transformación de secadoras), ELECTRICIDAD (obras industriales y hospitalarias) y GAS (instalaciones de redes, GLP).\n\nEn los años 1996/97 se inicia un nuevo capítulo en la empresa con el desarrollo de un nuevo sistema de secadoras de granos que surgió de la experiencia adquirida durante el trabajo en una fábrica local junto con el diseño y aplicación de reformas en los sistemas de combustión de diesel a gas que optimizó la eficiencia de equipos de diferentes marcas y sistemas de secado.\n\nEn diciembre de 1997, se instaló la primera secadora MEGA en la planta de acopio de la empresa Nidera en la localidad de Bayauca, partido de Lincoln.\n\nEn el período 2000/2001 se radicó la fábrica en el parque industrial de Lincoln, provincia de Buenos Aires. Desde 2003 Ingeniería Mega trabaja en el área de Energías Renovables, diseñando y fabricando equipos para quema de biomasa. Los mismos pueden usarse para distintas operaciones.",
    image: "/images/secadoras6.jpg"
  },
  {
    title: "MISIÓN Y VISIÓN",
    content: "Misión:\nCreamos e implementamos soluciones con la más alta tecnología de secado de granos y acompañamos a nuestros clientes para que obtengan de ellas su máximo potencial.\n\n\n\nVisión:\nSer líderes globales en mercados claves en el diseño e implementación de soluciones de secado para la post cosecha, reconocidos por brindar la más alta tecnología del mercado y acompañamiento al cliente.",
    image: "/images/engineering-team.jpg"
  },
  {
    title: "VALORES",
    content: "Integridad en todas nuestras operaciones y relaciones comerciales. Equipo de profesionales comprometidos con la excelencia. Sostenibilidad con soluciones que respetan el medio ambiente. Innovación constante para ofrecer tecnología de vanguardia.",
    image: "/images/equipo.png"
  },
  {
    title: "COMERCIO EXTERIOR",
    content: "Ingeniería Mega S.A. vende el sistema de secado de granos MEGA, a más de 30 países.\n\nNuestra oficina de comercio exterior conoce los diferentes mercados: sus normativas legales, idiosincrasias, requerimientos, etc..\n\nGracias al esfuerzo de un grupo de trabajo, respaldado por las certificaciones obtenidas, ha llegado a destinos tan diversos como Uruguay, Brasil, Bolivia, Paraguay, Chile, Perú, Ecuador, Colombia, Venezuela, México, Honduras, El Salvador, Nicaragua, Panamá, República Dominicana, Estados Unidos, España, Francia, Bielorrusia, Hungría, Ucrania, Rusia, Rumania, Indonesia, Bangladesh, Turquía, Kazajistán, Angola.",
    image: "/images/historia-04.png"
  }
]

export default function HistoriaPage() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [selectedSection, setSelectedSection] = useState<typeof sections[0] | null>(null)
  const [screenSize, setScreenSize] = useState('desktop')

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }

    const updateScreenSize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile')
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet')
      } else {
        setScreenSize('desktop')
      }
    }

    updateScreenSize()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", updateScreenSize)
    
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", updateScreenSize)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  const openModal = (section: typeof sections[0]) => {
    setSelectedSection(section)
  }

  const closeModal = () => {
    setSelectedSection(null)
  }

  // ✅ Optimización: Seleccionar imagen según tamaño de pantalla
  const getHeroImage = () => {
    switch (screenSize) {
      case 'mobile':
        return '/images/secadoras5-mobile.jpg'
      case 'tablet':
        return '/images/secadoras5-tablet.jpg'
      default:
        return '/images/secadoras5.jpg'
    }
  }

  return (
    <main className="overflow-hidden">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative py-24 lg:py-32 bg-background">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={getHeroImage()}
            alt="Ingeniería MEGA - Historia y Valores"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/40" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-white/90 mb-4">
                La Empresa
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
                Historia y <span className="text-accent">Valores</span>
              </h1>
              <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
                Más de 30 años de experiencia en ingeniería agroindustrial y energías renovables, 
                con presencia internacional y compromiso con la calidad.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Content Sections */}
      <section id="historia" className="py-16 sm:py-20 lg:py-24 bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
              {/* Image */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={selectedSection.image}
                  alt={`INGENIERÍA MEGA - ${selectedSection.title} - Imagen 1`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>

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
                  href="/#contacto"
                  className="group bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5"
                >
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                    Contacto
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Conéctese con nuestro equipo
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
