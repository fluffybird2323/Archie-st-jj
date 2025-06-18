"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import type { Product } from "@/lib/products-dynamic" // Changed import for Product type
import { formatPrice } from "@/lib/i18n/utils"

interface LocalizedProductCardProps {
  product: Product
  dictionary: Dictionary
  locale: Locale
}

export function LocalizedProductCard({ product, dictionary, locale }: LocalizedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const productUrl = locale === "en" ? `/product/${product.slug}` : `/${locale}/product/${product.slug}`

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
      <Link href={productUrl}>
        <div
          className="relative aspect-square overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Image
            src={isHovered ? product.images[1] : product.images[0]}
            alt={dictionary.productNames[product.name]}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </Link>
      <div className="p-6">
        <Link href={productUrl}>
          <h3 className="text-xl font-bold text-black mb-2 hover:text-gray-600 transition-colors">
            {dictionary.productNames[product.name]}
          </h3>
        </Link>
        <p className="text-2xl font-black text-black mb-6">{formatPrice(product.price, locale)}</p>
        <Link href={productUrl}>
          <Button className="nike-button w-full">{dictionary.products.viewProduct}</Button>
        </Link>
      </div>
    </div>
  )
}
