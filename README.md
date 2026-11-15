# The Adventures of Ramona Lisa — Interactive Graphic Novel

Phase 1 (foundation) and Phase 2 (three-scene visual prototype) of Episode 1, *The Weeping Statue*.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run typecheck

# Static preview that works from any sub-folder (used for shareable links)
./scripts/build-preview.sh   # -> preview/
```

## Folder structure

```
src/
  app/                         Next.js routes (App Router)
    page.tsx                   Opens on the pilot (series shelf comes later)
    episodes/[episodeId]/      One route per episode, statically generated
    globals.css                Design tokens: midnight #10283B, gold #C49A4D, cream #F3E8CF
    fonts.ts                   IM Fell English SC (display), Courier Prime (captions), Patrick Hand (lettering)
  lib/
    types.ts                   Episode, Scene, Panel, Character, Dialogue, Suspect, Clue,
                               Interaction, Deduction, Reveal (+ ContentStatus)
    episodes.ts                Episode registry: add new episodes here
    progress.ts                Local save/resume (localStorage, no accounts)
    asset.ts                   Asset URL helper (supports sub-folder previews)
  content/                     ALL story content lives here, never in components
    series/                    Series regulars (Ramona, Kit) and series metadata
    episodes/weeping-statue/   Episode 1 script, art references and clue data
  components/
    reader/                    Reusable reader: panels, lettering, hotspots, evidence
                               inspector, case notebook, scene cards, navigation
    ui/                        Shared primitives (accessible modal)
public/
  series/                      Character sheets and portrait crops
  episodes/weeping-statue/art/ Episode artwork (web-optimised from the supplied PNGs)
```

A new episode = a new folder under `src/content/episodes/` + its art under `public/episodes/<id>/art/` + one line in `lib/episodes.ts`. No component changes.

## Canon vs. proposed

Story canon = the series bible + **The Mystery Engine v2** (`docs/mystery-engine.md`): rules, rituals, the ~40-panel skeleton and the Ep. 1 worksheet. Where they differ, the Engine wins.

Every piece of content carries a `status`: `canon`, `approved`, `proposed` or `placeholder`, and panels can be tagged with the Mystery Engine `ritual` they perform. The reader's **Notes** toggle shows these labels, plus any art still needed.

- **Canon:** characters, Mortimer's summons, the pull (Ramona asleep in her armchair, "Get your vest."), the look-in ("Is it?"), the walnut-ink tear, Barnaby, all supplied artwork.
- **Approved (Colin, 2026-11-15):** the scene 1–3 dialogue and captions, the Bloomsbury attic, the coal-hatch route in, and the Engine v2 additions (Mortimer's ghost-sheets line, the stomach bicker, Barnaby vanishing at 12:17, the double-meaning tear).
- **Placeholder:** Ramona's attic (scene 2). Mortimer is not yet drawn into the tip panel.

`content/episodes/<id>/solution.ts` holds the worksheet, suspects and solution. The reader never imports it, so spoilers don't ship to the browser until the reveal is built.

## Reader features in this build

- Panel-by-panel reading: tap, click, swipe, arrow keys, Space/Enter; Back works everywhere
- Scene title cards, character introduction cards, captions, speech/whisper/thought/shout balloons, SFX
- Panel transitions (fade, slide, iris, cut) and slow camera moves; all disabled under `prefers-reduced-motion`
- One clickable clue (the empress's tear) with a magnified evidence view; also reachable from a text button, so no precise clicking is required
- Case notebook (clues found, characters met), episode/scene navigation, local save and resume
- Responsive: cinematic side-by-side spread on desktop, stacked panel-then-lettering on mobile, side-by-side for portrait art on tablets
- Accessibility: every image has a text alternative, new lettering is announced via a polite live region, speaker and delivery are spoken, native dialogs trap focus and close on Escape, 44px touch targets
