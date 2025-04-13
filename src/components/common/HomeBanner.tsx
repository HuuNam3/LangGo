import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HomeBanner() {
  return (
    <div className="container relative p-2 rounded-lg shadow bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white overflow-hidden">
      <div className="container py-10 md:py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Master Mandarin Chinese at Your Own Pace
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md">
              From basic characters to fluent conversations, find the perfect lessons for your learning journey.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="bg-white text-violet-600 hover:bg-white/90">Start Learning</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Take Assessment
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative h-[200px] w-[300px] md:h-[250px] md:w-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=250&width=400"
                alt="Mandarin Learning"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-1/4 left-1/4 text-8xl font-bold">你好</div>
        <div className="absolute bottom-1/3 right-1/4 text-8xl font-bold">学习</div>
      </div>
    </div>
  )
}
