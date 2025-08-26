"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { getDictionary } from "@/lib/i18n/utils"
import { useParams } from "next/navigation"

export function CartIcon() {
  const { toggleCart, getTotalItems } = useCart()
  const itemCount = getTotalItems()
  const params = useParams()
  const dict = getDictionary(params?.locale as string || "en")

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-black hover:text-gray-600 transition-colors" 
      aria-label={dict.cart.shoppingCart || "Shopping cart"}
    >
      <ShoppingBag className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </button>
  )
}
