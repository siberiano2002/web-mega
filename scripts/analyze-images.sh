#!/bin/bash

# Script de optimización de imágenes para MEGA
echo "🖼️  ANALIZANDO Y OPTIMIZANDO IMÁGENES DEL PROYECTO MEGA..."

# 1. Analizar imágenes existentes
echo "📊 Analizando imágenes existentes..."
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.webp" \) | while read file; do
    size=$(du -h "$file" | cut -f1)
    dimensions=$(identify "$file" 2>/dev/null | cut -d' ' -f3 || echo "N/A")
    echo "  📁 $file - Tamaño: $size - Dimensiones: $dimensions"
done

# 2. Identificar imágenes pesadas (>500KB)
echo ""
echo "⚠️  IMÁGENES PESADAS (>500KB):"
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +500k | while read file; do
    size=$(du -h "$file" | cut -f1)
    echo "  📦 $file - $size (REQUIERE OPTIMIZACIÓN)"
done

# 3. Sugerir conversiones a WebP/AVIF
echo ""
echo "🔄 IMÁGENES PARA CONVERTIR A WEBP/AVIF:"
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read file; do
    if [[ ! -f "${file%.*}.webp" ]]; then
        echo "  📸 ${file} → ${file%.*}.webp"
    fi
done

# 4. Generar reporte de optimización
echo ""
echo "📋 REPORTE DE OPTIMIZACIÓN:"
cat > image-optimization-report.md << EOF
# Reporte de Optimización de Imágenes - MEGA

## 📊 Análisis Actual

### Imágenes Identificadas:
- **Hero images**: secadoras5.jpg, secadoras5-mobile.jpg, secadoras5-tablet.jpg
- **Service images**: secadoras2.jpg, slide-gas.jpg, renewable-energy.jpg
- **Technology images**: 4d97461e-ec6f-49f2-b5f1-38ce434ce7db.png
- **Logo images**: iconomega.png, logo-adimra2x.png, logo-magriba.png, logo-cafma.png
- **Partner images**: DATAWEB-on.jpg, luzbelito.png
- **Case study images**: slide-secadoras.jpg, educacionyempresas.jpg, etc.

### Problemas Detectados:
1. **Imágenes sin optimizar**: Muchas en formato JPEG/PNG sin WebP/AVIF
2. **Tamaños excesivos**: Algunas imágenes >1MB
3. **Sin dimensiones explícitas**: Uso de fill sin width/height específicos
4. **Sin lazy loading**: Todas las imágenes cargan al inicio
5. **Sin priority**: Solo hero debería tener priority

## 🚀 Estrategias de Optimización

### 1. Conversión a Formatos Modernos
\`\`\`bash
# Convertir a WebP
cwebp -q 80 input.jpg -o output.webp

# Convertir a AVIF
avifenc --min 0 --max 63 --speed 6 input.jpg output.avif
\`\`\`

### 2. Reducción de Tamaño
\`\`\`bash
# Redimensionar imágenes grandes
convert input.jpg -resize 1920x1080 -quality 85 output.jpg

# Optimizar sin perder calidad
optipng -o7 input.png
\`\`\`

### 3. Implementación en Next.js
\`\`\`tsx
// Imagen optimizada para LCP
<Image
  src="/images/secadoras5.jpg"
  alt="Ingeniería MEGA"
  width={1920}
  height={1080}
  priority={true}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Imagen con lazy loading
<Image
  src="/images/secadoras2.jpg"
  alt="Secadoras de granos"
  width={800}
  height={600}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
\`\`\`

## 📈 Métricas de Mejora Esperadas

### Reducción de Peso:
- **JPEG → WebP**: -25% a -35%
- **PNG → WebP**: -40% a -60%
- **Total imágenes**: -30% a -50%

### Mejora en LCP:
- **Actual**: 3.5s - 5s
- **Optimizado**: 1.5s - 2.5s (-50% a -60%)

### Reducción de Bundle:
- **Actual**: ~2MB de imágenes
- **Optimizado**: ~800KB - 1MB (-50% a -60%)

## 🎯 Plan de Acción

### Fase 1: Conversión Inmediata
1. Convertir imágenes hero a WebP/AVIF
2. Optimizar logos y certificaciones
3. Implementar lazy loading en imágenes no críticas

### Fase 2: Optimización Avanzada
1. Redimensionar imágenes según contenedor
2. Implementar placeholders blur
3. Configurar CDN y caché

### Fase 3: Monitoreo
1. Medir LCP con Lighthouse
2. Optimizar según resultados
3. Implementar responsive images
EOF

echo "✅ Análisis completado. Revisar image-optimization-report.md"

# 5. Script de conversión a WebP
echo ""
echo "🔄 GENERANDO SCRIPT DE CONVERSIÓN A WEBP..."
cat > scripts/convert-to-webp.sh << 'EOF'
#!/bin/bash

echo "🔄 Convirtiendo imágenes a WebP..."

# Convertir todas las imágenes JPEG/PNG a WebP
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read file; do
    webp_file="${file%.*}.webp"
    
    if [[ ! -f "$webp_file" ]]; then
        echo "📸 Convirtiendo: $file → $webp_file"
        
        # Usar cwebp si está disponible, sino ImageMagick
        if command -v cwebp &> /dev/null; then
            cwebp -q 80 "$file" -o "$webp_file"
        elif command -v convert &> /dev/null; then
            convert "$file" -quality 85 "$webp_file"
        else
            echo "❌ Instalar cwebp o ImageMagick para convertir imágenes"
            exit 1
        fi
    else
        echo "✅ Ya existe: $webp_file"
    fi
done

echo "🎉 Conversión a WebP completada!"
EOF

chmod +x scripts/convert-to-webp.sh

# 6. Script de optimización de tamaño
echo ""
echo "📏 GENERANDO SCRIPT DE OPTIMIZACIÓN DE TAMAÑO..."
cat > scripts/optimize-image-sizes.sh << 'EOF'
#!/bin/bash

echo "📏 Optimizando tamaños de imágenes..."

# Optimizar imágenes grandes
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" \) -size +500k | while read file; do
    echo "📦 Optimizando: $file"
    
    # Redimensionar si es muy grande
    width=$(identify -format "%w" "$file" 2>/dev/null || echo "0")
    
    if [[ $width -gt 1920 ]]; then
        echo "🔄 Redimensionando: $file (ancho: $width)"
        convert "$file" -resize 1920x1080 -quality 85 "${file%.*}_optimized.jpg"
        mv "${file%.*}_optimized.jpg" "$file"
    fi
    
    # Optimizar JPEG
    if command -v jpegoptim &> /dev/null; then
        jpegoptim --max=85 --strip-all "$file"
    fi
done

# Optimizar PNG
find public/images -type f -name "*.png" -size +200k | while read file; do
    echo "📦 Optimizando PNG: $file"
    
    if command -v optipng &> /dev/null; then
        optipng -o7 "$file"
    elif command -v pngcrush &> /dev/null; then
        pngcrush -rem alla -reduce "$file" "${file%.*}_crushed.png"
        mv "${file%.*}_crushed.png" "$file"
    fi
done

echo "🎉 Optimización de tamaños completada!"
EOF

chmod +x scripts/optimize-image-sizes.sh

echo "✅ Scripts de optimización generados en scripts/"
echo ""
echo "🎯 PRÓXIMOS PASOS:"
echo "1. Ejecutar: ./scripts/convert-to-webp.sh"
echo "2. Ejecutar: ./scripts/optimize-image-sizes.sh"
echo "3. Revisar y aplicar optimizaciones en componentes"
echo "4. Medir LCP con Lighthouse"
