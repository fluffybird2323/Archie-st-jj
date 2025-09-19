// Simple script to test Open Graph tags
// Run with: node scripts/test-og.js

const https = require('https')
const http = require('http')

function testOpenGraphTags(url) {
  const protocol = url.startsWith('https') ? https : http
  
  return new Promise((resolve, reject) => {
    const req = protocol.get(url, (res) => {
      let data = ''
      
      res.on('data', (chunk) => {
        data += chunk
      })
      
      res.on('end', () => {
        // Extract meta tags
        const ogTags = {}
        const metaRegex = /<meta[^>]+>/g
        const matches = data.match(metaRegex) || []
        
        matches.forEach(match => {
          if (match.includes('og:') || match.includes('twitter:')) {
            const property = match.match(/(?:property|name)="([^"]+)"/)?.[1]
            const content = match.match(/content="([^"]*)"/)?.[1]
            if (property && content) {
              ogTags[property] = content
            }
          }
        })
        
        resolve(ogTags)
      })
    })
    
    req.on('error', reject)
    req.setTimeout(5000, () => {
      req.destroy()
      reject(new Error('Request timeout'))
    })
  })
}

// Test URLs
const testUrls = [
  'http://localhost:3000',
  'http://localhost:3000/product/artie-signature-hoodie'
]

async function runTests() {
  console.log('🧪 Testing Open Graph tags...\n')
  
  for (const url of testUrls) {
    try {
      console.log(`📝 Testing: ${url}`)
      const tags = await testOpenGraphTags(url)
      
      console.log('   Open Graph tags found:')
      Object.entries(tags).forEach(([key, value]) => {
        console.log(`   ${key}: ${value}`)
      })
      console.log('')
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}\n`)
    }
  }
  
  console.log('✅ Test complete!')
  console.log('\n📋 How to test social media previews:')
  console.log('1. Facebook: https://developers.facebook.com/tools/debug/')
  console.log('2. Twitter: https://cards-dev.twitter.com/validator')
  console.log('3. LinkedIn: https://www.linkedin.com/post-inspector/')
  console.log('4. WhatsApp: Just paste your URL in WhatsApp')
}

if (require.main === module) {
  runTests()
}

module.exports = { testOpenGraphTags }
