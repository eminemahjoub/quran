import Link from "next/link";
import { notFound } from "next/navigation";
import { TopBar } from "@/components/layout/TopBar";
import { AudioPlayer } from "@/components/quran/AudioPlayer";
import { QuranReader } from "@/components/quran/QuranReader";
import { fetchChapters, fetchVersesByChapter } from "@/lib/quran/api";
import { TRANSLATIONS, RECITERS } from "@/lib/quran/catalog";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ t?: string; r?: string; w?: string; tr?: string }>;
};

export default async function SurahReadPage({ params, searchParams }: Props) {
  const { id } = await params;
  const sp = await searchParams;
  const chapterId = Number(id);
  if (!Number.isFinite(chapterId) || chapterId < 1 || chapterId > 114) notFound();

  // NOTE: server component can't read Zustand directly.
  // URL params are supported now; settings integration will be client-driven next.
  const translationId = Number(sp.t ?? 20);
  const reciterId = Number(sp.r ?? 7);
  const includeWords = (sp.w ?? "1") !== "0";
  const includeTransliteration = (sp.tr ?? "0") === "1";

  const [chapters, versesRes] = await Promise.all([
    fetchChapters(),
    fetchVersesByChapter({
      chapterId,
      translationId,
      reciterId,
      includeWords,
      includeTransliteration,
      page: 1,
    }),
  ]);

  const chapter = chapters.find((c) => c.id === chapterId);
  if (!chapter) notFound();

  const selectedTranslation =
    TRANSLATIONS.find((t) => t.id === translationId) ?? TRANSLATIONS[0];
  const selectedReciter = RECITERS.find((r) => r.id === reciterId) ?? RECITERS[0];

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm text-muted">
              Surah {chapter.id} · {chapter.verses_count} ayat
            </div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              {chapter.name_simple}
            </h1>
            <div className="mt-2 font-arabic text-3xl [direction:rtl]">
              {chapter.name_arabic}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Link className="text-accent hover:underline" href="/surah">
              ← Surah list
            </Link>
            <Link className="text-accent hover:underline" href="/settings">
              Settings
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-cardBorder bg-card/40 p-4 text-sm text-muted backdrop-blur">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <div>
              <span className="text-foreground font-medium">Translation:</span>{" "}
              {selectedTranslation.label}
            </div>
            <div>
              <span className="text-foreground font-medium">Reciter:</span>{" "}
              {selectedReciter.label}
            </div>
          </div>
          <div className="mt-2 text-xs">
            Tip: per-user settings UI is in progress; for now you can also change
            via URL params (e.g. <span className="font-mono">?t=131&r=7&w=1</span>).
          </div>
        </div>

        <div className="mt-6">
          <QuranReader verses={versesRes.verses} />
        </div>
      </main>

      <AudioPlayer
        verses={versesRes.verses}
        title={`${chapter.name_simple} · ${selectedReciter.label}`}
      />
    </div>
  );
}

