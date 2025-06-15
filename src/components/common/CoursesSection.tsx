"use client";
import { ICourse } from "@/types/database";
import CourseCard from "@/components/lesson/course-card";

interface LessonSectionProps {
  title: string;
  description: string;
  course: ICourse[];
}

export function CoursesSection({
  title,
  description,
  course,
}: LessonSectionProps) {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-black">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {course.map((course: ICourse) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </section>
  );
}
