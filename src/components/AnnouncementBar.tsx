"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/Button";

export function AnnouncementBar() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const dismissed = sessionStorage.getItem("announcement_dismissed");
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("announcement_dismissed", "true");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[80] bg-[var(--color-ink)] dark:bg-[var(--color-paper)] p-4 shadow-2xl border-t border-[var(--color-warm-taupe-200)]/20"
        >
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[var(--color-paper)] dark:text-[var(--color-ink)] font-medium text-sm md:text-base">
              Registration closes in <span className="text-[var(--color-coral-500)] font-bold">5 days</span>. Secure your spot now!
            </p>
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="ghost" onClick={dismiss} className="text-[var(--color-warm-taupe-300)] dark:text-[var(--color-espresso-600)] hover:text-white dark:hover:text-black px-4 flex-1 md:flex-none">
                Dismiss
              </Button>
              <Button href="#register" onClick={dismiss} className="flex-1 md:flex-none">
                Register Now
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
