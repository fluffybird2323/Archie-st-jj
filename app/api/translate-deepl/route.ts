import { type NextRequest, NextResponse } from "next/server"
import { translateTextDeepL, isDeepLTranslationAvailable, getDeepLUsage } from "@/lib/deepl-translate"
import type { Locale } from "@/lib/i18n/config"

export async function POST(request: NextRequest) {
  try {
    const { text, targetLocale, sourceLocale = "en" } = await request.json()

    // Check if DeepL translation is available
    if (!isDeepLTranslationAvailable()) {
      return NextResponse.json(
        { error: "DeepL translation service is not available" },
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

    // Handle single text
    if (text) {
      const result = await translateTextDeepL(text, targetLocale as Locale, sourceLocale as Locale)
      return NextResponse.json({ translation: result })
    }

    return NextResponse.json(
      { error: "No text provided" },
      { status: 400 }
    )
  } catch (error) {
    console.error("DeepL translation API error:", error)
    return NextResponse.json(
      { error: "Translation failed" },
      { status: 500 }
    )
  }
}

export async function GET() {
  const isAvailable = isDeepLTranslationAvailable()
  
  if (isAvailable) {
    try {
      const usage = await getDeepLUsage()
      return NextResponse.json({
        available: true,
        message: "DeepL translation service is available",
        service: "DeepL API",
        usage: usage,
      })
    } catch (error) {
      return NextResponse.json({
        available: true,
        message: "DeepL translation service is available",
        service: "DeepL API",
        usage: "Unable to fetch usage statistics",
      })
    }
  }
  
  return NextResponse.json({
    available: false,
    message: "DeepL translation service is not available",
    service: "DeepL API",
  })
} 