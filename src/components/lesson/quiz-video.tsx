"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { HelpCircle, Send, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react"

// Questions data structure
const QUESTIONS = [
  {
    id: "question1",
    question: 'Làm thế nào để nói "Xin chào" trong tiếng Anh?',
    type: "multiple-choice",
    options: [
      { value: "option-1", label: "Hello" },
      { value: "option-2", label: "Goodbye" },
      { value: "option-3", label: "Thank you" },
      { value: "option-4", label: "Sorry" },
    ],
    correctAnswer: "option-1",
  },
  {
    id: "question2",
    question: 'Khi nào bạn sử dụng "Good morning"?',
    type: "multiple-choice",
    options: [
      { value: "option-1", label: "Vào buổi sáng" },
      { value: "option-2", label: "Vào buổi chiều" },
      { value: "option-3", label: "Vào buổi tối" },
      { value: "option-4", label: "Bất kỳ lúc nào trong ngày" },
    ],
    correctAnswer: "option-1",
  },
  {
    id: "question3",
    question: 'Câu nào sau đây là lời chào buổi tối trong tiếng Anh?',
    type: "multiple-choice",
    options: [
      { value: "option-1", label: "Good night" },
      { value: "option-2", label: "Good afternoon" },
      { value: "option-3", label: "Good evening" },
      { value: "option-4", label: "Good morning" },
    ],
    correctAnswer: "option-3",
  },
  {
    id: "question4",
    question: 'Làm thế nào để nói "Tạm biệt" trong tiếng Anh?',
    type: "multiple-choice",
    options: [
      { value: "option-1", label: "Goodbye" },
      { value: "option-2", label: "Hello" },
      { value: "option-3", label: "Excuse me" },
      { value: "option-4", label: "Nice to meet you" },
    ],
    correctAnswer: "option-1",
  },
  {
    id: "question5",
    question: 'Câu nào sau đây được dùng để chào vào buổi chiều?',
    type: "multiple-choice",
    options: [
      { value: "option-1", label: "Good morning" },
      { value: "option-2", label: "Good evening" },
      { value: "option-3", label: "Good afternoon" },
      { value: "option-4", label: "Goodbye" },
    ],
    correctAnswer: "option-3",
  },
  {
    id: "question6",
    question: '"Good night" thường được sử dụng trong ngữ cảnh nào?',
    type: "multiple-choice",
    options: [
      { value: "option-1", label: "Chào khi gặp nhau vào tối muộn" },
      { value: "option-2", label: "Chúc ngủ ngon khi chia tay vào buổi tối" },
      { value: "option-3", label: "Chào khi đi làm" },
      { value: "option-4", label: "Dùng mọi lúc" },
    ],
    correctAnswer: "option-2",
  },
  {
    id: "question7",
    question: 'Câu nào sau đây là một cách chào thân mật?',
    type: "multiple-choice",
    options: [
      { value: "option-1", label: "Hi" },
      { value: "option-2", label: "Good evening" },
      { value: "option-3", label: "Nice to meet you" },
      { value: "option-4", label: "Excuse me" },
    ],
    correctAnswer: "option-1",
  },
  {
    id: "question8",
    question: '"Nice to meet you" thường được dùng khi nào?',
    type: "multiple-choice",
    options: [
      { value: "option-1", label: "Khi tạm biệt ai đó" },
      { value: "option-2", label: "Khi xin lỗi" },
      { value: "option-3", label: "Khi lần đầu gặp ai đó" },
      { value: "option-4", label: "Khi chào vào buổi sáng" },
    ],
    correctAnswer: "option-3",
  },
  {
    id: "question9",
    question: 'Câu trả lời phù hợp cho lời chào "How are you?" là gì?',
    type: "multiple-choice",
    options: [
      { value: "option-1", label: "Good night" },
      { value: "option-2", label: "I’m fine, thank you" },
      { value: "option-3", label: "See you" },
      { value: "option-4", label: "Goodbye" },
    ],
    correctAnswer: "option-2",
  },
  {
    id: "question10",
    question: "Viết một đoạn hội thoại ngắn bằng tiếng Anh sử dụng ít nhất hai câu chào hỏi bạn đã học.",
    type: "text",
    placeholder: "Nhập câu trả lời của bạn tại đây...",
    correctAnswer: "any", // kiểm tra bằng độ dài hoặc đánh giá tay
  },
];


export default function QuizVideo() {
  // Initialize answers dynamically based on questions
  const [answers, setAnswers] = useState(() => {
    const initialAnswers: { [key: string]: string } = {}
    QUESTIONS.forEach((q) => {
      initialAnswers[q.id] = ""
    })
    return initialAnswers
  })

  const [submitted, setSubmitted] = useState(false)
  const [canSubmit, setCanSubmit] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [quizResult, setQuizResult] = useState<{
    score: number
    passed: boolean
    correctAnswers: number
    totalQuestions: number
    details: { [key: string]: boolean }
  } | null>(null)

  // Check if all questions are answered
  const allQuestionsAnswered = Object.values(answers).every((answer) => answer.trim() !== "")
  const canSubmitForm = canSubmit && allQuestionsAnswered && !submitted

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

  const calculateScore = () => {
    const details: { [key: string]: boolean } = {}
    let correctCount = 0

    QUESTIONS.forEach((question) => {
      if (question.type === "text") {
        // For text questions, check if answer has sufficient content
        details[question.id] = answers[question.id].trim().length > 10
      } else {
        // For multiple choice, check exact match
        details[question.id] = answers[question.id] === question.correctAnswer
      }

      if (details[question.id]) {
        correctCount++
      }
    })

    const totalQuestions = QUESTIONS.length
    const score = Math.round((correctCount / totalQuestions) * 100)
    const passed = score >= 80

    return {
      score,
      passed,
      correctAnswers: correctCount,
      totalQuestions,
      details,
    }
  }

  const handleSubmit = () => {
    if (!allQuestionsAnswered) return

    const result = calculateScore()
    setQuizResult(result)
    setSubmitted(true)

    // Only set cooldown if failed
    if (!result.passed) {
      setCanSubmit(false)
      setTimeRemaining(180) // 5 minutes = 300 seconds
    }

    // Here you would typically send the answers to a server
    console.log("Submitted answers:", answers)
    console.log("Quiz result:", result)

    // Reset form after showing results (only if failed)
    setTimeout(() => {
      if (!result.passed) {
        setSubmitted(false)
        setQuizResult(null)
        const resetAnswers: { [key: string]: string } = {}
        QUESTIONS.forEach((q) => {
          resetAnswers[q.id] = ""
        })
        setAnswers(resetAnswers)
      }
    }, 3000)
  }

  const handleRetry = () => {
    setSubmitted(false)
    setQuizResult(null)
    const resetAnswers: { [key: string]: string } = {}
    QUESTIONS.forEach((q) => {
      resetAnswers[q.id] = ""
    })
    setAnswers(resetAnswers)
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

  const getUnansweredQuestions = () => {
    const unanswered: string[] = []
    QUESTIONS.forEach((question, index) => {
      if (!answers[question.id].trim()) {
        unanswered.push(`Câu ${index + 1}`)
      }
    })
    return unanswered
  }

  const getQuestionResult = (questionId: string) => {
    if (!quizResult) return null
    return quizResult.details[questionId]
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
                      • Phải trả lời đúng{" "}
                      <strong>
                        80% câu hỏi ({Math.ceil(QUESTIONS.length * 0.8)}/{QUESTIONS.length} câu)
                      </strong>{" "}
                      mới được qua bài
                    </p>
                    <p>
                      • <strong>Phải trả lời tất cả các câu hỏi</strong> mới được nộp bài
                    </p>
                    <p>
                      • Nếu không đạt, phải đợi <strong>3 phút</strong> mới được làm lại
                    </p>
                    <p>• Hãy suy nghĩ kỹ trước khi nộp bài</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiz Results */}
            {quizResult && (
              <div
                className={`mb-6 rounded-lg border p-4 ${
                  quizResult.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {quizResult.passed ? (
                    <CheckCircle className="mt-0.5 h-6 w-6 text-green-600" />
                  ) : (
                    <XCircle className="mt-0.5 h-6 w-6 text-red-600" />
                  )}
                  <div className="flex-1">
                    <p className={`font-bold text-lg ${quizResult.passed ? "text-green-800" : "text-red-800"}`}>
                      {quizResult.passed
                        ? "🎉 Chúc mừng! Bạn đã vượt qua bài kiểm tra!"
                        : "❌ Bạn trả lời chưa chính xác"}
                    </p>
                    <div className={`mt-2 ${quizResult.passed ? "text-green-700" : "text-red-700"}`}>
                      <p className="font-medium">
                        Điểm số: <span className="text-xl">{quizResult.score}%</span>
                      </p>
                      <p>
                        Số câu đúng: {quizResult.correctAnswers}/{quizResult.totalQuestions}
                      </p>
                      {!quizResult.passed && (
                        <div className="mt-3 p-3 bg-red-100 rounded-lg border border-red-200">
                          <p className="font-medium text-red-800">⏰ Vui lòng đợi 3 phút sau để trả lời lại</p>
                          <p className="text-red-700 text-sm mt-1">
                            Bạn cần đạt ít nhất 80% ({Math.ceil(QUESTIONS.length * 0.8)}/{QUESTIONS.length} câu đúng) để
                            vượt qua bài kiểm tra.
                          </p>
                        </div>
                      )}
                    </div>
                    {quizResult.passed && (
                      <div className="mt-3">
                        <Button
                          onClick={() => window.location.reload()}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Tiếp tục học bài tiếp theo
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Validation Warning */}
            {!allQuestionsAnswered && canSubmit && !submitted && (
              <div className="mb-6 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Chưa hoàn thành</p>
                    <p className="text-yellow-700">Bạn cần trả lời tất cả các câu hỏi trước khi nộp bài.</p>
                    <p className="text-yellow-700 text-sm mt-1">
                      Còn thiếu: <strong>{getUnansweredQuestions().join(", ")}</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Countdown Timer */}
            {!canSubmit && timeRemaining > 0 && (
              <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-red-600" />
                  <div className="flex-1">
                    <p className="font-bold text-red-800 text-lg">⏰ Đang trong thời gian chờ</p>
                    <p className="text-red-700 font-medium">
                      Bạn trả lời chưa chính xác, vui lòng đợi <strong>{formatTime(timeRemaining)}</strong> nữa để trả
                      lời lại
                    </p>
                    <p className="text-red-600 text-sm mt-1">
                      Hãy xem lại video bài giảng và chuẩn bị kỹ hơn cho lần làm bài tiếp theo
                    </p>
                  </div>
                  {timeRemaining <= 10 && (
                    <Button
                      onClick={handleRetry}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                    >
                      Làm lại
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Questions Counter and Scroll Hint */}
            {QUESTIONS.length > 5 && (
              <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700">
                  <AlertCircle className="h-4 w-4" />
                  <p className="text-sm">
                    Có <strong>{QUESTIONS.length} câu hỏi</strong> - Cuộn xuống để xem tất cả các câu hỏi
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-8 max-h-[600px] overflow-y-auto pr-2">
              {/* Render Questions Dynamically */}
              {QUESTIONS.map((question, index) => (
                <div
                  key={question.id}
                  className={`rounded-lg border p-5 ${
                    quizResult && !getQuestionResult(question.id)
                      ? "border-red-300 bg-red-50"
                      : !answers[question.id] && canSubmit
                        ? "border-yellow-300 bg-yellow-50"
                        : "border-gray-200"
                  }`}
                >
                  <h3 className="mb-4 text-lg font-semibold flex items-center gap-2">
                    {index + 1}. {question.question}
                    {quizResult &&
                      (getQuestionResult(question.id) ? (
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600" />
                      ))}
                    {!answers[question.id] && canSubmit && !submitted && (
                      <span className="text-yellow-600 text-sm">(Chưa trả lời)</span>
                    )}
                  </h3>

                  {question.type === "multiple-choice" ? (
                    <RadioGroup
                      value={answers[question.id]}
                      onValueChange={(value) => handleAnswerChange(question.id, value)}
                      disabled={!canSubmit || submitted}
                    >
                      <div className="space-y-3">
                        {question.options?.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                            <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  ) : (
                    <>
                      <Textarea
                        placeholder={question.placeholder}
                        className="mb-4 min-h-[120px]"
                        value={answers[question.id]}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        disabled={!canSubmit || submitted}
                      />
                      {quizResult && !getQuestionResult(question.id) && (
                        <p className="text-sm text-red-600 mt-2">Câu trả lời cần chi tiết hơn (ít nhất 10 ký tự)</p>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Submit Section */}
            <div className="mt-8 flex flex-col items-center gap-4">
              {!quizResult?.passed && (
                <Button
                  onClick={handleSubmit}
                  disabled={!canSubmitForm}
                  className={`gap-2 px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                    canSubmitForm
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                      : "bg-gray-400"
                  }`}
                >
                  <Send className="h-4 w-4" />
                  {submitted
                    ? "Đang chấm điểm..."
                    : !canSubmit
                      ? "Đang chờ..."
                      : !allQuestionsAnswered
                        ? "Hoàn thành tất cả câu hỏi"
                        : "Nộp bài"}
                </Button>
              )}

              {!allQuestionsAnswered && canSubmit && !submitted && (
                <p className="text-sm text-gray-600 text-center">
                  Vui lòng trả lời tất cả {QUESTIONS.length} câu hỏi để có thể nộp bài
                </p>
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
