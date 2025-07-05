import type { Locale } from "./i18n/config"

// DeepL API Configuration
const DEEPL_API_KEY = "32ddbfe4-f0cb-45b2-8a99-0503cf1a94a3:fx"
const DEEPL_API_URL = "https://api-free.deepl.com/v2/translate"

// Map our locales to DeepL language codes
const localeToDeepLCode: Record<Locale, string> = {
  en: "EN",
  "zh-CN": "ZH",
  ja: "JA",
  de: "DE",
  fr: "FR",
  es: "ES",
  it: "IT",
}

// Cache for translations to avoid repeated API calls
const translationCache = new Map<string, string>()

/**
 * Translate text using DeepL API
 * @param text - Text to translate
 * @param targetLocale - Target locale
 * @param sourceLocale - Source locale (defaults to 'en')
 * @returns Promise<string> - Translated text
 */
export async function translateTextDeepL(
  text: string,
  targetLocale: Locale,
  sourceLocale: Locale = "en"
): Promise<string> {
  // Return original text if target locale is the same as source
  if (targetLocale === sourceLocale) {
    return text
  }

  // Create cache key
  const cacheKey = `${text}_${sourceLocale}_${targetLocale}`
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey)!
  }

  try {
    const sourceLang = localeToDeepLCode[sourceLocale]
    const targetLang = localeToDeepLCode[targetLocale]
    
    const formData = new URLSearchParams()
    formData.append("text", text)
    formData.append("source_lang", sourceLang)
    formData.append("target_lang", targetLang)
    
    const response = await fetch(DEEPL_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    
    if (data.translations && data.translations.length > 0) {
      const translatedText = data.translations[0].text
      
      // Cache the translation
      translationCache.set(cacheKey, translatedText)
      
      return translatedText
    } else {
      throw new Error("Invalid response from DeepL API")
    }
  } catch (error) {
    console.error("DeepL translation error:", error)
    // Return original text on error
    return text
  }
}

/**
 * Check if DeepL translation is available
 * @returns boolean
 */
export function isDeepLTranslationAvailable(): boolean {
  return !!DEEPL_API_KEY
}

/**
 * Get DeepL usage statistics
 * @returns Promise<object> - Usage information
 */
export async function getDeepLUsage(): Promise<any> {
  try {
    const response = await fetch("https://api-free.deepl.com/v2/usage", {
      headers: {
        "Authorization": `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      },
    })

    if (!response.ok) {
      throw new Error(`DeepL usage API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to get DeepL usage:", error)
    return null
  }
}

/**
 * Clear translation cache
 */
export function clearDeepLCache(): void {
  translationCache.clear()
}

/**
 * Get cache statistics
 */
export function getDeepLCacheStats(): { size: number } {
  return { size: translationCache.size }
}
