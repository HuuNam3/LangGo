import { useCallback } from 'react'

export function useSpeech() {
  const speak = useCallback((text: string) => {
    // Check if we're in the browser and if speech synthesis is available
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      // Set language to Mandarin Chinese
      utterance.lang = 'zh-CN'
      // Adjust the speech rate to be slightly slower for better clarity
      utterance.rate = 0.8
      
      window.speechSynthesis.speak(utterance)
    } else {
      console.warn('Speech synthesis is not supported in this environment')
    }
  }, [])

  return { speak }
} 