import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  className?: string;
}

/** Small pill used for project categories and résumé date ranges. */
export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "bg-tag-bg text-tag-text tag-text inline-block w-fit h-fit px-3 py-1 rounded-md whitespace-nowrap",
        className
      )}
    >
      {children}
    </span>
  );
}
