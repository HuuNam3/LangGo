"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Volume2, Camera, Upload, FileText, PenTool, Send } from "lucide-react"
import Image from "next/image"

interface UploadedFile {
  id: string
  file: File
  preview: string
}

export default function QuizWriten() {
  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: UploadedFile }>({})
  const [submitted, setSubmitted] = useState(false)

  const handleFileUpload = (characterId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const preview = URL.createObjectURL(file)
      setUploadedFiles((prev) => ({
        ...prev,
        [characterId]: {
          id: Date.now().toString(),
          file,
          preview,
        },
      }))
    }
  }

  const removeFile = (characterId: string) => {
    setUploadedFiles((prev) => {
      const newFiles = { ...prev }
      if (newFiles[characterId]) {
        URL.revokeObjectURL(newFiles[characterId].preview)
        delete newFiles[characterId]
      }
      return newFiles
    })
  }

  const handleSubmitAll = () => {
    setSubmitted(true)
    // Here you would typically send the files to a server
    console.log("Submitted files:", uploadedFiles)
  }

  const characters = [
    {
      id: "ni",
      character: "你",
      pinyin: "nǐ",
      meaning: "you",
    },
    {
      id: "hao",
      character: "好",
      pinyin: "hǎo",
      meaning: "good",
    },
    {
      id: "zai",
      character: "再",
      pinyin: "zài",
      meaning: "again",
    },
    {
      id: "jian",
      character: "见",
      pinyin: "jiàn",
      meaning: "see",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
            <h2 className="text-xl font-bold">Character Writing Practice</h2>
          </div>

          <div className="p-6">
            <div className="mb-6 rounded-lg bg-purple-50 p-4">
              <div className="flex items-start gap-3">
                <PenTool className="mt-0.5 h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium text-purple-800">Luyện tập viết chữ Hán</p>
                  <div className="text-gray-700 space-y-1">
                    <p>• Viết từng ký tự trên giấy theo đúng nét vẽ</p>
                    <p>• Chụp ảnh hoặc tải lên hình ảnh chữ viết của bạn</p>
                    <p>• Luyện tập nhiều lần để ghi nhớ cách viết</p>
                    <p>• Chú ý thứ tự nét vẽ và tỷ lệ của từng ký tự</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {characters.map((char) => (
                <div key={char.id} className="rounded-lg border border-gray-200 p-5">
                  <div className="mb-4 flex flex-wrap items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-4xl font-bold">
                      {char.character}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">
                        {char.character} ({char.pinyin})
                      </h3>
                      <p className="text-gray-600">Nghĩa: {char.meaning}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <Volume2 className="h-3 w-3" />
                          Nghe phát âm
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                          <FileText className="h-3 w-3" />
                          Thứ tự nét vẽ
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div className="mb-4">
                    {uploadedFiles[char.id] ? (
                      <div className="rounded-lg border border-gray-200 p-4">
                        <div className="flex items-start gap-4">
                          <Image
                            src={uploadedFiles[char.id].preview || "/placeholder.svg"}
                            alt={`Uploaded ${char.character}`}
                            className="h-32 w-32 rounded-lg object-cover border"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-green-700 mb-2">✅ Đã tải lên thành công!</h4>
                            <p className="text-sm text-gray-600 mb-3">Tên file: {uploadedFiles[char.id].file.name}</p>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeFile(char.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Xóa ảnh
                              </Button>
                              <label htmlFor={`file-${char.id}`}>
                                <Button variant="outline" size="sm" className="cursor-pointer">
                                  Thay đổi ảnh
                                </Button>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                        <div className="flex flex-col items-center justify-center text-center">
                          <Camera className="mb-2 h-8 w-8 text-gray-400" />
                          <h4 className="mb-1 text-sm font-medium">Tải lên chữ viết của bạn</h4>
                          <p className="mb-4 text-xs text-gray-500">
                            Chụp ảnh chữ viết tay hoặc tải lên từ thiết bị của bạn
                          </p>
                          <label htmlFor={`file-${char.id}`}>
                            <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
                              <Upload className="h-4 w-4" />
                              Tải lên ảnh
                            </Button>
                          </label>
                        </div>
                      </div>
                    )}

                    <input
                      id={`file-${char.id}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(char.id, e)}
                      className="hidden"
                    />
                  </div>

                  {/* Practice Tips */}
                  <div className="rounded-md bg-blue-50 p-3 text-sm">
                    <p className="font-medium text-blue-800 mb-1">💡 Mẹo luyện tập:</p>
                    <p className="text-blue-700">
                      Viết ký tự &quot;{char.character}&quot; nhiều lần trên giấy, chú ý đến tỷ lệ và thứ tự nét vẽ. Hãy viết chậm
                      và cẩn thận để tạo thành thói quen tốt.
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Section */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="text-center text-sm text-gray-600 mb-2">
                <p>
                  Đã tải lên:{" "}
                  <strong>
                    {Object.keys(uploadedFiles).length}/{characters.length}
                  </strong>{" "}
                  ký tự
                </p>
              </div>

              <Button
                onClick={handleSubmitAll}
                disabled={submitted || Object.keys(uploadedFiles).length === 0}
                className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {submitted ? "Đã nộp bài!" : "Nộp tất cả bài viết"}
              </Button>

              {submitted && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
                  <p className="text-green-800 font-medium">✅ Bài viết của bạn đã được nộp thành công!</p>
                  <p className="text-green-600 text-sm mt-1">
                    Giáo viên sẽ chấm và phản hồi về chữ viết của bạn sớm nhất.
                  </p>
                </div>
              )}

              {Object.keys(uploadedFiles).length === 0 && (
                <div className="text-center text-sm text-gray-500">
                  <p>Vui lòng tải lên ít nhất một ký tự để có thể nộp bài</p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
