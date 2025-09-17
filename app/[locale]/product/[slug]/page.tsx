import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/products-dynamic"
import { getDictionary } from "@/lib/i18n/utils"
import { ProductDetailPage } from "@/components/product-detail-page"
import { Footer } from "@/components/footer"
import { ProductStructuredData } from "@/components/structured-data"
import type { Locale } from "@/lib/i18n/config"
import type { Metadata } from "next"
import { formatPrice } from "@/lib/i18n/utils"

interface LocaleProductPageProps {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

// Generate metadata for each product page
export async function generateMetadata({ params }: LocaleProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params
  
  try {
    const product = await getProductBySlug(slug, locale)
    
    if (!product) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      }
    }

    const productName = product.translatedName || product.name
    const productDescription = product.translatedDescription || product.description
    const price = formatPrice(product.price, locale)
    const productImage = product.images[0] || '/og-default.jpg'
    
    return {
      title: `${productName} - ${price}`,
      description: `${productDescription} Available in sizes ${product.sizes.join(', ')} and colors ${product.colors.map(c => typeof c === 'string' ? c : c.name).join(', ')}.`,
      keywords: `${productName}, streetwear, fashion, ${product.sizes.join(', ')}, ${product.colors.map(c => typeof c === 'string' ? c : c.name).join(', ')}, ARCHIE`,
      openGraph: {
        title: `${productName} - ARCHIE`,
        description: `${productDescription} - ${price}`,
        url: `/${locale === 'en' ? '' : locale + '/'}product/${slug}`,
        siteName: 'ARCHIE',
        images: [
          {
            url: productImage,
            width: 800,
            height: 800,
            alt: productName,
          },
          {
            url: '/og-default.jpg',
            width: 1200,
            height: 630,
            alt: `${productName} - ARCHIE Premium Streetwear`,
          },
        ],
        locale: locale === 'en' ? 'en_US' : locale === 'ja' ? 'ja_JP' : 'en_US',
        type: 'product',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${productName} - ARCHIE`,
        description: `${productDescription} - ${price}`,
        images: {
          url: productImage,
          alt: productName,
        },
      },
      other: {
        'product:price:amount': product.price.toString(),
        'product:price:currency': 'USD',
        'product:availability': 'in stock',
        'product:brand': 'ARCHIE',
        'product:condition': 'new',
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Product - ARCHIE',
      description: 'Discover premium streetwear at ARCHIE.',
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

    return (
      <>
        <ProductStructuredData product={product} locale={locale} />
        <ProductDetailPage product={product} dictionary={dictionary} locale={locale} />
        <Footer dictionary={dictionary} locale={locale} />
      </>
    )
  } catch (error) {
    console.error("Error loading product page:", error)
    notFound()
  }
}
