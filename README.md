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

- **Film view (default):** each panel fills the screen like a frame of an animatic. The camera glides between beats (push in, pull out, pans, leaning toward whoever speaks or whatever there is to examine), panels cross-fade, wipe or cut, and captions, balloons, sound effects, intro cards and suspect cards are set over the art. **Play** (or P) runs it hands-free, timed for reading. It plays in a theatre: a 2:1 screen in a dark house with seat silhouettes and projector grain, and the controls dim away (lights down) while it plays. Panels can carry `anchors` (where each speaker stands); a line from an anchored speaker cuts to their close-up and the next beat cuts back, like coverage in an edit. Per-beat `shots` direct the camera by hand. **Book view** switches back to art with the words beside it.

- Panel-by-panel reading: tap, click, swipe, arrow keys, Space/Enter; Back works everywhere
- Scene title cards, character introduction cards, captions, speech/whisper/thought/shout balloons, SFX
- Panel transitions (fade, slide, iris, cut) and slow camera moves; all disabled under `prefers-reduced-motion`
- Six clues: three to examine on the art (magnified evidence view, also reachable from a text button, so no precise clicking is required) and three picked up from the story; a later clue can give an earlier one a "new reading"
- Suspect cards dealt in the story and filed in Kit's casebook, with leads that unlock as clues turn up
- **Solve the case** board before the breakthrough: who, how and why, multiple choice, with a nudge for a wrong pick and the explanation for a right one. Optional; it never blocks the story
- The full episode, 13 scenes, ending on a "Case closed." card
- Treasure explorer for the stolen cameo: real history vs. invented-for-the-story facts, with a simple diagram
- Kit's casebook (case, suspects, clues, treasure, characters met), episode/scene navigation, local save and resume
- Phones: sideways, the film plays edge to edge; upright, it is reframed as a vertical cut (the art fills the screen and the camera pans across each picture and cuts to whoever speaks). Either way the controls tuck away while you read, a ☰ button brings them back, and a tap on the left edge goes back
- Responsive: cinematic side-by-side spread on desktop, stacked panel-then-lettering on mobile, side-by-side for portrait art on tablets
- Accessibility: every image has a text alternative, new lettering is announced via a polite live region, speaker and delivery are spoken, native dialogs trap focus and close on Escape, 44px touch targets
