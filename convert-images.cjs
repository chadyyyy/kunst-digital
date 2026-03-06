#!/usr/bin/env node
/**
 * Image Conversion Script for KUNST Website
 * Converts PNG/JPG images to WebP format for better performance
 * 
 * Usage:
 *   node convert-images.js
 * 
 * Requires: sharp (npm install sharp)
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
try {
  require.resolve('sharp');
} catch (e) {
  console.log('📦 Installing sharp package...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install sharp --save-dev', { stdio: 'inherit' });
    console.log('✅ Sharp installed successfully!\n');
  } catch (err) {
    console.error('❌ Failed to install sharp. Please run: npm install sharp --save-dev');
    process.exit(1);
  }
}

const sharp = require('sharp');

const IMAGE_DIRS = [
  'public/images',
  'public/images/clients',
  'public/images/portfolio/EDF',
  'public/images/portfolio/Sanipak'
];

const QUALITY = 85; // WebP quality (0-100)

async function convertImage(inputPath, outputPath) {
  try {
    const info = await sharp(inputPath)
      .webp({ 
        quality: QUALITY,
        effort: 6, // Compression effort (0-6)
        smartSubsample: true // Better quality for images with sharp edges
      })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = info.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    return {
      success: true,
      originalSize,
      newSize,
      savings: savings > 0 ? savings : 0
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

async function processDirectory(dir) {
  const results = [];
  
  if (!fs.existsSync(dir)) {
    console.log(`⏩ Skipping ${dir} (doesn't exist)`);
    return results;
  }
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(ext, '.webp'));
      
      // Skip if WebP already exists and is newer
      if (fs.existsSync(outputPath)) {
        const originalTime = fs.statSync(inputPath).mtime;
        const webpTime = fs.statSync(outputPath).mtime;
        
        if (webpTime > originalTime) {
          console.log(`⏩ Skipping ${file} (WebP already up to date)`);
          continue;
        }
      }
      
      console.log(`🔄 Converting: ${file}`);
      const result = await convertImage(inputPath, outputPath);
      
      if (result.success) {
        console.log(`   ✅ Saved ${result.savings}% (${(result.originalSize/1024).toFixed(1)}KB → ${(result.newSize/1024).toFixed(1)}KB)`);
        results.push({ file, ...result });
      } else {
        console.log(`   ❌ Error: ${result.error}`);
      }
    }
  }
  
  return results;
}

async function main() {
  console.log('🚀 Starting image conversion to WebP...\n');
  
  const allResults = [];
  
  for (const dir of IMAGE_DIRS) {
    console.log(`\n📁 Processing: ${dir}`);
    const results = await processDirectory(dir);
    allResults.push(...results);
  }
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 CONVERSION SUMMARY');
  console.log('='.repeat(50));
  
  if (allResults.length === 0) {
    console.log('No images were converted.');
  } else {
    let totalOriginal = 0;
    let totalNew = 0;
    
    allResults.forEach(r => {
      totalOriginal += r.originalSize;
      totalNew += r.newSize;
    });
    
    const totalSavings = ((totalOriginal - totalNew) / totalOriginal * 100).toFixed(1);
    
    console.log(`✅ Converted: ${allResults.length} images`);
    console.log(`📦 Original size: ${(totalOriginal/1024/1024).toFixed(2)} MB`);
    console.log(`📦 WebP size: ${(totalNew/1024/1024).toFixed(2)} MB`);
    console.log(`💾 Space saved: ${totalSavings}% (${((totalOriginal-totalNew)/1024/1024).toFixed(2)} MB)`);
  }
  
  console.log('\n✨ Done! The OptimizedImage component will now use WebP automatically.');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
