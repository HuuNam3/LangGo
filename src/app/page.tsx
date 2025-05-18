"use client"
import { Header } from "@/components/common/Header"
import { HomeBanner } from "@/components/common/HomeBanner"
import { LessonSection } from "@/components/common/LessonSection"
import { Footer } from "@/components/common/Footer"
import { useEffect, useState } from "react"

interface ILesson {
  _id: string;
  lesson_list: string;
  duration: string;
  image: string;
  instructor: string;
  level: string;
  title: string;
}

interface ILessonList {
  _id: string;
  title: string;
  description: string;
  category: string;
  lessons: ILesson[];
}

export default function Home() {
  const [lessonLists, setLessonLists] = useState<ILessonList[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        console.log('Fetching lessons...')
        const response = await fetch('/api/lesson_list')
        console.log('Response status:', response.status)
        const data = await response.json()
        console.log('Fetched data:', data)
        setLessonLists(data)
      } catch (error) {
        console.error('Failed to fetch lessons:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLessons()
  }, [])

  if (isLoading) {
    return (
      <>
        <Header/>
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header/>
      <div className="flex flex-col">
        <div className="flex w-full justify-center">
          <HomeBanner />
        </div>
        <div className="flex w-full justify-center">
          <div className="container py-12 space-y-16">
            {lessonLists.map((list) => (
              <LessonSection
                key={list._id}
                title={list.title}
                description={list.description}
                lessons={list.lessons}
                accentColor={
                  list.category === "beginner" 
                    ? "from-pink-500 to-orange-500"
                    : list.category === "test taker"
                    ? "from-violet-500 to-fuchsia-500" 
                    : "from-blue-500 to-cyan-500"
                }
              />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
} 