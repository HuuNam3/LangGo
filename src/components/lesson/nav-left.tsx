"use client";
import { ILesson } from "@/types/database";
import LessonCard from "./lesson-card";

interface CourseSidebarProps {
  lessons: ILesson[];
}

export default function CourseSidebar({ lessons }: CourseSidebarProps) {

  return (
    <div className="w-96 h-full">
      {/* Sidebar Header */}
      <div className="bg-gray-700 text-white p-4 flex items-center justify-between text-sm rounded-lg">
        <div className="flex items-center gap-4">
          {/* Circular Progress Indicator */}
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
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
                strokeDasharray={`88`}
                className="text-blue-400"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium">%</span>
            </div>
          </div>
          <span>
            bài học
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Nội dung khóa học</h3>
        <div className="space-y-2">
          {lessons.map((lesson) => (
            <LessonCard key={lesson._id} lessonName={lesson.name}/>
          ))}
        </div>
      </div>
    </div>
  );
}
