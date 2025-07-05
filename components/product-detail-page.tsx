"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { loadStripe } from "@stripe/stripe-js"
import { formatPrice, getUSDPrice } from "@/lib/i18n/utils"
import type { Product } from "@/lib/products-dynamic"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"

// Handle both string colors and color-index objects
type ColorOption = string | { name: string; imageIndex: number }

const getColorName = (c: ColorOption): string => (typeof c === "string" ? c : (c?.name ?? ""))
const getColorImageIndex = (c: ColorOption): number => (typeof c === "string" ? 0 : (c?.imageIndex ?? 0))

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
  const [addToCartSuccess, setAddToCartSuccess] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)

  const { addItem, toggleCart } = useCart()

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50

  // Use translated content if available, otherwise fall back to static dictionary, then original
  const productName =
    product.translatedName ||
    dictionary.productNames?.[product.name as keyof typeof dictionary.productNames] ||
    product.name

  const productDescription =
    product.translatedDescription ||
    dictionary.productDescriptions?.[product.description as keyof typeof dictionary.productDescriptions] ||
    product.description

  // Handle color selection and image switching
  const handleColorSelect = (colorOption: ColorOption) => {
    const colorName = getColorName(colorOption)
    const imageIndex = getColorImageIndex(colorOption)

    setSelectedColor(colorName)

    // Switch to the corresponding image if it exists
    if (imageIndex < product.images.length) {
      setSelectedImage(imageIndex)
    }
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setError("Please select size and color")
      return
    }

    addItem({
      productId: product.id,
      name: productName,
      price: product.price,
      image: product.images[selectedImage] || product.images[0], // Use current selected image
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      slug: product.slug,
    })

    setAddToCartSuccess(true)
    setError(null)

    // Automatically open the cart
    toggleCart()

    // Hide success message after 3 seconds
    setTimeout(() => setAddToCartSuccess(false), 3000)
  }

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

      const productTitle = `${productName} - Size: ${selectedSize} - Color: ${selectedColor}`
      const usdPrice = getUSDPrice(product.price)

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: usdPrice * quantity,
          productName: productTitle,
          productImage: product.images[selectedImage] || product.images[0],
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

  // Navigation functions
  const goToPreviousImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const goToNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      goToNextImage()
    }
    if (isRightSwipe) {
      goToPreviousImage()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPreviousImage()
      } else if (e.key === "ArrowRight") {
        goToNextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const backUrl = locale === "en" ? "/" : `/${locale}`

  return (
    <div className="min-h-screen bg-white pt-16">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Link
          href={backUrl}
          className="inline-flex items-center gap-2 text-black hover:text-gray-600 mb-6 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          {dictionary.nav.back || "Back"}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images - Enhanced with Navigation */}
          <div className="space-y-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-light-100 max-w-md mx-auto lg:mx-0 group">
              {/* Main Image */}
              <div
                ref={imageContainerRef}
                className="w-full h-full relative"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={productName}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Navigation Buttons - Only show if there are multiple images */}
                {product.images.length > 1 && (
                  <>
                    {/* Left Button */}
                    <button
                      onClick={goToPreviousImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 lg:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Right Button */}
                    <button
                      onClick={goToNextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100 lg:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {selectedImage + 1} / {product.images.length}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Thumbnail Navigation - Horizontal Scrolling Gallery */}
            {product.images.length > 1 && (
              <div className="max-w-md mx-auto lg:mx-0">
                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 aspect-[3/4] w-16 overflow-hidden rounded border-2 transition-colors ${
                        selectedImage === index ? "border-black" : "border-light-300 hover:border-gray-400"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`View ${index + 1}`}
                        width={64}
                        height={85}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info - More Compact */}
          <div className="space-y-4 max-w-md">
            {/* Product Title & Price */}
            <div className="space-y-2">
              <h1 className="text-2xl font-black text-black">{productName}</h1>
              <p className="text-2xl font-black text-black">{formatPrice(product.price, locale)}</p>
              <p className="text-gray-600 text-sm leading-relaxed">{productDescription}</p>
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

            {/* Color Selection with Image Switching */}
            <div>
              <h3 className="text-sm font-bold text-black mb-2">{dictionary.products.selectColor}</h3>
              <div className="flex gap-2 flex-wrap">
                {(product.colors as ColorOption[]).map((colorOpt, idx) => {
                  const colorName = getColorName(colorOpt)
                  return (
                    <button
                      key={idx}
                      onClick={() => handleColorSelect(colorOpt)}
                      className={`py-2 px-3 border-2 rounded text-sm font-medium transition-colors ${
                        selectedColor === colorName
                          ? "border-black bg-black text-white"
                          : "border-light-300 text-black hover:border-gray-400"
                      }`}
                    >
                      {colorName}
                    </button>
                  )
                })}
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

            {/* Success Message */}
            {addToCartSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 rounded text-green-600 text-sm">
                ✅ {dictionary.products.addedToCart}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize || !selectedColor}
                className="w-full py-3 bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-colors rounded-full"
              >
                {dictionary.products.addToCart}
              </Button>
            </div>

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
