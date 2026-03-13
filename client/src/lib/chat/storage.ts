import { browser } from '../browser'
import type { ChatSession } from './types'

export const SESSION_STORAGE_KEY = 'chat-session-history'

type PersistedChatState = {
  chats: ChatSession[]
  activeChatId: string
}

export function persistChats(chats: ChatSession[], activeChatId: string) {
  if (!browser) {
    return
  }

  const payload: PersistedChatState = {
    chats,
    activeChatId
  }

  window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(payload))
}

export function hydrateChats() {
  if (!browser) {
    return null
  }

  const rawState = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (!rawState) {
    return null
  }

  try {
    const parsed = JSON.parse(rawState) as Partial<PersistedChatState>

    if (!Array.isArray(parsed.chats) || parsed.chats.length === 0) {
      return null
    }

    const resolvedActiveChatId =
      typeof parsed.activeChatId === 'string' &&
      parsed.chats.some((entry) => entry.id === parsed.activeChatId)
        ? parsed.activeChatId
        : parsed.chats[0].id

    return {
      chats: parsed.chats,
      activeChatId: resolvedActiveChatId
    }
  } catch {
    return null
  }
}
