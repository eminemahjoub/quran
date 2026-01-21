export type UiLanguage = "en" | "ar";

export type ReadingMode =
  | "arabicOnly"
  | "arabicTranslation"
  | "arabicTransliteration"
  | "wordByWord";

export type TranslationOption = {
  id: number;
  label: string;
  language: string;
};

// Quran.com API v4 translation IDs (stable, widely used)
export const TRANSLATIONS: TranslationOption[] = [
  { id: 20, label: "English — Saheeh International", language: "en" },
  { id: 131, label: "English — The Clear Quran (Khattab)", language: "en" },
  { id: 22, label: "English — Yusuf Ali", language: "en" },
  { id: 85, label: "French — Muhammad Hamidullah", language: "fr" },
  { id: 84, label: "Spanish — Muhammad Isa García", language: "es" },
  { id: 33, label: "Indonesian — Bahasa Indonesia", language: "id" },
  { id: 95, label: "Urdu — Maududi", language: "ur" },
];

export type ReciterOption = {
  id: number;
  label: string;
};

// Quran.com API v4 reciter IDs for verse-by-verse audio
export const RECITERS: ReciterOption[] = [
  { id: 7, label: "Mishary Rashid Alafasy" },
  { id: 1, label: "Abdul Basit Abdul Samad" },
  { id: 12, label: "Saad Al-Ghamdi" },
  { id: 4, label: "Maher Al‑Muaiqly" },
  { id: 3, label: "Abdurrahman As‑Sudais" },
  { id: 5, label: "Minshawi" },
];

