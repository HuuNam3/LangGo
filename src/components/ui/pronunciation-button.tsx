import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"
import { useCallback } from "react"

interface PronunciationButtonProps {
  text: string
  language: string // e.g. "english", "vietnamese", "chinese"
  variant?: "ghost" | "outline"
  className?: string
}

// Mapping tên thường sang mã chuẩn
const languageMap: Record<string, string> = {
  english: "en-US",
  vietnamese: "vi-VN",
  chinese: "zh-CN",
  japanese: "ja-JP",
  korean: "ko-KR",
  french: "fr-FR",
  spanish: "es-ES",
  german: "de-DE",
}

export function PronunciationButton({
  text,
  language,
  variant = "ghost",
  className = "",
}: PronunciationButtonProps) {
  const langCode = languageMap[language.toLowerCase()] || "en-US"

  const speak = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = langCode
    utterance.rate = 0.8
    window.speechSynthesis.speak(utterance)
  }, [text, langCode])

  return (
    <Button
      variant={variant}
      size="sm"
      className={`text-purple-600 ${className}`}
      onClick={speak}
    >
      <Volume2 className="h-4 w-4" />
    </Button>
  )
}
