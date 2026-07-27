"use client";
import * as React from "react";
import { motion, useSpring } from "framer-motion";
import { Button } from "../ui/Button";
import { useConfigStore } from "@/store/useConfigStore";
import { useCountdown } from "@/hooks/useCountdown";
import { useCursorPosition } from "@/hooks/useCursorPosition";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

function HeroSpotlight() {
  const { x, y } = useCursorPosition();
  const isTouch = useIsTouchDevice();
  const springConfig = { stiffness: 100, damping: 25, mass: 0.5 };
  const spotlightX = useSpring(0, springConfig);
  const spotlightY = useSpring(0, springConfig);

  React.useEffect(() => {
    if (!isTouch && x !== -1000) {
      spotlightX.set(x);
      spotlightY.set(y);
    }
  }, [x, y, isTouch, spotlightX, spotlightY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] rounded-full z-0 mix-blend-screen opacity-20"
      style={{
        background: "radial-gradient(circle, var(--color-coral-500) 0%, transparent 70%)",
        x: spotlightX,
        y: spotlightY,
        translateX: "-50%",
        translateY: "-50%"
      }}
    />
  );
}

function AmbientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--color-coral-500)] rounded-full mix-blend-multiply filter blur-[128px] opacity-30"
      />
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 100, -50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-[var(--color-sage-400)] rounded-full mix-blend-multiply filter blur-[100px] opacity-20"
      />
      <motion.div
        animate={{
          x: [0, 50, -100, 0],
          y: [0, 50, -50, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-[var(--color-warm-taupe-300)] rounded-full mix-blend-multiply filter blur-[128px] opacity-30"
      />
    </div>
  );
}

export function Hero() {
  const event = useConfigStore((state) => state.config.event);
  const stats = useConfigStore((state) => state.config.stats);
  const { days, hours, minutes, seconds } = useCountdown(event.registrationDeadline);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col bg-gradient-hero overflow-hidden text-[var(--color-paper)]">
      <AmbientBlobs />
      <HeroSpotlight />
      
      <div className="flex-1 flex flex-col md:flex-row z-10 w-full relative">
        <div className="w-full md:w-1/2 flex flex-col justify-start pt-28 sm:pt-32 md:pt-36 lg:pt-40 pb-16 px-8 md:px-16 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-display mb-6 text-white tracking-tight">
              {event.name}
            </h1>
            <p className="text-body-lg mb-4 text-white/90">
              {event.tagline}
            </p>
            <p className="text-body text-white/80 max-w-lg mb-10 leading-relaxed">
              {event.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex gap-6 mb-12"
          >
            {[
              { label: "Days", value: days },
              { label: "Hours", value: hours },
              { label: "Mins", value: minutes },
              { label: "Secs", value: seconds },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-stat">{String(item.value).padStart(2, '0')}</span>
                <span className="text-label text-white/70 mt-1">{item.label}</span>
              </div>
            ))}
          </motion.div>

          <div className="flex flex-wrap gap-4">
             <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <Button href="#register" variant="primary" className="!bg-[var(--color-ink)] !text-[var(--color-paper)] hover:!bg-[var(--color-ink)]/90 border-none shadow-xl">
                Register Now
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Button href="#about" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="w-full md:w-1/2 min-h-[400px] md:min-h-full bg-[var(--color-espresso-600)] relative">
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80" 
            alt="Hackathon Event" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--color-ink)]/40" />
        </div>
      </div>

      <div className="w-full bg-[var(--color-ink)] z-20 relative">
        <div className="container mx-auto px-4 md:px-8 py-6">
          <div className="flex flex-wrap justify-between items-center gap-6">
            {stats.slice(0, 4).map((stat, idx) => (
               <motion.div 
                key={stat.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2"
              >
                <span className="text-h2 text-[var(--color-paper)]">{stat.value}</span>
                <span className="text-label text-[var(--color-warm-taupe-300)]">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
