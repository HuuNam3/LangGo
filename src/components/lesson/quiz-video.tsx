"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { HelpCircle, Send, Clock } from "lucide-react"

export default function QuizVideo() {
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [canSubmit, setCanSubmit] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(0)

  // Timer effect for 5-minute cooldown
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setCanSubmit(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timeRemaining])

  const handleSubmit = () => {
    setSubmitted(true)
    setCanSubmit(false)
    setTimeRemaining(300) // 5 minutes = 300 seconds

    // Here you would typically send the answers to a server
    console.log("Submitted answers:", answers)

    // Reset form for next attempt
    setTimeout(() => {
      setSubmitted(false)
      setAnswers({
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
      })
    }, 2000)
  }

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }))
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="px-2">
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
            <h2 className="text-xl font-bold">Lesson Questions</h2>
          </div>

          <div className="p-6">
            <div className="mb-6 rounded-lg bg-orange-50 border border-orange-200 p-4">
              <div className="flex items-start gap-3">
                <HelpCircle className="mt-0.5 h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">Lưu ý quan trọng</p>
                  <div className="text-gray-700 space-y-1">
                    <p>
                      • Phải trả lời đúng <strong>80% câu hỏi (4/5 câu)</strong> mới được qua bài
                    </p>
                    <p>
                      • Sau khi nộp bài, phải đợi <strong>5 phút</strong> mới được trả lời tiếp theo
                    </p>
                    <p>• Hãy suy nghĩ kỹ trước khi nộp bài</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            {!canSubmit && timeRemaining > 0 && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-800">Thời gian chờ</p>
                    <p className="text-red-700">
                      Bạn cần đợi <strong>{formatTime(timeRemaining)}</strong> nữa để có thể nộp bài tiếp theo
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-8">
              {/* Question 1 */}
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-4 text-lg font-semibold">1. How do you say &ldquo;Hello&rdquo; in Mandarin?</h3>
                <RadioGroup
                  value={answers.question1}
                  onValueChange={(value) => handleAnswerChange("question1", value)}
                  disabled={!canSubmit}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-1" id="option-1" />
                      <Label htmlFor="option-1">你好 (Nǐ hǎo)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-2" id="option-2" />
                      <Label htmlFor="option-2">早上好 (Zǎoshang hǎo)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-3" id="option-3" />
                      <Label htmlFor="option-3">晚上好 (Wǎnshang hǎo)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-4" id="option-4" />
                      <Label htmlFor="option-4">再见 (Zàijiàn)</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 2 */}
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-4 text-lg font-semibold">
                  2. When would you use &ldquo;早上好&rdquo; (Zǎoshang hǎo)?
                </h3>
                <RadioGroup
                  value={answers.question2}
                  onValueChange={(value) => handleAnswerChange("question2", value)}
                  disabled={!canSubmit}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-1" id="q2-option-1" />
                      <Label htmlFor="q2-option-1">In the morning</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-2" id="q2-option-2" />
                      <Label htmlFor="q2-option-2">In the afternoon</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-3" id="q2-option-3" />
                      <Label htmlFor="q2-option-3">In the evening</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-4" id="q2-option-4" />
                      <Label htmlFor="q2-option-4">At any time of day</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 3 */}
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-4 text-lg font-semibold">
                  3. What does &ldquo;你吃饭了吗?&rdquo; (Nǐ chīfàn le ma?) mean?
                </h3>
                <RadioGroup
                  value={answers.question3}
                  onValueChange={(value) => handleAnswerChange("question3", value)}
                  disabled={!canSubmit}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-1" id="q3-option-1" />
                      <Label htmlFor="q3-option-1">Have you eaten yet?</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-2" id="q3-option-2" />
                      <Label htmlFor="q3-option-2">What would you like to eat?</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-3" id="q3-option-3" />
                      <Label htmlFor="q3-option-3">Are you hungry?</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-4" id="q3-option-4" />
                      <Label htmlFor="q3-option-4">Would you like to have dinner with me?</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 4 */}
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-4 text-lg font-semibold">4. How do you say &ldquo;Goodbye&rdquo; in Mandarin?</h3>
                <RadioGroup
                  value={answers.question4}
                  onValueChange={(value) => handleAnswerChange("question4", value)}
                  disabled={!canSubmit}
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-1" id="q4-option-1" />
                      <Label htmlFor="q4-option-1">再见 (Zàijiàn)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-2" id="q4-option-2" />
                      <Label htmlFor="q4-option-2">你好 (Nǐ hǎo)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-3" id="q4-option-3" />
                      <Label htmlFor="q4-option-3">谢谢 (Xièxiè)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-4" id="q4-option-4" />
                      <Label htmlFor="q4-option-4">对不起 (Duìbùqǐ)</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Question 5 - Short answer */}
              <div className="rounded-lg border border-gray-200 p-5">
                <h3 className="mb-4 text-lg font-semibold">
                  5. Write a short dialogue in Mandarin using at least two greetings you learned in this lesson.
                </h3>
                <Textarea
                  placeholder="Type your answer here..."
                  className="mb-4 min-h-[120px]"
                  value={answers.question5}
                  onChange={(e) => handleAnswerChange("question5", e.target.value)}
                  disabled={!canSubmit}
                />
              </div>
            </div>

            {/* Submit Section */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || submitted}
                className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
                {submitted ? "Đã nộp bài!" : canSubmit ? "Nộp bài" : "Đang chờ..."}
              </Button>

              {submitted && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
                  <p className="text-green-800 font-medium">✅ Bài làm của bạn đã được nộp thành công!</p>
                  <p className="text-green-600 text-sm mt-1">Kết quả sẽ được thông báo sớm nhất.</p>
                </div>
              )}

              {!canSubmit && timeRemaining > 0 && (
                <div className="text-center text-sm text-gray-600">
                  <p>
                    ⏰ Thời gian chờ còn lại: <strong>{formatTime(timeRemaining)}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
