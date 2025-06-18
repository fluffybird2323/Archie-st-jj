import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/products-dynamic"
import { getDictionary } from "@/lib/i18n/utils"
import { ProductDetailPage } from "@/components/product-detail-page"
import type { Locale } from "@/lib/i18n/config"

interface LocaleProductPageProps {
  params: {
    locale: Locale
    slug: string
  }
}

export default async function LocaleProductPage({ params }: LocaleProductPageProps) {
  console.log(`Loading product page for slug: ${params.slug}, locale: ${params.locale}`)

  try {
    const product = await getProductBySlug(params.slug, params.locale)

    if (!product) {
      console.log(`Product not found: ${params.slug}`)
      notFound()
    }

    const dictionary = getDictionary(params.locale)

    return <ProductDetailPage product={product} dictionary={dictionary} locale={params.locale} />
  } catch (error) {
    console.error("Error loading product page:", error)
    notFound()
  }
}
