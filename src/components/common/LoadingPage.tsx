import { LoadingSpinner } from "@/components/common/LoadingSpinner"

export default function LoadingPage() {
  return (
    <div className="flex min-h-screen min-w-full justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  )
}