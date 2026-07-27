"use client";
import { RefObject, useEffect } from "react";
import { useSpring } from "framer-motion";
import { useCursorPosition } from "./useCursorPosition";
import { useIsTouchDevice } from "./useIsTouchDevice";

export function useMagneticHover(ref: RefObject<HTMLElement | null>, radius = 60, maxOffset = 8) {
  const { x: cursorX, y: cursorY } = useCursorPosition();
  const isTouch = useIsTouchDevice();

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    if (isTouch) {
      x.set(0);
      y.set(0);
      return;
    }

    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = cursorX - centerX;
    const distanceY = cursorY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    const effectiveRadius = Math.max(rect.width, rect.height) / 2 + radius;

    if (distance < effectiveRadius) {
      const pullFactor = 1 - distance / effectiveRadius;
      const offsetX = (distanceX / distance) * Math.min(distance, maxOffset) * pullFactor;
      const offsetY = (distanceY / distance) * Math.min(distance, maxOffset) * pullFactor;
      
      x.set(offsetX);
      y.set(offsetY);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [cursorX, cursorY, isTouch, radius, maxOffset, ref, x, y]);

  return { x, y };
}
