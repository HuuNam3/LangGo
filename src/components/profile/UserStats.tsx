import { Card } from "@/components/ui/card"
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  Star,
  Calendar,
  TrendingUp
} from "lucide-react"

export function UserStats() {
  const stats = [
    {
      icon: BookOpen,
      label: "Characters Learned",
      value: "520",
      change: "+23 this week",
    },
    {
      icon: Clock,
      label: "Study Hours",
      value: "156",
      change: "+4.5 this week",
    },
    {
      icon: Trophy,
      label: "Achievements",
      value: "24",
      change: "+2 this month",
    },
    {
      icon: Star,
      label: "Lesson Completion",
      value: "92%",
      change: "Average score",
    },
    {
      icon: Calendar,
      label: "Study Streak",
      value: "15 days",
      change: "Personal best: 30",
    },
    {
      icon: TrendingUp,
      label: "Vocabulary Size",
      value: "850",
      change: "+45 this month",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Learning Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-purple-100">
                <stat.icon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-600">{stat.label}</h3>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.change}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 