import type { Character } from "@/lib/types";

/** Series regulars. Descriptions follow the series bible (canon). */
export const ramona: Character = {
  id: "ramona",
  name: "Ramona Lisa",
  role: "Strategist · Thief · Restorer",
  species: "Tuxedo cat",
  tagline: "Nine lives, and no intention of wasting a single one.",
  portrait: "series/ramona-portrait.webp",
  accent: "blue",
  status: "canon",
  kind: "protagonist",
};

export const kit: Character = {
  id: "kit",
  name: "Kit",
  role: "Scout · Tracker · Always hungry",
  species: "Tiger-striped cat",
  tagline: "Finds the trail first. Usually finds a snack second.",
  portrait: "series/kit-portrait.webp",
  accent: "gold",
  status: "canon",
  kind: "protagonist",
};

export const seriesRegulars: Character[] = [ramona, kit];
