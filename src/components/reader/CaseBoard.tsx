"use client";

import { useState } from "react";
import type { Deduction } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";
import styles from "./CaseBoard.module.css";

interface Props {
  open: boolean;
  deductions: Deduction[];
  onClose: () => void;
}

/**
 * The reader's chance to solve the case before Ramona explains it.
 * Optional and never blocks the story: wrong picks get a nudge, not a penalty.
 */
export function CaseBoard({ open, deductions, onClose }: Props) {
  const [picks, setPicks] = useState<Record<string, string>>({});
  const solved = deductions.filter((d) => picks[d.id] === d.answer).length;

  return (
    <Modal open={open} onClose={onClose} title="Solve the case">
      <p className={styles.intro}>
        Everything you need is in the case notebook. Can you beat Ramona to it?
      </p>
      <ol className={styles.list}>
        {deductions.map((d, n) => {
          const pick = picks[d.id];
          const right = pick === d.answer;
          return (
            <li key={d.id} className={styles.question} data-solved={right ? "" : undefined}>
              <h3 className={styles.q}>
                <span className={styles.num}>{["Who", "How", "Why"][n] ?? n + 1}</span> {d.question}
              </h3>
              <div className={styles.options} role="group" aria-label={d.question}>
                {d.options.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    className={styles.option}
                    aria-pressed={pick === o.id}
                    data-state={pick === o.id ? (right ? "right" : "wrong") : undefined}
                    disabled={right}
                    onClick={() => setPicks((p) => ({ ...p, [d.id]: o.id }))}
                  >
                    {o.text}
                  </button>
                ))}
              </div>
              <p className={styles.feedback} aria-live="polite">
                {pick && (right ? (
                  <><strong>Yes.</strong> {d.explanation}</>
                ) : (
                  <><strong>Not yet.</strong> {d.hint ?? "Look again at the clues in your notebook."}</>
                ))}
              </p>
            </li>
          );
        })}
      </ol>
      {solved === deductions.length && deductions.length > 0 && (
        <p className={styles.closed}>
          <span aria-hidden="true">✦</span> You solved it before Ramona did. Now read on and catch him.
        </p>
      )}
    </Modal>
  );
}
