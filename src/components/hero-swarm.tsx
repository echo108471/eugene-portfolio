import React, { useEffect, useRef, useState } from "react";
import SwarmCursor from "@/components/swarm-cursor";
import { markIntroPlayed, WORD_STEP_MS, type IntroStage } from "@/hero-intro";
import {
  animateFade,
  CURSOR_QUERY,
  pulse,
  SWARM_CURSORS,
  Track,
  type CursorId,
  type Point,
} from "@/swarm-motion";

// The hero assembles itself: three cursors, one per career.graph branch, each
// make one change. Product strikes the prior self, platform writes the current
// headline, applied AI switches the graph's HEAD. Then each flies home and
// docks into its own branch node.
//
// The real content is in the DOM the whole time; this overlay is decorative and
// aria-hidden. Any pointer, key, or resize skips straight to the finished hero.

const TIMELINE = {
  cursors: { strike: 740, type: 800, tail: 860 },
  quiet: { strike: 220, type: 420, tail: 480 },
};

const FONT_WAIT_MS = 700;
const AI_CLICK_MS = 1000;

function place(el: HTMLElement, x: number, y: number, w: number, h: number) {
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.width = `${w}px`;
  el.style.height = `${h}px`;
}

interface HeroSwarmProps {
  rootRef: React.RefObject<HTMLDivElement | null>;
  onStage: (stage: IntroStage) => void;
}

const HeroSwarm: React.FC<HeroSwarmProps> = ({ rootRef, onStage }) => {
  const cursorEls = useRef<Partial<Record<CursorId, HTMLDivElement | null>>>({});
  const selectEl = useRef<HTMLDivElement>(null);
  const guideEl = useRef<HTMLDivElement>(null);
  const [showCursors] = useState(
    () => typeof window !== "undefined" && window.matchMedia(CURSOR_QUERY).matches,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const timers: number[] = [];
    const animations: Animation[] = [];
    let cancelled = false;

    const at = (t: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, t));
    };

    const stop = () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      animations.forEach((animation) => animation.cancel());
    };

    const skip = () => {
      stop();
      onStage("done");
    };

    const choreograph = (clock: typeof TIMELINE.cursors, settle: number, done: number) => {
      const { product, platform, ai } = cursorEls.current;
      const select = selectEl.current;
      const guide = guideEl.current;
      const priorText = root.querySelector<HTMLElement>('[data-swarm="prior"]');
      const lede = root.querySelector<HTMLElement>('[data-swarm="lede"]');
      const actions = root.querySelector<HTMLElement>('[data-swarm="actions"]');
      const words = Array.from(root.querySelectorAll<HTMLElement>(".hero-word"));
      if (!product || !platform || !ai || !select || !guide || !priorText || !lede || !actions) {
        return;
      }
      if (words.length === 0) return;

      const origin = root.getBoundingClientRect();
      const local = (x: number, y: number): Point => ({ x: x - origin.left, y: y - origin.top });
      const toneOf = (el: HTMLElement) => getComputedStyle(el).color;

      // Each branch node in career.graph is a cursor's home. Measure against the
      // graph's layout box so its CSS rise-in transform doesn't skew the target.
      const graph = root.querySelector<HTMLElement>(".hero-graph");
      const graphRect = graph?.getBoundingClientRect();
      const homeOf = (id: CursorId) => {
        const node = Array.from(root.querySelectorAll<HTMLElement>(`[data-branch="${id}"]`)).find(
          (el) => el.getClientRects().length > 0,
        );
        const dot = node?.querySelector<HTMLElement>(".branch-graph__node-dot");
        if (!graph || !graphRect || !node || !dot) return null;

        const rect = dot.getBoundingClientRect();
        const point: Point = {
          x: graph.offsetLeft + rect.left - graphRect.left + rect.width / 2,
          y: graph.offsetTop + rect.top - graphRect.top + rect.height / 2,
        };
        return { node, dot, point };
      };

      // product: select the prior line, release, the strike lands, then fly home.
      const lines = priorText.getClientRects();
      const first = lines[0];
      const last = lines[lines.length - 1];
      const dragFrom = local(first.left - 2, first.top + first.height * 0.62);
      const dragTo = local(last.right + 2, last.top + last.height * 0.62);
      const selection = priorText.getBoundingClientRect();
      const selectionAt = local(selection.left - 4, selection.top - 2);
      place(select, selectionAt.x, selectionAt.y, selection.width + 8, selection.height + 4);

      const productHome = homeOf("product");
      const productOut = clock.strike + 480;
      const productTrack = new Track({ x: dragFrom.x + 70, y: dragFrom.y + 120 }, 0)
        .glide(dragFrom, 380, -0.14)
        .press(380)
        .line(dragTo, clock.strike - 40, "cubic-bezier(0.45, 0, 0.35, 1)")
        .release(clock.strike - 40)
        .hold(clock.strike + 80);
      if (productHome) {
        productTrack.glide(productHome.point, productOut, 0.22).shrink(productOut, productOut + 110);
        animations.push(pulse(productHome.dot, toneOf(product), productOut + 40));
      } else {
        productTrack.glide({ x: dragTo.x + 36, y: dragTo.y + 54 }, productOut + 140);
      }

      animations.push(
        productTrack.play(product),
        animateFade(product, 0, productOut),
        select.animate(
          [
            { clipPath: "inset(-4px 100% -4px -4px)", opacity: 1 },
            { clipPath: "inset(-4px -4px -4px -4px)", opacity: 1, offset: 0.62 },
            { clipPath: "inset(-4px -4px -4px -4px)", opacity: 1, offset: 0.8 },
            { clipPath: "inset(-4px -4px -4px -4px)", opacity: 0 },
          ],
          { duration: clock.strike + 160 - 420, delay: 420, easing: "linear", fill: "both" },
        ),
      );

      // platform: click into the empty headline, follow each word as it lands,
      // nudge the lede and actions onto the column edge, then fly home.
      const wordAt = (word: HTMLElement): Point => {
        const rect = word.getBoundingClientRect();
        return local(rect.right + 2, rect.bottom - 8);
      };
      const firstWord = words[0].getBoundingClientRect();
      const caret = local(firstWord.left - 2, firstWord.bottom - 8);
      const column = lede.getBoundingClientRect();
      const block = actions.getBoundingClientRect();
      const columnX = column.left - origin.left;

      const platformTrack = new Track({ x: caret.x + 180, y: caret.y + 150 }, 120)
        .glide(caret, clock.type - 60, 0.12)
        .press(clock.type - 60)
        .release(clock.type - 20);
      words.forEach((word, i) => {
        platformTrack.line(wordAt(word), clock.type + (i + 1) * WORD_STEP_MS + 30, "ease-out");
      });
      platformTrack
        .hold(settle + 40)
        .glide({ x: columnX - 2, y: block.top - origin.top + block.height / 2 }, settle + 280, -0.12)
        .hold(settle + 340);

      const platformHome = homeOf("platform");
      const platformOut = done - 180;
      if (platformHome) {
        platformTrack
          .glide(platformHome.point, platformOut, 0.18)
          .shrink(platformOut, platformOut + 110);
        animations.push(pulse(platformHome.dot, toneOf(platform), platformOut + 40));
      } else {
        platformTrack.glide({ x: columnX + 28, y: block.bottom - origin.top + 28 }, platformOut + 140);
      }
      animations.push(platformTrack.play(platform), animateFade(platform, 120, platformOut));

      // alignment guide: the lede and actions snap to the content column's edge.
      const guideTop = firstWord.top - origin.top - 12;
      place(guide, columnX - 0.5, guideTop, 1, block.bottom - origin.top + 12 - guideTop);
      animations.push(
        guide.animate(
          [
            { transform: "scaleY(0)", opacity: 1 },
            { transform: "scaleY(1)", opacity: 1, offset: 0.35 },
            { transform: "scaleY(1)", opacity: 1, offset: 0.7 },
            { transform: "scaleY(1)", opacity: 0 },
          ],
          { duration: 620, delay: settle, easing: "ease-out", fill: "both" },
        ),
      );

      // ai: switch the graph's HEAD to its own branch, then dock right there.
      const aiHome = homeOf("ai");
      if (!aiHome) return;

      const aiTrack = new Track({ x: aiHome.point.x + 150, y: aiHome.point.y - 120 }, 220)
        .glide(aiHome.point, AI_CLICK_MS - 40, 0.16)
        .press(AI_CLICK_MS - 40)
        .release(AI_CLICK_MS)
        .hold(AI_CLICK_MS + 140)
        .shrink(AI_CLICK_MS + 140, AI_CLICK_MS + 250);

      animations.push(
        aiTrack.play(ai),
        animateFade(ai, 220, AI_CLICK_MS + 140),
        pulse(aiHome.dot, toneOf(ai), AI_CLICK_MS + 180),
      );
      at(AI_CLICK_MS, () => aiHome.node.click());
    };

    const start = () => {
      if (cancelled) return;

      const clock = showCursors ? TIMELINE.cursors : TIMELINE.quiet;
      const words = root.querySelectorAll(".hero-word").length;
      const settle = clock.type + (words + 1) * WORD_STEP_MS + 60;
      const done = settle + clock.tail;

      at(clock.strike, () => onStage("strike"));
      at(clock.type, () => onStage("type"));
      at(settle, () => onStage("settle"));
      at(done, () => onStage("done"));

      if (showCursors) choreograph(clock, settle, done);
    };

    markIntroPlayed();

    // Measure after webfonts swap in, or the headline wraps differently under the cursors.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    Promise.race([
      fontsReady,
      new Promise((resolve) => window.setTimeout(resolve, FONT_WAIT_MS)),
    ]).then(start);

    const skipEvents = ["pointerdown", "keydown", "resize"] as const;
    skipEvents.forEach((name) => window.addEventListener(name, skip, { passive: true }));

    return () => {
      stop();
      skipEvents.forEach((name) => window.removeEventListener(name, skip));
    };
  }, [rootRef, onStage, showCursors]);

  if (!showCursors) return null;

  return (
    <div className="hero-swarm" aria-hidden="true">
      <div ref={selectEl} className="swarm-select" data-tone="del">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div ref={guideEl} className="swarm-guide" data-tone="add" />
      {SWARM_CURSORS.map((cursor) => (
        <SwarmCursor
          key={cursor.id}
          label={cursor.id}
          tone={cursor.tone}
          ref={(el) => {
            cursorEls.current[cursor.id] = el;
          }}
        />
      ))}
    </div>
  );
};

export default HeroSwarm;
