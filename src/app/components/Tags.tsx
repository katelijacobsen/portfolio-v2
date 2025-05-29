import { ReactNode } from "react";

interface TagsProps {
  skill: string;
  icon?: ReactNode; 
  bgColor?: string;
  txtColor?: string;
  className?: string;
}

const Tags: React.FC<TagsProps> = ({ skill, icon, bgColor, txtColor, className }) => {
  return (
    <p className={`flex items-center gap-xx-small p-small rounded-2xl ${className} ${bgColor} ${txtColor}`}>
      {icon}{skill}
    </p>
  );
};

export default Tags;