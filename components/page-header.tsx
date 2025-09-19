"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Logo } from "./logo"
import { LanguageSwitcher } from "./language-switcher"
import { CartIcon } from "./cart-icon"
import { designSystem, cn } from "@/lib/design-system"

interface PageHeaderProps {
  showBack?: boolean
  backUrl?: string
  backText?: string
  showLogo?: boolean
  showCart?: boolean
  showLanguage?: boolean
  transparent?: boolean
  className?: string
}

export function PageHeader({
  showBack = true,
  backUrl = "/",
  backText = "Back",
  showLogo = true,
  showCart = true,
  showLanguage = true,
  transparent = false,
  className = "",
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        transparent ? "bg-transparent" : "bg-white/90 backdrop-blur-md border-b border-gray-200",
        className
      )}
    >
      <div className={cn(designSystem.layout.container, designSystem.spacing.page, "py-4")}>
        <div className="flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {showBack && (
              <Link
                href={backUrl}
                className="inline-flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">{backText}</span>
              </Link>
            )}
            {showLogo && !showBack && (
              <Link href="/" className="flex items-center">
                <Logo className="h-8 w-auto" />
              </Link>
            )}
          </div>

          {/* Center section - Logo when back button is shown */}
          {showLogo && showBack && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/" className="flex items-center">
                <Logo className="h-8 w-auto" />
              </Link>
            </div>
          )}

          {/* Right section */}
          <div className="flex items-center gap-4">
            {showLanguage && <LanguageSwitcher />}
            {showCart && <CartIcon />}
          </div>
        </div>
      </div>
    </header>
  )
}