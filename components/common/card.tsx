"use client";

import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg p-6 transition-transform transform hover:-translate-y-1",
        className,
      )}
    >
      {children}
    </div>
  );
};
