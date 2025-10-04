export const locales = ["en", "zh-CN", "ja", "de", "fr", "es", "it"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

export const localeNames: Record<Locale, string> = {
  en: "English",
  "zh-CN": "中文",
  ja: "日本語",
  de: "Deutsch",
  fr: "Français",
  es: "Español",
  it: "Italiano",
}

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  "zh-CN": "🇨🇳",
  ja: "🇯🇵",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  it: "🇮🇹",
}

export const currencies: Record<Locale, { code: string; symbol: string }> = {
  en: { code: "USD", symbol: "$" },
  "zh-CN": { code: "CNY", symbol: "¥" },
  ja: { code: "JPY", symbol: "¥" },
  de: { code: "EUR", symbol: "€" },
  fr: { code: "EUR", symbol: "€" },
  es: { code: "EUR", symbol: "€" },
  it: { code: "EUR", symbol: "€" },
}

// Country to currency mapping
export const countryToCurrency: Record<string, { code: string; symbol: string }> = {
  US: { code: "USD", symbol: "$" },
  CA: { code: "CAD", symbol: "C$" },
  GB: { code: "GBP", symbol: "£" },
  AU: { code: "AUD", symbol: "A$" },
  DE: { code: "EUR", symbol: "€" },
  FR: { code: "EUR", symbol: "€" },
  JP: { code: "JPY", symbol: "¥" },
  IN: { code: "INR", symbol: "₹" },
  BR: { code: "BRL", symbol: "R$" },
  MX: { code: "MXN", symbol: "$" },
}

// Currencies supported by Square API
// https://developer.squareup.com/reference/square/enums/Currency
export const squareSupportedCurrencies = [
  "USD", "CAD", "GBP", "AUD", "EUR", "JPY"
]

export const exchangeRates: Record<string, number> = {
  USD: 1,
  CAD: 1.35,
  GBP: 0.79,
  AUD: 1.52,
  EUR: 0.85,
  CNY: 7.2,
  JPY: 150,
  INR: 83,
  BRL: 5.0,
  MXN: 17.5,
}
