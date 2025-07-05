"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import type { Product } from "@/lib/products-dynamic"
import { formatPrice } from "@/lib/i18n/utils"

interface LocalizedProductCardProps {
  product: Product
  dictionary: Dictionary
  locale: Locale
}

export function LocalizedProductCard({ product, dictionary, locale }: LocalizedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  const productUrl = locale === "en" ? `/product/${product.slug}` : `/${locale}/product/${product.slug}`

  // Use translated name if available, otherwise fall back to original name
  const productName = product.translatedName || product.name

  // Get the primary image with fallback
  const primaryImage = product.images?.[0] || "/placeholder.svg?height=400&width=400"
  const hoverImage = product.images?.[1] || primaryImage

  return (
    <Link href={productUrl} className="block group">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in cursor-pointer">
        <div
          className="relative aspect-[3/4] overflow-hidden bg-gray-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={imageError ? "/placeholder.svg?height=400&width=400" : isHovered ? hoverImage : primaryImage}
            alt={productName}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => setImageError(true)}
            priority={false}
          />

          {/* Loading placeholder */}
          {!imageError && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}
        </div>
        <div className="p-6">
          <h3 className="font-outfit text-xl font-bold text-black mb-2 group-hover:text-gray-600 transition-colors">
            {productName}
          </h3>
          <p className="font-outfit text-2xl font-black text-black">{formatPrice(product.price, locale)}</p>
        </div>
      </div>
    </Link>
  )
}
