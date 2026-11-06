// Shared motion vocabulary for the swarm cursors (hero-swarm.tsx, swarm-engine.ts).

export type CursorId = "product" | "platform" | "ai";
export type Tone = "del" | "add" | "accent";

// Each cursor is one career.graph branch. Its colour is its identity across the page.
export const SWARM_CURSORS: { id: CursorId; tone: Tone }[] = [
  { id: "product", tone: "del" },
  { id: "platform", tone: "add" },
  { id: "ai", tone: "accent" },
];

// Cursors only appear with a real pointer and room for them; everything else
// assembles on the same beats without cursors.
export const CURSOR_QUERY = "(hover: hover) and (pointer: fine) and (min-width: 960px)";

export const PRESS_SCALE = 0.88;
export const PRESS_MS = 40;

export interface Point {
  x: number;
  y: number;
}

interface Waypoint extends Point {
  t: number;
  s: number;
  ease?: string;
}

const easeOut = (p: number) => 1 - (1 - p) ** 3;
const easeInOut = (p: number) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2);
// Mostly ease-out with a short run-up, like a hand flicking a mouse toward a target.
const handEase = (p: number) => 0.6 * easeInOut(p) + 0.4 * easeOut(p);

/**
 * Samples a gently bowed move from `from` to `to`. Offsets are uniform in time
 * and positions are eased, so linear keyframes between samples read as one
 * smooth, decelerating arc. `bend` pushes the midpoint sideways (sign = side).
 */
export function curvePoints(
  from: Point,
  to: Point,
  bend = 0.16,
  steps = 8,
): (Point & { offset: number })[] {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const cx = from.x + dx / 2 - dy * bend;
  const cy = from.y + dy / 2 + dx * bend;

  return Array.from({ length: steps + 1 }, (_, k) => {
    const offset = k / steps;
    const u = handEase(offset);
    const v = 1 - u;
    return {
      offset,
      x: v * v * from.x + 2 * v * u * cx + u * u * to.x,
      y: v * v * from.y + 2 * v * u * cy + u * u * to.y,
    };
  });
}

/** A precomputed cursor path on one timeline (ms), played as a single animation. */
export class Track {
  private readonly points: Waypoint[];

  constructor(start: Point, t: number) {
    this.points = [{ x: start.x, y: start.y, t, s: 1 }];
  }

  private get last(): Waypoint {
    return this.points[this.points.length - 1];
  }

  get end(): Point {
    return { x: this.last.x, y: this.last.y };
  }

  private push(to: Point, t: number, s: number, ease: string): this {
    this.last.ease = ease;
    this.points.push({ x: to.x, y: to.y, t: Math.max(t, this.last.t), s });
    return this;
  }

  glide(to: Point, t: number, bend = 0.16): this {
    const { t: t0, s } = this.last;
    curvePoints(this.end, to, bend)
      .slice(1)
      .forEach((p) => this.push(p, t0 + (t - t0) * p.offset, s, "linear"));
    return this;
  }

  line(to: Point, t: number, ease = "linear"): this {
    return this.push(to, t, this.last.s, ease);
  }

  hold(t: number): this {
    return this.push(this.end, t, this.last.s, "linear");
  }

  press(t: number): this {
    return this.hold(t).push(this.end, t + PRESS_MS, PRESS_SCALE, "ease-out");
  }

  release(t: number): this {
    return this.hold(t).push(this.end, t + PRESS_MS, 1, "ease-out");
  }

  /** Shrinks into the current point, e.g. docking into a graph node. */
  shrink(t0: number, t1: number): this {
    return this.hold(t0).push(this.end, t1, 0.2, "cubic-bezier(0.5, 0, 0.75, 0)");
  }

  play(el: HTMLElement): Animation {
    const t0 = this.points[0].t;
    const duration = Math.max(1, this.last.t - t0);

    return el.animate(
      this.points.map((p) => ({
        offset: (p.t - t0) / duration,
        transform: `translate(${p.x}px, ${p.y}px) scale(${p.s})`,
        easing: p.ease ?? "linear",
      })),
      { duration, delay: t0, fill: "both" },
    );
  }
}

export function animateFade(el: HTMLElement, tIn: number, tOut: number, ms = 160): Animation {
  const total = Math.max(tOut + ms - tIn, ms * 2);

  return el.animate(
    [
      { opacity: 0, offset: 0 },
      { opacity: 1, offset: ms / total },
      { opacity: 1, offset: Math.max(ms / total, (tOut - tIn) / total) },
      { opacity: 0, offset: 1 },
    ],
    { duration: total, delay: tIn, fill: "both" },
  );
}

/** A ring that pops out of `el` in the cursor's colour, e.g. when a cursor docks. */
export function pulse(el: HTMLElement, color: string, delay: number): Animation {
  return el.animate(
    [
      { transform: "scale(1)", boxShadow: `0 0 0 0 ${color}` },
      { transform: "scale(1.45)", boxShadow: `0 0 0 5px ${color}`, offset: 0.3 },
      { transform: "scale(1)", boxShadow: "0 0 0 12px transparent" },
    ],
    { duration: 560, delay, easing: "ease-out" },
  );
}

export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));
