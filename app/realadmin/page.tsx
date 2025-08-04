"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Edit, Plus, Users, Package, BarChart3, X, Save, ChevronLeft, ChevronRight } from "lucide-react"
import { getProducts, type Product } from "@/lib/products-dynamic"
import { createProduct, updateProduct, deleteProduct, checkProductExists, testSupabaseConnection } from "@/lib/supabase"
import Image from "next/image"

interface ColorWithIndex {
  name: string
  imageIndex: number
}

// Add ProductReview type for admin editing
interface ProductReview {
  title: string
  text: string
  images: string[]
  author_name: string
  author_country: string
  rating: number
  review_date: string
}

interface ProductFormData {
  name: string
  slug: string
  price: number
  category: string
  description: string
  images: string[]
  sizes: string[]
  colors: ColorWithIndex[] // Support color-index mapping
  reviews: ProductReview[]
}

export default function RealAdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingColorIndex, setEditingColorIndex] = useState<{ productId: string; colorIndex: number } | null>(null)
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    slug: "",
    price: 0,
    category: "",
    description: "",
    images: [],
    sizes: [],
    colors: [],
    reviews: [],
  })
  const router = useRouter()

  useEffect(() => {
    // Simple auth check using localStorage
    const isAuthenticated = localStorage.getItem("admin_authenticated")
    if (!isAuthenticated) {
      router.push("/realadmin/login")
      return
    }

    // Test Supabase connection first
    const testConnection = async () => {
      const result = await testSupabaseConnection()
      if (!result.success) {
        console.error("Supabase connection test failed:", result.error)
        alert(`Database connection failed: ${result.error}. Please check your environment variables.`)
        return
      }
      console.log("Supabase connection test successful")
    }

    testConnection()
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
      // Convert colors back to the format expected by the database
      const productData = {
        ...formData,
        colors: formData.colors, // Keep as ColorWithIndex[] for JSONB storage
      }

      if (editingProduct) {
        // Debug: Check if product exists before updating
        const exists = await checkProductExists(editingProduct.id)
        if (!exists) {
          throw new Error(
            `Product with ID ${editingProduct.id} no longer exists in the database. Please refresh the page and try again.`,
          )
        }
        await updateProduct(editingProduct.id, productData)
      } else {
        await createProduct(productData)
      }
      await loadProducts()
      resetForm()
    } catch (error) {
      console.error("Error saving product:", error)
      // Show user-friendly error message
      alert(`Failed to save product: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
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

    // Convert colors to the format expected by the form
    const colors: ColorWithIndex[] = Array.isArray(product.colors)
      ? product.colors.map((color: any, index) => {
          if (typeof color === "string") {
            return { name: color, imageIndex: index }
          } else if (color && typeof color === "object" && "name" in color) {
            return {
              name: color.name || "",
              imageIndex: color.imageIndex ?? index,
            }
          }
          return { name: "Unknown", imageIndex: index }
        })
      : []

    setFormData({
      name: product.name,
      slug: product.slug,
      price: product.price,
      category: product.category,
      description: product.description,
      images: product.images,
      sizes: product.sizes,
      colors: colors,
      reviews: Array.isArray(product.reviews) ? product.reviews : [],
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setEditingProduct(null)
    setShowForm(false)
    setEditingColorIndex(null)
    setFormData({
      name: "",
      slug: "",
      price: 0,
      category: "",
      description: "",
      images: [],
      sizes: [],
      colors: [],
      reviews: [],
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

  const addColor = () => {
    setFormData((prev) => ({
      ...prev,
      colors: [...prev.colors, { name: "", imageIndex: 0 }],
    }))
  }

  const updateColor = (index: number, field: keyof ColorWithIndex, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.map((color, i) => (i === index ? { ...color, [field]: value } : color)),
    }))
  }

  const removeColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }))
  }

  // Image management functions
  const deleteImage = (imageIndex: number) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== imageIndex)

      // Update color image indices after deletion
      const updatedColors = prev.colors.map((color) => {
        if (color.imageIndex > imageIndex) {
          return { ...color, imageIndex: color.imageIndex - 1 }
        } else if (color.imageIndex === imageIndex) {
          return { ...color, imageIndex: 0 } // Reset to first image if deleted image was referenced
        }
        return color
      })

      return {
        ...prev,
        images: newImages,
        colors: updatedColors,
      }
    })
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= formData.images.length) return

    setFormData((prev) => {
      const newImages = [...prev.images]
      const [movedImage] = newImages.splice(fromIndex, 1)
      newImages.splice(toIndex, 0, movedImage)

      // Update color image indices after reordering
      const updatedColors = prev.colors.map((color) => {
        if (color.imageIndex === fromIndex) {
          return { ...color, imageIndex: toIndex }
        } else if (fromIndex < toIndex && color.imageIndex > fromIndex && color.imageIndex <= toIndex) {
          return { ...color, imageIndex: color.imageIndex - 1 }
        } else if (fromIndex > toIndex && color.imageIndex >= toIndex && color.imageIndex < fromIndex) {
          return { ...color, imageIndex: color.imageIndex + 1 }
        }
        return color
      })

      return {
        ...prev,
        images: newImages,
        colors: updatedColors,
      }
    })
  }

  // Quick edit functions for existing products
  const handleQuickEditColorIndex = async (productId: string, colorIndex: number, newImageIndex: number) => {
    try {
      const product = products.find((p) => p.id === productId)
      if (!product) return

      // Convert colors to the format we can work with
      const colors: ColorWithIndex[] = Array.isArray(product.colors)
        ? product.colors.map((color: any, index) => {
            if (typeof color === "string") {
              return { name: color, imageIndex: index }
            } else if (color && typeof color === "object" && "name" in color) {
              return {
                name: color.name || "",
                imageIndex: color.imageIndex ?? index,
              }
            }
            return { name: "Unknown", imageIndex: index }
          })
        : []

      // Update the specific color's image index
      if (colors[colorIndex]) {
        colors[colorIndex].imageIndex = newImageIndex
      }

      // Update the product
      await updateProduct(productId, { colors })
      await loadProducts()
      setEditingColorIndex(null)
    } catch (error) {
      console.error("Error updating color index:", error)
      alert(`Failed to update color index: ${error instanceof Error ? error.message : "Unknown error occurred"}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    router.push("/realadmin/login")
  }

  const formatColorsForDisplay = (colors: any): string => {
    if (!Array.isArray(colors)) return "No colors"

    return colors
      .map((color) => {
        if (typeof color === "string") {
          return color
        } else if (color && typeof color === "object" && "name" in color) {
          return `${color.name} (img: ${color.imageIndex ?? 0})`
        }
        return "Unknown"
      })
      .join(", ")
  }

  const getColorsArray = (colors: any): ColorWithIndex[] => {
    if (!Array.isArray(colors)) return []

    return colors.map((color, index) => {
      if (typeof color === "string") {
        return { name: color, imageIndex: index }
      } else if (color && typeof color === "object" && "name" in color) {
        return {
          name: color.name || "",
          imageIndex: color.imageIndex ?? index,
        }
      }
      return { name: "Unknown", imageIndex: index }
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Real Admin Dashboard</h1>
              <p className="text-gray-600">Manage your ARCHIE store</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
              <Button variant="outline" onClick={loadProducts} className="flex items-center gap-2 bg-transparent">
                <Package className="h-4 w-4" />
                Refresh
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  const result = await testSupabaseConnection()
                  alert(result.success ? "Connection successful!" : `Connection failed: ${result.error}`)
                }}
                className="flex items-center gap-2"
              >
                Test DB
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
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleNameChange(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          value={formData.slug}
                          onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, price: Number.parseFloat(e.target.value) }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sizes">Sizes (comma-separated)</Label>
                      <Input
                        id="sizes"
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
                      <Label htmlFor="images">Image URLs (comma-separated)</Label>
                      <Textarea
                        id="images"
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

                    {/* Enhanced Image Management Section */}
                    {formData.images.length > 0 && (
                      <div className="mb-4 p-4 bg-gray-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-sm font-medium text-gray-700">Image Management</Label>
                          <p className="text-xs text-gray-500">Drag to reorder, click X to delete</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {formData.images.map((image, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square relative border-2 border-gray-200 rounded-lg overflow-hidden bg-white">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`Image ${index}`}
                                  fill
                                  className="object-cover"
                                />

                                {/* Delete Button */}
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => deleteImage(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>

                                {/* Move Left Button */}
                                {index > 0 && (
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    className="absolute top-1 left-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => moveImage(index, index - 1)}
                                  >
                                    <ChevronLeft className="h-3 w-3" />
                                  </Button>
                                )}

                                {/* Move Right Button */}
                                {index < formData.images.length - 1 && (
                                  <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    className="absolute bottom-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() => moveImage(index, index + 1)}
                                  >
                                    <ChevronRight className="h-3 w-3" />
                                  </Button>
                                )}

                                {/* Index Badge */}
                                <div className="absolute bottom-1 left-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                                  {index}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Index numbers will update automatically when you reorder or delete images. Colors will be
                          updated accordingly.
                        </p>
                      </div>
                    )}

                    {/* Enhanced Colors Section with Image Preview */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label>Colors with Image Mapping</Label>
                        <Button type="button" onClick={addColor} size="sm" variant="outline">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Color
                        </Button>
                      </div>

                      <div className="space-y-2">
                        {formData.colors.map((color, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 border rounded-lg bg-white">
                            <Input
                              placeholder="Color name"
                              value={color.name}
                              onChange={(e) => updateColor(index, "name", e.target.value)}
                              className="flex-1"
                            />
                            <div className="flex items-center gap-2">
                              <Label className="text-xs text-gray-500">Image:</Label>
                              <Input
                                type="number"
                                placeholder="Index"
                                value={color.imageIndex}
                                onChange={(e) => updateColor(index, "imageIndex", Number.parseInt(e.target.value) || 0)}
                                className="w-20"
                                min="0"
                                max={Math.max(0, formData.images.length - 1)}
                              />
                            </div>
                            {formData.images[color.imageIndex] && (
                              <div className="w-8 h-8 relative border rounded overflow-hidden">
                                <Image
                                  src={formData.images[color.imageIndex] || "/placeholder.svg"}
                                  alt={`Preview for ${color.name}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <Button type="button" onClick={() => removeColor(index)} size="sm" variant="outline">
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        {formData.colors.length === 0 && (
                          <p className="text-sm text-gray-500">No colors added. Click "Add Color" to start.</p>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Image index corresponds to the position in your image URLs list (starting from 0)
                      </p>
                    </div>

                    {/* Reviews Editing Section */}
                    <div>
                      <Label>Product Reviews</Label>
                      <div className="space-y-4 mt-2">
                        {formData.reviews.map((review, idx) => (
                          <div key={idx} className="border rounded-lg p-4 bg-gray-50 flex flex-col gap-2">
                            <div className="flex gap-2">
                              <Input
                                className="flex-1"
                                placeholder="Title"
                                value={review.title}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    reviews: prev.reviews.map((r, i) =>
                                      i === idx ? { ...r, title: e.target.value } : r,
                                    ),
                                  }))
                                }
                              />
                              <Input
                                className="w-24"
                                placeholder="Rating"
                                type="number"
                                min={1}
                                max={5}
                                value={review.rating}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    reviews: prev.reviews.map((r, i) =>
                                      i === idx ? { ...r, rating: Number(e.target.value) } : r,
                                    ),
                                  }))
                                }
                              />
                            </div>
                            <Textarea
                              placeholder="Review text"
                              value={review.text}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  reviews: prev.reviews.map((r, i) => (i === idx ? { ...r, text: e.target.value } : r)),
                                }))
                              }
                            />
                            <Input
                              placeholder="Image URLs (comma separated)"
                              value={review.images.join(", ")}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  reviews: prev.reviews.map((r, i) =>
                                    i === idx
                                      ? {
                                          ...r,
                                          images: e.target.value
                                            .split(",")
                                            .map((s) => s.trim())
                                            .filter(Boolean),
                                        }
                                      : r,
                                  ),
                                }))
                              }
                            />
                            <div className="flex gap-2">
                              <Input
                                className="flex-1"
                                placeholder="Author Name"
                                value={review.author_name}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    reviews: prev.reviews.map((r, i) =>
                                      i === idx ? { ...r, author_name: e.target.value } : r,
                                    ),
                                  }))
                                }
                              />
                              <Input
                                className="w-16"
                                placeholder="Country"
                                value={review.author_country}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    reviews: prev.reviews.map((r, i) =>
                                      i === idx ? { ...r, author_country: e.target.value } : r,
                                    ),
                                  }))
                                }
                              />
                              <Input
                                className="w-36"
                                placeholder="Date (YYYY-MM-DD)"
                                value={review.review_date}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    reviews: prev.reviews.map((r, i) =>
                                      i === idx ? { ...r, review_date: e.target.value } : r,
                                    ),
                                  }))
                                }
                              />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  reviews: prev.reviews.filter((_, i) => i !== idx),
                                }))
                              }
                            >
                              Delete Review
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              reviews: [
                                ...prev.reviews,
                                {
                                  title: "",
                                  text: "",
                                  images: [],
                                  author_name: "",
                                  author_country: "",
                                  rating: 5,
                                  review_date: new Date().toISOString().slice(0, 10),
                                },
                              ],
                            }))
                          }
                        >
                          Add Review
                        </Button>
                      </div>
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

            {/* Products List with Enhanced Color Management */}
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
                  <div className="space-y-6">
                    {products.map((product) => {
                      const colorsArray = getColorsArray(product.colors)

                      return (
                        <div key={product.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{product.name}</h3>
                                <Badge variant="secondary">{product.category}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>${product.price}</span>
                                <span>Sizes: {product.sizes.join(", ")}</span>
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

                          {/* Enhanced Color Management Section */}
                          {colorsArray.length > 0 && (
                            <div className="border-t pt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-3">Color-Image Mapping:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {colorsArray.map((color, colorIndex) => (
                                  <div
                                    key={colorIndex}
                                    className="flex items-center gap-3 p-2 bg-gray-50 rounded border"
                                  >
                                    <div className="flex-1">
                                      <p className="font-medium text-sm">{color.name}</p>
                                      <p className="text-xs text-gray-500">Image index: {color.imageIndex}</p>
                                    </div>

                                    {/* Image Preview */}
                                    {product.images[color.imageIndex] && (
                                      <div className="w-10 h-10 relative border rounded overflow-hidden">
                                        <Image
                                          src={product.images[color.imageIndex] || "/placeholder.svg"}
                                          alt={`${color.name} preview`}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    )}

                                    {/* Quick Edit Image Index */}
                                    {editingColorIndex?.productId === product.id &&
                                    editingColorIndex?.colorIndex === colorIndex ? (
                                      <div className="flex items-center gap-1">
                                        <Input
                                          type="number"
                                          defaultValue={color.imageIndex}
                                          className="w-16 h-8 text-xs"
                                          min="0"
                                          max={Math.max(0, product.images.length - 1)}
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                              const newIndex =
                                                Number.parseInt((e.target as HTMLInputElement).value) || 0
                                              handleQuickEditColorIndex(product.id, colorIndex, newIndex)
                                            }
                                            if (e.key === "Escape") {
                                              setEditingColorIndex(null)
                                            }
                                          }}
                                          autoFocus
                                        />
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          className="h-8 w-8 p-0 bg-transparent"
                                          onClick={(e) => {
                                            const input = e.currentTarget.previousElementSibling as HTMLInputElement
                                            const newIndex = Number.parseInt(input.value) || 0
                                            handleQuickEditColorIndex(product.id, colorIndex, newIndex)
                                          }}
                                        >
                                          <Save className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        className="h-8 w-8 p-0 bg-transparent"
                                        onClick={() => setEditingColorIndex({ productId: product.id, colorIndex })}
                                        title="Edit image index"
                                      >
                                        <Edit className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
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
