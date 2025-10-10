import Image from "next/image";
import { FC } from "react";

interface FlagProps {
  countryFlag: string;
  width?: number;
  height?: number;
  className?: string;
}

const Flag: FC<FlagProps> = ({
  countryFlag,
  width = 24,
  height = 16,
  className = "",
}) => {
  return (
    <li>
      <Image
        src={`/img/flags/${countryFlag}.png`}
        alt={`${countryFlag} flag`}
        width={width}
        height={height}
        className={className}
      />
    </li>
  );
};

export default Flag;
