"use client";

import type { Verse } from "@/lib/quran/api";
import { useSettingsStore } from "@/stores/settings";

type Props = {
  verses: Verse[];
};

export function QuranReader({ verses }: Props) {
  const mode = useSettingsStore((s) => s.readingMode);
  const fontSizeArabic = useSettingsStore((s) => s.fontSizeArabic);
  const fontSizeTranslation = useSettingsStore((s) => s.fontSizeTranslation);
  const showTransliteration = useSettingsStore((s) => s.transliteration);
  const showWordByWord = useSettingsStore((s) => s.wordByWord);

  const showTranslation = mode === "arabicTranslation" || mode === "wordByWord";
  const showArabic = true;

  return (
    <div className="space-y-6">
      {verses.map((v) => (
        <article
          key={v.verse_key}
          id={`ayah-${v.verse_key}`}
          className="rounded-3xl border border-cardBorder bg-card/40 p-5 backdrop-blur"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="text-xs text-muted">{v.verse_key}</div>
            <a
              href={`#ayah-${v.verse_key}`}
              className="text-xs font-medium text-accent hover:underline"
              aria-label={`Link to ayah ${v.verse_key}`}
            >
              Link
            </a>
          </div>

          {showArabic && (
            <div
              className="mt-3 font-arabic [direction:rtl] leading-[2.1] text-foreground"
              style={{ fontSize: `${fontSizeArabic}px` }}
            >
              {v.text_uthmani}
            </div>
          )}

          {(mode === "arabicTransliteration" || showTransliteration) &&
            v.transliteration?.text && (
              <div className="mt-3 text-sm leading-7 text-muted">
                <span className="sr-only">Transliteration: </span>
                {v.transliteration.text}
              </div>
            )}

          {showTranslation && v.translations?.[0]?.text && (
            <div
              className="mt-3 text-[color:var(--color-muted)] leading-7"
              style={{ fontSize: `${fontSizeTranslation}px` }}
              // translations often include HTML from the API (italics, etc.)
              dangerouslySetInnerHTML={{ __html: v.translations[0].text }}
            />
          )}

          {showWordByWord && v.words && v.words.length > 0 && (
            <div className="mt-4 rounded-2xl border border-cardBorder bg-background/40 p-4">
              <div className="text-xs font-medium text-muted">
                Word by word
              </div>
              <div className="mt-3 flex flex-wrap gap-3 [direction:rtl]">
                {v.words.map((w) => (
                  <div
                    key={w.id}
                    className="min-w-[90px] rounded-2xl border border-cardBorder bg-card/40 px-3 py-2"
                  >
                    <div className="font-arabic text-xl text-foreground">
                      {w.text_uthmani}
                    </div>
                    {w.transliteration?.text && (
                      <div className="mt-1 text-xs text-muted [direction:ltr]">
                        {w.transliteration.text}
                      </div>
                    )}
                    {w.translation?.text && (
                      <div className="mt-1 text-xs text-muted [direction:ltr]">
                        {w.translation.text}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

