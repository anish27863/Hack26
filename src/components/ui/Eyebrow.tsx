"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn("text-label text-[var(--color-coral-500)] mb-3 flex items-center justify-center gap-2", className)}
    >
      <div className="h-[2px] w-8 bg-[var(--color-coral-500)]" />
      <span>{children}</span>
      <div className="h-[2px] w-8 bg-[var(--color-coral-500)]" />
    </motion.div>
  );
}
