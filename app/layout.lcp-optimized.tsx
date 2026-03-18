import type { Metadata } from 'next'
import { inter, spaceGrotesk, criticalFontCSS } from '../lib/optimized-fonts'
import { CriticalCSS } from '../lib/critical-css'
import { OptimizedScript } from '../components/optimized-script'
import './globals.css'

export const metadata: Metadata = {
  title: 'INGENIERÍA MEGA S.A. - Secadoras de Granos | Energías Renovables | Gas',
  description: 'Especialistas en sistemas de secado de granos, energías renovables y soluciones de gas. Más de 30 años de experiencia en ingeniería industrial en Argentina.',
  generator: 'v0.app',
  icons: {
    icon: '/iconomega.webp',
    apple: '/iconomega.webp',
  },
  // Preconexiones para LCP
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
        {/* Preconexiones críticas */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://vercel.live" />
        
        {/* CSS crítico inline */}
        <style dangerouslySetInnerHTML={{ __html: criticalFontCSS }} />
        
        {/* Preload de fuentes críticas */}
        <link 
          rel="preload" 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" 
          as="style" 
          crossOrigin="anonymous" 
        />
        
        {/* Preload de imágenes críticas */}
        <link rel="preload" href="/images/hero-bg.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/Ingenieria-MEGA.webp" as="image" type="image/webp" />
        <link rel="preload" href="/iconomega.webp" as="image" type="image/png" />
        
        {/* Preload de recursos importantes */}
        <link rel="preload" href="/_next/static/css/main.css" as="style" />
        
        {/* Hints para navegador */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//vercel.live" />
      </head>
      
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <CriticalCSS>
          {children}
        </CriticalCSS>
        
        {/* Scripts no bloqueantes */}
        <OptimizedScript 
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
          defer={true}
          async={true}
        />
        
        {/* Script de detección de carga */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Marcar cuando las fuentes cargan
            document.addEventListener('DOMContentLoaded', function() {
              document.body.classList.add('font-loaded');
            });
            
            // Optimización de LCP
            if ('requestIdleCallback' in window) {
              requestIdleCallback(function() {
                // Precargar imágenes below-the-fold
                const images = document.querySelectorAll('img[data-src]');
                images.forEach(img => {
                  if (img.getBoundingClientRect().top < window.innerHeight * 2) {
                    img.src = img.dataset.src;
                  }
                });
              });
            }
          `
        }} />
      </body>
    </html>
  )
}
