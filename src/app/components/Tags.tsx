import { ReactNode } from "react";

interface TagsProps {
  skill?: string;
  icon?: ReactNode; 
  bgColor?: string;
  txtColor?: string;
  className?: string;
}

const Tags: React.FC<TagsProps> = ({ skill, icon, bgColor, txtColor, className }) => {
  return (
    <p className={`uppercase font-semibold flex items-center gap-x-small p-small rounded-2xl tracking-wide ${className} ${bgColor} ${txtColor}`}>
      {icon}{skill}
    </p>
  );
};

export default Tags;