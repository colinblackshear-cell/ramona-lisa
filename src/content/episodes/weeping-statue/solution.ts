import type { MysteryWorksheet, SuspectTruth } from "@/lib/types";

/**
 * SPOILERS. Production data for Episode 1 from Colin's Mystery Engine v2
 * worksheet (docs/mystery-engine.md). Deliberately NOT imported by the reader,
 * so the solution never ships to the browser until the reveal is built.
 */

/**
 * The truth behind each Beat 3 suspect card (cards themselves are in episode.ts).
 */
export const suspectTruths: SuspectTruth[] = [
  {
    id: "s-barnaby",
    character: "barnaby",
    motive: "None. Suspicious but innocent.",
    means: "Keys to every gallery.",
    opportunity: "Alone on the Roman gallery beat every night.",
    secret: "He hides in a broom cupboard at 12:17 because he's terrified of the ghost.",
    status: "canon",
  },
  {
    id: "s-ghosts",
    character: "ghosts",
    motive: "None. Red herring.",
    means: "Dust sheets.",
    opportunity: "Same nights as the weeping.",
    secret: "Museum mice dragging dust sheets to build a nest. They become informants.",
    status: "canon",
  },
  {
    id: "s-lucien",
    character: "lucien",
    motive: "Works for the collector.",
    means: "Carries the cameo out through the service corridor.",
    opportunity: "The weeping empties the corridor from 12:17.",
    secret: "Cold-open plant: a silver tail slipping through the service door.",
    status: "canon",
  },
  {
    id: "s-collector",
    character: "collector",
    motive: "Wants the cameo for a private collection.",
    means: "Paid for the hollow replica bust with its ink reservoir and clockwork valve.",
    opportunity: "Lucien does the work.",
    secret: "The crate leaves empty, with Ramona's card inside.",
    status: "canon",
  },
];

export const worksheet: MysteryWorksheet = {
  location: "British Museum, London",
  treasure: "A sardonyx cameo of a Roman empress.",
  historyLesson:
    "Cameos were carved from layered stone, so a white portrait stands out from a dark ground. Emperors spread their family's faces across the empire as propaganda. Every fashionable woman copied the empress's hairstyle, which is why historians date Roman portraits by their curls.",
  trueVsInvented:
    "The cameo and this particular empress are invented. Cameo carving, imperial portraits and hairstyle dating are real.",
  whereItBelongs: "The museum's Roman gallery.",
  howItGetsHome: "It is back in its case by morning. The curators are baffled; one black-and-white hair lies on the velvet.",
  strangeEvent: "The empress's marble bust weeps every night at 12:17.",
  howItTiesToTheVanishing: "The weeping draws every guard to the gallery, so the service corridor is empty.",
  redHerring:
    "Pale shapes drift through the Egyptian gallery the same nights. They turn out to be museum mice dragging dust sheets to build a nest. The mice become informants.",
  method: "A walnut-ink reservoir and a clockwork valve hidden inside a hollow replica of the bust.",
  animalAntagonist: "Lucien Vale, silver fox.",
  humanBehindTheScenes: "A private collector, only ever glimpsed: a gloved hand, a phone call, a crate stencilled \"T.\"",
  suspiciousButInnocent:
    "Barnaby, the badger guard, has been acting shifty. His secret: he hides in a broom cupboard every night at 12:17 because he's terrified of the \"ghost.\"",
  summons: "Mortimer, a rooftop pigeon, brings Kit the gossip.",
  pull: "Ramona asleep in her attic armchair.",
  runningBicker: "Whether Kit's stomach is a legitimate investigative tool. It is: the walnut smell cracks the case.",
  researchSceneAndHelper:
    "An elderly museum mouse who keeps a library behind the reading-room skirting boards. He explains cameos and imperial hairstyles. His offhand grumble about \"those lazy modern copies\" with their simplified curls is the surprise clue.",
  kitSenseClue: "The tear smells of pickled walnuts: it is ink.",
  ramonaDeduction: "The bust rings hollow, and there is a seam behind the ear.",
  historyClue:
    "The bust's curls are simpler than the empress's hairstyle on the cameo's label photo. The weeping bust must be a modern copy.",
  coldOpenHiddenClue: "A silver tail slipping through the service door.",
  guestAlly: "Barnaby, once found in his cupboard.",
  humanSizedChase: "A runaway floor polisher.",
  trapAndHalfFail:
    "Ramona resets the timer to weep early, but Lucien bolts. Kit's flung packing strap, thrown while she's reaching for a pastry cart, brings him down.",
  unmasking: "Lucien is left trussed in the loading dock. The collector's crate goes out empty, with Ramona's card inside.",
  callingCard: "Returned to the empress. — R.L.",
  lastJoke: "Kit: \"Never eating walnuts again.\" Ramona: \"You said that about sardines.\"",
};
