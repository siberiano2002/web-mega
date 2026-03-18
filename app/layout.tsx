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
      </head>
      
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
        
        {/* ✅ Analytics con lazy loading - no bloquea render */}
        <Script
          src="https://vercel-analytics.edge.app/api/v1/web"
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  )
}
