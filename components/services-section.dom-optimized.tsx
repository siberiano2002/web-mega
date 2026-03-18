"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"

const products = [
  {
    id: "secadoras",
    title: "Secadoras de Granos",
    description: "Sistemas de secado de alta eficiencia con tecnología de flujo mixto. Capacidades desde 50 hasta 500 tn/día con control automatizado de temperatura y humedad.",
    image: "/images/secadoras2.webp",
    specs: ["50-500 tn/día", "Flujo mixto", "Control PLC"],
  },
  {
    id: "calor",
    title: "Sistemas de Calor Industrial",
    description: "Intercambiadores de calor y sistemas térmicos para procesos industriales. Diseño personalizado con recuperación de energía.",
    image: "/images/slide-gas.webp",
    specs: ["Recup. térm.", "Diseño custom", "Alta durab."],
  },
  {
    id: "renovables",
    title: "Soluciones de Energía Renovable",
    description: "Proyectos integrales de energía solar fotovoltaica para autoconsumo industrial con monitoreo remoto en tiempo real.",
    image: "/images/renewable-energy.webp",
    specs: ["On/Off-grid", "Monitor 24/7", "ROI < 5 años"],
  },
]

// ✅ Componente atómico para productos
function ProductCard({ product }: { product: typeof products[0] }) {
  const getLinkHref = () => {
    switch (product.id) {
      case "secadoras": return "/secadoras"
      case "calor": return "/gas"
      case "renovables": return "/energias-renovables"
      default: return null
    }
  }

  const href = getLinkHref()
  
  return (
    <div className="group bg-card rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Imagen con overlay fusionado */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={800}
          height={600}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Specs badges simplificados */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          {product.specs.map((spec, i) => (
            <span key={i} className="px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium whitespace-nowrap">
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Content simplificado */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
          {product.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {product.description}
        </p>
        {href ? (
          <Link href={href} className="w-full">
            <Button className="w-full rounded-full group/btn border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all">
              Conocer más
              <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            className="w-full rounded-full group/btn border-border hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all"
            onClick={() => {
              const element = document.getElementById("contacto")
              if (element) {
                const yOffset = -80
                const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
                window.scrollTo({ top: y, behavior: "smooth" })
              }
            }}
          >
            Conocer más
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        )}
      </div>
    </div>
  )
}

export function ServicesSection() {
  return (
    <section id="soluciones" className="py-16 sm:py-20 lg:py-32 bg-secondary">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
