import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-sm transition-all duration-300 hover:border-cyan-500/40 ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;