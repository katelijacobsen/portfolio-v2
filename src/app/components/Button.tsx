"use client";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-[linear-gradient(244deg,_#2854E3_13.87%,_#96ABEE_175.35%)] text-primary text-button px-button rounded-full"
    >
      {children}
    </button>
  );
};

export default Button;
