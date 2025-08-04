import type React from "react"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { CartWrapper } from "@/components/cart-wrapper"

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
  metadataBase: new URL('http://localhost:3003'),
  title: "ARTIE - Premium Streetwear",
  description: "Premium streetwear that defines your style. Discover ARTIE's collection of contemporary urban fashion.",
  keywords: "streetwear, fashion, urban, premium, clothing, hoodies, t-shirts, ARTIE",
  authors: [{ name: "ARTIE" }],
  creator: "ARTIE",
  publisher: "ARTIE",
  openGraph: {
    title: "ARTIE - Premium Streetwear",
    description: "Premium streetwear that defines your style",
    url: "https://artie.com",
    siteName: "ARTIE",
    images: [
      {
        url: "/placeholder.svg",
        width: 1200,
        height: 630,
        alt: "ARTIE - Premium Streetwear",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARTIE - Premium Streetwear",
    description: "Premium streetwear that defines your style",
    images: ["/placeholder.svg"],
    creator: "@artie",
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
      <body className="font-inter antialiased">
        <CartProvider>
          {children}
          <CartWrapper />
        </CartProvider>
      </body>
    </html>
  )
}
