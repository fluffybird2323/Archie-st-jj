"use client"

import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface LocalizedVideoBannerProps {
  dictionary: Dictionary
}

export function LocalizedVideoBanner({ dictionary }: LocalizedVideoBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)

  const thematicTexts = [
    {
      main: "READY FOR ANYTHING",
      sub: "ARTIE: Premium unisex apparel. Designed to perform, styled to live.",
    },
    {
      main: "COMFORT. ADAPTED.",
      sub: "ARTIE: Engineered for every journey, styled for every moment. Premium apparel, limitless possibility.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % thematicTexts.length)
    }, 5000) // Change text every 5 seconds

    return () => clearInterval(interval)
  }, [thematicTexts.length])

  const scrollToProducts = () => {
    const element = document.getElementById("product-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
          videoLoaded ? "opacity-100" : "opacity-0",
        )}
        onLoadedData={() => setVideoLoaded(true)}
        poster="/placeholder.svg?height=1080&width=1920"
      >
        <source src="https://uvd.yupoo.com/720p/artiemaster/24267105.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Loading Indicator */}
      {!videoLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-sm opacity-75">Loading...</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          {/* Main Hero Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">ARTIE</h1>

          {/* Animated Thematic Text */}
          <div className="min-h-[120px] md:min-h-[150px] flex flex-col justify-center items-center mb-8">
            {thematicTexts.map((text, index) => (
              <div
                key={index}
                className={cn(
                  "absolute transition-all duration-1000 ease-in-out",
                  index === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none",
                )}
              >
                <p className="text-lg md:text-xl font-medium mb-2">{text.main}</p>
                <p className="text-base md:text-lg font-light opacity-90 max-w-2xl mx-auto">{text.sub}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Button
            onClick={scrollToProducts}
            size="lg"
            className="bg-white text-black hover:bg-gray-100 font-bold text-lg px-8 py-4 rounded-none"
          >
            SHOP NOW
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
