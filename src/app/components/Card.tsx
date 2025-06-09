import Image from "next/image";
import { RiArrowRightUpLine } from "react-icons/ri";

interface Props {
  title: string;
  imgSrc: string;
  imgAlt: string;
  description?: string;
  rotation?: string;
  className?: string;
}

function Card({
  title,
  imgSrc,
  imgAlt,
  description,
  rotation,
  className,
}: Props) {
  return (
    <li>
      <a>
        <article
          className={`group bg-slate-50 p-medium w-full rounded-3xl flex flex-col gap-medium shadow-sm duration-400 transform transition-transform hover:scale-102 ${rotation} ${className}`}
        >
          <header className="flex items-end justify-between">
            <h3>{title}</h3>
            <span>
              <RiArrowRightUpLine className="w-18 h-auto transition-transform duration-400 ease-out group-hover:-translate-y-2 group-hover:translate-x-2" />
            </span>
          </header>
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={300}
            height={200}
            loading="lazy"
            className="bg-slate-900 w-full h-42 object-contain p-small rounded-2xl"
          />
          <p>{description}</p>
        </article>
      </a>
    </li>
  );
}

export default Card;
