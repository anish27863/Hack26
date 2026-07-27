"use client";
import { RefObject, useEffect } from "react";
import { useSpring } from "framer-motion";
import { useCursorPosition } from "./useCursorPosition";
import { useIsTouchDevice } from "./useIsTouchDevice";

export function useTiltEffect(ref: RefObject<HTMLElement | null>) {
  const { x: cursorX, y: cursorY } = useCursorPosition();
  const isTouch = useIsTouchDevice();

  const springConfig = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  useEffect(() => {
    if (isTouch) {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
      return;
    }

    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    
    if (
      cursorX >= rect.left &&
      cursorX <= rect.right &&
      cursorY >= rect.top &&
      cursorY <= rect.bottom
    ) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const relativeX = (cursorX - centerX) / (rect.width / 2);
      const relativeY = (cursorY - centerY) / (rect.height / 2);

      rotateX.set(-relativeY * 8); 
      rotateY.set(relativeX * 8);
      scale.set(1.02);
    } else {
      rotateX.set(0);
      rotateY.set(0);
      scale.set(1);
    }
  }, [cursorX, cursorY, isTouch, ref, rotateX, rotateY, scale]);

  return { rotateX, rotateY, scale };
}
