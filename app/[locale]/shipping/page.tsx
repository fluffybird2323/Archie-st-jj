"use client"

import Link from "next/link"
import { ChevronLeft, Truck, Clock, Globe, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { use } from "react"

interface ShippingPageProps {
  params: {
    locale: Locale
  }
}

export default function ShippingPage({ params }: ShippingPageProps) {
  // Use the params object correctly with the use() hook
const { locale } = params as { locale: Locale }
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
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">SHIPPING INFO</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fast, reliable, and free worldwide shipping on all orders
          </p>
        </div>

        {/* Shipping Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
            <p className="text-gray-600 text-sm">On all orders worldwide</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Standard Delivery</h3>
            <p className="text-gray-600 text-sm">5-15 business days</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Worldwide</h3>
            <p className="text-gray-600 text-sm">Ships to 190+ countries</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-orange-600" />
            </div>
            <h3 className="font-bold text-lg mb-2">Secure</h3>
            <p className="text-gray-600 text-sm">Tracked & insured</p>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="space-y-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">Shipping Methods</h2>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-4">
                <div>
                  <h3 className="font-semibold">Standard Shipping</h3>
                  <p className="text-gray-600 text-sm">5-15 business days</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-green-600">FREE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">Processing Time</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                All orders are processed within 2-3 business days. Orders are not shipped or delivered on weekends or
                holidays.
              </p>
              <p className="text-gray-700">
                If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow
                additional days in transit for delivery.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">International Shipping</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                We ship to over 190 countries worldwide. International shipping times may vary depending on customs
                processing and local delivery services.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> International customers may be responsible for customs duties and taxes imposed
                  by their country.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border">
            <h2 className="text-2xl font-bold mb-6">Order Tracking</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                Once your order has shipped, you will receive a tracking number via email. You can track your package
                using this number on our website or the carrier's website.
              </p>
              <p className="text-gray-700">
                If you have any questions about your shipment, please contact our customer service team.
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
