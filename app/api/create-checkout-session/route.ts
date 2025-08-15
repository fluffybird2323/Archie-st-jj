import { type NextRequest, NextResponse } from "next/server"
import { Client } from "square"

// Initialize Square client
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENVIRONMENT === "production" ? "production" : "sandbox",
})

export async function POST(request: NextRequest) {
  try {
    const { items, locale } = await request.json()

    // Calculate total amount in cents
    const totalAmount = items.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity * 100 // Convert to cents
    }, 0)

    // Create order
    const orderRequest = {
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
        lineItems: items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity.toString(),
          basePriceMoney: {
            amount: BigInt(item.price * 100), // Convert to cents as BigInt
            currency: "USD",
          },
        })),
        totalMoney: {
          amount: BigInt(totalAmount),
          currency: "USD",
        },
      },
    }

    const { result: orderResult } = await squareClient.ordersApi.createOrder(orderRequest)

    if (!orderResult.order) {
      throw new Error("Failed to create order")
    }

    // Create checkout link
    const checkoutRequest = {
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
        lineItems: items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity.toString(),
          basePriceMoney: {
            amount: BigInt(item.price * 100),
            currency: "USD",
          },
        })),
      },
      checkoutOptions: {
        redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
        askForShippingAddress: true,
      },
    }

    const { result: checkoutResult } = await squareClient.checkoutApi.createPaymentLink(checkoutRequest)

    if (!checkoutResult.paymentLink) {
      throw new Error("Failed to create checkout session")
    }

    return NextResponse.json({
      sessionId: checkoutResult.paymentLink.id,
      checkoutUrl: checkoutResult.paymentLink.url,
      orderId: orderResult.order.id,
    })
  } catch (error) {
    console.error("Square checkout error:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
