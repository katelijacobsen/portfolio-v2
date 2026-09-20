import Image from "next/image";
import ScrollReveal from "@/components/effects/ScrollReveal";

const INTRO_TEXT =
  "Hi — I'm Katja! I'm a designer with a strong passion for web design that is accessible to all users. I focus on using my UI/UX skills to create intuitive, straightforward digital experiences, including responsive design to ensure consistent performance across devices.";

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
