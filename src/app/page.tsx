import Link from "next/link";
import Image from "next/image";
import { TopBar } from "@/components/layout/TopBar";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
        {/* Full-bleed respectful hero */}
        <section
          dir="rtl"
          className="relative overflow-hidden rounded-[28px] border border-cardBorder bg-card/30 backdrop-blur"
          aria-label="Dedication hero"
        >
          {/* Calm Islamic-style background (gradient + soft silhouette) */}
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                // Deep navy base with calm emerald glow (subtle, non-flashy)
                "radial-gradient(1100px 520px at 18% 12%, rgba(23,185,146,0.26), transparent 58%), radial-gradient(900px 520px at 78% 28%, rgba(224,195,122,0.10), transparent 60%), radial-gradient(700px 520px at 50% 90%, rgba(23,185,146,0.12), transparent 60%), linear-gradient(135deg, rgba(6,10,18,0.96), rgba(6,10,18,0.70))",
            }}
          />
          {/* Soft geometric pattern (very subtle) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-width='1'%3E%3Cpath d='M40 2 78 40 40 78 2 40 40 2Z'/%3E%3Cpath d='M40 16 64 40 40 64 16 40 40 16Z'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: "140px 140px",
              backgroundPosition: "center",
            }}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-[0.14]"
            aria-hidden="true"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 240'%3E%3Cpath fill='%23ffffff' d='M0 240V160c64-24 110-64 138-120 16-34 58-34 74 0 28 56 74 96 138 120v80H0Zm430 0V178c44-18 76-44 96-78 12-20 36-20 48 0 20 34 52 60 96 78v62H430Zm330 0V150c30-12 52-30 66-54 10-18 32-18 42 0 14 24 36 42 66 54v90H760Zm200 0V180c22-10 38-24 48-42 8-14 26-14 34 0 10 18 26 32 48 42v60h-130Z'/%3E%3Cpath fill='%23ffffff' d='M585 38c0-18 15-32 33-32s33 14 33 32c0 6-2 12-5 17l-28 42-28-42c-3-5-5-11-5-17Z'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center bottom",
              backgroundSize: "1200px 240px",
              filter: "blur(0.4px)",
            }}
          />

          <div className="relative grid min-h-[80vh] items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Dedication text */}
            <div className="mx-auto w-full max-w-2xl text-center lg:text-right">
              <div className="inline-flex items-center gap-2 rounded-full border border-cardBorder bg-background/20 px-4 py-2 text-xs text-[color:var(--color-muted)] backdrop-blur">
                <span className="font-arabic text-sm text-gold">﴿</span>
                <span>صدقة جارية</span>
                <span className="font-arabic text-sm text-gold">﴾</span>
              </div>

              <h1 className="mt-6 font-arabic text-[30px] leading-[1.9] text-foreground sm:text-[42px]">
                هذا الموقع ترحّمًا على{" "}
                <span className="text-[color:var(--color-gold)]">حبيب بن محسن العبيدان</span>
              </h1>

              <p className="mt-3 font-arabic text-[18px] leading-[2.0] text-[color:var(--color-muted)] sm:text-[22px]">
                رحمه الله تعالى وغفر له وجعل القرآن الكريم في ميزان حسناته
              </p>

              <div className="mt-7 space-y-2">
                <p className="font-arabic text-base text-[color:var(--color-muted)] sm:text-lg">
                  منصة لقراءة وتدبّر القرآن الكريم براحةٍ ويُسر
                </p>
                <p className="text-sm text-[color:var(--color-muted)] sm:text-base" dir="ltr">
                  A peaceful platform for reading, listening, and reflecting on the Holy
                  Quran
                </p>
              </div>

              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-end">
                <Link
                  href="/surah"
                  className={[
                    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium",
                    "bg-[color:var(--color-accent)] text-[#071012] hover:opacity-95",
                    "shadow-[0_10px_40px_rgba(23,185,146,0.18)]",
                  ].join(" ")}
                  aria-label="ابدأ القراءة الآن"
                >
                  ابدأ القراءة الآن
                </Link>
                <Link
                  href="/surah/1"
                  className={[
                    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium",
                    "border border-cardBorder bg-background/20 text-foreground hover:bg-background/30",
                    "backdrop-blur",
                  ].join(" ")}
                  aria-label="استمع إلى التلاوة"
                >
                  استمع إلى التلاوة
                </Link>
                <Link
                  href="/settings"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-[color:var(--color-gold)] hover:underline"
                  aria-label="إعدادات القراءة"
                >
                  التزامن مع الترجمة
                </Link>
              </div>

              <p className="mt-6 text-xs text-[color:var(--color-muted)]">
                لا إعلانات • لا موسيقى • واجهة هادئة للتلاوة والتدبر
              </p>
            </div>

            {/* Portrait */}
            <div className="mx-auto w-full max-w-sm">
              <div className="relative mx-auto aspect-square w-[240px] overflow-hidden rounded-full border border-cardBorder bg-background/10 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:w-[300px]">
                <div className="relative h-full w-full">
                  <Image
                    src="/habib.png"
                    alt="حبيب بن محسن العبيدان رحمه الله"
                    fill
                    sizes="(max-width: 640px) 240px, 300px"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 20%, rgba(224,195,122,0.18), transparent 45%), linear-gradient(to bottom, rgba(7,10,18,0.10), rgba(7,10,18,0.45))",
                    }}
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="font-arabic text-base text-foreground">رحمه الله</div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 border-t border-cardBorder pt-6 text-center">
          <p className="font-arabic text-sm text-[color:var(--color-muted)]" dir="rtl">
            صدقة جارية لوالدنا / حبيب بن محسن العبيدان رحمه الله
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[color:var(--color-muted)]">
            <span dir="ltr">© {new Date().getFullYear()} Noor al‑Quran</span>
            <span aria-hidden="true">•</span>
            <Link className="hover:underline" href="/about">
              About
            </Link>
            <Link className="hover:underline" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:underline" href="/contact">
              Contact
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
