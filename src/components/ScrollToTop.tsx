"use client";

import { useEffect, useState } from "react";
import { ChevronIcon } from "@/components/icons";

/** Red "back to top" square in the bottom right corner, shown after scrolling down. */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-top"
      aria-label="Přejít nahoru"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ChevronIcon />
    </button>
  );
}
