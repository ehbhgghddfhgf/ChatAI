<script lang="ts">
  import { t } from '../../lib/i18n'
  import type { ChatSession } from '../../lib/chat/types'

  type Props = {
    chats: ChatSession[]
    activeChatId: string
    onCreateChat: () => void
    onOpenChat: (chatId: string) => void
  }

  let { chats, activeChatId, onCreateChat, onOpenChat }: Props = $props()
</script>

<aside class="sidebar">
  <div class="sidebar-header">
    <div>
      <p class="eyebrow">{$t('hero.badge')}</p>
      <h2>{$t('sidebar.title')}</h2>
    </div>

    <button type="button" class="ghost-button sidebar-button" onclick={onCreateChat}>
      {$t('actions.newChat')}
    </button>
  </div>

  <div class="chat-list">
    {#if chats.length === 0}
      <p class="sidebar-empty">{$t('sidebar.empty')}</p>
    {:else}
      {#each chats as chat (chat.id)}
        <button
          type="button"
          class:active-chat={chat.id === activeChatId}
          class="chat-list-item"
          onclick={() => onOpenChat(chat.id)}
        >
          <span class="chat-list-title">{chat.title || $t('sidebar.untitled')}</span>
          <span class="chat-list-preview">
            {chat.messages.at(-1)?.content || $t('sidebar.empty')}
          </span>
        </button>
      {/each}
    {/if}
  </div>
</aside>

<style>
  .sidebar {
    padding: 18px;
    border: 1px solid var(--line);
    border-radius: 28px;
    background: var(--surface);
    box-shadow: var(--shadow);
    backdrop-filter: blur(12px);
    display: grid;
    grid-template-rows: auto minmax(0, 1fr);
    gap: 16px;
    min-height: 0;
  }

  .sidebar-header {
    display: grid;
    gap: 12px;
  }

  .sidebar-header h2 {
    margin: 6px 0 0;
    font-size: 1.65rem;
  }

  .sidebar-button {
    width: 100%;
  }

  .chat-list {
    display: grid;
    gap: 10px;
    align-content: start;
    overflow-y: auto;
    min-height: 0;
  }

  .sidebar-empty {
    margin: 0;
    color: var(--muted);
    line-height: 1.6;
  }

  .chat-list-item {
    display: grid;
    gap: 6px;
    width: 100%;
    padding: 14px;
    border: 1px solid transparent;
    border-radius: 20px;
    background: var(--surface-soft);
    text-align: left;
    color: var(--text);
    cursor: pointer;
    transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }

  .chat-list-item:hover {
    transform: translateY(-1px);
    border-color: var(--line);
  }

  .chat-list-item.active-chat {
    border-color: rgba(190, 91, 44, 0.24);
    background: rgba(190, 91, 44, 0.12);
  }

  .chat-list-title,
  .chat-list-preview {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .chat-list-title {
    white-space: nowrap;
    font-weight: 700;
  }

  .chat-list-preview {
    display: -webkit-box;
    color: var(--muted);
    font-size: 0.92rem;
    line-height: 1.45;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 960px) {
    .sidebar {
      grid-template-rows: auto auto;
    }

    .chat-list {
      grid-auto-flow: column;
      grid-auto-columns: minmax(220px, 1fr);
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 4px;
    }
  }
</style>
