import { derived, writable } from 'svelte/store'
import { browser } from '../browser'
import { supportedLocales, translations, type Locale } from './translations'

const DEFAULT_LOCALE: Locale = 'ru'
const STORAGE_KEY = 'app-locale'

const recognitionLocaleMap: Record<Locale, string> = {
  ru: 'ru-RU',
  kk: 'kk-KZ',
  en: 'en-US'
}

const localeLabelMap: Record<Locale, string> = {
  ru: 'Русский',
  kk: 'Қазақша',
  en: 'English'
}

function isSupportedLocale(value: string): value is Locale {
  return (supportedLocales as readonly string[]).includes(value)
}

function detectLocale() {
  if (!browser) {
    return DEFAULT_LOCALE
  }

  const storedLocale = window.localStorage.getItem(STORAGE_KEY)
  if (storedLocale && isSupportedLocale(storedLocale)) {
    return storedLocale
  }

  const browserLocales = navigator.languages?.length ? navigator.languages : [navigator.language]

  for (const entry of browserLocales) {
    const normalized = entry.toLowerCase().split('-')[0]
    if (isSupportedLocale(normalized)) {
      return normalized
    }
  }

  return DEFAULT_LOCALE
}

function resolveTranslation(dictionary: Object, key: string) {
  return key.split('.').reduce<unknown>((currentValue, segment) => {
    if (currentValue && typeof currentValue === 'object' && segment in currentValue) {
      return (currentValue as Record<string, unknown>)[segment]
    }

    return ''
  }, dictionary) as string
}

export const locale = writable<Locale>(detectLocale())

export const t = derived(locale, ($locale) => {
  const dictionary = translations[$locale]

  return (key: string): string => resolveTranslation(dictionary, key)
})

export function setLocale(nextLocale: Locale) {
  locale.set(nextLocale)
}

export function getRecognitionLocale(currentLocale: Locale) {
  return recognitionLocaleMap[currentLocale]
}

export const localeOptions = supportedLocales.map((value) => ({
  value,
  label: localeLabelMap[value]
}))

if (browser) {
  locale.subscribe((currentLocale) => {
    window.localStorage.setItem(STORAGE_KEY, currentLocale)
    document.documentElement.lang = currentLocale
  })
}

export type { Locale }
