import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function LearningProgress() {
  const courses = [
    {
      id: 1,
      name: "Basic Characters",
      progress: 80,
      totalLessons: 20,
      completedLessons: 16,
    },
    {
      id: 2,
      name: "Common Phrases",
      progress: 60,
      totalLessons: 15,
      completedLessons: 9,
    },
    {
      id: 3,
      name: "Grammar Basics",
      progress: 40,
      totalLessons: 25,
      completedLessons: 10,
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Current Progress</h2>
      
      <div className="grid gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{course.name}</h3>
              <span className="text-sm text-gray-600">
                {course.completedLessons}/{course.totalLessons} Lessons
              </span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-2">
              {course.progress}% Complete
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="font-semibold mb-4">Weekly Learning Goals</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Study Time</span>
              <span className="text-sm font-medium">4h 30m / 7h</span>
            </div>
            <Progress value={65} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Characters Learned</span>
              <span className="text-sm font-medium">45 / 50</span>
            </div>
            <Progress value={90} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  )
} 