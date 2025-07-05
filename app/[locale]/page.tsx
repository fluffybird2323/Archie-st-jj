import { LocalizedVideoBanner } from "@/components/localized-video-banner"
import { LocalizedProductCard } from "@/components/localized-product-card"
import { getProducts } from "@/lib/products-dynamic"
import { dictionaries } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"

interface HomePageProps {
  params: {
    locale: Locale
  }
}

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { locale } = params
  const products = await getProducts(locale)
  const dictionary = dictionaries[locale]

  return (
    <main className="min-h-screen">
      {/* Hero Video Banner */}
      <LocalizedVideoBanner dictionary={dictionary} />

      {/* Products Section */}
      <section id="product-section" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-black mb-4">{dictionary.sections.exploreLatest}</h2>
            <p className="text-xl text-gray-600">{dictionary.sections.exploreLatestSubtitle}</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <LocalizedProductCard key={product.id} product={product} dictionary={dictionary} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
