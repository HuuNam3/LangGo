"use client"

import { useState } from "react"
import { Play, Pause, Volume2, Maximize, StickyNote, Plus, Subtitles, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface VideoPlayerProps {
  title?: string
  subtitle?: string
  duration?: string
  videoUrl?: string
}

interface Note {
  id: string
  timestamp: string
  content: string
  createdAt: Date
}

export default function VideoPlayer({
  title = "Bài 1: Chào hỏi hàng ngày",
  subtitle = "Học cách chào hỏi trong các tình huống thường ngày",
  duration = "6:30",
  videoUrl = "/placeholder.svg?height=300&width=600",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [newNote, setNewNote] = useState("")
  const [activeTab, setActiveTab] = useState("transcript")

  // Sample notes data - in real app this would come from a database or state management
  const [savedNotes, setSavedNotes] = useState<Note[]>([
    {
      id: "1",
      timestamp: "1:30",
      content: "Cách chào buổi sáng rất quan trọng trong giao tiếp hàng ngày. Cần nhớ sử dụng đúng ngữ cảnh.",
      createdAt: new Date("2024-01-15T10:30:00"),
    },
    {
      id: "2",
      timestamp: "3:45",
      content: 'Lưu ý về cách phát âm "Xin chào" - cần nhấn mạnh vào từ "chào"',
      createdAt: new Date("2024-01-15T10:35:00"),
    },
  ])

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        timestamp: "2:15", // Current video time
        content: newNote.trim(),
        createdAt: new Date(),
      }
      setSavedNotes([...savedNotes, note])
      setNewNote("")
    }
  }

  const deleteNote = (noteId: string) => {
    setSavedNotes(savedNotes.filter((note) => note.id !== noteId))
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <div className="relative aspect-video bg-black">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image src={videoUrl || "/placeholder.svg"} alt="Video thumbnail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="rounded-full w-16 h-16 bg-purple-600/80 hover:bg-purple-600 text-white"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Subtitles Display */}
          {showSubtitles && (
            <div className="absolute inset-x-0 bottom-0 text-center">
              <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm max-w-2xl mx-auto">
                Xin chào! Hôm nay chúng ta sẽ học về các cách chào hỏi cơ bản.
              </div>
            </div>
          )}

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex flex-col gap-2">
              <div className="w-full bg-white/30 rounded-full h-1">
                <div className="bg-white h-1 rounded-full w-1/4"></div>
              </div>
              <div className="flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" className="text-white h-8 w-8 p-1">
                    <Play className="h-4 w-4" />
                  </Button>
                  <span>2:15 / {duration}</span>
                  <Button variant="ghost" size="icon" className="text-white h-8 w-8 p-1">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`text-white h-8 w-8 p-1 ${showSubtitles ? "bg-white/20" : ""}`}
                    onClick={() => setShowSubtitles(!showSubtitles)}
                  >
                    <Subtitles className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white h-8 w-8 p-1">
                    <Maximize className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Info Card */}
      <Card className="p-4">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-gray-800 mb-2">{title}</CardTitle>
              <p className="text-gray-600 mb-2">{subtitle}</p>
              <p className="text-sm text-gray-500">Thời lượng: {duration}</p>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={addNote}>
              <Plus className="h-4 w-4" />
              Thêm ghi chú tại 2:15
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs for Transcript and Notes */}
      <div className="bg-white rounded-lg border">
        <div className="border-b">
          <div className="flex">
            <button
              onClick={() => setActiveTab("transcript")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "transcript"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Nội dung bài học
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "notes"
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              <StickyNote className="h-4 w-4" />
              Ghi chú của tôi
              {savedNotes.length > 0 && (
                <span className="bg-purple-100 text-purple-600 text-xs px-2 py-0.5 rounded-full">
                  {savedNotes.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "transcript" && (
            <div className="space-y-4">
              <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-purple-600 font-medium text-sm min-w-[40px]">0:00</span>
                <p className="text-sm text-gray-700">Giới thiệu về các cách chào hỏi cơ bản trong tiếng Việt</p>
              </div>
              <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-purple-600 font-medium text-sm min-w-[40px]">0:45</span>
                <p className="text-sm text-gray-700">Cách nói &quot;Xin chào&quot; - lời chào phổ biến nhất</p>
              </div>
              <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-purple-600 font-medium text-sm min-w-[40px]">1:30</span>
                <p className="text-sm text-gray-700">
                  Chào buổi sáng: &quot;Chào buổi sáng&quot; hoặc &quot;Sáng tốt lành&quot;
                </p>
              </div>
              <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-purple-600 font-medium text-sm min-w-[40px]">2:45</span>
                <p className="text-sm text-gray-700">
                  Chào buổi chiều: &quot;Chào buổi chiều&quot; và &quot;Chiều tốt lành&quot;
                </p>
              </div>
              <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-purple-600 font-medium text-sm min-w-[40px]">4:00</span>
                <p className="text-sm text-gray-700">
                  Chào buổi tối: &quot;Chào buổi tối&quot; và &quot;Tối tốt lành&quot;
                </p>
              </div>
              <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <span className="text-purple-600 font-medium text-sm min-w-[40px]">5:15</span>
                <p className="text-sm text-gray-700">Thực hành và ví dụ trong các tình huống thực tế</p>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-6">
              {/* Add New Note Section */}
              <div className="border-b pb-4">
                <h4 className="font-medium text-gray-800 mb-3">Thêm ghi chú mới</h4>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Nhập ghi chú của bạn về bài học này..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{newNote.length > 0 && `${newNote.length} ký tự`}</span>
                    <Button
                      onClick={addNote}
                      disabled={!newNote.trim()}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Lưu ghi chú
                    </Button>
                  </div>
                </div>
              </div>

              {/* Saved Notes Section */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Ghi chú đã lưu</h4>
                {savedNotes.length > 0 ? (
                  <div className="space-y-4">
                    {savedNotes.map((note) => (
                      <div key={note.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 text-sm text-purple-600">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">{note.timestamp}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNote(note.id)}
                            className="text-gray-400 hover:text-red-500 h-6 w-6 p-0"
                          >
                            ×
                          </Button>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{note.content}</p>
                        <div className="text-xs text-gray-500">
                          {note.createdAt.toLocaleDateString("vi-VN")} lúc{" "}
                          {note.createdAt.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <StickyNote className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Chưa có ghi chú nào</p>
                    <p className="text-xs mt-1">
                      Thêm ghi chú đầu tiên của bạn bằng cách nhấn nút &quot;Thêm ghi chú&quot; ở trên
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
