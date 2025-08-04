import Link from "next/link"
import { getDictionary } from "@/lib/i18n/utils"
import { LocalizedVideoBanner } from "@/components/localized-video-banner"
import { LocalizedProductCard } from "@/components/localized-product-card"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { CartIcon } from "@/components/cart-icon"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getProducts } from "@/lib/products-dynamic"
import type { Locale } from "@/lib/i18n/config"

interface HomePageProps {
  params: {
    locale: Locale
  }
}

export default async function HomePage({ params }: HomePageProps) {
  const dictionary = getDictionary(params.locale)
  const products = await getProducts()

  const getLocalizedPath = (path: string) => {
    return params.locale === "en" ? path : `/${params.locale}${path}`
  }

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={getLocalizedPath("/")} className="flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href={getLocalizedPath("/")} className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.home}
              </Link>
              <Link href={getLocalizedPath("/#products")} className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.products}
              </Link>
              <Link href={getLocalizedPath("/#about")} className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.about}
              </Link>
              <Link href={getLocalizedPath("/contact")} className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.contact}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <CartIcon />
            </div>
          </div>
        </div>
      </header>

      {/* Video Banner */}
      <LocalizedVideoBanner dictionary={dictionary} locale={params.locale} />

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">{dictionary.sections.exploreLatest}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{dictionary.sections.exploreLatestSubtitle}</p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <LocalizedProductCard
                  key={product.id}
                  product={product}
                  dictionary={dictionary}
                  locale={params.locale}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer dictionary={dictionary} locale={params.locale} />
    </main>
  )
}
