"use client"

import { OptimizedImage } from "@/components/ui/optimized-image-v2"

const services = [
  {
    id: "secadoras",
    title: "Secadoras de Granos",
    description: "Sistemas de secado de alta eficiencia con tecnología de flujo mixto. Capacidades desde 50 hasta 500 tn/día con control automatizado de temperatura y humedad.",
    image: "/images/secadoras2.jpg",
    specs: ["50-500 tn/día", "Flujo mixto", "Control PLC"],
  },
  {
    id: "calor",
    title: "Sistemas de Calor Industrial",
    description: "Intercambiadores de calor y sistemas térmicos para procesos industriales. Diseño personalizado según requerimientos específicos con recuperación de energía.",
    image: "/images/slide-gas.jpg",
    specs: ["Recup. térm.", "Diseño custom", "Alta durab."],
  },
  {
    id: "renovables",
    title: "Soluciones de Energía Renovable",
    description: "Proyectos integrales de energía solar fotovoltaica para autoconsumo industrial. Diseño, instalación y mantenimiento de sistemas conectados a red.",
    image: "/images/renewable-energy.jpg",
    specs: ["On/Off-grid", "Monitor 24/7", "ROI < 5 años"],
  },
]

export function ServicesSection() {
  return (
    <section id="soluciones" className="py-16 sm:py-20 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
            Soluciones Industriales
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Soluciones integrales para la industria moderna
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Ofrecemos soluciones tecnológicas de vanguardia adaptadas a las necesidades específicas de cada cliente, 
            garantizando eficiencia, seguridad y sostenibilidad en cada proyecto.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5"
            >
              {/* ✅ Optimized Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <OptimizedImage
                  src={service.image}
                  alt={service.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                {/* Specs badges */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-nowrap gap-1.5 overflow-x-auto">
                  {service.specs.map((spec, i) => (
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
              <div className="p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {service.description}
                </p>

                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contacto')
                    contactSection?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors group"
                >
                  Consultar
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
