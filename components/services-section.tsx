"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedSection, StaggeredChildren } from "./animated-section"

const products = [
  {
    id: "secadoras",
    title: "Secadoras de Granos",
    description: "Sistemas de secado de alta eficiencia con tecnología de flujo mixto. Capacidades desde 50 hasta 500 tn/día con control automatizado de temperatura y humedad. Diseño modular para fácil instalación y mantenimiento.",
    image: "/images/secadoras2.jpg",
    specs: ["50-500 tn/día", "Flujo mixto", "Control PLC"],
  },
  {
    id: "calor",
    title: "Sistemas de Calor Industrial",
    description: "Intercambiadores de calor y sistemas térmicos para procesos industriales. Diseño personalizado según requerimientos específicos con recuperación de energía y optimización de consumo.",
    image: "/images/slide-gas.jpg",
    specs: ["Recup. térm.", "Diseño custom", "Alta durab."],
  },
  {
    id: "renovables",
    title: "Soluciones de Energía Renovable",
    description: "Proyectos integrales de energía solar fotovoltaica para autoconsumo industrial. Diseño, instalación y mantenimiento de sistemas conectados a red con monitoreo remoto en tiempo real.",
    image: "/images/renewable-energy.jpg",
    specs: ["On/Off-grid", "Monitor 24/7", "ROI < 5 años"],
  },
]

export function ServicesSection() {
  const scrollToContact = () => {
    const element = document.getElementById("contacto")
    if (!element) return

    const yOffset = -80
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset

    window.scrollTo({ top: y, behavior: "smooth" })
  }

  return (
    <section id="soluciones" className="py-16 sm:py-20 lg:py-32 bg-secondary relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Nuestras Soluciones
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Productos y servicios especializados
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ofrecemos la más alta tecnología en secado de granos y soluciones integrales 
              para la industria agropecuaria
            </p>
          </div>
        </AnimatedSection>

        <StaggeredChildren className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const getLinkHref = () => {
              switch (product.id) {
                case "secadoras":
                  return "/secadoras"
                case "calor":
                  return "/gas"
                case "renovables":
                  return "/energias-renovables"
                default:
                  return null
              }
            }

            const href = getLinkHref()
            const handleClick = href ? undefined : scrollToContact

            return (
              <div
                key={product.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={300}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    quality={85}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                  {/* Specs badges */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-nowrap gap-1.5 overflow-x-auto">
                    {product.specs.map((spec, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-medium bg-background/90 backdrop-blur-sm text-foreground rounded-full border border-border/50 whitespace-nowrap flex-shrink-0"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                    {product.description}
                  </p>
                  {href ? (
                    <Link
                      href={href}
                      className="rounded-full group/btn border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      Conocer más
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      className="rounded-full group/btn border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all"
                      onClick={handleClick}
                    >
                      Conocer más
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </StaggeredChildren>
      </div>
    </section>
  )
}
