"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2, Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/i18n/utils"
import { currencies, exchangeRates } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"
import { CheckoutForm, type CustomerInfo } from "@/components/checkout-form"
import { LoadingOverlay } from "@/components/loading-overlay"

interface CartProps {
  locale: Locale
}

export function Cart({ locale }: CartProps) {
  const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false)
  const dictionary = getDictionary(locale)

  // Calculate total that matches Stripe calculation exactly
  const getStripeMatchingTotal = () => {
    const currency = currencies[locale] || currencies.en
    const exchangeRate = exchangeRates[currency.code] || 1

    // If USD, calculate directly
    if (currency.code === "USD") {
      return Math.round(
        state.items.reduce((total, item) => total + item.price * item.quantity, 0) * 100
      ) / 100
    }

    // If JPY, assume price is already in JPY (no conversion)
    if (currency.code === "JPY") {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    // For other currencies, apply exchange rate
    const localizedTotal = state.items.reduce((total, item) => {
      return total + item.price * item.quantity * exchangeRate
    }, 0)
    return Math.round(localizedTotal * 100) / 100
  }

  const processCheckout = async (customerInfo: CustomerInfo) => {
    if (state.items.length === 0) return

    setIsLoading(true)
    setError(null)
    setShowCheckoutForm(false)
    setShowLoadingOverlay(true) // Show loading overlay

    try {
      // Create line items for Square payment
      const lineItems = state.items.map((item) => ({
        name: item.name,
        price: item.price,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        image: item.image
      }))

      let response;
      let data;

      try {
        response = await fetch("/api/create-square-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lineItems,
            locale: locale,
            customerInfo: customerInfo
          }),
        })

        data = await response.json()
      } catch (fetchError) {
        console.error("Network error during checkout:", fetchError)
        throw new Error("Network error: Unable to connect to payment service. Please check your connection and try again.")
      }

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment link")
      }

      // Redirect to Square's hosted checkout page
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No payment URL received")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      setError(error instanceof Error ? error.message : "An error occurred during checkout")
      setShowCheckoutForm(true) // Re-show form on error
      setShowLoadingOverlay(false) // Hide loading overlay on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleCheckout = () => {
    if (state.items.length === 0) return
    // Close the cart and show the mandatory checkout form
    closeCart()
    setShowCheckoutForm(true)
  }

  return (
    <>
      {/* Loading Overlay */}
      {showLoadingOverlay && (
        <LoadingOverlay
          message={dictionary.checkout.loading?.preparingCheckout || "Preparing secure checkout"}
          subMessage={dictionary.checkout.loading?.doNotClose || "Do not close or refresh this page"}
        />
      )}

      {/* Mandatory Checkout Form */}
      {showCheckoutForm && (
        <CheckoutForm
          onSubmit={processCheckout}
          onClose={() => setShowCheckoutForm(false)}
          isLoading={isLoading}
          isMandatory={true}
          locale={locale}
        />
      )}

      
    <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 ${
      state.isOpen && !showCheckoutForm ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out" 
        onClick={closeCart} 
      />
      
      {/* Cart Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-500 ease-out ${
        state.isOpen && !showCheckoutForm ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">{dictionary.cart.title}</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {state.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{dictionary.cart.empty}</h3>
                <p className="text-gray-500">{dictionary.cart.emptyDescription}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b border-gray-200 pb-4">
                    {/* Product Image */}
                    <div className="relative h-20 w-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-black truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        {dictionary.cart.size}: {item.size} | {dictionary.cart.color}: {item.color}
                      </p>
                      <p className="text-sm font-medium text-black mt-1">
                        {formatPrice(item.price, locale)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 border border-gray-300 rounded hover:border-gray-400 transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 border border-gray-300 rounded hover:border-gray-400 transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      title={dictionary.cart.removeTitle}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-gray-200 px-6 py-4">
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-black">{dictionary.cart.total}:</span>
                <span className="text-lg font-bold text-black">
                  {formatPrice(getStripeMatchingTotal(), locale)}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={isLoading || state.items.length === 0}
                className="nike-button w-full py-3"
              >
                {isLoading ? dictionary.cart.processing : dictionary.cart.checkout}
              </Button>

              {/* Free Shipping Notice */}
              <div className="mt-3 text-center">
                <p className="text-green-600 text-sm font-medium">{dictionary.cart.freeShipping}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  )
}
