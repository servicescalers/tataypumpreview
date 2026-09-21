"use client";

import { useEffect, useRef, useState } from "react";

export function useAutoRotate(length: number, intervalMs = 6000) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const savedLength = useRef(length);

  useEffect(() => {
    savedLength.current = length;
  }, [length]);

  useEffect(() => {
    if (length <= 1 || hovered || focused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % savedLength.current);
    }, intervalMs);
    return () => clearInterval(id);
  }, [length, intervalMs, hovered, focused]);

  return {
    index,
    goTo: setIndex,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
}
