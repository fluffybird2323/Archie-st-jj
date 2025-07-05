import { getProducts as getDbProducts, getProductBySlug as getDbProductBySlug } from "./supabase"
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
  colors: string[] // Back to simple string array
  translatedName?: string
  translatedDescription?: string
}

// Export both getProducts and getAllProducts for compatibility
export async function getProducts(locale: Locale = "en"): Promise<Product[]> {
  try {
    const products = await getDbProducts()

    if (!products || products.length === 0) {
      console.log("No products found in database")
      return []
    }

    // For now, return products without translation to fix UI
    // Translation will be handled by static dictionaries in components
    return products
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

    // For now, return product without translation to fix UI
    // Translation will be handled by static dictionaries in components
    return product
  } catch (error) {
    console.error("Error in getProductBySlug:", error)
    return null
  }
}
