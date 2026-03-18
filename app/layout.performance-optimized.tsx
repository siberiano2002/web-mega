import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// ✅ Fuentes optimizadas con display: swap y preload
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',      // ✅ Permite render con fallback
  preload: true,        // ✅ Preload crítico
  weight: ['400', '600', '700'] // ✅ Solo pesos necesarios
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',      // ✅ Permite render con fallback
  preload: false,       // ✅ Carga bajo demanda
  weight: ['400', '700'] // ✅ Solo pesos necesarios
});

export const metadata: Metadata = {
  title: 'INGENIERÍA MEGA S.A. - Secadoras de Granos | Energías Renovables | Gas',
  description: 'Especialistas en sistemas de secado de granos, energías renovables y soluciones de gas. Más de 30 años de experiencia en ingeniería industrial en Argentina.',
  generator: 'v0.app',
  icons: {
    icon: '/iconomega.webp',
    apple: '/iconomega.webp',
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
        {/* ✅ Preload de imagen LCP existente */}
        <link
          rel="preload"
          as="image"
          href="/images/secadoras5.webp"
          imageSizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
        />
        
        {/* ✅ DNS prefetch y preconnect para recursos externos */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* ✅ Preload de fuentes críticas */}
        <link rel="preload" href="/fonts/Inter-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* ✅ CSS crítico inline para Above the Fold */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* CSS Crítico para Above the Fold */
            body { font-family: system-ui, -apple-system, sans-serif; margin: 0; }
            .hero-section { min-height: 70vh; display: flex; align-items: center; position: relative; }
            .hero-background { position: absolute; inset: 0; z-index: -1; }
            .hero-content { position: relative; z-index: 1; max-width: 7xl; margin: 0 auto; padding: 2rem; }
            .hero-title { font-size: 2.5rem; font-weight: 700; color: white; margin-bottom: 1rem; }
            .hero-description { font-size: 1.125rem; color: rgba(255,255,255,0.7); margin-bottom: 2rem; }
            .hero-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
            .btn-primary { background: #3b82f6; color: white; padding: 0.75rem 2rem; border-radius: 9999px; text-decoration: none; font-weight: 600; }
            .btn-secondary { border: 1px solid rgba(255,255,255,0.3); color: white; padding: 0.75rem 2rem; border-radius: 9999px; text-decoration: none; font-weight: 600; }
            @media (max-width: 768px) {
              .hero-title { font-size: 2rem; }
              .hero-description { font-size: 1rem; }
              .hero-content { padding: 1rem; }
            }
          `
        }} />
        
        {/* ✅ CSS no crítico diferido */}
        <link
          rel="preload"
          href="/styles/non-critical.css"
          as="style"
          onLoad={(e) => { 
            const link = e.currentTarget;
            link.onload = null; 
            link.rel = 'stylesheet'; 
          }}
        />
        <noscript>
          <link rel="stylesheet" href="/styles/non-critical.css" />
        </noscript>
      </head>
      
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {/* ✅ Contenido crítico renderizado inmediatamente */}
        <div id="critical-content">
          {children}
        </div>
        
        {/* ✅ Scripts no críticos con defer */}
        <Script
          src="https://vercel-analytics.edge.app/api/v1/web"
          strategy="afterInteractive"
          defer
        />
        
        {/* ✅ Script de carga diferida de CSS */}
        <Script
          id="load-non-critical-css"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Cargar CSS no crítico después del render inicial
              setTimeout(() => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/styles/non-critical.css';
                document.head.appendChild(link);
              }, 1000);
            `
          }}
        />
        
        {/* ✅ Script de optimización de fuentes */}
        <Script
          id="font-optimization"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Optimización de carga de fuentes
              if ('fonts' in document) {
                document.fonts.ready.then(function() {
                  document.documentElement.classList.add('fonts-loaded');
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}
