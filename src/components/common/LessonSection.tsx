"use client"

import Link from "next/link"
import Image from "next/image"
import { Clock, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ILesson } from "@/types/lessons"  

interface LessonSectionProps {
  title: string
  description: string
  lessons: ILesson[]
  accentColor: string
}

export function LessonSection({ title, description, lessons, accentColor }: LessonSectionProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {lessons.map((lesson: ILesson) => (
          <Link key={lesson._id} href={`/lessons/${lesson._id}`}>
            <Card className="group relative p-0 pb-6 overflow-hidden bg-[#f7f7f7] hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300",
                  accentColor
                )} />
                <Image
                  src={lesson.image}
                  alt={lesson.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="relative z-10">
                <h3 className="font-semibold min-h-12 max-h-12 line-clamp-2 group-hover:text-primary transition-colors duration-300">{lesson.title}</h3>
              </CardHeader>
              <CardContent className="space-y-2 relative z-10">
                <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <User className="h-4 w-4 mr-1" />
                  <span>Instructor: {lesson.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Duration: {lesson.duration} minutes</span>
                </div>
              </CardContent>
              <CardFooter className="relative z-10">
                <Badge className={cn(
                  "bg-gradient-to-r transition-all duration-300 group-hover:scale-105",
                  accentColor
                )}>
                  Level: {lesson.level}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
