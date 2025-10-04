import { MetadataRoute } from 'next'
import { getProducts } from '@/lib/products-dynamic'
import { locales } from '@/lib/i18n/config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://artiestudio.org'
    : 'http://localhost:3000'

  // Get all products for the default locale
  const products = await getProducts('en')

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/contact',
    '/privacy',
    '/returns',
    '/shipping',
    '/size-guide',
    '/sustainability',
    '/terms',
  ]

  // Generate sitemap entries for all pages in all locales
  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add home page for each locale
  for (const locale of locales) {
    const localePrefix = locale === 'en' ? '' : `/${locale}`

    // Add static pages
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [
              l === 'en' ? 'x-default' : l,
              `${baseUrl}${l === 'en' ? '' : `/${l}`}${page}`
            ])
          )
        }
      })
    }

    // Add product pages
    for (const product of products) {
      sitemapEntries.push({
        url: `${baseUrl}${localePrefix}/product/${product.slug}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: Object.fromEntries(
            locales.map(l => [
              l === 'en' ? 'x-default' : l,
              `${baseUrl}${l === 'en' ? '' : `/${l}`}/product/${product.slug}`
            ])
          )
        }
      })
    }
  }

  return sitemapEntries
}