# The Adventures of Ramona Lisa — Interactive Graphic Novel

Phase 1 (foundation), Phase 2 (visual prototype) and Phase 3 (investigation system: suspects, research, clues) of Episode 1, *The Weeping Statue*.

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
- **Approved (Colin, 2026-11-15):** the dialogue and captions of The Summons, The Pull and The Look-in, the Bloomsbury attic, the coal-hatch route in, and the Engine v2 additions (Mortimer's ghost-sheets line, the stomach bicker, Barnaby vanishing at 12:17, the double-meaning tear).
- **Proposed (awaiting approval):** the cold-open captions (scene 1, The Vanishing), scenes 5–7 (the henchman, the research, the hollow empress), scenes 8–13 (the ending: floor polisher, ghosts and the wrong answer, breakthrough, trap, unmasking, homecoming), the brass-key clue, the case-board questions, suspect card wording, Professor Ambrose Nib, the crate marked 'T' and the "Tuesday" deadline, the cameo facts.
- **Art:** scenes 1–7 have Colin's art. The ending reuses four pictures and shows 31 planned shots (prompts 60–90). Shot list v3 (32 more in-betweens for scenes 1–7, prompts 28–59) is also planned. Both are in the project's art-prompts folder.

`content/episodes/<id>/solution.ts` holds the worksheet, suspects and solution. The reader never imports it, so the worksheet never ships to the browser; the story reveals the solution through the scenes themselves.

## Reader features in this build

The episode reads as a **comic book** (`src/components/comic/`).

- **Cover:** the printed comic cover with **Open the comic** (or **Keep reading**).
- **Pages:** `layout.ts` lays the script out as comic pages: a new page for every scene (with a scene title strip), small panels with little to say side by side, narrow panels with their lettering beside them, and a page ends when it is full (45 pages for the pilot). Wide tiers are framed on each panel's `focus` point.
- **Lettering around the art:** captions sit above a panel and tuck over its top edge; speech balloons sit below and tuck over its bottom edge, their tails reaching in toward the speaker (from `anchors` where the script records them, otherwise alternating sides with a small speaker name). Words never sit over the middle of a picture. Hand-lettered balloons (Patrick Hand SC; whisper, thought and shout styles), storybook captions (IM Fell English SC), Bangers sound effects breaking out over frames.
- **Panel by panel** (default on phones): one panel at a time, the whole picture uncropped. Tap to read on (a long panel scrolls first), tap the left edge to go back, double tap or the page button for the whole page. Held sideways, the art fills the screen with the words beside it.
- **Whole pages** (default on laptops): swipe or ← → to turn the page; tap a panel to read it up close. On big screens two pages sit side by side as a spread.
- Clues: a gold magnifier on the art and a "look closer" button; the evidence opens magnified and is filed in Kit's casebook. Clues heard in the story are stamped "Added to Kit's casebook".
- Suspect cards dealt on the page and filed in Kit's casebook (a lined notebook), with leads that unlock as clues turn up
- **Solve the case** board before the breakthrough: who, how and why, multiple choice, with a nudge for a wrong pick and the explanation for a right one. Optional; it never blocks the story
- The full episode, 13 scenes, ending on a "Case closed!" page
- Treasure explorer for the stolen cameo: real history vs. invented-for-the-story facts, with a simple diagram
- Contents (tap the page number): jump to any scene, and switch on **production notes** (art and script status, art still to come)
- Keys: ← → and Space turn, Z switches page / panel, C opens the casebook. Your place is saved on this device.
- The earlier film reader (`src/components/reader/Reader.tsx`, `CinemaStage.tsx`) is still in the code but no longer used.
- Accessibility: every image has a text alternative, new lettering is announced via a polite live region, speaker and delivery are spoken, native dialogs trap focus and close on Escape, 44px touch targets
