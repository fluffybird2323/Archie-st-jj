import { type NextRequest, NextResponse } from "next/server"
import { currencies, exchangeRates, type Locale } from "@/lib/i18n/config"

// Helper function to send order notification via Telegram
async function sendTelegramOrderNotification(orderDetails: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.log('Telegram not configured - skipping notification')
    return
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        chat_id: chatId, 
        text: orderDetails,
        parse_mode: 'HTML'
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram API error:', errorData)
    }
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check for required environment variables
    const accessToken = process.env.SQUARE_ACCESS_TOKEN
    const locationId = process.env.SQUARE_LOCATION_ID
    const environment = process.env.SQUARE_ENVIRONMENT || 'sandbox'
    
    if (!accessToken || !locationId) {
      return NextResponse.json(
        { error: "Square is not configured. Please set SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID environment variables." },
        { status: 500 }
      )
    }

    // Determine the correct API URL based on environment
    const apiUrl = environment === 'production' 
      ? "https://connect.squareup.com/v2/online-checkout/payment-links"
      : "https://connect.squareupsandbox.com/v2/online-checkout/payment-links"

    const body = await request.json()
    const { lineItems, locale = "en", customerInfo } = body

    // Get currency info for the locale
    const currency = currencies[locale as Locale] || currencies.en
    const exchangeRate = exchangeRates[currency.code] || 1

    // Handle cart checkout (multiple items)
    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // Calculate total amount and create order description
    let totalAmount = 0
    const itemDescriptions: string[] = []
    
    lineItems.forEach((item: any) => {
      const quantity = item.quantity || 1
      const price = item.price || 0
      totalAmount += price * quantity
      itemDescriptions.push(`${item.name} (${item.size}, ${item.color}) x${quantity}`)
    })

    // Convert to local currency
    const localAmount = totalAmount * exchangeRate
    // Square expects amount in smallest currency unit (cents for USD, etc.)
    const amountInCents = Math.round(localAmount * (currency.code === "JPY" ? 1 : 100))

    // Create order description with better formatting
    const orderDescription = itemDescriptions.length > 3 
      ? `${itemDescriptions.slice(0, 3).join(", ")} and ${itemDescriptions.length - 3} more items`
      : itemDescriptions.join(", ")

    // Prepare checkout options
    const checkoutOptions: any = {
      allow_tipping: false,
      redirect_url: `${request.nextUrl.origin}/${locale === "en" ? "" : locale + "/"}success?payment_link_id={payment_link_id}`,
      ask_for_shipping_address: true,
      shipping_fee: {
        name: "Free Shipping",
        charge: {
          amount: 0,
          currency: currency.code
        }
      },
      accepted_payment_methods: {
        apple_pay: true,
        google_pay: true,
        cash_app_pay: true,
        afterpay_clearpay: true
      }
    }

    // Only add merchant support email if it's configured
    if (process.env.MERCHANT_SUPPORT_EMAIL) {
      checkoutOptions.merchant_support_email = process.env.MERCHANT_SUPPORT_EMAIL
    }

    // Store customer info and send notification
    if (customerInfo?.email) {
      const orderInfo = `
<b>🛍️ New Order Received!</b>

<b>Customer Information:</b>
Name: ${customerInfo.address?.firstName} ${customerInfo.address?.lastName}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}

<b>Shipping Address:</b>
${customerInfo.address?.line1}
${customerInfo.address?.line2 ? customerInfo.address.line2 + '\n' : ''}${customerInfo.address?.city}, ${customerInfo.address?.state} ${customerInfo.address?.postalCode}
${customerInfo.address?.country}

<b>Order Details:</b>
${itemDescriptions.map(item => `• ${item}`).join('\n')}

<b>Total Amount:</b> ${(localAmount).toFixed(2)} ${currency.code}

<b>Payment Status:</b> Pending (Customer redirected to Square)
<b>Order Time:</b> ${new Date().toLocaleString()}
      `.trim()
      
      // Send notification
      await sendTelegramOrderNotification(orderInfo)

      // You can also store this in a database here if needed
      console.log('Order submitted with customer info:', {
        customerInfo,
        items: lineItems,
        total: localAmount,
        currency: currency.code
      })
    }

    // Create payment link request with enhanced customer info handling
    const paymentLinkRequest = {
      idempotency_key: `${Date.now()}-${Math.random().toString(36).substring(7)}`,
      quick_pay: {
        name: orderDescription,
        price_money: {
          amount: amountInCents,
          currency: currency.code
        },
        location_id: locationId
      },
      checkout_options: checkoutOptions,
      pre_populated_data: {
        buyer_email: customerInfo?.email || "",
        buyer_phone_number: customerInfo?.phone || "",
        buyer_address: customerInfo?.address ? {
          first_name: customerInfo.address.firstName || "",
          last_name: customerInfo.address.lastName || "",
          address_line_1: customerInfo.address.line1 || "",
          address_line_2: customerInfo.address.line2 || "",
          locality: customerInfo.address.city || "",
          administrative_district_level_1: customerInfo.address.state || "",
          postal_code: customerInfo.address.postalCode || "",
          country: customerInfo.address.country || "US"
        } : undefined
      },
      description: `Order from ${request.headers.get('host')} - ${itemDescriptions.length} item(s)`,
      payment_note: `Thank you for your order! Items: ${orderDescription}`
    }

    // Debug logging
    console.log('Square API Request:', {
      url: apiUrl,
      environment,
      locationId,
      accessTokenLength: accessToken.length,
      amount: amountInCents,
      currency: currency.code
    })

    // Make request to Square API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Square-Version": "2024-01-18",
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(paymentLinkRequest)
    })

    const data = await response.json()
    
    console.log('Square API Response:', {
      status: response.status,
      statusText: response.statusText,
      data
    })

    if (!response.ok) {
      console.error("Square API error:", {
        status: response.status,
        statusText: response.statusText,
        errors: data.errors,
        data
      })
      
      // More specific error messages
      if (response.status === 401) {
        throw new Error("Square authentication failed. Please check your access token.")
      } else if (response.status === 403) {
        throw new Error("Square access forbidden. Please check your permissions and location ID.")
      } else if (response.status === 400) {
        const errorMsg = data.errors?.[0]?.detail || "Invalid request to Square API"
        throw new Error(`Square API validation error: ${errorMsg}`)
      }
      
      throw new Error(data.errors?.[0]?.detail || `Square API error: ${response.status} ${response.statusText}`)
    }

    // Return the payment link URL
    return NextResponse.json({ 
      url: data.payment_link.url,
      id: data.payment_link.id 
    })

  } catch (error) {
    console.error("Error creating Square payment link:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: "An unexpected error occurred while creating payment link" }, { status: 500 })
  }
}

export async function GET() {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  const locationId = process.env.SQUARE_LOCATION_ID
  
  return NextResponse.json({
    configured: !!accessToken && !!locationId,
    hasAccessToken: !!accessToken,
    hasLocationId: !!locationId,
    accessTokenLength: accessToken ? accessToken.length : 0,
    locationIdLength: locationId ? locationId.length : 0,
    message: (!!accessToken && !!locationId) ? "Square is configured" : "Square configuration missing",
    debug: {
      nodeEnv: process.env.NODE_ENV,
      envKeys: Object.keys(process.env).filter(key => key.includes('SQUARE')).sort()
    }
  })
}