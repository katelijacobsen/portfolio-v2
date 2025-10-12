import Image from 'next/image';
import { FC } from 'react';

interface Props {
    iconSrc: string;
    altText: string;
    size?: number;
}

const SkillIcon: FC<Props> = ({ iconSrc, altText, size = 40 }) => {
    return (
        <li className="">
            <Image
                src={iconSrc}
                alt={altText}
                width={size}
                height={size}
                className="object-contain aspect-square"
            />
        </li>
    );
};

export default SkillIcon;