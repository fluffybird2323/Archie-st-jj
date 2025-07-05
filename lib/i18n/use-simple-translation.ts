"use client"

import { useState, useEffect, useCallback } from "react"
import { createSimpleEnhancedDictionary } from "./simple-enhanced-utils"
import type { Locale } from "./config"

/**
 * Simple React hook for using free translation service
 */
export function useSimpleTranslation(locale: Locale) {
  const [dictionary, setDictionary] = useState(createSimpleEnhancedDictionary(locale))
  const [isLoading, setIsLoading] = useState(false)

  // Update dictionary when locale changes
  useEffect(() => {
    setDictionary(createSimpleEnhancedDictionary(locale))
  }, [locale])

  /**
   * Get a translation with fallback to free translation service
   */
  const t = useCallback(async (key: string, fallbackText?: string): Promise<string> => {
    setIsLoading(true)
    try {
      const result = await dictionary.get(key, fallbackText)
      return result
    } finally {
      setIsLoading(false)
    }
  }, [dictionary])

  /**
   * Get static dictionary value (synchronous)
   */
  const tStatic = useCallback((key: string): string | undefined => {
    return dictionary.getStatic(key)
  }, [dictionary])

  /**
   * Check if free translation is available
   */
  const isFreeTranslationAvailable = useCallback((): boolean => {
    return dictionary.isFreeTranslationAvailable()
  }, [dictionary])

  return {
    t,
    tStatic,
    isLoading,
    isFreeTranslationAvailable,
    locale: dictionary.getLocale(),
  }
}

/**
 * Hook for translating product content with free service
 */
export function useProductTranslationSimple(locale: Locale) {
  const { t, isLoading } = useSimpleTranslation(locale)

  const translateProduct = useCallback(async (product: any, fields: string[] = ['name', 'description']) => {
    if (locale === 'en') {
      return product
    }

    const translatedProduct = { ...product }

    for (const field of fields) {
      if (product[field]) {
        try {
          const translatedText = await t(
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
  }, [t, locale])

  return {
    translateProduct,
    isLoading,
  }
}
