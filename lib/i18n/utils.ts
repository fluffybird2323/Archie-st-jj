import { type Locale, defaultLocale, currencies, exchangeRates } from "./config"
import { dictionaries, type Dictionary } from "./dictionaries"

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale]
}

export function formatPrice(price: number, locale: Locale): string {
  const currency = currencies[locale] || currencies[defaultLocale]
  const rate = exchangeRates[currency.code] || 1
  // Use proper decimal arithmetic to avoid floating point precision issues
  const convertedPrice = Math.round(price * rate * 100) / 100

  // Format based on locale for display purposes only
  switch (locale) {
    case "ja":
      return `${currency.symbol}${Math.round(convertedPrice).toLocaleString("ja-JP")}`
    case "zh-CN":
      return `${currency.symbol}${convertedPrice.toFixed(2)}`
    case "de":
    case "fr":
    case "es":
    case "it":
      return `${convertedPrice.toFixed(2)}${currency.symbol}`
    default:
      return `${currency.symbol}${convertedPrice.toFixed(2)}`
  }
}

// New function to get the original USD price for Stripe
export function getUSDPrice(price: number): number {
  return price // Return the original USD price without conversion
}

export function getLocaleFromUrl(pathname: string): Locale {
  if (!pathname) return defaultLocale

  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return defaultLocale

  const firstSegment = segments[0] as Locale

  // Check if the first segment is a valid locale
  if (firstSegment && dictionaries[firstSegment]) {
    return firstSegment
  }

  return defaultLocale
}

export function removeLocaleFromUrl(pathname: string): string {
  if (!pathname) return "/"

  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return "/"

  const firstSegment = segments[0] as Locale

  // If the first segment is a locale, remove it
  if (firstSegment && dictionaries[firstSegment]) {
    const remainingPath = segments.slice(1).join("/")
    return remainingPath ? `/${remainingPath}` : "/"
  }

  // If no locale in URL, return as-is
  return pathname
}
