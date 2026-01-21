"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-cardBorder bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-cardBorder bg-card/60 backdrop-blur">
            <span className="font-arabic text-lg text-gold" aria-hidden="true">
              ن
            </span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Noor al‑Quran</div>
            <div className="text-xs text-muted">Read • Listen • Reflect</div>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-3 text-sm text-muted sm:flex">
            <Link className="hover:text-foreground" href="/surah">
              Surahs
            </Link>
            <Link className="hover:text-foreground" href="/settings">
              Settings
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

