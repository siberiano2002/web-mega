#!/usr/bin/env node

/**
 * Script para convertir imágenes a WebP automáticamente usando Sharp
 * Next.js - Proyecto MEGA
 * Requiere: npm install sharp
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuración
const PUBLIC_DIR = path.join(__dirname, '../public');
const QUALITY = 80; // Calidad WebP (75-85 recomendado)
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];
const LOG_FILE = path.join(__dirname, '../webp-conversion-sharp.log');

// Función de logging
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  
  // Guardar en archivo de log
  fs.appendFileSync(LOG_FILE, logMessage + '\n');
}

// Verificar si Sharp está disponible
function checkSharp() {
  try {
    require('sharp');
    return true;
  } catch (error) {
    log('❌ Sharp no está instalado. Por favor instala Sharp:');
    log('   npm install sharp');
    log('   o yarn add sharp');
    return false;
  }
}

// Convertir una imagen a WebP usando Sharp
async function convertToWebp(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    
    // Verificar si el archivo se creó
    if (fs.existsSync(outputPath)) {
      const originalSize = fs.statSync(inputPath).size;
      const webpSize = fs.statSync(outputPath).size;
      const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
      
      log(`✅ Convertido: ${path.basename(inputPath)} → ${path.basename(outputPath)} (ahorro: ${savings}%)`);
      return true;
    } else {
      log(`❌ Error al crear: ${outputPath}`);
      return false;
    }
  } catch (error) {
    log(`❌ Error convirtiendo ${inputPath}: ${error.message}`);
    return false;
  }
}

// Encontrar todas las imágenes a convertir
function findImagesToConvert(dir) {
  const images = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).toLowerCase();
        
        if (SUPPORTED_FORMATS.includes(ext)) {
          const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          
          // Solo convertir si no existe la versión WebP
          if (!fs.existsSync(webpPath)) {
            images.push({
              input: fullPath,
              output: webpPath,
              relative: path.relative(PUBLIC_DIR, fullPath)
            });
          }
        }
      }
    }
  }
  
  scanDirectory(dir);
  return images;
}

// Actualizar rutas en el código
function updateCodePaths() {
  log('🔄 Actualizando rutas en el código...');
  
  const extensionsToCheck = ['.ts', '.tsx', '.js', '.jsx'];
  const directoriesToScan = [
    path.join(__dirname, '../components'),
    path.join(__dirname, '../app'),
    path.join(__dirname, '../pages')
  ];
  
  let totalReplacements = 0;
  
  for (const dir of directoriesToScan) {
    if (!fs.existsSync(dir)) continue;
    
    function scanDirectory(currentDir) {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (stat.isFile() && extensionsToCheck.includes(path.extname(fullPath))) {
          try {
            let content = fs.readFileSync(fullPath, 'utf8');
            let replacements = 0;
            
            // Reemplazar .jpg → .webp (solo si existe el archivo WebP)
            content = content.replace(/(["'])([^"']+\.jpg["'])/gi, (match, quote, filePath) => {
              const cleanPath = filePath.replace(/["']/g, '');
              const webpPath = cleanPath.replace(/\.jpg$/i, '.webp');
              const fullPathWebp = path.join(PUBLIC_DIR, webpPath.replace(/^\//, ''));
              
              if (fs.existsSync(fullPathWebp)) {
                replacements++;
                return quote + webpPath + quote;
              }
              return match;
            });
            
            // Reemplazar .jpeg → .webp
            content = content.replace(/(["'])([^"']+\.jpeg["'])/gi, (match, quote, filePath) => {
              const cleanPath = filePath.replace(/["']/g, '');
              const webpPath = cleanPath.replace(/\.jpeg$/i, '.webp');
              const fullPathWebp = path.join(PUBLIC_DIR, webpPath.replace(/^\//, ''));
              
              if (fs.existsSync(fullPathWebp)) {
                replacements++;
                return quote + webpPath + quote;
              }
              return match;
            });
            
            // Reemplazar .png → .webp
            content = content.replace(/(["'])([^"']+\.png["'])/gi, (match, quote, filePath) => {
              const cleanPath = filePath.replace(/["']/g, '');
              const webpPath = cleanPath.replace(/\.png$/i, '.webp');
              const fullPathWebp = path.join(PUBLIC_DIR, webpPath.replace(/^\//, ''));
              
              if (fs.existsSync(fullPathWebp)) {
                replacements++;
                return quote + webpPath + quote;
              }
              return match;
            });
            
            if (replacements > 0) {
              fs.writeFileSync(fullPath, content);
              totalReplacements += replacements;
              log(`📝 ${path.relative(__dirname, fullPath)}: ${replacements} reemplazos`);
            }
          } catch (error) {
            log(`❌ Error procesando ${fullPath}: ${error.message}`);
          }
        }
      }
    }
    
    scanDirectory(dir);
  }
  
  log(`✅ Total de reemplazos en código: ${totalReplacements}`);
}

// Función principal
async function main() {
  log('🚀 Iniciando conversión a WebP con Sharp...');
  
  // Verificar Sharp
  if (!checkSharp()) {
    process.exit(1);
  }
  
  // Verificar directorio
  if (!fs.existsSync(PUBLIC_DIR)) {
    log(`❌ Directorio no encontrado: ${PUBLIC_DIR}`);
    process.exit(1);
  }
  
  // Encontrar imágenes a convertir
  log('🔍 Buscando imágenes para convertir...');
  const imagesToConvert = findImagesToConvert(PUBLIC_DIR);
  
  if (imagesToConvert.length === 0) {
    log('✅ Todas las imágenes ya tienen versión WebP');
    process.exit(0);
  }
  
  log(`📊 Encontradas ${imagesToConvert.length} imágenes para convertir`);
  
  // Convertir imágenes
  let converted = 0;
  let failed = 0;
  
  for (const image of imagesToConvert) {
    if (await convertToWebp(image.input, image.output)) {
      converted++;
    } else {
      failed++;
    }
  }
  
  log(`📈 Resultados: ${converted} convertidas, ${failed} fallidas`);
  
  // Actualizar rutas en el código
  if (converted > 0) {
    updateCodePaths();
  }
  
  // Estadísticas finales
  const totalSizeBefore = imagesToConvert.reduce((sum, img) => {
    return sum + fs.statSync(img.input).size;
  }, 0);
  
  const totalSizeAfter = imagesToConvert.reduce((sum, img) => {
    const webpPath = img.output;
    if (fs.existsSync(webpPath)) {
      return sum + fs.statSync(webpPath).size;
    }
    return sum;
  }, 0);
  
  const totalSavings = ((totalSizeBefore - totalSizeAfter) / totalSizeBefore * 100).toFixed(1);
  const sizeBeforeMB = (totalSizeBefore / 1024 / 1024).toFixed(1);
  const sizeAfterMB = (totalSizeAfter / 1024 / 1024).toFixed(1);
  
  log(`📊 Estadísticas finales:`);
  log(`   Tamaño original: ${sizeBeforeMB} MB`);
  log(`   Tamaño WebP: ${sizeAfterMB} MB`);
  log(`   Ahorro total: ${totalSavings}%`);
  
  log('🎉 Conversión a WebP completada con Sharp');
}

// Ejecutar script
if (require.main === module) {
  main().catch(error => {
    log(`❌ Error fatal: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { convertToWebp, findImagesToConvert, updateCodePaths };
