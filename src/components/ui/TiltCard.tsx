"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { cn } from "@/lib/utils";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export function TiltCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, scale } = useTiltEffect(ref);
  const isTouch = useIsTouchDevice();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay, duration: 0.5 }}
      style={!isTouch ? { perspective: 1000 } : {}}
      className="h-full"
    >
      <motion.div
        ref={ref}
        style={!isTouch ? { rotateX, rotateY, scale, transformStyle: "preserve-3d" } : {}}
        className={cn(
          "bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-6 shadow-sm h-full flex flex-col",
          isTouch ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-md" : "",
          className
        )}
      >
        <div style={!isTouch ? { transform: "translateZ(30px)" } : {}} className="h-full flex flex-col">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
