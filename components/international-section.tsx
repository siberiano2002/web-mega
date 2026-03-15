"use client"

import { useState } from "react"
import { MapPin, ArrowUpRight } from "lucide-react"
import { AnimatedSection, StaggeredChildren } from "./animated-section"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

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
    coordinates: [2.3, 48.9] as [number, number],
    type: "Engineering Services",
    projects: 12,
    description: "Servicios de ingeniería para Europa",
  },
  {
    id: 20,
    country: "Bielorrusia",
    city: "Minsk",
    coordinates: [27.6, 53.9] as [number, number],
    type: "Industrial Equipment",
    projects: 8,
    description: "Equipamiento industrial para Europa del Este",
  },
  {
    id: 21,
    country: "Hungría",
    city: "Budapest",
    coordinates: [19.0, 47.5] as [number, number],
    type: "Energy Systems",
    projects: 10,
    description: "Sistemas energéticos para Europa Central",
  },
  {
    id: 22,
    country: "Ucrania",
    city: "Kiev",
    coordinates: [30.5, 50.4] as [number, number],
    type: "Agricultural Technology",
    projects: 18,
    description: "Tecnología agrícola para Europa del Este",
  },
  {
    id: 23,
    country: "Rusia",
    city: "Moscú",
    coordinates: [37.6, 55.8] as [number, number],
    type: "Heavy Industry",
    projects: 22,
    description: "Equipamiento para industria pesada",
  },
  {
    id: 24,
    country: "Rumania",
    city: "Bucarest",
    coordinates: [26.1, 44.4] as [number, number],
    type: "Energy Solutions",
    projects: 11,
    description: "Soluciones energéticas para los Balcanes",
  },
  {
    id: 25,
    country: "Indonesia",
    city: "Yakarta",
    coordinates: [106.8, -6.2] as [number, number],
    type: "Palm Oil Industry",
    projects: 20,
    description: "Equipamiento para industria de aceite de palma",
  },
  {
    id: 26,
    country: "Bangladesh",
    city: "Daca",
    coordinates: [90.4, 23.8] as [number, number],
    type: "Textile Industry",
    projects: 15,
    description: "Sistemas para industria textil",
  },
  {
    id: 27,
    country: "Turquía",
    city: "Estambul",
    coordinates: [29.0, 41.0] as [number, number],
    type: "Manufacturing",
    projects: 18,
    description: "Equipamiento para manufactura",
  },
  {
    id: 28,
    country: "Kazajstán",
    city: "Almaty",
    coordinates: [76.9, 43.2] as [number, number],
    type: "Mining Industry",
    projects: 12,
    description: "Equipamiento para industria minera",
  },
  {
    id: 29,
    country: "Angola",
    city: "Luanda",
    coordinates: [13.2, -8.8] as [number, number],
    type: "Oil & Gas",
    projects: 9,
    description: "Equipamiento para industria petrolera y gas",
  },
]

const stats = [
  { label: "Países", value: "+30" },
  { label: "Proyectos Int.", value: "+270" },
  { label: "Años Exp.", value: "+25" },
]

export function InternationalSection() {
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="internacional" className="py-16 sm:py-20 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Presencia Global
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              International Engineering Projects
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/70 max-w-3xl mx-auto">
              Desde nuestra base en Argentina, hemos expandido nuestra presencia por el mundo, llevando soluciones de ingeniería de clase a más de 30 países con más de 270 instalaciones exitosas.
            </p>
          </div>
        </AnimatedSection>

        {/* Stats Bar */}
        <AnimatedSection delay={100}>
          <div className="flex justify-center gap-1.5 sm:gap-3 lg:gap-16 mb-8 sm:mb-12 overflow-x-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center flex-shrink-0">
                <div className="text-lg sm:text-xl lg:text-5xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-[9px] sm:text-[10px] text-primary-foreground/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Full Width Map */}
        <AnimatedSection delay={200}>
          <div className="bg-primary-foreground/5 rounded-2xl p-3 sm:p-4 border border-primary-foreground/10 backdrop-blur-sm">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [-60, -20],
                scale: 400,
              }}
              style={{ width: "100%", height: "500px" }}
            >
              <ZoomableGroup>
                <Geographies geography={geoUrl}>
                  {({ geographies }: any) =>
                    geographies.map((geo: any) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="rgba(255,255,255,0.08)"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "rgba(255,255,255,0.12)" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>
                
                {projects.map((project) => (
                  <Marker
                    key={project.id}
                    coordinates={project.coordinates}
                    onMouseEnter={() => setActiveProject(project)}
                    onMouseLeave={() => setActiveProject(null)}
                  >
                    <g className="cursor-pointer">
                      {/* Pulse animation */}
                      <circle
                        r={project.type === "Headquarters" ? 12 : 8}
                        fill="currentColor"
                        className="text-accent/30 animate-ping"
                      />
                      {/* Pulse animation */}
                      <circle
                        r={project.type === "Headquarters" ? 12 : 8}
                        fill="currentColor"
                        className="text-accent/30 animate-ping"
                        style={{ animationDelay: "1s" }}
                      />
                      {/* Main marker */}
                      <circle
                        r={project.type === "Headquarters" ? 8 : 5}
                        fill="currentColor"
                        className={`${
                          activeProject?.id === project.id 
                            ? "text-accent" 
                            : project.type === "Headquarters" 
                              ? "text-accent" 
                              : "text-primary-foreground"
                        } transition-colors`}
                        stroke="currentColor"
                        strokeWidth={2}
                      />
                      {/* Country label */}
                      <text
                        x={project.type === "Headquarters" ? 20 : 15}
                        y={5}
                        fill="currentColor"
                        className={`${
                          activeProject?.id === project.id 
                            ? "text-accent" 
                            : project.type === "Headquarters" 
                              ? "text-accent" 
                              : "text-primary-foreground"
                        } transition-colors text-xs font-medium`}
                        style={{
                          textAnchor: 'start',
                          dominantBaseline: 'middle',
                          fontSize: '12px',
                          fontWeight: '600',
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                        }}
                      >
                        {project.country}
                      </text>
                    </g>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
            
            {/* Active project tooltip */}
            {activeProject && (
              <div className="absolute bottom-8 left-8 bg-card text-card-foreground rounded-xl p-4 shadow-2xl max-w-xs border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{activeProject.country}</h4>
                    <p className="text-sm text-muted-foreground">{activeProject.city}</p>
                    <p className="text-xs text-accent mt-1">{activeProject.projects} proyectos</p>
                    <p className="text-xs text-muted-foreground mt-1">{activeProject.type}</p>
                    <p className="text-xs text-muted-foreground mt-2">{activeProject.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* CTA */}
        <AnimatedSection delay={400}>
          <div className="mt-16 text-center">
            <a 
              href="#contacto" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-semibold hover:bg-accent/90 transition-colors group"
            >
              Expandir a nuevos mercados
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
