"use client";

import { useCallback, useEffect, useState } from "react";

/** Reading position and discoveries for one episode, saved in localStorage. */
export interface EpisodeProgress {
  /** Index into the flattened reading steps (see components/reader/steps.ts). */
  step: number;
  foundClues: string[];
  metCharacters: string[];
  finished: boolean;
  updatedAt: number;
}

export const emptyProgress: EpisodeProgress = {
  step: 0,
  foundClues: [],
  metCharacters: [],
  finished: false,
  updatedAt: 0,
};

const key = (episodeId: string) => `ramona-lisa:progress:${episodeId}:v1`;

export function loadProgress(episodeId: string): EpisodeProgress | null {
  try {
    const raw = window.localStorage.getItem(key(episodeId));
    if (!raw) return null;
    return { ...emptyProgress, ...(JSON.parse(raw) as Partial<EpisodeProgress>) };
  } catch {
    return null;
  }
}

export function saveProgress(episodeId: string, p: EpisodeProgress): void {
  try {
    window.localStorage.setItem(key(episodeId), JSON.stringify({ ...p, updatedAt: Date.now() }));
  } catch {
    /* storage unavailable (private mode): reading still works, it just won't resume */
  }
}

export function clearProgress(episodeId: string): void {
  try {
    window.localStorage.removeItem(key(episodeId));
  } catch {
    /* ignore */
  }
}

/** Saved progress, or null until loaded / when none exists. */
export function useSavedProgress(episodeId: string) {
  const [saved, setSaved] = useState<EpisodeProgress | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setSaved(loadProgress(episodeId));
    setLoaded(true);
  }, [episodeId]);
  const reset = useCallback(() => {
    clearProgress(episodeId);
    setSaved(null);
  }, [episodeId]);
  const refresh = useCallback(() => setSaved(loadProgress(episodeId)), [episodeId]);
  return { saved, loaded, reset, refresh };
}
