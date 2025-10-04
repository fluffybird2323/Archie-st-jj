import type React from "react"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { CartWrapper } from "@/components/cart-wrapper"
import { OrganizationStructuredData, WebSiteStructuredData } from "@/components/structured-data"
import { PageLoader } from "@/components/page-loader"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://artiestudio.org' : 'http://localhost:3000'),
  title: {
    default: "ARTIE - Premium Streetwear",
    template: "%s | ARTIE"
  },
  description: "Premium streetwear that defines your style. Discover ARTIE's collection of contemporary urban fashion and signature hoodies.",
  keywords: "streetwear, fashion, urban, premium, clothing, hoodies, t-shirts, ARTIE, japanese fashion, tokyo streetwear",
  authors: [{ name: "ARTIE" }],
  creator: "ARTIE",
  publisher: "ARTIE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ARTIE - Premium Streetwear",
    description: "Premium streetwear that defines your style. Shop signature hoodies and contemporary urban fashion.",
    url: "/",
    siteName: "ARTIE",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "ARTIE - Premium Streetwear Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTIE - Premium Streetwear",
    description: "Premium streetwear that defines your style. Shop signature hoodies and contemporary urban fashion.",
    images: {
      url: "/og-default.png",
      alt: "ARTIE - Premium Streetwear Collection",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <link rel="preload" href="https://i.imgur.com/gZlvEPD.mp4" as="video" type="video/mp4" crossOrigin="anonymous" />
        <OrganizationStructuredData locale="en" />
        <WebSiteStructuredData locale="en" />
      </head>
      <body className="font-inter antialiased">
        <PageLoader />
        <CartProvider>
          {children}
          <CartWrapper />
        </CartProvider>
      </body>
    </html>
  )
}
