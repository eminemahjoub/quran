"use client";

import { useMemo } from "react";
import { TopBar } from "@/components/layout/TopBar";
import { RECITERS, TRANSLATIONS, type ReadingMode } from "@/lib/quran/catalog";
import { useSettingsStore } from "@/stores/settings";

export default function SettingsPage() {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const uiLanguage = useSettingsStore((s) => s.uiLanguage);
  const setUiLanguage = useSettingsStore((s) => s.setUiLanguage);

  const readingMode = useSettingsStore((s) => s.readingMode);
  const setReadingMode = useSettingsStore((s) => s.setReadingMode);

  const translationId = useSettingsStore((s) => s.translationId);
  const setTranslationId = useSettingsStore((s) => s.setTranslationId);

  const reciterId = useSettingsStore((s) => s.reciterId);
  const setReciterId = useSettingsStore((s) => s.setReciterId);

  const transliteration = useSettingsStore((s) => s.transliteration);
  const setTransliteration = useSettingsStore((s) => s.setTransliteration);

  const wordByWord = useSettingsStore((s) => s.wordByWord);
  const setWordByWord = useSettingsStore((s) => s.setWordByWord);

  const fontSizeArabic = useSettingsStore((s) => s.fontSizeArabic);
  const setFontSizeArabic = useSettingsStore((s) => s.setFontSizeArabic);

  const fontSizeTranslation = useSettingsStore((s) => s.fontSizeTranslation);
  const setFontSizeTranslation = useSettingsStore((s) => s.setFontSizeTranslation);

  const modes: Array<{ value: ReadingMode; label: string; desc: string }> =
    useMemo(
      () => [
        { value: "arabicOnly", label: "Arabic only", desc: "Uthmani script only." },
        {
          value: "arabicTranslation",
          label: "Arabic + Translation",
          desc: "Arabic with selected translation below.",
        },
        {
          value: "arabicTransliteration",
          label: "Arabic + Transliteration",
          desc: "Arabic with transliteration.",
        },
        {
          value: "wordByWord",
          label: "Word-by-word",
          desc: "Word translation + transliteration tiles.",
        },
      ],
      [],
    );

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-muted">
          These preferences are stored locally on your device.
        </p>

        <div className="mt-6 space-y-4">
          <section className="rounded-3xl border border-cardBorder bg-card/40 p-5 backdrop-blur">
            <h2 className="text-lg font-semibold">Appearance</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Theme</span>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="h-11 rounded-2xl border border-cardBorder bg-background/40 px-3"
                  aria-label="Theme preference"
                >
                  <option value="system">System</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium">UI Language</span>
                <select
                  value={uiLanguage}
                  onChange={(e) => setUiLanguage(e.target.value as any)}
                  className="h-11 rounded-2xl border border-cardBorder bg-background/40 px-3"
                  aria-label="UI language"
                >
                  <option value="en">English</option>
                  <option value="ar">العربية (soon)</option>
                </select>
              </label>
            </div>
          </section>

          <section className="rounded-3xl border border-cardBorder bg-card/40 p-5 backdrop-blur">
            <h2 className="text-lg font-semibold">Reading</h2>
            <div className="mt-4 grid gap-4">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Viewing mode</span>
                <select
                  value={readingMode}
                  onChange={(e) => setReadingMode(e.target.value as any)}
                  className="h-11 rounded-2xl border border-cardBorder bg-background/40 px-3"
                  aria-label="Reading mode"
                >
                  {modes.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
                <span className="text-xs text-muted">
                  {modes.find((m) => m.value === readingMode)?.desc}
                </span>
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={transliteration}
                    onChange={(e) => setTransliteration(e.target.checked)}
                    className="h-4 w-4 accent-[color:var(--color-accent)]"
                  />
                  Show transliteration
                </label>
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={wordByWord}
                    onChange={(e) => setWordByWord(e.target.checked)}
                    className="h-4 w-4 accent-[color:var(--color-accent)]"
                  />
                  Word-by-word tiles
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2 text-sm">
                  <span className="font-medium">Arabic font size ({fontSizeArabic}px)</span>
                  <input
                    type="range"
                    min={22}
                    max={40}
                    step={1}
                    value={fontSizeArabic}
                    onChange={(e) => setFontSizeArabic(Number(e.target.value))}
                    aria-label="Arabic font size"
                    className="accent-[color:var(--color-accent)]"
                  />
                </label>
                <label className="grid gap-2 text-sm">
                  <span className="font-medium">
                    Translation size ({fontSizeTranslation}px)
                  </span>
                  <input
                    type="range"
                    min={14}
                    max={22}
                    step={1}
                    value={fontSizeTranslation}
                    onChange={(e) => setFontSizeTranslation(Number(e.target.value))}
                    aria-label="Translation font size"
                    className="accent-[color:var(--color-accent)]"
                  />
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-cardBorder bg-card/40 p-5 backdrop-blur">
            <h2 className="text-lg font-semibold">Translation & Audio</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Translation</span>
                <select
                  value={translationId}
                  onChange={(e) => setTranslationId(Number(e.target.value))}
                  className="h-11 rounded-2xl border border-cardBorder bg-background/40 px-3"
                  aria-label="Translation selection"
                >
                  {TRANSLATIONS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm">
                <span className="font-medium">Reciter</span>
                <select
                  value={reciterId}
                  onChange={(e) => setReciterId(Number(e.target.value))}
                  className="h-11 rounded-2xl border border-cardBorder bg-background/40 px-3"
                  aria-label="Reciter selection"
                >
                  {RECITERS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <p className="mt-3 text-xs text-muted">
              Note: the surah reader page will be updated to automatically use these
              saved preferences.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}

