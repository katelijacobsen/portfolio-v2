import SkillIcon from "./skillIcon";

const icons = [
    { src: "/img/icons/react.svg", alt: "React" },
    { src: "/img/icons/nextjs.svg", alt: "Next.js" },
    { src: "/img/icons/tailwind.svg", alt: "Tailwind" },
    { src: "/img/icons/html.svg", alt: "HTML" },
    { src: "/img/icons/css.svg", alt: "CSS" },
    { src: "/img/icons/js.svg", alt: "JavaScript" },
    { src: "/img/icons/git.svg", alt: "Git" },
]

const Marquee = () => {
  return (
    <ul className="marquee-wrapper">
      {icons.map((icon, index) => (
        <div
          key={index}
          className={`marquee-item item${index + 1}`}
          style={{ animationDelay: `calc(30s / ${icons.length} * (${icons.length} - ${index + 1}) * -2)` }}
        >
          <SkillIcon iconSrc={icon.src} altText={icon.alt} />
        </div>
      ))}
    </ul>
  );
};

export default Marquee;
