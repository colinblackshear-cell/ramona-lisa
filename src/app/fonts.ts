import { Bangers, Courier_Prime, IM_Fell_English_SC, Patrick_Hand, Patrick_Hand_SC } from "next/font/google";

export const fell = IM_Fell_English_SC({ weight: "400", subsets: ["latin"], variable: "--font-fell", display: "swap" });
export const courier = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-courier", display: "swap" });
export const hand = Patrick_Hand({ weight: "400", subsets: ["latin"], variable: "--font-hand", display: "swap" });
/** Comic lettering: hand-lettered small caps for balloons, Bangers for sound effects. */
export const handSc = Patrick_Hand_SC({ weight: "400", subsets: ["latin"], variable: "--font-hand-sc", display: "swap" });
export const bangers = Bangers({ weight: "400", subsets: ["latin"], variable: "--font-bangers", display: "swap" });
