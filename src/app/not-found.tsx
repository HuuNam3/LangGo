import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, MoveLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Animated icon */}
        <div className="relative mx-auto h-32 w-32">
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-75 blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-xl">
            <AlertCircle className="h-16 w-16 text-pink-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-3">
          <h1 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-8xl font-bold text-transparent">
            404
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Page not found</h2>
          <p className="text-slate-600">Oops! The lesson you're looking for doesn't exist or has been moved.</p>
        </div>

        {/* Back to home button */}
        <div className="pt-6">
          <Button
            asChild
            size="lg"
            className="group bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
          >
            <Link href="/lessons" className="flex items-center gap-2">
              <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Lessons
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 opacity-20 blur-xl" />
      <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 opacity-20 blur-xl" />
    </div>
  )
}
