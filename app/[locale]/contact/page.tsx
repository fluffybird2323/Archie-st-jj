import Link from "next/link"
import { Mail, MessageCircle, Phone, MapPin, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact-form"
import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"
import { PageHeader } from "@/components/page-header"
import { designSystem, cn } from "@/lib/design-system"

interface ContactPageProps {
  params: {
    locale: Locale
  }
}

export default async function ContactPage({ params: paramsPromise }: ContactPageProps) {
  const params = await paramsPromise;
  const dictionary = getDictionary(params.locale)
  const backUrl = params.locale === "en" ? "/" : `/${params.locale}`

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        showBack={true}
        backUrl={backUrl}
        backText={dictionary.nav.back}
        showLogo={true}
        showCart={false}
        showLanguage={false}
      />

      <div className={cn(designSystem.layout.container, designSystem.spacing.page, "pt-24")}>

        <div className="text-center mb-16">
          <h1 className={cn(designSystem.typography.h1, "mb-6")}>CONTACT US</h1>
          <p className={cn(designSystem.typography.lead, "max-w-2xl mx-auto")}>
            Get in touch with our team. We're here to help with any questions or concerns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className={designSystem.components.card}>
            <h2 className={cn(designSystem.typography.h3, "mb-6")}>Send us a message</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className={designSystem.components.card}>
              <h2 className={cn(designSystem.typography.h3, "mb-6")}>Get in touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className={cn(designSystem.typography.h5, "mb-1")}>Email</h3>
                    <p className={designSystem.colors.textSecondary}>support@artie.com</p>
                    <p className={designSystem.typography.caption}>We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className={cn(designSystem.typography.h5, "mb-1")}>Contact form</h3>
                    <p className={designSystem.colors.textSecondary}>Available on our website</p>
                    <p className={designSystem.typography.caption}>We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className={cn(designSystem.typography.h5, "mb-1")}>Phone</h3>
                    <p className={designSystem.colors.textSecondary}>+81 (070) 9121-6346</p>
                    <p className={designSystem.typography.caption}>Mon-Fri, 9AM-6PM JST(UTC+9)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className={cn(designSystem.typography.h5, "mb-1")}>Address</h3>
                    <p className={designSystem.colors.textSecondary}>8-503 , 203 Takamura</p>
                    <p className={designSystem.typography.caption}>Hiratsuka, Kanagawa 254-0914 Japan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={designSystem.components.card}>
              <h2 className={cn(designSystem.typography.h3, "mb-6")}>Business Hours</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-semibold">Customer Support</p>
                    <p className="text-gray-600 text-sm">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p className="text-gray-600 text-sm">Saturday - Sunday: 10:00 AM - 4:00 PM EST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 border">
              <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Order Issues</h4>
                  <p className="text-gray-600 text-sm">Questions about your order, shipping, or returns</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Product Information</h4>
                  <p className="text-gray-600 text-sm">Size guides, materials, and care instructions</p>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">Account Help</h4>
                  <p className="text-gray-600 text-sm">Login issues, account settings, and preferences</p>
                </div>
              </div>
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
