import { type NextRequest, NextResponse } from "next/server"
import { Client } from "squareup"

// Initialize Square client
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN!,
  environment: process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox",
})

export async function POST(request: NextRequest) {
  try {
    const { line_items } = await request.json()

    if (!line_items || !Array.isArray(line_items) || line_items.length === 0) {
      return NextResponse.json({ error: "Invalid line items" }, { status: 400 })
    }

    // Convert line items to Square format
    const orderLineItems = line_items.map((item) => ({
      quantity: item.quantity.toString(),
      name: item.price_data.product_data.name,
      itemType: "ITEM",
      basePriceMoney: {
        amount: BigInt(item.price_data.unit_amount),
        currency: item.price_data.currency.toUpperCase(),
      },
    }))

    // Create order
    const orderRequest = {
      order: {
        locationId: process.env.SQUARE_LOCATION_ID!,
        lineItems: orderLineItems,
      },
    }

    const { result: orderResult } = await squareClient.ordersApi.createOrder(orderRequest)

    if (!orderResult.order) {
      throw new Error("Failed to create order")
    }

    // Create checkout
    const checkoutRequest = {
      askForShippingAddress: true,
      merchantSupportEmail: "support@yourstore.com",
      prePopulatedData: {
        buyerEmail: "",
      },
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success?order_id=${orderResult.order.id}`,
      order: orderResult.order,
    }

    const { result: checkoutResult } = await squareClient.checkoutApi.createPaymentLink(checkoutRequest)

    if (!checkoutResult.paymentLink) {
      throw new Error("Failed to create payment link")
    }

    return NextResponse.json({
      sessionId: checkoutResult.paymentLink.id,
      checkoutUrl: checkoutResult.paymentLink.url,
      orderId: orderResult.order.id,
    })
  } catch (error) {
    console.error("Square checkout error:", error)

    // Handle specific Square API errors
    if (error instanceof Error) {
      if (error.message.includes("INVALID_REQUEST_ERROR")) {
        return NextResponse.json({ error: "Invalid request parameters" }, { status: 400 })
      }
      if (error.message.includes("UNAUTHORIZED")) {
        return NextResponse.json({ error: "Square API authentication failed" }, { status: 401 })
      }
      if (error.message.includes("RATE_LIMITED")) {
        return NextResponse.json({ error: "Too many requests, please try again later" }, { status: 429 })
      }
    }

    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
