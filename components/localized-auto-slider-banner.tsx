"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionaries"

const images = [
  "https://64.media.tumblr.com/db8472cfbb89a155148003b053d5f3de/4d6d987e0cee7307-8e/s400x225/158142e8e876044a6191733a02f6ee5ac1643b58.gif",
  "https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif",
]

interface LocalizedAutoSliderBannerProps {
  dictionary: Dictionary
}

export function LocalizedAutoSliderBanner({ dictionary }: LocalizedAutoSliderBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const handleShopClick = () => {
    const productSection = document.getElementById("product-section")
    if (productSection) {
      productSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-light-50">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src || "/placeholder.svg"}
            alt={`Banner ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-white bg-opacity-20 flex flex-col items-center justify-center">
        <div className="text-center max-w-4xl px-4">
          <h1 className="font-outfit text-6xl md:text-8xl font-black tracking-tight text-black mb-6 animate-fade-in">
            {dictionary.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-12 font-light">{dictionary.hero.subtitle}</p>
          <Button onClick={handleShopClick} className="nike-button text-lg px-12 py-4">
            {dictionary.hero.shopNow}
          </Button>
        </div>
      </div>
    </div>
  )
}
