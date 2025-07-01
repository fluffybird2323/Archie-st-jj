import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseInstance: ReturnType<typeof createClient> | null = null

if (supabaseUrl && supabaseAnonKey) {
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    console.log("Supabase client initialized successfully.")
  } catch (error) {
    console.error("Failed to initialize Supabase client:", error)
    console.error("Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are correctly set.")
  }
} else {
  console.warn("Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set.")
}

export const supabase = supabaseInstance

export interface DatabaseProduct {
  id: string
  slug: string
  name: string
  price: number
  category: string
  description: string
  images: string[]
  sizes: string[]
  colors: string[]
  created_at: string
  updated_at: string
}

export function isSupabaseConfigured(): boolean {
  return !!supabase
}

export async function getProducts() {
  try {
    if (!supabase) {
      console.warn("Supabase not configured, returning empty products array in getProducts.")
      return []
    }

    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    return (data || []) as unknown as DatabaseProduct[]
  } catch (error) {
    console.error("Unexpected error fetching products:", error)
    return []
  }
}

export async function getProductBySlug(slug: string) {
  try {
    if (!supabase) {
      console.warn("Supabase not configured, returning null for product in getProductBySlug.")
      return null
    }

    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single()

    if (error) {
      console.error("Error fetching product:", error)
      return null
    }

    return data as unknown as DatabaseProduct | null
  } catch (error) {
    console.error("Unexpected error fetching product:", error)
    return null
  }
}

export async function upsertProduct(product: Partial<DatabaseProduct>) {
  try {
    if (!supabase) {
      throw new Error("Supabase not configured in upsertProduct.")
    }

    const { data, error } = await supabase.from("products").upsert(product).select().single()

    if (error) {
      console.error("Error upserting product:", error)
      throw error
    }

    return data as unknown as DatabaseProduct
  } catch (error) {
    console.error("Unexpected error upserting product:", error)
    throw error
  }
}

export async function createProduct(productData: Omit<DatabaseProduct, "id" | "created_at" | "updated_at">) {
  try {
    if (!supabase) {
      throw new Error("Supabase not configured in createProduct.")
    }

    const now = new Date().toISOString()
    const newProduct = {
      ...productData,
      created_at: now,
      updated_at: now,
    }

    const { data, error } = await supabase.from("products").insert(newProduct).select().single()

    if (error) {
      console.error("Error creating product:", error)
      throw error
    }

    return data as unknown as DatabaseProduct
  } catch (error) {
    console.error("Unexpected error creating product:", error)
    throw error
  }
}

export async function updateProduct(id: string, productData: Partial<Omit<DatabaseProduct, "id" | "created_at">>) {
  try {
    if (!supabase) {
      throw new Error("Supabase not configured in updateProduct.")
    }

    const updatedProduct = {
      ...productData,
      updated_at: new Date().toISOString(),
    }

    const { data, error } = await supabase.from("products").update(updatedProduct).eq("id", id).select().single()

    if (error) {
      console.error("Error updating product:", error)
      throw error
    }

    return data as unknown as DatabaseProduct
  } catch (error) {
    console.error("Unexpected error updating product:", error)
    throw error
  }
}

export async function deleteProduct(id: string) {
  try {
    if (!supabase) {
      throw new Error("Supabase not configured in deleteProduct.")
    }

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      console.error("Error deleting product:", error)
      throw error
    }

    return true
  } catch (error) {
    console.error("Unexpected error deleting product:", error)
    throw error
  }
}

export async function uploadProductImage(file: File, productSlug: string): Promise<string> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("productSlug", productSlug)

  const response = await fetch("/api/upload-image", {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload image")
  }

  const { url } = await response.json()
  return url
}

export async function checkDatabaseSetup() {
  try {
    if (!supabase) {
      return { isSetup: false, error: "Supabase environment variables not configured for checkDatabaseSetup." }
    }

    const { data, error } = await supabase.from("products").select("*").limit(1)

    if (error) {
      console.error("Database setup issue:", error)
      return { isSetup: false, error: error.message }
    }

    return { isSetup: true, error: null }
  } catch (error) {
    console.error("Database connection issue:", error)
    return { isSetup: false, error: "Cannot connect to database" }
  }
}
