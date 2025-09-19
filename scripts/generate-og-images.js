// Generate PNG images from SVG for social media previews
// Install required dependency: npm install canvas
// Run with: node scripts/generate-og-images.js

const fs = require('fs')
const path = require('path')

// Simple HTML to PNG converter using data URLs
function generatePNGFromSVG() {
  const publicDir = path.join(__dirname, '..', 'public')
  const svgPath = path.join(publicDir, 'og-brand.svg')
  
  if (!fs.existsSync(svgPath)) {
    console.error('❌ SVG file not found:', svgPath)
    return
  }
  
  const svgContent = fs.readFileSync(svgPath, 'utf8')
  
  // Create HTML file that can be used to generate PNG
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {
            margin: 0;
            padding: 0;
            width: 1200px;
            height: 630px;
            overflow: hidden;
        }
    </style>
</head>
<body>
    ${svgContent}
</body>
</html>`

  const htmlPath = path.join(publicDir, 'og-preview.html')
  fs.writeFileSync(htmlPath, htmlContent)
  
  console.log('✅ Generated og-preview.html')
  console.log('📋 To create PNG:')
  console.log('1. Open og-preview.html in your browser')
  console.log('2. Take a screenshot (1200x630)')
  console.log('3. Save as og-default.png')
  console.log('')
  console.log('Or use online tools:')
  console.log('- https://svgtopng.com/')
  console.log('- https://convertio.co/svg-png/')
  console.log('- https://www.freeconvert.com/svg-to-png')
}

// Alternative: Create a simple Canvas-based PNG generator
function createSimplePNG() {
  const publicDir = path.join(__dirname, '..', 'public')
  
  // Create a simple black background with white ARTIE text as data URL
  const canvas = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#000000"/>
  <text x="600" y="315" font-family="Arial, sans-serif" font-weight="900" font-size="120" 
        fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle" letter-spacing="8px">ARTIE</text>
  <text x="600" y="420" font-family="Arial, sans-serif" font-weight="300" font-size="28" 
        fill="#CCCCCC" text-anchor="middle" dominant-baseline="middle" letter-spacing="4px">PREMIUM STREETWEAR</text>
</svg>`

  // Save as base64 data URL that can be used directly
  const base64 = Buffer.from(canvas).toString('base64')
  const dataUrl = `data:image/svg+xml;base64,${base64}`
  
  console.log('📋 SVG Data URL (copy this to use as image):')
  console.log(dataUrl)
}

console.log('🎨 ARTIE Social Media Image Generator')
console.log('=====================================')

generatePNGFromSVG()
createSimplePNG()

console.log('\\n🚀 Quick Setup:')
console.log('1. Visit https://svgtopng.com/')
console.log('2. Upload public/og-brand.svg')  
console.log('3. Download as PNG')
console.log('4. Rename to og-default.png')
console.log('5. Replace the existing file in public/')
