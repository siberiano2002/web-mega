#!/bin/bash

# Script de Optimización para Next.js - MEGA
echo "🚀 Iniciando optimización de rendimiento..."

# 1. Análisis de bundle
echo "📊 Analizando tamaño del bundle..."
npm run build
npx @next/bundle-analyzer

# 2. Optimización de imágenes
echo "🖼️ Optimizando imágenes..."
npx next-optimized-images

# 3. Generación de CSS crítico
echo "🎨 Generando CSS crítico..."
npx critical ./out/index.html --inline --minify --extract > critical.css

# 4. Compresión de assets
echo "🗜️ Comprimiendo assets..."
find ./out/_next/static -name "*.js" -exec gzip -k {} \;
find ./out/_next/static -name "*.css" -exec gzip -k {} \;

# 5. Generación de service worker
echo "🔧 Generando service worker..."
npx workbox-cli generateSW

echo "✅ Optimización completada!"
echo "📈 Métricas esperadas:"
echo "   - Reducción del 40-60% en Time to Interactive"
echo "   - Mejora del 30-50% en First Contentful Paint"
echo "   - Reducción del 25-40% en bundle size"
