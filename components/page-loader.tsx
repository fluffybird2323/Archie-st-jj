"use client"

import { useEffect, useState } from "react"

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false)
        setTimeout(() => {
          setIsVisible(false)
        }, 500)
      }, 300)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-500 ease-out ${
        !isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo Animation */}
        <div className="relative">
          <div className="text-5xl md:text-6xl font-black tracking-tight animate-pulse">
            ARTIE
          </div>
          <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-black animate-loader-line" />
        </div>

        {/* Modern Dot Loader */}
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-black rounded-full animate-loader-dot animation-delay-0" />
          <span className="w-2 h-2 bg-black rounded-full animate-loader-dot animation-delay-200" />
          <span className="w-2 h-2 bg-black rounded-full animate-loader-dot animation-delay-400" />
        </div>
      </div>
    </div>
  )
}
