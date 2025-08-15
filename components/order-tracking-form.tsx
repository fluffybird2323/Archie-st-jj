"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Package, Calendar, CreditCard, MapPin } from "lucide-react"
import type { Dictionary } from "@/lib/i18n/dictionaries"

interface OrderTrackingFormProps {
  dictionary: Dictionary
}

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
  customer?: {
    email?: string
  }
}

export default function OrderTrackingForm({ dictionary }: OrderTrackingFormProps) {
  const [orderId, setOrderId] = useState("")
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setLoading(true)
    setError("")
    setOrderDetails(null)

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
        throw new Error(data.error || "Failed to fetch order")
      }

      setOrderDetails(data.order)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "open":
        return "bg-blue-100 text-blue-800"
      case "canceled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount / 100)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {dictionary.orderTracking.enterOrderId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder={dictionary.orderTracking.orderIdPlaceholder}
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full"
              />
              <p className="text-sm text-gray-500 mt-1">{dictionary.orderTracking.orderIdHelp}</p>
            </div>
            <Button type="submit" disabled={loading || !orderId.trim()} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {dictionary.orderTracking.searching}
                </>
              ) : (
                dictionary.orderTracking.trackOrder
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200">
          <CardContent className="pt-6">
            <div className="text-red-600 text-center">
              <p className="font-medium">{dictionary.orderTracking.orderNotFound}</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {orderDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{dictionary.orderTracking.orderDetails}</span>
              <Badge className={getStatusColor(orderDetails.status)}>{orderDetails.status.toUpperCase()}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{dictionary.orderTracking.orderId}</p>
                  <p className="font-medium">{orderDetails.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{dictionary.orderTracking.orderDate}</p>
                  <p className="font-medium">{formatDate(orderDetails.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">{dictionary.cart.total}</p>
                  <p className="font-medium">{formatCurrency(orderDetails.totalAmount, orderDetails.currency)}</p>
                </div>
              </div>
              {orderDetails.customer?.email && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">{dictionary.orderTracking.email}</p>
                    <p className="font-medium">{orderDetails.customer.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Line Items */}
            <div>
              <h3 className="font-medium mb-3">{dictionary.orderTracking.items}</h3>
              <div className="space-y-2">
                {orderDetails.lineItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {dictionary.cart.quantity}: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">{formatCurrency(item.price * item.quantity, orderDetails.currency)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Fulfillment Info */}
            {orderDetails.fulfillment && (
              <div>
                <h3 className="font-medium mb-3">{dictionary.orderTracking.fulfillment}</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{dictionary.orderTracking.status}</span>
                    <Badge className={getStatusColor(orderDetails.fulfillment.state)}>
                      {orderDetails.fulfillment.state.toUpperCase()}
                    </Badge>
                  </div>
                  {orderDetails.fulfillment.trackingNumber && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{dictionary.orderTracking.trackingNumber}</span>
                      {orderDetails.fulfillment.trackingUrl ? (
                        <a
                          href={orderDetails.fulfillment.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {orderDetails.fulfillment.trackingNumber}
                        </a>
                      ) : (
                        <span className="font-medium">{orderDetails.fulfillment.trackingNumber}</span>
                      )}
                    </div>
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
