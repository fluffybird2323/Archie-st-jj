"use client"

import { useState } from "react"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { currencies, exchangeRates, type Locale } from "@/lib/i18n/config"

interface CartProps {
  isOpen: boolean
  onClose: () => void
  dictionary: any
  locale: Locale
}

export function Cart({ isOpen, onClose, dictionary, locale }: CartProps) {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currency = currencies[locale] || currencies.en
  const exchangeRate = exchangeRates[currency.code] || 1

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          locale,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const { checkoutUrl } = await response.json()

      // Redirect to Square checkout
      window.location.href = checkoutUrl
    } catch (error) {
      console.error("Checkout error:", error)
      // Handle error (show toast, etc.)
    } finally {
      setIsLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    const localPrice = price * exchangeRate
    return new Intl.NumberFormat(locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : "en-US", {
      style: "currency",
      currency: currency.code,
      minimumFractionDigits: currency.code === "JPY" ? 0 : 2,
    }).format(localPrice)
  }

  const totalPrice = getTotalPrice()
  const localTotalPrice = totalPrice * exchangeRate

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">{dictionary.cart.title}</h2>
            <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close cart">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">{dictionary.cart.empty}</p>
                <p className="text-sm text-gray-400">{dictionary.cart.emptyDescription}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4 border-b pb-4">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={item.image || "/placeholder.svg?height=64&width=64"}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.size && `${dictionary.product.size}: ${item.size}`}
                            {item.size && item.color && " • "}
                            {item.color && `${dictionary.product.color}: ${item.color}`}
                          </p>
                          <p className="text-sm font-medium">{formatPrice(item.price)}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size, item.color)}
                          className="text-gray-400 hover:text-gray-500"
                          aria-label="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.size, item.color, Math.max(0, item.quantity - 1))
                            }
                            className="rounded-full p-1 hover:bg-gray-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                            className="rounded-full p-1 hover:bg-gray-100"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>{dictionary.cart.total}</span>
                <span>
                  {new Intl.NumberFormat(locale === "ja" ? "ja-JP" : locale === "zh" ? "zh-CN" : "en-US", {
                    style: "currency",
                    currency: currency.code,
                    minimumFractionDigits: currency.code === "JPY" ? 0 : 2,
                  }).format(localTotalPrice)}
                </span>
              </div>

              {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>}

              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50"
              >
                {isLoading ? dictionary.cart.processing : dictionary.cart.checkout}
              </Button>

              <button onClick={clearCart} className="w-full text-sm text-gray-500 hover:text-gray-700">
                {dictionary.cart.clear}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
