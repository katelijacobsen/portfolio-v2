import Image from "next/image";

interface SkillIconProps {
  src: string;
  alt: string;
  size?: number;
}

/** A single tool/technology logo. */
export default function SkillIcon({ src, alt, size = 56 }: SkillIconProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain aspect-square"
    />
  );
}
