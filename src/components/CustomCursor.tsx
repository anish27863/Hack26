"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useCursorPosition } from "@/hooks/useCursorPosition";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export function CustomCursor() {
  const { x, y } = useCursorPosition();
  const isTouch = useIsTouchDevice();
  const [cursorType, setCursorType] = useState<"default" | "clickable" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  useEffect(() => {
    if (isTouch) return;
    if (x !== -1000 && y !== -1000) {
      setIsVisible(true);
      ringX.set(x);
      ringY.set(y);
    }
  }, [x, y, ringX, ringY, isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const style = window.getComputedStyle(target);
      if (style.cursor === "text" || ["INPUT", "TEXTAREA"].includes(target.tagName)) {
        setCursorType("text");
        return;
      }
      
      if (
        style.cursor === "pointer" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']")
      ) {
        setCursorType("clickable");
        return;
      }
      
      setCursorType("default");
    };

    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, [isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          body, *:not(input):not(textarea) {
            cursor: none !important;
          }
          input, textarea {
            cursor: none !important;
          }
        }
      `}</style>
      
      {/* The Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[var(--color-coral-500)]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "default" ? 8 : 0,
          height: cursorType === "default" ? 8 : 0,
          opacity: cursorType === "default" ? 1 : 0
        }}
        transition={{ duration: 0.15 }}
      />

      {/* The Text Line */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] bg-[var(--color-coral-500)]"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "text" ? 2 : 0,
          height: cursorType === "text" ? 24 : 0,
          opacity: cursorType === "text" ? 1 : 0
        }}
        transition={{ duration: 0.15 }}
      />

      {/* The Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[var(--color-coral-500)]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: cursorType === "clickable" ? 56 : 32,
          height: cursorType === "clickable" ? 56 : 32,
          backgroundColor: cursorType === "clickable" ? "rgba(231, 113, 125, 0.15)" : "rgba(231, 113, 125, 0)",
          opacity: cursorType === "text" ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}
