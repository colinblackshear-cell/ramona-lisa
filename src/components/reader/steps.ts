import type { Beat, Episode, Panel, Scene } from "@/lib/types";

/**
 * The reader moves through an episode one "step" at a time:
 * a scene title card, then each beat of each panel (beats accumulate
 * on screen), and finally the end card.
 */
export type Step =
  | { type: "title"; sceneIndex: number }
  | { type: "beat"; sceneIndex: number; panelIndex: number; beatIndex: number }
  | { type: "end" };

export function buildSteps(episode: Episode): Step[] {
  const steps: Step[] = [];
  episode.scenes.forEach((scene, sceneIndex) => {
    steps.push({ type: "title", sceneIndex });
    scene.panels.forEach((panel, panelIndex) => {
      const count = Math.max(panel.beats.length, 1);
      for (let beatIndex = 0; beatIndex < count; beatIndex++) {
        steps.push({ type: "beat", sceneIndex, panelIndex, beatIndex });
      }
    });
  });
  steps.push({ type: "end" });
  return steps;
}

export function firstStepOfScene(steps: Step[], sceneIndex: number): number {
  return steps.findIndex((s) => s.type === "title" && s.sceneIndex === sceneIndex);
}

export function stepForPanel(steps: Step[], panelId: string, episode: Episode): number {
  return steps.findIndex(
    (s) => s.type === "beat" && episode.scenes[s.sceneIndex].panels[s.panelIndex].id === panelId,
  );
}

export interface Resolved {
  scene?: Scene;
  panel?: Panel;
  visibleBeats: Beat[];
}

export function resolveStep(episode: Episode, step: Step): Resolved {
  if (step.type === "end") return { visibleBeats: [] };
  const scene = episode.scenes[step.sceneIndex];
  if (step.type === "title") return { scene, visibleBeats: [] };
  const panel = scene.panels[step.panelIndex];
  return { scene, panel, visibleBeats: panel.beats.slice(0, step.beatIndex + 1) };
}
