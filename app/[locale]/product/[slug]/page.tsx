import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/products-dynamic"
import { getDictionary } from "@/lib/i18n/utils"
import { ProductDetailPage } from "@/components/product-detail-page"
import { Footer } from "@/components/footer"
import { ProductStructuredData, BreadcrumbStructuredData } from "@/components/structured-data"
import type { Locale } from "@/lib/i18n/config"
import type { Metadata } from "next"
import { formatPrice } from "@/lib/i18n/utils"
import { locales } from "@/lib/i18n/config"

interface LocaleProductPageProps {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

// Generate metadata for each product page
export async function generateMetadata({ params }: LocaleProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://artiestudio.org' : 'http://localhost:3000'

  try {
    const product = await getProductBySlug(slug, locale)

    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
        robots: 'noindex, nofollow',
      }
    }

    const productName = product.translatedName || product.name
    const productDescription = product.translatedDescription || product.description
    const price = formatPrice(product.price, locale)
    const productImage = product.images[0]?.startsWith('http')
      ? product.images[0]
      : `${baseUrl}${product.images[0] || '/og-default.jpg'}`

    // Generate alternate language links
    const alternates = {
      canonical: `${baseUrl}/${locale === 'en' ? '' : locale + '/'}product/${slug}`,
      languages: Object.fromEntries(
        locales.map(l => [
          l === 'en' ? 'x-default' : l,
          `${baseUrl}/${l === 'en' ? '' : l + '/'}product/${slug}`
        ])
      )
    }

    return {
      title: `${productName} - ${price}`,
      description: `${productDescription} Available in sizes ${product.sizes.join(', ')} and colors ${product.colors.map(c => typeof c === 'string' ? c : c.name).join(', ')}. Premium streetwear by ARTIE.`,
      keywords: `${productName}, streetwear, urban fashion, premium clothing, ${product.sizes.join(', ')}, ${product.colors.map(c => typeof c === 'string' ? c : c.name).join(', ')}, ARTIE, buy ${productName}, ${productName} online`,
      alternates,
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
        title: `${productName} - ARTIE`,
        description: `${productDescription} - ${price}`,
        url: `${baseUrl}/${locale === 'en' ? '' : locale + '/'}product/${slug}`,
        siteName: 'ARTIE',
        images: [
          {
            url: productImage,
            width: 800,
            height: 800,
            alt: productName,
          },
          ...product.images.slice(1, 4).map((img, idx) => ({
            url: img.startsWith('http') ? img : `${baseUrl}${img}`,
            width: 800,
            height: 800,
            alt: `${productName} - View ${idx + 2}`,
          }))
        ],
        locale: locale === 'en' ? 'en_US' :
                locale === 'ja' ? 'ja_JP' :
                locale === 'zh-CN' ? 'zh_CN' :
                locale === 'de' ? 'de_DE' :
                locale === 'fr' ? 'fr_FR' :
                locale === 'es' ? 'es_ES' :
                locale === 'it' ? 'it_IT' :
                'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productName} - ARTIE`,
        description: `${productDescription} - ${price}`,
        site: '@artiestudio',
        creator: '@artiestudio',
        images: [productImage],
      },
      other: {
        'product:price:amount': product.price.toString(),
        'product:price:currency': 'USD',
        'product:availability': 'in stock',
        'product:brand': 'ARTIE',
        'product:condition': 'new',
        'product:category': 'Apparel & Accessories > Clothing',
        'product:retailer_item_id': product.id,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Product - ARTIE',
      description: 'Discover premium streetwear at ARTIE.',
    }
  }
}

export default async function LocaleProductPage({ params }: LocaleProductPageProps) {
  const { locale, slug } = await params
  console.log(`Loading product page for slug: ${slug}, locale: ${locale}`)

  try {
    const product = await getProductBySlug(slug, locale)

    if (!product) {
      console.log(`Product not found: ${slug}`)
      notFound()
    }

    const dictionary = getDictionary(locale)
    const productName = product.translatedName || product.name

    const breadcrumbItems = [
      { name: 'Home', url: '/' },
      { name: 'Products', url: '/#products' },
      { name: productName }
    ]

    return (
      <>
        <ProductStructuredData product={product} locale={locale} />
        <BreadcrumbStructuredData items={breadcrumbItems} locale={locale} />
        <ProductDetailPage product={product} dictionary={dictionary} locale={locale} />
        <Footer dictionary={dictionary} locale={locale} />
      </>
    )
  } catch (error) {
    console.error("Error loading product page:", error)
    notFound()
  }
}
