import type { Episode } from "./types";
import { weepingStatue } from "@/content/episodes/weeping-statue/episode";

/** Register new episodes here. Order is reading order. */
export const episodes: Episode[] = [weepingStatue];

export function getEpisode(id: string): Episode | undefined {
  return episodes.find((e) => e.id === id);
}
