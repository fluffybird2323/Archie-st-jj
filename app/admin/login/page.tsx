"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    console.log("Attempting login with email:", email)

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      console.log("Login API response status:", response.status)
      const data = await response.json()
      console.log("Login API response data:", data)

      if (response.ok && data.success) {
        console.log("Login successful, redirecting to /admin")
        router.push("/admin")
        router.refresh()
      } else {
        const errorMessage = data.error || "Login failed. Please check your credentials."
        setError(errorMessage)
        console.error("Login failed:", errorMessage)
      }
    } catch (error) {
      setError("Network error or API unreachable. Please try again.")
      console.error("Login fetch error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const quickLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo />
          <h1 className="text-2xl font-bold text-black mt-4">Admin Login</h1>
          <p className="text-gray-600 mt-2">Sign in to manage your store</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="admin@archie.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          {error && <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>}

          <Button type="submit" disabled={isLoading} className="nike-button w-full">
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium text-black mb-3">Demo Accounts:</h3>

            <div className="space-y-2">
              <button
                onClick={() => quickLogin("admin@archie.com", "admin123")}
                className="w-full text-left p-2 bg-white border rounded text-sm hover:bg-gray-50"
              >
                <div className="font-medium">Super Admin</div>
                <div className="text-gray-600">admin@archie.com / admin123</div>
              </button>

              <button
                onClick={() => quickLogin("test@archie.com", "password")}
                className="w-full text-left p-2 bg-white border rounded text-sm hover:bg-gray-50"
              >
                <div className="font-medium">Test Admin</div>
                <div className="text-gray-600">test@archie.com / password</div>
              </button>
            </div>

            <p className="text-xs text-red-600 mt-2">⚠️ Change these in production!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
