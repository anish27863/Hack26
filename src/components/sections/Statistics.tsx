"use client";
import * as React from "react";
import { useConfigStore } from "@/store/useConfigStore";
import { TiltCard } from "../ui/TiltCard";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

function CountUp({ text }: { text: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const match = text.match(/^(\D*)(\d+)(\D*)$/);
  
  if (!match) return <span ref={ref}>{text}</span>;
  
  const prefix = match[1];
  const target = parseInt(match[2], 10);
  const suffix = match[3];

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  React.useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, target, isInView]);

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Statistics() {
  const stats = useConfigStore((state) => state.config.stats);

  return (
    <section className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={stat.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-8 flex flex-col items-center justify-center gap-3 shadow-sm"
            >
              <div className="text-stat font-bold text-[var(--foreground)] tracking-tight leading-none">
                <CountUp text={stat.value} />
              </div>
              <div className="text-label text-[var(--color-coral-500)] text-center">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
