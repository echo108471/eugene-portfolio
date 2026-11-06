import React, { useEffect, useRef, useState } from "react";
import SwarmCursor from "@/components/swarm-cursor";
import { onHeroDone } from "@/hero-intro";
import { SwarmEngine } from "@/swarm-engine";
import { CURSOR_QUERY, SWARM_CURSORS, type CursorId } from "@/swarm-motion";

// Safety net: if the hero never reports in, the page still assembles.
const HERO_FALLBACK_MS = 6000;

/** Page-wide overlay whose cursors assemble each section as it scrolls into view. */
const PageSwarm: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cursorEls = useRef<Partial<Record<CursorId, HTMLDivElement | null>>>({});
  const [showCursors] = useState(() => window.matchMedia(CURSOR_QUERY).matches);

  useEffect(() => {
    const overlay = overlayRef.current;
    const shell = overlay?.parentElement;
    if (!overlay || !shell) return;

    const engine = new SwarmEngine(shell, overlay, showCursors ? cursorEls.current : null);
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
        SWARM_CURSORS.map((cursor) => (
          <SwarmCursor
            key={cursor.id}
            id={cursor.id}
            tone={cursor.tone}
            ref={(el) => {
              cursorEls.current[cursor.id] = el;
            }}
          />
        ))}
    </div>
  );
};

export default PageSwarm;
