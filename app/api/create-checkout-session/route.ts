/// <reference types="node" />

import { type NextRequest, NextResponse } from "next/server"
import { SquareClient, SquareEnvironment } from "square"
import { currencies, exchangeRates, type Locale } from "@/lib/i18n/config"

interface LineItem {
  id?: string
  price_data: {
    currency: string
    product_data: {
      name: string
      images?: string[]
    }
    unit_amount: number
  }
  quantity: number
}

interface CheckoutRequest {
  priceId?: number
  productName?: string
  productImage?: string
  locale?: string
  lineItems?: LineItem[]
}

// Initialize Square client with proper error handling
const getSquareClient = () => {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const environment = process.env.NODE_ENV === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox
  
  if (!accessToken) {
    throw new Error("SQUARE_ACCESS_TOKEN environment variable is not set")
  }
  
  return new SquareClient({
    token: accessToken,
    environment,
  })
}

export async function POST(request: NextRequest) {
  try {

    if (!process.env.SQUARE_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: "Square is not configured. Please set SQUARE_ACCESS_TOKEN environment variable." },
        { status: 500 },
      )
    }

    if (!process.env.SQUARE_LOCATION_ID) {
      return NextResponse.json(
        { error: "Square is not configured. Please set SQUARE_LOCATION_ID environment variable." },
        { status: 500 },
      )
    }

    const squareClient = getSquareClient()
    const body = await request.json()
    const { priceId, productName, productImage, locale = "en", lineItems } = body as CheckoutRequest

    // Get currency info for the locale
    const currency = currencies[locale as Locale] || currencies.en
    const exchangeRate = exchangeRates[currency.code] || 1

    // Prepare order items for Square
    let orderItems: any[]
    let totalAmount: number

    // Handle cart checkout (multiple items)
    if (lineItems && Array.isArray(lineItems)) {
      if (lineItems.length === 0) {
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
      }
      
      orderItems = lineItems.map((item: LineItem) => ({
        quantity: item.quantity.toString(),
        catalogObjectId: item.id, // Assuming item.id is the Square catalog item ID
        name: item.price_data.product_data.name,
        basePriceMoney: {
          amount: BigInt(item.price_data.unit_amount),
          currency: item.price_data.currency.toUpperCase(),
        },
      }))
      
      totalAmount = lineItems.reduce((sum: number, item: LineItem) => 
        sum + (item.price_data.unit_amount * item.quantity), 0)
    } else {
      // Handle single item checkout (backward compatibility)
      if (!priceId || !productName) {
        return NextResponse.json({ error: "Missing required fields: priceId and productName" }, { status: 400 })
      }
      
      // Convert USD price to local currency
      const localPrice = priceId * exchangeRate
      const priceInSmallestUnit = Math.round(localPrice * (currency.code === "JPY" ? 1 : 100))
      
      orderItems = [{
        quantity: "1",
        name: productName,
        basePriceMoney: {
          amount: BigInt(priceInSmallestUnit),
          currency: currency.code.toUpperCase(),
        },
      }]
      
      totalAmount = priceInSmallestUnit
    }

    // Create Square order
    const orderRequest = {
      order: {
        lineItems: orderItems,
        locationId: process.env.SQUARE_LOCATION_ID,

      },
    }

    const { result: { order } } = await squareClient.orders.create({ ...orderRequest, idempotencyKey: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` })
    
    if (!order) {
      throw new Error("Failed to create Square order")
    }

    // Create Square checkout link
    const checkoutRequest = {
      idempotencyKey: `checkout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderId: order.id,
      checkoutOptions: {
        redirectUrl: `${request.nextUrl.origin}/${locale === "en" ? "" : locale + "/"}success?order_id=${order.id}`,
        merchantSupportEmail: "support@artie.com",
        askForShippingAddress: true,
        acceptedPaymentMethods: {
          applePay: true,
          googlePay: true,
          cashAppPay: true,
        },
      },
    }

    const { result: checkoutResult } = await squareClient.checkout.createPaymentLink(checkoutRequest)
    
    if (!checkoutResult?.paymentLink?.url) {
      throw new Error("Failed to create Square checkout link")
    }

    return NextResponse.json({
      checkoutUrl: checkoutResult.paymentLink.url,
      orderId: orderResult.order.id
    })
  } catch (error) {
    console.error("Error creating Square checkout:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "An unexpected error occurred while creating checkout" }, { status: 500 })
  }
}

export async function GET() {
  const isConfigured = !!process.env.SQUARE_ACCESS_TOKEN
  return NextResponse.json({
    configured: isConfigured,
    applicationId: process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID,
    message: isConfigured ? "Square is configured" : "Square configuration missing",
  })
}
