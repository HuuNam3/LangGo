"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { PronunciationButton } from "@/components/ui/pronunciation-button"
import {
  ChevronLeft,
  Volume2,
  BookOpen,
  CheckCircle,
  PlayCircle,
  Star,
  Download,
  Camera,
  Upload,
  Info,
  HelpCircle,
  FileText,
  PenTool,
  Send,
} from "lucide-react"

export default function DailyGreetingsLesson() {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState("introduction")

  // Function to handle tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Function to navigate to the next tab
  const goToNextTab = () => {
    if (activeTab === "introduction") setActiveTab("content")
    else if (activeTab === "content") setActiveTab("questions")
    else if (activeTab === "questions") setActiveTab("writing")
  }

  // Function to navigate to the previous tab
  const goToPreviousTab = () => {
    if (activeTab === "content") setActiveTab("introduction")
    else if (activeTab === "questions") setActiveTab("content")
    else if (activeTab === "writing") setActiveTab("questions")
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Main content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mb-6 grid w-full grid-cols-4">
            <TabsTrigger
              value="introduction"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Introduction
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Lesson Content
            </TabsTrigger>
            <TabsTrigger
              value="questions"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Questions
            </TabsTrigger>
            <TabsTrigger
              value="writing"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-500 data-[state=active]:text-white"
            >
              Writing Practice
            </TabsTrigger>
          </TabsList>

          {/* Introduction Tab */}
          <TabsContent value="introduction">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Left sidebar */}
              <div className="space-y-6 md:col-span-1">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                    <h2 className="text-xl font-bold">Lesson Information</h2>
                  </div>
                  <div className="space-y-4 p-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/placeholder.svg"
                        alt="Chen Jie"
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm text-gray-500">Instructor</p>
                        <p className="font-medium">Chen Jie</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">30 minutes</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-pink-100 p-2 text-pink-600">
                        <Info className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Lesson Number</p>
                        <p className="font-medium">Lesson 3 of 12</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                        <Star className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Level</p>
                        <p className="font-medium">Beginner</p>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                      <Download className="mr-2 h-4 w-4" />
                      Download Materials
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Main introduction content */}
              <div className="md:col-span-2">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                    <h2 className="text-xl font-bold">Lesson Introduction</h2>
                  </div>

                  <div className="p-6">
                    <div className="mb-6 aspect-video overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src="/placeholder.svg"
                        alt="Lesson Introduction"
                        width={600}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button className="rounded-full bg-white/80 p-3 text-purple-600 hover:bg-white">
                          <PlayCircle className="h-10 w-10" />
                        </Button>
                      </div>
                    </div>

                    <div className="mb-6 rounded-lg bg-purple-50 p-4">
                      <h3 className="mb-2 text-lg font-semibold text-purple-800">About This Lesson</h3>
                      <p className="text-gray-700">
                        Welcome to &ldquo;Daily Greetings &amp; Phrases&rdquo; - an essential lesson for anyone beginning their Mandarin
                        learning journey. In this lesson, you&apos;ll learn how to greet people in different situations and
                        times of day, introduce yourself, and engage in basic conversations.
                      </p>
                    </div>

                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold">What You&apos;ll Learn</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Common greetings for different times of day</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>How to introduce yourself in Mandarin</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Basic conversation starters</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Proper pronunciation of common phrases</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                          <span>Cultural context for Chinese greetings</span>
                        </li>
                      </ul>
                    </div>

                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold">Prerequisites</h3>
                      <p className="text-gray-700">
                        This lesson assumes you have completed &ldquo;Basic Mandarin Pronunciation&rdquo; (Lesson 1) and have a
                        basic understanding of Mandarin tones. No other prior knowledge is required.
                      </p>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={goToNextTab}
                        className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                      >
                        Start Lesson
                        <ChevronLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Lesson Content Tab */}
          <TabsContent value="content">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Left sidebar */}
              <div className="space-y-6 md:col-span-1">
                <Card>
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                    <h2 className="text-xl font-bold">Lesson Progress</h2>
                  </div>
                  <div className="p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-medium">Completion</span>
                      <span className="text-sm font-medium text-purple-600">25%</span>
                    </div>
                    <Progress value={25} className="mb-6 h-2 bg-gray-100" />

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>Introduction</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <PlayCircle className="h-5 w-5 text-purple-500" />
                        <span className="font-medium text-purple-600">Basic Greetings</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <div className="rounded-full border-2 border-gray-300 p-0.5">
                          <div className="h-3 w-3 rounded-full" />
                        </div>
                        <span>Common Phrases</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-400">
                        <div className="rounded-full border-2 border-gray-300 p-0.5">
                          <div className="h-3 w-3 rounded-full" />
                        </div>
                        <span>Practice Exercise</span>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                    <h2 className="text-xl font-bold">Key Vocabulary</h2>
                  </div>
                  <div className="divide-y">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">你好</p>
                        <p className="text-sm text-gray-500">Nǐ hǎo</p>
                      </div>
                      <PronunciationButton chinese="你好" pinyin="Nǐ hǎo" />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">早上好</p>
                        <p className="text-sm text-gray-500">Zǎoshang hǎo</p>
                      </div>
                      <PronunciationButton chinese="早上好" pinyin="Zǎoshang hǎo" />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">晚上好</p>
                        <p className="text-sm text-gray-500">Wǎnshang hǎo</p>
                      </div>
                      <PronunciationButton chinese="晚上好" pinyin="Wǎnshang hǎo" />
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-medium">再见</p>
                        <p className="text-sm text-gray-500">Zàijiàn</p>
                      </div>
                      <PronunciationButton chinese="再见" pinyin="Zàijiàn" />
                    </div>
                  </div>
                </Card>
              </div>

              {/* Main lesson content */}
              <div className="md:col-span-2">
                <Card className="overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                    <h2 className="text-xl font-bold">Basic Greetings</h2>
                  </div>

                  <div className="p-6">
                    <div className="mb-8 rounded-lg bg-purple-50 p-4">
                      <p className="mb-2 text-sm font-medium text-purple-700">Learning Objective</p>
                      <p className="text-gray-700">
                        In this section, you will learn the most common greetings used in daily Mandarin conversations.
                        By the end, you&apos;ll be able to confidently greet people at different times of the day.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {/* Greeting 1 */}
                      <div className="rounded-lg border border-gray-200 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold">你好 / Nǐ hǎo</h3>
                            <p className="text-gray-600">Hello</p>
                          </div>
                          <PronunciationButton 
                            chinese="你好" 
                            pinyin="Nǐ hǎo" 
                            variant="outline" 
                            className="rounded-full" 
                          />
                        </div>
                        <p className="mb-3 text-gray-700">
                          This is the most common greeting in Mandarin Chinese. It can be used at any time of the day
                          when meeting someone.
                        </p>
                        <div className="rounded-md bg-gray-100 p-3">
                          <p className="font-medium">Example:</p>
                          <p className="mb-1">你好，我叫小明。(Nǐ hǎo, wǒ jiào Xiǎo Míng.)</p>
                          <p className="text-gray-600">Hello, my name is Xiao Ming.</p>
                        </div>
                      </div>

                      {/* Greeting 2 */}
                      <div className="rounded-lg border border-gray-200 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold">早上好 / Zǎoshang hǎo</h3>
                            <p className="text-gray-600">Good morning</p>
                          </div>
                          <PronunciationButton 
                            chinese="早上好" 
                            pinyin="Zǎoshang hǎo" 
                            variant="outline" 
                            className="rounded-full" 
                          />
                        </div>
                        <p className="mb-3 text-gray-700">
                          Use this greeting in the morning, typically from when you wake up until around 11 AM.
                        </p>
                        <div className="rounded-md bg-gray-100 p-3">
                          <p className="font-medium">Example:</p>
                          <p className="mb-1">早上好！今天天气真好。(Zǎoshang hǎo! Jīntiān tiānqì zhēn hǎo.)</p>
                          <p className="text-gray-600">Good morning! The weather is really nice today.</p>
                        </div>
                      </div>

                      {/* Greeting 3 */}
                      <div className="rounded-lg border border-gray-200 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold">晚上好 / Wǎnshang hǎo</h3>
                            <p className="text-gray-600">Good evening</p>
                          </div>
                          <PronunciationButton 
                            chinese="晚上好" 
                            pinyin="Wǎnshang hǎo" 
                            variant="outline" 
                            className="rounded-full" 
                          />
                        </div>
                        <p className="mb-3 text-gray-700">
                          Use this greeting in the evening, typically after sunset or around 6 PM.
                        </p>
                        <div className="rounded-md bg-gray-100 p-3">
                          <p className="font-medium">Example:</p>
                          <p className="mb-1">晚上好！你吃饭了吗？(Wǎnshang hǎo! Nǐ chīfàn le ma?)</p>
                          <p className="text-gray-600">Good evening! Have you eaten yet?</p>
                        </div>
                      </div>

                      {/* Greeting 4 */}
                      <div className="rounded-lg border border-gray-200 p-4">
                        <div className="mb-3 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold">再见 / Zàijiàn</h3>
                            <p className="text-gray-600">Goodbye</p>
                          </div>
                          <PronunciationButton 
                            chinese="再见" 
                            pinyin="Zàijiàn" 
                            variant="outline" 
                            className="rounded-full" 
                          />
                        </div>
                        <p className="mb-3 text-gray-700">
                          This is the standard way to say goodbye in Mandarin. It literally means &ldquo;see you again.&rdquo;
                        </p>
                        <div className="rounded-md bg-gray-100 p-3">
                          <p className="font-medium">Example:</p>
                          <p className="mb-1">明天见，再见！(Míngtiān jiàn, zàijiàn!)</p>
                          <p className="text-gray-600">See you tomorrow, goodbye!</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between">
                      <Button onClick={goToPreviousTab} variant="outline" className="gap-2">
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>
                      <Button
                        onClick={goToNextTab}
                        className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                      >
                        Next
                        <ChevronLeft className="h-4 w-4 rotate-180" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Questions Tab */}
          <TabsContent value="questions">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                <h2 className="text-xl font-bold">Lesson Questions</h2>
              </div>

              <div className="p-6">
                <div className="mb-6 rounded-lg bg-purple-50 p-4">
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-800">Test Your Understanding</p>
                      <p className="text-gray-700">
                        Answer the following questions to check your understanding of the lesson content. You need to
                        score at least 70% to proceed to the next lesson.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Question 1 */}
                  <div className="rounded-lg border border-gray-200 p-5">
                    <h3 className="mb-4 text-lg font-semibold">1. How do you say &ldquo;Hello&rdquo; in Mandarin?</h3>
                    <RadioGroup defaultValue="option-1">
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
                    <h3 className="mb-4 text-lg font-semibold">2. When would you use &ldquo;早上好&rdquo; (Zǎoshang hǎo)?</h3>
                    <RadioGroup defaultValue="option-1">
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
                    <h3 className="mb-4 text-lg font-semibold">3. What does &ldquo;你吃饭了吗?&rdquo; (Nǐ chīfàn le ma?) mean?</h3>
                    <RadioGroup defaultValue="option-1">
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
                    <RadioGroup defaultValue="option-1">
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
                    <Textarea placeholder="Type your answer here..." className="mb-4 min-h-[120px]" />
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                      Submit Answer
                    </Button>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button onClick={goToPreviousTab} variant="outline" className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={goToNextTab}
                    className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600"
                  >
                    Next
                    <ChevronLeft className="h-4 w-4 rotate-180" />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Writing Practice Tab */}
          <TabsContent value="writing">
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
                <h2 className="text-xl font-bold">Character Writing Practice</h2>
              </div>

              <div className="p-6">
                <div className="mb-6 rounded-lg bg-purple-50 p-4">
                  <div className="flex items-start gap-3">
                    <PenTool className="mt-0.5 h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium text-purple-800">Practice Your Writing</p>
                      <p className="text-gray-700">
                        Practice writing the Chinese characters you learned in this lesson. You can either write them on
                        paper and upload a photo, or use a digital drawing tool.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {/* Character 1 */}
                  <div className="rounded-lg border border-gray-200 p-5">
                    <div className="mb-4 flex flex-wrap items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-4xl font-bold">
                        你
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">你 (nǐ)</h3>
                        <p className="text-gray-600">Meaning: you</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 gap-1">
                            <Volume2 className="h-3 w-3" />
                            Listen
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 gap-1">
                            <FileText className="h-3 w-3" />
                            Stroke Order
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                      <div className="flex flex-col items-center justify-center text-center">
                        <Camera className="mb-2 h-8 w-8 text-gray-400" />
                        <h4 className="mb-1 text-sm font-medium">Upload your written character</h4>
                        <p className="mb-4 text-xs text-gray-500">
                          Take a photo of your handwritten character or upload from your device
                        </p>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Character 2 */}
                  <div className="rounded-lg border border-gray-200 p-5">
                    <div className="mb-4 flex flex-wrap items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-4xl font-bold">
                        好
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">好 (hǎo)</h3>
                        <p className="text-gray-600">Meaning: good</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 gap-1">
                            <Volume2 className="h-3 w-3" />
                            Listen
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 gap-1">
                            <FileText className="h-3 w-3" />
                            Stroke Order
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                      <div className="flex flex-col items-center justify-center text-center">
                        <Camera className="mb-2 h-8 w-8 text-gray-400" />
                        <h4 className="mb-1 text-sm font-medium">Upload your written character</h4>
                        <p className="mb-4 text-xs text-gray-500">
                          Take a photo of your handwritten character or upload from your device
                        </p>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Character 3 */}
                  <div className="rounded-lg border border-gray-200 p-5">
                    <div className="mb-4 flex flex-wrap items-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100 text-4xl font-bold">
                        再
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">再 (zài)</h3>
                        <p className="text-gray-600">Meaning: again</p>
                        <div className="mt-1 flex items-center gap-2">
                          <Button variant="outline" size="sm" className="h-8 gap-1">
                            <Volume2 className="h-3 w-3" />
                            Listen
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 gap-1">
                            <FileText className="h-3 w-3" />
                            Stroke Order
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6">
                      <div className="flex flex-col items-center justify-center text-center">
                        <Camera className="mb-2 h-8 w-8 text-gray-400" />
                        <h4 className="mb-1 text-sm font-medium">Upload your written character</h4>
                        <p className="mb-4 text-xs text-gray-500">
                          Take a photo of your handwritten character or upload from your device
                        </p>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Upload className="h-4 w-4" />
                          Upload Photo
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button onClick={goToPreviousTab} variant="outline" className="gap-2">
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button className="gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                      <Send className="h-4 w-4" />
                      Submit All Characters
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
