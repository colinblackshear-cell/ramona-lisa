import type { Beat, Episode, Panel } from "@/lib/types";

/**
 * Turns an episode's scenes into comic pages.
 *
 * The script is written panel by panel; this lays those panels out as pages
 * the way a letterer would: every scene starts a new page, small panels with
 * little to say sit side by side, and a page ends when it is full. All sizes
 * are estimates in "page widths" (1 = the width of the page).
 */

export interface PanelRef {
  /** Index into the flattened list of every panel in the episode. */
  flat: number;
  sceneIndex: number;
  panelIndex: number;
  panel: Panel;
}

export interface ComicPage {
  index: number;
  sceneIndex: number;
  /** First page of a scene: shows the scene title strip. */
  sceneStart: boolean;
  /** Each row is one tier: one panel, or two side by side. */
  rows: PanelRef[][];
  /** Flat indices of the panels on this page, in reading order. */
  panels: number[];
}

export interface ComicLayout {
  pages: ComicPage[];
  panels: PanelRef[];
  /** Page index for each flat panel index. */
  pageOf: number[];
}

/** Width-to-height ratio of a panel's art (placeholders are drawn 3:2). */
export function artRatio(panel: Panel): number {
  if (panel.art.status !== "placeholder") return panel.art.width / panel.art.height;
  return panel.standIn ? panel.standIn.art.width / panel.standIn.art.height : 3 / 2;
}

function beatText(b: Beat): string {
  return "text" in b ? b.text : "";
}

/** Rough height of a panel's lettering at a given column width. */
function letteringHeight(panel: Panel, colWidth: number): number {
  const charsPerLine = Math.max(12, Math.floor(colWidth * 52));
  let h = 0;
  for (const b of panel.beats) {
    const lines = Math.max(1, Math.ceil(beatText(b).length / charsPerLine));
    switch (b.kind) {
      case "dialogue":
      case "caption":
        h += 0.055 + lines * 0.05;
        break;
      case "sfx":
        h += 0.1;
        break;
      case "intro":
        h += 0.07;
        break;
      case "suspect":
        h += 0.24;
        break;
      case "clue":
      case "prompt":
        h += 0.1;
        break;
    }
  }
  return h;
}

/** Full-width tiers are never taller than 1:1.75; the art is framed on its focus point. */
export const MIN_TIER_RATIO = 1.75;

export function tierRatio(panel: Panel, full: boolean): number {
  const r = artRatio(panel);
  return full ? Math.max(r, MIN_TIER_RATIO) : Math.max(r, 1 / 1.15);
}

function artHeight(panel: Panel, colWidth: number): number {
  return colWidth / tierRatio(panel, colWidth > 0.9);
}

/** Single panels that are not wide sit beside their lettering instead of above it. */
export function isSide(row: PanelRef[]): boolean {
  return row.length === 1 && artRatio(row[0].panel) < 1.3;
}

/** Share of the tier's width the art takes in a side-by-side tier. */
export const SIDE_ART = 0.56;

function rowHeight(row: PanelRef[]): number {
  if (isSide(row)) {
    const p = row[0].panel;
    return Math.max(artHeight(p, SIDE_ART), letteringHeight(p, 1 - SIDE_ART - 0.03));
  }
  const col = row.length === 1 ? 1 : 0.49;
  return Math.max(...row.map((r) => artHeight(r.panel, col) + letteringHeight(r.panel, col)));
}

function textLength(panel: Panel): number {
  return panel.beats.reduce((n, b) => n + beatText(b).length, 0);
}

/** Small panels with little to say can share a tier. */
function pairable(panel: Panel): boolean {
  return (
    textLength(panel) <= 110 &&
    panel.beats.length <= 2 &&
    artRatio(panel) < 1.6 &&
    !panel.beats.some((b) => b.kind === "suspect")
  );
}

/** Height budget of one page, in page widths (a comic page is about 1:1.5). */
const PAGE_BUDGET = 1.9;
const TITLE_STRIP = 0.14;

export function layoutEpisode(episode: Episode): ComicLayout {
  const panels: PanelRef[] = [];
  episode.scenes.forEach((scene, sceneIndex) =>
    scene.panels.forEach((panel, panelIndex) => panels.push({ flat: panels.length, sceneIndex, panelIndex, panel })),
  );

  const pages: ComicPage[] = [];
  const pageOf: number[] = [];

  episode.scenes.forEach((scene, sceneIndex) => {
    const refs = panels.filter((p) => p.sceneIndex === sceneIndex);

    // 1. Group into tiers.
    const rows: PanelRef[][] = [];
    for (let i = 0; i < refs.length; i++) {
      const a = refs[i];
      const b = refs[i + 1];
      if (b && pairable(a.panel) && pairable(b.panel)) {
        rows.push([a, b]);
        i++;
      } else {
        rows.push([a]);
      }
    }

    // 2. Fill pages.
    let current: ComicPage | null = null;
    let used = 0;
    for (const row of rows) {
      const h = rowHeight(row) + 0.04;
      if (!current || (used + h > PAGE_BUDGET && current.rows.length > 0)) {
        current = {
          index: pages.length,
          sceneIndex,
          sceneStart: !pages.some((p) => p.sceneIndex === sceneIndex),
          rows: [],
          panels: [],
        };
        pages.push(current);
        used = current.sceneStart ? TITLE_STRIP : 0;
      }
      current.rows.push(row);
      for (const r of row) {
        current.panels.push(r.flat);
        pageOf[r.flat] = current.index;
      }
      used += h;
    }
  });

  return { pages, panels, pageOf };
}
