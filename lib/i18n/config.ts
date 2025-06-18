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

export const exchangeRates: Record<string, number> = {
  USD: 1,
  CNY: 7.2,
  JPY: 150,
  EUR: 0.85,
}
