import React from "react";
import type { Tone } from "@/swarm-motion";

interface SwarmCursorProps {
  label: string;
  tone: Tone;
  ref?: React.Ref<HTMLDivElement>;
}

/** One labelled multiplayer-style pointer. Decorative; its overlay is aria-hidden. */
const SwarmCursor: React.FC<SwarmCursorProps> = ({ label, tone, ref }) => (
  <div ref={ref} className="swarm-cursor" data-tone={tone}>
    <svg viewBox="0 0 16 20">
      <path d="M1 1 V15.6 L4.9 11.9 L7.5 18.2 L10.3 17 L7.7 10.9 H13.1 Z" />
    </svg>
    <span className="swarm-cursor__label">{label}</span>
  </div>
);

export default SwarmCursor;
