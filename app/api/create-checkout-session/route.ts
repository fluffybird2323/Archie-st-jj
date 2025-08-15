import { type NextRequest, NextResponse } from "next/server"
import { Client, Environment, ApiError } from "squareup"
import { currencies, exchangeRates, type Locale } from "@/lib/i18n/config"

// Initialize Square client with proper error handling
const getSquareClient = () => {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const environment = process.env.SQUARE_ENVIRONMENT

  if (!accessToken) {
    throw new Error("SQUARE_ACCESS_TOKEN environment variable is not set")
  }

  if (!environment) {
    throw new Error("SQUARE_ENVIRONMENT environment variable is not set")
  }

  return new Client({
    accessToken,
    environment: environment === "production" ? Environment.Production : Environment.Sandbox,
  })
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
      return NextResponse.json(
        {
          error:
            "Square is not configured. Please set SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID environment variables.",
        },
        { status: 500 },
      )
    }

    const squareClient = getSquareClient()
    const body = await request.json()
    const { priceId, productName, productImage, locale = "en", lineItems } = body

    // Get currency info for the locale
    const currency = currencies[locale as Locale] || currencies.en
    const exchangeRate = exchangeRates[currency.code] || 1

    let orderRequest: any

    // Handle cart checkout (multiple items)
    if (lineItems && Array.isArray(lineItems)) {
      if (lineItems.length === 0) {
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
      }

      const lineItemsForSquare = lineItems.map((item: any) => {
        const localPrice = (item.price_data.unit_amount / (currency.code === "JPY" ? 1 : 100)) * exchangeRate
        const priceInSmallestUnit = Math.round(localPrice * (currency.code === "JPY" ? 1 : 100))

        return {
          quantity: item.quantity.toString(),
          catalogObjectId: undefined, // For custom items
          itemType: "ITEM",
          name: item.price_data.product_data.name,
          basePriceMoney: {
            amount: BigInt(priceInSmallestUnit),
            currency: currency.code,
          },
        }
      })

      orderRequest = {
        order: {
          locationId: process.env.SQUARE_LOCATION_ID,
          lineItems: lineItemsForSquare,
          fulfillments: [
            {
              type: "SHIPMENT",
              state: "PROPOSED",
              shipmentDetails: {
                recipient: {
                  displayName: "Customer",
                },
              },
            },
          ],
        },
      }
    } else {
      // Handle single item checkout (backward compatibility)
      if (!priceId || !productName) {
        return NextResponse.json({ error: "Missing required fields: priceId and productName" }, { status: 400 })
      }

      // Convert USD price to local currency
      const localPrice = priceId * exchangeRate
      const priceInSmallestUnit = Math.round(localPrice * (currency.code === "JPY" ? 1 : 100))

      orderRequest = {
        order: {
          locationId: process.env.SQUARE_LOCATION_ID,
          lineItems: [
            {
              quantity: "1",
              catalogObjectId: undefined, // For custom items
              itemType: "ITEM",
              name: productName,
              basePriceMoney: {
                amount: BigInt(priceInSmallestUnit),
                currency: currency.code,
              },
            },
          ],
          fulfillments: [
            {
              type: "SHIPMENT",
              state: "PROPOSED",
              shipmentDetails: {
                recipient: {
                  displayName: "Customer",
                },
              },
            },
          ],
        },
      }
    }

    // Create order first
    const { result: orderResult } = await squareClient.ordersApi.createOrder(orderRequest)

    if (!orderResult.order) {
      throw new Error("Failed to create order")
    }

    // Create checkout request
    const checkoutRequest = {
      askForShippingAddress: true,
      merchantSupportEmail: "support@yourstore.com",
      prePopulateShippingAddress: {
        addressLine1: "",
        addressLine2: "",
        locality: "",
        administrativeDistrictLevel1: "",
        postalCode: "",
        country: locale === "ja" ? "JP" : locale === "zh" ? "CN" : "US",
      },
      redirectUrl: `${request.nextUrl.origin}/${locale === "en" ? "" : locale + "/"}success?session_id={CHECKOUT_SESSION_ID}`,
      order: {
        locationId: process.env.SQUARE_LOCATION_ID,
        orderId: orderResult.order.id,
      },
      paymentNote: `Order from ${productName || "Multiple Items"}`,
      additionalRecipients: [],
      note: `Checkout for ${locale} locale`,
    }

    // Create checkout
    const { result: checkoutResult } = await squareClient.checkoutApi.createPaymentLink(checkoutRequest)

    if (!checkoutResult.paymentLink) {
      throw new Error("Failed to create checkout session")
    }

    // Return session ID in the same format as Stripe for UI compatibility
    return NextResponse.json({
      sessionId: checkoutResult.paymentLink.id,
      checkoutUrl: checkoutResult.paymentLink.url,
      orderId: orderResult.order.id,
    })
  } catch (error) {
    console.error("Error creating Square checkout session:", error)

    if (error instanceof ApiError) {
      console.error("Square API Error:", error.errors)
      return NextResponse.json(
        {
          error: `Square API Error: ${error.errors?.[0]?.detail || error.message}`,
        },
        { status: 500 },
      )
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred while creating checkout session",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  const isConfigured = !!(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID)
  return NextResponse.json({
    configured: isConfigured,
    message: isConfigured ? "Square is configured" : "Square configuration missing",
  })
}
