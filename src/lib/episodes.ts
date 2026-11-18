import type { Episode, PlannedShot } from "./types";
import { weepingStatue } from "@/content/episodes/weeping-statue/episode";
import { plannedShots as weepingStatueShots } from "@/content/episodes/weeping-statue/shots";
import { expandEpisode } from "./expand";

/** Register new episodes here. Order is reading order. */
export const episodes: Episode[] = [weepingStatue];

/** Planned shots (filler layers) per episode. */
const planned: Record<string, PlannedShot[]> = {
  "weeping-statue": weepingStatueShots,
};

export function getEpisode(id: string): Episode | undefined {
  return episodes.find((e) => e.id === id);
}

/** The episode as the reader shows it: split into one shot for almost every line. */
const reading = new Map<string, Episode>();
export function getReadingEpisode(id: string): Episode | undefined {
  if (!reading.has(id)) {
    const e = getEpisode(id);
    if (!e) return undefined;
    reading.set(id, expandEpisode(e, planned[id] ?? []));
  }
  return reading.get(id);
}
