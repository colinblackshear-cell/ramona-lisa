"use client";

import type { Clue, Episode } from "@/lib/types";
import { asset } from "@/lib/asset";
import { Modal } from "@/components/ui/Modal";
import { SuspectCard } from "./TextTrack";
import styles from "./CaseNotebook.module.css";

interface Props {
  open: boolean;
  onClose: () => void;
  episode: Episode;
  foundClues: string[];
  metCharacters: string[];
  seenSuspects: string[];
  explored: string[];
  onInspect: (clueId: string) => void;
  onExplore: (artifactId: string) => void;
}

/** What the clue means now: a later clue can change its reading. */
export function currentReading(clue: Clue, foundClues: string[]): { summary: string; reread: boolean } {
  if (clue.rereading && foundClues.includes(clue.rereading.byClue)) {
    return { summary: clue.rereading.summary, reread: true };
  }
  return { summary: clue.summary, reread: false };
}

/** Kit's casebook. Updates itself as clues, suspects and characters turn up. */
export function CaseNotebook({
  open,
  onClose,
  episode,
  foundClues,
  metCharacters,
  seenSuspects,
  explored,
  onInspect,
  onExplore,
}: Props) {
  const found = foundClues.map((id) => episode.clues.find((c) => c.id === id)).filter((c): c is Clue => !!c);
  const missing = episode.clues.length - found.length;
  const met = episode.characters.filter((c) => metCharacters.includes(c.id));
  const suspects = episode.suspects.filter((s) => seenSuspects.includes(s.id));
  const treasures = (episode.artifacts ?? []).filter((a) => explored.includes(a.id));

  return (
    <Modal open={open} onClose={onClose} title="Kit's casebook" variant="sheet">
      <section className={styles.section}>
        <h3 className={styles.heading}>The case</h3>
        <p className={styles.case}>{episode.logline}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>
          Suspects <span className={styles.count}>{suspects.length}</span>
        </h3>
        {suspects.length === 0 && <p className={styles.empty}>No suspects yet.</p>}
        <ul className={styles.list}>
          {suspects.map((s) => (
            <li key={s.id}>
              <SuspectCard
                suspect={s}
                characters={episode.characters}
                leads={(s.leads ?? []).filter((l) => foundClues.includes(l.clue)).map((l) => l.text)}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.heading}>
          Clues <span className={styles.count}>{found.length} / {episode.clues.length}</span>
        </h3>
        {found.length === 0 && <p className={styles.empty}>No clues yet. Look for the gold lens on a panel.</p>}
        <ul className={styles.list}>
          {found.map((c) => {
            const { summary, reread } = currentReading(c, foundClues);
            return (
              <li key={c.id}>
                <button type="button" className={styles.clue} onClick={() => onInspect(c.id)}>
                  {c.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={asset(c.image.src)} alt="" />
                  ) : (
                    <span className={styles.clueMark} aria-hidden="true">✦</span>
                  )}
                  <span>
                    <strong>{c.title}</strong>
                    {reread && <span className={styles.reread}>New reading</span>}
                    {summary}
                  </span>
                </button>
              </li>
            );
          })}
          {missing > 0 && (
            <li className={styles.missing}>
              {missing} more {missing === 1 ? "clue" : "clues"} still out there
            </li>
          )}
        </ul>
      </section>

      {treasures.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.heading}>The treasure</h3>
          {treasures.map((a) => (
            <button key={a.id} type="button" className={styles.treasure} onClick={() => onExplore(a.id)}>
              <strong>{a.name}</strong>
              {a.summary}
            </button>
          ))}
        </section>
      )}

      <section className={styles.section}>
        <h3 className={styles.heading}>Characters met</h3>
        {met.length === 0 && <p className={styles.empty}>Nobody yet.</p>}
        <ul className={styles.people}>
          {met.map((c) => (
            <li key={c.id} className={styles.person}>
              {c.portrait ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={asset(c.portrait)} alt="" />
              ) : (
                <span className={styles.personBlank} aria-hidden="true">{c.name.charAt(0)}</span>
              )}
              <span>
                <strong>{c.name}</strong>
                {c.role}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </Modal>
  );
}
