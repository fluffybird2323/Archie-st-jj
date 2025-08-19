"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Trash2, Minus, Plus, ShoppingBag, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import Link from "next/link";
import { formatPrice, getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"



interface CartProps {
  locale: Locale
}

export function Cart({ locale }: CartProps) {
  const { state, removeItem, updateQuantity, closeCart, getTotalItems, getTotalPrice } = useCart()

  const dictionary = getDictionary(locale)

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-500 ${
      state.isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
    }`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out" 
        onClick={closeCart} 
      />
      
      {/* Cart Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-500 ease-out ${
        state.isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Cart</h2>
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item: any) => (
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
                        Size: {item.size} | Color: {item.color}
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
                      title="Remove from cart"
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
              {/* Total */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-bold text-black">Total:</span>
                <span className="text-lg font-bold text-black">
                  {formatPrice(getTotalPrice(locale), locale)}
                </span>
              </div>

              {/* Checkout Button */}
              <Link href={`/${locale}/checkout`} passHref>
                <Button
                  className="nike-button w-full py-3"
                  onClick={closeCart}
                >
                  CHECKOUT
                </Button>
              </Link>

              {/* Free Shipping Notice */}
              <div className="mt-3 text-center">
                <p className="text-green-600 text-sm font-medium">🚚 Free shipping worldwide</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
