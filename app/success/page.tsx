"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getDictionary } from "@/lib/i18n/utils"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [orderDetails, setOrderDetails] = useState(null)

  // Default to English for root success page
  const dictionary = getDictionary("en")

  useEffect(() => {
    if (sessionId) {
      console.log("Order completed with session:", sessionId)
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-black mb-4">{dictionary.success.title}</h1>
          <p className="text-gray-600 mb-8">{dictionary.success.message}</p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="nike-button w-full">{dictionary.success.continueShopping}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
