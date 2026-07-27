"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  magnetic?: boolean;
  href?: string;
  target?: string;
}

export const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant = "primary", magnetic = true, href, children, target, ...props }, forwardedRef) => {
    const localRef = React.useRef<HTMLElement>(null);
    const ref = (forwardedRef || localRef) as React.RefObject<any>;
    
    const { x, y } = useMagneticHover(magnetic ? ref : { current: null });

    const baseStyles = "inline-flex items-center justify-center rounded-sm text-sm font-medium transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-coral-500)] disabled:pointer-events-none disabled:opacity-50 tracking-[0.02em] px-6 py-3 cursor-pointer";
    
    const variants = {
      primary: "text-white uppercase shadow-sm hover:shadow-md bg-gradient-hero border-none", 
      secondary: "bg-[var(--color-espresso-600)] text-white hover:bg-[var(--color-espresso-700)]",
      ghost: "bg-transparent text-inherit hover:bg-black/5 dark:hover:bg-white/5",
      outline: "border border-current bg-transparent uppercase hover:bg-white/10 backdrop-blur-sm text-inherit",
    };

    const classes = cn(baseStyles, variants[variant], className);

    if (href) {
      return (
        <motion.div style={magnetic ? { x, y } : {}} className="inline-block" ref={ref as React.RefObject<HTMLDivElement>}>
          <Link href={href} target={target} className={classes} {...(props as any)}>
            {children}
          </Link>
        </motion.div>
      );
    }

    return (
      <motion.button
        ref={ref}
        style={magnetic ? { x, y } : {}}
        className={classes}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";
