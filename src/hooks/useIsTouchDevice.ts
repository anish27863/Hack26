"use client";
import { useState, useEffect } from "react";

export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches
      );
    };
    checkTouch();
  }, []);

  return isTouch;
}
