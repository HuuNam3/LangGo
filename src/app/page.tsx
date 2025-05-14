"use client"
import { Header } from "@/components/common/Header"
import { HomeBanner } from "@/components/common/HomeBanner"
import { LessonSection } from "@/components/common/LessonSection"
import { Footer } from "@/components/common/Footer"
import { useLanguage } from "@/lib/i18n/LanguageContext"
import { beginnerLessons, testTakerLessons, communicationLessons } from "@/lib/data/lessons"

export default function Home() {
  const { t } = useLanguage()
  return (
    <>
      <Header/>
      <div className="flex flex-col">
        <div className="flex w-full justify-center">
          <HomeBanner />
        </div>
        <div className="flex w-full justify-center">
          <div className="container py-12 space-y-16">
            <LessonSection
              title={t.home.sections.beginners.title}
              description={t.home.sections.beginners.description}
              lessons={beginnerLessons}
              accentColor="from-pink-500 to-orange-500"
            />

            <LessonSection
              title={t.home.sections.testTakers.title}
              description={t.home.sections.testTakers.description}
              lessons={testTakerLessons}
              accentColor="from-violet-500 to-fuchsia-500"
            />

            <LessonSection
              title={t.home.sections.communication.title}
              description={t.home.sections.communication.description}
              lessons={communicationLessons}
              accentColor="from-blue-500 to-cyan-500"
            />
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
} 