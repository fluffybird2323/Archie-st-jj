import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react"

interface TermsPageProps {
  params: {
    locale: Locale
  }
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  const getLocalizedPath = (path: string) => {
    return locale === "en" ? path : `/${locale}${path}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={getLocalizedPath("/")} className="text-2xl font-bold">
            ARTIE
          </Link>
          <Link
            href={getLocalizedPath("/")}
            className="flex items-center text-gray-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {dictionary.nav.back}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-6">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our services. By using ARTIE, you agree to these terms.
            </p>
            <div className="text-sm text-gray-500 mt-4">Last updated: January 2024</div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Acceptance of Terms */}
            <section className="bg-green-50 border-l-4 border-green-500 rounded-r-2xl p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing and using the ARTIE website and services, you accept and agree to be bound by the terms
                  and provision of this agreement.
                </p>
                <p>If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </section>

            {/* Products and Orders */}
            <section className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <FileText className="w-6 h-6 text-black mr-3" />
                <h2 className="text-2xl font-bold">Products and Orders</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold">Product Information</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>We strive to display product colors and images as accurately as possible</li>
                  <li>Actual colors may vary due to monitor settings and lighting conditions</li>
                  <li>Product availability is subject to change without notice</li>
                  <li>We reserve the right to limit quantities purchased</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6">Order Processing</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Orders are processed within 1-2 business days</li>
                  <li>You will receive email confirmation once your order is placed</li>
                  <li>We reserve the right to cancel orders for any reason</li>
                  <li>Payment is processed securely through Stripe</li>
                  <li>By placing an order, you agree to our <a href="/commerce-disclosure" className="text-blue-600 hover:underline">Commerce Disclosure</a></li>
                </ul>
              </div>
            </section>

            {/* Shipping and Returns */}
            <section className="bg-black text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Shipping and Returns</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Shipping</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Standard shipping takes 5-15 business days</li>
                  <li>Express shipping options available at checkout</li>
                  <li>International shipping available to select countries</li>
                  <li>Shipping costs calculated at checkout</li>
                </ul>

                <h3 className="text-lg font-semibold mt-6">Returns</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>30-day return policy for unworn items</li>
                  <li>Items must be in original condition with tags</li>
                  <li>Return shipping costs are customer's responsibility</li>
                  <li>Refunds processed within 5-7 business days</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="border-2 border-black rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Intellectual Property</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All content on this website, including but not limited to text, graphics, logos, images, and software,
                  is the property of ARTIE and is protected by copyright and trademark laws.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You may not reproduce, distribute, or create derivative works</li>
                  <li>ARTIE trademarks may not be used without permission</li>
                  <li>User-generated content remains your property but grants us usage rights</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold">Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  ARTIE shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                  resulting from your use of our products or services.
                </p>
                <p>Our total liability shall not exceed the amount paid for the specific product or service.</p>
              </div>
            </section>

            {/* Contact */}
            <section className="text-center bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
              <p className="mb-6">If you have any questions about these Terms of Service, please contact us.</p>
              <Link
                href={getLocalizedPath("/contact")}
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </Link>
            </section>
          </div>
        </div>
      </main>

      <Footer dictionary={dictionary} locale={params.locale} />
    </div>
  )
}
