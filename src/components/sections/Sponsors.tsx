"use client";
import * as React from "react";
import { useConfigStore } from "@/store/useConfigStore";
import { Eyebrow } from "../ui/Eyebrow";
import { motion } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

function SponsorLogo({ sponsor }: { sponsor: any }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const { rotateX, rotateY, scale } = useTiltEffect(ref);
  const isTouch = useIsTouchDevice();
  const [imgError, setImgError] = React.useState(false);

  return (
    <motion.div 
      ref={ref}
      style={!isTouch ? { rotateX, rotateY, scale, perspective: 1000 } : {}}
      className="group relative flex-shrink-0 w-[240px] h-[140px] mx-6 flex items-center justify-center bg-[var(--card-bg)] border border-[var(--card-border)] rounded-sm p-6 transition-all hover:border-[var(--color-coral-500)]/50 cursor-pointer shadow-sm overflow-hidden"
    >
      {!imgError && sponsor.logoUrl && sponsor.logoUrl !== "" ? (
        <img 
          src={sponsor.logoUrl} 
          alt={sponsor.name} 
          onError={() => setImgError(true)}
          className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100" 
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-center w-full h-full">
          <span className="font-semibold text-[var(--foreground)] text-h2 mb-2 leading-tight">{sponsor.name}</span>
          <span className="text-label text-[var(--color-coral-500)] px-2 py-1 bg-[var(--color-coral-50)] dark:bg-[var(--color-coral-900)] rounded-sm">
            {sponsor.category}
          </span>
        </div>
      )}
      
      {!imgError && sponsor.logoUrl && sponsor.logoUrl !== "" && (
        <div className="absolute inset-0 bg-[var(--card-bg)]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center pointer-events-none rounded-sm">
          <span className="font-semibold text-[var(--foreground)] mb-1 text-lg">{sponsor.name}</span>
          <span className="text-xs uppercase tracking-widest text-[var(--color-coral-500)]">{sponsor.category}</span>
        </div>
      )}
    </motion.div>
  );
}

export function Sponsors() {
  const sponsors = useConfigStore((state) => state.config.sponsors);

  return (
    <section id="sponsors" className="py-24 bg-[var(--background)] overflow-hidden border-y border-[var(--color-warm-taupe-200)] dark:border-[var(--color-espresso-800)]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16 flex flex-col items-center">
          <Eyebrow>Our Partners</Eyebrow>
          <h2 className="text-h1 font-semibold text-[var(--foreground)] tracking-tight">
            Sponsors
          </h2>
        </div>
      </div>

      <div className="w-full relative flex overflow-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex w-max group-hover:[animation-play-state:paused]"
        >
          {/* Triple the array just to be safe if there are few sponsors */}
          {[...sponsors, ...sponsors, ...sponsors].map((sponsor, idx) => (
            <SponsorLogo key={`${sponsor.id}-${idx}`} sponsor={sponsor} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
