"use client";

import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useSettingsStore } from "@/stores/settings";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const options: Array<{
    value: "system" | "dark" | "light";
    label: string;
    Icon: typeof Sun;
  }> = [
    { value: "system", label: "System", Icon: Monitor },
    { value: "dark", label: "Dark", Icon: Moon },
    { value: "light", label: "Light", Icon: Sun },
  ];

  // Render a placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="inline-flex items-center gap-1 rounded-full border border-cardBorder bg-card/40 p-1 backdrop-blur">
        {options.map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-muted"
            aria-label={`Theme: ${label}`}
            disabled
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-cardBorder bg-card/40 p-1 backdrop-blur">
      {options.map(({ value, label, Icon }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={[
              "inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm",
              "transition-colors",
              active
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground",
            ].join(" ")}
            aria-pressed={active}
            aria-label={`Theme: ${label}`}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

