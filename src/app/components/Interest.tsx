import Image from "next/image";
import { FC } from "react";

interface Props {
  interest: string;
  icon: string;
  borderColor: string;
  bg: string;
}

const Interest: FC<Props> = ({ interest, icon, borderColor, bg }) => {
  return (
    <li
      className={`inline-flex items-center gap-2 border p-x-small ${borderColor} rounded-lg ${bg}`}
    >
      <Image src={icon} alt={`${interest} icon`} width={32} height={32} className="aspect-square" />
      <p>{interest}</p>
    </li>
  );
};

export default Interest;
