"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ProductImage } from "@/components/ui/optimized-image-v3"

const products = [
  {
    id: 1,
    title: "Secadoras de Granos MEGA",
    description: "Sistemas de secado de alta eficiencia con tecnología de vanguardia para optimizar la calidad y rendimiento de sus granos.",
    image: "/images/Ingeniaria-MEGA-secadora-de-granos.webp",
    fallback: "/images/Ingeniaria-MEGA-secadora-de-granos.jpg",
    features: ["Capacidad 50-500 tn/día", "Eficiencia térmica hasta 92%", "Control automatizado PLC", "Monitoreo remoto IoT"]
  },
  {
    id: 2,
    title: "Infraestructura de Gas",
    description: "Proyectos completos de redes de gas natural, GLP y gas industrial con estándares internacionales de seguridad.",
    image: "/images/Ingeniaria-MEGA-gas.webp",
    fallback: "/images/Ingeniaria-MEGA-gas.jpg",
    features: ["Redes de distribución", "Estaciones de regulación", "Sistemas de seguridad", "Mantenimiento predictivo"]
  },
  {
    id: 3,
    title: "Energías Renovables",
    description: "Soluciones sostenibles con biomasa y energía solar para reducir costos y huella de carbono.",
    image: "/images/Ingeniaria-MEGA-energias-renovables.webp",
    fallback: "/images/Ingeniaria-MEGA-energias-renovables.jpg",
    features: ["Sistemas de biomasa", "Paneles solares", "Hibridación energética", "Monitorización en tiempo real"]
  },
  {
    id: 4,
    title: "Automatización Industrial",
    description: "Sistemas de control y automatización para maximizar la eficiencia y seguridad de sus procesos industriales.",
    image: "/images/4d97461e-ec6f-49f2-b5f1-38ce434ce7db.webp",
    fallback: "/images/4d97461e-ec6f-49f2-b5f1-38ce434ce7db.png",
    features: ["Control PLC", "SCADA/HMI", "Integración de sistemas", "Análisis de datos"]
  }
]

export function ServicesSectionImageOptimizedV2() {
  return (
    <section id="soluciones" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
            Soluciones Integrales
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
            Servicios Industriales
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ofrecemos soluciones completas de ingeniería con tecnología de punta y 
            acompañamiento integral en cada etapa del proyecto.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 flex flex-col h-full"
            >
              {/* ✅ Image Optimization: Product images con WebP/AVIF */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <ProductImage
                  src={product.image}
                  alt={product.title}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 bg-accent rounded-full flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-auto">
                  <Button className="w-full group" variant="outline">
                    Consultar
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8">
            Ver todos los servicios
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
