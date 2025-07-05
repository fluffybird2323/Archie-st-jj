import { type NextRequest, NextResponse } from "next/server"
import { translateText, translateMultipleTexts, isGoogleTranslateConfigured } from "@/lib/google-translate"
import type { Locale } from "@/lib/i18n/config"

export async function POST(request: NextRequest) {
  try {
    const { text, texts, targetLocale, sourceLocale = "en" } = await request.json()

    // Check if Google Translate is configured
    if (!isGoogleTranslateConfigured()) {
      return NextResponse.json(
        { error: "Google Translate API is not configured" },
        { status: 500 }
      )
    }

    // Validate target locale
    const validLocales = ["en", "zh-CN", "ja", "de", "fr", "es", "it"]
    if (!validLocales.includes(targetLocale)) {
      return NextResponse.json(
        { error: "Invalid target locale" },
        { status: 400 }
      )
    }

    let result

    // Handle multiple texts
    if (texts && Array.isArray(texts)) {
      result = await translateMultipleTexts(texts, targetLocale as Locale, sourceLocale as Locale)
      return NextResponse.json({ translations: result })
    }

    // Handle single text
    if (text) {
      result = await translateText(text, targetLocale as Locale, sourceLocale as Locale)
      return NextResponse.json({ translation: result })
    }

    return NextResponse.json(
      { error: "No text or texts provided" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Translation API error:", error)
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    )
  }
}

export async function GET() {
  const isConfigured = isGoogleTranslateConfigured()
  
  return NextResponse.json({
    configured: isConfigured,
    message: isConfigured ? "Google Translate API is configured" : "Google Translate API is not configured",
  })
}
