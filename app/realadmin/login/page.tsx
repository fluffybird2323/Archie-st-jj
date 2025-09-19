"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { designSystem, cn } from "@/lib/design-system"
import { Logo } from "@/components/logo"

export default function RealAdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/realadmin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem("admin_authenticated", "true")
        router.push("/realadmin")
      } else {
        setError(data.error || "Login failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className={cn(designSystem.components.card, "w-full max-w-md")}>
        <div className="text-center mb-8">
          <Logo className="h-12 w-auto mx-auto mb-6" />
          <h1 className={cn(designSystem.typography.h3, "mb-2")}>Admin Login</h1>
          <p className={designSystem.typography.caption}>Sign in to manage your ARTIE store</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@artiestudio.org"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <button
            type="submit"
            className={cn(designSystem.components.buttonPrimary, "w-full")}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className={cn("mt-6 p-4 bg-gray-50 rounded-lg text-center", designSystem.typography.caption)}>
          <p className="font-semibold mb-1">Demo credentials:</p>
          <p>Email: admin@artiestudio.org</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  )
}