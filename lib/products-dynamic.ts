import {
  getProducts as getDbProducts,
  getProductBySlug as getDbProductBySlug,
  getProductTranslations,
} from "./supabase"
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
  colors: string[]
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

    if (locale === "en") {
      return products
    }

    // Fetch translations for all products if not English
    const productsWithTranslations = await Promise.all(
      products.map(async (product) => {
        try {
          const translation = await getProductTranslations(product.id, locale)
          if (translation) {
            return {
              ...product,
              translatedName: translation.name,
              translatedDescription: translation.description,
            }
          }
          return product
        } catch (error) {
          console.error(`Error fetching translation for product ${product.id}:`, error)
          return product
        }
      }),
    )

    return productsWithTranslations
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

    // Get translations if not English
    if (locale !== "en") {
      try {
        const translation = await getProductTranslations(product.id, locale)
        if (translation) {
          return {
            ...product,
            translatedName: translation.name,
            translatedDescription: translation.description,
          }
        }
      } catch (error) {
        console.error(`Error fetching translation for product ${product.id}:`, error)
      }
    }

    return product
  } catch (error) {
    console.error("Error in getProductBySlug:", error)
    return null
  }
}
