import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/products-dynamic"
import { getDictionary } from "@/lib/i18n/utils"
import { ProductDetailPage } from "@/components/product-detail-page"
import type { Locale } from "@/lib/i18n/config"

interface LocaleProductPageProps {
  params: Promise<{
    locale: Locale
    slug: string
  }>
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

    return <ProductDetailPage product={product} dictionary={dictionary} locale={locale} />
  } catch (error) {
    console.error("Error loading product page:", error)
    notFound()
  }
}
