import type { Product } from "@/lib/products-dynamic"
import type { Locale } from "@/lib/i18n/config"

/**
 * Generate Open Graph image URL for products
 * This uses the first product image as the social media preview
 */
export function getProductOGImage(product: Product): string {
  return product.images[0] || '/og-default.jpg'
}

/**
 * Generate Open Graph image URL for pages
 */
export function getPageOGImage(page?: string): string {
  switch (page) {
    case 'home':
      return '/og-default.jpg'
    case 'about':
      return '/og-about.jpg'
    default:
      return '/og-default.jpg'
  }
}

/**
 * Generate social media sharing text for products
 */
export function generateProductShareText(product: Product, locale: Locale): {
  title: string
  description: string
} {
  const productName = product.translatedName || product.name
  const productDescription = product.translatedDescription || product.description
  
  return {
    title: `${productName} - ARCHIE Premium Streetwear`,
    description: `${productDescription} Available in multiple sizes and colors. Shop premium streetwear at ARCHIE.`
  }
}

/**
 * Generate URL for sharing on social media
 */
export function generateShareURL(
  platform: 'twitter' | 'facebook' | 'whatsapp' | 'line',
  url: string,
  text?: string
): string {
  const encodedURL = encodeURIComponent(url)
  const encodedText = encodeURIComponent(text || '')
  
  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodedURL}&text=${encodedText}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`
    case 'whatsapp':
      return `https://wa.me/?text=${encodedText}%20${encodedURL}`
    case 'line':
      return `https://line.me/R/msg/text/?${encodedText}%20${encodedURL}`
    default:
      return url
  }
}