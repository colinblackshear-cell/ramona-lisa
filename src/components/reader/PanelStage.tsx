"use client";

import type { CSSProperties } from "react";
import type { Interaction, Panel } from "@/lib/types";
import { asset } from "@/lib/asset";
import styles from "./PanelStage.module.css";

interface PanelStageProps {
  panel: Panel;
  showNotes: boolean;
  foundClues: string[];
  onInspect: (interaction: Interaction) => void;
}

/**
 * One illustrated panel. The art always keeps its full aspect ratio so
 * hotspot regions (percentages) line up on every screen size.
 */
export function PanelStage({ panel, showNotes, foundClues, onInspect }: PanelStageProps) {
  const { art } = panel;
  const isPlaceholder = art.status === "placeholder";
  const ratio = isPlaceholder ? 3 / 2 : art.width / art.height;
  const style = {
    "--ar": ratio,
    "--focus": panel.focus ?? "50% 50%",
  } as CSSProperties;

  return (
    <figure
      className={`${styles.frame} ${styles[`enter-${panel.transition ?? "fade"}`]}`}
      style={style}
      data-tall={ratio < 1 ? "" : undefined}
    >
      <div className={`${styles.camera} ${styles[`cam-${panel.camera ?? "still"}`]}`}>
        {isPlaceholder ? (
          <div className={styles.placeholder} role="img" aria-label={art.alt}>
            {art.placeholderReference && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.placeholderRef} src={asset(art.placeholderReference)} alt="" />
            )}
            <div className={styles.placeholderText}>
              <span className={styles.placeholderTag}>Art needed</span>
              <p>{art.brief}</p>
            </div>
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.art} src={asset(art.src)} alt={art.alt} width={art.width} height={art.height} draggable={false} />
        )}

        {panel.interactions?.map((it) => {
          const found = foundClues.includes(it.clue);
          return (
            <button
              key={it.id}
              type="button"
              className={styles.hotspot}
              data-found={found ? "" : undefined}
              style={{
                left: `${it.region.x}%`,
                top: `${it.region.y}%`,
                width: `${it.region.w}%`,
                height: `${it.region.h}%`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onInspect(it);
              }}
              aria-label={found ? `${it.label} (already in notebook)` : it.label}
            >
              <span className={styles.lens} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      {showNotes && (
        <figcaption className={styles.note} data-status={art.status}>
          Art: {art.status}
          {panel.rituals?.length ? <> · Ritual: {panel.rituals.join(", ")}</> : null}
          {panel.plant && <span className={styles.needed}>Plant: {panel.plant}</span>}
          {panel.artNeeded && <span className={styles.needed}>Art needed: {panel.artNeeded}</span>}
        </figcaption>
      )}
    </figure>
  );
}
