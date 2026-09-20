/** Personal-interest pills on the About page. */
export interface Interest {
  label: string;
  icon: string;
  /** Tailwind classes that colour the pill. */
  borderColor: string;
  background: string;
}

export const interests: Interest[] = [
  { label: "Baking", icon: "/img/icons/baking.svg", borderColor: "border-orange-400", background: "bg-orange-900" },
  { label: "Hiking", icon: "/img/icons/hiking.svg", borderColor: "border-emerald-400", background: "bg-emerald-900" },
  { label: "DIY", icon: "/img/icons/DIY.svg", borderColor: "border-purple-400", background: "bg-purple-900" },
  { label: "Videogames", icon: "/img/icons/videogames.svg", borderColor: "border-rose-400", background: "bg-rose-900" },
  { label: "Coding", icon: "/img/icons/coding.svg", borderColor: "border-blue-400", background: "bg-blue-900" },
  { label: "Drawing", icon: "/img/icons/drawing.svg", borderColor: "border-fuchsia-400", background: "bg-fuchsia-900" },
];

/** Spoken languages, by ISO country code (matches /public/img/flags/<code>.png). */
export const languages = ["dk", "de", "gb"] as const;
