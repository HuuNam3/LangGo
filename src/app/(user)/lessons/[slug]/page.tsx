"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoLesson from "@/components/lesson/video-lesson"
import NavLeft from "@/components/lesson/nav-left";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useParams, useRouter, usePathname } from 'next/navigation'
import { getLessonIdBySlug } from "@/lib/queries"
import QuizVideo from "@/components/lesson/quiz-video";
import WritenLesson from "@/components/lesson/writen-lesson";
import QuizNonWriten from "@/components/lesson/quiz-non-writen";
import QuizWriten from "@/components/lesson/quiz-writen";

export default function LanguageLearningPlatform() {
  const params = useParams();
  const router = useRouter()
  const pathname = usePathname()
  const slug = typeof params.slug === "string" ? params.slug : "";
  const searchParams = useSearchParams();
  const [id, setId] = useState(searchParams.get("id"))
  const [lessonId, setLessonId] = useState<string>("")

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    const handle = async () => {
      const lessonid = await getLessonIdBySlug(slug)
      setLessonId(lessonid)
      setId(lessonid)
      if (!id) {
        router.push(pathname + '?' + createQueryString('id', lessonid) + "&" + createQueryString('type', 'video'))
      }
    };
    handle();
  }, [slug, pathname, router, createQueryString, id, searchParams]);

  const renderType = () => {
    const type = searchParams.get("type")
    if (type == "video") {
      return (<VideoLesson lessonId={lessonId} />)
    } else if (type == "quizVideo") {
      return (<QuizVideo />)
    } else if (type == "writen") {
      return (<WritenLesson />)
    } else if (type == "quizWriten") {
      return (<QuizWriten />)
    } else if (type == "quizNonWriten") {
      return (<QuizNonWriten />)
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-2">
        {renderType()}
      </div>

      {/* Course Sidebar Component */}
      <div className="pt-2">
        <NavLeft slug={slug} id={id || ""} pathName={pathname}
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
