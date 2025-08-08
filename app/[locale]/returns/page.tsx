import Link from "next/link"
import { ChevronLeft, RotateCcw, Calendar, Package, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"

interface ReturnsPageProps {
  params: {
    locale: Locale
  }
}

export default async function ReturnsPage({ params }: ReturnsPageProps) {
  const { locale } = await params
  const dictionary = getDictionary(locale)
  const backUrl = locale === "en" ? "/" : `/${locale}`

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 pt-10 pb-20">
        <Link
          href={backUrl}
          className="inline-flex items-center gap-2 text-gray-700 hover:text-black mb-8 text-base font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          {dictionary.nav.back}
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">RETURNS & EXCHANGES</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Easy returns and exchanges within 30 days of purchase. Refunds will be processed to your original payment method within 3-5 business days after we receive your returned item.
          </p>
        </div>

        {/* Return Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">30 Days</h3>
            <p className="text-gray-600 text-sm">Return window</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Free Returns</h3>
            <p className="text-gray-600 text-sm">No return shipping cost</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Easy Exchange</h3>
            <p className="text-gray-600 text-sm">Size & color swaps</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Quick Refund</h3>
            <p className="text-gray-600 text-sm">3-5 business days</p>
          </div>
        </div>

        {/* Return Policy Details */}
        <div className="space-y-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">Return Policy</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                We want you to be completely satisfied with your ARTIE purchase. If you're not happy with your order, you can return it within 30 days of delivery for a full refund. Please note that customized or personalized items are non-refundable.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 mb-2">What can be returned:</h3>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• Items in original condition with tags attached</li>
                  <li>• Unworn and unwashed items</li>
                  <li>• Items returned within 30 days of delivery</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">What cannot be returned:</h3>
                <ul className="text-red-700 text-sm space-y-1">
                  <li>• Items that have been worn or washed</li>
                  <li>• Items without original tags</li>
                  <li>• Items returned after 30 days</li>
                  <li>• Customized or personalized items</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">How to Return</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contact Us</h3>
                  <p className="text-gray-600 text-sm">
                    Email us at returns@artie.com with your order number and reason for return.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Return Label</h3>
                  <p className="text-gray-600 text-sm">
                    We'll send you a prepaid return shipping label within 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Pack & Ship</h3>
                  <p className="text-gray-600 text-sm">
                    Pack your items securely and attach the return label to the package.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Refunded</h3>
                  <p className="text-gray-600 text-sm">
                    Once we receive your return, we'll process your refund within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">Exchanges</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Need a different size or color? We make exchanges easy! Follow the same return process above, but let us
                know you'd like an exchange instead of a refund.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm">
                  <strong>Pro Tip:</strong> For faster exchanges, place a new order for the item you want and return the
                  original item for a refund.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">Refund Information</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Refunds will be processed to your original payment method within 3-5 business days after we receive your
                returned item.
              </p>
              <p className="text-gray-700">
                Please note that it may take additional time for the refund to appear on your statement, depending on
                your bank or credit card company.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link href={backUrl}>
            <Button className="bg-black text-white px-8 py-3 text-lg font-semibold hover:bg-gray-800 transition-colors">
              Back to Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
