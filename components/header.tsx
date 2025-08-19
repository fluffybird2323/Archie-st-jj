"use client"

import { useState } from "react"
import Link from "next/link"
import { Logo } from "./logo"
import { LanguageSwitcher } from "./language-switcher"
import { CartIcon } from "./cart-icon"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"

function Header({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const getLocalizedPath = (path: string) => {
    return locale === "en" ? path : `/${locale}${path}`
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={getLocalizedPath("/")} className="flex items-center text-2xl font-bold text-gray-900">
            ARTIE
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href={getLocalizedPath("/")} className="text-gray-900 hover:text-gray-600 font-medium">
              {dictionary.nav.home}
            </Link>
            <Link href={getLocalizedPath("/#products")} className="text-gray-900 hover:text-gray-600 font-medium">
              {dictionary.nav.products}
            </Link>
            <Link href={getLocalizedPath("/about")} className="text-gray-900 hover:text-gray-600 font-medium">
              {dictionary.nav.about}
            </Link>
            <Link href={getLocalizedPath("/contact")} className="text-gray-900 hover:text-gray-600 font-medium">
              {dictionary.nav.contact}
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              className="md:hidden text-gray-900 hover:text-gray-600 focus:outline-none"
              aria-label="Toggle menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <LanguageSwitcher />
            <CartIcon />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
          <nav className="flex flex-col p-4">
            <Link
              href={getLocalizedPath("/")}
              className="text-gray-900 hover:text-gray-600 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.home}
            </Link>
            <Link
              href={getLocalizedPath("/#products")}
              className="text-gray-900 hover:text-gray-600 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.products}
            </Link>
            <Link
              href={getLocalizedPath("/about")}
              className="text-gray-900 hover:text-gray-600 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.about}
            </Link>
            <Link
              href={getLocalizedPath("/contact")}
              className="text-gray-900 hover:text-gray-600 font-medium py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {dictionary.nav.contact}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
