import { getDictionary } from "@/lib/i18n/utils"
import { getDictionary as getDict } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle } from "lucide-react"

interface CommerceDisclosurePageProps {
  params: { locale: Locale }
}

export default async function CommerceDisclosurePage({ params }: CommerceDisclosurePageProps) {
  const { locale } = await params
  const dictionary = await getDict(locale)

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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Commerce Disclosure</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Required merchant disclosure for Stripe payment processing and customer transparency.
            </p>
            <div className="text-sm text-gray-500 mt-4">Last updated: {new Date().toLocaleDateString()}</div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Business Information */}
            <section className="bg-green-50 border-l-4 border-green-500 rounded-r-2xl p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold">Business Information</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p><strong>Business Name:</strong> Archie St. JJ</p>
                    <p><strong>Contact Email:</strong> support@archie-st-jj.com</p>
                    <p><strong>Business Type:</strong> Online Retail Store</p>
                  </div>
                  <div>
                    <p><strong>Payment Processor:</strong> Stripe, Inc.</p>
                    <p><strong>Customer Service:</strong> Available 24/7</p>
                    <p><strong>Response Time:</strong> Within 24 hours</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Processing */}
            <section className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Payment Processing</h2>
              <div className="space-y-6 text-gray-700">
                <p>
                  We use Stripe as our payment processor. When you make a purchase, your payment information is securely processed by Stripe, Inc. 
                  Your card details are never stored on our servers.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Supported Payment Methods</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Visa, Mastercard, American Express, Discover</li>
                      <li>Digital wallets (Apple Pay, Google Pay)</li>
                      <li>Konbini payments (Japan)</li>
                      <li>Alipay, WeChat Pay (China)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Security Standards</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>PCI DSS Level 1 compliant</li>
                      <li>SSL/TLS encryption</li>
                      <li>Tokenized payment data</li>
                      <li>Fraud detection & prevention</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing and Currency */}
            <section className="bg-black text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Pricing and Currency</h2>
              <div className="space-y-4">
                <p>All prices are displayed in your local currency based on your location:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-2">
                    <li>🇺🇸 United States: USD ($)</li>
                    <li>🇯🇵 Japan: JPY (¥)</li>
                    <li>🇨🇳 China: CNY (¥)</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>🇪🇺 European Union: EUR (€)</li>
                    <li>🇬🇧 United Kingdom: GBP (£)</li>
                    <li>🌍 Other regions: USD ($)</li>
                  </ul>
                </div>
                <p className="text-gray-300 text-sm">
                  Prices include all applicable taxes. Exchange rates are updated daily and may vary at checkout.
                </p>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section className="border-2 border-black rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Shipping and Delivery</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-green-100 p-4 rounded-lg">
                  <p className="font-semibold text-green-800">✅ Free Worldwide Shipping</p>
                  <p className="text-green-700">We offer free shipping on all orders, everywhere.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Delivery Information</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Standard delivery: 5-15 business days</li>
                      <li>Tracking provided via email</li>
                      <li>Signature required for high-value items</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Shipping Partners</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Trusted international carriers</li>
                      <li>Full package insurance included</li>
                      <li>Real-time tracking updates</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Return and Refund Policy */}
            <section className="bg-blue-50 border-l-4 border-blue-500 rounded-r-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Return and Refund Policy</h2>
              <div className="space-y-4 text-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Return Window</h3>
                    <p>30 days from delivery date for returns</p>
                    <p className="text-sm text-gray-600">Items must be unworn and in original packaging</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Refund Processing</h3>
                    <p>5-7 business days after we receive your return</p>
                    <p className="text-sm text-gray-600">Refunded to original payment method</p>
                  </div>
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg">
                  <p className="font-semibold text-blue-800">Easy Return Process:</p>
                  <ol className="list-decimal ml-6 text-blue-700 space-y-1">
                    <li>Email us at returns@archie-st-jj.com</li>
                    <li>Receive return authorization & shipping label</li>
                    <li>Pack and ship your return</li>
                    <li>Get refunded once we process your return</li>
                  </ol>
                </div>
              </div>
            </section>

            {/* Customer Support */}
            <section className="bg-purple-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Customer Support</h2>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                  <ul className="space-y-2">
                    <li><strong>Email:</strong> support@archie-st-jj.com</li>
                    <li><strong>Returns:</strong> returns@archie-st-jj.com</li>
                    <li><strong>Response Time:</strong> Within 24 hours</li>
                    <li><strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM (UTC)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">We're Here to Help</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Order tracking and updates</li>
                    <li>Product questions and sizing help</li>
                    <li>Return and exchange assistance</li>
                    <li>Payment and billing support</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Privacy and Legal */}
            <section className="bg-red-50 border-l-4 border-red-500 rounded-r-2xl p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold">Privacy and Legal Compliance</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We take your privacy and security seriously. Your personal information is protected according to our 
                  <Link href={getLocalizedPath("/privacy")} className="text-blue-600 hover:underline"> Privacy Policy</Link>.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Data Protection</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>GDPR compliant data handling</li>
                      <li>Secure data encryption</li>
                      <li>No sale of personal information</li>
                      <li>Right to data deletion</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Payment Security</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>PCI DSS Level 1 compliance via Stripe</li>
                      <li>No storage of payment card details</li>
                      <li>Tokenized transaction processing</li>
                      <li>Advanced fraud protection</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="text-center bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Questions or Disputes?</h2>
              <p className="mb-6">
                If you have any concerns about a transaction, please contact us first at support@archie-st-jj.com. 
                We are committed to resolving any issues promptly and fairly.
              </p>
              <p className="text-gray-300 text-sm mb-6">
                For payment disputes, you may also contact Stripe directly or dispute the charge with your bank or credit card company.
              </p>
              <Link
                href={getLocalizedPath("/contact")}
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </Link>
            </section>
          </div>

          {/* Legal Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>This commerce disclosure is provided in compliance with applicable consumer protection laws and Stripe's merchant requirements.</p>
            <p className="mt-2">
              By making a purchase, you agree to our <Link href={getLocalizedPath("/terms")} className="text-blue-600 hover:underline">Terms of Service</Link> and 
              acknowledge that you have read this Commerce Disclosure.
            </p>
          </div>
        </div>
      </main>

      <Footer dictionary={dictionary} locale={locale} />
    </div>
  )
}
