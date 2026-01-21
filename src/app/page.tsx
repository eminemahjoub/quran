import Link from "next/link";
import { TopBar } from "@/components/layout/TopBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 py-10">
        <section className="relative overflow-hidden rounded-3xl border border-cardBorder bg-card/60 p-6 backdrop-blur sm:p-10">
          <div
            className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(23,185,146,0.25), rgba(224,195,122,0.08), transparent 60%)",
              filter: "blur(8px)",
            }}
          />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-medium text-muted">
                A calm, respectful space for Quran study
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
                Noor al‑Quran
              </h1>
              <p className="mt-4 max-w-prose text-base leading-7 text-muted sm:text-lg">
                Read the Holy Quran in beautiful Uthmani script, choose trusted
                translations, and listen to renowned reciters—designed for
                mobile-first clarity and focus.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href="/surah"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90"
                  aria-label="Browse surah list"
                >
                  Browse Surahs
                </Link>
                <Link
                  href="/surah/1"
                  className="inline-flex items-center justify-center rounded-full border border-cardBorder bg-background/40 px-5 py-3 text-sm font-medium hover:bg-background/60"
                  aria-label="Start reading Al-Fatihah"
                >
                  Start with Al‑Fatihah
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 text-sm text-muted sm:grid-cols-3">
                <div className="rounded-2xl border border-cardBorder bg-background/40 p-4">
                  <div className="text-foreground font-semibold">Uthmani</div>
                  <div className="mt-1">Diacritics & proper script</div>
                </div>
                <div className="rounded-2xl border border-cardBorder bg-background/40 p-4">
                  <div className="text-foreground font-semibold">Translations</div>
                  <div className="mt-1">English + more languages</div>
                </div>
                <div className="rounded-2xl border border-cardBorder bg-background/40 p-4">
                  <div className="text-foreground font-semibold">Audio</div>
                  <div className="mt-1">Verse-by-verse, continuous</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-cardBorder bg-background/40 p-6">
              <div className="text-sm text-muted">Preview</div>
              <div className="mt-3 font-arabic text-[32px] leading-[1.9] text-foreground [direction:rtl]">
                بِسْمِ ٱللّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
              </div>
              <div className="mt-4 text-sm leading-6 text-muted">
                In the name of Allah, the Entirely Merciful, the Especially
                Merciful.
              </div>
              <div className="mt-6 text-xs text-muted">
                No background music. No distracting animations. Designed for
                reverence and readability.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-cardBorder bg-card/40 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Quick Jump</h2>
            <p className="mt-2 text-sm text-muted">
              Use the Surah pages and search to jump to references like{" "}
              <span className="font-mono">2:255</span>.
            </p>
            <div className="mt-4 flex gap-3">
              <Link className="text-sm font-medium text-accent hover:underline" href="/surah/2">
                Go to Al‑Baqarah
              </Link>
              <Link className="text-sm font-medium text-accent hover:underline" href="/settings">
                Reading settings
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-cardBorder bg-card/40 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Mobile-first</h2>
            <p className="mt-2 text-sm text-muted">
              Large Arabic type, high contrast, and touch-friendly controls—built
              for phones and tablets.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
