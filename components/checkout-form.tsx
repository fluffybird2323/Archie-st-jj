"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X, AlertCircle } from "lucide-react"
import { getDictionary } from "@/lib/i18n/utils"
import type { Locale } from "@/lib/i18n/config"

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
  locale: Locale
}

interface FieldErrors {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  line1?: string
  city?: string
  state?: string
  postalCode?: string
}

export function CheckoutForm({ onSubmit, onClose, isLoading, isMandatory = false, locale }: CheckoutFormProps) {
  const dictionary = getDictionary(locale)
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

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
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

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    // Basic phone validation - at least 10 digits
    const phoneDigits = phone.replace(/\D/g, '')
    return phoneDigits.length >= 10
  }

  const validateField = (fieldName: string, value: string): string | undefined => {
    const errors = dictionary.checkout.errors

    switch (fieldName) {
      case 'email':
        if (!value) return errors.fieldRequired
        if (!validateEmail(value)) return errors.invalidEmail
        break
      case 'phone':
        if (!value) return errors.fieldRequired
        if (!validatePhone(value)) return errors.invalidPhone
        break
      case 'firstName':
        if (!value) return errors.firstNameRequired
        break
      case 'lastName':
        if (!value) return errors.lastNameRequired
        break
      case 'line1':
        if (!value) return errors.addressRequired
        break
      case 'city':
        if (!value) return errors.cityRequired
        break
      case 'state':
        if (!value) return errors.stateRequired
        break
      case 'postalCode':
        if (!value) return errors.postalCodeRequired
        break
    }
    return undefined
  }

  const handleFieldBlur = (fieldName: string, value: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName))
    const error = validateField(fieldName, value)
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const errors: FieldErrors = {}
    errors.email = validateField('email', customerInfo.email || '')
    errors.phone = validateField('phone', customerInfo.phone || '')
    errors.firstName = validateField('firstName', customerInfo.address?.firstName || '')
    errors.lastName = validateField('lastName', customerInfo.address?.lastName || '')
    errors.line1 = validateField('line1', customerInfo.address?.line1 || '')
    errors.city = validateField('city', customerInfo.address?.city || '')
    errors.state = validateField('state', customerInfo.address?.state || '')
    errors.postalCode = validateField('postalCode', customerInfo.address?.postalCode || '')

    // Check if there are any errors
    const hasErrors = Object.values(errors).some(error => error !== undefined)

    if (hasErrors) {
      setFieldErrors(errors)
      // Mark all fields as touched to show errors
      setTouchedFields(new Set(['email', 'phone', 'firstName', 'lastName', 'line1', 'city', 'state', 'postalCode']))
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

  const getFieldError = (fieldName: string): string | undefined => {
    if (touchedFields.has(fieldName)) {
      return fieldErrors[fieldName as keyof FieldErrors]
    }
    return undefined
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
              <h2 className="text-2xl font-bold">{dictionary.checkout.title}</h2>
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
                <strong>{dictionary.checkout.required}:</strong> {dictionary.checkout.requiredMessage}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{dictionary.checkout.contactInfo}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{dictionary.checkout.email} *</label>
                    <input
                      ref={firstInputRef}
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      onBlur={(e) => handleFieldBlur('email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 ${
                        getFieldError('email') ? 'border-red-500' : 'border-gray-300 focus:border-black'
                      }`}
                      placeholder={dictionary.checkout.emailPlaceholder}
                    />
                    {getFieldError('email') && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {getFieldError('email')}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{dictionary.checkout.phone} *</label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      onBlur={(e) => handleFieldBlur('phone', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 ${
                        getFieldError('phone') ? 'border-red-500' : 'border-gray-300 focus:border-black'
                      }`}
                      placeholder={dictionary.checkout.phonePlaceholder}
                    />
                    {getFieldError('phone') && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {getFieldError('phone')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-lg font-semibold mb-4">{dictionary.checkout.shippingAddress}</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{dictionary.checkout.firstName} *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.firstName}
                        onChange={(e) => updateAddress("firstName", e.target.value)}
                        onBlur={(e) => handleFieldBlur('firstName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 ${
                          getFieldError('firstName') ? 'border-red-500' : 'border-gray-300 focus:border-black'
                        }`}
                      />
                      {getFieldError('firstName') && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {getFieldError('firstName')}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{dictionary.checkout.lastName} *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.lastName}
                        onChange={(e) => updateAddress("lastName", e.target.value)}
                        onBlur={(e) => handleFieldBlur('lastName', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 ${
                          getFieldError('lastName') ? 'border-red-500' : 'border-gray-300 focus:border-black'
                        }`}
                      />
                      {getFieldError('lastName') && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {getFieldError('lastName')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{dictionary.checkout.addressLine1} *</label>
                    <input
                      type="text"
                      value={customerInfo.address?.line1}
                      onChange={(e) => updateAddress("line1", e.target.value)}
                      onBlur={(e) => handleFieldBlur('line1', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 ${
                        getFieldError('line1') ? 'border-red-500' : 'border-gray-300 focus:border-black'
                      }`}
                      placeholder={dictionary.checkout.addressLine1Placeholder}
                    />
                    {getFieldError('line1') && (
                      <p className="mt-1 text-xs text-red-500 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {getFieldError('line1')}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{dictionary.checkout.addressLine2}</label>
                    <input
                      type="text"
                      value={customerInfo.address?.line2}
                      onChange={(e) => updateAddress("line2", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20"
                      placeholder={dictionary.checkout.addressLine2Placeholder}
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">{dictionary.checkout.city} *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.city}
                        onChange={(e) => updateAddress("city", e.target.value)}
                        onBlur={(e) => handleFieldBlur('city', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 ${
                          getFieldError('city') ? 'border-red-500' : 'border-gray-300 focus:border-black'
                        }`}
                      />
                      {getFieldError('city') && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {getFieldError('city')}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{dictionary.checkout.state} *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.state}
                        onChange={(e) => updateAddress("state", e.target.value)}
                        onBlur={(e) => handleFieldBlur('state', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 ${
                          getFieldError('state') ? 'border-red-500' : 'border-gray-300 focus:border-black'
                        }`}
                        placeholder={dictionary.checkout.statePlaceholder}
                      />
                      {getFieldError('state') && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {getFieldError('state')}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">{dictionary.checkout.postalCode} *</label>
                      <input
                        type="text"
                        value={customerInfo.address?.postalCode}
                        onChange={(e) => updateAddress("postalCode", e.target.value)}
                        onBlur={(e) => handleFieldBlur('postalCode', e.target.value)}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-20 ${
                          getFieldError('postalCode') ? 'border-red-500' : 'border-gray-300 focus:border-black'
                        }`}
                        placeholder={dictionary.checkout.postalCodePlaceholder}
                      />
                      {getFieldError('postalCode') && (
                        <p className="mt-1 text-xs text-red-500 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {getFieldError('postalCode')}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">{dictionary.checkout.country} *</label>
                    <select
                      value={customerInfo.address?.country}
                      onChange={(e) => updateAddress("country", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-20"
                      required
                    >
                      <option value="US">{dictionary.checkout.countries.US}</option>
                      <option value="CA">{dictionary.checkout.countries.CA}</option>
                      <option value="GB">{dictionary.checkout.countries.GB}</option>
                      <option value="AU">{dictionary.checkout.countries.AU}</option>
                      <option value="DE">{dictionary.checkout.countries.DE}</option>
                      <option value="FR">{dictionary.checkout.countries.FR}</option>
                      <option value="JP">{dictionary.checkout.countries.JP}</option>
                      <option value="IN">{dictionary.checkout.countries.IN}</option>
                      <option value="BR">{dictionary.checkout.countries.BR}</option>
                      <option value="MX">{dictionary.checkout.countries.MX}</option>
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
                  {dictionary.checkout.cancel}
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-black text-white hover:bg-gray-900"
                >
                  {isLoading ? dictionary.checkout.processing : dictionary.checkout.continueToCheckout}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}