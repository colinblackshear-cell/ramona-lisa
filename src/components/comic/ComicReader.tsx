"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Episode, Interaction } from "@/lib/types";
import { saveProgress, type EpisodeProgress } from "@/lib/progress";
import { EvidenceInspector } from "@/components/reader/EvidenceInspector";
import { CaseNotebook } from "@/components/reader/CaseNotebook";
import { ArtifactExplorer } from "@/components/reader/ArtifactExplorer";
import { CaseBoard } from "@/components/reader/CaseBoard";
import { Modal } from "@/components/ui/Modal";
import { ComicPanel } from "./ComicPanel";
import { MovieView } from "./MovieView";
import { isSide, layoutEpisode, type ComicPage } from "./layout";
import styles from "./ComicReader.module.css";

interface Props {
  episode: Episode;
  initial: EpisodeProgress;
  onExit: () => void;
}

type Mode = "page" | "panel";

// v2: the movie camera is the default everywhere.
const MODE_KEY = "ramona-lisa:comic-mode:v2";
const NOTES_KEY = "ramona-lisa:production-notes";

function useMedia(query: string): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

/**
 * The episode as a comic book: whole pages (two side by side on a big screen),
 * or one panel at a time, gliding from panel to panel the way comic apps do.
 */
export function ComicReader({ episode, initial, onExit }: Props) {
  const layout = useMemo(() => layoutEpisode(episode), [episode]);
  const { pages, panels, pageOf } = layout;
  const END = panels.length;

  const [pos, setPos] = useState(() => Math.min(Math.max(initial.step, 0), END));
  const [mode, setModeRaw] = useState<Mode>("page");
  const [dir, setDir] = useState<1 | -1>(1);
  const [showNotes, setShowNotes] = useState(false);
  const [foundClues, setFoundClues] = useState<string[]>(initial.foundClues);
  const [metCharacters, setMet] = useState<string[]>(initial.metCharacters);
  const [seenSuspects, setSeenSuspects] = useState<string[]>(initial.seenSuspects ?? []);
  const [explored, setExplored] = useState<string[]>(initial.explored ?? []);
  const [inspecting, setInspecting] = useState<string | null>(null);
  const [exploring, setExploring] = useState<string | null>(null);
  const [deducing, setDeducing] = useState(false);
  const [casebookOpen, setCasebookOpen] = useState(false);
  const [contentsOpen, setContentsOpen] = useState(false);
  const [justFound, setJustFound] = useState(false);
  // Movie view: which part of a tall panel the camera is on, the scene title card, and Play.
  const [stop, setStop] = useState(0);
  const stopsRef = useRef(1);
  const onStops = useCallback((n: number) => {
    stopsRef.current = n;
  }, []);
  const [card, setCard] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const modalOpen = inspecting !== null || exploring !== null || deducing || casebookOpen || contentsOpen;

  const phone = useMedia("(max-width: 700px), (max-height: 560px)");
  const spread = useMedia("(min-width: 1100px) and (min-aspect-ratio: 5/4)");

  // Phones start panel by panel; bigger screens start with whole pages. The reader's own choice wins.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(MODE_KEY);
    } catch {}
    setModeRaw(saved === "page" ? "page" : "panel");
    try {
      setShowNotes(window.localStorage.getItem(NOTES_KEY) === "1");
    } catch {}
  }, []);
  const setMode = (m: Mode) => {
    setModeRaw(m);
    try {
      window.localStorage.setItem(MODE_KEY, m);
    } catch {}
  };
  const toggleNotes = () =>
    setShowNotes((v) => {
      try {
        window.localStorage.setItem(NOTES_KEY, v ? "0" : "1");
      } catch {}
      return !v;
    });

  const atEnd = pos >= END;
  const pageIndex = atEnd ? pages.length : pageOf[pos];
  // Pages shown together: one, or a two-page spread on a big screen.
  const group: ComicPage[] = atEnd
    ? []
    : spread
      ? pages.slice(pageIndex - (pageIndex % 2), pageIndex - (pageIndex % 2) + 2)
      : [pages[pageIndex]];

  const visiblePanels = useMemo(
    () => (atEnd ? [] : mode === "panel" ? [pos] : group.flatMap((p) => p.panels)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [atEnd, mode, pos, group.map((p) => p.index).join(",")],
  );

  // What the reader has seen goes into Kit's casebook.
  useEffect(() => {
    const beats = visiblePanels.flatMap((i) => panels[i].panel.beats);
    const intros = beats.flatMap((b) => (b.kind === "intro" ? [b.character] : []));
    const dealt = beats.flatMap((b) => (b.kind === "suspect" ? [b.suspect] : []));
    const noted = beats.flatMap((b) => (b.kind === "clue" ? [b.clue] : []));
    setMet((m) => (intros.some((id) => !m.includes(id)) ? [...m, ...intros.filter((id) => !m.includes(id))] : m));
    setSeenSuspects((s) => (dealt.some((id) => !s.includes(id)) ? [...s, ...dealt.filter((id) => !s.includes(id))] : s));
    setFoundClues((f) => {
      const fresh = noted.filter((id) => !f.includes(id));
      if (!fresh.length) return f;
      setJustFound(true);
      return [...f, ...fresh];
    });
  }, [visiblePanels, panels]);

  useEffect(() => {
    saveProgress(episode.id, {
      step: pos,
      foundClues,
      metCharacters,
      seenSuspects,
      explored,
      finished: atEnd,
      updatedAt: Date.now(),
    });
  }, [episode.id, pos, foundClues, metCharacters, seenSuspects, explored, atEnd]);

  const go = useCallback((to: number, d: 1 | -1) => {
    setDir(d);
    setStop(0);
    setPos(Math.min(Math.max(to, 0), END));
  }, [END]);

  // A scene title card, like a film, whenever the movie crosses into a new scene.
  const shownScene = useRef<number | null>(null);
  useEffect(() => {
    if (mode !== "panel" || pos >= END) return;
    const ref = panels[pos];
    if (ref.panelIndex === 0 && shownScene.current !== ref.sceneIndex) setCard(ref.sceneIndex);
    shownScene.current = ref.sceneIndex;
  }, [pos, mode, panels, END]);
  useEffect(() => {
    if (card === null) return;
    const t = window.setTimeout(() => setCard(null), 2600);
    return () => window.clearTimeout(t);
  }, [card]);

  const next = useCallback(() => {
    if (atEnd) return;
    if (card !== null) return setCard(null);
    if (mode === "panel") {
      if (stop < stopsRef.current - 1) return setStop(stop + 1);
      return go(pos + 1, 1);
    }
    const last = group[group.length - 1];
    const after = pages[last.index + 1];
    go(after ? after.panels[0] : END, 1);
  }, [atEnd, card, mode, stop, pos, group, pages, go, END]);

  const back = useCallback(() => {
    if (card !== null) return setCard(null);
    if (mode === "panel") {
      if (stop > 0) return setStop(stop - 1);
      return go(pos - 1, -1);
    }
    const first = atEnd ? pages.length : group[0].index;
    if (first === 0) return;
    const target = spread ? Math.max(0, first - 2) : first - 1;
    go(pages[target].panels[0], -1);
  }, [card, mode, stop, pos, atEnd, group, pages, spread, go]);

  // Play: the movie runs itself, each shot held long enough to read.
  useEffect(() => {
    if (!playing || modalOpen || mode !== "panel") return;
    if (atEnd) {
      setPlaying(false);
      return;
    }
    let ms = 2600;
    if (card === null) {
      const chars = panels[pos].panel.beats.reduce((n, b) => n + ("text" in b ? b.text.length : 0), 0);
      ms = Math.min(9000, chars ? 1500 + chars * 52 : 1900) / Math.max(1, stopsRef.current);
    }
    const t = window.setTimeout(next, ms);
    return () => window.clearTimeout(t);
  }, [playing, modalOpen, mode, atEnd, card, pos, stop, panels, next]);

  // Keyboard: ← → and space turn; Z switches page / panel; C opens the casebook.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (modalOpen || e.metaKey || e.ctrlKey || e.altKey) return;
      const onControl = (e.target as HTMLElement).closest("button, a, input, select, textarea, [role=button]");
      if (e.key === "ArrowRight" || (e.key === " " && !onControl)) {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        back();
      } else if (e.key.toLowerCase() === "z" && !onControl) {
        setMode(mode === "page" ? "panel" : "page");
      } else if (e.key.toLowerCase() === "p" && !onControl) {
        setPlaying((v) => !v);
      } else if (e.key.toLowerCase() === "c" && !onControl) {
        setCasebookOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [next, back, modalOpen, mode]);

  const inspect = (clueId: string) => {
    setInspecting(clueId);
    if (!foundClues.includes(clueId)) {
      setFoundClues((f) => [...f, clueId]);
      setJustFound(true);
    }
  };
  const interact = (it: Interaction) => {
    if (it.kind === "inspect") inspect(it.clue);
    else if (it.kind === "deduce") setDeducing(true);
    else {
      setExploring(it.artifact);
      if (!explored.includes(it.artifact)) setExplored((e) => [...e, it.artifact]);
    }
  };

  // Taps and swipes. Panel by panel: tap to go on, tap the left edge to go back,
  // double tap for the whole page. Whole pages: tap a panel to read it up close.
  const stageRef = useRef<HTMLElement>(null);
  useEffect(() => {
    stageRef.current?.scrollTo({ top: 0 });
  }, [pos, mode]);
  const start = useRef<{ x: number; y: number; t: number } | null>(null);
  const lastTap = useRef<{ t: number; x: number; y: number; pos: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY, t: Date.now() };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s || e.button !== 0) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      if (dx < 0) next();
      else back();
      return;
    }
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) return;
    const target = e.target as HTMLElement;
    if (target.closest("button, a")) return;
    if (mode === "panel") {
      // A quick second tap in the same spot is a double tap: undo the first tap and show the whole page.
      const now = Date.now();
      const prev = lastTap.current;
      if (prev && now - prev.t < 250 && Math.hypot(e.clientX - prev.x, e.clientY - prev.y) < 30) {
        lastTap.current = null;
        setPos(prev.pos);
        setStop(0);
        setCard(null);
        setMode("page");
        return;
      }
      lastTap.current = { t: now, x: e.clientX, y: e.clientY, pos };
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setPlaying(false);
      if (e.clientX - rect.left < rect.width * 0.28) return back();
      next();
    } else if (!target.closest("[role=button]")) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      if (x < 0.18) back();
      else if (x > 0.82) next();
    }
  };

  const openPanel = (flat: number) => {
    setDir(1);
    setPos(flat);
    setMode("panel");
  };

  const clue = episode.clues.find((c) => c.id === inspecting) ?? null;
  const shared = {
    characters: episode.characters,
    suspects: episode.suspects,
    clues: episode.clues,
    foundClues,
    showNotes,
    onInteract: interact,
    onOpenClue: (id: string) => setInspecting(id),
    onOpenCasebook: () => setCasebookOpen(true),
  };

  const sceneStrip = (sceneIndex: number) => {
    const scene = episode.scenes[sceneIndex];
    return (
      <header className={styles.sceneStrip}>
        <span className={styles.sceneNo}>{scene.number}</span>
        <span>
          <span className={styles.sceneTitle}>{scene.title}</span>
          <span className={styles.sceneSlug}>{scene.slug}</span>
        </span>
        {showNotes && <span className={styles.sceneNote}>Script: {scene.scriptStatus}</span>}
      </header>
    );
  };

  const renderPage = (page: ComicPage, focus?: number) => (
    <article key={page.index} className={styles.page} aria-label={`Page ${page.index + 1}`}>
      {page.sceneStart && sceneStrip(page.sceneIndex)}
      {page.rows.map((row) => (
        <div key={row[0].flat} className={styles.tier} data-count={row.length}>
          {row.map((r) => (
            <ComicPanel
              key={r.flat}
              panel={r.panel}
              fit={row.length === 2 ? "half" : isSide(row) ? "side" : "full"}
              onSelect={focus === undefined ? () => openPanel(r.flat) : undefined}
              flat={r.flat}
              active={focus === r.flat}
              {...shared}
            />
          ))}
        </div>
      ))}
      <span className={styles.folio}>{page.index + 1}</span>
    </article>
  );

  const current = !atEnd ? panels[pos] : null;
  const page = !atEnd ? pages[pageIndex] : null;
  const panelOnPage = page && current ? page.panels.indexOf(current.flat) : -1;

  const label = atEnd
    ? "The end"
    : mode === "page" && group.length === 2
      ? `Pages ${group[0].index + 1}–${group[1].index + 1} of ${pages.length}`
      : `Page ${pageIndex + 1} of ${pages.length}`;

  return (
    <div className={styles.reader} data-mode={mode} data-phone={phone ? "" : undefined}>
      <header className={styles.bar}>
        <button type="button" className={styles.iconBtn} onClick={onExit} aria-label="Back to the cover">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <button type="button" className={styles.where} onClick={() => setContentsOpen(true)} aria-label={`${label}. Open the contents`}>
          {label}
          <span aria-hidden="true"> ▾</span>
        </button>
        <div className={styles.barRight}>
          {!atEnd && (
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => setMode(mode === "page" ? "panel" : "page")}
              aria-label={mode === "page" ? "Watch it like a movie" : "See the whole page"}
              title={mode === "page" ? "Movie (Z)" : "Whole page (Z)"}
            >
              {mode === "page" ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="6" width="16" height="12" rx="1" />
                  <path d="M9 3v3M15 3v3M9 18v3M15 18v3" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="5" y="3" width="14" height="18" rx="1" />
                  <path d="M5 10h14M12 10v11" />
                </svg>
              )}
            </button>
          )}
          <button
            type="button"
            className={styles.iconBtn}
            data-flash={justFound ? "" : undefined}
            onAnimationEnd={() => setJustFound(false)}
            onClick={() => setCasebookOpen(true)}
            aria-label={`Kit's casebook, ${foundClues.length} ${foundClues.length === 1 ? "clue" : "clues"}`}
            title="Kit's casebook (C)"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z M5 17a3 3 0 013-3h11" />
            </svg>
            {foundClues.length > 0 && <span className={styles.badge}>{foundClues.length}</span>}
          </button>
        </div>
      </header>

      <main ref={stageRef} className={styles.stage} onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
        {atEnd && (
          <article className={`${styles.page} ${styles.endPage}`} data-dir={dir}>
            <p className={styles.endKicker}>Episode {episode.number} · {episode.title}</p>
            <h1 className={styles.endTitle}>{episode.continuation ? "To be continued…" : "Case closed!"}</h1>
            <p className={styles.endText}>
              You found {foundClues.length} of {episode.clues.length} {episode.clues.length === 1 ? "clue" : "clues"}.
            </p>
            {foundClues.length < episode.clues.length && (
              <button
                type="button"
                className={styles.endBtn}
                onClick={() => {
                  const missing = panels.find((r) => r.panel.interactions?.some((i) => i.kind === "inspect" && !foundClues.includes(i.clue)));
                  if (missing) openPanel(missing.flat);
                }}
              >
                Go back for the missed clue
              </button>
            )}
            <div className={styles.endActions}>
              <button type="button" className={styles.endLink} onClick={() => setCasebookOpen(true)}>
                Open Kit&rsquo;s casebook
              </button>
              <button type="button" className={styles.endLink} onClick={() => go(0, -1)}>
                Read it again
              </button>
            </div>
            {episode.continuation && <p className={styles.endText}>{episode.continuation}</p>}
          </article>
        )}

        {!atEnd && mode === "page" && (
          <div key={group[0].index} className={styles.spread} data-count={group.length} data-dir={dir}>
            {group.map((p) => renderPage(p))}
          </div>
        )}

        {!atEnd && mode === "panel" && current && page && (
          <MovieView key={page.index} page={renderPage(page, current.flat)} focus={current.flat} stop={stop} onStops={onStops} dir={dir} />
        )}

        {card !== null && mode === "panel" && (
          <div className={styles.sceneCard} role="status" aria-live="polite">
            {card === 0 && (
              <p className={styles.presents}>
                The Adventures of Ramona Lisa · Episode {episode.number}
              </p>
            )}
            <span className={styles.cardNo}>Scene {episode.scenes[card].number}</span>
            <h2 className={styles.cardTitle}>{episode.scenes[card].title}</h2>
            <p className={styles.cardSlug}>{episode.scenes[card].slug}</p>
          </div>
        )}
      </main>

      {!atEnd && (
        <footer className={styles.foot}>
          {mode === "panel" && page ? (
            <>
              <button
                type="button"
                className={styles.play}
                aria-pressed={playing}
                onClick={() => setPlaying((v) => !v)}
                title="Play it like a film (P)"
              >
                <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span> {playing ? "Pause" : "Play"}
              </button>
              <span className={styles.ticks} aria-label={`Panel ${panelOnPage + 1} of ${page.panels.length} on this page`}>
                {page.panels.map((f) => (
                  <span key={f} data-on={f === pos ? "" : undefined} />
                ))}
              </span>
              <span className={styles.hint}>{phone ? "Tap for the next shot" : "→ next shot · Z: whole page"}</span>
            </>
          ) : (
            <span className={styles.hint}>{phone ? "Swipe to turn · tap a panel" : "← → turn the page · click a panel to read it up close"}</span>
          )}
        </footer>
      )}

      <div className={styles.progress} aria-hidden="true">
        <span style={{ width: `${Math.round((pos / END) * 100)}%` }} />
      </div>

      <Modal open={contentsOpen} onClose={() => setContentsOpen(false)} title="Contents" variant="sheet">
        <ol className={styles.contents}>
          {episode.scenes.map((s, i) => {
            const first = pages.find((p) => p.sceneIndex === i);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  aria-current={!atEnd && current?.sceneIndex === i ? "true" : undefined}
                  onClick={() => {
                    setContentsOpen(false);
                    if (first) go(first.panels[0], first.index >= pageIndex ? 1 : -1);
                  }}
                >
                  <span className={styles.contentsNo}>{s.number}</span>
                  <span className={styles.contentsTitle}>{s.title}</span>
                  <span className={styles.contentsPage}>p. {first ? first.index + 1 : "–"}</span>
                </button>
              </li>
            );
          })}
        </ol>
        <label className={styles.notesToggle}>
          <input type="checkbox" checked={showNotes} onChange={toggleNotes} />
          Production notes (canon, proposed and art still to come)
        </label>
      </Modal>

      <EvidenceInspector clue={clue} foundClues={foundClues} characters={episode.characters} showNotes={showNotes} onClose={() => setInspecting(null)} />
      <CaseNotebook
        open={casebookOpen}
        onClose={() => setCasebookOpen(false)}
        episode={episode}
        foundClues={foundClues}
        metCharacters={metCharacters}
        seenSuspects={seenSuspects}
        explored={explored}
        onInspect={(id) => {
          setCasebookOpen(false);
          setInspecting(id);
        }}
        onExplore={(id) => {
          setCasebookOpen(false);
          setExploring(id);
        }}
      />
      <CaseBoard open={deducing} deductions={episode.deductions} onClose={() => setDeducing(false)} />
      <ArtifactExplorer artifact={episode.artifacts?.find((a) => a.id === exploring) ?? null} onClose={() => setExploring(null)} />
    </div>
  );
}
