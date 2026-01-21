"use client";

import { useEffect } from "react";
import { useSettingsStore } from "@/stores/settings";

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? true;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSettingsStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    const shouldDark = theme === "dark" || (theme === "system" && getSystemPrefersDark());
    root.classList.toggle("dark", shouldDark);
  }, [theme]);

  return children;
}

