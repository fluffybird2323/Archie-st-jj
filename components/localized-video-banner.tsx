"use client"

import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface LocalizedVideoBannerProps {
  dictionary: Dictionary
}

export function LocalizedVideoBanner({ dictionary }: LocalizedVideoBannerProps) {
  const handleShopClick = () => {
    const productSection = document.getElementById("product-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/placeholder.svg" // Fallback image while video loads
      >
        <source src="https://uvd.yupoo.com/1080p/artiemaster/24267105.mp4" type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <h1 className="font-outfit text-6xl md:text-8xl font-black tracking-tight text-white mb-6 animate-fade-in drop-shadow-lg">
            {dictionary.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-12 font-light drop-shadow-md">{dictionary.hero.subtitle}</p>
          <Button
            onClick={handleShopClick}
            className="nike-button text-lg px-12 py-4 bg-white text-black hover:bg-gray-100"
          >
            {dictionary.hero.shopNow}
          </Button>
        </div>
      </div>
    </div>
  )
}
