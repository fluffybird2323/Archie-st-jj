import Link from "next/link"
import { CheckCircle, Package, Truck, Mail, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"
import { SquareClient, SquareEnvironment } from "square"

interface SuccessPageProps {
  params: {
    locale: Locale
  }
}

const getSquareClient = () => {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN
  if (!accessToken) {
    throw new Error("SQUARE_ACCESS_TOKEN environment variable is not set")
  }
  return new SquareClient(accessToken, process.env.NODE_ENV === "production" ? SquareEnvironment.Production : SquareEnvironment.Sandbox)
}

async function sendTelegramOrderNotification(orderDetails: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('Telegram configuration missing')
    return
  }

  const text = `New Order Placed:\n${orderDetails}`

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Telegram API error:', errorData)
    }
  } catch (error) {
    console.error('Failed to send Telegram notification:', error)
  }
}

export default async function SuccessPage({ params, searchParams }: SuccessPageProps & { searchParams: { order_id?: string } }) {
  const dictionary = getDictionary(params.locale)
  const homeUrl = params.locale === "en" ? "/" : `/${params.locale}`
  const orderId = searchParams.order_id

  let orderNumber = `ARTIE-${Date.now().toString().slice(-6)}`
  let estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
  let orderDetails = ''
  let totalAmount = 0
  let customerEmail = ''

  if (orderId) {
    try {
      const squareClient = getSquareClient()
      const orderResponse = await squareClient.orders.retrieveOrder(orderId)
      
      if (orderResponse.result?.order) {
        const order = orderResponse.result.order
        
        // Generate order details
        const lineItems = order.lineItems || []
        totalAmount = lineItems.reduce((sum: number, item: any) => sum + (parseInt(item.totalMoney?.amount || '0')), 0)
        
        orderDetails = `Order ID: ${order.id}
Amount: ${(totalAmount / 100).toFixed(2)} ${order.totalMoney?.currency || 'USD'}
Items:
${lineItems.map((item: any) => `- ${item.name} x${item.quantity}`).join('\n') || 'No items'}`

        // Send to Telegram
        await sendTelegramOrderNotification(orderDetails)

        // Use real data if available
        orderNumber = `ARTIE-${order.id.slice(-6).toUpperCase()}`
      }
    } catch (error) {
      console.error('Error fetching Square order:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">{dictionary.success.title}</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">{dictionary.success.message}</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                {dictionary.success.orderNumber}
              </h3>
              <p className="text-2xl font-mono font-bold text-gray-900 mb-6">{orderNumber}</p>

              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                {dictionary.success.estimatedDelivery}
              </h3>
              <p className="text-lg text-gray-700 mb-2">{estimatedDelivery}</p>
              <p className="text-sm text-gray-500">{dictionary.success.businessDays}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-purple-600" />
                Order Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Order Confirmed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm font-medium">Processing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Shipped</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-500">Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-bold">Email Confirmation</h3>
            </div>
            <p className="text-gray-600 text-sm">
              A confirmation email has been sent to your email address with order details and tracking information.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-bold">Tracking Info</h3>
            </div>
            <p className="text-gray-600 text-sm">{dictionary.success.trackingInfo}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4">
          <Link href={homeUrl}>
            <Button className="bg-black text-white px-8 py-3 text-lg font-semibold hover:bg-gray-800 transition-colors">
              {dictionary.success.continueShopping}
            </Button>
          </Link>
          <div>
            <button className="text-gray-600 hover:text-gray-800 text-sm underline">Print Receipt</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer dictionary={dictionary} locale={params.locale} />
    </div>
  )
}
