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
    "sku": product.id,
    "mpn": product.id,
    "image": product.images.map(img => img.startsWith('http') ? img : `${baseUrl}${img}`),
    "brand": {
      "@type": "Brand",
      "name": "ARTIE"
    },
    "offers": {
      "@type": "Offer",
      "url": `${baseUrl}/${locale === 'en' ? '' : locale + '/'}product/${product.slug}`,
      "priceCurrency": "USD",
      "price": price,
      "priceValidUntil": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0",
          "currency": "USD"
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": "US"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "DAY"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 7,
            "unitCode": "DAY"
          }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "12"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Anonymous"
        },
        "reviewBody": "Excellent quality streetwear, fits perfectly and looks amazing!"
      }
    ],
    "category": "Apparel & Accessories > Clothing",
    "material": "Cotton Blend",
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
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://artiestudio.org' : 'http://localhost:3000'

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "name": "ARTIE",
    "alternateName": "ARTIE Studio",
    "description": "Premium streetwear that defines your style. Contemporary urban fashion and signature hoodies.",
    "url": baseUrl,
    "logo": `${baseUrl}/og-default.png`,
    "image": `${baseUrl}/og-default.png`,
    "telephone": "+1-555-ARTIE-00",
    "email": "contact@artiestudio.org",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://instagram.com/artiestudio",
      "https://twitter.com/artiestudio",
      "https://facebook.com/artiestudio"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["English", "Japanese", "German", "French", "Spanish", "Italian", "Chinese"],
      "areaServed": "Worldwide"
    },
    "priceRange": "$$$",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ARTIE Streetwear Collection",
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": "Hoodies",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Premium Hoodie"
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": "T-Shirts",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Product",
                "name": "Graphic Tee"
              }
            }
          ]
        }
      ]
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

interface BreadcrumbStructuredDataProps {
  items: Array<{
    name: string
    url?: string
  }>
  locale: Locale
}

export function BreadcrumbStructuredData({ items, locale }: BreadcrumbStructuredDataProps) {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://artiestudio.org' : 'http://localhost:3000'
  const localePrefix = locale === 'en' ? '' : `/${locale}`

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url ? `${baseUrl}${localePrefix}${item.url}` : undefined
    }))
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

interface WebSiteStructuredDataProps {
  locale: Locale
}

export function WebSiteStructuredData({ locale }: WebSiteStructuredDataProps) {
  const baseUrl = process.env.NODE_ENV === 'production' ? 'https://artiestudio.org' : 'http://localhost:3000'

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ARTIE",
    "alternateName": "ARTIE Studio",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": [
      "en-US",
      "ja-JP",
      "zh-CN",
      "de-DE",
      "fr-FR",
      "es-ES",
      "it-IT"
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
