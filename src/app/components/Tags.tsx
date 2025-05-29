import { ReactNode } from "react";

interface TagsProps {
  skill: string;
  icon?: ReactNode; 
  className?: string;
}

const Tags: React.FC<TagsProps> = ({ skill, icon, className }) => {
  return (
    <p className={`flex items-center gap-xx-small p-x-small bg-white border-accent border rounded-lg ${className}`}>
      {icon}{skill}
    </p>
  );
};

export default Tags;