"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { Beat, CameraShot, Character, Clue, Dialogue, Interaction, Panel, Suspect } from "@/lib/types";
import { asset } from "@/lib/asset";
import { CharacterIntro, SuspectCard } from "./TextTrack";
import styles from "./CinemaStage.module.css";

interface CinemaStageProps {
  panel: Panel;
  /** Index of the beat on screen now (0 for a panel with no beats). */
  beatIndex: number;
  characters: Character[];
  suspects: Suspect[];
  clues: Clue[];
  foundClues: string[];
  showNotes: boolean;
  reducedMotion: boolean;
  onInteract: (it: Interaction) => void;
  onPrompt: (interactionId: string) => void;
  onOpenClue: (clueId: string) => void;
}

interface Size {
  w: number;
  h: number;
}

/** How long a panel transition takes, in ms (the old panel stays underneath until then). */
const TRANSITION_MS = 1100;

function parseFocus(f?: string) {
  const m = f?.match(/(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/);
  return m ? { x: +m[1], y: +m[2] } : { x: 50, y: 50 };
}

/**
 * The camera for one beat. Authored shots win; otherwise the camera drifts
 * through the panel (push in, pull out, pan) and leans toward whoever is
 * speaking or whatever the reader is asked to examine.
 */
export function shotFor(panel: Panel, i: number): CameraShot {
  const authored = panel.shots?.[i];
  if (authored) return authored;
  const n = Math.max(panel.beats.length, 1);
  const t = n > 1 ? i / (n - 1) : 1;
  const base = parseFocus(panel.focus);
  let { x, y } = base;
  let zoom = 1.03 + 0.05 * t;
  switch (panel.camera) {
    case "push-in":
      zoom = 1 + 0.2 * t;
      break;
    case "pull-out":
      zoom = 1.2 - 0.2 * t;
      break;
    case "pan-left":
      x = base.x + 12 - 24 * t;
      zoom = 1.08;
      break;
    case "pan-right":
      x = base.x - 12 + 24 * t;
      zoom = 1.08;
      break;
  }
  const beat = panel.beats[i];
  // Coverage: when we know where the speaker stands, cut to a close-up on them,
  // then cut back to the wide when the next line belongs to nobody we can see.
  if (beat?.kind === "dialogue" && panel.anchors?.[beat.speaker]) {
    const a = panel.anchors[beat.speaker];
    return { x: a.x, y: a.y, zoom: a.zoom ?? 1.75, cut: true };
  }
  if (panel.anchors && i > 0) {
    const prev = panel.beats[i - 1];
    if (prev?.kind === "dialogue" && panel.anchors[prev.speaker]) return { x, y, zoom, cut: true };
  }
  if (beat?.kind === "prompt") {
    const it = panel.interactions?.find((x) => x.id === beat.interaction);
    if (it?.region) {
      x = it.region.x + it.region.w / 2;
      y = it.region.y + it.region.h / 2;
      zoom = Math.max(zoom, 1.3);
    }
  }
  return { x, y, zoom };
}

/** Lay the art out in the frame: fill it like a film frame, or letterbox art that would lose too much. */
function layout(frame: Size, ar: number, shot: CameraShot, nativeW: number, minVisible = 0.5) {
  const coverW = Math.max(frame.w, frame.h * ar);
  const coverH = coverW / ar;
  const containW = Math.min(frame.w, frame.h * ar);
  const visible = (frame.w * frame.h) / (coverW * coverH);
  // Fill the frame unless that would crop away most of the art or blow a small crop up until it blurs.
  let w = visible < minVisible ? containW : coverW;
  w = Math.min(w, Math.max(containW, nativeW * 1.7));
  const h = w / ar;
  const contain = w < frame.w - 1 || h < frame.h - 1;
  const z = shot.zoom;
  const sw = w * z;
  const sh = h * z;
  const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
  const ox = sw <= frame.w ? (frame.w - sw) / 2 : clamp(frame.w / 2 - (shot.x / 100) * sw, frame.w - sw, 0);
  const oy = sh <= frame.h ? (frame.h - sh) / 2 : clamp(frame.h / 2 - (shot.y / 100) * sh, frame.h - sh, 0);
  return { w, h, ox, oy, z, contain };
}

/**
 * Film view: the panel fills the screen like a frame of an animatic.
 * The camera moves between beats, panels cross-fade, wipe or cut, and the
 * lettering is set over the art like a comic.
 */
export function CinemaStage(props: CinemaStageProps) {
  const { panel, beatIndex } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<Size>({ w: 0, h: 0 });
  const [previous, setPrevious] = useState<{ panel: Panel; beat: number } | null>(null);
  const last = useRef({ panel, beat: beatIndex });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // Keep the outgoing panel underneath the incoming one while it transitions.
  useEffect(() => {
    if (last.current.panel.id !== panel.id) {
      const outgoing = last.current;
      if (panel.transition !== "cut" && !props.reducedMotion) {
        setPrevious(outgoing);
        const t = window.setTimeout(() => setPrevious(null), TRANSITION_MS);
        last.current = { panel, beat: beatIndex };
        return () => window.clearTimeout(t);
      }
      setPrevious(null);
    }
    last.current = { panel, beat: beatIndex };
  }, [panel, beatIndex, props.reducedMotion]);

  const tall = size.h > size.w * 1.05;
  const frame: Size = { w: size.w, h: tall ? Math.round(size.h * 0.56) : size.h };

  return (
    <div ref={ref} className={styles.cinema} data-tall={tall ? "" : undefined}>
      <div className={styles.frame} style={{ height: frame.h || undefined }}>
        {size.w > 0 && previous && previous.panel.id !== panel.id && (
          <ArtLayer key={`prev-${previous.panel.id}`} {...props} panel={previous.panel} beatIndex={previous.beat} frame={frame} leaving />
        )}
        {size.w > 0 && <ArtLayer key={panel.id} {...props} frame={frame} />}
        <div className={styles.vignette} aria-hidden="true" />
        {panel.beats[beatIndex]?.kind === "sfx" && (
          <p key={`sfx-${panel.id}-${beatIndex}`} className={styles.sfx} aria-hidden="true">
            {(panel.beats[beatIndex] as { text: string }).text}
          </p>
        )}
      </div>
      <Lettering {...props} />
      {props.showNotes && (
        <p className={styles.note} data-status={panel.art.status}>
          Art: {panel.art.status}
          {panel.rituals?.length ? ` · ${panel.rituals.join(", ")}` : ""}
          {panel.artNeeded ? ` · Needed: ${panel.artNeeded}` : ""}
        </p>
      )}
    </div>
  );
}

function ArtLayer({
  panel,
  beatIndex,
  frame,
  leaving,
  foundClues,
  reducedMotion,
  onInteract,
}: CinemaStageProps & { frame: Size; leaving?: boolean }) {
  const { art } = panel;
  const placeholder = art.status === "placeholder";
  const ar = placeholder ? 3 / 2 : art.width / art.height;
  const shot = reducedMotion ? { ...shotFor(panel, beatIndex), zoom: 1 } : shotFor(panel, beatIndex);
  const { w, h, ox, oy, z, contain } = layout(frame, ar, placeholder ? { x: 50, y: 50, zoom: 1 } : shot, placeholder ? 99999 : art.width, frame.h > frame.w * 0.9 ? 0.3 : 0.5);
  const world: CSSProperties = {
    width: w,
    height: h,
    transform: `translate3d(${ox}px, ${oy}px, 0) scale(${z})`,
    transition: shot.cut ? "none" : undefined,
  };

  return (
    <div
      className={styles.layer}
      data-enter={leaving ? undefined : panel.transition ?? "fade"}
      data-leaving={leaving ? "" : undefined}
      aria-hidden={leaving ? true : undefined}
    >
      {contain && !placeholder && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.backdrop} src={asset(art.src)} alt="" aria-hidden="true" />
      )}
      <div className={styles.world} style={world}>
        {placeholder ? (
          <div className={styles.placeholder} role="img" aria-label={art.alt}>
            <span className={styles.placeholderTag}>Planned shot</span>
            <p>{art.brief}</p>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.art} src={asset(art.src)} alt={leaving ? "" : art.alt} draggable={false} />
        )}
        {!leaving &&
          panel.interactions?.map((it) => {
            if (!it.region) return null;
            const found = it.kind === "inspect" && foundClues.includes(it.clue);
            return (
              <button
                key={it.id}
                type="button"
                className={styles.hotspot}
                data-found={found ? "" : undefined}
                style={{ left: `${it.region.x}%`, top: `${it.region.y}%`, width: `${it.region.w}%`, height: `${it.region.h}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  onInteract(it);
                }}
                aria-label={found ? `${it.label} (already in notebook)` : it.label}
              >
                <span className={styles.lens} aria-hidden="true" />
              </button>
            );
          })}
      </div>
    </div>
  );
}

/** Words over the art: captions top left, balloons along the bottom, cards and stamps as they happen. */
function Lettering({ panel, beatIndex, characters, suspects, clues, onPrompt, onOpenClue }: CinemaStageProps) {
  const beats = panel.beats.slice(0, beatIndex + 1);
  const current: Beat | undefined = panel.beats[beatIndex];
  const byId = (id: string) => characters.find((c) => c.id === id);

  // Captions: the last two in this panel.
  const captions = beats
    .map((b, i) => ({ b, i }))
    .filter((x) => x.b.kind === "caption")
    .slice(-2);

  // Balloons: the last two lines, if they were spoken in the last three beats.
  const lines = beats
    .map((b, i) => ({ b, i }))
    .filter((x): x is { b: Dialogue; i: number } => x.b.kind === "dialogue" && x.i >= beatIndex - 2)
    .slice(-2);

  // Who stands where: anchors first, otherwise speakers alternate left and right.
  const order: string[] = [];
  panel.beats.forEach((b) => {
    if (b.kind === "dialogue" && !order.includes(b.speaker)) order.push(b.speaker);
  });
  const side = (speaker: string) => {
    const a = panel.anchors?.[speaker];
    if (a) return a.x < 50 ? "left" : "right";
    return order.indexOf(speaker) % 2 === 0 ? "left" : "right";
  };

  const promptBeat = beats.find((b) => b.kind === "prompt");
  const spoken = current
    ? current.kind === "caption" || current.kind === "sfx"
      ? current.text
      : current.kind === "dialogue"
        ? `${current.speakerLabel ?? byId(current.speaker)?.name ?? current.speaker}: ${current.text}`
        : current.kind === "prompt"
          ? current.text
          : ""
    : "";

  return (
    <div className={styles.letters}>
      <p className="visually-hidden" aria-live="polite">
        {spoken}
      </p>

      <div className={styles.captions} aria-hidden="true">
        {captions.map(({ b, i }) =>
          b.kind === "caption" ? (
            <p key={i} className={`${styles.caption} ${styles[b.style ?? "narration"]}`} data-old={i < beatIndex - 3 ? "" : undefined}>
              {b.text}
            </p>
          ) : null,
        )}
      </div>

      <div className={styles.balloons} aria-hidden="true">
        {lines.map(({ b, i }) => {
          const c = byId(b.speaker);
          return (
            <div
              key={i}
              className={`${styles.balloon} ${styles[b.delivery ?? "speech"]}`}
              data-side={side(b.speaker)}
              data-old={i < beatIndex ? "" : undefined}
            >
              <span className={styles.speaker}>{b.speakerLabel ?? c?.name ?? b.speaker}</span>
              <span className={styles.words}>{b.text}</span>
            </div>
          );
        })}
      </div>

      {current?.kind === "intro" && byId(current.character) && (
        <div key={`intro-${beatIndex}`} className={styles.lowerThird}>
          <CharacterIntro character={byId(current.character)!} />
        </div>
      )}

      {current?.kind === "suspect" && (
        <div key={`suspect-${beatIndex}`} className={styles.dealt}>
          <SuspectCard suspect={suspects.find((s) => s.id === current.suspect)} characters={characters} />
        </div>
      )}

      {current?.kind === "clue" && (
        <button key={`clue-${beatIndex}`} type="button" className={styles.clueStamp} onClick={() => onOpenClue(current.clue)}>
          <span className={styles.clueKicker}>
            {clues.find((c) => c.id === current.clue)?.accidental ? "Accidental clue" : "Clue"} · noted in the casebook
          </span>
          <strong>{clues.find((c) => c.id === current.clue)?.title}</strong>
          <span className={styles.clueMore}>Look closer ›</span>
        </button>
      )}

      {promptBeat?.kind === "prompt" && (
        <button type="button" className={styles.prompt} onClick={() => onPrompt(promptBeat.interaction)}>
          <span aria-hidden="true">⌕</span> {promptBeat.text}
        </button>
      )}
    </div>
  );
}
