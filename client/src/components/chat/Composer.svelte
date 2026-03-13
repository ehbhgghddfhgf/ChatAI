<script lang="ts">
  import { t } from '../../lib/i18n'

  type Props = {
    message: string
    isLoading: boolean
    isRecording: boolean
    supportsSpeechRecognition: boolean
    onMessageChange: (value: string) => void
    onKeydown: (event: KeyboardEvent) => void
    onVoiceInput: () => void
    onSubmit: () => void
  }

  let {
    message,
    isLoading,
    isRecording,
    supportsSpeechRecognition,
    onMessageChange,
    onKeydown,
    onVoiceInput,
    onSubmit
  }: Props = $props()
</script>

<div class="composer-shell">
  <textarea
    value={message}
    class="composer-input"
    rows="2"
    id="message"
    placeholder={$t('composer.placeholder')}
    oninput={(event) => onMessageChange((event.currentTarget as HTMLTextAreaElement).value)}
    onkeydown={onKeydown}
  ></textarea>

  <div class="composer-footer">
    <p class="composer-hint">{$t('composer.hint')}</p>

    <div class="composer-actions">
      <button
        type="button"
        class="secondary-button microphone-button"
        class:is-recording={isRecording}
        onclick={onVoiceInput}
        disabled={!supportsSpeechRecognition || isRecording}
        title={!supportsSpeechRecognition ? $t('voice.unsupported') : ''}
      >
        {#if isRecording}
          <span class="recording-indicator" aria-hidden="true"></span>
          <span>{$t('actions.listening')}</span>
        {:else}
          <svg
            class="microphone-icon"
            aria-hidden="true"
            focusable="false"
            viewBox="0 -960 960 960"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M480-400q-50 0-85-35t-35-85v-240q0-50 35-85t85-35q50 0 85 35t35 85v240q0 50-35 85t-85 35Zm-40 280v-123q-104-14-172-93t-68-184h80q0 83 58.5 141.5T480-320q83 0 141.5-58.5T680-520h80q0 105-68 184t-172 93v123h-80Z"
            ></path>
          </svg>
        {/if}
      </button>

      <button type="button" class="primary-button" onclick={onSubmit} disabled={isLoading}>
        {#if isLoading}
          {$t('actions.sending')}
        {:else}
          {$t('actions.send')}
        {/if}
      </button>
    </div>
  </div>
</div>

<style>
  .composer-shell {
    padding: 16px;
    border: 1px solid var(--line);
    border-radius: 28px;
    background: var(--surface);
    backdrop-filter: blur(12px);
  }

  .composer-input {
    width: 100%;
    min-height: 88px;
    resize: vertical;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--text);
    outline: none;
  }

  .composer-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding-top: 14px;
    border-top: 1px solid rgba(85, 60, 23, 0.08);
  }

  .composer-hint {
    margin: 0;
    color: var(--muted);
    font-size: 0.92rem;
  }

  .composer-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .microphone-button {
    min-width: 58px;
    padding-inline: 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }

  .microphone-icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
    transition: transform 0.22s ease, fill 0.22s ease;
  }

  .microphone-button:hover:enabled .microphone-icon {
    transform: translateY(-1px) scale(1.04);
  }

  .microphone-button.is-recording {
    background: rgba(190, 91, 44, 0.16);
    color: var(--primary);
    position: relative;
  }

  .microphone-button.is-recording::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 999px;
    border: 1px solid rgba(190, 91, 44, 0.26);
    animation: microphone-pulse 1.4s ease-out infinite;
  }

  .recording-indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--primary);
    box-shadow: 0 0 0 0 rgba(190, 91, 44, 0.35);
    animation: recording-dot 1.05s ease-in-out infinite;
  }

  @keyframes microphone-pulse {
    0% {
      opacity: 0.85;
      transform: scale(1);
    }

    70% {
      opacity: 0;
      transform: scale(1.08);
    }

    100% {
      opacity: 0;
      transform: scale(1.1);
    }
  }

  @keyframes recording-dot {
    0%,
    100% {
      transform: scale(0.85);
      box-shadow: 0 0 0 0 rgba(190, 91, 44, 0.36);
    }

    50% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(190, 91, 44, 0);
    }
  }

  @media (max-width: 720px) {
    .composer-footer {
      flex-direction: column;
      align-items: stretch;
    }

    .composer-actions {
      width: 100%;
    }
  }
</style>
