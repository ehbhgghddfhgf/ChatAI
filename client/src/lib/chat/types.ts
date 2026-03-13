export type ChatRole = 'user' | 'assistant'

export type ApiChatMessage = {
  role: ChatRole
  content: string
}

export type ChatMessageState = 'loading' | 'error'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
  state?: ChatMessageState
}

export type ChatSession = {
  id: string
  title: string
  messages: ChatMessage[]
  createdAt: number
  updatedAt: number
}

export type ChatResponse = {
  reply?: string
  error?: string
}
