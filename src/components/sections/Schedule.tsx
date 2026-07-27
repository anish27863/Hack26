"use client";
import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useConfigStore } from "@/store/useConfigStore";
import { Eyebrow } from "../ui/Eyebrow";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

function ScheduleCard({ item, status, align }: { item: any; status: string; align: "left" | "right" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "bg-[var(--card-bg)] border border-[var(--card-border)] p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 w-full",
        status === "current" ? "border-[var(--color-coral-500)] shadow-[0_0_20px_rgba(231,113,125,0.15)] ring-1 ring-[var(--color-coral-500)]" : ""
      )}
    >
      <div className={cn("flex flex-col gap-3", align === "right" ? "md:items-end md:text-right text-left items-start" : "items-start text-left")}>
        <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)] tracking-tight">{item.title}</h3>
        <p className="text-[var(--muted-fg)] leading-relaxed text-sm md:text-base">{item.description}</p>
        
        <div className={cn(
          "flex flex-wrap items-center gap-x-3 gap-y-2 mt-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-coral-500)]",
          align === "right" ? "md:justify-end justify-start" : "justify-start"
        )}>
          <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {item.time}</span>
          <span className="opacity-50">•</span>
          <span>{item.date}</span>
          <span className="opacity-50">•</span>
          <span>{item.location}</span>
        </div>
      </div>
    </motion.div>
  );
}

export function Schedule() {
  const schedule = useConfigStore((state) => state.config.schedule);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const getStatus = (dateStr: string, timeStr: string, index: number, allEvents: any[]) => {
    // Basic mock logic for prototype timeline status
    if (index === 0) return "completed";
    if (index === 1) return "current";
    return "upcoming";
  };

  return (
    <section id="schedule" className="py-24 bg-[var(--background)] overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-20 flex flex-col items-center">
          <Eyebrow>The Roadmap</Eyebrow>
          <h2 className="text-h1 font-semibold text-[var(--foreground)] tracking-tight">
            Event Schedule
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto" ref={containerRef}>
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--color-warm-taupe-200)] dark:bg-[var(--color-espresso-800)] -translate-x-1/2" />
          
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--color-coral-500)] -translate-x-1/2 origin-top"
            style={{ scaleY: fillHeight }}
          />

          <div className="flex flex-col gap-12 md:gap-8 relative z-10">
            {schedule.map((item, index) => {
              const status = getStatus(item.date, item.time, index, schedule);
              const isEven = index % 2 === 0;

              return (
                <div key={item.id} className="relative flex items-center w-full">
                  {/* Left Space (Desktop) */}
                  <div className="hidden md:flex w-1/2 pr-12 justify-end">
                    {isEven && <ScheduleCard item={item} status={status} align="right" />}
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    {status === "completed" && (
                      <div className="p-1.5 rounded-full bg-[var(--background)] shadow-sm border border-[var(--color-sage-400)]/30">
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-sage-400)] stroke-[2.5]" />
                      </div>
                    )}
                    {status === "current" && (
                      <div className="relative p-1.5 rounded-full bg-[var(--background)] shadow-md border border-[var(--color-coral-500)]/40">
                        <Clock className="w-5 h-5 text-[var(--color-coral-500)] stroke-[2.5] animate-pulse" />
                        <div className="absolute inset-0 rounded-full bg-[var(--color-coral-500)]/20 blur-sm -z-10" />
                      </div>
                    )}
                    {status === "upcoming" && (
                      <div className="p-1.5 rounded-full bg-[var(--background)] border border-[var(--card-border)]">
                        <Circle className="w-4 h-4 text-[var(--color-warm-taupe-400)] stroke-[2]" />
                      </div>
                    )}
                  </div>

                  {/* Right Space (Desktop) & Mobile Full */}
                  <div className="w-full md:w-1/2 pl-20 pr-4 md:pl-12 md:pr-0">
                    <div className="hidden md:block">
                      {!isEven && <ScheduleCard item={item} status={status} align="left" />}
                    </div>
                    <div className="block md:hidden">
                      <ScheduleCard item={item} status={status} align="left" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
