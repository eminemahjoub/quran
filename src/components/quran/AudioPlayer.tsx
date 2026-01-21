"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react";
import type { Verse } from "@/lib/quran/api";

type Props = {
  verses: Verse[];
  startAtIndex?: number;
  title?: string;
};

export function AudioPlayer({ verses, startAtIndex = 0, title }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(startAtIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.9);

  const current = verses[index];
  const src = current?.audio?.url ? normalizeAudioUrl(current.audio.url) : null;

  const label = useMemo(() => {
    if (!current) return "Audio";
    return `${current.verse_key}`;
  }, [current]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => {
      // continuous: auto-next ayah
      if (index < verses.length - 1) {
        setIndex((i) => i + 1);
      } else {
        setIsPlaying(false);
      }
    };
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [index, verses.length]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!src) return;
    audio.src = src;
    // autoplay when switching and currently playing
    if (isPlaying) void audio.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, index]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!src) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        // ignore (user gesture restrictions)
      }
    } else {
      audio.pause();
    }
  };

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(verses.length - 1, i + 1));

  return (
    <div className="sticky bottom-0 z-40 border-t border-cardBorder bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <audio ref={audioRef} preload="none" />

        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-medium">{title ?? "Recitation"}</div>
          <div className="truncate text-xs text-muted">{label}</div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={prev}
            className="rounded-full border border-cardBorder bg-card/40 p-2 hover:bg-card/70"
            aria-label="Previous ayah"
          >
            <SkipBack className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={toggle}
            className="rounded-full bg-foreground p-2 text-background hover:opacity-90"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Play className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            type="button"
            onClick={next}
            className="rounded-full border border-cardBorder bg-card/40 p-2 hover:bg-card/70"
            aria-label="Next ayah"
          >
            <SkipForward className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Volume2 className="h-4 w-4 text-muted" aria-hidden="true" />
          <input
            aria-label="Volume"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-28 accent-[color:var(--color-accent)]"
          />
        </div>
      </div>
    </div>
  );
}

function normalizeAudioUrl(url: string): string {
  // Quran.com sometimes returns protocol-relative URLs
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

