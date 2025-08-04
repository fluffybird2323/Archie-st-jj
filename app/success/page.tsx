"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle, Package, Truck, Clock, Printer, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { redirect } from "next/navigation"

export default function SuccessPage() {
  redirect("/en/success")

  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")

  useEffect(() => {
    // Show loading for 1.5 seconds for better UX
    setTimeout(() => setLoading(false), 1500)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your order...</p>
        </div>
      </div>
    )
  }

  // Generate order number from session ID
  const orderNumber = sessionId
    ? `ARTIE-${sessionId.slice(-8).toUpperCase()}`
    : `ARTIE-${Math.random().toString(36).substr(2, 8).toUpperCase()}`

  const currentDate = new Date()
  const deliveryDate = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000) // 5 days from now

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-20 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Order Successful!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Thank you for your purchase! Your order has been confirmed and will be processed shortly.
          </p>
        </div>

        {/* Order Details Card */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Order Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-600" />
                  Order Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-mono font-semibold">{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date:</span>
                    <span className="font-semibold">{currentDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-semibold">Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Shipping Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Truck className="w-5 h-5 mr-2 text-green-600" />
                  Shipping Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery:</span>
                    <span className="font-semibold">{deliveryDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Time:</span>
                    <span className="font-semibold">3-7 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="text-green-600 font-semibold">Free Worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Timeline */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-purple-600" />
              What happens next?
            </h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="font-medium text-green-700">Order Confirmed</p>
                  <p className="text-sm text-gray-600">Your payment has been processed successfully</p>
                </div>
                <span className="text-sm text-green-600 font-medium">Completed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="font-medium text-blue-700">Processing</p>
                  <p className="text-sm text-gray-600">We're preparing your order for shipment</p>
                </div>
                <span className="text-sm text-blue-600 font-medium">In Progress</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700">Shipped</p>
                  <p className="text-sm text-gray-600">Your order is on its way to you</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">Pending</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-4"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700">Delivered</p>
                  <p className="text-sm text-gray-600">Enjoy your new ARTIE apparel!</p>
                </div>
                <span className="text-sm text-gray-500 font-medium">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Important Information</h3>
              <p className="text-gray-600 mb-4">
                You will receive tracking information via email once your order ships.
              </p>
              <p className="text-sm text-gray-500">
                A confirmation email has been sent to your email address with all order details.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg w-full sm:w-auto">
              Continue Shopping
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="px-8 py-4 text-lg w-full sm:w-auto bg-transparent"
            onClick={() => window.print()}
          >
            <Printer className="w-4 h-4 mr-2" />
            Print Receipt
          </Button>
        </div>

        {/* Footer Message */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            Need help? Contact our support team at{" "}
            <a href="mailto:support@artie.com" className="text-blue-600 hover:underline">
              support@artie.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
