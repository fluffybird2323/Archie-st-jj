"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
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
  const [currentImage, setCurrentImage] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  // Remove autoSlideRef and auto-slide logic

  const images = product.images && product.images.length > 0 ? product.images : ["/placeholder.svg?height=400&width=400"]

  // Manual navigation handlers
  const goToPrev = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }
  const goToNext = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
      e.preventDefault()
    }
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const productUrl = locale === "en" ? `/product/${product.slug}` : `/${locale}/product/${product.slug}`
  const productName = product.translatedName || product.name

  return (
    <div
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in cursor-pointer">
        <Link href={productUrl}>
          <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
            {/* Sliding images */}
            <div
              className="w-full h-full flex transition-transform duration-700"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              {images.map((img, idx) => (
                <div key={img + idx} className="relative w-full h-full flex-shrink-0">
                  <Image
                    src={imageError ? "/placeholder.svg?height=400&width=400" : img}
                    alt={productName}
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    onError={() => setImageError(true)}
                    priority={false}
                  />
                </div>
              ))}
            </div>
            {/* Remove loading placeholder to prevent blinking */}
            {/* Navigation Buttons (show on hover and if multiple images) */}
            {images.length > 1 && isHovered && (
              <>
                <button
                  onClick={goToPrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-200 z-20"
                  aria-label="Previous image"
                  tabIndex={0}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-200 z-20"
                  aria-label="Next image"
                  tabIndex={0}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                {/* Image Counter */}
                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs z-20">
                  {currentImage + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </Link>
        <Link href={productUrl} className="block">
          <div className="p-6">
            <h3 className="font-outfit text-xl font-bold text-black mb-2 group-hover:text-gray-600 transition-colors">
              {productName}
            </h3>
            <p className="font-outfit text-2xl font-black text-black">{formatPrice(product.price, locale)}</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
