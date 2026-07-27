import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "outline" | "danger" | "muted";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-sm px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase";
  
  const variants = {
    default: "bg-[var(--color-ink)] text-[var(--color-paper)] dark:bg-[var(--color-ink-dark)] dark:text-[var(--color-paper-dark)]",
    success: "bg-[var(--color-sage-400)] text-[var(--color-ink)]",
    danger: "bg-[#C4645F] text-white",
    outline: "border border-current bg-transparent",
    muted: "bg-[var(--color-slate-blue-300)] text-white dark:bg-[var(--color-espresso-800)] dark:text-[var(--color-slate-blue-300)]"
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  );
}
