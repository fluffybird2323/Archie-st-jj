import { getDictionary } from "./utils"
import { translateTextFree, getFallbackTranslation, isFreeTranslationAvailable } from "../free-translate"
import type { Locale } from "./config"

/**
 * Simple enhanced dictionary that uses free translation services
 */
export class SimpleEnhancedDictionary {
  private staticDictionary: any
  private locale: Locale

  constructor(locale: Locale) {
    this.locale = locale
    this.staticDictionary = getDictionary(locale)
  }

  /**
   * Get a translation with fallback to free translation service
   */
  async get(key: string, fallbackText?: string): Promise<string> {
    // First try static dictionary
    const staticTranslation = this.getNestedValue(this.staticDictionary, key)
    if (staticTranslation) {
      return staticTranslation
    }

    // If we have fallback text, try free translation
    if (fallbackText && this.locale !== "en") {
      // First try fallback translations for common terms
      const fallbackTranslation = getFallbackTranslation(fallbackText, this.locale)
      if (fallbackTranslation) {
        return fallbackTranslation
      }

      // Then try free translation service
      if (isFreeTranslationAvailable()) {
        try {
          return await translateTextFree(fallbackText, this.locale)
        } catch (error) {
          console.error(`Translation failed for key: ${key}`, error)
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
 * Create a simple enhanced dictionary instance
 */
export function createSimpleEnhancedDictionary(locale: Locale): SimpleEnhancedDictionary {
  return new SimpleEnhancedDictionary(locale)
}

/**
 * Simple product translation utility
 */
export async function translateProductContentSimple(
  product: any,
  locale: Locale,
  fields: string[] = ['name', 'description']
): Promise<any> {
  const enhancedDict = createSimpleEnhancedDictionary(locale)
  
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