"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Download, FileText } from "lucide-react"
import { upsertProduct } from "@/lib/supabase"

interface CSVProduct {
  name: string
  slug: string
  price: number
  category: string
  description: string
  sizes: string
  colors: string
  images: string
}

export default function BulkImportPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [results, setResults] = useState<{ success: number; errors: string[] } | null>(null)

  const downloadTemplate = () => {
    const csvContent = `name,slug,price,category,description,sizes,colors,images
"ARCHIE Premium T-Shirt","archie-premium-tshirt",49.99,"T-Shirts","Premium cotton t-shirt with modern fit","XS,S,M,L,XL,XXL","Black,White,Gray","https://example.com/image1.jpg,https://example.com/image2.jpg"
"ARCHIE Signature Hoodie","archie-signature-hoodie",149.99,"Hoodies","Comfortable hoodie with premium materials","S,M,L,XL,XXL","Black,Gray,Navy","https://example.com/hoodie1.jpg,https://example.com/hoodie2.jpg"`

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "product-template.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setResults(null)

    try {
      const text = await file.text()
      const lines = text.split("\n").filter((line) => line.trim())
      const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

      const products: CSVProduct[] = []
      const errors: string[] = []

      for (let i = 1; i < lines.length; i++) {
        try {
          const values = lines[i].split(",").map((v) => v.replace(/"/g, "").trim())
          const product: any = {}

          headers.forEach((header, index) => {
            product[header] = values[index] || ""
          })

          // Validate required fields
          if (!product.name || !product.price || !product.category) {
            errors.push(`Row ${i + 1}: Missing required fields (name, price, category)`)
            continue
          }

          // Parse arrays
          product.sizes = product.sizes ? product.sizes.split(",").map((s: string) => s.trim()) : []
          product.colors = product.colors ? product.colors.split(",").map((c: string) => c.trim()) : []
          product.images = product.images ? product.images.split(",").map((img: string) => img.trim()) : []
          product.price = Number.parseFloat(product.price)

          // Generate slug if not provided
          if (!product.slug) {
            product.slug = product.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")
          }

          products.push(product)
        } catch (error) {
          errors.push(`Row ${i + 1}: Invalid format`)
        }
      }

      // Import products
      let successCount = 0
      for (const product of products) {
        try {
          await upsertProduct({
            ...product,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          successCount++
        } catch (error) {
          errors.push(`Failed to import: ${product.name}`)
        }
      }

      setResults({ success: successCount, errors })
    } catch (error) {
      setResults({ success: 0, errors: ["Failed to parse CSV file"] })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-black mb-8">Bulk Import Products</h1>

          <div className="space-y-8">
            {/* Download Template */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Step 1: Download Template
              </h2>
              <p className="text-gray-600 mb-4">
                Download our CSV template to see the required format for bulk importing products.
              </p>
              <Button onClick={downloadTemplate} className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download CSV Template
              </Button>
            </div>

            {/* Upload CSV */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Step 2: Upload Your CSV
              </h2>
              <p className="text-gray-600 mb-4">Upload your completed CSV file to import multiple products at once.</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-600 file:text-white hover:file:bg-green-700"
              />
              {isUploading && <p className="text-sm text-gray-500 mt-2">Processing CSV file...</p>}
            </div>

            {/* Results */}
            {results && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Import Results</h2>
                <div className="space-y-2">
                  <p className="text-green-600 font-medium">✅ Successfully imported: {results.success} products</p>
                  {results.errors.length > 0 && (
                    <div>
                      <p className="text-red-600 font-medium">❌ Errors:</p>
                      <ul className="list-disc list-inside text-sm text-red-600 ml-4">
                        {results.errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* CSV Format Guide */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">CSV Format Guide</h2>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Required columns:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <code>name</code> - Product name
                  </li>
                  <li>
                    <code>price</code> - Product price (number)
                  </li>
                  <li>
                    <code>category</code> - Product category
                  </li>
                </ul>
                <p>
                  <strong>Optional columns:</strong>
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>
                    <code>slug</code> - URL slug (auto-generated if empty)
                  </li>
                  <li>
                    <code>description</code> - Product description
                  </li>
                  <li>
                    <code>sizes</code> - Comma-separated sizes (e.g., "S,M,L,XL")
                  </li>
                  <li>
                    <code>colors</code> - Comma-separated colors (e.g., "Black,White,Gray")
                  </li>
                  <li>
                    <code>images</code> - Comma-separated image URLs
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
