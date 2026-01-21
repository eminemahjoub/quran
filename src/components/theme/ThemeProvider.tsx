"use client";

import { useEffect } from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Always force dark mode
    const root = document.documentElement;
    root.classList.add("dark");
  }, []);

  return children;
}

