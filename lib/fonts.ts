import { Inter, Space_Grotesk, Roboto_Mono } from 'next/font/google'

// ✅ Fuentes optimizadas para rendimiento
export const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',      // ✅ Permite render con fallback
  preload: true,        // ✅ Preload crítico
  weight: ['400', '500', '600', '700'], // ✅ Solo pesos necesarios
  style: ['normal', 'italic'], // ✅ Solo estilos necesarios
  fallback: ['system-ui', 'arial', 'sans-serif'] // ✅ Fallback seguro
});

export const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',      // ✅ Permite render con fallback
  preload: false,       // ✅ Carga bajo demanda (no crítico)
  weight: ['400', '500', '600', '700'], // ✅ Solo pesos necesarios
  style: ['normal'], // ✅ Solo estilo necesario
  fallback: ['system-ui', 'arial', 'sans-serif'] // ✅ Fallback seguro
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: '--font-roboto-mono',
  display: 'swap',      // ✅ Permite render con fallback
  preload: false,       // ✅ Carga bajo demanda (solo para código)
  weight: ['400', '500'], // ✅ Solo pesos necesarios
  fallback: ['monospace', 'courier-new'] // ✅ Fallback monospace
});

// ✅ Configuración de preload de fuentes críticas
export const fontPreloads = [
  {
    href: '/fonts/Inter-400.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous' as const
  },
  {
    href: '/fonts/Inter-600.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous' as const
  },
  {
    href: '/fonts/Inter-700.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous' as const
  }
];

// ✅ CSS de fuentes optimizado
export const fontCSS = `
  /* Font Display Optimization */
  .font-inter { font-family: var(--font-inter), system-ui, sans-serif; }
  .font-space-grotesk { font-family: var(--font-space-grotesk), system-ui, sans-serif; }
  .font-roboto-mono { font-family: var(--font-roboto-mono), monospace; }
  
  /* Font Loading States */
  .fonts-loaded .font-inter { font-family: var(--font-inter), Inter, system-ui, sans-serif; }
  .fonts-loaded .font-space-grotesk { font-family: var(--font-space-grotesk), Space Grotesk, system-ui, sans-serif; }
  
  /* Prevent Flash of Unstyled Text (FOUT) */
  body { 
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Font Face declarations para fallback */
  @font-face {
    font-family: 'Inter Fallback';
    src: local('system-ui'), local('Arial'), local('Helvetica');
    font-display: swap;
    ascent-override: 85%;
    descent-override: 25%;
    line-gap-override: 90%;
  }
`;
