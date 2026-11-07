import React, { useEffect, useRef, useState } from "react";
import SwarmCursor from "@/components/swarm-cursor";
import { onHeroDone } from "@/hero-intro";
import { SwarmEngine } from "@/swarm-engine";
import { BRANCH_TONE, CURSOR_QUERY, PAGE_CURSORS } from "@/swarm-motion";

// Safety net: if the hero never reports in, the page still assembles.
const HERO_FALLBACK_MS = 6000;

/** Page-wide overlay whose cursor crews assemble each section as it scrolls into view. */
const PageSwarm: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorEls = useRef<(HTMLDivElement | null)[]>([]);
  const [showCursors] = useState(() => window.matchMedia(CURSOR_QUERY).matches);

  useEffect(() => {
    const overlay = overlayRef.current;
    const shell = overlay?.parentElement;
    if (!overlay || !shell) return;

    const crew = showCursors
      ? PAGE_CURSORS.flatMap((cursor, index) => {
          const el = cursorEls.current[index];
          return el ? [{ ...cursor, el }] : [];
        })
      : [];
    const engine = new SwarmEngine(shell, overlay, crew);
    const offHeroDone = onHeroDone(() => engine.start());
    const fallback = window.setTimeout(() => engine.start(), HERO_FALLBACK_MS);

    return () => {
      offHeroDone();
      window.clearTimeout(fallback);
      engine.stop();
    };
  }, [showCursors]);

  return (
    <div ref={overlayRef} className="page-swarm" aria-hidden="true">
      {showCursors &&
        PAGE_CURSORS.map((cursor, index) => (
          <SwarmCursor
            key={cursor.label}
            label={cursor.label}
            tone={BRANCH_TONE[cursor.branch]}
            ref={(el) => {
              cursorEls.current[index] = el;
            }}
          />
        ))}
    </div>
  );
};

export default PageSwarm;
