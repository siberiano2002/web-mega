import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { OptimizedScript } from '../components/optimized-script'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap', // Mejora el rendimiento de carga
  preload: true // Preload crítico
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: false // No crítico, cargar bajo demanda
})

export const metadata: Metadata = {
  title: 'INGENIERÍA MEGA S.A. - Secadoras de Granos | Energías Renovables | Gas',
  description: 'Especialistas en sistemas de secado de granos, energías renovables y soluciones de gas. Más de 30 años de experiencia en ingeniería industrial en Argentina.',
  generator: 'v0.app',
  icons: {
    icon: '/iconomega.png',
    apple: '/iconomega.png',
  },
  // Optimización de preconexión
  other: {
    'dns-prefetch-control': 'on',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preconexiones a dominios externos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* CSS Crítico Inline - Estilos para above the fold */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* CSS Crítico para render inicial */
            body { font-family: system-ui, -apple-system, sans-serif; }
            .loading-skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); }
            .critical-above-fold { opacity: 1 !important; }
          `
        }} />
        
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/iconomega.png" as="image" type="image/png" />
        <link rel="preload" href="/images/hero-bg.jpg" as="image" type="image/jpeg" />
      </head>
      
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {/* Contenido principal con CSS crítico */}
        <div className="critical-above-fold">
          {children}
        </div>
        
        {/* Scripts optimizados */}
        <OptimizedScript 
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
          defer={true}
          async={true}
        />
        
        {/* Analytics diferido */}
        <OptimizedScript 
          src="/_next/static/chunks/analytics.js"
          strategy="lazyOnload"
          defer={true}
        />
        
        <Analytics />
      </body>
    </html>
  )
}
