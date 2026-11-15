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
 * APPROVED by Colin (2026-11-15): the scene 1–3 dialogue and captions, the
 * Bloomsbury attic, the coal-hatch route in, and the v2 additions (Mortimer's
 * ghost-sheets line, the stomach bicker, Barnaby vanishing at 12:17, the
 * double-meaning tear reaction). Engine v2 wins where it differs from the bible.
 * PROPOSED (Phase 3, needs approval): scenes 4–6, the suspect card wording,
 * the professor's name, the crate clue wording and the "Tuesday" deadline.
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
  ghostsPlaceholder: {
    src: "series/kit-portrait.webp",
    alt: "Placeholder. The Egyptian gallery at night: pale, sheet-like shapes drift between the sarcophagi while Kit stares, wide-eyed.",
    width: 150,
    height: 180,
    status: "placeholder",
    brief:
      "The Egyptian gallery through an archway: pale sheet-shapes drifting low between the sarcophagi. Kit wide-eyed and bristling; Ramona unimpressed, picking a thread of lint off her sleeve.",
    placeholderReference: "series/kit-portrait.webp",
  },
  lucienPlaceholder: {
    src: "",
    alt: "Placeholder. A silver fox in a tailored coat lounges against the propped-open service door, blocking the corridor.",
    width: 3,
    height: 2,
    status: "placeholder",
    brief:
      "The service corridor, low angle from cat height: Lucien Vale, a silver fox in a tailored coat, lounging against the propped service door and smiling with too many teeth. Funny and a little creepy. Needs a Lucien character sheet first.",
  },
  crateGlimpse: {
    src: "",
    alt: "Placeholder. Through the service door, the loading dock: a wooden crate stencilled with the letter T, and a gloved human hand holding a phone. No face is visible.",
    width: 3,
    height: 2,
    status: "placeholder",
    brief:
      "Over Lucien's shoulder, through the service door: the loading dock under one bare bulb. A wooden crate stencilled 'T', straw spilling from the lid. A gloved human hand holding a phone at the edge of frame. No face.",
  },
  libraryDoor: {
    src: "",
    alt: "Placeholder. A tiny door in the Reading Room skirting board opens on a candlelit mouse library.",
    width: 3,
    height: 2,
    status: "placeholder",
    brief:
      "The Round Reading Room at night, from floor level: a tiny arched door in the skirting board, candlelight inside. Beyond it, an elderly mouse in spectacles among towers of matchbox-sized books and an ink pot.",
  },
  libraryLesson: {
    src: "",
    alt: "Placeholder. The elderly library mouse lectures from a book-stack lectern while Ramona listens and Kit eyes his supper.",
    width: 3,
    height: 2,
    status: "placeholder",
    brief:
      "Inside the skirting-board library: the professor lecturing from a lectern of stacked books, a cameo diagram chalked behind him. Ramona attentive; Kit's eyes sliding toward a small pot on the desk.",
  },
  libraryInk: {
    src: "",
    alt: "Placeholder. Kit leans in to sniff a small pot on the professor's desk while the mouse waves her off.",
    width: 3,
    height: 2,
    status: "placeholder",
    brief:
      "Comic beat: Kit nose-first over the professor's little ink pot (she thinks it's pickled walnuts), the professor swatting at her with a quill, Ramona's face in her paw. Plant the professor's grumble in the same panel.",
  },
  emptyCase: {
    src: "",
    alt: "Placeholder. The cameo's empty display case: a dent in the velvet and a museum label with a small photograph of the cameo.",
    width: 3,
    height: 2,
    status: "placeholder",
    brief:
      "The cameo's empty case beside the bust: an oval dent in the velvet, and a museum label with a small photo of the cameo. The empress's hair on the photo must be visibly tighter and more elaborate than the bust's curls (fair-play plant).",
  },
  curlsDetail: {
    src: `${A}bust-curls-detail.webp`,
    alt: "Magnified: the bust's hair. Big, smooth, wavy locks under the laurel wreath.",
    width: 440,
    height: 440,
    status: "canon",
  },
  earDetail: {
    src: `${A}bust-ear-detail.webp`,
    alt: "Magnified: behind the bust's left ear, in the shadow of the curls.",
    width: 440,
    height: 440,
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
  {
    id: "ghosts",
    name: "The ghosts",
    role: "Egyptian gallery · Nights only",
    species: "Unknown",
    tagline: "",
    accent: "blue",
    status: "canon",
    kind: "suspect",
  },
  {
    id: "lucien",
    name: "Lucien Vale",
    role: "Silver fox · Very much in the way",
    species: "Fox",
    tagline: "Good coat. Bad manners. Always standing exactly where you need to go.",
    accent: "gold",
    status: "canon",
    kind: "henchman",
  },
  {
    id: "collector",
    name: "The voice on the phone",
    role: "Human · Only ever glimpsed",
    species: "Human",
    tagline: "",
    accent: "blue",
    status: "canon",
    kind: "human-background",
  },
  {
    id: "professor",
    name: "Professor Ambrose Nib",
    role: "Library mouse · Historian",
    species: "Mouse",
    tagline: "Has read every book in the Reading Room. Has opinions about all of them.",
    accent: "blue",
    status: "proposed", // canon character; the name is a proposal
    kind: "ally",
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
      scriptStatus: "approved",
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
      scriptStatus: "approved",
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
      scriptStatus: "approved",
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

    {
      id: "corridor",
      number: 4,
      title: "The Henchman",
      slug: "The Egyptian gallery and the service corridor · 12:21 a.m.",
      storyBeat: "suspects",
      scriptStatus: "proposed",
      panels: [
        {
          id: "corridor-ghosts",
          art: art.ghostsPlaceholder,
          rituals: ["red-herring"],
          transition: "slide",
          beats: [
            { kind: "caption", text: "Guards flood the Roman gallery. The cats slip out the other way, through the Egyptian rooms." },
            { kind: "suspect", suspect: "s-barnaby" },
            { kind: "sfx", text: "fwsssh..." },
            { kind: "dialogue", speaker: "kit", text: "Ramona. Ramona. Ghosts. Mortimer was right!", delivery: "whisper" },
            { kind: "dialogue", speaker: "ramona", text: "Ghosts that leave lint." },
            { kind: "dialogue", speaker: "kit", text: "Ghosts can have lint!" },
            { kind: "suspect", suspect: "s-ghosts" },
          ],
        },
        {
          id: "corridor-lucien",
          art: art.lucienPlaceholder,
          rituals: ["henchman"],
          transition: "cut",
          beats: [
            { kind: "sfx", text: "tap. tap. tap." },
            { kind: "intro", character: "lucien" },
            { kind: "dialogue", speaker: "lucien", text: "Well, well. Two little housecats, out past their bedtime." },
            { kind: "dialogue", speaker: "kit", text: "Who are you calling little?" },
            {
              kind: "dialogue",
              speaker: "lucien",
              text: "This corridor is spoken for, kittens. Run along to the gift shop. Oh dear. It's closed.",
            },
            { kind: "suspect", suspect: "s-lucien" },
            { kind: "dialogue", speaker: "ramona", text: "He's guarding that door. Look what's behind him.", delivery: "whisper" },
          ],
        },
        {
          id: "corridor-crate",
          art: art.crateGlimpse,
          plant: "The crate stencilled 'T' and the gloved hand: the human behind the scheme, glimpsed.",
          transition: "fade",
          beats: [
            { kind: "caption", text: "Beyond the door: the loading dock. A wooden crate. A gloved hand holding a phone." },
            {
              kind: "dialogue",
              speaker: "collector",
              speakerLabel: "A voice on the phone",
              text: "Tuesday, then. And Lucien? No more delays.",
            },
            { kind: "suspect", suspect: "s-collector" },
            { kind: "prompt", interaction: "inspect-crate", text: "Look at the crate. (Optional)" },
            { kind: "dialogue", speaker: "lucien", text: "Still here? Shoo." },
            { kind: "dialogue", speaker: "ramona", text: "We know when we're not wanted.", delivery: "speech" },
            { kind: "dialogue", speaker: "kit", text: "We do?", delivery: "whisper" },
            { kind: "dialogue", speaker: "ramona", text: "We do tonight. We need a library.", delivery: "whisper" },
          ],
          interactions: [{ id: "inspect-crate", kind: "inspect", label: "Look at the crate", clue: "crate-t" }],
        },
      ],
    },

    {
      id: "library",
      number: 5,
      title: "The Research",
      slug: "Behind the Reading Room skirting boards · 12:40 a.m.",
      storyBeat: "investigation",
      scriptStatus: "proposed",
      panels: [
        {
          id: "library-door",
          art: art.libraryDoor,
          rituals: ["research"],
          transition: "iris",
          beats: [
            { kind: "caption", style: "location", text: "The Round Reading Room." },
            { kind: "caption", text: "Kit knows a door that isn't on any plan." },
            { kind: "dialogue", speaker: "kit", text: "Professor! We need a history lesson. An urgent one." },
            { kind: "intro", character: "professor" },
            { kind: "dialogue", speaker: "professor", text: "At this hour? It had better be a good one." },
          ],
        },
        {
          id: "library-lesson",
          art: art.libraryLesson,
          rituals: ["research"],
          transition: "fade",
          beats: [
            { kind: "dialogue", speaker: "ramona", text: "A sardonyx cameo. The weeping empress's own portrait." },
            {
              kind: "dialogue",
              speaker: "professor",
              text: "Ah! Layered stone. Cut the pale band away and leave her face standing proud on the dark.",
            },
            {
              kind: "dialogue",
              speaker: "professor",
              text: "The emperors put their family's faces on everything. Coins, cameos, statues. Every province had to know who was in charge.",
            },
            {
              kind: "dialogue",
              speaker: "professor",
              text: "And every fashionable lady in the empire copied the empress's hair. Change the curls, change the decade. That's how we date the portraits.",
            },
            { kind: "prompt", interaction: "explore-cameo", text: "Explore the treasure: how a cameo was made. (Optional)" },
          ],
          interactions: [{ id: "explore-cameo", kind: "explore", label: "Explore the cameo", artifact: "cameo" }],
        },
        {
          id: "library-ink",
          art: art.libraryInk,
          rituals: ["accidental-clue", "running-bicker"],
          plant: "The professor's grumble about lazy modern copies. Bury it in the comedy.",
          transition: "cut",
          beats: [
            { kind: "caption", text: "Kit's attention has wandered, as it does, toward the professor's desk." },
            { kind: "dialogue", speaker: "kit", text: "Are those pickled walnuts? Can I just—" },
            {
              kind: "dialogue",
              speaker: "professor",
              text: "Paws OFF! That's my ink. Walnut ink, boiled from the husks. Artists and scribes have used it for centuries.",
              delivery: "shout",
            },
            { kind: "dialogue", speaker: "kit", text: "...Ramona. It smells exactly like the tear." },
            { kind: "clue", clue: "walnut-ink" },
            { kind: "dialogue", speaker: "kit", text: "I TOLD you my stomach was a legitimate investigative tool." },
            { kind: "dialogue", speaker: "ramona", text: "Once. It was right once." },
            {
              kind: "dialogue",
              speaker: "professor",
              text: "Ink on a statue? Wouldn't surprise me. Museums are full of lazy modern copies. Can't even be bothered to carve the curls properly.",
            },
          ],
        },
      ],
    },

    {
      id: "hollow",
      number: 6,
      title: "The Hollow Empress",
      slug: "The Roman gallery · 12:58 a.m.",
      storyBeat: "investigation",
      scriptStatus: "proposed",
      panels: [
        {
          id: "hollow-tap",
          art: art.empress,
          artNeeded: "Close-up of Ramona on the plinth, tapping the bust behind its ear; a hairline seam in the curls.",
          focus: "68% 20%",
          camera: "push-in",
          transition: "fade",
          beats: [
            { kind: "caption", text: "The guards have gone back to their posts. The empress has stopped crying." },
            { kind: "sfx", text: "tok. tok." },
            { kind: "dialogue", speaker: "kit", text: "Marble goes 'tink'. Doesn't it?" },
            { kind: "dialogue", speaker: "ramona", text: "Solid marble does." },
            { kind: "prompt", interaction: "inspect-ear", text: "Examine behind the empress's ear. (Optional)" },
          ],
          interactions: [
            {
              id: "inspect-ear",
              kind: "inspect",
              label: "Examine behind the empress's ear",
              region: { x: 64, y: 14, w: 12, h: 12 },
              clue: "hollow-bust",
            },
          ],
        },
        {
          id: "hollow-case",
          art: art.emptyCase,
          plant: "The label photo's curls versus the bust's curls.",
          transition: "slide",
          beats: [
            { kind: "caption", text: "Beside the bust: the cameo's case. Empty velvet, and the museum label." },
            { kind: "dialogue", speaker: "kit", text: "There she is. Same empress, on the label photo." },
            { kind: "prompt", interaction: "inspect-curls", text: "Compare the curls on the label photo with the bust. (Optional)" },
            { kind: "dialogue", speaker: "ramona", text: "Interesting." },
            { kind: "dialogue", speaker: "kit", text: "You always say that when you know something." },
            { kind: "dialogue", speaker: "ramona", text: "I always know something." },
          ],
          interactions: [{ id: "inspect-curls", kind: "inspect", label: "Compare the curls", clue: "curls" }],
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
      rereading: {
        byClue: "walnut-ink",
        summary: "Not lunch, and not the canteen: it smells exactly like the professor's walnut ink.",
      },
      status: "canon",
    },
    {
      id: "crate-t",
      title: "The crate marked 'T'",
      summary: "A shipping crate on the loading dock, stencilled 'T'. Someone on the phone gives Lucien orders.",
      detail:
        "A plain wooden shipping crate on the loading dock, stencilled with a single letter: T. Straw packing pokes out from under the lid. Beside it, a gloved hand holds a phone. The voice says 'Tuesday' and calls the fox by name.",
      reaction: [
        { kind: "dialogue", speaker: "kit", text: "T for... treats?" },
        { kind: "dialogue", speaker: "ramona", text: "T for 'take note', Kit." },
      ],
      status: "proposed",
    },
    {
      id: "walnut-ink",
      title: "Walnut ink",
      summary: "The professor's walnut ink smells exactly like the empress's tear.",
      detail:
        "Walnut ink is boiled from walnut husks: dark brown, slightly glossy, with a sharp pickled smell. Artists and scribes have used it for centuries. The professor's pot smells exactly like the empress's tear.",
      accidental: true,
      reaction: [
        { kind: "dialogue", speaker: "kit", text: "So the empress is crying ink." },
        { kind: "dialogue", speaker: "ramona", text: "So someone gave her ink to cry." },
      ],
      status: "canon",
    },
    {
      id: "hollow-bust",
      title: "The hollow empress",
      summary: "The bust rings hollow when tapped, and there's a hairline seam behind the ear.",
      detail:
        "Ramona's tap rings hollow, like a drum, not the dull 'tink' of solid stone. Behind the left ear, almost hidden in the curls, runs a hairline seam.",
      image: art.earDetail,
      reaction: [
        { kind: "dialogue", speaker: "kit", text: "Statues don't have seams." },
        { kind: "dialogue", speaker: "ramona", text: "No. They don't." },
      ],
      status: "canon",
    },
    {
      id: "curls",
      title: "Two hairstyles",
      summary: "The empress on the label photo has tight, deep-drilled ringlets. The bust's curls are bigger and smoother.",
      detail:
        "On the label photo, the empress's hair is a mass of tight, deep-drilled ringlets. The bust's curls are bigger, smoother and fewer. Same empress, different hair.",
      image: art.curlsDetail,
      reaction: [
        { kind: "dialogue", speaker: "kit", text: "Maybe she went to a cheaper hairdresser." },
        { kind: "dialogue", speaker: "ramona", text: "Maybe someone did." },
      ],
      status: "canon",
    },
  ],

  // Reader-facing cards only. The truth behind them lives in solution.ts,
  // which the reader never imports, so nothing leaks to the browser.
  suspects: [
    {
      id: "s-barnaby",
      character: "barnaby",
      label: "The jumpy guard",
      card: "Barnaby, the badger night guard. Shaking at 12:16. Gone by 12:17. Where does he go?",
      status: "proposed",
    },
    {
      id: "s-ghosts",
      character: "ghosts",
      label: "The Egyptian gallery ghosts",
      card: "Pale shapes drifting between the sarcophagi, on the same nights the empress weeps. They leave lint.",
      status: "proposed",
    },
    {
      id: "s-lucien",
      character: "lucien",
      label: "The fox at the door",
      card: "Lucien Vale. Silver fox, good coat, bad manners. Guarding the service corridor like he owns it.",
      leads: [{ clue: "crate-t", text: "Takes orders from a voice on the phone." }],
      status: "proposed",
    },
    {
      id: "s-collector",
      character: "collector",
      label: "The voice on the phone",
      card: "A gloved hand, a phone call, a crate stencilled 'T'. No face. Wants something by Tuesday.",
      status: "proposed",
    },
  ],
  deductions: [],
  reveals: [],

  artifacts: [
    {
      id: "cameo",
      name: "The empress cameo",
      summary:
        "A sardonyx cameo of a Roman empress. This cameo and this empress are invented for the story. Everything else here about cameos and Roman portraits is real history.",
      facts: [
        {
          id: "layers",
          title: "Carved from layers",
          text: "Cameos were carved from stones that form in bands, like sardonyx. The carver cut the pale band away everywhere except the portrait, so a white face stands out from a dark ground. One slip and the stone was ruined.",
          truth: "real",
          diagram: "layered-stone",
        },
        {
          id: "propaganda",
          title: "Faces everywhere",
          text: "Roman emperors spread their family's faces across the empire on coins, statues and gems, so people in every province knew who ruled them. A cameo of an empress was a little piece of that message.",
          truth: "real",
        },
        {
          id: "hairstyles",
          title: "Dated by the curls",
          text: "Fashionable Roman women copied the empress's latest hairstyle, and styles changed every few years. That's why historians can often date a portrait of a Roman woman by her hair.",
          truth: "real",
        },
        {
          id: "blacas",
          title: "A real one nearby",
          text: "The British Museum holds a famous real example: the Blacas Cameo, a sardonyx portrait of the emperor Augustus carved around 2,000 years ago.",
          truth: "real",
        },
        {
          id: "this-cameo",
          title: "This cameo",
          text: "The weeping empress and her cameo are made up for this story, modelled on real imperial cameos and portraits.",
          truth: "invented",
        },
      ],
    },
  ],

  continuation:
    "The prototype ends here. Next in the pilot: the first escape and the runaway floor polisher, then the false solution.",
};
