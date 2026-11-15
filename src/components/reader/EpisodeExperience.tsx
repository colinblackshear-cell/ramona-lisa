"use client";

import { useState } from "react";
import { getEpisode } from "@/lib/episodes";
import { emptyProgress, useSavedProgress, type EpisodeProgress } from "@/lib/progress";
import { series } from "@/content/series/series";
import { asset } from "@/lib/asset";
import { Reader } from "./Reader";
import styles from "./EpisodeExperience.module.css";

/** Cover screen with Begin / Continue, then the reader. */
export function EpisodeExperience({ episodeId }: { episodeId: string }) {
  const episode = getEpisode(episodeId)!;
  const { saved, loaded, reset, refresh } = useSavedProgress(episodeId);
  const [reading, setReading] = useState<EpisodeProgress | null>(null);

  if (reading) {
    return <Reader episode={episode} initial={reading} onExit={() => {
          refresh();
          setReading(null);
        }} />;
  }

  const canResume = loaded && saved && saved.step > 0 && !saved.finished;

  return (
    <main className={styles.cover}>
      <div className={styles.art}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(episode.cover.src)} alt={episode.cover.alt} width={episode.cover.width} height={episode.cover.height} />
      </div>
      <section className={styles.panel}>
        <p className={styles.kicker}>{series.title}</p>
        <h1 className={styles.title}>
          <span className={styles.ep}>Episode {episode.number}</span>
          {episode.title}
        </h1>
        <p className={styles.place}>{episode.location}</p>
        <p className={styles.logline}>{episode.logline}</p>

        <div className={styles.actions}>
          {canResume ? (
            <>
              <button type="button" className={styles.primary} onClick={() => setReading(saved!)}>
                Continue reading
              </button>
              <button
                type="button"
                className={styles.secondary}
                onClick={() => {
                  reset();
                  setReading({ ...emptyProgress });
                }}
              >
                Start over
              </button>
            </>
          ) : (
            <button
              type="button"
              className={styles.primary}
              onClick={() => setReading(saved?.finished ? { ...saved, step: 0, finished: false } : { ...emptyProgress })}
            >
              Begin the case
            </button>
          )}
        </div>

        <p className={styles.howto}>
          Read panel by panel with the arrow keys, a tap or a swipe. Look for the gold lens to examine evidence; every clue
          is optional and saved to your case notebook. Your place is saved on this device.
        </p>
        <p className={styles.proto}>Prototype · scenes 1–3 of the pilot</p>
      </section>
    </main>
  );
}
