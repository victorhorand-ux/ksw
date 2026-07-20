import useLanguageStore from '../stores/languageStore'

export function useTranslation(translations) {
  // By subscribing to the string directly, React knows to re-render!
  const language = useLanguageStore((state) => state.language)

  const t = (key) => {
    return translations[language]?.[key] || translations.en?.[key] || key
  }

  return { t, language }
}