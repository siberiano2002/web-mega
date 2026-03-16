"use client"

import { useState } from "react"
import { MapPin, ArrowUpRight } from "@/lib/icons-optimized"
import { AnimatedSection } from "./animated-section"

const projects = [
  {
    id: 1,
    country: "Argentina",
    city: "Lincoln, Buenos Aires",
    coordinates: [-61.53, -38.5] as [number, number],
    type: "Headquarters",
    projects: 120,
    description: "Casa matriz y planta de fabricación principal",
  },
  {
    id: 2,
    country: "Brasil",
    city: "São Paulo",
    coordinates: [-46.63, -23.55] as [number, number],
    type: "Grain Dryers",
    projects: 45,
    description: "Instalaciones de secadoras para el agronegocio brasileño",
  },
  {
    id: 3,
    country: "Paraguay",
    city: "Asunción",
    coordinates: [-57.63, -25.28] as [number, number],
    type: "Biomass & Dryers",
    projects: 28,
    description: "Sistemas de biomasa y secado de granos",
  },
  {
    id: 4,
    country: "Uruguay",
    city: "Montevideo",
    coordinates: [-56.16, -34.9] as [number, number],
    type: "Renewable Energy",
    projects: 15,
    description: "Proyectos de energía renovable y gas",
  },
  {
    id: 5,
    country: "Bolivia",
    city: "Santa Cruz",
    coordinates: [-63.18, -17.78] as [number, number],
    type: "Industrial Heat",
    projects: 22,
    description: "Sistemas térmicos para agroindustria",
  },
  {
    id: 6,
    country: "Chile",
    city: "Santiago",
    coordinates: [-70.65, -33.45] as [number, number],
    type: "Gas Systems",
    projects: 18,
    description: "Infraestructura de gas industrial",
  },
  {
    id: 7,
    country: "Perú",
    city: "Lima",
    coordinates: [-77.04, -12.05] as [number, number],
    type: "Grain Dryers",
    projects: 12,
    description: "Secadoras de granos para la costa peruana",
  },
  {
    id: 8,
    country: "Colombia",
    city: "Bogotá",
    coordinates: [-74.07, 4.71] as [number, number],
    type: "Biomass",
    projects: 8,
    description: "Generadores de calor a biomasa",
  },
  {
    id: 9,
    country: "Ecuador",
    city: "Quito",
    coordinates: [-78.5, -0.2] as [number, number],
    type: "Industrial Systems",
    projects: 10,
    description: "Sistemas industriales para la región andina",
  },
  {
    id: 10,
    country: "Venezuela",
    city: "Caracas",
    coordinates: [-66.9, 10.5] as [number, number],
    type: "Energy Solutions",
    projects: 6,
    description: "Soluciones energéticas para industria petrolera",
  },
  {
    id: 11,
    country: "México",
    city: "Ciudad de México",
    coordinates: [-99.1, 19.4] as [number, number],
    type: "Industrial Equipment",
    projects: 25,
    description: "Equipamiento industrial para manufactura",
  },
  {
    id: 12,
    country: "Honduras",
    city: "Tegucigalpa",
    coordinates: [-87.2, 14.1] as [number, number],
    type: "Agricultural Systems",
    projects: 8,
    description: "Sistemas para agricultura tropical",
  },
  {
    id: 14,
    country: "Nicaragua",
    city: "Managua",
    coordinates: [-86.3, 12.1] as [number, number],
    type: "Renewable Energy",
    projects: 7,
    description: "Proyectos de energía renovable",
  },
  {
    id: 15,
    country: "Panamá",
    city: "Panamá",
    coordinates: [-79.5, 8.9] as [number, number],
    type: "Logistics Systems",
    projects: 9,
    description: "Sistemas para logística y almacenamiento",
  },
  {
    id: 16,
    country: "República Dominicana",
    city: "Santo Domingo",
    coordinates: [-69.9, 18.5] as [number, number],
    type: "Tourism Industry",
    projects: 4,
    description: "Equipamiento para industria turística",
  },
  {
    id: 17,
    country: "Estados Unidos",
    city: "Miami",
    coordinates: [-80.2, 25.8] as [number, number],
    type: "Technology Solutions",
    projects: 35,
    description: "Soluciones tecnológicas para América Latina",
  },
  {
    id: 18,
    country: "España",
    city: "Madrid",
    coordinates: [-3.7, 40.4] as [number, number],
    type: "European Operations",
    projects: 15,
    description: "Operaciones para mercado europeo",
  },
  {
    id: 19,
    country: "Francia",
    city: "París",
    type: "Engineering Services",
    projects: 12,
    description: "Servicios de ingeniería para Europa",
  },
  {
    id: 20,
    country: "Bielorrusia",
    city: "Minsk",
    type: "Industrial Equipment",
    projects: 8,
    description: "Equipamiento industrial para Europa del Este",
  },
  {
    id: 21,
    country: "Hungría",
    city: "Budapest",
    type: "Energy Systems",
    projects: 10,
    description: "Sistemas energéticos para Europa Central",
  },
  {
    id: 22,
    country: "Ucrania",
    city: "Kiev",
    type: "Agricultural Technology",
    projects: 18,
    description: "Tecnología agrícola para Europa del Este",
  },
  {
    id: 23,
    country: "Rusia",
    city: "Moscú",
    type: "Heavy Industry",
    projects: 22,
    description: "Equipamiento para industria pesada",
  },
  {
    id: 24,
    country: "Rumania",
    city: "Bucarest",
    type: "Energy Solutions",
    projects: 11,
    description: "Soluciones energéticas para los Balcanes",
  },
  {
    id: 25,
    country: "Indonesia",
    city: "Yakarta",
    type: "Palm Oil Industry",
    projects: 20,
    description: "Equipamiento para industria de aceite de palma",
  },
  {
    id: 26,
    country: "Bangladesh",
    city: "Daca",
    type: "Textile Industry",
    projects: 15,
    description: "Sistemas para industria textil",
  },
  {
    id: 27,
    country: "Turquía",
    city: "Estambul",
    type: "Manufacturing",
    projects: 18,
    description: "Equipamiento para manufactura",
  },
  {
    id: 28,
    country: "Kazajstán",
    city: "Almaty",
    type: "Mining Industry",
    projects: 12,
    description: "Equipamiento para industria minera",
  },
  {
    id: 29,
    country: "Angola",
    city: "Luanda",
    type: "Oil & Gas",
    projects: 9,
    description: "Equipamiento para industria petrolera y gas",
  },
]

export function InternationalSection() {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="internacional" className="py-16 sm:py-20 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection delay={100}>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="text-white">Presencia </span>
              <span className="text-accent">Internacional</span>
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              Más de 30 años de experiencia en proyectos internacionales, 
              llevando soluciones de ingeniería de calidad a toda América Latina.
            </p>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">
                +30
              </div>
              <div className="text-sm text-primary-foreground/70">
                Países
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">
                +270
              </div>
              <div className="text-sm text-primary-foreground/70">
                Proyectos
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">
                500+
              </div>
              <div className="text-sm text-primary-foreground/70">
                Instalaciones
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">
                24/7
              </div>
              <div className="text-sm text-primary-foreground/70">
                Soporte
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Map Placeholder - Simplificado para evitar errores */}
        <AnimatedSection delay={300}>
          <div className="bg-primary-foreground/5 rounded-2xl p-8 sm:p-12 border border-primary-foreground/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="text-center p-4 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors cursor-pointer"
                    onClick={() => setActiveProject(project)}
                  >
                    <div className="w-4 h-4 bg-accent rounded-full mx-auto mb-2"></div>
                    <h4 className="font-semibold text-white text-sm mb-1">{project.country}</h4>
                    <p className="text-xs text-primary-foreground/70">{project.city}</p>
                  </div>
                ))}
              </div>
              
              {/* Active project details */}
              {activeProject && (
                <div className="bg-card text-card-foreground rounded-xl p-6 max-w-md mx-auto border border-border">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-lg mb-1">{activeProject.country}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{activeProject.city}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                          {activeProject.type}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {activeProject.projects} proyectos
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activeProject.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={400}>
          <div className="mt-16 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              ¿Listo para tu próximo proyecto internacional?
            </h3>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Contáctanos y descubre cómo nuestra experiencia puede beneficiar tu operación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 py-3 text-sm font-semibold transition-colors"
              >
                <MapPin className="w-4 h-4" />
                Contactar para Proyectos Internacionales
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
