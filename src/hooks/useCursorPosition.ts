"use client";
import { useState, useEffect } from "react";
import { useIsTouchDevice } from "./useIsTouchDevice";

let globalX = -1000;
let globalY = -1000;
const listeners = new Set<(x: number, y: number) => void>();

let isListening = false;

function handleMouseMove(e: MouseEvent) {
  globalX = e.clientX;
  globalY = e.clientY;
  listeners.forEach((listener) => listener(globalX, globalY));
}

function startListening() {
  if (!isListening && typeof window !== "undefined") {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    isListening = true;
  }
}

function stopListening() {
  if (isListening && listeners.size === 0 && typeof window !== "undefined") {
    window.removeEventListener("mousemove", handleMouseMove);
    isListening = false;
  }
}

export function useCursorPosition() {
  const isTouch = useIsTouchDevice();
  const [position, setPosition] = useState({ x: globalX, y: globalY });

  useEffect(() => {
    if (isTouch) return;

    const listener = (x: number, y: number) => {
      setPosition({ x, y });
    };

    listeners.add(listener);
    startListening();

    setPosition({ x: globalX, y: globalY });

    return () => {
      listeners.delete(listener);
      stopListening();
    };
  }, [isTouch]);

  return position;
}
