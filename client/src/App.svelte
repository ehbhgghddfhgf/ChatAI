<script lang="ts">
  import { onMount, tick } from 'svelte'
  import { get } from 'svelte/store'
  import { browser } from './lib/browser'
  import { getRecognitionLocale, locale, t } from './lib/i18n'
  import { deriveChatTitle } from './lib/chat/title'
  import { toApiMessages } from './lib/chat/messages'
  import { hydrateChats, persistChats } from './lib/chat/storage'
  import type { ChatMessage, ChatResponse, ChatSession } from './lib/chat/types'
  import LanguageSwitcher from './components/layout/LanguageSwitcher.svelte'
  import Sidebar from './components/chat/Sidebar.svelte'
  import ConversationThread from './components/chat/ConversationThread.svelte'
  import Composer from './components/chat/Composer.svelte'

  type SpeechRecognitionConstructor = new () => SpeechRecognition

  let message = ''
  let chats: ChatSession[] = []
  let activeChatId = ''
  let activeChat: ChatSession | null = null
  let messages: ChatMessage[] = []
  let error = ''
  let isLoading = false
  let isRecording = false
  let threadElement: HTMLDivElement | null = null

  const company = import.meta.env.VITE_COMPANY_NAME ?? 'Perfect_03'
  const SpeechRecognitionApi = browser
    ? ((window.SpeechRecognition || window.webkitSpeechRecognition) as
        | SpeechRecognitionConstructor
        | undefined)
    : undefined

  const supportsSpeechRecognition = Boolean(SpeechRecognitionApi)

  $: activeChat = chats.find((entry) => entry.id === activeChatId) ?? null
  $: messages = activeChat?.messages ?? []

  function createId(): string {
    return `${Date.now()}-${crypto.randomUUID()}`
  }

  function createEmptyChat(): ChatSession {
    const now = Date.now()

    return {
      id: createId(),
      title: get(t)('sidebar.untitled'),
      messages: [],
      createdAt: now,
      updatedAt: now
    }
  }

  function syncChats() {
    persistChats(chats, activeChatId)
  }

  function ensureInitialChat() {
    const initialChat = createEmptyChat()
    chats = [initialChat]
    activeChatId = initialChat.id
  }

  function updateActiveChat(
    updater: (chat: ChatSession) => ChatSession,
    targetChatId = activeChatId
  ) {
    chats = chats.map((entry) => (entry.id === targetChatId ? updater(entry) : entry))
    syncChats()
  }

  async function scrollThreadToBottom(): Promise<void> {
    await tick()
    threadElement?.scrollTo({
      top: threadElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  function createChat() {
    const nextChat = createEmptyChat()
    chats = [nextChat, ...chats]
    activeChatId = nextChat.id
    message = ''
    error = ''
    syncChats()
  }

  function openChat(chatId: string) {
    activeChatId = chatId
    error = ''
    message = ''
    syncChats()
  }

  function handleMessageChange(value: string) {
    message = value
  }

  function startVoiceInput() {
    if (!SpeechRecognitionApi || isRecording) {
      return
    }

    error = ''
    const recognition = new SpeechRecognitionApi()

    recognition.lang = getRecognitionLocale(get(locale))
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      isRecording = true
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim() || ''

      if (transcript) {
        message = transcript
      }
    }

    recognition.onerror = () => {
      error = get(t)('voice.recognitionError')
      isRecording = false
    }

    recognition.onend = () => {
      isRecording = false
    }

    recognition.start()
  }

  async function submitMessage() {
    const trimmedMessage = message.trim()
    if (!trimmedMessage || isLoading || !activeChat) {
      return
    }

    isLoading = true
    error = ''
    message = ''

    const targetChatId = activeChat.id
    const userMessage: ChatMessage = {
      id: createId(),
      role: 'user',
      content: trimmedMessage
    }

    const placeholderMessage: ChatMessage = {
      id: createId(),
      role: 'assistant',
      content: get(t)('response.thinking'),
      state: 'loading'
    }

    const requestMessages = toApiMessages(activeChat.messages, userMessage)

    updateActiveChat(
      (chat) => ({
        ...chat,
        title:
          chat.messages.length === 0
            ? deriveChatTitle(trimmedMessage, get(t)('sidebar.untitled'))
            : chat.title,
        messages: [...chat.messages, userMessage, placeholderMessage],
        updatedAt: Date.now()
      }),
      targetChatId
    )

    await scrollThreadToBottom()

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? ''}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: requestMessages
        })
      })

      const data = (await response.json()) as ChatResponse

      if (!response.ok) {
        throw new Error(data.error || get(t)('errors.serverFallback'))
      }

      updateActiveChat(
        (chat) => ({
          ...chat,
          messages: chat.messages.map((entry) =>
            entry.id === placeholderMessage.id
              ? {
                  ...entry,
                  content: data.reply || '',
                  state: undefined
                }
              : entry
          ),
          updatedAt: Date.now()
        }),
        targetChatId
      )
    } catch (requestError: unknown) {
      const fallbackMessage =
        requestError instanceof Error ? requestError.message : get(t)('errors.unexpected')

      error = fallbackMessage
      updateActiveChat(
        (chat) => ({
          ...chat,
          messages: chat.messages.map((entry) =>
            entry.id === placeholderMessage.id
              ? {
                  ...entry,
                  content: `${get(t)('response.errorPrefix')}: ${fallbackMessage}`,
                  state: 'error'
                }
              : entry
          ),
          updatedAt: Date.now()
        }),
        targetChatId
      )
    } finally {
      isLoading = false
      await scrollThreadToBottom()
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault()
      submitMessage()
    }
  }

  onMount(() => {
    const persistedState = hydrateChats()

    if (persistedState) {
      chats = persistedState.chats
      activeChatId = persistedState.activeChatId
    } else {
      ensureInitialChat()
    }

    scrollThreadToBottom()
  })
</script>

<svelte:head>
<!-- Да, нет смысла без SSR (т.к. решил обойтись без SvelteKit). Тем не менее на будущее -->
  <title>{$t('meta.title')}</title>
</svelte:head>

<main class="page-shell">
  <LanguageSwitcher />

  <section class="app-layout">
    <Sidebar {chats} {activeChatId} onCreateChat={createChat} onOpenChat={openChat} />

    <section class="chat-shell">
      <header class="chat-header">
        <div class="header-copy">
          <p class="eyebrow">{company}</p>
          <h1>{$t('hero.title')}</h1>
        </div>
      </header>

      <ConversationThread {company} {messages} bind:threadElement />

      <Composer
        {message}
        {isLoading}
        {isRecording}
        {supportsSpeechRecognition}
        onMessageChange={handleMessageChange}
        onKeydown={handleKeydown}
        onVoiceInput={startVoiceInput}
        onSubmit={submitMessage}
      />

      {#if error}
        <div class="global-error">{error}</div>
      {/if}
    </section>
  </section>
</main>

<style>
  .app-layout {
    width: min(1280px, 100%);
    height: calc(100vh - 52px);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 300px minmax(0, 1fr);
    gap: 18px;
    min-height: 0;
  }

  .chat-shell {
    min-height: 0;
    height: 100%;
    display: grid;
    grid-template-rows: auto minmax(0, 1fr) auto auto;
    gap: 18px;
    overflow: hidden;
  }

  .chat-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 8px 4px 0;
  }

  .header-copy h1 {
    margin: 6px 0 0;
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    line-height: 0.94;
  }

  .global-error {
    color: var(--danger);
    font-size: 0.95rem;
  }

  @media (max-width: 960px) {
    .app-layout {
      grid-template-columns: 1fr;
      height: auto;
    }
  }

  @media (max-width: 720px) {
    .chat-shell {
      height: auto;
      min-height: auto;
      gap: 14px;
      overflow: visible;
    }

    .chat-header {
      flex-direction: column;
      align-items: stretch;
    }
  }
</style>
