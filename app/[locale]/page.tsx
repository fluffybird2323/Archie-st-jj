import Header from "@/components/header"
import Link from "next/link"
import { getDictionary } from "@/lib/i18n/utils"
import { LocalizedVideoBanner } from "@/components/localized-video-banner"
import { LocalizedProductCard } from "@/components/localized-product-card"
import { ProductCardSkeleton } from "@/components/product-card-skeleton"
import { Footer } from "@/components/footer"
import { getProducts } from "@/lib/products-dynamic"
import type { Locale } from "@/lib/i18n/config"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import type { Product } from "@/lib/products-dynamic"
import { Suspense } from "react"

interface HomePageProps {
  params: Promise<{
    locale: Locale
  }>
}

async function ProductsSection({ locale, dictionary }: { locale: Locale; dictionary: Dictionary }) {
  const products = await getProducts(locale)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <LocalizedProductCard key={product.id} product={product} dictionary={dictionary} locale={locale} />
      ))}
    </div>
  )
}

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params
  const { locale } = resolvedParams
  const dictionary = await getDictionary(locale)

  return (
    <main className="min-h-screen">
      <Header dictionary={dictionary} locale={locale} />

      {/* Video Banner */}
      <LocalizedVideoBanner dictionary={dictionary} locale={locale} />

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">{dictionary.sections.exploreLatest}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{dictionary.sections.exploreLatestSubtitle}</p>
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          }>
            <ProductsSection locale={locale} dictionary={dictionary} />
          </Suspense>
        </div>
      </section>

      {/* Footer */}
      <Footer dictionary={dictionary} locale={locale} />
    </main>
  )
}
