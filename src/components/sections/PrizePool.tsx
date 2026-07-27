"use client";
import * as React from "react";
import { useConfigStore } from "@/store/useConfigStore";
import { Eyebrow } from "../ui/Eyebrow";
import { TiltCard } from "../ui/TiltCard";
import { Badge } from "../ui/Badge";
import { Trophy, Medal, Award, Lightbulb, Star, Shield } from "lucide-react";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

const ICON_MAP: Record<string, any> = {
  Trophy, Medal, Award, Lightbulb, Star, Shield
};

export function PrizePool() {
  const prizes = useConfigStore((state) => state.config.prizes);

  return (
    <section id="prizes" className="py-24 bg-[var(--background)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 flex flex-col items-center">
          <Eyebrow>The Rewards</Eyebrow>
          <h2 className="text-h1 font-semibold text-[var(--foreground)] tracking-tight">
            Prize Pool
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prizes.map((prize, idx) => {
            const Icon = ICON_MAP[prize.icon] || Trophy;

            return (
              <TiltCard key={prize.id} delay={idx * 0.1} className="relative group">
                <div className="absolute top-6 right-6 z-10 flex gap-2">
                  {prize.isNew && <Badge variant="success">New Track</Badge>}
                  {prize.tier === "First" && <Badge variant="default" className="!bg-[var(--color-coral-500)] !text-white">Grand Prize</Badge>}
                </div>

                <div className="mb-6 mt-2 relative">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-slate-blue-50)] dark:bg-[var(--color-espresso-900)] flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <Icon className="w-8 h-8 text-[var(--color-coral-500)]" />
                  </div>
                  <div className="absolute inset-0 bg-[var(--color-coral-500)] blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
                </div>

                <h3 className="text-h2 text-[var(--foreground)] mb-2 uppercase tracking-wide">
                  {prize.tier}
                </h3>
                
                <div className="mb-4 transform transition-transform duration-500 origin-left group-hover:scale-110">
                  <span className="text-stat text-transparent bg-clip-text bg-gradient-hero">
                    {prize.amount}
                  </span>
                </div>

                <p className="text-[var(--muted-fg)] leading-relaxed">
                  {prize.description}
                </p>
                
                {/* Decorative Accent */}
                <div className="mt-8 h-1 w-12 bg-gradient-hero rounded-full opacity-50 group-hover:w-full transition-all duration-500" />
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
