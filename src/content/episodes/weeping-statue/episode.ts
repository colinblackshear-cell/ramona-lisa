import type { ArtRef, Character, Episode } from "@/lib/types";
import { seriesRegulars } from "@/content/series/characters";

/**
 * Episode 1 — The Weeping Statue
 *
 * CANON: the series bible plus Colin's Mystery Engine v2 worksheet for Ep. 1
 * (docs/mystery-engine.md): Mortimer's summons, the pull in the attic
 * armchair, the running bicker about Kit's stomach, the look-in ("Is it?"),
 * the walnut-smelling tear, Barnaby, the Egyptian-gallery red herring, and the
 * solution (in solution.ts, which the reader never imports).
 *
 * APPROVED by Colin (2026-11-15, under Engine v1): the scene 1–3 dialogue and
 * captions, the Bloomsbury attic and the coal-hatch route in.
 * PROPOSED for v2 (needs approval): Mortimer's ghost-sheets line, the stomach
 * bicker lines, Barnaby vanishing at 12:17, and the new tear reaction.
 */

const A = "episodes/weeping-statue/art/";

const art = {
  rooftopBack: {
    src: `${A}kit-rooftop-back.webp`,
    alt: "Kit, seen from behind, sits on a chimney pot above the London rooftops at night. The Thames, Westminster Bridge, the Houses of Parliament and the clock tower glow gold under a full moon.",
    width: 1475,
    height: 981,
    status: "canon",
  },
  rooftopMoonlit: {
    src: `${A}kit-rooftop-moonlit.webp`,
    alt: "Kit, a striped tabby in a canvas vest and backpack, crouches on a chimney pot and peers out over moonlit London.",
    width: 1467,
    height: 972,
    status: "canon",
  },
  rooftopWide: {
    src: `${A}kit-rooftop-wide.webp`,
    alt: "Kit leans forward from a chimney, ears pricked, staring down at a lamp-lit street where small figures walk below.",
    width: 1740,
    height: 844,
    status: "canon",
  },
  attic: {
    src: "series/ramona-window-strip.webp",
    alt: "Placeholder. Ramona's attic has not been illustrated yet: Ramona is asleep in her armchair when Kit bursts in.",
    width: 518,
    height: 172,
    status: "placeholder",
    brief:
      "Ramona's attic at night: Ramona fast asleep, curled in a worn armchair beneath a skylight; Kit tumbling in through a round window. Two-colour risograph, matching the rooftop plates.",
    placeholderReference: "series/ramona-portrait.webp",
  },
  atticCloseUp: {
    src: "series/ramona-portrait.webp",
    alt: "Placeholder. Close-up of Ramona's face, borrowed from her character sheet: bandit-mask markings, gold eyes, one eyebrow unimpressed.",
    width: 180,
    height: 240,
    status: "placeholder",
    brief:
      "Ramona close-up in the armchair, one eye open, lamplight on her bandit mask as she hears the word 'cameo'.",
    placeholderReference: "series/ramona-portrait.webp",
  },
  museumExterior: {
    src: `${A}british-museum-exterior.webp`,
    alt: "The British Museum at night: a columned portico under a full moon, rain-wet pavement, gas lamps, iron railings and a stone sign reading The British Museum.",
    width: 1723,
    height: 840,
    status: "canon",
  },
  gallery: {
    src: `${A}barnaby-gallery.webp`,
    alt: "A long marble gallery of Roman statues and display cases. Barnaby, a stout badger in a guard's cap and uniform, shines a torch across the floor.",
    width: 1730,
    height: 840,
    status: "canon",
  },
  empress: {
    src: `${A}ramona-weeping-empress.webp`,
    alt: "Ramona stands with her back to us before a towering marble bust of a Roman empress with a laurel wreath. A dark streak runs from the empress's left eye down her cheek.",
    width: 1024,
    height: 1536,
    status: "canon",
  },
  tearDetail: {
    src: `${A}empress-tear-detail.webp`,
    alt: "Magnified: the streak on the empress's cheek is dark amber, not clear. It starts at the inner corner of the eye, runs in one thin unbroken line and has dried into a raised ridge at the jaw.",
    width: 520,
    height: 520,
    status: "canon",
  },
} satisfies Record<string, ArtRef>;

const guests: Character[] = [
  {
    id: "mortimer",
    name: "Mortimer",
    role: "Rooftop pigeon · Gossip",
    species: "Pigeon",
    tagline: "Hears everything in London. Repeats most of it.",
    accent: "blue",
    status: "canon",
    kind: "informant",
  },
  {
    id: "barnaby",
    name: "Barnaby",
    role: "Night guard · Badger",
    species: "Badger",
    tagline: "Guards the Roman gallery every night. Jumpy. Very jumpy.",
    portrait: `${A}barnaby-portrait.webp`,
    accent: "gold",
    status: "canon",
    kind: "suspect",
  },
];

export const weepingStatue: Episode = {
  id: "weeping-statue",
  number: 1,
  title: "The Weeping Statue",
  location: "London",
  logline:
    "Every night at exactly 12:17, a Roman marble empress at the British Museum begins to weep. Then a priceless cameo of the same empress disappears.",
  cover: {
    src: `${A}cover.webp`,
    alt: "Cover: The Adventures of Ramona Lisa, The Weeping Statue. Ramona stands before a giant weeping marble empress.",
    width: 1024,
    height: 1536,
    status: "canon",
  },
  characters: [...seriesRegulars, ...guests],

  scenes: [
    {
      id: "rooftops",
      number: 1,
      title: "The Summons",
      slug: "London rooftops · 11:52 p.m.",
      storyBeat: "case",
      scriptStatus: "proposed",
      panels: [
        {
          id: "rooftops-establishing",
          art: art.rooftopBack,
          camera: "push-in",
          transition: "fade",
          beats: [
            { kind: "caption", style: "location", text: "London." },
            { kind: "caption", text: "Eight minutes to midnight. Most of the city is asleep." },
            { kind: "caption", text: "Most of it." },
          ],
        },
        {
          id: "rooftops-kit",
          art: art.rooftopMoonlit,
          focus: "30% 40%",
          camera: "pan-right",
          transition: "slide",
          beats: [
            { kind: "intro", character: "kit" },
            { kind: "dialogue", speaker: "kit", text: "Chimney pots. Chimney pots. Fish shop... closed. Tragic." },
            { kind: "dialogue", speaker: "kit", text: "Come on, London. Give a scout something to scout." },
          ],
        },
        {
          id: "rooftops-summons",
          art: art.rooftopWide,
          rituals: ["summons", "red-herring"],
          artNeeded: "Mortimer the pigeon landing on the chimney beside Kit (this panel currently shows Kit alone).",
          focus: "30% 40%",
          camera: "pull-out",
          transition: "cut",
          beats: [
            { kind: "sfx", text: "FLAP-FLAP-FLUMP." },
            { kind: "intro", character: "mortimer" },
            {
              kind: "dialogue",
              speaker: "mortimer",
              text: "Evenin', Kit. That big museum on Great Russell Street? There's a stone lady in there who cries.",
            },
            {
              kind: "dialogue",
              speaker: "mortimer",
              text: "Every night. Twelve-seventeen on the dot. All the guards come running to look at her.",
            },
            {
              kind: "dialogue",
              speaker: "mortimer",
              text: "And last night, after she'd had her weep, a little carved jewel went missing. Her face on it and everything.",
            },
            {
              kind: "dialogue",
              speaker: "mortimer",
              text: "Oh, and the Egyptian rooms are haunted an' all. Ghosts in white sheets, floating about. Same nights. Spooky business.",
            },
            { kind: "dialogue", speaker: "kit", text: "A crying statue? Mortimer, that's the best thing I've ever heard." },
            { kind: "dialogue", speaker: "kit", text: "Ramona is going to hate this.", delivery: "thought" },
            { kind: "dialogue", speaker: "kit", text: "...Ramona is going to love this.", delivery: "thought" },
          ],
        },
      ],
    },

    {
      id: "attic",
      number: 2,
      title: "The Pull",
      slug: "An attic in Bloomsbury · 12:20 a.m.",
      storyBeat: "case",
      scriptStatus: "proposed",
      panels: [
        {
          id: "attic-wake",
          art: art.attic,
          rituals: ["pull", "running-bicker"],
          transition: "iris",
          beats: [
            { kind: "caption", text: "Above a bookbinder's shop, three streets from the museum." },
            { kind: "caption", text: "Ramona Lisa, master thief, is doing what she does best." },
            { kind: "sfx", text: "zzz..." },
            { kind: "intro", character: "ramona" },
            { kind: "dialogue", speaker: "kit", text: "Ramona! Ramona. Ramona Lisa.", delivery: "shout" },
            {
              kind: "dialogue",
              speaker: "ramona",
              text: "If the building is on fire, say so. Otherwise the chair and I are busy.",
            },
            { kind: "dialogue", speaker: "kit", text: "My stomach says this is a big one." },
            {
              kind: "dialogue",
              speaker: "ramona",
              text: "Your stomach says that about every fish shop in Bloomsbury.",
            },
            { kind: "dialogue", speaker: "kit", text: "And it's usually right!" },
          ],
        },
        {
          id: "attic-case",
          art: art.atticCloseUp,
          rituals: ["pull"],
          camera: "push-in",
          transition: "fade",
          beats: [
            {
              kind: "dialogue",
              speaker: "kit",
              text: "There's a Roman empress at the British Museum who cries every night at twelve-seventeen. And her cameo's gone missing. Her own face, stolen!",
            },
            { kind: "dialogue", speaker: "ramona", text: "...A cameo." },
            {
              kind: "dialogue",
              speaker: "ramona",
              text: "Sardonyx, if it's Roman. Stone laid down in bands, so the carver can raise a white face on a dark ground.",
            },
            {
              kind: "dialogue",
              speaker: "ramona",
              text: "One slip of the tool and it's ruined. No two are ever alike.",
            },
            { kind: "dialogue", speaker: "kit", text: "So it's priceless." },
            { kind: "dialogue", speaker: "ramona", text: "It's irreplaceable. That's worse." },
            { kind: "dialogue", speaker: "ramona", text: "Get your vest." },
          ],
        },
      ],
    },

    {
      id: "museum",
      number: 3,
      title: "The Look-in",
      slug: "The British Museum · the following night, 12:09 a.m.",
      storyBeat: "suspects",
      scriptStatus: "proposed",
      panels: [
        {
          id: "museum-exterior",
          art: art.museumExterior,
          camera: "push-in",
          transition: "fade",
          beats: [
            { kind: "caption", style: "location", text: "The British Museum." },
            { kind: "dialogue", speaker: "kit", text: "Guard on the gate. Cameras on the columns. Front door's out.", delivery: "whisper" },
            { kind: "dialogue", speaker: "ramona", text: "We are not using the front door. We are cats." },
            { kind: "caption", text: "Kit scouts them a way in: the old coal hatch." },
          ],
        },
        {
          id: "museum-gallery",
          art: art.gallery,
          focus: "35% 60%",
          camera: "pan-left",
          transition: "slide",
          beats: [
            { kind: "caption", style: "time", text: "12:16 a.m." },
            { kind: "sfx", text: "click... click... click..." },
            { kind: "intro", character: "barnaby" },
            {
              kind: "dialogue",
              speaker: "barnaby",
              text: "N-nobody here. Nobody at all. Just me and the empress and the... is someone there?",
            },
            { kind: "dialogue", speaker: "kit", text: "He's shaking worse than I am.", delivery: "whisper" },
            { kind: "dialogue", speaker: "ramona", text: "He isn't frightened of us. He's frightened of her.", delivery: "whisper" },
          ],
        },
        {
          id: "museum-empress",
          art: art.empress,
          rituals: ["look-in"],
          plant: "Barnaby is missing at 12:17. Flip-back panel for the reveal.",
          focus: "50% 20%",
          camera: "pull-out",
          transition: "iris",
          beats: [
            { kind: "caption", style: "time", text: "12:17 a.m." },
            { kind: "dialogue", speaker: "kit", text: "Ramona... she's crying. That's incredible!", delivery: "whisper" },
            { kind: "dialogue", speaker: "ramona", text: "Is it?" },
            { kind: "caption", text: "Barnaby, they notice, is nowhere to be seen." },
            { kind: "caption", text: "Footsteps echo from every corridor. The whole night shift is coming to watch." },
            {
              kind: "prompt",
              interaction: "inspect-tear",
              text: "Examine the tear before the guards arrive. (Optional: you can keep reading.)",
            },
          ],
          interactions: [
            {
              id: "inspect-tear",
              kind: "inspect",
              label: "Examine the tear on the empress's cheek",
              region: { x: 54, y: 13, w: 10, h: 16 },
              clue: "walnut-tear",
            },
          ],
        },
      ],
    },
  ],

  clues: [
    {
      id: "walnut-tear",
      title: "The Empress's Tear",
      summary: "Dark, not clear, and it smells of pickled walnuts. Kit's lunch? The museum canteen?",
      detail:
        "Up close, the 'tear' is not water. It is dark amber, runs in one thin line from the inner corner of the left eye and has dried into a ridge along the jaw. Kit's nose catches it first: it smells of pickled walnuts.",
      image: art.tearDetail,
      reaction: [
        { kind: "dialogue", speaker: "kit", text: "Sniff... pickled walnuts?" },
        { kind: "dialogue", speaker: "ramona", text: "That'll be your lunch." },
        { kind: "dialogue", speaker: "kit", text: "I had sardines! Somebody in the canteen, then. Make a note: my stomach is a legitimate investigative tool." },
        { kind: "dialogue", speaker: "ramona", text: "Your stomach is a bottomless pit. Write that down too." },
      ],
      status: "canon",
    },
  ],

  // Suspect cards arrive in Phase 3. Their data, and the solution, live in
  // solution.ts, which the reader never imports, so nothing leaks to the browser.
  suspects: [],
  deductions: [],
  reveals: [],

  continuation:
    "The prototype ends here. Next in the pilot: the suspect cards, then the research scene.",
};
