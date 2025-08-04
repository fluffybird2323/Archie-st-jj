"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Minus, Plus, Ruler } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { loadStripe } from "@stripe/stripe-js"
import { formatPrice, getUSDPrice } from "@/lib/i18n/utils"
import { Logo } from "@/components/logo"
import { CartIcon } from "@/components/cart-icon"
import { LanguageSwitcher } from "@/components/language-switcher"
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

// Add a type for ProductReview
interface ProductReview {
  title: string
  text: string
  images: string[]
  author_name: string
  author_country: string
  rating: number
  review_date: string
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
  const productName = product.translatedName || product.name
  const productDescription = product.translatedDescription || product.description

  const getLocalizedPath = (path: string) => {
    return locale === "en" ? path : `/${locale}${path}`
  }

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
  const aboutUrl = locale === "en" ? "/about" : `/${locale}/about`
  const sizeGuideUrl = locale === "en" ? "/size-guide" : `/${locale}/size-guide`

  // Reviews pagination state
  const REVIEWS_PER_PAGE = 3
  const [reviewPage, setReviewPage] = useState(0)
  const reviews: ProductReview[] = Array.isArray(product.reviews) ? product.reviews : []
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE)
  const paginatedReviews = reviews.slice(reviewPage * REVIEWS_PER_PAGE, (reviewPage + 1) * REVIEWS_PER_PAGE)

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={getLocalizedPath("/")} className="flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href={aboutUrl} className="text-gray-700 hover:text-black transition-colors text-sm font-medium">
                {dictionary.nav.about || "About"}
              </Link>
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
              <LanguageSwitcher />
              <CartIcon />
            </div>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-20">
        <div className="max-w-6xl mx-auto px-4">
          {/* Back Button */}
          <Link
            href={backUrl}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-black mb-8 text-base font-medium"
          >
            <ChevronLeft className="w-5 h-5" />
            {dictionary.nav.back || "Back"}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Product Images Card */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-xl p-6 relative">
                {/* Desktop Layout */}
                <div className="hidden md:block">
                  {/* Main Image - Desktop */}
                  <div
                    ref={imageContainerRef}
                    className="w-full flex items-center justify-center relative rounded-xl overflow-hidden bg-gray-50"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <div className="relative w-full">
                      <Image
                        src={product.images[selectedImage] || "/placeholder.svg"}
                        alt={productName}
                        width={1000}
                        height={1500}
                        className="object-contain w-full h-auto transition-opacity duration-300"
                        priority
                      />
                    </div>

                    {/* Navigation Buttons */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={goToPreviousImage}
                          className="image-nav absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all backdrop-blur-md"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={goToNextImage}
                          className="image-nav absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all backdrop-blur-md"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                        <div className="image-counter absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
                          {selectedImage + 1} / {product.images.length}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Image Grid - Desktop Only */}
                  {product.images.length > 1 && (
                    <div className="mt-4 w-full">
                      <div className="grid grid-cols-4 gap-3">
                        {product.images.map((image, index) => (
                          <button
                            key={`grid-${index}`}
                            onClick={() => setSelectedImage(index)}
                            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                              selectedImage === index ? "border-black ring-1 ring-black" : "border-transparent hover:border-gray-300"
                            }`}
                          >
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`View ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Mobile Layout */}
                <div className="md:hidden">
                  {/* Main Image - Mobile */}
                  <div
                    className="w-full flex items-center justify-center relative rounded-xl overflow-hidden bg-gray-50"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <div className="relative w-full aspect-square">
                      <Image
                        src={product.images[selectedImage] || "/placeholder.svg"}
                        alt={productName}
                        fill
                        className="object-contain transition-opacity duration-300"
                        priority
                      />
                    </div>

                    {/* Navigation Buttons */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={goToPreviousImage}
                          className="image-nav absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all backdrop-blur-md"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <button
                          onClick={goToNextImage}
                          className="image-nav absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all backdrop-blur-md"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-5 h-5 text-gray-700" />
                        </button>
                        <div className="image-counter absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md">
                          {selectedImage + 1} / {product.images.length}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Horizontal Thumbnails - Mobile Only */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2 mt-4 w-full overflow-x-auto pb-2 scrollbar-hide">
                      {product.images.map((image, index) => (
                        <button
                          key={`mobile-${index}`}
                          onClick={() => setSelectedImage(index)}
                          className={`thumbnail flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImage === index ? "border-black ring-1 ring-black" : "border-transparent hover:border-gray-300"
                          }`}
                        >
                          <div className="relative w-full h-full">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`View ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info Card */}
            <div className="w-full flex flex-col gap-8">
              <div className="product-info">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">{productName}</h1>
                <div className="price text-2xl font-bold text-gray-900 mb-2">{formatPrice(product.price, locale)}</div>
                <p className="product-description text-gray-600 text-base mb-6 leading-relaxed">{productDescription}</p>

                {/* Size Selection */}
                <div className="option-section mb-6">
                  <div className="option-label font-semibold mb-3 text-gray-900 text-base">
                    Size: {selectedSize && <span className="text-gray-600">({selectedSize})</span>}
                  </div>
                  <div className="size-options grid grid-cols-3 gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`size-option py-3 rounded-xl text-base font-semibold border-2 transition-all ${
                          selectedSize === size
                            ? "border-black bg-black text-white"
                            : "border-gray-200 bg-white text-gray-900 hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Guide Link */}
                <div className="mb-6">
                  <Link
                    href={sizeGuideUrl}
                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors underline"
                  >
                    <Ruler className="w-4 h-4" />
                    Size Guide
                  </Link>
                </div>

                {/* Color Selection */}
                <div className="option-section mb-6">
                  <div className="option-label font-semibold mb-3 text-gray-900 text-base">
                    Color: {selectedColor && <span className="text-gray-600">({selectedColor})</span>}
                  </div>
                  <div className="color-options flex gap-4">
                    {(product.colors as ColorOption[]).map((colorOpt, idx) => {
                      const colorName = getColorName(colorOpt)
                      return (
                        <button
                          key={idx}
                          onClick={() => handleColorSelect(colorOpt)}
                          className={`color-option px-6 py-2 rounded-full text-base font-semibold border-2 transition-all ${
                            selectedColor === colorName
                              ? "border-black bg-black text-white"
                              : "border-gray-200 bg-white text-gray-900 hover:border-black"
                          }`}
                        >
                          {colorName}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="quantity-section flex items-center gap-6 mb-6">
                  <span className="quantity-label font-semibold text-gray-900">Quantity</span>
                  <div className="quantity-controls flex items-center border-2 border-gray-200 rounded-xl bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity-btn w-11 h-11 flex items-center justify-center text-2xl font-bold text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <input
                      type="number"
                      className="quantity-input w-14 h-11 border-0 text-center text-lg font-semibold bg-transparent focus:outline-none"
                      value={quantity}
                      min={1}
                      readOnly
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="quantity-btn w-11 h-11 flex items-center justify-center text-2xl font-bold text-gray-700 hover:bg-gray-100 rounded-xl transition-all"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="shipping-info bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
                  <div className="shipping-title flex items-center gap-2 font-semibold text-green-800 mb-1">
                    <span role="img" aria-label="box">
                      📦
                    </span>{" "}
                    Free shipping worldwide
                  </div>
                  <div className="shipping-details text-green-700 text-sm">Delivered in 3-7 business days</div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm mb-2">{error}</div>
                )}

                {/* Success Message */}
                {addToCartSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded text-green-600 text-sm mb-2">
                    ✅ Added to cart successfully!
                  </div>
                )}

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!selectedSize || !selectedColor}
                    className="add-to-cart w-full py-5 bg-black text-white text-lg font-bold rounded-lg shadow-lg hover:bg-gray-900 transition-all border-0 min-h-[56px]"
                  >
                    Add to Cart
                  </Button>
                </div>

                {/* Product Details Collapsible */}
                <details className="product-details bg-white rounded-2xl shadow border-0 mt-8">
                  <summary className="details-header flex items-center justify-between cursor-pointer py-3 px-2 text-base font-semibold text-gray-900">
                    <span className="details-title">Product Details</span>
                    <span>▼</span>
                  </summary>
                  <ul className="mt-2 space-y-2 text-gray-600 text-base px-2 pb-4">
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

        {/* Reviews Section */}
        <div className="max-w-6xl mx-auto px-4 mt-16">
          <div className="bg-white rounded-2xl shadow-xl p-10">
            <h2 className="reviews-header text-2xl md:text-3xl font-extrabold mb-8 text-gray-900">Reviews</h2>
            {reviews.length > 0 ? (
              <div>
                <div className="divide-y divide-gray-100">
                  {paginatedReviews.map((review, idx) => (
                    <div key={idx} className="review-card py-8">
                      <div className="review-header flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                        <div className="review-title text-lg md:text-xl font-bold text-gray-900">{review.title}</div>
                        <div className="review-rating flex items-center gap-3">
                          <span className="stars text-yellow-400 text-lg font-bold">
                            {"★".repeat(review.rating)}
                            {"☆".repeat(5 - review.rating)}
                          </span>
                          <span className="review-date text-gray-500 text-sm">
                            {new Date(review.review_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="review-text text-gray-700 text-base leading-relaxed mb-4">{review.text}</p>
                      {Array.isArray(review.images) && review.images.length > 0 && (
                        <div className="review-images flex gap-3 mb-4 flex-wrap">
                          {review.images.map((imgUrl: string, imgIdx: number) => (
                            <div
                              key={imgIdx}
                              className="review-image w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shadow"
                            >
                              <img
                                src={imgUrl || "/placeholder.svg"}
                                alt={`Review image ${imgIdx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="review-author text-gray-500 text-sm font-medium flex items-center gap-2">
                        <span>
                          {review.author_name} {review.author_country}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-10">
                    <button
                      className="px-5 py-2 border border-black rounded-full bg-white text-black font-semibold shadow transition-all hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                      onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
                      disabled={reviewPage === 0}
                      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                    >
                      Previous
                    </button>
                    <span className="mx-3 text-base text-gray-700 font-semibold select-none">
                      Page {reviewPage + 1} of {totalPages}
                    </span>
                    <button
                      className="px-5 py-2 border border-black rounded-full bg-white text-black font-semibold shadow transition-all hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black/30 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
                      onClick={() => setReviewPage((p) => Math.min(totalPages - 1, p + 1))}
                      disabled={reviewPage === totalPages - 1}
                      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500 text-lg text-center py-12">No reviews yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
