import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import { useCallback } from "react"

interface PronunciationButtonProps {
  chinese: string
  pinyin: string
  variant?: "ghost" | "outline"
  className?: string
}

export function PronunciationButton({
  chinese,
  pinyin,
  variant = "ghost",
  className = "",
}: PronunciationButtonProps) {
  const speak = useCallback((text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'zh-CN'
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }, [])

  const handleClick = () => {
    // Speak Chinese first, then pinyin after a delay
    speak(chinese)
    setTimeout(() => speak(pinyin), 1500)
  }

  return (
    <Button
      variant={variant}
      size="sm"
      className={`text-purple-600 ${className}`}
      onClick={handleClick}
    >
      <Volume2 className="h-4 w-4" />
    </Button>
  )
} 