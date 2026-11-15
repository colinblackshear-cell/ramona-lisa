"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Episode, Interaction } from "@/lib/types";
import { asset } from "@/lib/asset";
import { saveProgress, type EpisodeProgress } from "@/lib/progress";
import { buildSteps, firstStepOfScene, resolveStep, stepForPanel } from "./steps";
import { PanelStage } from "./PanelStage";
import { TextTrack } from "./TextTrack";
import { EvidenceInspector } from "./EvidenceInspector";
import { CaseNotebook } from "./CaseNotebook";
import { ArtifactExplorer } from "./ArtifactExplorer";
import styles from "./Reader.module.css";

interface ReaderProps {
  episode: Episode;
  initial: EpisodeProgress;
  onExit: () => void;
}

const NOTES_KEY = "ramona-lisa:production-notes";

export function Reader({ episode, initial, onExit }: ReaderProps) {
  const steps = useMemo(() => buildSteps(episode), [episode]);
  const [step, setStep] = useState(() => Math.min(Math.max(initial.step, 0), steps.length - 1));
  const [foundClues, setFoundClues] = useState<string[]>(initial.foundClues);
  const [metCharacters, setMet] = useState<string[]>(initial.metCharacters);
  const [seenSuspects, setSeenSuspects] = useState<string[]>(initial.seenSuspects ?? []);
  const [exploring, setExploringRaw] = useState<string | null>(null);
  const [explored, setExplored] = useState<string[]>(initial.explored ?? []);
  const setExploring = (id: string | null) => {
    setExploringRaw(id);
    if (id && !explored.includes(id)) setExplored((e) => [...e, id]);
  };
  const [inspecting, setInspecting] = useState<string | null>(null);
  const [notebookOpen, setNotebookOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [justFound, setJustFound] = useState(false);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  const current = steps[step];
  const { scene, panel, visibleBeats } = resolveStep(episode, current);
  const modalOpen = inspecting !== null || notebookOpen || exploring !== null;

  // Production notes preference
  useEffect(() => {
    try {
      const v = window.localStorage.getItem(NOTES_KEY);
      if (v !== null) setShowNotes(v === "1");
    } catch {}
  }, []);
  const toggleNotes = () =>
    setShowNotes((v) => {
      try {
        window.localStorage.setItem(NOTES_KEY, v ? "0" : "1");
      } catch {}
      return !v;
    });

  // Characters are "met" when their intro beat is shown.
  useEffect(() => {
    const intros = visibleBeats.flatMap((b) => (b.kind === "intro" ? [b.character] : []));
    const fresh = intros.filter((id) => !metCharacters.includes(id));
    if (fresh.length) setMet((m) => [...m, ...fresh]);
  }, [visibleBeats, metCharacters]);

  // Suspect cards are filed in the notebook when they are dealt.
  useEffect(() => {
    const dealt = visibleBeats.flatMap((b) => (b.kind === "suspect" ? [b.suspect] : []));
    const fresh = dealt.filter((id) => !seenSuspects.includes(id));
    if (fresh.length) setSeenSuspects((s) => [...s, ...fresh]);
  }, [visibleBeats, seenSuspects]);

  // Clues heard or seen in the story file themselves.
  useEffect(() => {
    const noted = visibleBeats.flatMap((b) => (b.kind === "clue" ? [b.clue] : []));
    const fresh = noted.filter((id) => !foundClues.includes(id));
    if (fresh.length) {
      setFoundClues((f) => [...f, ...fresh]);
      setJustFound(true);
    }
  }, [visibleBeats, foundClues]);

  // Save after every change
  useEffect(() => {
    saveProgress(episode.id, {
      step,
      foundClues,
      metCharacters,
      seenSuspects,
      explored,
      finished: current.type === "end",
      updatedAt: Date.now(),
    });
  }, [episode.id, step, foundClues, metCharacters, seenSuspects, explored, current.type]);

  const next = useCallback(() => setStep((s) => Math.min(s + 1, steps.length - 1)), [steps.length]);
  const back = useCallback(() => setStep((s) => Math.max(s - 1, 0)), []);

  // Keyboard: → / Space / Enter = next, ← = back, N = notebook
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      const onControl = t.closest("button, a, input, select, textarea");
      if (e.key === "ArrowRight" || ((e.key === " " || e.key === "Enter") && !onControl)) {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        back();
      } else if (e.key.toLowerCase() === "n" && !onControl) {
        setNotebookOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, back, modalOpen]);

  const inspect = (clueId: string) => {
    setInspecting(clueId);
    if (!foundClues.includes(clueId)) {
      setFoundClues((f) => [...f, clueId]);
      setJustFound(true);
    }
  };
  const interact = (it: Interaction) => {
    if (it.kind === "inspect") inspect(it.clue);
    else setExploring(it.artifact);
  };
  const interactById = (interactionId: string) => {
    const it = panel?.interactions?.find((i) => i.id === interactionId);
    if (it) interact(it);
  };

  // Tap anywhere on the stage (not on a control) to advance; swipe to turn.
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || (e.target as HTMLElement).closest("button, a")) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) next();
      else back();
    } else if (Math.abs(dx) < 8 && Math.abs(dy) < 8 && e.button === 0) {
      next();
    }
  };

  const clue = episode.clues.find((c) => c.id === inspecting) ?? null;
  const tall = panel ? panel.art.status !== "placeholder" && panel.art.height > panel.art.width : false;
  const sceneNumber = scene?.number;
  const progressPct = Math.round((step / (steps.length - 1)) * 100);

  return (
    <div className={styles.reader}>
      <header className={styles.toolbar}>
        <button type="button" className={styles.brand} onClick={onExit} aria-label={`${episode.title}: back to cover`}>
          <span className={styles.brandEp}>Ep. {episode.number}</span>
          <span className={styles.brandTitle}>{episode.title}</span>
        </button>

        <nav className={styles.scenes} aria-label="Scenes">
          {episode.scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={styles.sceneBtn}
              aria-current={sceneNumber === s.number ? "step" : undefined}
              onClick={() => setStep(firstStepOfScene(steps, i))}
              title={s.title}
            >
              <span className="visually-hidden">Scene </span>
              {s.number}
              <span className={styles.sceneName}>{s.title}</span>
            </button>
          ))}
        </nav>

        <div className={styles.tools}>
          <button
            type="button"
            className={styles.toolBtn}
            aria-pressed={showNotes}
            onClick={toggleNotes}
            title="Show which art and text is canon, proposed or placeholder"
          >
            Notes
          </button>
          <button
            type="button"
            className={`${styles.toolBtn} ${styles.notebookBtn}`}
            data-flash={justFound ? "" : undefined}
            onAnimationEnd={() => setJustFound(false)}
            onClick={() => setNotebookOpen(true)}
          >
            Notebook <span className={styles.badge}>{foundClues.length}</span>
          </button>
        </div>
        <div className={styles.progress} role="progressbar" aria-label="Episode progress" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100}>
          <span style={{ width: `${progressPct}%` }} />
        </div>
      </header>

      <main className={styles.stage} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {current.type === "title" && scene && (
          <section key={`title-${scene.id}`} className={styles.titleCard} aria-live="polite">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {scene.panels[0]?.art.status !== "placeholder" && <img className={styles.titleBg} src={asset(scene.panels[0].art.src)} alt="" />}
            <p className={styles.titleKicker}>Scene {scene.number}</p>
            <h1 className={styles.titleText}>{scene.title}</h1>
            <p className={styles.titleSlug}>{scene.slug}</p>
            {showNotes && <p className={styles.noteChip}>Script: {scene.scriptStatus}</p>}
          </section>
        )}

        {current.type === "beat" && panel && (
          <div className={styles.spread} data-tall={tall ? "" : undefined}>
            <PanelStage key={panel.id} panel={panel} showNotes={showNotes} foundClues={foundClues} onInspect={interact} />
            <div className={styles.words}>
              <TextTrack
                key={panel.id}
                beats={visibleBeats}
                characters={episode.characters}
                suspects={episode.suspects}
                clues={episode.clues}
                onPrompt={interactById}
                onOpenClue={(id) => setInspecting(id)}
              />
            </div>
          </div>
        )}

        {current.type === "end" && (
          <section className={styles.endCard}>
            <p className={styles.titleKicker}>End of prototype</p>
            <h1 className={styles.titleText}>To be continued…</h1>
            <p className={styles.endText}>
              You found {foundClues.length} of {episode.clues.length} {episode.clues.length === 1 ? "clue" : "clues"}.
            </p>
            {foundClues.length < episode.clues.length && (
              <button
                type="button"
                className={styles.primary}
                onClick={() => {
                  const missing = episode.scenes
                    .flatMap((s) => s.panels)
                    .find((p) => p.interactions?.some((i) => i.kind === "inspect" && !foundClues.includes(i.clue)));
                  if (missing) setStep(stepForPanel(steps, missing.id, episode) + missing.beats.length - 1);
                }}
              >
                Go back for the missed clue
              </button>
            )}
            <div className={styles.endActions}>
              <button type="button" className={styles.secondary} onClick={() => setNotebookOpen(true)}>
                Open case notebook
              </button>
              <button type="button" className={styles.secondary} onClick={() => setStep(0)}>
                Read again
              </button>
            </div>
            {episode.continuation && <p className={styles.endNote}>{episode.continuation}</p>}
          </section>
        )}
      </main>

      <footer className={styles.controls}>
        <button type="button" className={styles.navBtn} onClick={back} disabled={step === 0} aria-label="Previous">
          ‹ <span className={styles.navLabel}>Back</span>
        </button>
        <p className={styles.hint} aria-hidden="true">
          Tap, swipe or press → to read on
        </p>
        <button type="button" className={`${styles.navBtn} ${styles.navNext}`} onClick={next} disabled={current.type === "end"} aria-label="Next">
          <span className={styles.navLabel}>Next</span> ›
        </button>
      </footer>

      <EvidenceInspector clue={clue} foundClues={foundClues} characters={episode.characters} showNotes={showNotes} onClose={() => setInspecting(null)} />
      <CaseNotebook
        open={notebookOpen}
        onClose={() => setNotebookOpen(false)}
        episode={episode}
        foundClues={foundClues}
        metCharacters={metCharacters}
        seenSuspects={seenSuspects}
        explored={explored}
        onInspect={(id) => {
          setNotebookOpen(false);
          setInspecting(id);
        }}
        onExplore={(id) => {
          setNotebookOpen(false);
          setExploring(id);
        }}
      />
      <ArtifactExplorer
        artifact={episode.artifacts?.find((a) => a.id === exploring) ?? null}
        onClose={() => setExploring(null)}
      />
    </div>
  );
}
