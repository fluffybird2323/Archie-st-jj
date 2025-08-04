import Link from "next/link"
import { CheckCircle, Package, Truck, Mail, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"

interface SuccessPageProps {
  params: {
    locale: Locale
  }
}

export default async function SuccessPage({ params }: SuccessPageProps) {
  const dictionary = getDictionary(params.locale)
  const homeUrl = params.locale === "en" ? "/" : `/${params.locale}`

  // Generate a mock order number
  const orderNumber = `ARTIE-${Date.now().toString().slice(-6)}`
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()

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
