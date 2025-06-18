// Example helper for uploading images to Vercel Blob
import { put } from "@vercel/blob"

export async function uploadProductImage(file: File, productSlug: string, imageIndex: number) {
  const filename = `${productSlug}-${imageIndex}.${file.name.split(".").pop()}`

  const blob = await put(filename, file, {
    access: "public",
  })

  return blob.url
}
