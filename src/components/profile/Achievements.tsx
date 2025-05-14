import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function Achievements() {
  const achievements = [
    {
      id: 1,
      name: "Fast Learner",
      description: "Complete 10 lessons in a single day",
      date: "2024-01-15",
      icon: "🚀",
      type: "speed",
    },
    {
      id: 2,
      name: "Character Master",
      description: "Learn 100 Chinese characters",
      date: "2024-01-20",
      icon: "📚",
      type: "milestone",
    },
    {
      id: 3,
      name: "Perfect Streak",
      description: "Maintain a 7-day study streak",
      date: "2024-01-25",
      icon: "🔥",
      type: "consistency",
    },
    {
      id: 4,
      name: "Conversation Pro",
      description: "Complete all basic conversation lessons",
      date: "2024-02-01",
      icon: "💬",
      type: "completion",
    },
    {
      id: 5,
      name: "Quiz Champion",
      description: "Score 100% in 5 different quizzes",
      date: "2024-02-05",
      icon: "🏆",
      type: "excellence",
    },
  ]

  const getBadgeColor = (type: string) => {
    const colors = {
      speed: "bg-blue-100 text-blue-800",
      milestone: "bg-purple-100 text-purple-800",
      consistency: "bg-orange-100 text-orange-800",
      completion: "bg-green-100 text-green-800",
      excellence: "bg-yellow-100 text-yellow-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Achievements</h2>
        <Badge variant="outline" className="font-medium">
          24 Total
        </Badge>
      </div>

      <div className="grid gap-4">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="p-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{achievement.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{achievement.name}</h3>
                  <Badge className={getBadgeColor(achievement.type)}>
                    {achievement.type}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Achieved on {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 