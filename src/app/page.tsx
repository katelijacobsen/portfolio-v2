import Image from "next/image";
import Button from "./components/Button";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <main>
      <section>
        <header>
          <h1>Hej I'm Katja</h1>
          <h2>
            <strong>UI/UX</strong> & <strong>Frontend Designer</strong>
          </h2>
        </header>
        <Image
          src="/profile.png"
          width={100}
          height={100}
          alt="Picture of the designer"
        />
        <Button>Contact Me</Button>
      </section>
      <section>
        <article>
          <header>
            <h2>About me</h2>
          </header>
          <p>
            I’m a educated multimediadesigner that has strong focus on creating
            and implementing designs. To me, it's not just about aesthetics.
            It's about crafting solutions that are both intuitive and engaging.
          </p>
        </article>
      </section>
      <section>
        <blockquote>
          "This is the section where I'm <i>supposed</i> to impress you with my portfolio"
        </blockquote>
      </section>
      <section>
        <Skills/>
      </section>
      <section>
        <Skills/>
      </section>
    </main>
  );
}
