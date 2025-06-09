import { RiArrowRightUpLine } from "react-icons/ri";
import Tags from "./Tags";

interface Props {
  title: string;
  imgSrc?: string;
  imgAlt?: string;
  description?: string;
  rotation?: string;
  className?: string;
  keyword?: string;
  tags?: string[];
  onHover?: () => void;
  onLeave?: () => void;
}

function Project({
  title,
  imgSrc,
  imgAlt,
  description,
  rotation,
  className,
  tags,
  keyword,
  onHover,
  onLeave,
}: Props) {
  return (
    <li
      className="group relative block"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <article className="flex justify-between items-center self-stretch w-full border-b-2">
        <div className="flex items-center gap-x-medium">
          <h3 className="font-header">{title}</h3>
          <span className="text-tag">{keyword}</span>
        </div>
        <div className="flex items-center">
          <ul className="text-tag flex">
            {tags &&
              tags.map((tag) => (
                <li key={tag}>
                  <Tags skill={tag} />
                </li>
              ))}
          </ul>
          <span>
            <RiArrowRightUpLine className="w-8 h-auto" />
          </span>
        </div>
      </article>
      {/*  <div className="absolute top-full left-0 flex gap-2 z-10 pointer-events-none group-hover:pointer-events-auto">
          <img
            src="../img/pictures/waffles.avif"
            alt="Preview 1"
            className="w-46 h-auto object-cover transform scale-0 group-hover:scale-100 transition duration-300 delay-100"
          />
          <img
            src="../img/pictures/mug.avif"
            alt="Preview 2"
            className="w-46 h-auto absolute bottom-60 left-90 object-contain transform scale-0 group-hover:scale-100 transition duration-300 delay-200"
          />
          <img
            src="../img/pictures/coffe-w-legs.avif"
            alt="Preview 3"
            className="w-46 h-auto absolute top-80 left-200 object-contain transform scale-0 group-hover:scale-100 transition duration-300 delay-300"
          />
        </div>*/}
    </li>
  );
}

export default Project;
