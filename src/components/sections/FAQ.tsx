"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConfigStore } from "@/store/useConfigStore";
import { Eyebrow } from "../ui/Eyebrow";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQ() {
  const faq = useConfigStore((state) => state.config.faq);
  const [openId, setOpenId] = React.useState<string | null>(faq[0]?.id || null);

  return (
    <section id="faq" className="py-24 bg-[var(--muted-bg)]">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <div className="text-center mb-16 flex flex-col items-center">
          <Eyebrow>Got Questions?</Eyebrow>
          <h2 className="text-h1 font-semibold text-[var(--foreground)] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faq.map((item) => (
            <div 
              key={item.id}
              className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm overflow-hidden transition-colors duration-300"
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-medium text-[var(--foreground)] pr-8">{item.question}</span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-[var(--color-coral-500)] transition-transform duration-300 flex-shrink-0",
                    openId === item.id ? "rotate-180" : ""
                  )} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-4 text-[var(--muted-fg)] leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
