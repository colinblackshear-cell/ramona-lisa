"use client";

import type { CSSProperties } from "react";
import type { Beat, Character, Clue, Dialogue, Interaction, Panel, Region, Suspect } from "@/lib/types";
import { asset } from "@/lib/asset";
import { artRatio, tierRatio } from "./layout";
import styles from "./ComicPanel.module.css";

export type PanelFit =
  /** Full-width tier on a page: lettering above and below the art. */
  | "full"
  /** Half of a tier shared with another panel. */
  | "half"
  /** A narrow panel with its lettering beside it. */
  | "side"
  /** One panel at a time ("panel by panel" reading): the whole picture, never cropped. */
  | "guided";

interface Props {
  panel: Panel;
  fit: PanelFit;
  characters: Character[];
  suspects: Suspect[];
  clues: Clue[];
  foundClues: string[];
  showNotes: boolean;
  /** Page view: the panel is a button that zooms into panel-by-panel reading. */
  onSelect?: () => void;
  onInteract: (it: Interaction) => void;
  onOpenClue: (clueId: string) => void;
  onOpenCasebook: () => void;
  /** Movie view: the panel's place in the episode, and whether the camera is on it. */
  flat?: number;
  active?: boolean;
}

/** Beats before the first line of dialogue are lettered above the art; the rest below it. */
function splitBeats(beats: Beat[]): { above: Beat[]; below: Beat[] } {
  const first = beats.findIndex((b) => b.kind !== "caption" && b.kind !== "sfx" && b.kind !== "intro");
  if (first === -1) return { above: beats, below: [] };
  return { above: beats.slice(0, first), below: beats.slice(first) };
}

/** Where a region of the art lands once the picture is cropped to the panel shape. */
function placeRegion(region: Region, imageRatio: number, frameRatio: number, focus: string): Region {
  const [fx, fy] = focus.split(/\s+/).map((v) => parseFloat(v) / 100);
  if (Math.abs(imageRatio - frameRatio) < 0.01) return region;
  if (imageRatio > frameRatio) {
    const scale = imageRatio / frameRatio; // image is wider than the frame
    const off = (1 - scale) * (isNaN(fx) ? 0.5 : fx) * 100;
    return { ...region, x: off + region.x * scale, w: region.w * scale };
  }
  const scale = frameRatio / imageRatio; // image is taller than the frame
  const off = (1 - scale) * (isNaN(fy) ? 0.5 : fy) * 100;
  return { ...region, y: off + region.y * scale, h: region.h * scale };
}

type Side = "start" | "center" | "end";

export function ComicPanel({
  panel,
  fit,
  characters,
  suspects,
  clues,
  foundClues,
  showNotes,
  onSelect,
  onInteract,
  onOpenClue,
  onOpenCasebook,
  flat,
  active,
}: Props) {
  const { art } = panel;
  const placeholder = art.status === "placeholder";
  const imageRatio = artRatio(panel);
  const frameRatio = fit === "guided" ? imageRatio : fit === "side" ? Math.max(imageRatio, 1 / 1.15) : tierRatio(panel, fit === "full");
  const focus = panel.standIn?.focus ?? panel.focus ?? "50% 50%";
  const { above, below } = splitBeats(panel.beats);

  // Balloons sit under the speaker: from the speaker's place in the art when the
  // script records it, otherwise alternating sides as the conversation goes.
  const sides: Record<string, Side> = {};
  let nextSide: Side = "start";
  const sideFor = (line: Dialogue): { side: Side; anchored: boolean } => {
    const anchor = panel.anchors?.[line.speaker];
    if (anchor && !line.speakerLabel) {
      return { side: anchor.x < 40 ? "start" : anchor.x > 60 ? "end" : "center", anchored: true };
    }
    const key = line.speakerLabel ?? line.speaker;
    if (!sides[key]) {
      sides[key] = nextSide;
      nextSide = nextSide === "start" ? "end" : "start";
    }
    return { side: sides[key], anchored: false };
  };

  const letter = (beat: Beat, i: number, where: "above" | "below") => {
    switch (beat.kind) {
      case "caption":
        return (
          <p key={i} className={styles.caption} data-style={beat.style ?? "narration"}>
            {beat.text}
          </p>
        );
      case "sfx":
        return (
          <p key={i} className={styles.sfx} data-where={where}>
            {beat.text}
          </p>
        );
      case "intro": {
        const c = characters.find((ch) => ch.id === beat.character);
        if (!c) return null;
        return (
          <p key={i} className={styles.intro}>
            <strong>{c.name}</strong> {c.role}
          </p>
        );
      }
      case "dialogue": {
        const c = characters.find((ch) => ch.id === beat.speaker);
        const { side, anchored } = sideFor(beat);
        const name = beat.speakerLabel ?? c?.name ?? beat.speaker;
        return (
          <p
            key={i}
            className={styles.balloon}
            data-side={side}
            data-delivery={beat.delivery ?? "speech"}
            data-accent={c?.accent ?? "blue"}
          >
            {!anchored && <span className={styles.who}>{name}</span>}
            {anchored && <span className="visually-hidden">{name}: </span>}
            {beat.text}
          </p>
        );
      }
      case "suspect": {
        const s = suspects.find((x) => x.id === beat.suspect);
        if (!s) return null;
        const c = characters.find((ch) => ch.id === s.character);
        return (
          <button
            key={i}
            type="button"
            className={styles.suspect}
            onClick={(e) => {
              e.stopPropagation();
              onOpenCasebook();
            }}
          >
            {c?.portrait && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={asset(c.portrait)} alt="" />
            )}
            <span>
              <span className={styles.suspectTag}>Suspect</span>
              <strong>{s.label}</strong>
              {s.card}
            </span>
          </button>
        );
      }
      case "clue": {
        const cl = clues.find((x) => x.id === beat.clue);
        if (!cl) return null;
        return (
          <button
            key={i}
            type="button"
            className={styles.stamp}
            onClick={(e) => {
              e.stopPropagation();
              onOpenClue(cl.id);
            }}
          >
            Added to Kit&rsquo;s casebook: {cl.title}
          </button>
        );
      }
      case "prompt":
        return (
          <button
            key={i}
            type="button"
            className={styles.prompt}
            onClick={(e) => {
              e.stopPropagation();
              const it = panel.interactions?.find((x) => x.id === beat.interaction);
              if (it) onInteract(it);
            }}
          >
            <span className={styles.promptLens} aria-hidden="true" />
            {beat.text}
          </button>
        );
    }
  };

  const style = {
    "--frame": frameRatio,
    "--image": imageRatio,
    "--focus": focus,
  } as CSSProperties;

  const artBox = (
    <div className={styles.art} data-placeholder={placeholder ? "" : undefined}>
      {placeholder && panel.standIn ? (
        // Planned shot without art yet: the picture it came from, reframed closer.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(panel.standIn.art.src)}
          alt={panel.standIn.art.alt}
          draggable={false}
          loading="lazy"
          style={{
            objectPosition: panel.standIn.focus,
            transform: `scale(${panel.standIn.zoom})`,
            transformOrigin: panel.standIn.focus,
          }}
        />
      ) : placeholder ? (
        <div className={styles.placeholder} role="img" aria-label={art.alt}>
          {art.placeholderReference && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.placeholderRef} src={asset(art.placeholderReference)} alt="" />
          )}
          <span className={styles.placeholderTag}>Art to come</span>
          <span className={styles.placeholderBrief}>{art.brief ?? art.alt}</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(art.src)} alt={art.alt} width={art.width} height={art.height} draggable={false} loading="lazy" />
      )}
      {panel.interactions?.map((it) => {
        if (!it.region) return null;
        const r = placeRegion(it.region, imageRatio, frameRatio, focus);
        const found = it.kind === "inspect" && foundClues.includes(it.clue);
        return (
          <button
            key={it.id}
            type="button"
            className={styles.hotspot}
            data-found={found ? "" : undefined}
            style={{ left: `${r.x + r.w / 2}%`, top: `${r.y + r.h / 2}%` }}
            onClick={(e) => {
              e.stopPropagation();
              onInteract(it);
            }}
            aria-label={found ? `${it.label} (already in the casebook)` : it.label}
          >
            <span aria-hidden="true" />
          </button>
        );
      })}
      {showNotes && (
        <span className={styles.note} data-status={art.status}>
          {panel.planned ? `Planned shot ${panel.planned.prompt}${panel.standIn ? " · stand-in" : ""}` : `Art: ${art.status}`}
          {panel.artNeeded ? ` · needs ${panel.artNeeded}` : ""}
          {panel.plant ? ` · plant: ${panel.plant}` : ""}
        </span>
      )}
    </div>
  );

  return (
    <figure
      className={styles.panel}
      data-fit={fit}
      data-flat={flat}
      data-active={active ? "" : undefined}
      data-tall={imageRatio < 1 ? "" : undefined}
      style={style}
      onClick={onSelect}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      aria-label={onSelect ? `Read this panel up close: ${art.alt}` : undefined}
      onKeyDown={
        onSelect
          ? (e) => {
              if (e.key === "Enter" && e.target === e.currentTarget) onSelect();
            }
          : undefined
      }
    >
      {above.length > 0 && <div className={styles.above}>{above.map((b, i) => letter(b, i, "above"))}</div>}
      {artBox}
      {below.length > 0 && <div className={styles.below}>{below.map((b, i) => letter(b, i + above.length, "below"))}</div>}
    </figure>
  );
}
