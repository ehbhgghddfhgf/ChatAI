export const supportedLocales = ['ru', 'kk', 'en'] as const

export type Locale = (typeof supportedLocales)[number]

export const translations: Record<Locale, Object> = {
  ru: {
    meta: {
      title: 'AI Chat'
    },
    language: {
      label: 'Язык',
      ru: 'Русский',
      kk: 'Қазақша',
      en: 'English'
    },
    hero: {
      badge: 'Svelte + Express',
      title: 'Чат с AI'
    },
    sidebar: {
      title: 'Чаты',
      empty: 'Пока нет сохраненных диалогов в этой сессии.',
      untitled: 'Новый чат'
    },
    empty: {
      title: 'Начните новый диалог',
      body: 'Задайте вопрос, продиктуйте запрос голосом или протестируйте несколько сообщений подряд.'
    },
    composer: {
      placeholder: 'Напишите сообщение...',
      hint: 'Enter для новой строки, Ctrl/Cmd+Enter для отправки'
    },
    actions: {
      send: 'Отправить',
      sending: 'Отправка...',
      microphone: 'Микрофон',
      listening: 'Слушаю...',
      newChat: 'Новый чат'
    },
    voice: {
      unsupported: 'Браузер не поддерживает голосовой ввод',
      recognitionError: 'Не удалось распознать голос. Проверьте доступ к микрофону.'
    },
    response: {
      thinking: 'Модель формирует ответ...',
      errorPrefix: 'Ошибка'
    },
    message: {
      you: 'Вы',
      assistant: 'Ассистент'
    },
    errors: {
      serverFallback: 'Не удалось получить ответ от сервера.',
      unexpected: 'Произошла непредвиденная ошибка.'
    }
  },
  kk: {
    meta: {
      title: 'AI Chat'
    },
    language: {
      label: 'Тіл',
      ru: 'Русский',
      kk: 'Қазақша',
      en: 'English'
    },
    hero: {
      badge: 'Svelte + Express',
      title: 'AI чаты'
    },
    sidebar: {
      title: 'Чаттар',
      empty: 'Осы сессияда сақталған диалогтар әлі жоқ.',
      untitled: 'Жаңа чат'
    },
    empty: {
      title: 'Жаңа диалогты бастаңыз',
      body: 'Сұрақ қойыңыз, дауыспен сұрау енгізіңіз немесе бірнеше хабарламаны қатар тексеріп көріңіз.'
    },
    composer: {
      placeholder: 'Хабарлама жазыңыз...',
      hint: 'Жаңа жол үшін Enter, жіберу үшін Ctrl/Cmd+Enter'
    },
    actions: {
      send: 'Жіберу',
      sending: 'Жіберілуде...',
      microphone: 'Микрофон',
      listening: 'Тыңдап тұрмын...',
      newChat: 'Жаңа чат'
    },
    voice: {
      unsupported: 'Браузер дауыстық енгізуді қолдамайды',
      recognitionError: 'Дауысты тану сәтсіз аяқталды. Микрофонға рұқсатты тексеріңіз.'
    },
    response: {
      thinking: 'Модель жауап дайындап жатыр...',
      errorPrefix: 'Қате'
    },
    message: {
      you: 'Сіз',
      assistant: 'Ассистент'
    },
    errors: {
      serverFallback: 'Серверден жауап алу мүмкін болмады.',
      unexpected: 'Күтпеген қате орын алды.'
    }
  },
  en: {
    meta: {
      title: 'AI Chat'
    },
    language: {
      label: 'Language',
      ru: 'Русский',
      kk: 'Қазақша',
      en: 'English'
    },
    hero: {
      badge: 'Svelte + Express',
      title: 'AI Chat'
    },
    sidebar: {
      title: 'Chats',
      empty: 'There are no saved conversations in this session yet.',
      untitled: 'New chat'
    },
    empty: {
      title: 'Start a new conversation',
      body: 'Ask a question, dictate a prompt with voice input, or test a sequence of messages.'
    },
    composer: {
      placeholder: 'Write a message...',
      hint: 'Enter for a new line, Ctrl/Cmd+Enter to send'
    },
    actions: {
      send: 'Send',
      sending: 'Sending...',
      microphone: 'Microphone',
      listening: 'Listening...',
      newChat: 'New chat'
    },
    voice: {
      unsupported: 'Your browser does not support voice input',
      recognitionError: 'Voice recognition failed. Check microphone permissions.'
    },
    response: {
      thinking: 'The model is preparing a reply...',
      errorPrefix: 'Error'
    },
    message: {
      you: 'You',
      assistant: 'Assistant'
    },
    errors: {
      serverFallback: 'Could not get a response from the server.',
      unexpected: 'An unexpected error occurred.'
    }
  }
}
