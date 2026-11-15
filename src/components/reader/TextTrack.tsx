"use client";

import { useEffect, useRef } from "react";
import type { Beat, Character, Clue, Dialogue, Suspect } from "@/lib/types";
import { asset } from "@/lib/asset";
import styles from "./TextTrack.module.css";

interface TextTrackProps {
  beats: Beat[];
  characters: Character[];
  suspects: Suspect[];
  clues: Clue[];
  onPrompt: (interactionId: string) => void;
  onOpenClue: (clueId: string) => void;
}

/** Captions, balloons and intro cards for the current panel, newest last. */
export function TextTrack({ beats, characters, suspects, clues, onPrompt, onOpenClue }: TextTrackProps) {
  const endRef = useRef<HTMLLIElement>(null);
  const byId = (id: string) => characters.find((c) => c.id === id);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [beats.length]);

  return (
    <ol className={styles.track} aria-live="polite" aria-relevant="additions">
      {beats.map((beat, i) => (
        <li key={i} className={styles.item} data-latest={i === beats.length - 1 ? "" : undefined} ref={i === beats.length - 1 ? endRef : undefined}>
          {beat.kind === "clue" ? (
            <ClueStamp clue={clues.find((c) => c.id === beat.clue)} onOpen={onOpenClue} />
          ) : beat.kind === "suspect" ? (
            <SuspectCard suspect={suspects.find((x) => x.id === beat.suspect)} characters={characters} />
          ) : (
            <BeatView beat={beat} character={beat.kind === "dialogue" || beat.kind === "intro" ? byId(beat.kind === "dialogue" ? beat.speaker : beat.character) : undefined} onPrompt={onPrompt} />
          )}
        </li>
      ))}
    </ol>
  );
}

export function BeatView({
  beat,
  character,
  onPrompt,
}: {
  beat: Beat;
  character?: Character;
  onPrompt?: (interactionId: string) => void;
}) {
  switch (beat.kind) {
    case "caption":
      return <p className={`${styles.caption} ${styles[beat.style ?? "narration"]}`}>{beat.text}</p>;
    case "sfx":
      return (
        <p className={styles.sfx}>
          <span className="visually-hidden">Sound: </span>
          {beat.text}
        </p>
      );
    case "dialogue":
      return <Balloon line={beat} character={character} />;
    case "intro":
      return character ? <CharacterIntro character={character} /> : null;
    case "suspect":
    case "clue":
      return null;
    case "prompt":
      return (
        <button type="button" className={styles.prompt} onClick={() => onPrompt?.(beat.interaction)}>
          <span className={styles.promptIcon} aria-hidden="true">⌕</span>
          {beat.text}
        </button>
      );
  }
}

function Balloon({ line, character }: { line: Dialogue; character?: Character }) {
  const name = line.speakerLabel ?? character?.name ?? line.speaker;
  const delivery = line.delivery ?? "speech";
  const verb = { speech: "", whisper: " (whispering)", thought: " (thinking)", shout: " (shouting)" }[delivery];
  return (
    <div className={styles.line} data-accent={character?.accent ?? "blue"}>
      {character?.portrait ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.avatar} src={asset(character.portrait)} alt="" />
      ) : (
        <span className={`${styles.avatar} ${styles.avatarBlank}`} aria-hidden="true" />
      )}
      <div className={`${styles.balloon} ${styles[delivery]}`}>
        <span className={styles.speaker}>
          {name}
          <span className="visually-hidden">{verb}:</span>
        </span>
        <span className={styles.words}>{line.text}</span>
      </div>
    </div>
  );
}

export function CharacterIntro({ character }: { character: Character }) {
  return (
    <section className={styles.intro} data-noportrait={character.portrait ? undefined : ""} aria-label={`Introducing ${character.name}`}>
      {character.portrait && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.introPortrait} src={asset(character.portrait)} alt={`Portrait of ${character.name}`} />
      )}
      <div>
        <p className={styles.introKicker}>Introducing</p>
        <h3 className={styles.introName}>{character.name}</h3>
        <p className={styles.introRole}>{character.role}</p>
        {character.tagline && <p className={styles.introTagline}>{character.tagline}</p>}
      </div>
    </section>
  );
}

/** A suspect card as it is dealt onto the page. Shows only what the reader knows. */
export function SuspectCard({
  suspect,
  characters,
  leads,
}: {
  suspect?: Suspect;
  characters: Character[];
  leads?: string[];
}) {
  if (!suspect) return null;
  const c = characters.find((x) => x.id === suspect.character);
  return (
    <section className={styles.suspect} aria-label={`Suspect: ${suspect.label}`}>
      {c?.portrait ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.suspectPortrait} src={asset(c.portrait)} alt="" />
      ) : (
        <span className={`${styles.suspectPortrait} ${styles.suspectBlank}`} aria-hidden="true">
          ?
        </span>
      )}
      <div>
        <p className={styles.suspectKicker}>Suspect</p>
        <h3 className={styles.suspectName}>{suspect.label}</h3>
        <p className={styles.suspectText}>{suspect.card}</p>
        {leads && leads.length > 0 && (
          <ul className={styles.leads}>
            {leads.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/** "Noted in the casebook": a clue picked up from the story itself. */
function ClueStamp({ clue, onOpen }: { clue?: Clue; onOpen: (id: string) => void }) {
  if (!clue) return null;
  return (
    <button type="button" className={styles.clueStamp} onClick={() => onOpen(clue.id)}>
      <span className={styles.clueStampKicker}>{clue.accidental ? "Accidental clue" : "Clue"} · noted in the casebook</span>
      <strong>{clue.title}</strong>
      <span className={styles.clueStampMore}>Look closer ›</span>
    </button>
  );
}
