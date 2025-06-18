import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";

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
        <article
          className={`group bg-primary-1 text-body-text p-medium w-full rounded-3xl flex flex-col gap-medium shadow-sm duration-400 transform transition-transform hover:scale-102 ${rotation} ${className}`}
        >
          <header className="flex items-end justify-between">
            <h3 className="font-subheader font-semibold tracking-wider">{title}</h3>
            <span>
              <FiArrowUpRight className="w-18 h-auto transition-transform duration-400 ease-out group-hover:-translate-y-2 group-hover:translate-x-2 text-accent-1" />
            </span>
          </header>
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={300}
            height={200}
            loading="lazy"
            className="object-cover p-small rounded-2xl aspect-[2/1] w-full h-auto"
          />
          <p>{description}</p>
        </article>
    </li>
  );
}

export default Card;
