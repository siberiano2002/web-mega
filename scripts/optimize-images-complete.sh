#!/bin/bash

# Script de optimización de imágenes para MEGA
echo "🖼️  OPTIMIZACIÓN COMPLETA DE IMÁGENES - MEGA"

# 1. Instalar herramientas necesarias
echo "📦 Verificando herramientas de optimización..."
if ! command -v cwebp &> /dev/null; then
    echo "❌ cwebp no encontrado. Instalar con: brew install webp"
fi

if ! command -v optipng &> /dev/null; then
    echo "❌ optipng no encontrado. Instalar con: brew install optipng"
fi

if ! command -v jpegoptim &> /dev/null; then
    echo "❌ jpegoptim no encontrado. Instalar con: brew install jpegoptim"
fi

# 2. Analizar imágenes existentes
echo ""
echo "📊 ANÁLISIS DE IMÁGENES ACTUALES:"
echo "=================================="

# Contar imágenes por tipo
jpg_count=$(find public/images -name "*.jpg" -o -name "*.jpeg" | wc -l)
png_count=$(find public/images -name "*.png" | wc -l)
webp_count=$(find public/images -name "*.webp" | wc -l)

echo "📸 Imágenes JPEG: $jpg_count"
echo "🖼️  Imágenes PNG: $png_count" 
echo "🌐 Imágenes WebP: $webp_count"

# Calcular tamaño total
total_size=$(du -sh public/images 2>/dev/null | cut -f1 || echo "N/A")
echo "💾 Tamaño total: $total_size"

# 3. Identificar imágenes pesadas
echo ""
echo "⚠️  IMÁGENES PESADAS (>500KB):"
echo "=============================="
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) -size +500k | while read file; do
    size=$(du -h "$file" | cut -f1)
    dimensions=$(identify "$file" 2>/dev/null | cut -d' ' -f3 || echo "N/A")
    echo "📦 $file - $size - $dimensions"
done

# 4. Convertir a WebP
echo ""
echo "🔄 CONVERSIÓN A WEBP:"
echo "===================="
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read file; do
    webp_file="${file%.*}.webp"
    
    if [[ ! -f "$webp_file" ]]; then
        echo "📸 Convirtiendo: $(basename "$file") → $(basename "$webp_file")"
        
        if command -v cwebp &> /dev/null; then
            # Calcular calidad según el tamaño original
            original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
            if [[ $original_size -gt 1000000 ]]; then
                quality=75
            elif [[ $original_size -gt 500000 ]]; then
                quality=80
            else
                quality=85
            fi
            
            cwebp -q $quality "$file" -o "$webp_file" 2>/dev/null
            
            if [[ -f "$webp_file" ]]; then
                original_size_mb=$(echo "scale=2; $original_size/1024/1024" | bc 2>/dev/null || echo "N/A")
                webp_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null || echo 0)
                webp_size_mb=$(echo "scale=2; $webp_size/1024/1024" | bc 2>/dev/null || echo "N/A")
                
                if [[ "$original_size_mb" != "N/A" && "$webp_size_mb" != "N/A" ]]; then
                    reduction=$(echo "scale=1; ($original_size_mb - $webp_size_mb) / $original_size_mb * 100" | bc 2>/dev/null || echo "N/A")
                    echo "   ✅ Reducción: ${reduction}% (${original_size_mb}MB → ${webp_size_mb}MB)"
                fi
            fi
        fi
    else
        echo "✅ Ya existe: $(basename "$webp_file")"
    fi
done

# 5. Optimizar imágenes originales
echo ""
echo "📏 OPTIMIZACIÓN DE TAMAÑO:"
echo "========================="
find public/images -type f \( -name "*.jpg" -o -name "*.jpeg" \) -size +200k | while read file; do
    echo "📦 Optimizando: $(basename "$file")"
    
    # Redimensionar si es muy grande
    width=$(identify -format "%w" "$file" 2>/dev/null || echo "0")
    
    if [[ $width -gt 1920 ]]; then
        echo "   🔄 Redimensionando (ancho: ${width}px)"
        if command -v convert &> /dev/null; then
            convert "$file" -resize 1920x1080 -quality 85 "${file%.*}_temp.jpg"
            mv "${file%.*}_temp.jpg" "$file"
        fi
    fi
    
    # Optimizar JPEG
    if command -v jpegoptim &> /dev/null; then
        jpegoptim --max=85 --strip-all "$file" 2>/dev/null
    fi
done

# Optimizar PNG
find public/images -type f -name "*.png" -size +100k | while read file; do
    echo "📦 Optimizando PNG: $(basename "$file")"
    
    if command -v optipng &> /dev/null; then
        optipng -o7 "$file" 2>/dev/null
    fi
done

# 6. Generar reporte final
echo ""
echo "📋 REPORTE FINAL DE OPTIMIZACIÓN:"
echo "=================================="

# Contar imágenes después de optimización
final_jpg_count=$(find public/images -name "*.jpg" -o -name "*.jpeg" | wc -l)
final_png_count=$(find public/images -name "*.png" | wc -l)
final_webp_count=$(find public/images -name "*.webp" | wc -l)
final_total_size=$(du -sh public/images 2>/dev/null | cut -f1 || echo "N/A")

echo "📸 Imágenes JPEG: $final_jpg_count"
echo "🖼️  Imágenes PNG: $final_png_count"
echo "🌐 Imágenes WebP: $final_webp_count"
echo "💾 Tamaño final: $final_total_size"

# Calcular reducción
if [[ "$total_size" != "N/A" && "$final_total_size" != "N/A" ]]; then
    echo "📉 Reducción de tamaño realizada"
fi

# 7. Sugerencias para implementación
echo ""
echo "🎯 SUGERENCIAS DE IMPLEMENTACIÓN:"
echo "================================"
echo "1. 🔄 Reemplazar etiquetas <img> por <Image> de Next.js"
echo "2. 📏 Definir width y height en todas las imágenes"
echo "3. ⚡ Usar loading='lazy' en imágenes no críticas"
echo "4. 🎯 Marcar priority={true} solo en imagen hero"
echo "5. 📱 Asegurar responsive con sizes apropiados"
echo "6. 🌐 Usar WebP/AVIF cuando sea posible"
echo "7. 📊 Medir LCP con Lighthouse después de cambios"

# 8. Comandos útiles
echo ""
echo "🛠️  COMANDOS ÚTILES:"
echo "==================="
echo "# Ver tamaño de imágenes:"
echo "find public/images -exec ls -lh {} \; | sort -k5 -hr"
echo ""
echo "# Convertir manualmente a WebP:"
echo "cwebp -q 80 input.jpg -o output.webp"
echo ""
echo "# Optimizar JPEG:"
echo "jpegoptim --max=85 --strip-all image.jpg"
echo ""
echo "# Optimizar PNG:"
echo "optipng -o7 image.png"

echo ""
echo "✅ Optimización completada!"
echo "🚀 Revisa el reporte y aplica las sugerencias en tu código Next.js"
