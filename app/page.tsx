import { LocalizedVideoBanner } from "@/components/localized-video-banner"
import { LocalizedProductCard } from "@/components/localized-product-card"
import { Logo } from "@/components/logo"
import { CartIcon } from "@/components/cart-icon"
import { LanguageSwitcher } from "@/components/language-switcher"
import { getDictionary } from "@/lib/i18n/dictionaries"
import { getAllProducts } from "@/lib/products-dynamic"
import Link from "next/link"

export default async function HomePage() {
  const dictionary = getDictionary("en")
  const products = await getAllProducts()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.home}
              </Link>
              <Link href="#products" className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.products}
              </Link>
              <Link href="#about" className="text-gray-900 hover:text-gray-600 font-medium">
                {dictionary.nav.about}
              </Link>
              <Link href="#contact" className="text-gray-900 hover:text-gray-600 font-medium">
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

      {/* Hero Section with Video Banner */}
      <LocalizedVideoBanner dictionary={dictionary} />

      {/* Professional Theme Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8">{dictionary.sections.exploreLatest}</h2>
          <p className="text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto">{dictionary.sections.nextEssential}</p>

          {/* Professional messaging */}
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-4">{dictionary.hero.readyForAnything}</h3>
              <p className="text-lg opacity-90">{dictionary.hero.subtitle}</p>
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-4">{dictionary.hero.comfortAdapted}</h3>
              <p className="text-lg opacity-90">{dictionary.hero.engineeredText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="product-section" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
              {dictionary.sections.featuredProducts}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{dictionary.sections.discoverCollection}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <LocalizedProductCard key={product.id} product={product} dictionary={dictionary} locale="en" />
            ))}
          </div>
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
                  placeholder={dictionary.footer.emailPlaceholder}
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
    </div>
  )
}
