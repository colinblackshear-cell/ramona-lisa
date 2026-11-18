import type { ArtRef, Beat, Episode, Panel, PlannedShot } from "./types";

/** Framings for stand-ins when the script doesn't say where the speaker is. */
const FRAMINGS = ["32% 42%", "68% 42%", "50% 32%", "40% 60%"];

function standInFor(source: Panel, beats: Beat[], n: number): Panel["standIn"] {
  if (source.art.status === "placeholder") return undefined;
  const speaker = beats.find((b) => b.kind === "dialogue");
  const anchor = speaker && speaker.kind === "dialogue" ? source.anchors?.[speaker.speaker] : undefined;
  if (anchor) return { art: source.art, focus: `${anchor.x}% ${anchor.y}%`, zoom: 1.7 };
  return { art: source.art, focus: FRAMINGS[n % FRAMINGS.length], zoom: 1.4 };
}

function plannedPanel(source: Panel, shot: PlannedShot, beats: Beat[], n: number): Panel {
  const art: ArtRef = shot.art ?? {
    src: "",
    alt: shot.brief,
    width: 3,
    height: 2,
    status: "placeholder",
    brief: `PLANNED SHOT (prompt ${shot.prompt}). ${shot.brief}`,
  };
  return {
    id: `${source.id}--${shot.prompt}`,
    art,
    planned: { prompt: shot.prompt, layer: shot.layer, title: shot.title, shot: shot.shot },
    standIn: shot.art ? undefined : standInFor(source, beats, n),
    camera: "still",
    transition: "cut",
    beats,
    // Prompts that move with a line still need their interaction (hotspots stay on the original art).
    interactions: source.interactions?.map((it) => ({ ...it, region: undefined })),
  };
}

/**
 * Splits panels into the planned shots, so the story can cut to a new picture on
 * nearly every line. Silent planned shots appear only once their art exists.
 */
export function expandEpisode(episode: Episode, shots: PlannedShot[]): Episode {
  if (!shots.length) return episode;
  let n = 0;
  const scenes = episode.scenes.map((scene) => {
    const panels: Panel[] = [];
    for (const p of scene.panels) {
      const mine = shots.filter((s) => s.panel === p.id);
      const before = mine.filter((s) => typeof s.at === "object");
      const splits = mine.filter((s) => typeof s.at === "number").sort((a, b) => (a.at as number) - (b.at as number));
      const after = mine.filter((s) => s.at === "after").sort((a, b) => a.prompt - b.prompt);
      const moved = new Set(before.map((s) => (s.at as { before: number }).before));

      for (const s of before) {
        const i = (s.at as { before: number }).before;
        panels.push(plannedPanel(p, s, [p.beats[i]], n++));
      }
      const cuts = splits.map((s) => s.at as number);
      const end = (k: number) => (k + 1 < cuts.length ? cuts[k + 1] : p.beats.length);
      panels.push({ ...p, beats: p.beats.slice(0, cuts[0] ?? p.beats.length).filter((_, i) => !moved.has(i)) });
      splits.forEach((s, k) => panels.push(plannedPanel(p, s, p.beats.slice(cuts[k], end(k)), n++)));
      for (const s of after) if (s.art) panels.push(plannedPanel(p, s, [], n++));
    }
    return { ...scene, panels };
  });
  return { ...episode, scenes };
}
