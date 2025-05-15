"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { ILesson } from "@/lib/data/lessons"

interface LessonSectionProps {
  title: string
  description: string
  lessons: ILesson[]
  accentColor: string
}

export function LessonSection({ title, description, lessons, accentColor }: LessonSectionProps) {
  const { t, language } = useLanguage()

  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {lessons.map((lesson) => (
          <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={lesson.image}
                  alt={lesson.translations[language].title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <h3 className="font-semibold line-clamp-2">{lesson.translations[language].title}</h3>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-4 w-4 mr-1" />
                  <span>{t.lessons.instructor}: {lesson.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{t.lessons.duration}: {lesson.translations[language].duration}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Badge className={cn("bg-gradient-to-r", accentColor)}>
                  {t.lessons.level}: {lesson.level}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
