"use client";

import { useEffect, useRef } from "react";
import type { Beat, Character, Dialogue } from "@/lib/types";
import { asset } from "@/lib/asset";
import styles from "./TextTrack.module.css";

interface TextTrackProps {
  beats: Beat[];
  characters: Character[];
  onPrompt: (interactionId: string) => void;
}

/** Captions, balloons and intro cards for the current panel, newest last. */
export function TextTrack({ beats, characters, onPrompt }: TextTrackProps) {
  const endRef = useRef<HTMLLIElement>(null);
  const byId = (id: string) => characters.find((c) => c.id === id);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [beats.length]);

  return (
    <ol className={styles.track} aria-live="polite" aria-relevant="additions">
      {beats.map((beat, i) => (
        <li key={i} className={styles.item} data-latest={i === beats.length - 1 ? "" : undefined} ref={i === beats.length - 1 ? endRef : undefined}>
          <BeatView beat={beat} character={beat.kind === "dialogue" || beat.kind === "intro" ? byId(beat.kind === "dialogue" ? beat.speaker : beat.character) : undefined} onPrompt={onPrompt} />
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
