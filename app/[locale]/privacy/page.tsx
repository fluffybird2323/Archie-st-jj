import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"
import { Footer } from "@/components/footer"
import { Shield, Eye, Lock, Users } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { designSystem, cn } from "@/lib/design-system"

interface PrivacyPageProps {
  params: {
    locale: Locale
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  const getLocalizedPath = (path: string) => {
    return locale === "en" ? path : `/${locale}${path}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <PageHeader
        showBack={true}
        backUrl={getLocalizedPath("/")}
        backText={dictionary.nav.back}
        showLogo={true}
        showCart={false}
        showLanguage={false}
      />

      {/* Main Content */}
      <main className="pt-24">
        <div className={cn(designSystem.layout.containerNarrow, designSystem.spacing.page)}>
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className={cn(designSystem.typography.h1, "mb-4")}>Privacy Policy</h1>
            <p className={cn(designSystem.typography.lead, "max-w-2xl mx-auto")}>
              Your privacy is important to us. This policy explains how we collect, use, and protect your information. Additionally, it outlines your rights and our obligations under applicable laws.
            </p>
            <div className="text-sm text-gray-500 mt-4">Last updated: January 2024</div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            {/* Information We Collect */}
            <section className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Eye className="w-6 h-6 text-black mr-3" />
                <h2 className="text-2xl font-bold">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  We collect information you provide directly to us, such as when you create an account, make a
                  purchase, or contact us for support.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                  <li>Shipping and billing addresses</li>
                  <li>Order history and preferences</li>
                  <li>Communications with our support team</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="bg-black text-white rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-white mr-3" />
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              </div>
              <div className="space-y-4">
                <p>We use the information we collect to provide, maintain, and improve our services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Provide customer support</li>
                  <li>Improve our products and services</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            {/* Data Protection */}
            <section className="bg-gray-50 rounded-2xl p-8">
              <div className="flex items-center mb-6">
                <Lock className="w-6 h-6 text-black mr-3" />
                <h2 className="text-2xl font-bold">Data Protection</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for all data transmission</li>
                  <li>Secure payment processing through Stripe</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information</li>
                  <li>Data retention policies</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="border-2 border-black rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">Your Rights</h2>
              <div className="space-y-4 text-gray-700">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your personal information</li>
                  <li>Object to processing of your information</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
                <p className="mt-6">To exercise these rights, please contact us at privacy@artie.com. For disputes or complaints, you may also reach out to our legal team at legal@artie.com.</p>
              </div>
            </section>

            {/* Contact */}
            <section className="text-center bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
              <p className="mb-6">If you have any questions about this Privacy Policy, please contact us.</p>
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
