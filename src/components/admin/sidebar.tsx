"use client"

import type React from "react"

import { Database, Users, BookOpen, Settings, LogOut, GraduationCap, FileText, Video, Info } from "lucide-react"
import type { SidebarProps } from "@/types/database"

const collectionIcons: Record<string, React.ReactNode> = {
  course_categories: <Database className="w-5 h-5" />,
  course_introduction: <Database className="w-5 h-5" />,
  courses: <GraduationCap className="w-5 h-5" />,
  user_courses: <GraduationCap className="w-5 h-5" />,
  lessons: <BookOpen className="w-5 h-5" />,
  user_accounts: <Users className="w-5 h-5" />,
  user_information: <Info className="w-5 h-5" />,
  lesson_contents: <FileText className="w-5 h-5" />,
  video_contents: <Video className="w-5 h-5" />,
}

export function Sidebar({ collections, activeCollection, onCollectionChange }: SidebarProps) {
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold">LangGo Admin</h2>
        <p className="text-slate-400 text-sm mt-1">Quản lý hệ thống</p>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {collections.map((collection) => (
            <button
              key={collection.name}
              onClick={() => onCollectionChange(collection.name)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeCollection === collection.name
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {collectionIcons[collection.name] || <Database className="w-5 h-5" />}
              <span className="text-sm font-medium">{collection.displayName}</span>
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Cài đặt</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors mt-2">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Đăng xuất</span>
        </button>
      </div>
    </div>
  )
}
