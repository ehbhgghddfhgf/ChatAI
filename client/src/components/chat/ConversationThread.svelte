<script lang="ts">
  import { t } from '../../lib/i18n'
  import MessageBubble from './MessageBubble.svelte'
  import type { ChatMessage } from '../../lib/chat/types'

  type Props = {
    company: string
    messages: ChatMessage[]
    threadElement?: HTMLDivElement | null
  }

  let { messages, threadElement = $bindable(null) }: Props = $props()
</script>

<div class="conversation-thread" bind:this={threadElement}>
  {#if messages.length === 0}
    <div class="empty-state">
      <h2>{$t('empty.title')}</h2>
      <p>{$t('empty.body')}</p>
    </div>
  {:else}
    {#each messages as entry (entry.id)}
      <MessageBubble {entry} />
    {/each}
  {/if}
</div>

<style>
  .conversation-thread {
    min-height: 0;
    height: 100%;
    overflow-y: auto;
    padding: 18px;
    border: 1px solid var(--line);
    border-radius: 30px;
    background: var(--surface);
    backdrop-filter: blur(12px);
  }

  .conversation-thread :global(.message-row + .message-row) {
    margin-top: 16px;
  }

  .empty-state {
    min-height: 100%;
    display: grid;
    place-content: center;
    gap: 12px;
    text-align: center;
    padding: 48px 18px;
  }

  .empty-state h2 {
    margin: 0;
    font-size: clamp(1.6rem, 4vw, 2.4rem);
  }

  .empty-state p {
    max-width: 50ch;
    margin: 0;
    color: var(--muted);
    line-height: 1.65;
  }

  @media (max-width: 720px) {
    .conversation-thread {
      min-height: 360px;
      height: auto;
      padding: 14px;
      border-radius: 24px;
    }
  }
</style>
