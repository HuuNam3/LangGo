"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Volume2,
  RotateCcw,
  CheckCircle,
  XCircle,
  Trophy,
  Target,
  AlertCircle,
  Clock,
  Zap,
  Flame,
  BookOpen,
  Headphones,
  Award,
  TrendingUp,
  VolumeX,
  Repeat,
  PlayCircle,
  PauseCircle,
  Lightbulb,
} from "lucide-react"

interface VocabularyItem {
  id: string
  vietnamese: string
  target: string
  pronunciation?: string
  example?: string
  difficulty: number
  category: string
  phonetic?: string
}

interface SessionStats {
  timeStarted: number
  mistakes: VocabularyItem[]
  streak: number
  fastestAnswer: number
  averageTime: number
  totalAnswers: number
  correctAnswers: number
  translationCorrect: number
  listeningCorrect: number
  attempts: number
}

type PracticePhase = "translation" | "listening" | "completed"

const originalVocabulary: VocabularyItem[] = [
    {
      id: "1",
      vietnamese: "Xin chào",
      target: "Hello",
      pronunciation: "/həˈloʊ/",
      phonetic: "huh-LOH",
      example: "Hello, how are you today? Nice to meet you!",
      difficulty: 0,
      category: "greetings",
    },
    {
      id: "2",
      vietnamese: "Chào buổi sáng",
      target: "Good morning",
      pronunciation: "/ɡʊd ˈmɔːrnɪŋ/",
      phonetic: "good MOR-ning",
      example: "Good morning! I hope you have a wonderful day ahead.",
      difficulty: 0,
      category: "greetings",
    },
    {
      id: "3",
      vietnamese: "Chào buổi chiều",
      target: "Good afternoon",
      pronunciation: "/ɡʊd ˌæftərˈnuːn/",
      phonetic: "good af-ter-NOON",
      example: "Good afternoon, everyone! How has your day been so far?",
      difficulty: 0,
      category: "greetings",
    },
    {
      id: "4",
      vietnamese: "Chào buổi tối",
      target: "Good evening",
      pronunciation: "/ɡʊd ˈiːvnɪŋ/",
      phonetic: "good EE-vning",
      example: "Good evening! Welcome to our restaurant tonight.",
      difficulty: 0,
      category: "greetings",
    },
    {
      id: "5",
      vietnamese: "Tạm biệt",
      target: "Goodbye",
      pronunciation: "/ɡʊdˈbaɪ/",
      phonetic: "good-BYE",
      example: "Goodbye! See you tomorrow at the same time.",
      difficulty: 0,
      category: "farewells",
    },
    {
      id: "6",
      vietnamese: "Cảm ơn",
      target: "Thank you",
      pronunciation: "/θæŋk juː/",
      phonetic: "thank YOU",
      example: "Thank you so much for all your help today.",
      difficulty: 0,
      category: "courtesy",
    },
    {
      id: "7",
      vietnamese: "Xin lỗi",
      target: "Sorry",
      pronunciation: "/ˈsɔːri/",
      phonetic: "SOR-ree",
      example: "Sorry, I'm running a bit late for our meeting.",
      difficulty: 0,
      category: "courtesy",
    },
    {
      id: "8",
      vietnamese: "Làm ơn",
      target: "Please",
      pronunciation: "/pliːz/",
      phonetic: "pleez",
      example: "Please help me carry these heavy boxes upstairs.",
      difficulty: 0,
      category: "courtesy",
    },
    {
      id: "9",
      vietnamese: "Bạn có khỏe không?",
      target: "How are you?",
      pronunciation: "/haʊ ɑːr juː/",
      phonetic: "how are YOU",
      example: "How are you feeling today? You look great!",
      difficulty: 0,
      category: "questions",
    },
    {
      id: "10",
      vietnamese: "Tôi khỏe, cảm ơn",
      target: "I'm fine, thank you",
      pronunciation: "/aɪm faɪn θæŋk juː/",
      phonetic: "I'm fine, thank YOU",
      example: "I'm fine, thank you for asking. How about you?",
      difficulty: 0,
      category: "responses",
    },
  ]

export default function VocabularyPractice() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [shuffledVocabulary, setShuffledVocabulary] = useState<VocabularyItem[]>([])
  const [passed, setPassed] = useState(false)
  const [practicePhase, setPracticePhase] = useState<PracticePhase>("translation")
  const [isListening, setIsListening] = useState(false)
  const [audioPlayed, setAudioPlayed] = useState(false)
  const [playCount, setPlayCount] = useState(0)
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    timeStarted: Date.now(),
    mistakes: [],
    streak: 0,
    fastestAnswer: Number.POSITIVE_INFINITY,
    averageTime: 0,
    totalAnswers: 0,
    correctAnswers: 0,
    translationCorrect: 0,
    listeningCorrect: 0,
    attempts: 0,
  })
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [achievements, setAchievements] = useState<string[]>([])
  const [showHints, setShowHints] = useState(false)
  const [autoPlay, setAutoPlay] = useState(true)
  const [, setTranslationQuestions] = useState<VocabularyItem[]>([])
  const [listeningQuestions, setListeningQuestions] = useState<VocabularyItem[]>([])

  const shuffleArray = (array: VocabularyItem[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  useEffect(() => {
    const shuffled = shuffleArray(originalVocabulary)
    // Chia thành 2 nhóm: 5 câu đầu cho dịch, 5 câu sau cho nghe
    setTranslationQuestions(shuffled.slice(0, 5))
    setListeningQuestions(shuffled.slice(5, 10))
    setShuffledVocabulary(shuffled.slice(0, 5)) // Bắt đầu với câu dịch
    setQuestionStartTime(Date.now())
  }, [])


  const currentWord = shuffledVocabulary[currentIndex]
  
  const playPronunciation = useCallback(() => {
    if (!currentWord || "speechSynthesis" in window === false) return

    setIsListening(true)
    setPlayCount((prev) => prev + 1)

    const utterance = new SpeechSynthesisUtterance(currentWord.target)
    utterance.lang = "en-US"
    utterance.rate = 0.7
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onend = () => {
      setIsListening(false)
    }

    speechSynthesis.speak(utterance)
  },[currentWord]) 
  // Auto-play audio for listening mode
  useEffect(() => {
  if (
    practicePhase === "listening" &&
    currentWord &&
    autoPlay &&
    !answered &&
    !audioPlayed
  ) {
    const timeoutId = setTimeout(() => {
      playPronunciation();
      setAudioPlayed(true);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }
}, [practicePhase, autoPlay, answered, audioPlayed,currentWord,playPronunciation]);

  

  const checkAnswer = () => {
    if (answered || !currentWord) return

    const answerTime = Date.now() - questionStartTime
    const correct = userAnswer.toLowerCase().trim() === currentWord.target.toLowerCase().trim()

    setIsCorrect(correct)
    setAnswered(true)

    // Update stats
    setSessionStats((prev) => {
      const newStats = { ...prev }
      newStats.totalAnswers += 1

      if (correct) {
        newStats.streak += 1
        newStats.correctAnswers += 1
        newStats.fastestAnswer = Math.min(newStats.fastestAnswer, answerTime)

        // Track mode-specific accuracy
        if (practicePhase === "translation") {
          newStats.translationCorrect += 1
        } else if (practicePhase === "listening") {
          newStats.listeningCorrect += 1
        }

        // Achievements
        if (newStats.streak === 5) {
          setAchievements((prev) => [...prev, "🔥 Streak Master - 5 câu liên tiếp!"])
        }
        if (answerTime < 3000) {
          setAchievements((prev) => [...prev, "⚡ Lightning Fast - Dưới 3 giây!"])
        }
      } else {
        newStats.streak = 0
        const existingMistake = newStats.mistakes.find((m) => m.id === currentWord.id)
        if (!existingMistake) {
          newStats.mistakes.push({ ...currentWord, difficulty: currentWord.difficulty + 1 })
        }
      }

      newStats.averageTime = (newStats.averageTime * (newStats.totalAnswers - 1) + answerTime) / newStats.totalAnswers

      return newStats
    })

    setScore((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }))
  }

  const nextQuestion = () => {
    if (practicePhase === "translation") {
      if (currentIndex < 4) {
        // Còn câu dịch
        setCurrentIndex(currentIndex + 1)
        resetQuestionState()
      } else {
        // Hết câu dịch, chuyển sang nghe
        setPracticePhase("listening")
        setCurrentIndex(0)
        setShuffledVocabulary(listeningQuestions)
        resetQuestionState()
      }
    } else if (practicePhase === "listening") {
      if (currentIndex < 4) {
        // Còn câu nghe
        setCurrentIndex(currentIndex + 1)
        resetQuestionState()
      } else {
        // Hết tất cả câu hỏi
        completeSession()
      }
    }
  }

  const resetQuestionState = () => {
    setUserAnswer("")
    setAnswered(false)
    setIsCorrect(false)
    setAudioPlayed(false)
    setPlayCount(0)
    setQuestionStartTime(Date.now())
  }

  const completeSession = () => {
    const finalScore = score.correct + (isCorrect ? 1 : 0)
    const finalTotal = score.total + 1
    const percentage = (finalScore / finalTotal) * 100

    setCompleted(true)
    setPassed(percentage >= 80)

    // Tăng số lần thử
    setSessionStats((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
    }))
  }

  const resetPractice = () => {
    // Giữ nguyên số attempts và kiểm tra có hiển thị gợi ý không
    const currentAttempts = sessionStats.attempts
    const shouldShowHints = currentAttempts >= 2

    setCurrentIndex(0)
    setUserAnswer("")
    setAnswered(false)
    setIsCorrect(false)
    setScore({ correct: 0, total: 0 })
    setCompleted(false)
    setPassed(false)
    setPracticePhase("translation")
    setAudioPlayed(false)
    setPlayCount(0)
    setAchievements([])
    setShowHints(shouldShowHints)

    setSessionStats(() => ({
      timeStarted: Date.now(),
      mistakes: [],
      streak: 0,
      fastestAnswer: Number.POSITIVE_INFINITY,
      averageTime: 0,
      totalAnswers: 0,
      correctAnswers: 0,
      translationCorrect: 0,
      listeningCorrect: 0,
      attempts: currentAttempts, // Giữ nguyên số attempts
    }))

    const shuffled = shuffleArray(originalVocabulary)
    setTranslationQuestions(shuffled.slice(0, 5))
    setListeningQuestions(shuffled.slice(5, 10))
    setShuffledVocabulary(shuffled.slice(0, 5))
    setQuestionStartTime(Date.now())
  }

  const getHint = () => {
    if (!currentWord) return ""
    const target = currentWord.target
    if (target.includes(" ")) {
      return target
        .split(" ")
        .map((word) => word.charAt(0) + "_".repeat(word.length - 1))
        .join(" ")
    }
    return target.charAt(0) + "_".repeat(target.length - 1)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (!answered) {
        checkAnswer()
      } else {
        nextQuestion()
      }
    }
  }

  const getScorePercentage = () => {
    return score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0
  }

  const getFinalScorePercentage = () => {
    const finalScore = score.correct + (isCorrect ? 1 : 0)
    const finalTotal = score.total + 1
    return Math.round((finalScore / finalTotal) * 100)
  }

  const getSessionTime = () => {
    return Math.round((Date.now() - sessionStats.timeStarted) / 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      greetings: "bg-blue-100 text-blue-800",
      farewells: "bg-purple-100 text-purple-800",
      courtesy: "bg-green-100 text-green-800",
      questions: "bg-orange-100 text-orange-800",
      responses: "bg-pink-100 text-pink-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getCurrentQuestionNumber = () => {
    if (practicePhase === "translation") {
      return currentIndex + 1
    } else {
      return currentIndex + 6 // 5 câu dịch + câu nghe hiện tại
    }
  }

  const getTotalProgress = () => {
    if (practicePhase === "translation") {
      return ((currentIndex + 1) / 10) * 100
    } else {
      return ((currentIndex + 6) / 10) * 100
    }
  }

  // Loading state
  if (shuffledVocabulary.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang chuẩn bị bài học...</p>
        </div>
      </div>
    )
  }

  if (completed) {
    return (
      <div className="min-h-screen bg-white">
        <main className="w-full max-w-full px-4">
          <Card className="overflow-hidden w-full">
            <div
              className={`p-6 text-white text-center ${passed ? "bg-gradient-to-r from-green-600 to-emerald-500" : "bg-gradient-to-r from-red-600 to-pink-500"}`}
            >
              {passed ? (
                <>
                  <Trophy className="h-16 w-16 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">🎉 Xuất sắc! Hoàn thành bài học!</h2>
                  <p className="text-lg opacity-90">Đạt yêu cầu 80% - Hoàn thành cả 2 phần</p>
                </>
              ) : (
                <>
                  <AlertCircle className="h-16 w-16 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">😔 Chưa đạt yêu cầu</h2>
                  <p className="text-lg opacity-90">Cần ít nhất 80% để qua bài - Lần thử: {sessionStats.attempts}</p>
                </>
              )}
            </div>

            <div className="p-8">
              {/* Hint notification */}
              {sessionStats.attempts >= 2 && !passed && (
                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lightbulb className="h-6 w-6 text-yellow-600" />
                    <div>
                      <div className="font-semibold text-yellow-800">💡 Gợi ý đã được kích hoạt!</div>
                      <div className="text-sm text-yellow-700">
                        Sau 2 lần thử, bạn sẽ thấy gợi ý trong lần làm bài tiếp theo để hỗ trợ học tập.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements */}
              {achievements.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="h-6 w-6 text-yellow-600" />
                    Thành tích đạt được:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                      >
                        <div className="text-2xl">{achievement.split(" ")[0]}</div>
                        <div className="text-sm font-medium text-yellow-800">{achievement.substring(2)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Score */}
              <div className="text-center mb-8">
                <div className={`text-5xl font-bold mb-3 ${passed ? "text-green-600" : "text-red-600"}`}>
                  {getFinalScorePercentage()}%
                </div>
                <p className="text-xl text-gray-600 mb-2">{score.correct + (isCorrect ? 1 : 0)}/10 câu trả lời đúng</p>
                <div className="flex justify-center gap-4 mt-4">
                  <Badge className="bg-blue-100 text-blue-800">Dịch: {sessionStats.translationCorrect}/5</Badge>
                  <Badge className="bg-purple-100 text-purple-800">Nghe: {sessionStats.listeningCorrect}/5</Badge>
                </div>
              </div>

              {/* Detailed Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-bold text-blue-800">{formatTime(getSessionTime())}</div>
                  <div className="text-sm text-blue-600">Tổng thời gian</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <Flame className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-lg font-bold text-orange-800">{sessionStats.streak}</div>
                  <div className="text-sm text-orange-600">Streak tối đa</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-lg font-bold text-purple-800">
                    {sessionStats.fastestAnswer === Number.POSITIVE_INFINITY
                      ? "--"
                      : `${(sessionStats.fastestAnswer / 1000).toFixed(1)}s`}
                  </div>
                  <div className="text-sm text-purple-600">Nhanh nhất</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <div className="text-lg font-bold text-green-800">
                    {sessionStats.averageTime > 0 ? `${(sessionStats.averageTime / 1000).toFixed(1)}s` : "--"}
                  </div>
                  <div className="text-sm text-green-600">TB mỗi câu</div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="space-y-4">
                {!passed && (
                  <Button
                    onClick={resetPractice}
                    className="w-full py-4 text-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Làm lại bài học (Lần {sessionStats.attempts + 1})
                  </Button>
                )}

                {passed && (
                  <div className="space-y-3">
                    <Button onClick={resetPractice} variant="outline" className="w-full py-4 text-lg">
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Luyện tập lại từ đầu
                    </Button>
                    <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="text-lg font-semibold text-green-800 mb-1">
                        ✅ Chúc mừng! Bạn đã hoàn thành bài học
                      </div>
                      <div className="text-sm text-green-600">Bạn có thể chuyển sang bài học tiếp theo</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="w-full max-w-full px-4">
        <Card className="overflow-hidden w-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">Bài kiểm tra từ vựng</h2>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {practicePhase === "translation" ? "Phần 1: Dịch thuật" : "Phần 2: Luyện nghe"}
                </Badge>
                {currentWord && (
                  <Badge className={getCategoryColor(currentWord.category)}>{currentWord.category}</Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4" />
                  <span className="font-medium">{getCurrentQuestionNumber()}/10</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="h-4 w-4" />
                  <span className="font-medium">{sessionStats.streak}</span>
                </div>
                <div className="text-xs bg-white/20 px-2 py-1 rounded">Cần: 80%</div>
              </div>
            </div>

            {/* Phase indicator */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span className={practicePhase === "translation" ? "font-bold" : "opacity-70"}>
                  Dịch (1-5) {practicePhase === "translation" && `- Câu ${currentIndex + 1}`}
                </span>
              </div>
              <div className="text-white/50">→</div>
              <div className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                <span className={practicePhase === "listening" ? "font-bold" : "opacity-70"}>
                  Nghe (6-10) {practicePhase === "listening" && `- Câu ${currentIndex + 6}`}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-medium text-gray-600">Tiến độ tổng thể</span>
                <span className="text-sm font-medium text-gray-600">{Math.round(getTotalProgress())}%</span>
              </div>
              <Progress value={getTotalProgress()} className="h-3 mb-4" />

              <div className="flex justify-between items-center">
                {score.total > 0 && (
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <span
                        className={`text-2xl font-bold ${getScorePercentage() >= 80 ? "text-green-600" : getScorePercentage() >= 60 ? "text-orange-600" : "text-red-600"}`}
                      >
                        {getScorePercentage()}%
                      </span>
                      <div className="text-sm text-gray-500">
                        {score.correct}/{score.total} đúng
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-700">{formatTime(getSessionTime())}</div>
                      <div className="text-sm text-gray-500">Thời gian</div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  {practicePhase === "listening" && (
                    <Button onClick={() => setAutoPlay(!autoPlay)} variant="outline" size="sm" className="gap-2">
                      {autoPlay ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      {autoPlay ? "Tắt tự động" : "Bật tự động"}
                    </Button>
                  )}
                  {showHints && (
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 gap-1">
                      <Lightbulb className="h-3 w-3" />
                      Gợi ý ON
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Hints (only show after 2 failed attempts) */}
            {showHints && !answered && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <span className="font-semibold text-yellow-800">💡 Gợi ý:</span>
                </div>
                <div className="space-y-2">
                  <div className="text-xl font-mono text-yellow-800 tracking-wider">{getHint()}</div>
                  <div className="text-sm text-yellow-600">
                    Độ dài: {currentWord.target.length} ký tự
                    {currentWord.target.includes(" ") && ` (${currentWord.target.split(" ").length} từ)`}
                  </div>
                  {currentWord.phonetic && (
                    <div className="text-sm text-yellow-600">Phát âm: {currentWord.phonetic}</div>
                  )}
                </div>
              </div>
            )}

            {/* Question Content */}
            <div className="mb-8">
              {practicePhase === "translation" ? (
                <div className="text-center space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-600 mb-4">
                      Câu {currentIndex + 1}/5 - Dịch từ tiếng Việt sang tiếng Anh:
                    </h3>
                    <div className="text-4xl font-bold text-purple-600 mb-6">{currentWord.vietnamese}</div>
                  </div>
                  <Input
                    type="text"
                    placeholder="Nhập bản dịch tiếng Anh..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={answered}
                    className="text-center text-xl py-4 max-w-md mx-auto"
                  />
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div>
                    <Headphones className="h-20 w-20 mx-auto mb-4 text-purple-600" />
                    <h3 className="text-lg font-medium text-gray-600 mb-4">
                      Câu {currentIndex + 1}/5 - Nghe và viết lại từ/cụm từ bạn nghe được:
                    </h3>
                    <div className="flex justify-center gap-3 mb-6">
                      <Button
                        onClick={playPronunciation}
                        variant="outline"
                        size="lg"
                        disabled={isListening}
                        className="gap-2"
                      >
                        {isListening ? <PauseCircle className="h-5 w-5" /> : <PlayCircle className="h-5 w-5" />}
                        {isListening ? "Đang phát..." : "Nghe"}
                      </Button>
                      <Button
                        onClick={playPronunciation}
                        variant="outline"
                        size="lg"
                        disabled={isListening}
                        className="gap-2"
                      >
                        <Repeat className="h-5 w-5" />
                        Nghe lại
                      </Button>
                    </div>
                    {playCount > 0 && <div className="text-sm text-gray-500 mb-4">Đã nghe: {playCount} lần</div>}
                  </div>
                  <Input
                    type="text"
                    placeholder="Viết từ/cụm từ bạn nghe được..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={answered}
                    className="text-center text-xl py-4 max-w-md mx-auto"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mb-6">
              {!answered ? (
                <Button
                  onClick={checkAnswer}
                  disabled={!userAnswer.trim()}
                  className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700"
                >
                  Kiểm tra đáp án
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="px-8 py-3 text-lg bg-green-600 hover:bg-green-700">
                  {practicePhase === "translation" && currentIndex < 4
                    ? "Câu dịch tiếp theo"
                    : practicePhase === "translation" && currentIndex === 4
                      ? "Chuyển sang phần nghe"
                      : practicePhase === "listening" && currentIndex < 4
                        ? "Câu nghe tiếp theo"
                        : "Hoàn thành bài kiểm tra"}
                </Button>
              )}
            </div>

            {/* Feedback */}
            {answered && (
              <div
                className={`p-6 rounded-xl border-2 ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  ) : (
                    <XCircle className="h-8 w-8 text-red-600" />
                  )}
                  <span className={`text-xl font-bold ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect ? "🎉 Chính xác!" : "❌ Chưa đúng"}
                  </span>
                </div>

                {!isCorrect && (
                  <div className="text-center space-y-3">
                    <div>
                      <span className="text-red-700 text-lg">Đáp án đúng: </span>
                      <span className="text-xl font-bold text-red-800">{currentWord.target}</span>
                    </div>
                    <div className="text-sm text-red-600">
                      Phát âm: {currentWord.pronunciation} ({currentWord.phonetic})
                    </div>
                  </div>
                )}

                {currentWord.example && (
                  <div className="mt-4 p-3 bg-white rounded-lg border">
                    <div className="text-sm font-medium text-gray-600 mb-1">📝 Ví dụ sử dụng:</div>
                    <div className="text-gray-800 italic">&quot;{currentWord.example}&quot;</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Card>
      </main>
    </div>
  )
}
