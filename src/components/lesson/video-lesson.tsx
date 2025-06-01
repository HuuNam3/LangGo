"use client"

import { useState } from "react"
import { PlayCircle, ChevronLeft, Download, Bookmark, Clock, Volume2, Settings, Pause } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Image from "next/image"

export default function VideoLesson() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, ] = useState(25)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [notes, setNotes] = useState("")
  const [playbackSpeed, setPlaybackSpeed] = useState(1)

  const goToPreviousTab = () => {
    console.log("Going to previous tab")
  }

  const goToNextTab = () => {
    console.log("Going to next tab")
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const downloadTranscript = () => {
    const transcript = `Video Transcript - Basic Mandarin Greetings

0:00 - Introduction to basic greetings in Mandarin
0:45 - How to say "Hello" (你好 / Nǐ hǎo) with proper pronunciation
1:30 - Morning greetings (早上好 / Zǎoshang hǎo) and when to use them
2:15 - Evening greetings (晚上好 / Wǎnshang hǎo) with examples
3:00 - How to say "Goodbye" (再见 / Zàijiàn) and other parting phrases
4:30 - Practice dialogue with all the greetings`

    const blob = new Blob([transcript], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "mandarin-greetings-transcript.txt"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="overflow-hidden max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Video Lesson</h2>
            <p className="text-purple-100 text-sm">Basic Mandarin Greetings</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              <Clock className="h-3 w-3 mr-1" />
              5:30
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className="text-white hover:bg-white/20"
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 rounded-lg bg-purple-50 p-4">
          <div className="flex items-start gap-3">
            <PlayCircle className="mt-0.5 h-5 w-5 text-purple-600" />
            <div>
              <p className="font-medium text-purple-800">Watch and Learn</p>
              <p className="text-gray-700">
                Watch the video lesson to learn proper pronunciation and see the greetings used in context.
              </p>
            </div>
          </div>
        </div>

        {/* Enhanced Video Player */}
        <div className="mb-8 aspect-video overflow-hidden rounded-lg bg-gray-100 relative">
          <div className="relative h-full w-full">
            <Image
              src="/images/basic-en.jpg"
              alt="Video Lesson"
              width={854}
                height={480}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={togglePlay}
                className="rounded-full bg-white/90 p-3 text-purple-600 hover:bg-white shadow-lg"
              >
                {isPlaying ? <Pause className="h-10 w-10" /> : <PlayCircle className="h-10 w-10" />}
              </Button>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <div className="flex items-center gap-3 text-white">
                <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20 p-1">
                  {isPlaying ? <Pause className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
                </Button>

                <div className="flex-1">
                  <Progress value={progress} className="h-1" />
                </div>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    className="bg-transparent text-white text-sm border-0 outline-0"
                  >
                    <option value={0.5} className="text-black">
                      0.5x
                    </option>
                    <option value={0.75} className="text-black">
                      0.75x
                    </option>
                    <option value={1} className="text-black">
                      1x
                    </option>
                    <option value={1.25} className="text-black">
                      1.25x
                    </option>
                    <option value={1.5} className="text-black">
                      1.5x
                    </option>
                  </select>
                  <Settings className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subtitle Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="subtitles" checked={showSubtitles} onCheckedChange={setShowSubtitles} />
            <Label htmlFor="subtitles">Show Subtitles</Label>
          </div>
          <Button variant="outline" size="sm" onClick={downloadTranscript} className="gap-2">
            <Download className="h-4 w-4" />
            Download Transcript
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-3 text-lg font-semibold">Video Transcript</h3>
              <div className="space-y-4 text-gray-700 max-h-64 overflow-y-auto">
                <p>
                  <span className="font-medium text-purple-600 cursor-pointer hover:underline">0:00</span> -
                  Introduction to basic greetings in Mandarin
                </p>
                <p>
                  <span className="font-medium text-purple-600 cursor-pointer hover:underline">0:45</span> - How to say
                  &quot;Hello&quot; (你好 / Nǐ hǎo) with proper pronunciation
                </p>
                <p>
                  <span className="font-medium text-purple-600 cursor-pointer hover:underline">1:30</span> - Morning
                  greetings (早上好 / Zǎoshang hǎo) and when to use them
                </p>
                <p>
                  <span className="font-medium text-purple-600 cursor-pointer hover:underline">2:15</span> - Evening
                  greetings (晚上好 / Wǎnshang hǎo) with examples
                </p>
                <p>
                  <span className="font-medium text-purple-600 cursor-pointer hover:underline">3:00</span> - How to say
                  &quot;Goodbye&quot; (再见 / Zàijiàn) and other parting phrases
                </p>
                <p>
                  <span className="font-medium text-purple-600 cursor-pointer hover:underline">4:30</span> - Practice
                  dialogue with all the greetings
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-3 text-lg font-semibold">Key Points from the Video</h3>
              <ul className="list-inside list-disc space-y-2 text-gray-700">
                <li>Pay attention to the tones when saying &quot;你好&quot; (Nǐ hǎo) - third tone followed by third tone</li>
                <li>In casual settings, you can simply say &quot;你好&quot; (Nǐ hǎo) regardless of the time of day</li>
                <li>The greeting &quot;你吃饭了吗?&quot; (Nǐ chīfàn le ma?) is a common conversation starter</li>
                <li>When saying goodbye, &quot;再见&quot; (Zàijiàn) is appropriate in most situations</li>
              </ul>
            </div>
          </div>

          {/* Student Notes Section */}
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-3 text-lg font-semibold">My Notes</h3>
              <Textarea
                placeholder="Take notes while watching the video..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-32 resize-none"
              />
              <div className="mt-2 text-xs text-gray-500">Notes are automatically saved as you type</div>
            </div>

            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <h3 className="mb-2 text-lg font-semibold text-green-800">Progress Tracking</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Video Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
                <p className="text-xs text-green-700">Great job! You&apos;re making steady progress through this lesson.</p>
              </div>
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
  )
}
