import Image from "next/image";
import type { Interest } from "@/data/interests";

/** One personal-interest pill. Renders an `<li>` — use inside a list. */
export default function InterestPill({
  label,
  icon,
  borderColor,
  background,
}: Interest) {
  return (
    <li
      className={`inline-flex w-fit h-fit items-center gap-2 border p-x-small rounded-lg ${borderColor} ${background}`}
    >
      <Image src={icon} alt="" aria-hidden width={16} height={16} className="aspect-square" />
      <p>{label}</p>
    </li>
  );
}
