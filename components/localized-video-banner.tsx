"use client"

import { Button } from "@/components/ui/button"
import type { Dictionary } from "@/lib/i18n/dictionaries"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useRef } from "react"

interface LocalizedVideoBannerProps {
  dictionary: Dictionary
  locale: string
  title?: string
  mainText?: string
  subText?: string
}

export function LocalizedVideoBanner({ dictionary, title, mainText, subText }: LocalizedVideoBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [canPlay, setCanPlay] = useState(false)
  const starfieldRef = useRef<HTMLCanvasElement>(null)
  const [showStarfield, setShowStarfield] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const thematicTexts =
    mainText && subText
      ? [{ main: mainText, sub: subText }]
      : [
          {
            main: dictionary.hero.readyForAnything,
            sub: dictionary.hero.readyForAnythingSubtitle,
          },
          {
            main: dictionary.hero.comfortAdapted,
            sub: dictionary.hero.engineeredText,
          },
        ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % thematicTexts.length)
    }, 5000) // Change text every 5 seconds

    return () => clearInterval(interval)
  }, [thematicTexts.length])

  useEffect(() => {
    if (canPlay) {
      // Fade out starfield much faster
      setTimeout(() => setShowStarfield(false), 300)
      setVideoLoaded(true)
    } else {
      setShowStarfield(true)
    }
  }, [canPlay])

  // Preload video when component mounts with priority loading
  useEffect(() => {
    if (videoRef.current) {
      // Start loading immediately
      videoRef.current.load()

      // Try to play as soon as possible
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play failed, but that's okay for muted videos
        })
      }
    }
  }, [])

  useEffect(() => {
    if (!showStarfield) return
    const canvas = starfieldRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const w = canvas.width = window.innerWidth
    const h = canvas.height = window.innerHeight
    const numStars = 350
    const stars = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
      o: Math.random() * 0.5 + 0.5,
    }))

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.translate(w / 2, h / 2)
      for (const star of stars) {
        star.z -= 8
        if (star.z <= 1) {
          star.x = (Math.random() - 0.5) * w
          star.y = (Math.random() - 0.5) * h
          star.z = w
        }
        const k = 128 / star.z
        const sx = star.x * k
        const sy = star.y * k
        const r = Math.max(0.5, 2 - star.z / w * 2)
        ctx.globalAlpha = star.o
        ctx.beginPath()
        ctx.arc(sx, sy, r, 0, 2 * Math.PI)
        ctx.fillStyle = '#fff'
        ctx.shadowColor = '#fff'
        ctx.shadowBlur = 8
        ctx.fill()
      }
      ctx.restore()
      animationFrameId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animationFrameId)
  }, [showStarfield])

  const scrollToProducts = () => {
    const element = document.getElementById("products")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
          canPlay ? "opacity-100" : "opacity-0",
        )}
        onLoadedData={() => setCanPlay(true)}
        onCanPlayThrough={() => setCanPlay(true)}
        onError={() => setVideoError(true)}
        poster="/placeholder.svg?height=1080&width=1920"
        style={{
          willChange: 'opacity',
          transform: 'translateZ(0)'
        }}
      >
        <source src="https://i.imgur.com/gZlvEPD.mp4" type="video/mp4" />
      </video>

      {/* Animated Starfield Overlay (only visible when video is loading or fails) */}
      {showStarfield && (!canPlay || videoError) && (
        <canvas ref={starfieldRef} className="absolute inset-0 w-full h-full z-0 pointer-events-none transition-opacity duration-300" style={{ opacity: canPlay ? 0 : 1 }} />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Loading Indicator */}
      {/* Loader removed: no spinner or loading text, just black background while video loads */}
      {videoError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black">
          <div className="text-white text-center">
            <p className="text-lg font-bold">Video failed to load.</p>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          {/* Main Hero Title */}
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">{title || dictionary.hero.title}</h1>

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
            {dictionary.hero.shopNow}
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
