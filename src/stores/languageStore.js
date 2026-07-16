import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useLanguageStore = create(
  persist(
    (set) => ({
      language: 'en', // Default fallback
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'language-storage', // Zustand automatically handles localStorage!
    }
  )
)

export default useLanguageStore