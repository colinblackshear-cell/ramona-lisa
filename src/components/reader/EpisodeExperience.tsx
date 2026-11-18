"use client";

import { useState } from "react";
import { getReadingEpisode } from "@/lib/episodes";
import { emptyProgress, useSavedProgress, type EpisodeProgress } from "@/lib/progress";
import { asset } from "@/lib/asset";
import { ComicReader } from "@/components/comic/ComicReader";
import styles from "./EpisodeExperience.module.css";

/** The comic's cover: open it to start, or carry on where you left off. */
export function EpisodeExperience({ episodeId }: { episodeId: string }) {
  const episode = getReadingEpisode(episodeId)!;
  const { saved, loaded, reset, refresh } = useSavedProgress(episodeId);
  const [reading, setReading] = useState<EpisodeProgress | null>(null);

  if (reading) {
    return (
      <ComicReader
        episode={episode}
        initial={reading}
        onExit={() => {
          refresh();
          setReading(null);
        }}
      />
    );
  }

  const canResume = loaded && saved && saved.step > 0 && !saved.finished;

  return (
    <main className={styles.cover}>
      <article className={styles.comic} aria-label={`Episode ${episode.number}: ${episode.title}`}>
        <div className={styles.art}>
          {/* The cover art carries its own title lettering, so nothing is printed over it. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(episode.cover.src)} alt={episode.cover.alt} width={episode.cover.width} height={episode.cover.height} />
        </div>
        <p className={styles.blurb}>{episode.logline}</p>
        <p className={styles.footer}>
          <span>No. {episode.number} · Episode {episode.number === 1 ? "one" : episode.number}</span>
          <span>{episode.location}</span>
        </p>
      </article>

      <div className={styles.actions}>
        {canResume ? (
          <>
            <button type="button" className={styles.primary} onClick={() => setReading(saved!)}>
              Keep reading
            </button>
            <button
              type="button"
              className={styles.secondary}
              onClick={() => {
                reset();
                setReading({ ...emptyProgress });
              }}
            >
              Start from the first page
            </button>
          </>
        ) : (
          <button
            type="button"
            className={styles.primary}
            onClick={() => setReading(saved?.finished ? { ...saved, step: 0, finished: false } : { ...emptyProgress })}
          >
            Open the comic
          </button>
        )}
        <p className={styles.proto}>
          {episode.continuation ? `Prototype · scenes 1–${episode.scenes.length}` : `Pilot · ${episode.scenes.length} scenes · draft art in progress`}
        </p>
      </div>
    </main>
  );
}
