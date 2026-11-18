"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import styles from "./MovieView.module.css";

interface Props {
  /** The whole comic page; the camera moves over it. */
  page: ReactNode;
  /** Flat index of the panel the camera is on. */
  focus: number;
  /** For a panel taller than the screen: which part of it (0 = top). */
  stop: number;
  /** Reports how many stops the current panel needs. */
  onStops: (n: number) => void;
  dir: 1 | -1;
}

const PAD = 14;
/** Largest lettering we allow when zooming in, in CSS pixels. */
const MAX_LETTER = 27;

/** Sum of offsets from an element up to (not including) an ancestor. Layout values, so transforms don't affect them. */
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let e: HTMLElement | null = el;
  while (e && e !== root) {
    x += e.offsetLeft;
    y += e.offsetTop;
    e = e.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/**
 * The movie camera: the comic page stays a page, and the camera glides and zooms
 * from panel to panel across it, dimming the rest, the way a motion comic moves.
 * A panel taller than the screen is read in stops, tilting down it.
 */
export function MovieView({ page, focus, stop, onStops, dir }: Props) {
  const viewport = useRef<HTMLDivElement>(null);
  const camera = useRef<HTMLDivElement>(null);
  const [t, setT] = useState<{ x: number; y: number; s: number } | null>(null);
  const [animate, setAnimate] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const onResize = () => setTick((n) => n + 1);
    window.addEventListener("resize", onResize);
    // Fonts arriving can change the lettering's size.
    document.fonts?.ready.then(onResize).catch(() => {});
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useLayoutEffect(() => {
    const vp = viewport.current;
    const cam = camera.current;
    if (!vp || !cam) return;
    const el = cam.querySelector<HTMLElement>(`[data-flat="${focus}"]`);
    if (!el) return;
    const vw = vp.clientWidth;
    const vh = vp.clientHeight;
    const { x, y } = offsetWithin(el, cam);
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const letter = parseFloat(getComputedStyle(el).fontSize) || 16;
    const maxS = Math.max(1, MAX_LETTER / letter);
    const sw = Math.min((vw - PAD * 2) / w, maxS);
    const sh = (vh - PAD * 2) / h;
    let s: number;
    let ty: number;
    let stops = 1;
    if (sh >= sw * 0.8) {
      // The whole panel fits: centre it.
      s = Math.min(sw, sh);
      ty = vh / 2 - (y + h / 2) * s;
    } else {
      // Too tall: fill the width and tilt down it in stops.
      s = sw;
      const view = (vh - PAD * 2) / s;
      stops = Math.max(1, Math.ceil((h - view * 0.15) / (view * 0.85)));
      const top = Math.min(y + Math.min(stop, stops - 1) * view * 0.85, y + h - view);
      ty = PAD - top * s;
    }
    const tx = vw / 2 - (x + w / 2) * s;
    onStops(stops);
    setT({ x: tx, y: ty, s });
  }, [focus, stop, tick, onStops]);

  // First placement on a new page is instant; after that the camera glides.
  useEffect(() => {
    if (!t || animate) return;
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, [t, animate]);

  return (
    <div ref={viewport} className={styles.viewport} data-dir={dir}>
      <div
        ref={camera}
        className={styles.camera}
        data-animate={animate ? "" : undefined}
        style={{
          transform: t ? `translate(${t.x}px, ${t.y}px) scale(${t.s})` : undefined,
          visibility: t ? "visible" : "hidden",
        }}
      >
        {page}
      </div>
    </div>
  );
}
