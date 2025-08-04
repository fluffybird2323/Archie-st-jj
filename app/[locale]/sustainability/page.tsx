import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Leaf, Recycle, Heart, Globe, Factory, Truck } from "lucide-react"

interface SustainabilityPageProps {
  params: {
    locale: Locale
  }
}

export default async function SustainabilityPage({ params }: SustainabilityPageProps) {
  const dictionary = await getDictionary(params.locale)

  const getLocalizedPath = (path: string) => {
    return params.locale === "en" ? path : `/${params.locale}${path}`
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
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-6">
              <Leaf className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Sustainability</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're committed to creating premium apparel while minimizing our environmental impact. Every decision we
              make considers the planet and future generations.
            </p>
          </div>

          {/* Mission Statement */}
          <section className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-3xl p-12 mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed">
                To create timeless, high-quality apparel that respects both people and planet. We believe that great
                design and environmental responsibility go hand in hand.
              </p>
            </div>
          </section>

          {/* Sustainability Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-6">
                <Factory className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Responsible Manufacturing</h3>
              <p className="text-gray-600">
                We partner with certified factories that maintain fair labor practices and environmental standards.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-6">
                <Recycle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Circular Design</h3>
              <p className="text-gray-600">
                Our products are designed for longevity and recyclability, reducing waste in the fashion cycle.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-6">
                <Truck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Carbon Neutral Shipping</h3>
              <p className="text-gray-600">
                We offset 100% of our shipping emissions and use minimal, recyclable packaging materials.
              </p>
            </div>
          </div>

          {/* Materials Section */}
          <section className="mb-16">
            <div className="bg-black text-white rounded-3xl p-12">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-center">Sustainable Materials</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Organic Cotton</h3>
                    <p className="text-gray-300 mb-6">
                      Our cotton is GOTS-certified organic, grown without harmful pesticides and using 91% less water
                      than conventional cotton.
                    </p>

                    <h3 className="text-xl font-semibold mb-4">Recycled Polyester</h3>
                    <p className="text-gray-300">
                      Made from post-consumer plastic bottles, our recycled polyester reduces waste while maintaining
                      durability and performance.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">Natural Dyes</h3>
                    <p className="text-gray-300 mb-6">
                      We use low-impact, plant-based dyes that minimize water pollution and chemical runoff.
                    </p>

                    <h3 className="text-xl font-semibold mb-4">Biodegradable Packaging</h3>
                    <p className="text-gray-300">
                      All our packaging materials are compostable or recyclable, eliminating single-use plastics.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Impact Metrics */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center bg-blue-50 rounded-2xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">50%</div>
                <div className="text-sm text-gray-600">Less Water Usage</div>
              </div>
              <div className="text-center bg-green-50 rounded-2xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Carbon Neutral Shipping</div>
              </div>
              <div className="text-center bg-purple-50 rounded-2xl p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">75%</div>
                <div className="text-sm text-gray-600">Recycled Materials</div>
              </div>
              <div className="text-center bg-orange-50 rounded-2xl p-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">0</div>
                <div className="text-sm text-gray-600">Single-Use Plastics</div>
              </div>
            </div>
          </section>

          {/* Future Goals */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-12">
              <h2 className="text-3xl font-bold text-center mb-8">2025 Goals</h2>
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Carbon Negative Operations</h3>
                      <p className="text-gray-600">Remove more carbon from the atmosphere than we produce.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">100% Renewable Energy</h3>
                      <p className="text-gray-600">Power all operations with clean, renewable energy sources.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Recycle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Circular Economy</h3>
                      <p className="text-gray-600">Launch take-back program for end-of-life garments.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4 mt-1">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Regenerative Materials</h3>
                      <p className="text-gray-600">Source materials that actively restore ecosystems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-3xl p-12">
            <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Every purchase supports our mission to create a more sustainable future. Together, we can make a
              difference.
            </p>
            <Link
              href={getLocalizedPath("/")}
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Sustainably
            </Link>
          </section>
        </div>
      </main>

      <Footer dictionary={dictionary} locale={params.locale} />
    </div>
  )
}
