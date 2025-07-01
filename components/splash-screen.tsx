"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 20)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100 && !isComplete) {
      const timeout = setTimeout(() => setIsComplete(true), 300)
      return () => clearTimeout(timeout)
    }
  }, [progress, isComplete])

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white transition-opacity duration-500",
        isComplete ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <div className="mb-8">
        <h1 className="text-6xl font-black text-black tracking-tight">ARCHIE</h1>
      </div>

      <div className="w-48 h-1 bg-light-200 rounded-full overflow-hidden">
        <div className="h-full bg-black transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
