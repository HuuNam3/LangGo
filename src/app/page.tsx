"use client"
import { Header } from "@/components/common/Header"
import { Footer } from "@/components/common/Footer"
import { HomeBanner } from "@/components/common/HomeBanner"
import { CoursesSection } from "@/components/common/CoursesSection"
import { useEffect, useState } from "react"
import Loading from "@/components/common/LoadingPage"
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
              coursesCategory.map((course) => (
                <CoursesSection
                  key={course._id}
                  title={course.title}
                  course={course.courses}
                  description={course.description}
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