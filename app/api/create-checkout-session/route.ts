import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { currencies, exchangeRates, type Locale } from "@/lib/i18n/config"

// Initialize Stripe
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not set")
  }
  return new Stripe(secretKey, {
    apiVersion: "2025-05-28.basil",
  })
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "Stripe is not configured. Please set STRIPE_SECRET_KEY environment variable." },
        { status: 500 },
      )
    }

    const stripe = getStripe()
    const body = await request.json()
    const { items, locale = "en" } = body

    // Get currency info for the locale
    const currency = currencies[locale as Locale] || currencies.en
    const exchangeRate = exchangeRates[currency.code] || 1

    // Configure payment methods based on locale
    const paymentMethodTypes: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ["card"]
    if (locale === "ja") paymentMethodTypes.push("konbini")
    if (locale === "zh") paymentMethodTypes.push("alipay", "wechat_pay")

    // Convert items to Stripe line items
    const lineItems = items.map((item: any) => {
      // Convert to local currency
      const localPrice = item.price * exchangeRate
      const priceInSmallestUnit = Math.round(localPrice * (currency.code === "JPY" ? 1 : 100))
      
      return {
        price_data: {
          currency: currency.code.toLowerCase(),
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
          },
          unit_amount: priceInSmallestUnit,
        },
        quantity: item.quantity,
      }
    })

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: paymentMethodTypes,
      line_items: lineItems,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: [
          "US", "CA", "GB", "AU", "DE", "FR", "IT", "ES", "NL", "BE", "AT", "CH", "SE", "NO", "DK", "FI", "IE", "PT", "LU", "GR", "JP", "SG", "HK", "NZ", "MX", "BR", "IN", "KR", "TW", "TH",
        ],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0, // Free shipping
              currency: currency.code.toLowerCase(),
            },
            display_name: "Free Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      success_url: `${request.nextUrl.origin}/${locale === "en" ? "" : locale + "/"}success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.nextUrl.origin}/${locale === "en" ? "" : locale + "/"}`,
    }

    // Add Konbini configuration for Japanese customers
    if (locale === "ja") {
      sessionConfig.payment_method_options = {
        konbini: {
          expires_after_days: 3,
        },
      }
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)
    return NextResponse.json({ sessionId: session.id })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "An unexpected error occurred while creating checkout session" }, { status: 500 })
  }
}

export async function GET() {
  const isConfigured = !!process.env.STRIPE_SECRET_KEY
  return NextResponse.json({
    configured: isConfigured,
    message: isConfigured ? "Stripe is configured" : "Stripe configuration missing",
  })
}
