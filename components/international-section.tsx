"use client"

import { MapPin, ArrowUpRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Additional country markers for expanded coverage
const additionalMarkers = [
  { name: "Ecuador", coordinates: [-78.46, -1.83] as [number, number] },
  { name: "Venezuela", coordinates: [-66.59, 6.42] as [number, number] },
  { name: "México", coordinates: [-102.55, 23.63] as [number, number] },
  { name: "Honduras", coordinates: [-86.24, 15.20] as [number, number] },
  { name: "Nicaragua", coordinates: [-85.21, 12.87] as [number, number] },
  { name: "Panamá", coordinates: [-80.83, 8.54] as [number, number] },
  { name: "República Dominicana", coordinates: [-70.16, 18.74] as [number, number] },
  { name: "Estados Unidos", coordinates: [-95.71, 37.09] as [number, number] },
  { name: "España", coordinates: [-3.75, 40.46] as [number, number] },
  { name: "Francia", coordinates: [2.21, 46.23] as [number, number] },
  { name: "Bielorrusia", coordinates: [27.95, 53.71] as [number, number] },
  { name: "Hungría", coordinates: [19.50, 47.16] as [number, number] },
  { name: "Ucrania", coordinates: [31.17, 48.38] as [number, number] },
  { name: "Rusia", coordinates: [105.32, 61.52] as [number, number] },
  { name: "Rumania", coordinates: [25.42, 44.43] as [number, number] },
  { name: "Indonesia", coordinates: [113.92, -0.79] as [number, number] },
  { name: "Bangladesh", coordinates: [90.36, 23.69] as [number, number] },
  { name: "Turquía", coordinates: [35.24, 38.96] as [number, number] },
  { name: "Kazajstán", coordinates: [66.92, 48.02] as [number, number] },
  { name: "Angola", coordinates: [17.87, -11.20] as [number, number] }
]

const projects = [
  {
    id: 1,
    country: "Argentina",
    city: "Lincoln, Buenos Aires",
    coordinates: [-61.53, -38.87] as [number, number],
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
  }
]

const stats = [
  { label: "Países", value: "+30" },
  { label: "Proyectos Internacionales", value: "+270" },
  { label: "Años de Exportación", value: "+25" },
]

export default function InternationalSection() {
  return (
    <section id="internacional" className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <AnimatedSection>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent mb-4">
              Presencia Global
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              International Engineering Projects
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/70 max-w-3xl mx-auto">
              Desde nuestra base en Argentina, hemos expandido nuestra presencia por Latinoamérica y resto del mundo, llevando soluciones de ingeniería de clase mundial a cada rincón del planeta. Nuestra expansión internacional nos ha permitido establecer alianzas estratégicas y adaptar nuestras tecnologías a las necesidades específicas de cada mercado, consolidándonos como un referente global en el sector industrial con más de 270 instalaciones exitosas en más de 30 países.
            </p>
          </div>
        </AnimatedSection>

        {/* Stats Bar */}
        <AnimatedSection delay={100}>
          <div className="flex justify-center gap-4 md:gap-8 mb-16">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center flex-1 min-w-[80px] md:min-w-[100px]">
                <div className="text-lg md:text-xl lg:text-3xl font-bold text-accent mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-xs lg:text-sm text-primary-foreground/60 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Map Section */}
        <AnimatedSection delay={200}>
          <div className="bg-primary-foreground/5 rounded-2xl p-4 border border-primary-foreground/10 backdrop-blur-sm">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                center: [-60, -20],
                scale: 400,
              }}
              style={{ width: "100%", height: "600px" }}
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
                  >
                    <g className="cursor-pointer group">
                      {/* Pulse animation */}
                      <circle
                        r={project.type === "Headquarters" ? 12 : 8}
                        fill="currentColor"
                        className="text-white animate-ping opacity-75"
                      />
                      {/* Main marker */}
                      <circle
                        r={project.type === "Headquarters" ? 8 : 5}
                        fill="white"
                        stroke="rgba(255, 255, 255, 0.8)"
                        strokeWidth={2}
                      />
                      
                      {/* Country label */}
                      <text
                        x={project.type === "Headquarters" ? 15 : 12}
                        y={-5}
                        className="text-white text-xs font-medium fill-current pointer-events-none select-none"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {project.country}
                      </text>
                    </g>
                  </Marker>
                ))}
                
                {/* Additional country markers */}
                {additionalMarkers.map((marker, index) => (
                  <Marker
                    key={`additional-${index}`}
                    coordinates={marker.coordinates}
                  >
                    <g className="cursor-pointer group">
                      {/* Pulse animation */}
                      <circle
                        r={6}
                        fill="currentColor"
                        className="text-white animate-ping opacity-75"
                      />
                      {/* Main marker */}
                      <circle
                        r={4}
                        fill="white"
                        stroke="rgba(255, 255, 255, 0.8)"
                        strokeWidth={1.5}
                      />
                      
                      {/* Country label */}
                      <text
                        x={10}
                        y={-5}
                        className="text-white text-xs font-medium fill-current pointer-events-none select-none"
                        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.8)" }}
                      >
                        {marker.name}
                      </text>
                    </g>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection delay={300}>
          <div className="text-center mb-12 mt-24">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Casos de <span className="text-accent">éxito</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-primary-foreground/5 rounded-xl p-4 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    project.type === "Headquarters" 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-primary-foreground/10 text-primary-foreground"
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-foreground mb-1">{project.country}</h4>
                    <p className="text-sm text-primary-foreground/60 mb-2">{project.city}</p>
                    <p className="text-xs text-primary-foreground/50 mb-3">{project.type}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-accent">{project.projects}</span>
                      <span className="text-xs text-primary-foreground/50 uppercase">Proyectos</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
