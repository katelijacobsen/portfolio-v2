interface TagsProps {
  children: React.ReactNode;
}

const Tags: React.FC<TagsProps> = ({ children }) => {
  return (
    <li>
      {children}
    </li>
  );
};

export default Tags;