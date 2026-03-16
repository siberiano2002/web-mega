"use client"

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface MapComponentProps {
  projects: any[]
  activeProject: any
  setActiveProject: (project: any) => void
}

export function MapComponent({ projects, activeProject, setActiveProject }: MapComponentProps) {
  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        center: [-60, -20],
        scale: 400
      }}
      className="w-full h-full"
    >
      <ZoomableGroup>
        <Geographies geography={geoUrl}>
          {({ geographies }: any) =>
            geographies.map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#e0e7ff"
                stroke="#6366f1"
                strokeWidth={0.5}
                className="transition-all duration-200 hover:fill-indigo-200"
              />
            ))
          }
        </Geographies>
        
        {projects.map((project) => (
          <Marker
            key={project.id}
            coordinates={project.coordinates}
            className="cursor-pointer"
            onClick={() => setActiveProject(project)}
          >
            <circle r={8} fill="#ef4444" stroke="#fff" strokeWidth={2} className="transition-all duration-200 hover:r-10" />
          </Marker>
        ))}
      </ZoomableGroup>
    </ComposableMap>
  )
}
