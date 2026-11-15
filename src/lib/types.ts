/**
 * Episode content model for The Adventures of Ramona Lisa.
 *
 * Every episode is plain data that conforms to these types. The reader
 * components never contain story text, so a new episode should only need
 * new artwork, a script and clue data.
 */

/**
 * Where a piece of content came from. Shown in the reader's
 * "Production notes" overlay so canon is never confused with drafts.
 *  - canon:     established in the series bible or supplied artwork
 *  - approved:  an episode script Colin has signed off
 *  - proposed:  a draft addition awaiting approval
 *  - placeholder: temporary stand-in that must be replaced
 */
export type ContentStatus = "canon" | "approved" | "proposed" | "placeholder";

export type CharacterId = string;
export type ClueId = string;
export type SceneId = string;
export type PanelId = string;

export interface ArtRef {
  /** Path under /public, without a leading slash. */
  src: string;
  /** Text alternative describing what matters in the image. */
  alt: string;
  width: number;
  height: number;
  status: ContentStatus;
  /** For placeholders: what final art is needed. */
  brief?: string;
  /** Optional portrait shown inside a placeholder panel. */
  placeholderReference?: string;
}

export interface Character {
  id: CharacterId;
  name: string;
  /** Short role line used on introduction cards. */
  role: string;
  species: string;
  tagline: string;
  /** Square crop used beside dialogue and on intro cards. */
  portrait?: string;
  /** Lettering colour accent for this speaker. */
  accent: "gold" | "blue";
  status: ContentStatus;
  kind: "protagonist" | "ally" | "informant" | "obstacle" | "suspect" | "henchman" | "human-background" | "human-authority";
}

/* ---------- Beats: the lines of text revealed one at a time in a panel ---------- */

export interface CaptionBeat {
  kind: "caption";
  text: string;
  /** "location" captions are set larger, like a scene slug. */
  style?: "narration" | "location" | "time";
}

export interface Dialogue {
  kind: "dialogue";
  speaker: CharacterId;
  text: string;
  delivery?: "speech" | "whisper" | "thought" | "shout";
  /** Unnamed humans and offscreen voices. */
  speakerLabel?: string;
}

export interface SfxBeat {
  kind: "sfx";
  text: string;
}

/** Introduces a character the first time they appear. */
export interface IntroBeat {
  kind: "intro";
  character: CharacterId;
}

/** Points the reader at an interaction in this panel. Never blocks progress. */
export interface PromptBeat {
  kind: "prompt";
  interaction: string;
  text: string;
}

/** Shows a suspect card inline and files it in the case notebook. */
export interface SuspectBeat {
  kind: "suspect";
  suspect: string;
}

/** Files a clue in the notebook automatically (one heard or seen in the story). */
export interface ClueBeat {
  kind: "clue";
  clue: ClueId;
}

export type Beat = CaptionBeat | Dialogue | SfxBeat | IntroBeat | PromptBeat | SuspectBeat | ClueBeat;

/* ---------- Interactions ---------- */

/** Rectangle in percentages of the artwork (0-100). */
export interface Region {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Examine evidence. With a region it is also a hotspot on the art. */
export interface InspectInteraction {
  id: string;
  kind: "inspect";
  /** Accessible label for the hotspot button. */
  label: string;
  /** Omit for placeholder art: the prompt button alone opens it. */
  region?: Region;
  clue: ClueId;
}

/** Open the artifact explorer for the episode's treasure. */
export interface ExploreInteraction {
  id: string;
  kind: "explore";
  label: string;
  region?: Region;
  artifact: string;
}

export type Interaction = InspectInteraction | ExploreInteraction;

/* ---------- The treasure ---------- */

export interface ArtifactFact {
  id: string;
  title: string;
  text: string;
  /** Rule 2: mark which parts are real history and which are invented. */
  truth: "real" | "invented";
  /** Optional built-in diagram. */
  diagram?: "layered-stone";
}

export interface Artifact {
  id: string;
  name: string;
  summary: string;
  image?: ArtRef;
  facts: ArtifactFact[];
}

export interface Clue {
  id: ClueId;
  title: string;
  /** One line used in the notebook list. */
  summary: string;
  /** Full description; doubles as the text alternative for the evidence. */
  detail: string;
  /** Magnified evidence image. */
  image?: ArtRef;
  /** What the characters say once it is examined. */
  reaction?: Dialogue[];
  /**
   * "One clue means two things": once `byClue` is found, the notebook shows
   * this new reading instead of the first summary.
   */
  rereading?: { byClue: ClueId; summary: string };
  /** Found by accident mid-bicker, mid-joke or mid-snack (a Mystery Engine ritual). */
  accidental?: boolean;
  status: ContentStatus;
}

/** Reader-facing suspect card. Never holds the truth. */
export interface Suspect {
  id: string;
  character: CharacterId;
  /** Headline on the card, e.g. "The jumpy guard". */
  label: string;
  /** What the reader is told on the card. */
  card: string;
  /** Lines added to the card in the notebook once a clue is found. */
  leads?: { clue: ClueId; text: string }[];
  status: ContentStatus;
}

/** The truth behind a suspect. Lives only in solution files. */
export interface SuspectTruth {
  id: string;
  character: CharacterId;
  motive: string;
  means: string;
  opportunity: string;
  /** What they are hiding: explains some, but not all, of the strange events. */
  secret: string;
  status: ContentStatus;
}

export interface Deduction {
  id: string;
  question: string;
  options: { id: string; text: string }[];
  answer: string;
  /** Clues that make this answerable (fair-play check). */
  requires: ClueId[];
  explanation: string;
}

export interface Reveal {
  id: string;
  title: string;
  /** Clues that must have been introduced before this reveal. */
  supportedBy: ClueId[];
  status: ContentStatus;
}

/* ---------- Structure ---------- */

export type Transition = "fade" | "cut" | "iris" | "slide";

/** The fixed moments from the Mystery Engine that every episode repeats. */
export type Ritual =
  | "vanishing"
  | "red-herring"
  | "summons"
  | "pull"
  | "running-bicker"
  | "look-in"
  | "henchman"
  | "research"
  | "accidental-clue"
  | "human-sized-chase"
  | "turn"
  | "wrong-answer"
  | "trap-half-fails"
  | "comeuppance"
  | "homecoming"
  | "calling-card"
  | "last-joke";

export interface Panel {
  id: PanelId;
  art: ArtRef;
  /** Mystery Engine rituals this panel performs, so a checker can confirm every ritual appears. */
  rituals?: Ritual[];
  /** Art still to be drawn for this panel even though usable art exists (shown in Notes). */
  artNeeded?: string;
  /** A clue planted for the "flip back" reveal; the shot list must draw it carefully. */
  plant?: string;
  /** CSS object-position used to frame the art, e.g. "30% 40%". */
  focus?: string;
  /** Slow camera move. Disabled when the reader prefers reduced motion. */
  camera?: "push-in" | "pull-out" | "pan-left" | "pan-right" | "still";
  transition?: Transition;
  /**
   * Film view: where each speaker sits in the art (percent of the image).
   * The camera leans toward whoever is talking and balloons point their way.
   */
  anchors?: Record<CharacterId, { x: number; y: number }>;
  /** Film view: per-beat camera (index matches beats). Missing entries are automatic. */
  shots?: (CameraShot | null)[];
  beats: Beat[];
  interactions?: Interaction[];
}

/** A camera position: focus point in percent of the image, and zoom (1 = fill the screen). */
export interface CameraShot {
  x: number;
  y: number;
  zoom: number;
}

/** Episode structure step from the series bible (section 7). */
export type StoryBeat =
  | "strange-event"
  | "case"
  | "suspects"
  | "investigation"
  | "first-escape"
  | "false-solution"
  | "breakthrough"
  | "trap"
  | "double-reveal"
  | "restoration";

export interface Scene {
  id: SceneId;
  number: number;
  title: string;
  /** Slug shown on the scene title card, e.g. "London rooftops · 11:52 p.m." */
  slug: string;
  storyBeat: StoryBeat;
  scriptStatus: ContentStatus;
  panels: Panel[];
}

/**
 * The Mystery Engine v2 worksheet (docs/mystery-engine.md). Filled in before any
 * art is made. Contains the solution: never render it before the reveal.
 */
export interface MysteryWorksheet {
  location: string;
  treasure: string;
  historyLesson: string;
  trueVsInvented: string;
  whereItBelongs: string;
  howItGetsHome: string;
  strangeEvent: string;
  howItTiesToTheVanishing: string;
  redHerring: string;
  method: string;
  animalAntagonist: string;
  humanBehindTheScenes: string;
  suspiciousButInnocent: string;
  summons: string;
  pull: string;
  runningBicker: string;
  researchSceneAndHelper: string;
  kitSenseClue: string;
  ramonaDeduction: string;
  historyClue: string;
  coldOpenHiddenClue: string;
  guestAlly: string;
  humanSizedChase: string;
  trapAndHalfFail: string;
  unmasking: string;
  callingCard: string;
  lastJoke: string;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  location: string;
  logline: string;
  cover: ArtRef;
  characters: Character[];
  scenes: Scene[];
  clues: Clue[];
  suspects: Suspect[];
  deductions: Deduction[];
  reveals: Reveal[];
  /** The episode's real treasure, for the artifact explorer. */
  artifacts?: Artifact[];
  /** Shown on the end card of a partial build. */
  continuation?: string;
}
