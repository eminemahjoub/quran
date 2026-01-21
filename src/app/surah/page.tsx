import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";
import { fetchChapters } from "@/lib/quran/api";

function revelationLabel(place?: "makkah" | "madinah") {
  if (place === "makkah") return "Meccan";
  if (place === "madinah") return "Medinan";
  return "—";
}

export default async function SurahListPage() {
  const chapters = await fetchChapters();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Surah Index</h1>
            <p className="mt-1 text-sm text-muted">
              114 surahs · Arabic name, English name, and revelation type
            </p>
          </div>
          <Link
            href="/settings"
            className="text-sm font-medium text-accent hover:underline"
          >
            Settings
          </Link>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((c) => (
            <Link
              key={c.id}
              href={`/surah/${c.id}`}
              className="group rounded-3xl border border-cardBorder bg-card/40 p-5 backdrop-blur hover:bg-card/60"
              aria-label={`Open Surah ${c.name_simple}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-sm text-muted">
                    {String(c.id).padStart(3, "0")} · {revelationLabel(c.revelation_place)} ·{" "}
                    {c.verses_count} ayat
                  </div>
                  <div className="mt-1 text-lg font-semibold group-hover:underline">
                    {c.name_simple}
                  </div>
                  <div className="mt-1 text-sm text-muted">
                    {c.translated_name?.name ?? ""}
                  </div>
                </div>
                <div className="font-arabic text-2xl leading-none [direction:rtl] text-foreground">
                  {c.name_arabic}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

