import { getDictionary } from "./utils"
import { translateTextDeepL, isDeepLTranslationAvailable } from "../deepl-translate"
import { translateTextFree, getFallbackTranslation, isFreeTranslationAvailable } from "../free-translate"
import type { Locale } from "./config"

/**
 * Enhanced dictionary that uses DeepL API with fallback to free translation
 */
export class EnhancedDictionary {
  private staticDictionary: any
  private locale: Locale

  constructor(locale: Locale) {
    this.locale = locale
    this.staticDictionary = getDictionary(locale)
  }

  /**
   * Get a translation with fallback to DeepL API, then free translation
   */
  async get(key: string, fallbackText?: string): Promise<string> {
    // First try static dictionary
    const staticTranslation = this.getNestedValue(this.staticDictionary, key)
    if (staticTranslation) {
      return staticTranslation
    }

    // If we have fallback text, try DeepL first, then free translation
    if (fallbackText && this.locale !== "en") {
      // First try fallback translations for common terms
      const fallbackTranslation = getFallbackTranslation(fallbackText, this.locale)
      if (fallbackTranslation) {
        return fallbackTranslation
      }

      // Then try DeepL API (highest quality)
      if (isDeepLTranslationAvailable()) {
        try {
          return await translateTextDeepL(fallbackText, this.locale)
        } catch (error) {
          console.error(`DeepL translation failed for key: ${key}`, error)
          // Fall through to free translation
        }
      }

      // Finally try free translation service
      if (isFreeTranslationAvailable()) {
        try {
          return await translateTextFree(fallbackText, this.locale)
        } catch (error) {
          console.error(`Free translation failed for key: ${key}`, error)
          return fallbackText
        }
      }
    }

    // Return fallback text or key if no translation available
    return fallbackText || key
  }

  /**
   * Get static dictionary value (synchronous)
   */
  getStatic(key: string): string | undefined {
    return this.getNestedValue(this.staticDictionary, key)
  }

  /**
   * Check if DeepL translation is available
   */
  isDeepLTranslationAvailable(): boolean {
    return isDeepLTranslationAvailable()
  }

  /**
   * Check if free translation is available
   */
  isFreeTranslationAvailable(): boolean {
    return isFreeTranslationAvailable()
  }

  /**
   * Get the current locale
   */
  getLocale(): Locale {
    return this.locale
  }

  /**
   * Helper function to get nested object values using dot notation
   */
  private getNestedValue(obj: any, path: string): string | undefined {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined
    }, obj)
  }
}

/**
 * Create an enhanced dictionary instance
 */
export function createEnhancedDictionary(locale: Locale): EnhancedDictionary {
  return new EnhancedDictionary(locale)
}

/**
 * Product translation utility with DeepL priority
 */
export async function translateProductContent(
  product: any,
  locale: Locale,
  fields: string[] = ['name', 'description']
): Promise<any> {
  const enhancedDict = createEnhancedDictionary(locale)
  
  // If it's English, return original content
  if (locale === 'en') {
    return product
  }

  const translatedProduct = { ...product }

  for (const field of fields) {
    if (product[field]) {
      try {
        const translatedText = await enhancedDict.get(
          `product.${field}`,
          product[field]
        )
        translatedProduct[field] = translatedText
      } catch (error) {
        console.error(`Failed to translate ${field}:`, error)
        // Keep original text on error
      }
    }
  }

  return translatedProduct
}

/**
 * Enhanced cart item translation
 */
export async function translateCartItem(
  item: any,
  locale: Locale
): Promise<any> {
  const enhancedDict = createEnhancedDictionary(locale)
  
  // If it's English, return original content
  if (locale === 'en') {
    return item
  }

  try {
    const translatedName = await enhancedDict.get(
      `cart.item.${item.productId}`,
      item.name
    )

    return {
      ...item,
      name: translatedName
    }
  } catch (error) {
    console.error('Failed to translate cart item:', error)
    return item
  }
} 