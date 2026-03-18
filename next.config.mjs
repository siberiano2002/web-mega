/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ Configuración de Turbopack para Next.js 16
  turbopack: {},
  images: {
    // ✅ Configuración optimizada para LCP y rendimiento
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    // ✅ Calidades optimizadas para balance calidad/peso
    qualities: [75, 85, 90],
    // ✅ Formatos automáticos (WebP/AVIF) con fallback a JPG
    formats: ['image/webp', 'image/avif'],
    // ✅ Usar remotePatterns en lugar de domains (deprecated)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'yt3.ggpht.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      }
    ],
  },
  // ✅ Configurar alias para que @/ apunte a la raíz del proyecto
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './',
    }
    return config
  },
}

export default nextConfig
