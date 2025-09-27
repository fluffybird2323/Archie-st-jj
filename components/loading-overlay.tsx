import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
  message?: string
  subMessage?: string
}

export function LoadingOverlay({
  message = "Processing...",
  subMessage = "Please wait while we prepare your checkout"
}: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="absolute inset-0 bg-black/10 rounded-full animate-ping" />
            <Loader2 className="w-12 h-12 animate-spin text-black relative" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {message}
            </h3>
            <p className="text-sm text-gray-600">
              {subMessage}
            </p>
          </div>

          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </div>
    </div>
  )
}