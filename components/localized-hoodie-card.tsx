"use client"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { loadStripe } from "@stripe/stripe-js"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { formatPrice } from "@/lib/i18n/utils"

// Only initialize Stripe if the publishable key is available
const getStripePromise = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  return publishableKey ? loadStripe(publishableKey) : null
}

interface LocalizedHoodieCardProps {
  name: keyof Dictionary["productNames"]
  price: number
  image1: string
  image2: string
  dictionary: Dictionary
  locale: Locale
}

export function LocalizedHoodieCard({ name, price, image1, image2, dictionary, locale }: LocalizedHoodieCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Check if Stripe is configured
      const stripePromise = getStripePromise()
      if (!stripePromise) {
        throw new Error("Payment system is not configured")
      }

      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId: price,
          productName: dictionary.productNames[name],
          productImage: image1,
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
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div
        className="relative aspect-square overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={isHovered ? image2 : image1}
          alt={dictionary.productNames[name]}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-black mb-2">{dictionary.productNames[name]}</h3>
        <p className="text-2xl font-black text-black mb-6">{formatPrice(price, locale)}</p>

        {error && <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">{error}</div>}

        <Button onClick={handleCheckout} disabled={isLoading} className="nike-button w-full">
          {isLoading ? dictionary.products.processing : dictionary.products.buyNow}
        </Button>
      </div>
    </div>
  )
}
