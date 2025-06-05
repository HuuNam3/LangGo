"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IUserInformation } from "@/types/database";
import {
  Calendar,
  Edit,
  Clock,
  BookOpen,
  Trophy,
  GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { countCourses, countLessonCompleted } from "@/lib/queries";
dayjs.extend(customParseFormat);

export function Profile() {
  const [profileData, setProfileData] = useState<IUserInformation>();
  const [coursesEnrolled, setcoursesEnrolled] = useState(0);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const res = await fetch(`/api/profile`);
        const data = await res.json();
        const result = await countCourses();
        const query1 = await countLessonCompleted();

        setcoursesEnrolled(result);
        setLessonsCompleted(query1)
        setProfileData(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch lesson:", err);
      }
    };
    fetchLesson();
  }, []);

  const recentActivity = [
    {
      type: "lesson",
      content: "Completed 'Food & Drinks' in Spanish",
      time: "2 hours ago",
    },
    {
      type: "course",
      content: "Started 'Chào hỏi cơ bản' course",
      time: "1 day ago",
    },
    {
      type: "lesson",
      content: "Completed 'Basic Greetings' in French",
      time: "2 days ago",
    },
    {
      type: "lesson",
      content: "Completed 'Numbers' in Spanish",
      time: "3 days ago",
    },
  ];

  const getDaysAttended = (): number => {
    if (profileData) {
      const joinedDate = dayjs(
        new Date(profileData.joined).toLocaleDateString(),
        "D/M/YYYY"
      );
      const today = dayjs().startOf("day");
      return today.diff(joinedDate, "day");
    }
    return 0;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full space-y-6">
        {/* Header */}
        {!profileData ? (
          <span>loading ...</span>
        ) : (
          <>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData.avatarUrl} alt="Profile" />
                    <AvatarFallback className="text-2xl">
                      {profileData.name}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold">{profileData.name}</h1>
                    </div>
                    <p className="text-muted-foreground">{profileData.bio}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(profileData.joined).toLocaleDateString()}
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">
                    {getDaysAttended()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Days Attended
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {lessonsCompleted}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Lessons Completed
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{coursesEnrolled}</div>
                  <div className="text-sm text-muted-foreground">
                    Courses Enrolled
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card className="py-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your learning journey (đây là dữ liệu mẫu)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-lg border"
                  >
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
          </>
        )}
      </div>
    </div>
  );
}
