import Image from "next/image";

interface FlagProps {
  /** ISO country code matching /public/img/flags/<code>.png */
  countryCode: string;
  width?: number;
  height?: number;
}

/** One spoken-language flag. Renders an `<li>` — use inside a list. */
export default function Flag({ countryCode, width = 24, height = 16 }: FlagProps) {
  return (
    <li>
      <Image
        src={`/img/flags/${countryCode}.png`}
        alt={`${countryCode} flag`}
        width={width}
        height={height}
      />
    </li>
  );
}
