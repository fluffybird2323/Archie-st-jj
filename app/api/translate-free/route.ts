import { type NextRequest, NextResponse } from "next/server"
import { translateTextFree, isFreeTranslationAvailable } from "@/lib/free-translate"
import type { Locale } from "@/lib/i18n/config"

export async function POST(request: NextRequest) {
  try {
    const { text, targetLocale, sourceLocale = "en" } = await request.json()

    // Check if free translation is available
    if (!isFreeTranslationAvailable()) {
      return NextResponse.json(
        { error: "Free translation service is not available" },
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

    // Validate text length (MyMemory has limits)
    if (text.length > 500) {
      return NextResponse.json(
        { error: "Text too long for free translation (max 500 characters)" },
        { status: 400 }
      )
    }

    // Handle single text
    if (text) {
      const result = await translateTextFree(text, targetLocale as Locale, sourceLocale as Locale)
      return NextResponse.json({ translation: result })
    }

    return NextResponse.json(
      { error: "No text provided" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Free translation API error:", error)
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    )
  }
}

export async function GET() {
  const isAvailable = isFreeTranslationAvailable()
  
  return NextResponse.json({
    available: isAvailable,
    message: isAvailable ? "Free translation service is available" : "Free translation service is not available",
    service: "MyMemory API",
    limits: "1000 words/day, 500 characters per request",
  })
}
