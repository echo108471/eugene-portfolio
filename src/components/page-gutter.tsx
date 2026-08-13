import React, { useCallback, useEffect, useRef, useState } from "react";

// Height of one line-number row. Also the scroll distance that advances the
// file by one line, so the rail scrolls at exactly the page's own rate.
const ROW_HEIGHT = 18;
// Rows drawn past the viewport so the column never runs short mid-scroll.
const OVERSCAN = 2;
// Where the "line being read" sits: below the 62px sticky header, plus slack.
const READ_LINE_OFFSET = 74;

// Sections, in document order. Each one's first line gets a `+` in the gutter.
const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "history",
  "projects",
  "skills",
  "education",
  "awards",
  "contact",
];

interface SectionSpan {
  top: number;
  bottom: number;
}

/**
 * A fixed line-number rail that turns the whole page into one source file:
 * numbers scroll with the document, section boundaries read as `+` additions,
 * and an accent bar marks the extent of the section you're currently inside.
 *
 * Decorative and inert — hidden from assistive tech, and only rendered on
 * viewports wide enough to hold it clear of the content column.
 */
const PageGutter: React.FC = () => {
  const [firstLine, setFirstLine] = useState(1);
  const [rowCount, setRowCount] = useState(0);
  const [markLines, setMarkLines] = useState<ReadonlySet<number>>(() => new Set());

  const columnRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  // Mirrors `firstLine` so the scroll handler can skip no-op state updates.
  const firstLineRef = useRef(1);
  const sectionsRef = useRef<SectionSpan[]>([]);

  const measure = useCallback(() => {
    const scrollY = window.scrollY;

    const spans = SECTION_IDS.map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return { top: rect.top + scrollY, bottom: rect.bottom + scrollY };
      });

    sectionsRef.current = spans;
    setMarkLines(new Set(spans.map((span) => Math.round(span.top / ROW_HEIGHT) + 1)));
    setRowCount(Math.ceil(window.innerHeight / ROW_HEIGHT) + OVERSCAN);
  }, []);

  const paint = useCallback(() => {
    const scrollY = window.scrollY;

    // Sub-row offset, so the numbers glide rather than stepping row by row.
    const column = columnRef.current;
    if (column) {
      column.style.transform = `translate3d(0, ${-(scrollY % ROW_HEIGHT)}px, 0)`;
    }

    const nextFirstLine = Math.floor(scrollY / ROW_HEIGHT) + 1;
    if (nextFirstLine !== firstLineRef.current) {
      firstLineRef.current = nextFirstLine;
      setFirstLine(nextFirstLine);
    }

    const bar = barRef.current;
    const sections = sectionsRef.current;
    if (bar && sections.length) {
      const readLine = scrollY + READ_LINE_OFFSET;
      let current = sections[0];
      sections.forEach((span) => {
        if (span.top <= readLine) current = span;
      });

      const top = Math.max(current.top - scrollY, 0);
      const bottom = Math.min(current.bottom - scrollY, window.innerHeight);
      bar.style.transform = `translate3d(0, ${top}px, 0)`;
      bar.style.height = `${Math.max(bottom - top, 0)}px`;
      bar.style.opacity = bottom > top ? "1" : "0";
    }
  }, []);

  useEffect(() => {
    let frame = 0;

    const schedulePaint = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        paint();
      });
    };

    const handleResize = () => {
      measure();
      schedulePaint();
    };

    measure();
    paint();

    window.addEventListener("scroll", schedulePaint, { passive: true });
    window.addEventListener("resize", handleResize);

    // Section offsets shift as fonts load and images settle; re-measure when
    // the document's own height changes rather than guessing at a delay.
    const observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", schedulePaint);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [measure, paint]);

  return (
    <div className="page-gutter" aria-hidden="true">
      <div ref={barRef} className="page-gutter__bar" />
      <div ref={columnRef} className="page-gutter__column">
        {Array.from({ length: rowCount }, (_, index) => {
          const line = firstLine + index;
          return markLines.has(line) ? (
            <span key={line} className="page-gutter__row is-mark">
              +
            </span>
          ) : (
            <span key={line} className="page-gutter__row">
              {line}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PageGutter;
