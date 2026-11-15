"use client";

import type { Episode } from "@/lib/types";
import { asset } from "@/lib/asset";
import { Modal } from "@/components/ui/Modal";
import styles from "./CaseNotebook.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  episode: Episode;
  foundClues: string[];
  metCharacters: string[];
  onInspect: (clueId: string) => void;
}

/** Updates itself as clues are examined and characters are introduced. */
export function CaseNotebook({ open, onClose, episode, foundClues, metCharacters, onInspect }: Props) {
  const found = episode.clues.filter((c) => foundClues.includes(c.id));
  const missing = episode.clues.length - found.length;
  const met = episode.characters.filter((c) => metCharacters.includes(c.id));

  return (
    <Modal open={open} onClose={onClose} title="Case notebook" variant="sheet">
      <section className={styles.section}>
        <h3 className={styles.heading}>The case</h3>
        <p className={styles.case}>{episode.logline}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>
          Clues <span className={styles.count}>{found.length} / {episode.clues.length}</span>
        </h3>
        {found.length === 0 && <p className={styles.empty}>No clues yet. Look for the gold lens on a panel.</p>}
        <ul className={styles.list}>
          {found.map((c) => (
            <li key={c.id}>
              <button type="button" className={styles.clue} onClick={() => onInspect(c.id)}>
                {c.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={asset(c.image.src)} alt="" />
                )}
                <span>
                  <strong>{c.title}</strong>
                  {c.summary}
                </span>
              </button>
            </li>
          ))}
          {Array.from({ length: missing }, (_, i) => (
            <li key={`missing-${i}`} className={styles.missing} aria-label="Undiscovered clue">
              ? Undiscovered
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>Characters met</h3>
        {met.length === 0 && <p className={styles.empty}>Nobody yet.</p>}
        <ul className={styles.people}>
          {met.map((c) => (
            <li key={c.id} className={styles.person}>
              {c.portrait && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset(c.portrait)} alt="" />
              )}
              <span>
                <strong>{c.name}</strong>
                {c.role}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>Suspects</h3>
        <p className={styles.empty}>Suspect files open later in the investigation.</p>
      </section>
    </Modal>
  );
}
