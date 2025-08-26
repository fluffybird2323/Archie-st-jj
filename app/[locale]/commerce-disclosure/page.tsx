import { getDictionary } from "@/lib/i18n/utils"
import Header from "@/components/header"
import type { Locale } from "@/lib/i18n/config"

interface CommerceDisclosurePageProps {
  params: { locale: Locale }
}

export default async function CommerceDisclosurePage({ params }: CommerceDisclosurePageProps) {
  const dict = await getDictionary(params.locale)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header dictionary={dict} locale={params.locale} />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Commerce Disclosure
            </h1>
            
            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Business Information</h2>
                <div className="space-y-2">
                  <p><strong>Business Name:</strong> Archie St. JJ</p>
                  <p><strong>Contact Email:</strong> support@archie-st-jj.com</p>
                  <p><strong>Business Type:</strong> Online Retail Store</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Payment Processing</h2>
                <p className="mb-4">
                  We use Stripe as our payment processor. When you make a purchase, your payment information is securely processed by Stripe, Inc. 
                  Your card details are never stored on our servers.
                </p>
                <div className="space-y-2">
                  <p><strong>Payment Processor:</strong> Stripe, Inc.</p>
                  <p><strong>Supported Payment Methods:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Visa, Mastercard, American Express, Discover</li>
                    <li>Digital wallets (Apple Pay, Google Pay)</li>
                    <li>Konbini (Japan)</li>
                    <li>Alipay, WeChat Pay (China)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Pricing and Currency</h2>
                <div className="space-y-3">
                  <p>All prices are displayed in the local currency based on your location:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>United States: USD ($)</li>
                    <li>Japan: JPY (¥)</li>
                    <li>China: CNY (¥)</li>
                    <li>European Union: EUR (€)</li>
                    <li>United Kingdom: GBP (£)</li>
                  </ul>
                  <p>Prices include all applicable taxes. Exchange rates are updated daily.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Shipping and Delivery</h2>
                <div className="space-y-3">
                  <p><strong>Free Worldwide Shipping:</strong> We offer free shipping on all orders.</p>
                  <p><strong>Delivery Time:</strong> 5-15 business days depending on location.</p>
                  <p><strong>Shipping Carriers:</strong> We work with trusted international shipping partners.</p>
                  <p><strong>Tracking:</strong> You will receive a tracking number via email once your order ships.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Return and Refund Policy</h2>
                <div className="space-y-3">
                  <p><strong>Return Window:</strong> 30 days from delivery date</p>
                  <p><strong>Condition:</strong> Items must be unworn, unwashed, and in original packaging</p>
                  <p><strong>Return Process:</strong></p>
                  <ol className="list-decimal ml-6 space-y-1">
                    <li>Contact our support team at support@archie-st-jj.com</li>
                    <li>Receive return authorization and shipping label</li>
                    <li>Package item securely and ship back to us</li>
                    <li>Refund processed within 5-7 business days after receipt</li>
                  </ol>
                  <p><strong>Refund Method:</strong> Refunds are issued to the original payment method</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
                <div className="space-y-2">
                  <p><strong>Email:</strong> support@archie-st-jj.com</p>
                  <p><strong>Response Time:</strong> Within 24 hours</p>
                  <p><strong>Support Hours:</strong> Monday - Friday, 9 AM - 6 PM (UTC)</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Privacy and Security</h2>
                <div className="space-y-3">
                  <p>
                    We take your privacy and security seriously. Your personal information is protected according to our 
                    <a href="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</a>.
                  </p>
                  <p>
                    Payment information is processed securely through Stripe's PCI DSS Level 1 compliant infrastructure. 
                    We never store your payment card details.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Dispute Resolution</h2>
                <div className="space-y-3">
                  <p>
                    If you have any concerns about a transaction, please contact us first at support@archie-st-jj.com. 
                    We are committed to resolving any issues promptly and fairly.
                  </p>
                  <p>
                    For payment disputes, you may also contact Stripe directly or dispute the charge with your bank or 
                    credit card company.
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Legal Compliance</h2>
                <div className="space-y-3">
                  <p>
                    This commerce disclosure is provided in compliance with applicable consumer protection laws and 
                    Stripe's merchant requirements.
                  </p>
                  <p>
                    By making a purchase, you agree to our <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> 
                    and acknowledge that you have read this Commerce Disclosure.
                  </p>
                </div>
              </section>

              <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}