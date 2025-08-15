import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import OrderTrackingForm from "@/components/order-tracking-form"

interface TrackOrderPageProps {
  params: {
    locale: Locale
  }
}

export default async function TrackOrderPage({ params }: TrackOrderPageProps) {
  const dict = await getDictionary(params.locale)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{dict.trackOrder?.title || "Track Your Order"}</h1>
          <p className="text-gray-600">
            {dict.trackOrder?.subtitle || "Enter your order ID to track your order status"}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <OrderTrackingForm locale={params.locale} />
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>{dict.trackOrder?.help || "Need help? Contact our support team for assistance."}</p>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: TrackOrderPageProps) {
  const dict = await getDictionary(params.locale)

  return {
    title: dict.trackOrder?.title || "Track Your Order",
    description: dict.trackOrder?.subtitle || "Track your order status and shipping information",
  }
}
