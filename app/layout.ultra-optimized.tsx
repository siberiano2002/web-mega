import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { FontOptimization } from '@/components/font-optimization'
import { fontPreloads } from '@/lib/fonts'

// ✅ Fuentes ultra-optimizadas
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: ['400', '600', '700'],
  fallback: ['system-ui', 'arial', 'sans-serif']
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: false, // No crítico para el render inicial
  weight: ['400', '700'],
  fallback: ['system-ui', 'arial', 'sans-serif']
});

export const metadata: Metadata = {
  title: 'INGENIERÍA MEGA S.A. - Secadoras de Granos | Energías Renovables | Gas',
  description: 'Especialistas en sistemas de secado de granos, energías renovables y soluciones de gas. Más de 30 años de experiencia en ingeniería industrial en Argentina.',
  generator: 'v0.app',
  icons: {
    icon: '/iconomega.png',
    apple: '/iconomega.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="fonts-loading">
      <head>
        {/* ✅ Preload de imagen LCP */}
        <link
          rel="preload"
          as="image"
          href="/images/secadoras5.jpg"
          imageSizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1920px"
        />
        
        {/* ✅ Preload de fuentes críticas */}
        {fontPreloads.map((font, index) => (
          <link
            key={index}
            rel="preload"
            href={font.href}
            as={font.as}
            type={font.type}
            crossOrigin={font.crossOrigin}
          />
        ))}
        
        {/* ✅ DNS prefetch y preconnect */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//vercel.live" />
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* ✅ CSS crítico inline (Above the Fold) */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* CSS Crítico para renderizado inmediato */
            * { box-sizing: border-box; }
            body { 
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              margin: 0; 
              font-synthesis: none;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .hero-section { 
              min-height: 70vh; 
              display: flex; 
              align-items: center; 
              position: relative; 
              background: #1e293b;
              color: white;
            }
            .hero-background { 
              position: absolute; 
              inset: 0; 
              z-index: -1; 
              background: linear-gradient(rgba(30,41,59,0.95), rgba(30,41,59,0.8));
            }
            .hero-content { 
              position: relative; 
              z-index: 1; 
              max-width: 1280px; 
              margin: 0 auto; 
              padding: 2rem; 
            }
            .hero-title { 
              font-size: clamp(2rem, 5vw, 4rem); 
              font-weight: 700; 
              color: white; 
              margin-bottom: 1rem; 
              line-height: 1.1;
            }
            .hero-description { 
              font-size: clamp(1rem, 2vw, 1.25rem); 
              color: rgba(255,255,255,0.8); 
              margin-bottom: 2rem; 
              line-height: 1.6;
            }
            .hero-buttons { 
              display: flex; 
              gap: 1rem; 
              flex-wrap: wrap; 
            }
            .btn-primary { 
              background: #3b82f6; 
              color: white; 
              padding: 0.75rem 2rem; 
              border-radius: 9999px; 
              text-decoration: none; 
              font-weight: 600; 
              border: none;
              cursor: pointer;
              transition: all 0.2s;
            }
            .btn-primary:hover { 
              background: #2563eb; 
              transform: translateY(-1px);
            }
            .btn-secondary { 
              border: 1px solid rgba(255,255,255,0.3); 
              color: white; 
              padding: 0.75rem 2rem; 
              border-radius: 9999px; 
              text-decoration: none; 
              font-weight: 600; 
              background: transparent;
              cursor: pointer;
              transition: all 0.2s;
            }
            .btn-secondary:hover { 
              background: rgba(255,255,255,0.1); 
              transform: translateY(-1px);
            }
            
            /* Loading states */
            .skeleton { 
              background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); 
              background-size: 200% 100%; 
              animation: loading 1.5s infinite; 
            }
            @keyframes loading { 
              0% { background-position: 200% 0; } 
              100% { background-position: -200% 0; } 
            }
            
            /* Prevent FOUC */
            .fonts-loading body { opacity: 0; }
            .fonts-loaded body { opacity: 1; transition: opacity 0.3s; }
            
            /* Critical media queries */
            @media (max-width: 768px) {
              .hero-content { padding: 1rem; }
              .hero-buttons { flex-direction: column; }
              .btn-primary, .btn-secondary { width: 100%; text-align: center; }
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
        {/* ✅ Optimización de fuentes */}
        <FontOptimization />
        
        {/* ✅ Contenido crítico renderizado inmediatamente */}
        <div id="critical-content">
          {children}
        </div>
        
        {/* ✅ Scripts no críticos optimizados */}
        <Script
          src="https://vercel-analytics.edge.app/api/v1/web"
          strategy="afterInteractive"
          defer
          id="vercel-analytics"
        />
        
        {/* ✅ Script de carga diferida de recursos no críticos */}
        <Script
          id="load-non-critical-resources"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Cargar CSS no crítico después del render inicial
              setTimeout(() => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/styles/non-critical.css';
                document.head.appendChild(link);
                
                // Marcar que las fuentes están cargadas
                document.documentElement.classList.add('fonts-loaded');
              }, 500);
              
              // Lazy loading de imágenes below the fold
              if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      const img = entry.target as HTMLImageElement;
                      if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                      }
                    }
                  });
                });
                
                document.querySelectorAll('img[data-src]').forEach(img => {
                  imageObserver.observe(img);
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}
