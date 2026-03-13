<script lang="ts">
  import { locale, localeOptions, setLocale, t } from '../../lib/i18n'
</script>

<div
  class="language-switcher language-switcher-floating"
  role="group"
  aria-label={$t('language.label')}
>
  {#each localeOptions as option}
    <button
      type="button"
      class:active-locale={$locale === option.value}
      class="locale-segment"
      onclick={() => setLocale(option.value)}
      aria-pressed={$locale === option.value}
    >
      {option.value.toUpperCase()}
    </button>
  {/each}
</div>

<style>
  .language-switcher {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .language-switcher-floating {
    position: absolute;
    z-index: 2;
    top: 24px;
    right: 24px;
  }

  .locale-segment {
    min-width: 54px;
    padding: 10px 14px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.72);
    color: var(--text);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    cursor: pointer;
    text-transform: uppercase;
    outline: none;
    transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
  }

  .locale-segment:hover:enabled {
    transform: translateY(-1px);
  }

  .locale-segment.active-locale {
    background: var(--primary);
    color: #fff8f1;
    border-color: transparent;
  }

  .locale-segment:focus-visible {
    border-color: rgba(190, 91, 44, 0.75);
    box-shadow: 0 0 0 4px rgba(190, 91, 44, 0.12);
  }

  @media (max-width: 720px) {
    .language-switcher-floating {
      top: 16px;
      right: 16px;
      left: 16px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }

    .locale-segment {
      width: 100%;
    }
  }
</style>
