"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw, Star, ChevronLeft, Ruler } from "lucide-react"
import { useCart } from "@/lib/cart-context"
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

interface ProductDetailPageProps {
  product: Product
  dictionary: Dictionary
  locale: Locale
}

export function ProductDetailPage({ product, dictionary, locale }: ProductDetailPageProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || "")
  const [selectedImage, setSelectedImage] = useState(0)
  const { addToCart } = useCart()

  const getLocalizedPath = (path: string) => {
    return locale === "en" ? path : `/${locale}${path}`
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(dictionary.product.selectSize)
      return
    }

    addToCart({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity: 1,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={getLocalizedPath("/")} className="flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href={getLocalizedPath("/")} className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.home}
              </Link>
              <Link href={getLocalizedPath("/#products")} className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.products}
              </Link>
              <Link href={getLocalizedPath("/#about")} className="text-gray-900 hover:text-gray-600 font-medium">
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

      {/* Breadcrumb */}
      <div className="pt-20 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href={getLocalizedPath("/")} className="hover:text-gray-900">
              {dictionary.nav.home}
            </Link>
            <span>/</span>
            <Link href={getLocalizedPath("/#products")} className="hover:text-gray-900">
              {dictionary.nav.products}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <div className="px-4 mb-6">
        <div className="max-w-7xl mx-auto">
          <Link
            href={getLocalizedPath("/")}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            {dictionary.product.backToProducts}
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square relative overflow-hidden rounded-lg bg-gray-100 border-2 transition-colors ${
                        selectedImage === index ? "border-black" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-black text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">(4.8) • 127 {dictionary.product.reviews}</span>
                </div>

                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Color Selection */}
              {product.colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {dictionary.product.color}: {selectedColor}
                  </h3>
                  <div className="flex space-x-3">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor === color
                            ? "border-gray-900 scale-110"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{dictionary.product.size}</h3>
                  <Link
                    href={getLocalizedPath("/size-guide")}
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                  >
                    <Ruler className="w-4 h-4 mr-1" />
                    {dictionary.product.sizeGuide}
                  </Link>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 border rounded-lg font-medium transition-colors ${
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

              {/* Add to Cart */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 text-lg font-semibold"
                  disabled={!selectedSize}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  {dictionary.product.addToCart}
                </Button>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Heart className="w-5 h-5 mr-2" />
                    {dictionary.product.addToWishlist}
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share2 className="w-5 h-5 mr-2" />
                    {dictionary.product.share}
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="font-medium">{dictionary.product.freeShipping}</p>
                    <p className="text-sm text-gray-600">{dictionary.product.freeShippingDesc}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <RotateCcw className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="font-medium">{dictionary.product.easyReturns}</p>
                    <p className="text-sm text-gray-600">{dictionary.product.easyReturnsDesc}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <Shield className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="font-medium">{dictionary.product.warranty}</p>
                    <p className="text-sm text-gray-600">{dictionary.product.warrantyDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">{dictionary.product.details}</TabsTrigger>
                <TabsTrigger value="shipping">{dictionary.product.shipping}</TabsTrigger>
                <TabsTrigger value="reviews">{dictionary.product.reviews}</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <h3 className="text-xl font-semibold mb-4">{dictionary.product.productDetails}</h3>
                      <p className="text-gray-600 mb-6">{product.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">{dictionary.product.materials}</h4>
                          <ul className="text-gray-600 space-y-1">
                            <li>• 100% Premium Cotton</li>
                            <li>• Soft fleece lining</li>
                            <li>• Durable construction</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">{dictionary.product.care}</h4>
                          <ul className="text-gray-600 space-y-1">
                            <li>• Machine wash cold</li>
                            <li>• Tumble dry low</li>
                            <li>• Do not bleach</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{dictionary.product.shippingInfo}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold">{dictionary.product.standardShipping}</h4>
                        <p className="text-gray-600">5-7 business days • Free on orders over $75</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">{dictionary.product.expressShipping}</h4>
                        <p className="text-gray-600">2-3 business days • $15</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">{dictionary.product.overnightShipping}</h4>
                        <p className="text-gray-600">Next business day • $25</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{dictionary.product.customerReviews}</h3>
                    <div className="space-y-6">
                      <div className="border-b pb-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-semibold">Sarah M.</span>
                          <span className="text-gray-500">• 2 weeks ago</span>
                        </div>
                        <p className="text-gray-600">
                          Amazing quality and super comfortable! The fit is perfect and the material feels premium.
                        </p>
                      </div>

                      <div className="border-b pb-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-semibold">Mike R.</span>
                          <span className="text-gray-500">• 1 month ago</span>
                        </div>
                        <p className="text-gray-600">
                          Great hoodie! Exactly as described and shipped quickly. Will definitely order again.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
