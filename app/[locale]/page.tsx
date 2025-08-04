"use client"

import Link from "next/link"
import { getDictionary } from "@/lib/i18n/utils"
import { LocalizedVideoBanner } from "@/components/localized-video-banner"
import { LocalizedProductCard } from "@/components/localized-product-card"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { CartIcon } from "@/components/cart-icon"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getProducts } from "@/lib/products-dynamic"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Product } from "@/lib/products-dynamic"
import { useState, useEffect } from "react"

interface HomePageProps {
  params: {
    locale: Locale
  }
}

// Default dictionary with all required properties
const defaultDictionary: Dictionary = {
  nav: {
    home: "Home",
    products: "Products",
    about: "About",
    contact: "Contact",
    cart: "Cart",
    back: "Back",
  },
  sections: { exploreLatest: "Explore Latest", exploreLatestSubtitle: "Check out our newest products" },
  hero: {
    title: "ARTIE",
    subtitle: "",
    shopNow: "SHOP NOW",
    readyForAnything: "Ready for Anything",
    readyForAnythingSubtitle: "Designed for comfort and performance",
    comfortAdapted: "Comfort Adapted",
    engineeredText: "Engineered for your lifestyle",
  },
  products: {
    title: "Our Products",
    selectSize: "Select Size",
    selectColor: "Select Color",
    addToCart: "Add to Cart",
    addedToCart: "Added to Cart!",
    productDetails: "Product Details",
    viewProduct: "View Product",
  },
  cart: {
    title: "Shopping Cart",
    empty: "Your cart is empty",
    total: "Total",
    checkout: "Checkout",
    remove: "Remove",
    quantity: "Quantity",
  },
  success: {
    title: "Order Successful!",
    message: "Thank you for your purchase!",
    continueShopping: "Continue Shopping",
    orderNumber: "Order Number",
    estimatedDelivery: "Estimated Delivery",
    businessDays: "3-7 business days",
    trackingInfo: "You will receive tracking information via email once your order ships.",
  },
  sizeGuide: {
    title: "SIZE GUIDE",
    subtitle: "Find your perfect fit",
    productDescription: "Premium cotton-poly blend",
    size: "SIZE",
    height: "HEIGHT",
    weight: "WEIGHT",
    chest: "CHEST",
    waist: "WAIST",
    visualGuide: "VISUAL FIT GUIDE",
    fitComparison: "FIT COMPARISON",
    slimFit: "Slim Fit",
    regularFit: "Regular Fit",
    relaxedFit: "Relaxed Fit",
    looseFit: "Loose Fit",
    oversizedFit: "Oversized Fit",
    howToMeasure: "HOW TO MEASURE",
    chestMeasurement: "Chest Measurement",
    chestInstructions: "Measure around the chest",
    waistMeasurement: "Waist Measurement",
    waistInstructions: "Measure around the waist",
    heightMeasurement: "Height Measurement",
    heightInstructions: "Stand straight and measure",
    weightMeasurement: "Weight Reference",
    weightInstructions: "Use your current weight",
    sizingNotes: "SIZING NOTES",
    sizingNotesText: "Measurements may vary",
    backToShopping: "Back to Shopping",
  },
  footer: {
    about: "About Us",
    aboutText: "We create high-quality products designed for comfort and performance.",
    support: "SUPPORT",
    sizeGuide: "Size Guide",
    shippingInfo: "Shipping Information",
    returnsExchanges: "Returns & Exchanges",
    contactUs: "Contact Us",
    newsletter: "Newsletter",
    newsletterText: "Subscribe to receive updates, access to exclusive deals, and more.",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",
    followUs: "Follow Us",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    sustainability: "Sustainability",
    allRightsReserved: "All rights reserved.",
  },
  common: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
  },
}

export default function HomePage({ params }: HomePageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { locale } = params // Corrected: Directly destructure locale from params

  // Initialize with default values to prevent undefined errors
  const [dictionary, setDictionary] = useState<Dictionary>(defaultDictionary)
  const [products, setProducts] = useState<Product[]>([])

  // Load data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const dict = await getDictionary(locale)
        const prods = await getProducts(locale)
        if (dict) setDictionary(dict)
        if (prods) setProducts(prods)
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    loadData()
  }, [locale])

  const getLocalizedPath = (path: string) => {
    return locale === "en" ? path : `/${locale}${path}`
  }

  return (
    <main className="min-h-screen">
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
                {dictionary?.nav?.home || "Home"}
              </Link>
              <Link
                href={getLocalizedPath("/#products")}
                className="text-gray-900 hover:text-gray-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dictionary?.nav?.products || "Products"}
              </Link>
              <Link
                href={getLocalizedPath("/#about")}
                className="text-gray-900 hover:text-gray-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dictionary?.nav?.about || "About"}
              </Link>
              <Link
                href={getLocalizedPath("/contact")}
                className="text-gray-900 hover:text-gray-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {dictionary?.nav?.contact || "Contact"}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Video Banner */}
      <LocalizedVideoBanner dictionary={dictionary} locale={locale} />

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">{dictionary.sections.exploreLatest}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{dictionary.sections.exploreLatestSubtitle}</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <LocalizedProductCard key={product.id} product={product} dictionary={dictionary} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer dictionary={dictionary} locale={locale} />
    </main>
  )
}
