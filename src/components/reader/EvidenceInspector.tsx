"use client";

import type { Character, Clue } from "@/lib/types";
import { asset } from "@/lib/asset";
import { Modal } from "@/components/ui/Modal";
import { BeatView } from "./TextTrack";
import { currentReading } from "./CaseNotebook";
import styles from "./EvidenceInspector.module.css";

interface Props {
  clue: Clue | null;
  foundClues: string[];
  characters: Character[];
  showNotes: boolean;
  onClose: () => void;
}

/** Magnified evidence. The written detail is the clue's text alternative. */
export function EvidenceInspector({ clue, foundClues, characters, showNotes, onClose }: Props) {
  const reading = clue ? currentReading(clue, foundClues) : null;
  return (
    <Modal open={!!clue} onClose={onClose} title={clue ? `Evidence: ${clue.title}` : "Evidence"}>
      {clue && (
        <div className={styles.layout}>
          {clue.image && (
            <div className={styles.lens}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(clue.image.src)} alt={clue.image.alt} />
            </div>
          )}
          <div className={styles.text}>
            <p className={styles.detail}>{clue.detail}</p>
            {reading?.reread && (
              <p className={styles.reread}>
                <strong>New reading:</strong> {reading.summary}
              </p>
            )}
            {clue.reaction && (
              <div className={styles.reaction}>
                {clue.reaction.map((line, i) => (
                  <BeatView key={i} beat={line} character={characters.find((c) => c.id === line.speaker)} />
                ))}
              </div>
            )}
            <p className={styles.stamp}>
              <span aria-hidden="true">✦</span> Added to the case notebook
            </p>
            {showNotes && <p className={styles.note}>Clue: {clue.status} · dialogue: draft</p>}
          </div>
        </div>
      )}
    </Modal>
  );
}
