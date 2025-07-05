import { LocalizedVideoBanner } from "@/components/localized-video-banner"
import { LocalizedProductCard } from "@/components/localized-product-card"
import { getDictionary } from "@/lib/i18n/utils"
import { getAllProducts } from "@/lib/products-dynamic"

export default async function Home() {
  // Default to English for the root route
  const locale = "en"
  const dictionary = getDictionary(locale)
  const products = await getAllProducts()

  return (
    <main className="min-h-screen bg-white">
      <LocalizedVideoBanner dictionary={dictionary} />

      {/* Featured Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-black text-black mb-6">{dictionary.products.moveInComfort}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{dictionary.products.description}</p>
        </div>
      </section>

      {/* Product Section */}
      <section id="product-section" className="py-24 bg-light-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-4">{dictionary.products.title}</h2>
            <p className="text-lg text-gray-600">{dictionary.products.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <LocalizedProductCard key={product.id} product={product} dictionary={dictionary} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
