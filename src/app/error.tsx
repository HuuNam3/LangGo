"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle, MoveLeft, RotateCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 p-4">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Animated icon */}
        <div className="relative mx-auto h-32 w-32">
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-red-400 to-orange-400 opacity-75 blur-xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white shadow-xl">
            <AlertTriangle className="h-16 w-16 text-red-500" strokeWidth={1.5} />
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-3">
          <h1 className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-8xl font-bold text-transparent">
            500
          </h1>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Something went wrong</h2>
          <p className="text-slate-600">
            An unexpected error occurred. Our team has been notified and is working on a fix.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-3 pt-6">
          <Button
            onClick={reset}
            size="lg"
            className="group bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 transition-all duration-300"
          >
            <RotateCcw className="h-4 w-4 mr-2 transition-transform group-hover:rotate-180" />
            Try again
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="group border-slate-200 hover:border-slate-300 transition-all duration-300"
          >
            <Link href="/" className="flex items-center gap-2">
              <MoveLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to home
            </Link>
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-10 h-20 w-20 rounded-full bg-gradient-to-r from-red-300 to-orange-300 opacity-20 blur-xl" />
      <div className="absolute bottom-10 right-10 h-32 w-32 rounded-full bg-gradient-to-r from-orange-300 to-red-300 opacity-20 blur-xl" />
    </div>
  )
}
