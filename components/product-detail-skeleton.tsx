import { Skeleton } from "@/components/ui/skeleton"
import { Logo } from "@/components/logo"

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo className="h-8 w-auto" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-32 h-8" />
              <Skeleton className="w-8 h-8 rounded" />
            </div>
          </div>
        </div>
      </header>

      {/* Product Detail */}
      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Image Gallery Skeleton */}
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
              <Skeleton className="w-full h-full" />
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="w-20 h-20 flex-shrink-0 rounded-md" />
              ))}
            </div>
          </div>

          {/* Right: Product Info Skeleton */}
          <div className="flex flex-col space-y-6">
            {/* Title and Price */}
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/4" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>

            {/* Size Selector */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="w-12 h-12 rounded" />
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-12 h-12 rounded" />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>
              <Skeleton className="h-12 w-full" />
            </div>

            {/* Accordion sections */}
            <div className="space-y-2 pt-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <div className="mt-16 space-y-6">
          <Skeleton className="h-8 w-48" />
          <div className="grid gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-3 p-6 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}