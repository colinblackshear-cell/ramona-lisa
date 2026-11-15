"use client";

import { useState } from "react";
import type { Artifact } from "@/lib/types";
import { asset } from "@/lib/asset";
import { Modal } from "@/components/ui/Modal";
import styles from "./ArtifactExplorer.module.css";

interface Props {
  artifact: Artifact | null;
  onClose: () => void;
}

/** The treasure's real story, one fact at a time, each marked real or invented. */
export function ArtifactExplorer({ artifact, onClose }: Props) {
  const [active, setActive] = useState(0);
  const fact = artifact?.facts[active];

  return (
    <Modal open={!!artifact} onClose={onClose} title={artifact ? `The treasure: ${artifact.name}` : "The treasure"}>
      {artifact && fact && (
        <div className={styles.layout}>
          <p className={styles.summary}>{artifact.summary}</p>
          <div className={styles.tabs} role="tablist" aria-label="Facts about the treasure">
            {artifact.facts.map((f, i) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                id={`fact-tab-${f.id}`}
                aria-selected={i === active}
                aria-controls={`fact-panel-${f.id}`}
                className={styles.tab}
                onClick={() => setActive(i)}
              >
                {f.title}
              </button>
            ))}
          </div>
          <section
            className={styles.fact}
            role="tabpanel"
            id={`fact-panel-${fact.id}`}
            aria-labelledby={`fact-tab-${fact.id}`}
            key={fact.id}
          >
            {fact.diagram === "layered-stone" && <LayeredStone />}
            {!fact.diagram && artifact.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={styles.image} src={asset(artifact.image.src)} alt={artifact.image.alt} />
            )}
            <div>
              <h3 className={styles.factTitle}>{fact.title}</h3>
              <p className={styles.factText}>{fact.text}</p>
              <p className={styles.truth} data-truth={fact.truth}>
                {fact.truth === "real" ? "True history" : "Invented for the story"}
              </p>
            </div>
          </section>
        </div>
      )}
    </Modal>
  );
}

/** Schematic cross-section of banded stone carved as a cameo. Not character art. */
function LayeredStone() {
  return (
    <figure className={styles.diagram}>
      <svg viewBox="0 0 320 200" role="img" aria-labelledby="ls-title ls-desc">
        <title id="ls-title">How a cameo is carved</title>
        <desc id="ls-desc">
          A slice of banded stone: a pale top layer over a dark lower layer. The carver cuts the pale layer away everywhere
          except the portrait, so a white raised figure stands on a dark ground.
        </desc>
        {/* dark ground layer */}
        <rect x="20" y="110" width="280" height="60" fill="#10283B" />
        {/* pale layer, carved away except the raised figure */}
        <path d="M110 110 C 115 70, 150 55, 170 62 C 195 70, 205 90, 210 110 Z" fill="#F3E8CF" stroke="#10283B" strokeWidth="2" />
        <rect x="20" y="104" width="90" height="6" fill="#F3E8CF" opacity="0.35" />
        <rect x="210" y="104" width="90" height="6" fill="#F3E8CF" opacity="0.35" />
        {/* chisel marks */}
        <path d="M60 96 l12 8 M250 96 l-12 8" stroke="#C49A4D" strokeWidth="3" strokeLinecap="round" />
        <g fontFamily="Courier Prime, monospace" fontSize="11" fill="#10283B">
          <text x="214" y="58">pale layer: kept</text>
          <text x="214" y="71">as the portrait</text>
          <path d="M212 62 L190 74" stroke="#C49A4D" strokeWidth="2" />
          <text x="22" y="190">dark layer: left as the background</text>
          <text x="22" y="84">pale layer: cut away</text>
        </g>
      </svg>
      <figcaption className={styles.diagramCaption}>Diagram, not to scale.</figcaption>
    </figure>
  );
}
