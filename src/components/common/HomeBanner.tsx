"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { Skeleton } from "@/components/ui/skeleton"

export function HomeBanner() {
  const { t, isLoading } = useLanguage()

  if (isLoading) {
    return (
      <div className="container relative p-8 mt-1 rounded-lg shadow bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <Skeleton className="h-12 w-3/4 bg-white/20" />
              <Skeleton className="h-6 w-full bg-white/20" />
              <Skeleton className="h-6 w-2/3 bg-white/20" />
              <div className="flex flex-wrap gap-3 pt-2">
                <Skeleton className="h-10 w-32 bg-white/20" />
                <Skeleton className="h-10 w-32 bg-white/20" />
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <Skeleton className="h-[200px] w-[300px] md:h-[300px] md:w-[500px] rounded-lg bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container relative p-8 mt-1 rounded-lg shadow bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {t.home.banner.title}
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md">
              {t.home.banner.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button className="bg-white text-violet-600 hover:bg-white/90">
                {t.home.banner.startLearning}
              </Button>
              <Button variant="outline" className="border-white text-pink-600 hover:bg-white/10">
                {t.home.banner.takeAssessment}
              </Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative h-[200px] w-[300px] md:h-[300px] md:w-[500px] rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images/banner1.jpg"
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
        <div className="absolute bottom-1/3 right-2/5 text-8xl font-bold">学习</div>
      </div>
    </div>
  )
}
