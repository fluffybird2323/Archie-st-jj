"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export interface CustomerInfo {
  email?: string
  phone?: string
  address?: {
    firstName?: string
    lastName?: string
    line1?: string
    line2?: string
    city?: string
    state?: string
    postalCode?: string
    country?: string
  }
}

interface CheckoutFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void
  onClose: () => void
  isLoading?: boolean
  isMandatory?: boolean
}

export function CheckoutForm({ onSubmit, onClose, isLoading, isMandatory = false }: CheckoutFormProps) {
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: "",
    phone: "",
    address: {
      firstName: "",
      lastName: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US"
    }
  })

  const firstInputRef = useRef<HTMLInputElement>(null)

  // Auto-focus first input when form opens
  useEffect(() => {
    if (firstInputRef.current) {
      // Small delay to ensure the form is fully rendered
      setTimeout(() => {
        firstInputRef.current?.focus()
      }, 100)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate required fields
    if (!customerInfo.email || !customerInfo.phone) {
      alert("Please provide email and phone number")
      return
    }
    
    if (!customerInfo.address?.firstName || !customerInfo.address?.lastName ||
        !customerInfo.address?.line1 || !customerInfo.address?.city ||
        !customerInfo.address?.state || !customerInfo.address?.postalCode) {
      alert("Please fill in all required shipping address fields")
      return
    }
    
    onSubmit(customerInfo)
  }

  const updateAddress = (field: string, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }))
  }

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      {/* Form Panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Shipping & Contact Information</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Info Message */}
            <div className="mb-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-amber-800">
                <strong>Required:</strong> Please provide your shipping address and contact information so we can deliver your order.
                All fields marked with * are mandatory.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input
                      ref={firstInputRef}
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">First Name *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.firstName}
                        onChange={(e) => updateAddress("firstName", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Last Name *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.lastName}
                        onChange={(e) => updateAddress("lastName", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address Line 1 *</label>
                    <input
                      type="text"
                      value={customerInfo.address?.line1}
                      onChange={(e) => updateAddress("line1", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      placeholder="123 Main St"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Address Line 2 (Optional)</label>
                    <input
                      type="text"
                      value={customerInfo.address?.line2}
                      onChange={(e) => updateAddress("line2", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      placeholder="Apt, Suite, Unit, etc."
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">City *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.city}
                        onChange={(e) => updateAddress("city", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State/Province *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.state}
                        onChange={(e) => updateAddress("state", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        placeholder="CA"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Postal Code *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.postalCode}
                        onChange={(e) => updateAddress("postalCode", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                        placeholder="12345"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Country *</label>
                    <select
                      value={customerInfo.address?.country}
                      onChange={(e) => updateAddress("country", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                      required
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                      <option value="DE">Germany</option>
                      <option value="FR">France</option>
                      <option value="JP">Japan</option>
                      <option value="IN">India</option>
                      <option value="BR">Brazil</option>
                      <option value="MX">Mexico</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t">
                <Button
                  type="button"
                  onClick={onClose}
                  disabled={isLoading}
                  className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-black text-white hover:bg-gray-900"
                >
                  {isLoading ? "Processing..." : "Continue to Square Checkout"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}