import { Skeleton } from "@/components/ui/skeleton";
import "@/styles/shimmer.css";

export function ProductCardSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="rounded-lg overflow-hidden">
        <div className="relative pb-2/3 shimmer">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>
        <div className="p-4">
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}
