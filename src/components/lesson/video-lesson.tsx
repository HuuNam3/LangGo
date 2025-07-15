"use client";

import { useEffect, useState } from "react";
import {
  StickyNote,
  Plus,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ILessonVideos } from "@/types/database";
import Loading from "../common/loading";
import YouTubePlayer from "../common/YoutubePlayer";

interface VideoPlayerProps {
  lessonId: string
}

interface Note {
  id: string;
  timestamp: string;
  content: string;
  createdAt: Date;
}

export default function VideoPlayer({
  lessonId,
}: VideoPlayerProps) {
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [showSubtitles, setShowSubtitles] = useState(true);
  const [newNote, setNewNote] = useState("");
  const [activeTab, setActiveTab] = useState("transcript");
  const [videoData, setVideoData] = useState<ILessonVideos>()
  const [currentTime, setCurrentTime] = useState(0)
  useEffect(() => {
    const handle = async () => {
      const res = await fetch(`/api/lesson_videos?id=${lessonId}`);
      const data = await res.json();
      setVideoData(data)
      console.log(data)
    }
    handle();
  }, [lessonId]);



  // Sample notes data - in real app this would come from a database or state management
  const [savedNotes, setSavedNotes] = useState<Note[]>([
    {
      id: "1",
      timestamp: "1:30",
      content:
        "Cách chào buổi sáng rất quan trọng trong giao tiếp hàng ngày. Cần nhớ sử dụng đúng ngữ cảnh.",
      createdAt: new Date("2024-01-15T10:30:00"),
    },
    {
      id: "2",
      timestamp: "3:45",
      content: 'Lưu ý về cách phát âm "Xin chào" - cần nhấn mạnh vào từ "chào"',
      createdAt: new Date("2024-01-15T10:35:00"),
    },
  ]);

  const formatTimeWithHours = (totalSeconds: string): string => {
    const hours = Math.floor(Number(totalSeconds) / 3600);
    const minutes = Math.floor((Number(totalSeconds) % 3600) / 60);
    const seconds = Math.floor(Number(totalSeconds) % 60);

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${paddedMinutes}:${paddedSeconds}`;
  }

  const addNote = () => {
    if (newNote.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        timestamp: formatTimeWithHours(currentTime.toFixed(0)), // Current video time
        content: newNote.trim(),
        createdAt: new Date(),
      };
      setSavedNotes([...savedNotes, note]);
      setNewNote("");
    }
  };

  const deleteNote = (noteId: string) => {
    setSavedNotes(savedNotes.filter((note) => note.id !== noteId));
  };

  if (!videoData) {
    return <Loading />
  }

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <YouTubePlayer videoId="EZaxhT8JruU" setTime={setCurrentTime} />

      {/* Video Info Card */}
      <Card className="p-4">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                Video bài giảng: {videoData.title}
              </CardTitle>
              <p className="text-gray-600 mb-2">
                {videoData.subtitle}
              </p>
              <p className="text-sm text-gray-500">Thời lượng: {videoData.durations}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
              onClick={addNote}
            >
              <Plus className="h-4 w-4" />
              Thêm ghi chú tại {formatTimeWithHours(currentTime.toFixed(0))}
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
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "transcript"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              Nội dung bài học
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === "notes"
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
                <span className="text-purple-600 font-medium text-sm min-w-[40px]">
                  0:00
                </span>
                <p className="text-sm text-gray-700">
                  Giới thiệu về các cách chào hỏi cơ bản trong tiếng Việt
                </p>
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-6">
              {/* Add New Note Section */}
              <div className="border-b pb-4">
                <h4 className="font-medium text-gray-800 mb-3">
                  Thêm ghi chú mới
                </h4>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Nhập ghi chú của bạn về bài học này..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">
                      {newNote.length > 0 && `${newNote.length} ký tự`}
                    </span>
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
                <h4 className="font-medium text-gray-800 mb-3">
                  Ghi chú đã lưu
                </h4>
                {savedNotes.length > 0 ? (
                  <div className="space-y-4">
                    {savedNotes.map((note) => (
                      <div
                        key={note.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 text-sm text-purple-600">
                            <Clock className="h-4 w-4" />
                            <span className="font-medium">
                              {note.timestamp}
                            </span>
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
                        <p className="text-sm text-gray-700 mb-2">
                          {note.content}
                        </p>
                        <div className="text-xs text-gray-500">
                          {note.createdAt.toLocaleDateString("vi-VN")} lúc{" "}
                          {note.createdAt.toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <StickyNote className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">Chưa có ghi chú nào</p>
                    <p className="text-xs mt-1">
                      Thêm ghi chú đầu tiên của bạn bằng cách nhấn nút
                      &quot;Thêm ghi chú&quot; ở trên
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
