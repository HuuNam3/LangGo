import { LoadingSpinner } from "@/components/common/LoadingSpinner"

export default function Loading() {
  return (
    <div className="flex min-h-screen items-start justify-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}