"use client"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { HomeBanner } from "@/components/common/HomeBanner"
import { LessonSection } from "@/components/common/LessonSection"
import { useEffect, useState } from "react"
import Loading from "@/components/common/Loading"
import { ICourseCatygory } from "@/types/database"

export default function Home() {
  const [coursesCategory, setCoursesCategory] = useState<ICourseCatygory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/course_categories')
        const data = await response.json()
        setCoursesCategory(data)
        console.log(data)
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
              coursesCategory.map((course, index) => (
                <LessonSection
                  key={course._id}
                  title={course.title}
                  course={course.courses}
                  description={course.description}
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