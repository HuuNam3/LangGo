"use cliend"
import { Footer } from "@/components/common/Footer"
import { Header } from "@/components/common/Header"
import { HomeBanner } from "@/components/common/HomeBanner"
import { LessonSection } from "@/components/common/LessonSection"

// Sample data for lessons
const beginnerLessons = [
  {
    id: "1",
    title: "Basic Mandarin Pronunciation",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Li Wei",
    duration: "45 min",
    level: "Beginner",
  },
  {
    id: "2",
    title: "Essential Chinese Characters",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Zhang Min",
    duration: "60 min",
    level: "Beginner",
  },
  {
    id: "3",
    title: "Daily Greetings & Phrases",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Chen Jie",
    duration: "30 min",
    level: "Beginner",
  },
  {
    id: "4",
    title: "Numbers & Counting in Mandarin",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Wang Mei",
    duration: "40 min",
    level: "Beginner",
  },
]

const testTakerLessons = [
  {
    id: "5",
    title: "HSK Level 3 Vocabulary",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Dr. Liu Yang",
    duration: "90 min",
    level: "Intermediate",
  },
  {
    id: "6",
    title: "HSK Exam Strategies",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Prof. Wu Hao",
    duration: "75 min",
    level: "Intermediate",
  },
  {
    id: "7",
    title: "Grammar for HSK Level 4",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Zhao Ling",
    duration: "60 min",
    level: "Intermediate",
  },
  {
    id: "8",
    title: "Practice Test: HSK Level 2",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Sun Jing",
    duration: "120 min",
    level: "Intermediate",
  },
]

const communicationLessons = [
  {
    id: "9",
    title: "Business Mandarin Essentials",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Lin Feng",
    duration: "55 min",
    level: "Practical",
  },
  {
    id: "10",
    title: "Travel Conversations",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Huang Xiao",
    duration: "45 min",
    level: "Practical",
  },
  {
    id: "11",
    title: "Restaurant & Food Ordering",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Tang Wei",
    duration: "35 min",
    level: "Practical",
  },
  {
    id: "12",
    title: "Making Friends in Chinese",
    image: "/placeholder.svg?height=200&width=300",
    instructor: "Gao Min",
    duration: "50 min",
    level: "Practical",
  },
]

export default function Home() {
  // Example props for demonstration
  const isLoggedIn = true
  const username = "Nam"
  const avatarUrl = "/placeholder.svg?height=40&width=40"
  const notificationCount = 5

  return (
    <div className="flex flex-col">
      <Header isLoggedIn={isLoggedIn} username={username} avatarUrl={avatarUrl} notificationCount={notificationCount} />

      <main className="flex-1 mt-1 flex item-center justify-center flex-col">
        <div className="flex w-full justify-center">
          <HomeBanner />
        </div>
        <div className="flex w-full justify-center">
          <div className="container py-12 space-y-16">
            <LessonSection
              title="For Beginners"
              description="Start your Mandarin journey with these foundational lessons"
              lessons={beginnerLessons}
              accentColor="from-pink-500 to-orange-500"
            />

            <LessonSection
              title="For Test Takers"
              description="Prepare for HSK and other Mandarin proficiency exams"
              lessons={testTakerLessons}
              accentColor="from-violet-500 to-fuchsia-500"
            />

            <LessonSection
              title="For Communication"
              description="Practical Mandarin for real-world situations"
              lessons={communicationLessons}
              accentColor="from-blue-500 to-cyan-500"
            />
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  )
}
