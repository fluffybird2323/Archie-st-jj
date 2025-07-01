import type { Locale } from "./i18n/config"

// Google Translate API configuration
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY
const GOOGLE_TRANSLATE_API_URL = "https://translation.googleapis.com/language/translate/v2"

// Map our locales to Google Translate language codes
const localeToGoogleCode: Record<Locale, string> = {
  en: "en",
  "zh-CN": "zh-CN",
  ja: "ja",
  de: "de",
  fr: "fr",
  es: "es",
  it: "it",
}

// Cache for translations to avoid repeated API calls
const translationCache = new Map<string, string>()

/**
 * Translate text using Google Translate API
 * @param text - Text to translate
 * @param targetLocale - Target locale
 * @param sourceLocale - Source locale (defaults to 'en')
 * @returns Promise<string> - Translated text
 */
export async function translateText(
  text: string,
  targetLocale: Locale,
  sourceLocale: Locale = "en"
): Promise<string> {
  // Return original text if target locale is the same as source
  if (targetLocale === sourceLocale) {
    return text
  }

  // Return original text if no API key is configured
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.warn("Google Translate API key not configured, returning original text")
    return text
  }

  // Create cache key
  const cacheKey = `${text}_${sourceLocale}_${targetLocale}`
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: localeToGoogleCode[sourceLocale],
        target: localeToGoogleCode[targetLocale],
        format: "text",
      }),
    })

    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.data && data.data.translations && data.data.translations[0]) {
      const translatedText = data.data.translations[0].translatedText
      
      // Cache the translation
      translationCache.set(cacheKey, translatedText)
      
      return translatedText
    } else {
      throw new Error("Invalid response from Google Translate API")
    }
  } catch (error) {
    console.error("Translation error:", error)
    // Return original text on error
    return text
  }
}

/**
 * Translate multiple texts in a single API call
 * @param texts - Array of texts to translate
 * @param targetLocale - Target locale
 * @param sourceLocale - Source locale (defaults to 'en')
 * @returns Promise<string[]> - Array of translated texts
 */
export async function translateMultipleTexts(
  texts: string[],
  targetLocale: Locale,
  sourceLocale: Locale = "en"
): Promise<string[]> {
  // Return original texts if target locale is the same as source
  if (targetLocale === sourceLocale) {
    return texts
  }

  // Return original texts if no API key is configured
  if (!GOOGLE_TRANSLATE_API_KEY) {
    console.warn("Google Translate API key not configured, returning original texts")
    return texts
  }

  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: texts,
        source: localeToGoogleCode[sourceLocale],
        target: localeToGoogleCode[targetLocale],
        format: "text",
      }),
    })

    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.status}`)
    }

    const data = await response.json()
    
    if (data.data && data.data.translations) {
      return data.data.translations.map((translation: any) => translation.translatedText)
    } else {
      throw new Error("Invalid response from Google Translate API")
    }
  } catch (error) {
    console.error("Translation error:", error)
    // Return original texts on error
    return texts
  }
}

/**
 * Check if Google Translate is configured
 * @returns boolean
 */
export function isGoogleTranslateConfigured(): boolean {
  return !!GOOGLE_TRANSLATE_API_KEY
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