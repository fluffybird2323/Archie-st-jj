import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, Users, Target, Award, Heart, Zap, Globe } from "lucide-react"
import { Logo } from "@/components/logo"
import { LocalizedVideoBanner } from "@/components/localized-video-banner"

interface AboutPageProps {
  params: {
    locale: Locale
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const dictionary = await getDictionary(params.locale)

  const getLocalizedPath = (path: string) => {
    return params.locale === "en" ? path : `/${params.locale}${path}`
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href={getLocalizedPath("/")} className="flex items-center">
            <Logo className="h-8 w-auto" />
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
        {/* Hero Section */}
        <LocalizedVideoBanner locale={params.locale}
          dictionary={dictionary}
          title={dictionary.about.title}
          mainText={dictionary.about.mainText}
          subText={dictionary.about.subText}
        />

        <div className="max-w-6xl mx-auto px-4">
          {/* Story Section */}
          <section className="py-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-8">Our Story</h2>
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    ARTIE was born from a simple belief: that great design should be accessible, sustainable, and built
                    to last. Founded in 2023, we set out to challenge the fast fashion industry with a different
                    approach.
                  </p>
                  <p>
                    Every piece we create is thoughtfully designed, ethically manufactured, and crafted from premium
                    materials. We believe in quality over quantity, timeless style over fleeting trends.
                  </p>
                  <p>
                    Today, ARTIE represents more than apparel—it's a commitment to conscious consumption, environmental
                    responsibility, and the belief that what you wear should reflect your values.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="ARTIE Studio"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-black rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">2023</span>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-gray-50 -mx-4 px-4 rounded-3xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do, from design to delivery.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Quality First</h3>
                <p className="text-gray-600">
                  We never compromise on materials or craftsmanship. Every piece is built to last and improve with time.
                </p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Sustainability</h3>
                <p className="text-gray-600">
                  Environmental responsibility is at our core. We're committed to reducing our impact on the planet.
                </p>
              </div>

              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Community</h3>
                <p className="text-gray-600">
                  We believe in fair labor practices and building lasting relationships with our partners and customers.
                </p>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20">
            <div className="grid lg:grid-cols-2 gap-16">
              <div className="bg-black text-white rounded-3xl p-12">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 mr-4" />
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                </div>
                <p className="text-lg leading-relaxed text-gray-300">
                  To create premium, sustainable apparel that empowers individuals to express their authentic selves
                  while making a positive impact on the world.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-3xl p-12">
                <div className="flex items-center mb-6">
                  <Zap className="w-8 h-8 mr-4" />
                  <h3 className="text-2xl font-bold">Our Vision</h3>
                </div>
                <p className="text-lg leading-relaxed">
                  To lead the transformation of the fashion industry towards a more sustainable, ethical, and inclusive
                  future where style and responsibility coexist.
                </p>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6">Meet the Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The passionate individuals behind ARTIE, working to redefine fashion.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Sarah Chen"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Sarah Chen</h3>
                <p className="text-gray-600 mb-2">Founder & Creative Director</p>
                <p className="text-sm text-gray-500">
                  Former designer at sustainable fashion brands with 10+ years experience.
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Marcus Johnson"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Marcus Johnson</h3>
                <p className="text-gray-600 mb-2">Head of Operations</p>
                <p className="text-sm text-gray-500">
                  Supply chain expert focused on ethical manufacturing and sustainability.
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden">
                    <img
                      src="/placeholder.svg?height=300&width=300"
                      alt="Elena Rodriguez"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Elena Rodriguez</h3>
                <p className="text-gray-600 mb-2">Brand & Marketing Director</p>
                <p className="text-sm text-gray-500">
                  Brand strategist passionate about authentic storytelling and community building.
                </p>
              </div>
            </div>
          </section>

          {/* Global Impact */}
          <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl -mx-4 px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-6">Global Impact</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Our commitment extends beyond fashion to creating positive change worldwide.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-gray-300">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25</div>
                <div className="text-gray-300">Countries Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-gray-300">Ethical Manufacturing</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">Carbon</div>
                <div className="text-gray-300">Neutral Shipping</div>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Be part of the movement towards conscious fashion. Every purchase supports our mission to create a better
              future for fashion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={getLocalizedPath("/")}
                className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors"
              >
                Shop Collection
              </Link>
              <Link
                href={getLocalizedPath("/sustainability")}
                className="inline-block border-2 border-black text-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Learn About Sustainability
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer dictionary={dictionary} locale={params.locale} />
    </div>
  )
}
