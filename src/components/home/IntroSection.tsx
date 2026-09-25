import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";

const INTRO_TEXT =
  "Hi — I'm Katja, a web developer who likes to understand how things work all the way through. Knowing how data flows from the backend to the screen lets me build applications that are fast, reliable and accessible to everyone, not just nice on the surface. Explaining that to others as a teaching assistant has only made me better at it";

/** Short personal introduction, revealed word by word on scroll. */
export default function IntroSection() {
  return (
    <section id="intro" aria-label="Introduction" className="pt-sections">
      <ScrollReveal baseOpacity={0} enableBlur baseRotation={5} blurStrength={10}>
        {INTRO_TEXT}
      </ScrollReveal>

      <figure className="mt-medium">
        <Image
          width={160}
          height={160}
          src="/img/pictures/pixel-me.gif"
          alt="Animated pixel portrait of Katja"
          className="mx-[75%]"
          unoptimized
        />
        <figcaption className="sr-only">Katja&apos;s pixel portrait</figcaption>
      </figure>
    </section>
  );
}
