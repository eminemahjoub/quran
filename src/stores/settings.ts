import { create } from "zustand";
import { getLocalStorageItem, safeJsonParse, setLocalStorageItem } from "@/lib/storage";
import type { ReadingMode, UiLanguage } from "@/lib/quran/catalog";

export type ThemePreference = "system" | "dark" | "light";

export type SettingsState = {
  theme: ThemePreference;
  uiLanguage: UiLanguage;
  readingMode: ReadingMode;
  translationId: number;
  transliteration: boolean;
  wordByWord: boolean;
  reciterId: number;
  fontSizeArabic: number; // px
  fontSizeTranslation: number; // px
  setTheme: (theme: ThemePreference) => void;
  setUiLanguage: (lang: UiLanguage) => void;
  setReadingMode: (mode: ReadingMode) => void;
  setTranslationId: (id: number) => void;
  setTransliteration: (enabled: boolean) => void;
  setWordByWord: (enabled: boolean) => void;
  setReciterId: (id: number) => void;
  setFontSizeArabic: (px: number) => void;
  setFontSizeTranslation: (px: number) => void;
};

const STORAGE_KEY = "noor-settings-v1";

type Persisted = Pick<
  SettingsState,
  | "theme"
  | "uiLanguage"
  | "readingMode"
  | "translationId"
  | "transliteration"
  | "wordByWord"
  | "reciterId"
  | "fontSizeArabic"
  | "fontSizeTranslation"
>;

function loadPersisted(): Partial<Persisted> {
  const raw = getLocalStorageItem(STORAGE_KEY);
  const parsed = safeJsonParse<Partial<Persisted>>(raw);
  return parsed ?? {};
}

function savePersisted(next: Persisted) {
  setLocalStorageItem(STORAGE_KEY, JSON.stringify(next));
}

export const useSettingsStore = create<SettingsState>((set, get) => {
  const persisted = typeof window === "undefined" ? {} : loadPersisted();

  const defaults: Persisted = {
    theme: "system",
    uiLanguage: "en",
    readingMode: "arabicTranslation",
    translationId: 20,
    transliteration: false,
    wordByWord: true,
    reciterId: 7,
    fontSizeArabic: 30,
    fontSizeTranslation: 16,
  };

  const initial: Persisted = { ...defaults, ...persisted };

  const persist = (partial: Partial<Persisted>) => {
    const current = get();
    const next: Persisted = {
      theme: partial.theme ?? current.theme,
      uiLanguage: partial.uiLanguage ?? current.uiLanguage,
      readingMode: partial.readingMode ?? current.readingMode,
      translationId: partial.translationId ?? current.translationId,
      transliteration: partial.transliteration ?? current.transliteration,
      wordByWord: partial.wordByWord ?? current.wordByWord,
      reciterId: partial.reciterId ?? current.reciterId,
      fontSizeArabic: partial.fontSizeArabic ?? current.fontSizeArabic,
      fontSizeTranslation: partial.fontSizeTranslation ?? current.fontSizeTranslation,
    };
    savePersisted(next);
  };

  return {
    ...initial,
    setTheme: (theme) => {
      set({ theme });
      persist({ theme });
    },
    setUiLanguage: (uiLanguage) => {
      set({ uiLanguage });
      persist({ uiLanguage });
    },
    setReadingMode: (readingMode) => {
      set({ readingMode });
      persist({ readingMode });
    },
    setTranslationId: (translationId) => {
      set({ translationId });
      persist({ translationId });
    },
    setTransliteration: (transliteration) => {
      set({ transliteration });
      persist({ transliteration });
    },
    setWordByWord: (wordByWord) => {
      set({ wordByWord });
      persist({ wordByWord });
    },
    setReciterId: (reciterId) => {
      set({ reciterId });
      persist({ reciterId });
    },
    setFontSizeArabic: (fontSizeArabic) => {
      set({ fontSizeArabic });
      persist({ fontSizeArabic });
    },
    setFontSizeTranslation: (fontSizeTranslation) => {
      set({ fontSizeTranslation });
      persist({ fontSizeTranslation });
    },
  };
});

