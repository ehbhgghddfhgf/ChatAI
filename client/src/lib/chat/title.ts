const MAX_TITLE_LENGTH = 42

export function deriveChatTitle(content: string, fallbackTitle: string): string {
  const trimmed = content.replace(/\s+/g, ' ').trim()

  if (!trimmed) {
    return fallbackTitle
  }

  if (trimmed.length <= MAX_TITLE_LENGTH) {
    return trimmed
  }

  return `${trimmed.slice(0, MAX_TITLE_LENGTH).trimEnd()}...`
}
