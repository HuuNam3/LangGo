"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoLesson from "@/components/lesson/video-lesson"
// import WritenLesson from "@/components/lesson/writen-lesson"
// import QuizVideo from "@/components/lesson/quiz-video"
import NavLeft from "@/components/lesson/nav-left";
// import QuizNonWriten from "@/components/lesson/quiz-non-writen"
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from 'next/navigation'
import { ILesson, IVideoContent } from "@/types/database";
import LoadingPage from "@/components/common/LoadingPage";
import { countLessonCompletedOfCourses } from "@/lib/queries"

export default function LanguageLearningPlatform() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [lessons, setLessons] = useState<ILesson[]>()
  const [lessonsCompleted, setLessonsCompleted] = useState(0)
  const [videoContent, setVideoContent] = useState<IVideoContent>()

  useEffect(() => {
    const handle = async () => {
      const res = await fetch(`/api/lessons/${slug}`);
      const data = await res.json();
      const res1 = await fetch(`/api/video_contents?id=${encodeURIComponent(data[0]._id)}`);
      const data1 = await res1.json();
      console.log(data1)
      setVideoContent(data1)
      const query = await countLessonCompletedOfCourses(data[0].course_id)
      setLessonsCompleted(query)
      setLessons(data)
    };
    handle();
  }, [id, slug]);

  if (!lessons || !videoContent) {
    return <LoadingPage />
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-2">
        {/* Video Player Component */}
          <VideoLesson subtitle={videoContent.subtitle} videoUrl={videoContent.url} title={lessons[0]?.name} 
        />
        {/* <WritenLesson/> */}
        {/* <QuizVideo/> */}
        {/* <QuizNonWriten/> */}
      </div>

      {/* Course Sidebar Component */}
      <div className="pt-2">
        <NavLeft lessons={lessons} completedLessons={lessonsCompleted} totalLessons={lessons.length}
        />
      </div>

      {/* Full-width Navigation at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-center gap-4 max-w-full">
          <Button
            variant="outline"
            className="w-50 flex items-center justify-center gap-2 py-3"
          >
            <ChevronLeft className="h-4 w-4" />
            Bài trước
          </Button>
          <Button className="w-50 bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-2 py-3">
            Bài tiếp theo
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
