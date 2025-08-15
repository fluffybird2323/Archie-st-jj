import { type NextRequest, NextResponse } from "next/server"
import { Client } from "squareup"

// Initialize Square client without Environment enum
const getSquareClient = () => {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const environment = process.env.SQUARE_ENVIRONMENT

  if (!accessToken) {
    throw new Error("SQUARE_ACCESS_TOKEN environment variable is not set")
  }

  return new Client({
    accessToken,
    environment: environment === "production" ? "production" : "sandbox",
  })
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 })
    }

    const squareClient = getSquareClient()

    // Retrieve order from Square
    const { result, statusCode } = await squareClient.ordersApi.retrieveOrder(orderId)

    if (statusCode !== 200 || !result.order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const order = result.order

    // Format order data for frontend
    const orderDetails = {
      id: order.id,
      status: order.state || "unknown",
      createdAt: order.createdAt,
      totalAmount: order.totalMoney?.amount ? Number(order.totalMoney.amount) : 0,
      currency: order.totalMoney?.currency || "USD",
      lineItems:
        order.lineItems?.map((item) => ({
          name: item.name || "Unknown Item",
          quantity: Number(item.quantity || "1"),
          price: item.totalMoney?.amount ? Number(item.totalMoney.amount) : 0,
        })) || [],
      fulfillment: order.fulfillments?.[0]
        ? {
            type: order.fulfillments[0].type,
            state: order.fulfillments[0].state,
            trackingNumber: order.fulfillments[0].shipmentDetails?.trackingNumber,
            trackingUrl: order.fulfillments[0].shipmentDetails?.trackingUrl,
          }
        : undefined,
      customer: {
        email: order.fulfillments?.[0]?.shipmentDetails?.recipient?.emailAddress,
      },
    }

    return NextResponse.json({ order: orderDetails })
  } catch (error) {
    console.error("Order tracking error:", error)

    return NextResponse.json(
      { error: "Failed to retrieve order. Please check your order ID and try again." },
      { status: 500 },
    )
  }
}
