"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Edit, Globe, Clock, BookOpen, Trophy, Plus, User, PlayCircle, GraduationCap } from "lucide-react"

export default function ProfilePage() {
  const languages = [
    { name: "Spanish", flag: "🇪🇸", level: "Intermediate", progress: 65 },
    { name: "French", flag: "🇫🇷", level: "Beginner", progress: 25 },
    { name: "Japanese", flag: "🇯🇵", level: "Beginner", progress: 15 },
  ]

  const courses = [
    {
      id: 1,
      title: "Chào hỏi cơ bản",
      instructor: "Nam",
      duration: "15 minutes",
      level: "Beginner",
      image: "/images/english-book.png",
      language: "Vietnamese",
      lessons: 12,
      completed: 8,
    },
    {
      id: 2,
      title: "Basic Conversations",
      instructor: "Maria",
      duration: "20 minutes",
      level: "Intermediate",
      image: "/placeholder.svg?height=200&width=150",
      language: "Spanish",
      lessons: 15,
      completed: 10,
    },
    {
      id: 3,
      title: "French Grammar Basics",
      instructor: "Pierre",
      duration: "25 minutes",
      level: "Beginner",
      image: "/placeholder.svg?height=200&width=150",
      language: "French",
      lessons: 10,
      completed: 3,
    },
  ]

  const recentActivity = [
    { type: "lesson", content: "Completed 'Food & Drinks' in Spanish", time: "2 hours ago" },
    { type: "course", content: "Started 'Chào hỏi cơ bản' course", time: "1 day ago" },
    { type: "lesson", content: "Completed 'Basic Greetings' in French", time: "2 days ago" },
    { type: "lesson", content: "Completed 'Numbers' in Spanish", time: "3 days ago" },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-pink-500 text-white"
      case "Intermediate":
        return "bg-orange-500 text-white"
      case "Advanced":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                <AvatarFallback className="text-2xl">AJ</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">Alex Johnson</h1>
                </div>
                <p className="text-muted-foreground">Learning languages to explore the world 🌍</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Joined March 2024
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />3 languages
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-600">89</div>
              <div className="text-sm text-muted-foreground">Days Attended</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">47</div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">3</div>
              <div className="text-sm text-muted-foreground">Courses Enrolled</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress">Learning Progress</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4">
            <div className="grid gap-4">
              {languages.map((language, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{language.name}</h3>
                          <p className="text-sm text-muted-foreground">{language.level}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">{language.progress}% complete</div>
                      </div>
                    </div>
                    <Progress value={language.progress} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Course</DialogTitle>
                    <DialogDescription>Create a custom course with your own lessons and content.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Course Title</Label>
                      <Input id="title" placeholder="Enter course title" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="language">Language</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                          <SelectItem value="vietnamese">Vietnamese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="level">Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Course description" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button>Create Course</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[3/4] relative">
                    <Image
                      src={course.image || "/placeholder.svg"}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg line-clamp-2">{course.title}</h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>Instructor: {course.instructor}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Duration: {course.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge className={getLevelColor(course.level)}>Level: {course.level}</Badge>
                      <div className="text-sm text-muted-foreground">
                        {course.completed}/{course.lessons} lessons
                      </div>
                    </div>

                    <Progress value={(course.completed / course.lessons) * 100} className="h-2" />

                    <Button className="w-full" variant="outline">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning journey over the past week</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                    <div
                      className={`p-2 rounded-full ${
                        activity.type === "course"
                          ? "bg-purple-100 text-purple-600"
                          : activity.type === "lesson"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {activity.type === "course" ? (
                        <GraduationCap className="h-4 w-4" />
                      ) : activity.type === "lesson" ? (
                        <BookOpen className="h-4 w-4" />
                      ) : (
                        <Trophy className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.content}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
