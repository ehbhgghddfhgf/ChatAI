<script lang="ts">
  import { t } from '../../lib/i18n'
  import type { ChatMessage } from '../../lib/chat/types'

  type Props = {
    entry: ChatMessage
  }

  let { entry }: Props = $props()
</script>

<article
  class:user-message={entry.role === 'user'}
  class:assistant-message={entry.role === 'assistant'}
  class="message-row"
>
  <div class="message-avatar">
    {#if entry.role === 'user'}
      {$t('message.you').slice(0, 1)}
    {:else}
      AI
    {/if}
  </div>

  <div
    class="message-bubble"
    class:loading-message={entry.state === 'loading'}
    class:error-message={entry.state === 'error'}
  >
    <p class="message-role">
      {entry.role === 'user' ? $t('message.you') : $t('message.assistant')}
    </p>
    <p class="message-content">{entry.content}</p>
  </div>
</article>

<style>
  .message-row {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 14px;
    align-items: flex-start;
  }

  .user-message {
    grid-template-columns: minmax(0, 1fr) 40px;
  }

  .user-message .message-avatar {
    order: 2;
    background: rgba(190, 91, 44, 0.18);
    color: var(--primary);
  }

  .user-message .message-bubble {
    order: 1;
    background: var(--user);
    margin-left: auto;
  }

  .assistant-message .message-bubble {
    background: var(--assistant);
  }

  .message-avatar {
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: rgba(36, 24, 7, 0.08);
    color: var(--text);
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.08em;
  }

  .message-bubble {
    width: min(100%, 720px);
    padding: 16px 18px;
    border: 1px solid rgba(85, 60, 23, 0.08);
    border-radius: 24px;
  }

  .message-role {
    margin: 0 0 6px;
    color: var(--muted);
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    overflow-wrap: break-word;
  }

  .message-content {
    margin: 0;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    line-height: 1.65;
  }

  .loading-message .message-content {
    color: var(--muted);
  }

  .error-message {
    background: var(--danger-bg) !important;
    color: var(--danger);
  }

  @media (max-width: 720px) {
    .message-row,
    .user-message {
      grid-template-columns: 32px minmax(0, 1fr);
    }

    .user-message .message-avatar {
      order: 0;
    }

    .user-message .message-bubble {
      order: 0;
      margin-left: 0;
    }

    .message-avatar {
      width: 32px;
      height: 32px;
      font-size: 0.72rem;
    }
  }
</style>
