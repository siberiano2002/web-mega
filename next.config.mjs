/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ Configuración de Turbopack para Next.js 16
  turbopack: {},
  // ✅ Optimización para navegadores modernos - reducir polyfills innecesarios
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // ✅ Configuración SWC para optimizar JavaScript moderno
  swcMinify: true,
  compiler: {
    // ✅ Remover React displayName en producción para reducir bundle
    removeConsole: process.env.NODE_ENV === 'production',
  },
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
  webpack: (config, { isServer, dev }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './',
    }
    
    // ✅ Optimizar bundle para navegadores modernos
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    
    // ✅ Reducir polyfills innecesarios en producción
    if (process.env.NODE_ENV === 'production' && !dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      }
    }
    
    return config
  },
}

export default nextConfig
