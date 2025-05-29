"use client";

import { ReactNode } from "react";

interface Props {
  text: string;
  variant: "primary" | "secondary";
  icon?: ReactNode;
}

const Button = ({ text, variant, icon }: Props) => {
  let variantClass = " ";

  switch (variant) {
    case "primary":
      variantClass =
        "flex items-center gap-medium bg-[linear-gradient(244deg,_#2854E3_13.87%,_#96ABEE_175.35%)] text-primary text-button p-button rounded-full blue-shadow";
      break;
    case "secondary":
      variantClass =
        "flex items-center gap-medium bg-neutral text-button text-accent p-button rounded-full border-2 border-accent blue-shadow";
      break;
  }

  return (
    <button className={variantClass}>
      {text}
      <span>{icon}</span>
    </button>
  );
};

export default Button;
