"use client"

import React, { createContext, useContext, useReducer, useEffect, useRef } from "react"
import { currencies, exchangeRates } from "./i18n/config"
import type { Locale, CountryCode } from "./i18n/config"

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number // USD
  image: string
  size: string
  color: string
  quantity: number
  slug: string
}

interface CartState {
  items: CartItem[]
  isOpen: boolean
  locale: Locale
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "CLOSE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
  | { type: "SET_LOCALE"; payload: Locale }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      )
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === existingItem.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        }
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      }
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      }
    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: !state.isOpen,
      }
    case "CLOSE_CART":
      return {
        ...state,
        isOpen: false,
      }
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload,
      }
    case "SET_LOCALE":
      return {
        ...state,
        locale: action.payload,
      }
    default:
      return state
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, "id">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  closeCart: () => void
  setLocale: (locale: Locale) => void
  getTotalItems: () => number
  getTotalPrice: (country?: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
    locale: "en",
  })

  // Hydrate cart from localStorage only once
  const hasHydrated = useRef(false)
  useEffect(() => {
    if (typeof window === 'undefined' || hasHydrated.current) return
    hasHydrated.current = true
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: parsedCart })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem("cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (item: Omit<CartItem, "id">) => {
    const cartItem: CartItem = {
      ...item,
      id: `${item.productId}-${item.size}-${item.color}`,
    }
    dispatch({ type: "ADD_ITEM", payload: cartItem })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" })
  }

  const closeCart = () => {
    dispatch({ type: "CLOSE_CART" })
  }

  const setLocale = (locale: Locale) => {
    dispatch({ type: "SET_LOCALE", payload: locale })
  }

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0)
  }

  // Sum in USD, then convert and round the total at the end
  const getTotalPrice = (country?: string) => {
    // Sum all line items, then round once at the end
    const totalUSD = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    if (!country) return Math.round(totalUSD * 100); // Return in cents for USD
    const currencyCode = currencies[country]?.code || currencies.US.code;
    const rate = exchangeRates[currencyCode] || 1;
    const converted = totalUSD * rate;
    // For JPY, return as is (no cents), otherwise convert to cents
    return currencyCode === "JPY" ? Math.round(converted) : Math.round(converted * 100);
  };

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        toggleCart,
        closeCart,
        setLocale,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
