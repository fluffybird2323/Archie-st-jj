import type { Product } from "@/lib/products-dynamic"
import type { Locale } from "@/lib/i18n/config"
import { formatPrice } from "@/lib/i18n/utils"

interface StructuredDataProps {
  product: Product
  locale: Locale
}

export function ProductStructuredData({ product, locale }: StructuredDataProps) {
  const productName = product.translatedName || product.name
  const productDescription = product.translatedDescription || product.description
  const price = product.price
  const productImage = product.images[0]

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": productName,
    "description": productDescription,
    "image": product.images,
    "brand": {
      "@type": "Brand",
      "name": "ARTIE"
    },
    "offers": {
      "@type": "Offer",
      "url": `${typeof window !== 'undefined' ? window.location.origin : ''}/${locale === 'en' ? '' : locale + '/'}product/${product.slug}`,
      "priceCurrency": "USD",
      "price": price,
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "1"
    },
    "additionalProperty": [
      ...product.sizes.map(size => ({
        "@type": "PropertyValue",
        "name": "Size",
        "value": size
      })),
      ...product.colors.map(color => ({
        "@type": "PropertyValue", 
        "name": "Color",
        "value": typeof color === 'string' ? color : color.name
      }))
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

interface OrganizationStructuredDataProps {
  locale: Locale
}

export function OrganizationStructuredData({ locale }: OrganizationStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ARTIE",
    "description": "Premium streetwear that defines your style",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": `${typeof window !== 'undefined' ? window.location.origin : ''}/og-default.png`,
    "sameAs": [
      // Add your social media URLs here
      // "https://instagram.com/archie",
      // "https://twitter.com/archie"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Japanese"]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
