"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, User, Users, BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ICourse } from "@/types/database";
import { Progress } from "@/components/ui/progress";

interface LessonSectionProps {
  title: string;
  description: string;
  course: ICourse[];
  progress?: string;
}

export function LessonSection({
  title,
  description,
  course,
  progress,
}: LessonSectionProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {course.map((lesson: ICourse) => (
          <Link key={lesson._id} href={`/courses/${lesson.slug}`}>
            <Card className="group relative gap-2 overflow-hidden bg-[#f7f7f7] hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="relative h-48 overflow-hidden">
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300",
                    "from-blue-500 to-pink-500"
                  )}
                />
                <Image
                  src={lesson.thumbnail || "/images/basic-en.jpg"}
                  alt={lesson.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader className="relative z-10">
                <h3 className="font-semibold min-h-12 max-h-12 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {lesson.name}
                </h3>
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
                <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{lesson.studied} học viên</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <BookOpen className="h-4 w-4 mr-1" />
                  <span>{3} bài học</span>
                </div>
                {progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tiến độ</span>
                      <span className="font-medium">{50}%</span>
                    </div>
                    <Progress value={5 / 1010} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {0}/{3} bài học
                      </span>
                      <span>{lesson.duration}</span>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="relative z-10">
                <Badge
                  className={cn(
                    "bg-gradient-to-r transition-all duration-300 group-hover:scale-105",
                    "from-blue-500 to-pink-500"
                  )}
                >
                  Level: {lesson.level}
                </Badge>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
