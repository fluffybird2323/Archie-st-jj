import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/products-dynamic" // Corrected import
import { getDictionary } from "@/lib/i18n/utils"
import { ProductDetailPage } from "@/components/product-detail-page"

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  const dictionary = getDictionary("en")

  return <ProductDetailPage product={product} dictionary={dictionary} locale="en" />
}
