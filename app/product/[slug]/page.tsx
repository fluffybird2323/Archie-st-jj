import { notFound } from "next/navigation"
import { getProductBySlug } from "@/lib/products-dynamic" // Corrected import
import { getDictionary } from "@/lib/i18n/utils"
import { ProductDetailPage } from "@/components/product-detail-page"
import { Footer } from "@/components/footer"

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

  return (
    <>
      <ProductDetailPage product={product} dictionary={dictionary} locale="en" />
      <Footer dictionary={dictionary} locale="en" />
    </>
  )
}
