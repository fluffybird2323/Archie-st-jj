"use client"

import { useState, useEffect, useCallback } from "react"
import { createEnhancedDictionary } from "./enhanced-utils"
import type { Locale } from "./config"

/**
 * React hook for using enhanced dictionary with DeepL translation
 */
export function useEnhancedDictionary(locale: Locale) {
  const [dictionary, setDictionary] = useState(createEnhancedDictionary(locale))
  const [isLoading, setIsLoading] = useState(false)

  // Update dictionary when locale changes
  useEffect(() => {
    setDictionary(createEnhancedDictionary(locale))
  }, [locale])

  /**
   * Get a translation with fallback to DeepL API, then free translation
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
   * Check if DeepL translation is available
   */
  const isDeepLTranslationAvailable = useCallback((): boolean => {
    return dictionary.isDeepLTranslationAvailable()
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
    isDeepLTranslationAvailable,
    isFreeTranslationAvailable,
    locale: dictionary.getLocale(),
  }
}

/**
 * Hook for translating product content with DeepL priority
 */
export function useProductTranslation(locale: Locale) {
  const { t, isLoading } = useEnhancedDictionary(locale)

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

/**
 * Hook for translating cart items
 */
export function useCartTranslation(locale: Locale) {
  const { t, isLoading } = useEnhancedDictionary(locale)

  const translateCartItem = useCallback(async (item: any) => {
    if (locale === 'en') {
      return item
    }

    try {
      const translatedName = await t(
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
  }, [t, locale])

  return {
    translateCartItem,
    isLoading,
  }
} 