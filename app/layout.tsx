import type React from "react"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { CartWrapper } from "@/components/cart-wrapper"
import { OrganizationStructuredData } from "@/components/structured-data"

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
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000'),
  title: {
    default: "ARCHIE - Premium Streetwear",
    template: "%s | ARCHIE"
  },
  description: "Premium streetwear that defines your style. Discover ARCHIE's collection of contemporary urban fashion and signature hoodies.",
  keywords: "streetwear, fashion, urban, premium, clothing, hoodies, t-shirts, ARCHIE, japanese fashion, tokyo streetwear",
  authors: [{ name: "ARCHIE" }],
  creator: "ARCHIE",
  publisher: "ARCHIE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ARCHIE - Premium Streetwear",
    description: "Premium streetwear that defines your style. Shop signature hoodies and contemporary urban fashion.",
    url: "/",
    siteName: "ARCHIE",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "ARCHIE - Premium Streetwear Collection",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARCHIE - Premium Streetwear",
    description: "Premium streetwear that defines your style. Shop signature hoodies and contemporary urban fashion.",
    images: {
      url: "/og-default.jpg",
      alt: "ARCHIE - Premium Streetwear Collection",
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
        <OrganizationStructuredData locale="en" />
      </head>
      <body className="font-inter antialiased">
        <CartProvider>
          {children}
          <CartWrapper />
        </CartProvider>
      </body>
    </html>
  )
}
