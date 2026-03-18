#!/usr/bin/env node

/**
 * Script para corregir rutas WebP que no existen
 * Revierte automáticamente a .jpg/.png originales si el .webp no existe
 * Next.js - Proyecto MEGA
 */

const fs = require('fs');
const path = require('path');

// Configuración
const PUBLIC_DIR = path.join(__dirname, '../public');
const LOG_FILE = path.join(__dirname, '../webp-routes-fix.log');

// Función de logging
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  
  // Guardar en archivo de log
  fs.appendFileSync(LOG_FILE, logMessage + '\n');
}

// Verificar si un archivo WebP existe
function webpExists(webpPath) {
  return fs.existsSync(webpPath);
}

// Encontrar el archivo original correspondiente
function findOriginalFile(webpPath) {
  const possibleExtensions = ['.jpg', '.jpeg', '.png'];
  
  for (const ext of possibleExtensions) {
    const originalPath = webpPath.replace(/\.webp$/i, ext);
    if (fs.existsSync(originalPath)) {
      return originalPath;
    }
  }
  
  return null;
}

// Encontrar todas las rutas WebP en el código
function findWebpRoutes(dir) {
  const webpRoutes = [];
  const extensionsToCheck = ['.ts', '.tsx', '.js', '.jsx'];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile() && extensionsToCheck.includes(path.extname(fullPath))) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          
          // Encontrar todas las rutas .webp
          const webpMatches = content.match(/(["'])([^"']+\.webp["'])/gi);
          
          if (webpMatches) {
            webpMatches.forEach(match => {
              const cleanPath = match.replace(/["']/g, '');
              const fullPathWebp = path.join(PUBLIC_DIR, cleanPath.replace(/^\//, ''));
              
              webpRoutes.push({
                file: fullPath,
                relative: path.relative(__dirname, fullPath),
                route: cleanPath,
                fullPath: fullPathWebp,
                exists: webpExists(fullPathWebp)
              });
            });
          }
        } catch (error) {
          log(`❌ Error leyendo ${fullPath}: ${error.message}`);
        }
      }
    }
  }
  
  scanDirectory(dir);
  return webpRoutes;
}

// Corregir rutas WebP que no existen
function fixWebpRoutes(webpRoutes) {
  let totalFixed = 0;
  let totalSkipped = 0;
  let totalErrors = 0;
  
  for (const routeInfo of webpRoutes) {
    const { file, route, fullPath, exists } = routeInfo;
    
    try {
      if (!exists) {
        // Buscar archivo original
        const originalFile = findOriginalFile(fullPath);
        
        if (originalFile) {
          // Reemplazar .webp con extensión original
          const ext = path.extname(originalFile);
          const newRoute = route.replace(/\.webp$/i, ext);
          
          // Leer y actualizar el archivo
          let content = fs.readFileSync(file, 'utf8');
          
          // Reemplazar la ruta específica
          const escapedRoute = route.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(["'])${escapedRoute}(["'])`, 'g');
          
          const originalContent = content;
          content = content.replace(regex, `$1${newRoute}$2`);
          
          // Solo escribir si hubo cambios
          if (content !== originalContent) {
            fs.writeFileSync(file, content);
            totalFixed++;
            log(`✅ Corregido: ${route} → ${newRoute} (${routeInfo.relative})`);
          }
        } else {
          log(`⚠️  Sin original para: ${route} (${routeInfo.relative})`);
          totalErrors++;
        }
      } else {
        totalSkipped++;
        log(`ℹ️  WebP existe: ${route} (${routeInfo.relative})`);
      }
    } catch (error) {
      log(`❌ Error corrigiendo ${route}: ${error.message}`);
      totalErrors++;
    }
  }
  
  return { totalFixed, totalSkipped, totalErrors };
}

// Función principal
async function main() {
  log('🔧 Iniciando corrección de rutas WebP...');
  
  // Directorios a escanear
  const directoriesToScan = [
    path.join(__dirname, '../components'),
    path.join(__dirname, '../app'),
    path.join(__dirname, '../pages')
  ];
  
  let allWebpRoutes = [];
  
  // Encontrar todas las rutas WebP
  for (const dir of directoriesToScan) {
    if (fs.existsSync(dir)) {
      const routes = findWebpRoutes(dir);
      allWebpRoutes = allWebpRoutes.concat(routes);
    }
  }
  
  if (allWebpRoutes.length === 0) {
    log('✅ No se encontraron rutas WebP en el código');
    process.exit(0);
  }
  
  log(`📊 Encontradas ${allWebpRoutes.length} rutas WebP`);
  
  // Separar por existencia
  const existingRoutes = allWebpRoutes.filter(route => route.exists);
  const missingRoutes = allWebpRoutes.filter(route => !route.exists);
  
  log(`📂 Existen: ${existingRoutes.length} rutas WebP`);
  log(`❌ Faltan: ${missingRoutes.length} rutas WebP`);
  
  // Mostrar rutas faltantes
  if (missingRoutes.length > 0) {
    log('\n🔍 Rutas WebP que faltan:');
    missingRoutes.forEach(route => {
      log(`   - ${route.route} (${route.relative})`);
    });
  }
  
  // Corregir rutas faltantes
  if (missingRoutes.length > 0) {
    log('\n🔧 Corrigiendo rutas faltantes...');
    const result = fixWebpRoutes(missingRoutes);
    
    log(`\n📈 Resultados:`);
    log(`   ✅ Corregidas: ${result.totalFixed}`);
    log(`   ℹ️  Omitidas: ${result.totalSkipped}`);
    log(`   ❌ Errores: ${result.totalErrors}`);
  }
  
  // Verificación final
  log('\n🔍 Verificación final...');
  const finalRoutes = [];
  
  for (const dir of directoriesToScan) {
    if (fs.existsSync(dir)) {
      const routes = findWebpRoutes(dir);
      finalRoutes.push(...routes);
    }
  }
  
  const finalMissing = finalRoutes.filter(route => !route.exists);
  
  if (finalMissing.length === 0) {
    log('✅ Todas las rutas WebP ahora existen o fueron corregidas');
  } else {
    log(`⚠️  Quedan ${finalMissing.length} rutas WebP sin archivo`);
  }
  
  log('🎉 Corrección de rutas WebP completada');
}

// Ejecutar script
if (require.main === module) {
  main().catch(error => {
    log(`❌ Error fatal: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { findWebpRoutes, fixWebpRoutes, webpExists, findOriginalFile };
