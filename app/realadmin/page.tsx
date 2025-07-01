"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, Users, Package, BarChart3 } from "lucide-react"
import { getProducts, type Product } from "@/lib/products-dynamic"
import { createProduct, updateProduct, deleteProduct } from "@/lib/supabase"

interface ProductFormData {
  name: string
  slug: string
  price: number
  category: string
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
}

export default function RealAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    slug: "",
    price: 0,
    category: "",
    description: "",
    images: [],
    sizes: [],
    colors: [],
  })
  const router = useRouter()

  useEffect(() => {
    // Simple auth check using localStorage
    const isAuthenticated = localStorage.getItem("admin_authenticated")
    if (!isAuthenticated) {
      router.push("/realadmin/login")
      return
    }
    loadProducts()
  }, [router])

  const loadProducts = async () => {
    try {
      setLoading(true)
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData)
      } else {
        await createProduct(formData)
      }
      await loadProducts()
      resetForm()
    } catch (error) {
      console.error("Error saving product:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id)
        await loadProducts()
      } catch (error) {
        console.error("Error deleting product:", error)
      }
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price,
      category: product.category,
      description: product.description,
      images: product.images,
      sizes: product.sizes,
      colors: product.colors,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setEditingProduct(null)
    setShowForm(false)
    setFormData({
      name: "",
      slug: "",
      price: 0,
      category: "",
      description: "",
      images: [],
      sizes: [],
      colors: [],
    })
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }))
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    router.push("/realadmin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage your ARCHIE store</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Total Products</p>
                    <p className="font-semibold">{products.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Categories</p>
                    <p className="font-semibold">{new Set(products.map((p) => p.category)).size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600">Admin Users</p>
                    <p className="font-semibold">1</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {showForm && (
              <div className="bg-white rounded-lg shadow-sm mb-8">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold">{editingProduct ? "Edit Product" : "Add New Product"}</h3>
                  <p className="text-sm text-gray-600">
                    {editingProduct ? "Update product information" : "Create a new product for your store"}
                  </p>
                </div>
                <div className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Product Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          value={formData.name}
                          onChange={(e) => handleNameChange(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
                          Slug
                        </label>
                        <input
                          id="slug"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          value={formData.slug}
                          onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                          Price ($)
                        </label>
                        <input
                          id="price"
                          type="number"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                          Category
                        </label>
                        <input
                          id="category"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          value={formData.category}
                          onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        id="description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="sizes" className="block text-sm font-medium text-gray-700 mb-1">
                          Sizes (comma-separated)
                        </label>
                        <input
                          id="sizes"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          value={formData.sizes.join(", ")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              sizes: e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean),
                            }))
                          }
                          placeholder="S, M, L, XL"
                        />
                      </div>
                      <div>
                        <label htmlFor="colors" className="block text-sm font-medium text-gray-700 mb-1">
                          Colors (comma-separated)
                        </label>
                        <input
                          id="colors"
                          type="text"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          value={formData.colors.join(", ")}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              colors: e.target.value
                                .split(",")
                                .map((c) => c.trim())
                                .filter(Boolean),
                            }))
                          }
                          placeholder="Black, White, Gray"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-1">
                        Image URLs (comma-separated)
                      </label>
                      <textarea
                        id="images"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        value={formData.images.join(", ")}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            images: e.target.value
                              .split(",")
                              .map((url) => url.trim())
                              .filter(Boolean),
                          }))
                        }
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit">{editingProduct ? "Update Product" : "Create Product"}</Button>
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Products List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Products</h3>
                <p className="text-sm text-gray-600">Manage your product catalog</p>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="text-center py-8">Loading products...</div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 mb-4">No products found</p>
                    <Button onClick={() => setShowForm(true)}>Add Your First Product</Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4 flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{product.name}</h3>
                            <Badge variant="secondary">{product.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>${product.price}</span>
                            <span>Sizes: {product.sizes.join(", ")}</span>
                            <span>Colors: {product.colors.join(", ")}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
