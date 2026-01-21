export type Chapter = {
  id: number;
  name_arabic: string;
  name_simple: string;
  translated_name?: { name: string };
  revelation_place?: "makkah" | "madinah";
  verses_count: number;
};

export type VerseWord = {
  id: number;
  position: number;
  text_uthmani: string;
  transliteration?: { text: string };
  translation?: { text: string };
};

export type Verse = {
  id: number;
  verse_key: string; // "2:255"
  verse_number: number;
  text_uthmani: string;
  words?: VerseWord[];
  translations?: Array<{ id: number; text: string }>;
  transliteration?: { text: string };
  audio?: {
    url?: string;
    // API might return audio in different structures
    primary?: string;
    secondary?: string[];
  };
};

const API_BASE = "https://api.quran.com/api/v4";

export async function fetchChapters(): Promise<Chapter[]> {
  const res = await fetch(`${API_BASE}/chapters?language=en`, {
    // chapters are stable; cache aggressively on the server
    next: { revalidate: 60 * 60 * 24 },
  });
  if (!res.ok) throw new Error("Failed to load chapters");
  const data = (await res.json()) as { chapters: Chapter[] };
  return data.chapters;
}

export async function fetchVersesByChapter(params: {
  chapterId: number;
  translationId: number;
  reciterId: number;
  includeWords: boolean;
  includeTransliteration: boolean;
  page?: number;
}): Promise<{
  verses: Verse[];
  pagination: { current_page: number; total_pages: number; per_page: number };
}> {
  const {
    chapterId,
    translationId,
    reciterId,
    includeWords,
    includeTransliteration,
    page = 1,
  } = params;

  const query = new URLSearchParams();
  query.set("language", "en");
  query.set("words", includeWords ? "true" : "false");
  query.set("word_translation_language", "en");
  query.set("word_transliteration_language", "en");
  query.set("translations", String(translationId));
  query.set("audio", String(reciterId));
  if (includeTransliteration) query.set("transliteration", "true");
  query.set("page", String(page));
  query.set("per_page", "50");

  const res = await fetch(`${API_BASE}/verses/by_chapter/${chapterId}?${query.toString()}`, {
    next: { revalidate: 60 * 10 },
  });
  if (!res.ok) throw new Error("Failed to load verses");
  const data = (await res.json()) as {
    verses: Verse[];
    pagination: { current_page: number; total_pages: number; per_page: number };
  };
  return data;
}

