import { LocalizedVideoBanner } from "@/components/localized-video-banner"
import { LocalizedProductCard } from "@/components/localized-product-card"
import { Logo } from "@/components/logo"
import { CartIcon } from "@/components/cart-icon"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getProducts } from "@/lib/products-dynamic"
import { dictionaries } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import Link from "next/link"

interface HomePageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function LocalizedHomePage({ params }: HomePageProps) {
  const { locale } = await params
  const products = await getProducts(locale)
  
  // Handle case where dictionary might be undefined
  const dictionary = dictionaries[locale] || dictionaries.en

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/${locale}`} className="flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href={`/${locale}`} className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.home}
              </Link>
              <Link href={`/${locale}#products`} className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.products}
              </Link>
              <Link href={`/${locale}#about`} className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.about}
              </Link>
              <Link href={`/${locale}#contact`} className="text-gray-900 hover:text-gray-600 font-medium">
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

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="col-span-1 md:col-span-2">
              <Logo className="h-8 w-auto mb-4 text-white" />
              <h3 className="text-lg font-semibold mb-3">{dictionary.footer.about}</h3>
              <p className="text-gray-300 mb-4">{dictionary.footer.aboutText}</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">
                  Instagram
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Twitter
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  TikTok
                </a>
              </div>
            </div>

            {/* Support Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{dictionary.footer.support}</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    {dictionary.footer.sizeGuide}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    {dictionary.footer.shippingInfo}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    {dictionary.footer.returnsExchanges}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    {dictionary.footer.contactUs}
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{dictionary.footer.newsletter}</h3>
              <p className="text-gray-300 mb-4">{dictionary.footer.newsletterText}</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder={dictionary.footer.enterEmail}
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button className="px-4 py-2 bg-white text-black rounded-r-md hover:bg-gray-100 font-medium">
                  {dictionary.footer.subscribe}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">© 2024 ARTIE. {dictionary.footer.allRightsReserved}</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white">
                {dictionary.footer.privacy}
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                {dictionary.footer.terms}
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                {dictionary.footer.sustainability}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
