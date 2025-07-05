import type React from "react"
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import { LanguageSwitcher } from "@/components/language-switcher"
import { SplashScreen } from "@/components/splash-screen"
import { CartProvider } from "@/lib/cart-context"
import { CartIcon } from "@/components/cart-icon"
import { CartWrapper } from "@/components/cart-wrapper"

// Load the two fonts locally; Next.js will generate and host them for us
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
})

export const metadata: Metadata = {
  title: "ARTIE - Premium Streetwear",
  description: "Discover premium streetwear and hoodies at ARTIE. Quality meets style.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      // expose both CSS variables so Tailwind can use them
      className={`${inter.variable} ${outfit.variable}`}
    >
      {/* default body text -> Inter; headings that already use font-outfit class keep working */}
      <body className="font-sans">
        <CartProvider>
          <SplashScreen />

          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <a href="/" className="hover:opacity-80 transition-opacity">
                {/* <Logo /> */}
                <span className="font-outfit font-black text-2xl tracking-tight">ARTIE</span>
              </a>

              <div className="flex items-center gap-6">
                <LanguageSwitcher />

                {/* Cart Icon */}
                <CartIcon />

                {/* Customer Support Link */}
                <a
                  href="mailto:support@artie.com"
                  className="text-sm text-gray-600 hover:text-black transition-colors"
                  title="Customer Support"
                >
                  Support
                </a>
              </div>
            </div>
          </header>

          {children}

          {/* Cart Component */}
          <CartWrapper />

          {/* Enhanced Footer */}
          <footer className="w-full py-16 px-4 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="font-outfit font-bold text-black mb-4">PRODUCTS</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Hoodies
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        T-Shirts
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Joggers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Accessories
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-black mb-4">SUPPORT</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Size Guide
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Shipping Info
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Returns & Exchanges
                      </a>
                    </li>
                    <li>
                      <a href="mailto:support@artie.com" className="hover:text-black transition-colors">
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-black mb-4">COMPANY</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        About ARTIE
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Sustainability
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Terms of Service
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-black mb-4">FOLLOW US</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        TikTok
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-black transition-colors">
                        YouTube
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="border-t border-gray-200 pt-8 mb-8">
                <div className="max-w-md mx-auto text-center">
                  <h4 className="font-outfit font-bold text-black mb-2">Stay Updated</h4>
                  <p className="text-gray-600 text-sm mb-4">Get the latest drops and exclusive offers</p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-center text-gray-500 text-sm">
                <p>&copy; 2024 ARTIE. All rights reserved. | Free worldwide shipping on all orders</p>
              </div>
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
