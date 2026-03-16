import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// ✅ Lazy loading para componentes pesados
const TechnologySection = dynamic(() => import('@/components/technology-section.server-optimized').then(mod => ({ default: mod.TechnologySection })), {
  loading: () => <div className="py-20 bg-primary animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-8 bg-white/20 rounded w-1/3 mb-8"></div><div className="grid grid-cols-3 gap-4"><div className="h-32 bg-white/10 rounded"></div><div className="h-32 bg-white/10 rounded"></div><div className="h-32 bg-white/10 rounded"></div></div></div></div>,
  ssr: false
})

const ServicesSection = dynamic(() => import('@/components/services-section.server-optimized').then(mod => ({ default: mod.ServicesSection })), {
  loading: () => <div className="py-20 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-8 bg-muted rounded w-1/3 mb-8"></div><div className="grid grid-cols-3 gap-4"><div className="h-48 bg-muted rounded"></div><div className="h-48 bg-muted rounded"></div><div className="h-48 bg-muted rounded"></div></div></div></div>,
  ssr: false
})

const FeaturesSection = dynamic(() => import('@/components/features-section.server-optimized').then(mod => ({ default: mod.FeaturesSection })), {
  loading: () => <div className="py-20 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-8 bg-muted rounded w-1/3 mb-8"></div><div className="grid grid-cols-4 gap-4"><div className="h-24 bg-muted rounded"></div><div className="h-24 bg-muted rounded"></div><div className="h-24 bg-muted rounded"></div><div className="h-24 bg-muted rounded"></div></div></div></div>,
  ssr: false
})

const KeyMetricsSection = dynamic(() => import('@/components/key-metrics-section.simple').then(mod => ({ default: mod.KeyMetricsSection })), {
  loading: () => <div className="py-16 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="grid grid-cols-3 gap-8"><div className="h-16 bg-muted rounded"></div><div className="h-16 bg-muted rounded"></div><div className="h-16 bg-muted rounded"></div></div></div></div>,
  ssr: false
})

const InternationalSection = dynamic(() => import('@/components/international-section').then(mod => ({ default: mod.InternationalSection })), {
  loading: () => <div className="py-20 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-muted rounded"></div></div></div>,
  ssr: false
})

const CaseStudiesSection = dynamic(() => import('@/components/case-studies-section').then(mod => ({ default: mod.CaseStudiesSection })), {
  loading: () => <div className="py-20 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-muted rounded"></div></div></div>,
  ssr: false
})

const ContactSection = dynamic(() => import('@/components/contact-section').then(mod => ({ default: mod.ContactSection })), {
  loading: () => <div className="py-20 bg-background animate-pulse"><div className="max-w-7xl mx-auto px-6"><div className="h-64 bg-muted rounded"></div></div></div>,
  ssr: false
})

// ✅ Componente de loading optimizado
function SectionLoaderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-muted rounded w-1/3 mb-8 mx-auto"></div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

// ✅ Exportar componentes lazy-loaded
export {
  TechnologySection,
  ServicesSection,
  FeaturesSection,
  KeyMetricsSection,
  InternationalSection,
  CaseStudiesSection,
  ContactSection
}

export { SectionLoaderWrapper as SectionLoader }
