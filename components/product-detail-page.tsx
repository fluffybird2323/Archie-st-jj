"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Minus, Plus } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import type { Product } from "@/lib/products-dynamic"
import { formatPrice, getUSDPrice } from "@/lib/i18n/utils"

const getStripePromise = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  return publishableKey ? loadStripe(publishableKey) : null
}

interface ProductDetailPageProps {
  product: Product
  dictionary: Dictionary
  locale: Locale
}

export function ProductDetailPage({ product, dictionary, locale }: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const backUrl = locale === "en" ? "/" : `/${locale}`

  const handleCheckout = async () => {
    if (!selectedSize || !selectedColor) {
      setError("Please select size and color")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const stripePromise = getStripePromise()
      if (!stripePromise) {
        throw new Error("Payment system is not configured")
      }

      const productDisplayName =
        dictionary.productNames[product.name as keyof typeof dictionary.productNames] || product.name

      const productTitle = `${productDisplayName} - Size: ${selectedSize} - Color: ${selectedColor}`
      const usdPrice = getUSDPrice(product.price)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: usdPrice * quantity,
          productName: productTitle,
          productImage: product.images[0],
          locale: locale,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout session")
      }

      const stripe = await stripePromise
      if (stripe && data.sessionId) {
        const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId })
        if (error) {
          throw new Error(error.message)
        }
      }
    } catch (error) {
      console.error("Checkout error:", error)
      setError(error instanceof Error ? error.message : "An error occurred during checkout")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link
          href={backUrl}
          className="inline-flex items-center gap-2 text-black hover:text-gray-600 mb-6 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images - More Compact */}
          <div className="space-y-3">
            <div className="aspect-square overflow-hidden rounded-lg bg-light-100 max-w-md mx-auto lg:mx-0">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={dictionary.productNames[product.name as keyof typeof dictionary.productNames] || product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto lg:mx-0">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded border-2 transition-colors ${
                    selectedImage === index ? "border-black" : "border-light-300 hover:border-gray-400"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`View ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info - More Compact */}
          <div className="space-y-4 max-w-md">
            {/* Product Title & Price */}
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-black">
                {dictionary.productNames[product.name as keyof typeof dictionary.productNames] || product.name}
              </h1>
              <p className="text-2xl font-black text-black">{formatPrice(product.price, locale)}</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {dictionary.productDescriptions[product.description as keyof typeof dictionary.productDescriptions] ||
                  product.description}
              </p>
            </div>

            {/* Size Selection - Compact Grid */}
            <div>
              <h3 className="text-sm font-bold text-black mb-2">{dictionary.products.selectSize}</h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border-2 rounded text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-light-300 text-black hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection - Compact */}
            <div>
              <h3 className="text-sm font-bold text-black mb-2">{dictionary.products.selectColor}</h3>
              <div className="flex gap-2 flex-wrap">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`py-2 px-3 border-2 rounded text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-light-300 text-black hover:border-gray-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity - Inline */}
            <div className="flex items-center gap-4">
              <h3 className="text-sm font-bold text-black">Quantity</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1 border border-light-300 rounded hover:border-gray-400 transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-lg font-bold text-black w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-1 border border-light-300 rounded hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Free Shipping Notice - Compact */}
            <div className="bg-green-50 border border-green-200 rounded p-3">
              <p className="text-green-800 font-medium text-sm">🚚 Free shipping worldwide</p>
              <p className="text-green-600 text-xs">Delivered in 3-7 business days</p>
            </div>

            {/* Error Message */}
            {error && <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">{error}</div>}

            {/* Buy Button */}
            <Button
              onClick={handleCheckout}
              disabled={isLoading || !selectedSize || !selectedColor}
              className="nike-button w-full py-3"
            >
              {isLoading ? dictionary.products.processing : dictionary.products.buyNow}
            </Button>

            {/* Product Details - Collapsible/Compact */}
            <details className="border-t border-light-200 pt-4">
              <summary className="text-sm font-bold text-black cursor-pointer hover:text-gray-600">
                {dictionary.products.productDetails}
              </summary>
              <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                <li>• Premium materials and construction</li>
                <li>• Unisex sizing for all body types</li>
                <li>• Machine washable</li>
                <li>• Designed for comfort and durability</li>
                <li>• Free worldwide shipping</li>
              </ul>
            </details>
          </div>
        </div>
      </div>
    </div>
  )
}
