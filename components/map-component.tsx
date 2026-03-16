"use client"

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"
import { MapPin } from "lucide-react"

interface MapComponentProps {
  projects: any[]
  activeProject: any
  setActiveProject: (project: any) => void
  geoUrl: string
}

export function MapComponent({ projects, activeProject, setActiveProject, geoUrl }: MapComponentProps) {
  return (
    <div className="bg-primary-foreground/5 rounded-2xl p-3 sm:p-4 border border-primary-foreground/10 backdrop-blur-sm">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [-60, -20],
          rotate: [0, 0, 0],
          scale: 120,
        }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }: any) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="currentColor"
                  fillOpacity={0.1}
                  stroke="currentColor"
                  strokeWidth={0.5}
                  strokeOpacity={0.3}
                  style={{
                    default: {
                      outline: "none",
                    },
                    hover: {
                      fill: "currentColor",
                      fillOpacity: 0.2,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          
          {projects.map((project) => (
            <Marker
              key={project.id}
              coordinates={project.coordinates}
              onClick={() => setActiveProject(project)}
              style={{
                cursor: "pointer",
              }}
            >
              <g
                className={`transition-all duration-300 hover:scale-110 ${
                  activeProject?.id === project.id ? "scale-125" : ""
                }`}
              >
                <circle
                  r="8"
                  fill="currentColor"
                  fillOpacity={0.8}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeOpacity={1}
                  className="text-accent"
                />
                <circle
                  r="3"
                  fill="currentColor"
                  className="text-accent-foreground"
                />
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
              <h4 className="font-semibold text-foreground mb-1">
                {activeProject.country}
              </h4>
              <p className="text-sm text-muted-foreground mb-2">
                {activeProject.city}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{activeProject.projects} proyectos</span>
                <span>•</span>
                <span>{activeProject.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
