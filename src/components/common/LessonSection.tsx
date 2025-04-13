import Link from "next/link"
import Image from "next/image"
import { Clock, User } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Lesson {
  id: string
  title: string
  image: string
  instructor: string
  duration: string
  level: string
}

interface LessonSectionProps {
  title: string
  description: string
  lessons: Lesson[]
  accentColor: string
}

export function LessonSection({ title, description, lessons, accentColor }: LessonSectionProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2
          className={cn(
            "text-2xl md:text-3xl font-bold inline-block bg-gradient-to-r bg-clip-text text-transparent",
            accentColor,
          )}
        >
          {title}
        </h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {lessons.map((lesson) => (
          <Link href={`/lessons/${lesson.id}`} key={lesson.id} className="group">
            <Card className="h-full overflow-hidden transition-all hover:shadow-md">
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={lesson.image || "/placeholder.svg"}
                  alt={lesson.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <Badge className={cn("absolute top-2 right-2 bg-gradient-to-r", accentColor)}>{lesson.level}</Badge>
              </div>
              <CardHeader className="p-4 pb-2">
                <h3 className="font-semibold line-clamp-2 text-lg group-hover:text-violet-600 transition-colors">
                  {lesson.title}
                </h3>
              </CardHeader>
              <CardContent className="p-4 pt-0 pb-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5 mr-1" />
                  <span>{lesson.instructor}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center text-sm text-muted-foreground">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{lesson.duration}</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
