import Image from "next/image";
import { RiArrowRightUpLine } from "react-icons/ri";

interface Props {
  title: string;
  imgSrc: string;
  imgAlt: string;
  description: string;
  rotation?: string;
  className?: string;
}

function Card({ title, imgSrc, imgAlt, description, rotation, className }: Props) {
  return (
    <article className={`bg-slate-50 p-medium rounded-3xl flex flex-col gap-medium shadow-sm hover:shadow-xl transition-shadow duration-300 ${rotation} ${className}`}>
      <header className="flex items-end justify-between">
        <h3>{title}</h3>
        <a>
          <RiArrowRightUpLine className="w-18 h-auto" />
        </a>
      </header>
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={300}
        height={200}
        loading="lazy"
        className="bg-slate-900 w-full h-56 object-contain p-small rounded-2xl"
      />
      <p>{description}</p>
    </article>
  );
}

export default Card;
