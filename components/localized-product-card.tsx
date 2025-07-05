"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import type { Dictionary } from "@/lib/i18n/dictionaries"

// Safely turn any color value into a lowercase string we can feed to CSS.
// Accepts plain strings, objects like { hex: '#ff0000' } or { name: 'Red' }.
function getColorString(input: unknown): string {
  if (typeof input === "string") return input.toLowerCase()

  // common shape: { hex: '#ff0000' }
  if (input && typeof input === "object") {
    // @ts-ignore – best-effort lookup
    const hex = (input as any).hex || (input as any).code
    if (typeof hex === "string") return hex.toLowerCase()
    // @ts-ignore
    const name = (input as any).name
    if (typeof name === "string") return name.toLowerCase()
  }
  return ""
}

interface Product {
  id: string
  name: string
  price: number
  image_url: string
  colors: string[]
  sizes: string[]
  description?: string
  slug: string
}

interface LocalizedProductCardProps {
  product: Product
  dictionary: Dictionary
  locale: string
}

export function LocalizedProductCard({ product, dictionary, locale }: LocalizedProductCardProps) {
  const initialColor = getColorString(product.colors?.[0])
  const [selectedColor, setSelectedColor] = useState<string>(initialColor)
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [isAdding, setIsAdding] = useState(false)
  const { addToCart } = useCart()

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert(dictionary.product.selectSize)
      return
    }

    setIsAdding(true)

    try {
      await addToCart({
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        image: product.image_url,
        quantity: 1,
      })

      // Show success message briefly
      setTimeout(() => setIsAdding(false), 1000)
    } catch (error) {
      console.error("Error adding to cart:", error)
      setIsAdding(false)
    }
  }

  // Use the product name directly, no dictionary lookup needed
  const displayName = product.name

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/${locale}/product/${product.slug}`}>
          <Image
            src={product.image_url || "/placeholder.svg?height=400&width=400"}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize || isAdding}
            className="bg-white text-black hover:bg-gray-100 font-semibold"
          >
            {isAdding ? dictionary.common.loading : dictionary.product.addToCart}
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Link href={`/${locale}/product/${product.slug}`}>
              <h3 className="font-bold text-lg text-gray-900 hover:text-gray-600 transition-colors">{displayName}</h3>
            </Link>
            <p className="text-2xl font-black text-black mt-2">${product.price}</p>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">{dictionary.product.selectColor}</p>
              <div className="flex gap-2">
                {product.colors.map((rawColor) => {
                  const colorStr = getColorString(rawColor)
                  return (
                    <button
                      key={colorStr}
                      onClick={() => setSelectedColor(colorStr)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === colorStr ? "border-black scale-110" : "border-gray-300 hover:border-gray-400"
                      }`}
                      style={{ backgroundColor: colorStr }}
                      title={colorStr || "color"}
                    />
                  )
                })}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">{dictionary.product.selectSize}</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-1 text-sm border rounded transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize || isAdding}
            className="w-full bg-black text-white hover:bg-gray-800 font-semibold py-3"
          >
            {isAdding ? dictionary.common.loading : dictionary.product.addToCart}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
