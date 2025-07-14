import { getProducts as getDbProducts, getProductBySlug as getDbProductBySlug } from "./supabase"
import { translateProductContent } from "./i18n/enhanced-utils"
import type { Locale } from "./i18n/config"

export interface Product {
  id: string
  slug: string
  name: string
  price: number
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
    const products = await getDbProducts()

    if (!products || products.length === 0) {
      console.log("No products found in database")
      return []
    }

    // If English, return products as-is
    if (locale === "en") {
      return products
    }

    // Translate products using API services
    const translatedProducts = await Promise.all(
      products.map(async (product) => {
        try {
          const translated = await translateProductContent(product, locale, ["name", "description"])
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
    console.log(`Fetching product with slug: ${slug}`)
    const product = await getDbProductBySlug(slug)

    if (!product) {
      console.log(`No product found with slug: ${slug}`)
      return null
    }

    console.log(`Found product:`, product)

    // If English, return product as-is
    if (locale === "en") {
      return product
    }

    // Translate product using API services
    try {
      const translated = await translateProductContent(product, locale, ["name", "description"])
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
