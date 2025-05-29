"use client"
import { Header } from "@/components/common/Header"
import { HomeBanner } from "@/components/common/HomeBanner"
import { LessonSection } from "@/components/common/LessonSection"
import { Footer } from "@/components/common/Footer"
import { useEffect, useState } from "react"
import Loading from "@/components/common/Loading"
import { ICourse } from "@/types/lessons"

export default function Home() {
  const [courses, setCourses] = useState<ICourse[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses')
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  return (
    <>
      <Header/>
      <div className="flex flex-col">
        <div className="flex w-full justify-center">
          <HomeBanner />
        </div>
        <div className="flex w-full justify-center">
          <div className="container py-12 space-y-16">
            {isLoading ? (
              <Loading/>
            ) : (
              courses.map((course, index) => (
                <LessonSection
                  key={course._id}
                  title={course.title}
                  description={course.description}
                  lessons={course.lessons}
                  accentColor={
                    index === 0 ? "from-pink-500 to-orange-500" :
                    index === 1 ? "from-violet-500 to-fuchsia-500" :
                    "from-blue-500 to-cyan-500"
                  }
                />
              ))
            )} 
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
} 