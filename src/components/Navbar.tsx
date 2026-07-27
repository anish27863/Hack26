"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Schedule", href: "#schedule" },
  { label: "Prizes", href: "#prizes" },
  { label: "Sponsors", href: "#sponsors" },
];

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = React.useState("hero");

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      let current = "hero";
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";

  return (
    <>
      <header
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 w-[92%] md:w-[75%] max-w-4xl bg-[var(--color-paper)]/95 dark:bg-[var(--color-paper-dark)]/95 backdrop-blur-md py-2 px-4 md:px-6 shadow-lg rounded-full border border-[var(--color-warm-taupe-200)]/40 dark:border-[var(--color-espresso-700)]/60"
      >
        <div className="w-full flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="#hero" className="flex items-center gap-1.5 shrink-0 relative z-50">
            <span className="text-base md:text-lg font-bold tracking-tight text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]">
              HACK<span className="text-[var(--color-coral-500)]">26</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6">
            <ul className="flex items-center gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="relative py-1">
                  <Link 
                    href={link.href}
                    className={cn(
                      "text-xs md:text-sm font-medium transition-colors hover:text-[var(--color-coral-500)]",
                      activeSection === link.href.substring(1)
                        ? "text-[var(--color-coral-500)]"
                        : "text-[var(--color-espresso-600)] dark:text-[var(--color-slate-blue-300)]"
                    )}
                  >
                    {link.label}
                  </Link>
                  {activeSection === link.href.substring(1) && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[var(--color-coral-500)]"
                    />
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="ghost" 
              magnetic={false} 
              className="p-1.5 text-inherit rounded-full hover:bg-[var(--muted-bg)]"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button href="#register" variant="primary" className="text-xs px-3.5 py-1.5 h-auto rounded-full font-semibold">
              Register
            </Button>
          </div>

          {/* Mobile Actions & Toggle */}
          <div className="md:hidden flex items-center gap-2 relative z-50">
            <Button 
              variant="ghost" 
              magnetic={false} 
              className="p-1.5 text-inherit"
              onClick={() => setTheme(isDark ? "light" : "dark")}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-1.5 text-inherit"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 z-[90] backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-[var(--color-paper)] dark:bg-[var(--color-paper-dark)] z-[95] shadow-2xl p-6 flex flex-col md:hidden"
            >
              <div className="mt-20 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-2xl font-semibold text-[var(--color-ink)] dark:text-[var(--color-ink-dark)]"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-[var(--color-warm-taupe-200)] dark:border-[var(--color-espresso-700)]">
                  <Button href="#register" className="w-full mt-4" onClick={() => setMobileOpen(false)}>
                    Register Now
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
