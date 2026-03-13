/// <reference types="vite/client" />

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition
    webkitSpeechRecognition?: new () => SpeechRecognition
    __APP_CONFIG__?: {
      VITE_COMPANY_NAME?: string
      VITE_API_BASE_URL?: string
    }
  }

  interface SpeechRecognition extends EventTarget {
    lang: string
    interimResults: boolean
    maxAlternatives: number
    onstart: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onend: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onerror: ((this: SpeechRecognition, ev: Event) => unknown) | null
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => unknown) | null
    start()
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList
  }
}

export {}
