import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

// ✅ Fuentes optimizadas para evitar render blocking
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',  // ✅ Permite render con fuente de sistema
  preload: true     // ✅ Preload crítico
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',  // ✅ Permite render con fuente de sistema
  preload: false    // ✅ No preload, carga bajo demanda
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
    <html lang="en">
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
