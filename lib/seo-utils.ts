import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n/config'
import { locales } from '@/lib/i18n/config'

export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://artiestudio.org'
  : 'http://localhost:3000'

export const localeToOpenGraph: Record<Locale, string> = {
  'en': 'en_US',
  'ja': 'ja_JP',
  'zh-CN': 'zh_CN',
  'de': 'de_DE',
  'fr': 'fr_FR',
  'es': 'es_ES',
  'it': 'it_IT'
}

export function generateAlternateLinks(path: string = '') {
  return {
    canonical: `${baseUrl}${path}`,
    languages: Object.fromEntries(
      locales.map(locale => [
        locale === 'en' ? 'x-default' : locale,
        `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${path}`
      ])
    )
  }
}

export function generateRobotsMeta(index: boolean = true) {
  return {
    index,
    follow: index,
    nocache: false,
    googleBot: {
      index,
      follow: index,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export function generatePageMeta({
  title,
  description,
  keywords,
  locale,
  path = '',
  image = '/og-default.png',
  type = 'website'
}: {
  title: string
  description: string
  keywords?: string
  locale: Locale
  path?: string
  image?: string
  type?: 'website' | 'product' | 'article'
}): Metadata {
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  return {
    title,
    description,
    keywords,
    alternates: generateAlternateLinks(path),
    robots: generateRobotsMeta(true),
    openGraph: {
      title,
      description,
      url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}${path}`,
      siteName: 'ARTIE',
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      locale: localeToOpenGraph[locale],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      site: '@artiestudio',
      creator: '@artiestudio',
      images: [fullImageUrl],
    },
  }
}