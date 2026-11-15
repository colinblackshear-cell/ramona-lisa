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
 * APPROVED by Colin (2026-11-15): the dialogue and captions of The Summons,
 * The Pull and The Look-in (scenes 2–4 since the cold open was added), the
 * Bloomsbury attic, the coal-hatch route in, and the v2 additions (Mortimer's
 * ghost-sheets line, the stomach bicker, Barnaby vanishing at 12:17, the
 * double-meaning tear reaction). Engine v2 wins where it differs from the bible.
 * PROPOSED (needs approval): the cold-open captions (scene 1, The Vanishing),
 * scenes 5–7, the suspect card wording, the professor's name, the crate clue
 * wording and the "Tuesday" deadline.
 * ART: all panels use Colin's supplied art (2026-11-15 batch) except Mortimer
 * on the chimney and the label-photo close-up, which are still needed.
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
    src: `${A}attic-wake.webp`,
    alt: "A cluttered Bloomsbury attic at night under a moonlit skylight. Ramona sleeps sprawled in a worn armchair, arms folded, while Kit flies in through a round window, mouth open mid-shout.",
    width: 1741,
    height: 850,
    status: "canon",
  },
  atticCloseUp: {
    src: `${A}attic-closeup.webp`,
    alt: "Close-up: Ramona slumped on the arm of her chair, one gold eye open beneath her bandit mask, the other still shut. Lamplight and books behind her.",
    width: 1738,
    height: 849,
    status: "canon",
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
  coldBust: {
    src: `${A}cold-open-weeping-bust.webp`,
    alt: "A dark Roman gallery. Moonlight falls on the marble empress; a dark tear runs down her cheek. On the wall, a clock reads 12:17.",
    width: 1738,
    height: 848,
    status: "canon",
  },
  coldGallery: {
    src: `${A}egyptian-gallery-empty.webp`,
    alt: "The Egyptian gallery at night: sarcophagi, glass cases and a seated pharaoh. Far down the hall, a small pale shape drifts along the floor.",
    width: 1739,
    height: 847,
    status: "canon",
  },
  emptyCase: {
    src: `${A}empty-case.webp`,
    alt: "A brass-and-glass case beside the marble empress's shoulder. On the dark velvet inside, an empty oval dent. A small museum label sits in the corner.",
    width: 1741,
    height: 853,
    status: "canon",
  },
  coldTail: {
    src: `${A}corridor-silver-tail.webp`,
    alt: "A museum service corridor under one caged bulb. At the far end the service door stands ajar, and a pale-tipped tail is just slipping through.",
    width: 1739,
    height: 849,
    status: "canon",
  },
  ghosts: {
    src: `${A}egyptian-ghosts.webp`,
    alt: "Kit, fur on end, peers around an archway into the Egyptian gallery, where three small sheet-ghosts drift between the cases. Beside her, Ramona picks lint off her sleeve, unimpressed.",
    width: 1737,
    height: 852,
    status: "canon",
  },
  lucien: {
    src: `${A}lucien-corridor.webp`,
    alt: "In the service corridor, seen from behind the two cats: Lucien Vale, a silver fox in a long coat and cravat, lounges on the floor against the service door, grinning with far too many teeth.",
    width: 1740,
    height: 850,
    status: "canon",
  },
  crateGlimpse: {
    src: `${A}loading-dock-crate.webp`,
    alt: "Past Lucien's ear and coat collar, through the service door: a loading dock under a bare bulb, a wooden crate stencilled with a big T, and a van outside. At the edge of the frame, a gloved human hand holds a phone.",
    width: 1741,
    height: 850,
    status: "canon",
  },
  libraryDoor: {
    src: `${A}library-door.webp`,
    alt: "The domed Reading Room at night. Ramona stands while Kit crouches at a tiny arched door in the skirting board; inside, by candlelight, an elderly mouse in spectacles peers out.",
    width: 1740,
    height: 849,
    status: "canon",
  },
  libraryLesson: {
    src: `${A}library-lesson.webp`,
    alt: "In the candlelit mouse library, Kit and Ramona lie squeezed in, chins on paws, as the professor points his quill at a chalk diagram: a cameo separated into its layers, an empress's profile on top.",
    width: 1740,
    height: 854,
    status: "canon",
  },
  libraryInk: {
    src: `${A}library-ink.webp`,
    alt: "Kit, eyes closed in bliss, sniffs at the professor's ink bottle while he swats at her with a quill. Behind them, Ramona has her face in her paw. A bowl of walnuts sits on the desk.",
    width: 1740,
    height: 849,
    status: "canon",
  },
  tapEar: {
    src: `${A}ramona-taps-ear.webp`,
    alt: "High on the marble empress, Ramona perches on the bust's shoulder and knocks with one knuckle just behind the empress's ear, listening, eyes narrowed. A dark tear stains the empress's cheek.",
    width: 1503,
    height: 989,
    status: "canon",
  },
  crateDetail: {
    src: `${A}crate-detail.webp`,
    alt: "Magnified: a wooden crate stencilled with a large letter T, straw spilling from under its lid.",
    width: 440,
    height: 440,
    status: "canon",
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
    alt: "Magnified: Ramona's knuckle against the marble just behind the empress's ear. A fine crack runs through the curls there.",
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
    portrait: `${A}lucien-portrait.webp`,
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
    portrait: `${A}professor-portrait.webp`,
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
      id: "vanishing",
      number: 1,
      title: "The Vanishing",
      slug: "The British Museum · the night before",
      storyBeat: "strange-event",
      scriptStatus: "proposed",
      panels: [
        {
          id: "vanishing-weep",
          art: art.coldBust,
          rituals: ["vanishing"],
          camera: "push-in",
          transition: "fade",
          beats: [
            { kind: "caption", style: "location", text: "The British Museum. The night before." },
            { kind: "caption", text: "Every night at exactly 12:17, the empress weeps." },
            { kind: "sfx", text: "drip." },
          ],
        },
        {
          id: "vanishing-ghost",
          art: art.coldGallery,
          rituals: ["vanishing", "red-herring"],
          transition: "fade",
          beats: [{ kind: "caption", text: "And on the same nights, something pale goes drifting through the Egyptian rooms." }],
        },
        {
          id: "vanishing-case",
          art: art.emptyCase,
          rituals: ["vanishing"],
          transition: "cut",
          beats: [
            { kind: "caption", text: "Tonight, while the empress cried, her portrait went missing." },
            { kind: "caption", text: "Nobody saw a thing." },
          ],
        },
        {
          id: "vanishing-tail",
          art: art.coldTail,
          rituals: ["vanishing"],
          plant: "The silver tail at the service door: the first sight of Lucien. Never mention it in the text.",
          camera: "push-in",
          transition: "fade",
          beats: [{ kind: "caption", text: "Almost nobody." }],
        },
      ],
    },

    {
      id: "rooftops",
      number: 2,
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
      number: 3,
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
      number: 4,
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
      number: 5,
      title: "The Henchman",
      slug: "The Egyptian gallery and the service corridor · 12:21 a.m.",
      storyBeat: "suspects",
      scriptStatus: "proposed",
      panels: [
        {
          id: "corridor-ghosts",
          art: art.ghosts,
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
          art: art.lucien,
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
          interactions: [
            { id: "inspect-crate", kind: "inspect", label: "Look at the crate", region: { x: 49, y: 32, w: 24, h: 42 }, clue: "crate-t" },
          ],
        },
      ],
    },

    {
      id: "library",
      number: 6,
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
      number: 7,
      title: "The Hollow Empress",
      slug: "The Roman gallery · 12:58 a.m.",
      storyBeat: "investigation",
      scriptStatus: "proposed",
      panels: [
        {
          id: "hollow-tap",
          art: art.tapEar,
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
              region: { x: 46, y: 28, w: 15, h: 22 },
              clue: "hollow-bust",
            },
          ],
        },
        {
          id: "hollow-case",
          art: art.emptyCase,
          plant: "The label photo's curls versus the bust's curls.",
          artNeeded:
            "Insert close-up of the museum label with a small photo of the cameo: the empress's hair as tight, deep-drilled ringlets stacked high, clearly different from the bust's big smooth waves. The label in this panel is blank.",
          transition: "slide",
          beats: [
            { kind: "caption", text: "Beside the bust: the cameo's case. Empty velvet, and the museum label." },
            { kind: "dialogue", speaker: "kit", text: "There she is. Same empress, on the label photo." },
            { kind: "prompt", interaction: "inspect-curls", text: "Compare the curls on the label photo with the bust. (Optional)" },
            { kind: "dialogue", speaker: "ramona", text: "Interesting." },
            { kind: "dialogue", speaker: "kit", text: "You always say that when you know something." },
            { kind: "dialogue", speaker: "ramona", text: "I always know something." },
          ],
          interactions: [
            { id: "inspect-curls", kind: "inspect", label: "Compare the curls", region: { x: 67, y: 67, w: 17, h: 18 }, clue: "curls" },
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
      image: art.crateDetail,
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
