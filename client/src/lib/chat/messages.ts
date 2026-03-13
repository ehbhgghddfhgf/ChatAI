import type { ChatMessage } from './types'

export function toApiMessages(history: ChatMessage[], nextUserMessage: ChatMessage) {
  return [...history, nextUserMessage]
    .filter((entry) => entry.state !== 'loading' && entry.state !== 'error')
    .map((entry) => ({
      role: entry.role,
      content: entry.content
    }))
}
