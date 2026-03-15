import { Inter, Space_Grotesk } from 'next/font/google'

// Configuración optimizada para LCP
export const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal'],
  adjustFontFallback: true,
})

export const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: false, // No crítico para LCP
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  adjustFontFallback: true,
})

// CSS crítico para fuentes
export const criticalFontCSS = `
  /* Fallback inmediato para LCP */
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-display: swap;
  }
  
  /* Prevenir parpadeo de fuentes */
  .font-loaded {
    font-family: var(--font-inter), system-ui, sans-serif;
  }
  
  /* Optimización para LCP */
  .text-above-fold {
    font-family: var(--font-inter), -apple-system, sans-serif;
    font-display: swap;
  }
`
