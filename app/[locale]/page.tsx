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
import type { Metadata } from "next"
import { Suspense } from "react"
import { locales } from "@/lib/i18n/config"

interface HomePageProps {
  params: Promise<{
    locale: Locale
  }>
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://artiestudio.org' : 'http://localhost:3000'

  const localeMap = {
    'en': { name: 'English', og: 'en_US' },
    'ja': { name: 'Japanese', og: 'ja_JP' },
    'zh-CN': { name: 'Chinese', og: 'zh_CN' },
    'de': { name: 'German', og: 'de_DE' },
    'fr': { name: 'French', og: 'fr_FR' },
    'es': { name: 'Spanish', og: 'es_ES' },
    'it': { name: 'Italian', og: 'it_IT' }
  }

  const currentLocale = localeMap[locale] || localeMap['en']

  return {
    title: locale === 'en' ? 'ARTIE - Premium Streetwear | Contemporary Urban Fashion' : `ARTIE - Premium Streetwear (${currentLocale.name})`,
    description: 'Discover ARTIE\'s premium streetwear collection. Contemporary urban fashion, signature hoodies, and exclusive designs that define your style. Shop the latest drops online.',
    keywords: 'ARTIE, streetwear, urban fashion, premium hoodies, contemporary clothing, japanese streetwear, designer hoodies, street style, urban apparel, exclusive fashion',
    alternates: {
      canonical: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}`,
      languages: Object.fromEntries(
        locales.map(l => [
          l === 'en' ? 'x-default' : l,
          `${baseUrl}${l === 'en' ? '' : `/${l}`}`
        ])
      )
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: 'ARTIE - Premium Streetwear',
      description: 'Discover ARTIE\'s premium streetwear collection. Contemporary urban fashion and signature hoodies that define your style.',
      url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}`,
      siteName: 'ARTIE',
      images: [
        {
          url: `${baseUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: 'ARTIE Premium Streetwear Collection',
        }
      ],
      locale: currentLocale.og,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ARTIE - Premium Streetwear',
      description: 'Discover ARTIE\'s premium streetwear collection. Contemporary urban fashion that defines your style.',
      site: '@artiestudio',
      creator: '@artiestudio',
      images: [`${baseUrl}/og-default.png`],
    },
  }
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
