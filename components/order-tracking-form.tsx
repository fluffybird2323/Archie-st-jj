"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

interface OrderDetails {
  id: string
  status: string
  createdAt: string
  totalAmount: number
  currency: string
  lineItems: Array<{
    name: string
    quantity: number
    price: number
  }>
  fulfillment?: {
    type: string
    state: string
    trackingNumber?: string
    trackingUrl?: string
  }
  customer: {
    email?: string
  }
}

interface OrderTrackingFormProps {
  locale: Locale
}

export default function OrderTrackingForm({ locale }: OrderTrackingFormProps) {
  const [orderId, setOrderId] = useState("")
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setLoading(true)
    setError("")
    setOrder(null)

    try {
      const response = await fetch("/api/track-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: orderId.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to track order")
      }

      setOrder(data.order)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "canceled":
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      case "open":
        return <Package className="h-4 w-4" />
      default:
        return <Truck className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "canceled":
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "open":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const formatPrice = (amount: number, currency: string) => {
    const divisor = currency === "JPY" ? 1 : 100
    return new Intl.NumberFormat(locale === "ja" ? "ja-JP" : "en-US", {
      style: "currency",
      currency: currency,
    }).format(amount / divisor)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale === "ja" ? "ja-JP" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="orderId">Order ID</Label>
          <Input
            id="orderId"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter your order ID"
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Tracking Order...
            </>
          ) : (
            "Track Order"
          )}
        </Button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {order && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge className={`${getStatusColor(order.status)} flex items-center gap-1`}>
                {getStatusIcon(order.status)}
                {order.status.toUpperCase()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Order ID</p>
                <p className="font-mono text-sm">{order.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Order Date</p>
                <p className="text-sm">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-sm font-semibold">{formatPrice(order.totalAmount, order.currency)}</p>
              </div>
              {order.customer.email && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm">{order.customer.email}</p>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-medium mb-2">Order Items</h4>
              <div className="space-y-2">
                {order.lineItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{formatPrice(item.price, order.currency)}</p>
                  </div>
                ))}
              </div>
            </div>

            {order.fulfillment && (
              <div>
                <h4 className="font-medium mb-2">Shipping Information</h4>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> {order.fulfillment.state}
                  </p>
                  {order.fulfillment.trackingNumber && (
                    <p className="text-sm">
                      <span className="font-medium">Tracking Number:</span>{" "}
                      {order.fulfillment.trackingUrl ? (
                        <a
                          href={order.fulfillment.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {order.fulfillment.trackingNumber}
                        </a>
                      ) : (
                        order.fulfillment.trackingNumber
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
