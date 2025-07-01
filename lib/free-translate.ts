import type { Locale } from "./i18n/config"

// MyMemory Translation API (Free tier: 1000 words/day)
const MYMEMORY_API_URL = "https://api.mymemory.translated.net/get"

// Map our locales to MyMemory language codes
const localeToMyMemoryCode: Record<Locale, string> = {
  en: "en",
  "zh-CN": "zh",
  ja: "ja",
  de: "de",
  fr: "fr",
  es: "es",
  it: "it",
}

// Cache for translations to avoid repeated API calls
const translationCache = new Map<string, string>()

/**
 * Translate text using MyMemory API (free)
 * @param text - Text to translate
 * @param targetLocale - Target locale
 * @param sourceLocale - Source locale (defaults to 'en')
 * @returns Promise<string> - Translated text
 */
export async function translateTextFree(
  text: string,
  targetLocale: Locale,
  sourceLocale: Locale = "en"
): Promise<string> {
  // Return original text if target locale is the same as source
  if (targetLocale === sourceLocale) {
    return text
  }

  // Return original text if it's too long (MyMemory has limits)
  if (text.length > 500) {
    console.warn("Text too long for free translation, returning original")
    return text
  }

  // Create cache key
  const cacheKey = `${text}_${sourceLocale}_${targetLocale}`
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  try {
    const sourceLang = localeToMyMemoryCode[sourceLocale]
    const targetLang = localeToMyMemoryCode[targetLocale]
    
    const response = await fetch(
      `${MYMEMORY_API_URL}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    )

    if (!response.ok) {
      throw new Error(`MyMemory API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.responseStatus === 200 && data.responseData) {
      const translatedText = data.responseData.translatedText
      
      // Cache the translation
      translationCache.set(cacheKey, translatedText)
      
      return translatedText
    } else {
      throw new Error("Invalid response from MyMemory API")
    }
  } catch (error) {
    console.error("Translation error:", error)
    // Return original text on error
    return text
  }
}

/**
 * Check if free translation is available
 * @returns boolean
 */
export function isFreeTranslationAvailable(): boolean {
  return true // MyMemory is always available
}

/**
 * Clear translation cache
 */
export function clearTranslationCache(): void {
  translationCache.clear()
}

/**
 * Get cache statistics
 */
export function getCacheStats(): { size: number } {
  return { size: translationCache.size }
}

/**
 * Simple fallback translation using basic word mapping
 * For common UI terms when API is not available
 */
const fallbackTranslations: Record<string, Partial<Record<Locale, string>>> = {
  "Add to Cart": {
    "zh-CN": "加入购物车",
    "ja": "カートに追加",
    "de": "In den Warenkorb",
    "fr": "Ajouter au panier",
    "es": "Añadir al carrito",
    "it": "Aggiungi al carrello",
  },
  "View Product": {
    "zh-CN": "查看产品",
    "ja": "商品を見る",
    "de": "Produkt anzeigen",
    "fr": "Voir le produit",
    "es": "Ver producto",
    "it": "Vedi prodotto",
  },
  "Buy Now": {
    "zh-CN": "立即购买",
    "ja": "今すぐ購入",
    "de": "Jetzt kaufen",
    "fr": "Acheter maintenant",
    "es": "Comprar ahora",
    "it": "Compra ora",
  },
  "Added to cart": {
    "zh-CN": "已加入购物车",
    "ja": "カートに追加しました",
    "de": "In den Warenkorb gelegt",
    "fr": "Ajouté au panier",
    "es": "Añadido al carrito",
    "it": "Aggiunto al carrello",
  },
}

/**
 * Get fallback translation for common terms
 */
export function getFallbackTranslation(text: string, targetLocale: Locale): string | null {
  const translations = fallbackTranslations[text]
  return translations ? translations[targetLocale] || null : null
} 