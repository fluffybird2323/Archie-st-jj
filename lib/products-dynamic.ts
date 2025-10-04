import { getProducts as getDbProducts, getProductBySlug as getDbProductBySlug } from "./supabase"
import { translateProductContent } from "./i18n/enhanced-utils"
import { type Locale, locales, defaultLocale } from "./i18n/config"

export interface Product {
  id: string
  slug: string
  name: string
  price: number
  originalPrice?: number
  category: string
  description: string
  images: string[]
  sizes: string[]
  colors: Array<string | { name: string; imageIndex: number }>
  translatedName?: string
  translatedDescription?: string
  reviews?: any[] // Add this line for reviews
}

// Export both getProducts and getAllProducts for compatibility
export async function getProducts(locale: Locale = "en"): Promise<Product[]> {
  try {
    // Validate and sanitize locale
    const validLocale = validateLocale(locale)

    const products = await getDbProducts()

    if (!products || products.length === 0) {
      console.log("No products found in database")
      return []
    }

    // If English, return products as-is
    if (validLocale === "en") {
      return products
    }

    // Translate products using API services
    const translatedProducts = await Promise.all(
      products.map(async (product) => {
        try {
          const translated = await translateProductContent(product, validLocale, ["name", "description"])
          return {
            ...product,
            translatedName: translated.name,
            translatedDescription: translated.description,
          }
        } catch (error) {
          console.error(`Failed to translate product ${product.id}:`, error)
          // Return original product if translation fails
          return product
        }
      }),
    )

    return translatedProducts
  } catch (error) {
    console.error("Error in getProducts:", error)
    return []
  }
}

// Add getAllProducts as an alias for backward compatibility
export const getAllProducts = getProducts

export async function getProductBySlug(slug: string, locale: Locale = "en"): Promise<Product | null> {
  try {
    // Validate and sanitize locale
    const validLocale = validateLocale(locale)

    console.log(`Fetching product with slug: ${slug}`)
    const product = await getDbProductBySlug(slug)

    if (!product) {
      console.log(`No product found with slug: ${slug}`)
      return null
    }

    console.log(`Found product:`, product)

    // If English, return product as-is
    if (validLocale === "en") {
      return product
    }

    // Translate product using API services
    try {
      const translated = await translateProductContent(product, validLocale, ["name", "description"])
      return {
        ...product,
        translatedName: translated.name,
        translatedDescription: translated.description,
      }
    } catch (error) {
      console.error(`Failed to translate product ${product.id}:`, error)
      // Return original product if translation fails
      return product
    }
  } catch (error) {
    console.error("Error in getProductBySlug:", error)
    return null
  }
}

/**
 * Validates and returns a valid locale, falling back to defaultLocale if invalid
 */
function validateLocale(locale: any): Locale {
  // Check if locale is undefined, null, or not a string
  if (!locale || typeof locale !== 'string') {
    console.warn(`Invalid locale provided: ${locale}, using default locale: ${defaultLocale}`)
    return defaultLocale
  }

  // Check if locale is in the list of supported locales
  if (!locales.includes(locale as Locale)) {
    console.warn(`Unsupported locale: ${locale}, using default locale: ${defaultLocale}`)
    return defaultLocale
  }

  return locale as Locale
}
