const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesToOptimize = [
  {
    name: '6708074350c14_IMG20241004125700.jpg',
    originalSize: 4.8 * 1024 * 1024, // 4.8MB in bytes
    targetSize: 400 * 1024, // Target under 400KB
    quality: 75,
    format: 'webp'
  },
  {
    name: '5924733dda5a7_20160831TMSASimersExpointerfotoNiltonSantolinIMG6852.jpg',
    originalSize: 2.4 * 1024 * 1024, // 2.4MB in bytes
    targetSize: 400 * 1024, // Target under 400KB
    quality: 75,
    format: 'webp'
  },
  {
    name: '59d4f254b20b6_IMG20150221102103.jpg',
    originalSize: 1.6 * 1024 * 1024, // 1.6MB in bytes
    targetSize: 400 * 1024, // Target under 400KB
    quality: 75,
    format: 'webp'
  },
  {
    name: '5a3a5d3f32ffd_BICEFINANCIACION2017.jpg',
    originalSize: 392 * 1024, // 392KB in bytes
    targetSize: 300 * 1024, // Target under 300KB
    quality: 80,
    format: 'webp'
  },
  {
    name: '964cce36-a5c4-48a9-9a72-0ab973046f7e.png',
    originalSize: 2.4 * 1024 * 1024, // 2.4MB in bytes
    targetSize: 400 * 1024, // Target under 400KB
    quality: 75,
    format: 'webp'
  },
  {
    name: 'e50864d0-c493-4107-bcbc-31e409d7f1b6.png',
    originalSize: 2.7 * 1024 * 1024, // 2.7MB in bytes
    targetSize: 400 * 1024, // Target under 400KB
    quality: 75,
    format: 'webp'
  }
];

async function optimizeImage(imageConfig) {
  try {
    const inputPath = path.join(__dirname, 'public/images', imageConfig.name);
    const outputPath = path.join(__dirname, 'public/images', imageConfig.name.replace(/\.(jpg|png)$/, '.webp'));
    
    console.log(`Processing ${imageConfig.name} (${(imageConfig.originalSize / 1024 / 1024).toFixed(2)}MB)`);
    
    const buffer = await sharp(inputPath)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: imageConfig.quality })
      .toBuffer();
    
    await fs.promises.writeFile(outputPath, buffer);
    
    const stats = await fs.promises.stat(outputPath);
    const newSizeKB = Math.round(stats.size / 1024);
    const reductionKB = Math.round((imageConfig.originalSize - stats.size) / 1024);
    const reductionPercent = ((reductionKB / (imageConfig.originalSize / 1024)) * 100).toFixed(1);
    
    console.log(`✅ ${imageConfig.name}: ${newSizeKB}KB (${reductionKB}KB saved, ${reductionPercent}% reduction)`);
    
    return {
      originalPath: inputPath,
      optimizedPath: outputPath,
      originalSize: imageConfig.originalSize,
      newSize: stats.size,
      reductionKB,
      reductionPercent
    };
  } catch (error) {
    console.error(`❌ Error processing ${imageConfig.name}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting image optimization...');
  
  const results = [];
  for (const imageConfig of imagesToOptimize) {
    const result = await optimizeImage(imageConfig);
    if (result) {
      results.push(result);
    }
  }
  
  console.log('\n📊 OPTIMIZATION SUMMARY:');
  console.log('==========================');
  
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let totalSaved = 0;
  
  results.forEach(result => {
    if (result) {
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;
      totalSaved += result.reductionKB;
    }
  });
  
  const totalReductionPercent = ((totalSaved / totalOriginalSize) * 100).toFixed(1);
  
  console.log(`Total images processed: ${results.length}`);
  console.log(`Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total optimized size: ${(totalNewSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Total space saved: ${(totalSaved / 1024).toFixed(2)}MB (${totalReductionPercent}% reduction)`);
  
  console.log('\n✅ Image optimization complete!');
  console.log('📝 Next steps:');
  console.log('1. Update image references in your Next.js components');
  console.log('2. Test the optimized images');
  console.log('3. Consider implementing responsive image loading');
}

main().catch(console.error);
