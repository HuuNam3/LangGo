"use client";
import { ILesson } from "@/types/database";
import LessonCard from "./lesson-card";
import { useEffect, useState } from "react";
import { countLessonCompletedOfCourses } from "@/lib/queries";
import Loading from "@/components/common/LoadingPage"

export default function CourseSidebar({ slug, id, pathName }: { slug: string, id: string, pathName: string}) {
  const [lessons, setLessons] = useState<ILesson[]>()
  const [totalLessons, setTotalLessons] = useState(0)
  const [lessonsCompleted, setLessonsCompleted] = useState(0)
  const progressPercentage = Math.round((lessonsCompleted / totalLessons) * 100)

  useEffect(() => {
    const handle = async () => {
      const res = await fetch(`/api/lessons/${slug}`);
      const data = await res.json();
      const query = await countLessonCompletedOfCourses(data[0].course_id)
      setLessonsCompleted(query)
      setTotalLessons(data.length)
      setLessons(data)
      console.log(data)
    };
    handle();
  }, [slug]);

  if (!lessons) {
    return <Loading />
  }

  return (
    <div className="w-96 h-full">
      {/* Sidebar Header */}
      <div className="bg-gray-700 text-white p-4 flex items-center justify-between text-sm rounded-lg">
        <div className="flex items-center gap-4">
          {/* Circular Progress Indicator */}
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-600"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${progressPercentage * 0.88} 88`}
                className="text-blue-400"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium">{progressPercentage}%</span>
            </div>
          </div>
          <span>
            {lessonsCompleted}/{totalLessons} bài học
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Nội dung khóa học</h3>
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lessonName={lesson.name} id={id} pathName={pathName} />
          ))}
        </div>
      </div>
    </div>
  );
}
