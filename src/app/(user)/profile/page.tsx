"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserStats } from "@/components/profile/UserStats"
import { LearningProgress } from "@/components/profile/LearningProgress"
import { Achievements } from "@/components/profile/Achievements"
import { UserSettings } from "@/components/profile/UserSettings"
import Image from "next/image"

export default function ProfilePage() {
  return (
    <div className="container py-8">
      {/* Profile Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-600">
          <Image
            src="/placeholder-avatar.jpg"
            alt="Profile"
            width={96}
            height={96}
            className="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">John Doe</h1>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
              Intermediate Level
            </span>
          </div>
          <p className="text-gray-600 mt-1">Learning Mandarin since January 2024</p>
          <div className="flex gap-3 mt-4">
            <Button>Edit Profile</Button>
            <Button variant="outline">Share Profile</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="progress" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          <LearningProgress />
        </TabsContent>

        <TabsContent value="stats">
          <UserStats />
        </TabsContent>

        <TabsContent value="achievements">
          <Achievements />
        </TabsContent>

        <TabsContent value="settings">
          <UserSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
} 