"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { Cart } from "@/components/cart"
import { useCart } from "@/lib/cart-context"
import { locales } from "@/lib/i18n/config"
import type { Locale } from "@/lib/i18n/config"

export function CartWrapper() {
  const pathname = usePathname()
  const { setLocale, state } = useCart()

  useEffect(() => {
    const pathSegments = pathname.split("/")
    const detectedLocale = pathSegments[1] as Locale

    if (detectedLocale && locales.includes(detectedLocale)) {
      if (state.locale !== detectedLocale) {
        setLocale(detectedLocale)
      }
    } else {
      if (state.locale !== "en") {
        setLocale("en")
      }
    }
  }, [pathname, setLocale, state.locale])

  // Get current locale from pathname
  const getCurrentLocale = (): Locale => {
    const pathSegments = pathname.split("/")
    const detectedLocale = pathSegments[1] as Locale
    if (detectedLocale && locales.includes(detectedLocale)) {
      return detectedLocale
    }
    return "en"
  }

  return <Cart locale={getCurrentLocale()} />
} 