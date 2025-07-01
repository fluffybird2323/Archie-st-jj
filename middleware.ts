import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { locales, defaultLocale } from "@/lib/i18n/config"

// Country to locale mapping
const countryToLocale: Record<string, string> = {
  JP: "ja", // Japan -> Japanese
  CN: "zh-CN", // China -> Chinese
  DE: "de", // Germany -> German
  FR: "fr", // France -> French
  ES: "es", // Spain -> Spanish
  IT: "it", // Italy -> Italian
}

function getLocaleFromLocation(request: NextRequest): string {
  // Get country from Vercel's geo headers
  const country =
    (request as any).geo?.country || request.headers.get("cf-ipcountry") || request.headers.get("x-vercel-ip-country")

  if (country && countryToLocale[country]) {
    return countryToLocale[country]
  }

  // Fallback to Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    const preferredLocale = acceptLanguage.split(",")[0].split("-")[0].toLowerCase()
    if (preferredLocale === "zh") {
      return "zh-CN" // Map zh to zh-CN
    }
    if (locales.includes(preferredLocale as any)) {
      return preferredLocale
    }
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip middleware for API routes, static files, and admin routes
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/realadmin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  // Check if pathname is missing locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    // Check if user has a locale preference cookie
    const localePreference = request.cookies.get("locale-preference")?.value

    let locale = defaultLocale

    if (localePreference && locales.includes(localePreference as any)) {
      // Use saved preference
      locale = localePreference as any
    } else {
      // Auto-detect based on location
      locale = getLocaleFromLocation(request) as any
    }

    // Create response with redirect
    const response = NextResponse.redirect(new URL(`/${locale}${pathname === "/" ? "" : pathname}`, request.url))

    // Set locale preference cookie (expires in 1 year)
    response.cookies.set("locale-preference", locale, {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
}
