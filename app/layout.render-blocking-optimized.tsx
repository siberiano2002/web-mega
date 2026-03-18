import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'

// ✅ Render Blocking Optimized: Fuentes con display swap
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
        {/* ✅ Render Blocking Optimized: CSS crítico inline */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* ✅ Critical CSS - Render Blocking Optimizado */
            * { box-sizing: border-box; }
            body { 
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              margin: 0; 
              font-synthesis: none;
              text-rendering: optimizeLegibility;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* ✅ Prevenir layout shift del hero */
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
            
            /* ✅ Prevent FOUC */
            .fonts-loading body { opacity: 0; }
            .fonts-loaded body { opacity: 1; transition: opacity 0.3s; }
            
            /* ✅ Critical media queries */
            @media (max-width: 768px) {
              .hero-content { padding: 1rem; }
              .hero-buttons { flex-direction: column; }
              .btn-primary, .btn-secondary { width: 100%; text-align: center; }
            }
          `
        }} />
        
        {/* ✅ Render Blocking Optimized: Preload de fuentes críticas */}
        <link rel="preload" href="/fonts/Inter-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-600.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Inter-700.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* ✅ Render Blocking Optimized: DNS prefetch para recursos externos */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//vercel.live" />
        
        {/* ✅ Render Blocking Optimized: Preconnect para recursos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* ✅ Render Blocking Optimized: CSS no crítico diferido */}
        <link
          rel="preload"
          href="/styles/non-critical-v2.css"
          as="style"
          onLoad={(e) => { 
            const link = e.currentTarget;
            link.onload = null; 
            link.rel = 'stylesheet'; 
          }}
        />
        <noscript>
          <link rel="stylesheet" href="/styles/non-critical-v2.css" />
        </noscript>
      </head>
      
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        
        {/* ✅ Render Blocking Optimized: Scripts no críticos con defer */}
        <Script
          src="https://vercel-analytics.edge.app/api/v1/web"
          strategy="afterInteractive"
          defer
          id="vercel-analytics"
        />
        
        {/* ✅ Render Blocking Optimized: Script de optimización de fuentes */}
        <Script
          id="font-optimization"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // ✅ Render Blocking Optimized: Optimización de carga de fuentes
              if ('fonts' in document) {
                document.fonts.ready.then(function() {
                  document.documentElement.classList.add('fonts-loaded');
                });
              }
              
              // ✅ Prevenir FOUC
              document.body.classList.add('fonts-loading');
              
              // ✅ Timeout para evitar bloqueo
              setTimeout(() => {
                document.documentElement.classList.add('fonts-loaded');
                document.body.classList.remove('fonts-loading');
              }, 3000);
              
              // ✅ Render Blocking Optimized: Carga diferida de CSS no crítico
              setTimeout(() => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/styles/non-critical-v2.css';
                document.head.appendChild(link);
              }, 1000);
            `
          }}
        />
      </body>
    </html>
  )
}
