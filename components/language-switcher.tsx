"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronDown, Globe } from "lucide-react"
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n/config"
import { getLocaleFromUrl, removeLocaleFromUrl } from "@/lib/i18n/utils"

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const currentLocale = getLocaleFromUrl(pathname)
  const pathWithoutLocale = removeLocaleFromUrl(pathname)

  const handleLocaleChange = (locale: Locale) => {
    // Get the current path without any locale prefix
    let pathWithoutAnyLocale = pathname

    // Remove any existing locale prefix from the current path
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length > 0) {
      const firstSegment = segments[0] as Locale
      // Check if first segment is a valid locale and remove it
      if (locales.includes(firstSegment)) {
        pathWithoutAnyLocale = segments.length > 1 ? `/${segments.slice(1).join("/")}` : "/"
      }
    }

    // Construct new path with the selected locale
    const newPath = locale === "en"
      ? pathWithoutAnyLocale === "/" ? "/" : pathWithoutAnyLocale
      : `/${locale}${pathWithoutAnyLocale === "/" ? "" : pathWithoutAnyLocale}`

    // Set locale preference cookie
    document.cookie = `locale-preference=${locale}; path=/; max-age=${365 * 24 * 60 * 60}; samesite=lax`

    router.push(newPath)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-black hover:text-gray-600"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden md:inline">
          {localeFlags[currentLocale]} {localeNames[currentLocale]}
        </span>
        <span className="md:hidden">{localeFlags[currentLocale]}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            {locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg ${
                  currentLocale === locale ? "bg-gray-50 font-medium" : ""
                }`}
              >
                <span className="text-lg">{localeFlags[locale]}</span>
                <span className="text-black">{localeNames[locale]}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
