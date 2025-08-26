import { getDictionary as getDict } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Mail, Package, CreditCard } from "lucide-react"

interface RefundPolicyPageProps {
  params: { locale: Locale }
}

export default async function RefundPolicyPage({ params }: RefundPolicyPageProps) {
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
              <RefreshCw className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Refund & Return Policy</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We want you to love your purchase. If you're not completely satisfied, we're here to help with returns and refunds.
            </p>
            <div className="text-sm text-gray-500 mt-4">Last updated: {new Date().toLocaleDateString()}</div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Return Eligibility */}
            <section className="bg-green-50 border-l-4 border-green-500 rounded-r-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Return Eligibility</h2>
              <div className="space-y-6 text-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">✅ What You Can Return</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Items within 30 days of delivery</li>
                      <li>Unworn and unwashed products</li>
                      <li>Items with original tags attached</li>
                      <li>Products in original packaging</li>
                      <li>Items without signs of wear or damage</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">❌ What You Cannot Return</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Items worn or damaged by customer</li>
                      <li>Products without original tags</li>
                      <li>Items marked as "Final Sale"</li>
                      <li>Products returned after 30 days</li>
                      <li>Items not in original condition</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Return Process */}
            <section className="bg-gray-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">How to Return Items</h2>
              <div className="space-y-6 text-gray-700">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Mail className="w-6 h-6 text-blue-600 mr-3 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Step 1: Contact Us</h3>
                        <p>Email us at <strong>returns@archie-st-jj.com</strong> with:</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                          <li>Your order number</li>
                          <li>Items you wish to return</li>
                          <li>Reason for return</li>
                          <li>Photos if item is damaged/defective</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Package className="w-6 h-6 text-purple-600 mr-3 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Step 2: Get Authorization</h3>
                        <p>We'll send you within 24 hours:</p>
                        <ul className="list-disc ml-6 mt-2 space-y-1">
                          <li>Return authorization (RA) number</li>
                          <li>Prepaid return label (for defects)</li>
                          <li>Detailed return instructions</li>
                          <li>Return address information</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-100 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-blue-800">Step 3: Ship Your Return</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-blue-700">
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Package items securely in original packaging</li>
                      <li>Include RA number on the outside of package</li>
                    </ul>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Use provided shipping label or your carrier</li>
                      <li>Keep tracking number for your records</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Refund Information */}
            <section className="bg-black text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Refund Processing</h2>
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <CreditCard className="w-8 h-8 text-blue-400 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Processing Time</h3>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• 1-2 days to inspect returns</li>
                      <li>• 5-7 days to process refund</li>
                      <li>• Bank processing may add 3-5 days</li>
                    </ul>
                  </div>
                  
                  <div>
                    <RefreshCw className="w-8 h-8 text-green-400 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Refund Method</h3>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Original payment method only</li>
                      <li>• Credit cards: 5-10 business days</li>
                      <li>• PayPal: 3-5 business days</li>
                    </ul>
                  </div>
                  
                  <div>
                    <Package className="w-8 h-8 text-yellow-400 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Refund Amount</h3>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• Full item price refunded</li>
                      <li>• Original shipping: defects only</li>
                      <li>• Return shipping: customer pays</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Exchanges */}
            <section className="border-2 border-black rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Exchanges</h2>
              <div className="space-y-6 text-gray-700">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Size/Color Exchanges</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Subject to availability</li>
                      <li>Must be requested within 30 days</li>
                      <li>Original item must meet return conditions</li>
                      <li>Customer pays return shipping costs</li>
                      <li>New item ships once we receive return</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Defective Item Exchanges</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Free return shipping provided</li>
                      <li>Priority processing (1-2 business days)</li>
                      <li>Free expedited shipping for replacement</li>
                      <li>Full refund if replacement unavailable</li>
                      <li>No additional charges or fees</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* International Returns */}
            <section className="bg-yellow-50 border-l-4 border-yellow-500 rounded-r-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">International Returns</h2>
              <div className="space-y-4 text-gray-700">
                <p className="text-lg">Additional considerations for customers outside the United States:</p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Shipping & Customs</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Customer responsible for return shipping costs</li>
                      <li>Items may be subject to customs duties</li>
                      <li>Use tracked shipping method recommended</li>
                      <li>Declare actual item value on customs forms</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Processing Time</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Allow 10-15 additional business days</li>
                      <li>Contact us before shipping returns</li>
                      <li>We'll provide proper customs documentation</li>
                      <li>Insurance recommended for high-value items</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Damaged or Defective Items */}
            <section className="bg-red-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Damaged or Defective Items</h2>
              <div className="space-y-4 text-gray-700">
                <div className="bg-red-100 p-4 rounded-lg">
                  <p className="font-semibold text-red-800 mb-2">If you receive a damaged or defective item:</p>
                  <ol className="list-decimal ml-6 text-red-700 space-y-1">
                    <li>Contact us immediately (within 7 days of delivery)</li>
                    <li>Provide photos showing the damage or defect</li>
                    <li>We'll email you a prepaid return label</li>
                    <li>Choose full refund or free replacement</li>
                  </ol>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What We Cover</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Manufacturing defects</li>
                      <li>Shipping damage</li>
                      <li>Wrong item sent</li>
                      <li>Missing items from order</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Fast Resolution</h3>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>No restocking fees apply</li>
                      <li>Priority customer service</li>
                      <li>Expedited replacement shipping</li>
                      <li>Full compensation for inconvenience</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-purple-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Get Help with Returns</h2>
              <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                  <ul className="space-y-2">
                    <li><strong>Returns Department:</strong> returns@archie-st-jj.com</li>
                    <li><strong>General Support:</strong> support@archie-st-jj.com</li>
                    <li><strong>Response Time:</strong> Within 24 hours</li>
                    <li><strong>Support Hours:</strong> Monday-Friday, 9 AM-6 PM UTC</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3">What to Include in Your Email</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Order number (required)</li>
                    <li>Item(s) you want to return</li>
                    <li>Reason for return or exchange</li>
                    <li>Preferred resolution (refund/exchange)</li>
                    <li>Photos (if damaged or defective)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Stripe Payment Disputes */}
            <section className="text-center bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Payment Disputes & Chargebacks</h2>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <p>If you have a payment-related concern:</p>
                <ol className="list-decimal ml-6 space-y-2 text-gray-300">
                  <li><strong className="text-white">Contact us first</strong> at support@archie-st-jj.com</li>
                  <li><strong className="text-white">We aim to resolve</strong> all issues quickly and fairly</li>
                  <li><strong className="text-white">Chargeback alternative:</strong> You may dispute charges with your bank</li>
                  <li><strong className="text-white">Stripe protection:</strong> All transactions protected by Stripe's dispute resolution</li>
                </ol>
              </div>
              <div className="mt-6">
                <Link
                  href={getLocalizedPath("/contact")}
                  className="inline-block bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Support Team
                </Link>
              </div>
            </section>
          </div>

          {/* Legal Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
            <p>This return and refund policy complies with consumer protection laws and Stripe merchant requirements.</p>
            <p className="mt-2">
              For additional information, see our <Link href={getLocalizedPath("/commerce-disclosure")} className="text-blue-600 hover:underline">Commerce Disclosure</Link> and 
              <Link href={getLocalizedPath("/terms")} className="text-blue-600 hover:underline ml-1">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </main>

      <Footer dictionary={dictionary} locale={locale} />
    </div>
  )
}