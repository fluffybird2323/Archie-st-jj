import { getDictionary } from "@/lib/i18n/utils"
import Header from "@/components/header"
import type { Locale } from "@/lib/i18n/config"

interface RefundPolicyPageProps {
  params: { locale: Locale }
}

export default async function RefundPolicyPage({ params }: RefundPolicyPageProps) {
  const dict = await getDictionary(params.locale)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header dictionary={dict} locale={params.locale} />
      
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Refund and Return Policy
            </h1>
            
            <div className="prose prose-gray max-w-none">
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Return Eligibility</h2>
                <div className="space-y-3">
                  <p><strong>Return Window:</strong> You have 30 days from the date of delivery to return items</p>
                  <p><strong>Condition Requirements:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Items must be unworn and unwashed</li>
                    <li>Original tags must be attached</li>
                    <li>Items must be in original packaging</li>
                    <li>No signs of wear, stains, or damage</li>
                  </ul>
                  <p><strong>Non-Returnable Items:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Items worn or damaged by the customer</li>
                    <li>Items without original tags</li>
                    <li>Sale or final sale items (when marked as such)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">How to Return Items</h2>
                <div className="space-y-3">
                  <p><strong>Step 1: Contact Us</strong></p>
                  <p>Email us at <strong>returns@archie-st-jj.com</strong> with:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Your order number</li>
                    <li>Items you wish to return</li>
                    <li>Reason for return</li>
                    <li>Photos if item is damaged or defective</li>
                  </ul>

                  <p><strong>Step 2: Return Authorization</strong></p>
                  <p>We'll provide you with:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Return authorization (RA) number</li>
                    <li>Return shipping label (for defective items)</li>
                    <li>Return instructions</li>
                  </ul>

                  <p><strong>Step 3: Ship Items Back</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Package items securely in original packaging</li>
                    <li>Include RA number on the package</li>
                    <li>Use provided shipping label or your preferred carrier</li>
                    <li>Keep tracking number for your records</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Refund Process</h2>
                <div className="space-y-3">
                  <p><strong>Processing Time:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>1-2 business days to inspect returned items</li>
                    <li>5-7 business days to process refund after approval</li>
                    <li>Additional time may be required by your bank/card issuer</li>
                  </ul>

                  <p><strong>Refund Method:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Refunds are issued to the original payment method</li>
                    <li>Credit card refunds: 5-10 business days</li>
                    <li>PayPal refunds: 3-5 business days</li>
                    <li>Bank transfers: 7-10 business days</li>
                  </ul>

                  <p><strong>Refund Amount:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Full item price (excluding original shipping costs)</li>
                    <li>Original shipping costs refunded only for defective/incorrect items</li>
                    <li>Return shipping costs are customer's responsibility unless item is defective</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Exchanges</h2>
                <div className="space-y-3">
                  <p><strong>Size/Color Exchanges:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Subject to availability</li>
                    <li>Must be requested within 30 days</li>
                    <li>Original item must meet return conditions</li>
                    <li>Customer pays return shipping costs</li>
                  </ul>

                  <p><strong>Defective Item Exchanges:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Free return shipping provided</li>
                    <li>Priority processing (1-2 business days)</li>
                    <li>Free expedited shipping for replacement</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">International Returns</h2>
                <div className="space-y-3">
                  <p><strong>Additional Considerations:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Customers responsible for international return shipping costs</li>
                    <li>Items may be subject to customs duties upon return</li>
                    <li>Allow additional processing time (10-15 business days)</li>
                    <li>Contact us before shipping to ensure proper customs documentation</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Damaged or Defective Items</h2>
                <div className="space-y-3">
                  <p><strong>If you receive a damaged or defective item:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Contact us immediately (within 7 days of delivery)</li>
                    <li>Provide photos showing the damage/defect</li>
                    <li>We'll provide a prepaid return label</li>
                    <li>Full refund or free replacement offered</li>
                    <li>No restocking fees apply</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-2">
                  <p><strong>Returns Department:</strong> returns@archie-st-jj.com</p>
                  <p><strong>Customer Service:</strong> support@archie-st-jj.com</p>
                  <p><strong>Response Time:</strong> Within 24 hours</p>
                  <p><strong>Phone Support:</strong> Available Monday-Friday, 9 AM - 6 PM UTC</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Stripe Payment Disputes</h2>
                <div className="space-y-3">
                  <p>If you have a payment-related concern:</p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Contact us first at support@archie-st-jj.com</li>
                    <li>We aim to resolve all issues quickly and fairly</li>
                    <li>You may also dispute charges directly with your bank or credit card company</li>
                    <li>Stripe's dispute resolution process applies to all transactions</li>
                  </ul>
                </div>
              </section>

              <div className="mt-8 pt-8 border-t border-gray-200 text-sm text-gray-600">
                <p>This policy complies with consumer protection laws and Stripe's merchant requirements.</p>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}