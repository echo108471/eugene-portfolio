// The page swarm: as each `[data-build-group]` scrolls into view, a crew of
// cursors assembles it in parallel. Items inside a group are marked with `data-build`:
//
//   head | row  → a platform cursor writes it line by line; the reveal rides under it
//   block       → an ai cursor drags it into place, then snaps it with a selection box
//   chips       → an ai cursor sweeps across the children and pops each one in
//   tag         → an ai cursor stamps the first child (a version) and the rest of the
//                 row draws out; items after it in the group wait for the stamp
//   data-strike → an existing line: it is already there (with its parent, or in its
//                 turn), then a product cursor selects it and strikes it
//   data-stage  → a product cursor stages the card once everything inside it is built
//
// Each item goes to whichever cursor of the right branch can get there first, so a
// crew fans out across a section. Items still start at least CASCADE_MS apart in
// document order, across every group arriving together, so a section reads
// top-down while several cursors work it at once.
//
// Content is always in the DOM. `.swarm-build [data-build]:not([data-built])`
// hides it until its group is scheduled; each reveal is a backwards-filling
// animation, so finishing every animation is all a skip has to do.

import {
  BRANCH_TONE,
  clamp,
  curvePoints,
  PRESS_MS,
  PRESS_SCALE,
  type CrewCursor,
  type CursorId,
  type Point,
  type Tone,
} from "@/swarm-motion";

type Kind = "head" | "row" | "block" | "chips" | "tag";
type Job = "write" | "arrange" | "review";

interface Item {
  el: HTMLElement;
  kind: Kind;
  strike: boolean;
}

interface Line {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

// Everything an item's beat needs, measured before any block in the group is
// lifted, so rows inside a dragged card aren't targeted at its lifted position.
interface Measure {
  box: DOMRect;
  lines: Line[];
  kids: { el: HTMLElement; rect: DOMRect }[];
}

interface Span {
  start: number;
  end: number;
}

interface Stamp {
  t: number;
  clip: string;
  easing?: string;
}

const KINDS: readonly Kind[] = ["head", "row", "block", "chips", "tag"];
const JOB_BRANCH: Record<Job, CursorId> = { write: "platform", arrange: "ai", review: "product" };

const IDLE_MS = 1000;
// Last-resort cap: a new scroll batch flushes everything once the cursors are
// this far behind. Work that has scrolled out of view is flushed regardless.
const MAX_LAG_MS = 4000;
const BACKLOG_MS = 1200;
const MAX_PACE = 3;
const SPAWN_LEAD_MS = 160;
// A hidden cursor has to fade in first, so a visible one nearby wins a close call.
const SPAWN_PENALTY_MS = 90;
// The sticky header covers the top of the viewport; work hidden under it isn't seen.
const TOP_INSET_PX = 64;
// Minimum gap between item starts, in document order, while work is queued.
const CASCADE_MS = 120;
// An idle cursor drifts this far off what it touched, so its label doesn't sit on the content.
const REST_PX = 34;
const DRAG_MS = 280;
const RETURN_MS = 70;
const STRIKE_DELAY_MS = 140;
const STAGE_MS = 1200;
const QUIET_STEP_MS = 60;
const WRITE_EASE = "cubic-bezier(0.4, 0.1, 0.6, 0.9)";
const DROP_EASE = "cubic-bezier(0.3, 0.7, 0.3, 1)";
const POP_EASE = "cubic-bezier(0.34, 1.56, 0.64, 1)";

const now = () => performance.now();
const px = (p: Point) => `${p.x}px ${p.y}px`;
const delayUntil = (at: number) => Math.max(0, at - now());

function byDocumentOrder(a: Element, b: Element) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}

class EngineCursor {
  pos: Point = { x: 0, y: 0 };
  free = 0;
  readonly tone: Tone;
  private visible = false;
  private hideTimer = 0;
  private showTimer = 0;
  private readonly spawn: Point;
  private readonly bend: number;
  private rested = true;

  constructor(
    readonly crew: CrewCursor,
    readonly el: HTMLElement,
    index: number,
  ) {
    this.tone = BRANCH_TONE[crew.branch];
    // Spread spawn points around the target (golden-angle steps), so a crew
    // arrives from different sides instead of stacking on one approach.
    const angle = 0.6 + index * 2.4;
    this.spawn = { x: Math.cos(angle) * 140, y: Math.sin(angle) * 100 };
    this.bend = (index % 2 ? -1 : 1) * (0.12 + (index % 3) * 0.03);
  }

  /** How much faster to play while this cursor's queue is long, so a backlog speeds up instead of stalling. */
  speed(): number {
    return 1 + clamp((this.free - now()) / BACKLOG_MS, 0, MAX_PACE - 1);
  }

  /** When this cursor could reach `to`, setting off no earlier than `ready`. Used to pick a cursor. */
  eta(to: Point, ready: number, notBefore: number): number {
    const leave = Math.max(ready, this.free, now());
    const penalty = this.visible ? 0 : SPAWN_PENALTY_MS;
    return Math.max(leave + this.travel(to), notBefore) + penalty;
  }

  /** Gets the cursor to `to`, setting off no earlier than `ready` and arriving no earlier than `notBefore`. */
  arrive(to: Point, ready: number, notBefore = 0): number {
    window.clearTimeout(this.hideTimer);
    this.rested = false;
    const leave = Math.max(ready, this.free, now(), notBefore - this.travel(to));

    if (!this.visible) {
      this.jump({ x: to.x + this.spawn.x, y: to.y + this.spawn.y });
      this.visible = true;
      // A cursor whose turn is still a while off stays out of sight until just before it.
      this.showTimer = window.setTimeout(
        () => this.el.classList.add("is-visible"),
        Math.max(0, delayUntil(leave) - SPAWN_LEAD_MS),
      );
    }

    return this.glide(to, leave);
  }

  glide(to: Point, at: number): number {
    const start = Math.max(at, this.free);
    const distance = Math.hypot(to.x - this.pos.x, to.y - this.pos.y);
    if (distance < 1) return start;

    const duration = this.flight(distance);
    const frames = curvePoints(this.pos, to, this.bend).map((p) => ({
      offset: p.offset,
      translate: px(p),
    }));
    this.play(frames, start, duration, "linear");
    this.pos = to;
    this.free = start + duration;
    return this.free;
  }

  line(to: Point, at: number, duration: number, easing = "linear"): number {
    this.play([{ translate: px(this.pos) }, { translate: px(to) }], at, duration, easing);
    this.pos = to;
    this.free = Math.max(this.free, at + duration);
    return at + duration;
  }

  press(at: number): number {
    this.play([{ scale: "1" }, { scale: `${PRESS_SCALE}` }], at, PRESS_MS, "ease-out");
    this.free = Math.max(this.free, at + PRESS_MS);
    return at + PRESS_MS;
  }

  release(at: number): number {
    this.play([{ scale: `${PRESS_SCALE}` }, { scale: "1" }], at, PRESS_MS, "ease-out");
    this.free = Math.max(this.free, at + PRESS_MS);
    return at + PRESS_MS;
  }

  /** Once its queue runs out, drifts off its last spot, then fades if nothing else comes in. */
  idle(): void {
    window.clearTimeout(this.hideTimer);
    if (this.visible && !this.rested) {
      this.rested = true;
      const reach = Math.hypot(this.spawn.x, this.spawn.y) || 1;
      const drift = {
        x: this.pos.x + (this.spawn.x / reach) * REST_PX,
        y: this.pos.y + (this.spawn.y / reach) * REST_PX,
      };
      this.line(drift, this.free + 60, 260, "cubic-bezier(0.2, 0.6, 0.35, 1)");
    }
    this.hideTimer = window.setTimeout(() => this.hide(), delayUntil(this.free) + IDLE_MS);
  }

  halt(): void {
    this.el.getAnimations().forEach((animation) => animation.cancel());
    this.hide();
    this.free = 0;
  }

  private travel(to: Point): number {
    const from = this.visible ? this.pos : { x: to.x + this.spawn.x, y: to.y + this.spawn.y };
    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    return distance < 1 ? 0 : this.flight(distance);
  }

  private flight(distance: number): number {
    return clamp(distance * 0.55, 160, 520) / this.speed();
  }

  private hide(): void {
    window.clearTimeout(this.hideTimer);
    window.clearTimeout(this.showTimer);
    this.visible = false;
    this.el.classList.remove("is-visible");
  }

  private jump(to: Point): void {
    this.el.getAnimations().forEach((animation) => animation.cancel());
    this.pos = to;
    this.el.style.translate = px(to);
    this.el.style.scale = "1";
  }

  private play(frames: Keyframe[], at: number, duration: number, easing: string): void {
    this.el.animate(frames, { duration, delay: delayUntil(at), easing, fill: "forwards" });
  }
}

export class SwarmEngine {
  private readonly cursors: EngineCursor[];
  private readonly crews: Record<Job, EngineCursor[]>;
  // Every job needs at least one cursor; otherwise the page assembles quietly.
  private readonly animated: boolean;
  private readonly pending = new Set<HTMLElement>();
  // Groups with work in flight, and when that work ends.
  private readonly building = new Map<HTMLElement, number>();
  private readonly timers = new Map<number, () => void>();
  private reveals: Animation[] = [];
  private observer: IntersectionObserver | null = null;
  private origin: Point = { x: 0, y: 0 };
  // The latest item start, shared across groups, for the cascade.
  private cue = -Infinity;
  private frame = 0;
  private started = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly overlay: HTMLElement,
    crew: (CrewCursor & { el: HTMLElement })[],
  ) {
    this.cursors = crew.map((cursor, index) => new EngineCursor(cursor, cursor.el, index));
    const of = (job: Job) => this.cursors.filter((cursor) => cursor.crew.branch === JOB_BRANCH[job]);
    this.crews = { write: of("write"), arrange: of("arrange"), review: of("review") };
    this.animated = Object.values(this.crews).every((pool) => pool.length > 0);
  }

  start(): void {
    if (this.started) return;
    this.started = true;

    const groups = Array.from(
      this.root.querySelectorAll<HTMLElement>("[data-build-group]:not([data-build-state])"),
    );
    groups.forEach((group) => this.pending.add(group));

    // Build between the header and a little above the fold, where groups are read.
    this.observer = new IntersectionObserver(this.onIntersect, {
      rootMargin: `-${TOP_INSET_PX}px 0px -10% 0px`,
    });
    groups.forEach((group) => this.observer?.observe(group));

    window.addEventListener("pointerdown", this.flush, { passive: true });
    window.addEventListener("keydown", this.flush);
    window.addEventListener("scroll", this.onScroll, { passive: true });
    document.addEventListener("focusin", this.onFocus);
  }

  stop(): void {
    this.observer?.disconnect();
    window.removeEventListener("pointerdown", this.flush);
    window.removeEventListener("keydown", this.flush);
    window.removeEventListener("scroll", this.onScroll);
    document.removeEventListener("focusin", this.onFocus);
    window.cancelAnimationFrame(this.frame);
    this.flush();
  }

  /** Finishes everything in flight: every scheduled reveal lands at once. */
  readonly flush = (): void => {
    this.timers.forEach((fn, id) => {
      window.clearTimeout(id);
      fn();
    });
    this.timers.clear();
    this.reveals.forEach((animation) => {
      try {
        animation.finish();
      } catch {
        // Already cancelled; nothing to land.
      }
    });
    this.reveals = [];
    this.building.clear();
    this.cue = -Infinity;
    this.cursors.forEach((cursor) => cursor.halt());
  };

  private readonly onIntersect = (entries: IntersectionObserverEntry[]) => {
    const batch = entries
      .filter((entry) => this.pending.has(entry.target as HTMLElement))
      .sort((a, b) => byDocumentOrder(a.target, b.target));

    // Groups that arrive together queue up together. A later batch cuts earlier
    // work short only once the visitor has moved past it: it is far behind, or
    // a group still being built has left the viewport.
    if (this.animated && batch.some((entry) => entry.isIntersecting)) {
      const t = now();
      this.building.forEach((end, group) => {
        if (end <= t) this.building.delete(group);
      });
      const offscreen = Array.from(this.building.keys()).some((group) => {
        const rect = group.getBoundingClientRect();
        return rect.bottom < TOP_INSET_PX || rect.top > window.innerHeight;
      });
      const behind = this.cursors.some((cursor) => cursor.free - t > MAX_LAG_MS);
      if (offscreen || behind) this.flush();
    }

    batch.forEach((entry) => {
      const group = entry.target as HTMLElement;
      if (entry.isIntersecting) this.build(group);
      else if (entry.boundingClientRect.bottom < TOP_INSET_PX) this.reveal(group);
    });
  };

  // A fast jump can carry a group past the viewport without it ever intersecting.
  private readonly onScroll = () => {
    if (this.frame) return;
    this.frame = window.requestAnimationFrame(() => {
      this.frame = 0;
      this.pending.forEach((group) => {
        if (group.getBoundingClientRect().bottom < TOP_INSET_PX) this.reveal(group);
      });
    });
  };

  private readonly onFocus = (event: FocusEvent) => {
    if (!(event.target instanceof Element)) return;
    const group = event.target.closest<HTMLElement>("[data-build-group]");
    if (group && this.pending.has(group)) this.reveal(group);
  };

  private claim(group: HTMLElement, state: "building" | "built"): Item[] {
    this.pending.delete(group);
    this.observer?.unobserve(group);
    group.dataset.buildState = state;

    return [group, ...Array.from(group.querySelectorAll<HTMLElement>("[data-build]"))]
      .filter((el) => el.hasAttribute("data-build") && el.closest("[data-build-group]") === group)
      .map((el) => ({
        el,
        kind: KINDS.includes(el.dataset.build as Kind) ? (el.dataset.build as Kind) : "row",
        strike: el.hasAttribute("data-strike"),
      }));
  }

  /** Shows a group immediately, with no cursors. */
  private reveal(group: HTMLElement): void {
    this.claim(group, "built").forEach((item) => {
      item.el.setAttribute("data-built", "");
      if (item.strike) item.el.setAttribute("data-struck", "");
    });
  }

  private build(group: HTMLElement): void {
    this.reveals = this.reveals.filter((animation) => animation.playState !== "finished");

    const items = this.claim(group, "building");
    items.forEach((item) => item.el.setAttribute("data-built", ""));
    if (!this.animated) {
      this.buildQuiet(items);
      return;
    }

    const overlayBox = this.overlay.getBoundingClientRect();
    this.origin = { x: overlayBox.left, y: overlayBox.top };
    const stageEl = group.matches("[data-stage]")
      ? group
      : group.querySelector<HTMLElement>("[data-stage]");
    const measures = new Map(items.map((item) => [item.el, this.measure(item)]));
    const stageBox = stageEl?.getBoundingClientRect();

    const start = now();
    const spans = new Map<HTMLElement, Span>();
    // A tag holds back everything after it in its group.
    let gate = start;
    let cue = this.cue;
    let end = start;

    items.forEach((item) => {
      const m = measures.get(item.el)!;
      const parent = this.parentSpan(item.el, group, spans);
      const ready = parent ? parent.end : gate;

      if (item.strike) {
        let shown = parent?.start;
        if (shown === undefined) {
          shown = Math.max(ready, cue + CASCADE_MS);
          cue = shown;
          this.animate(item.el, [{ opacity: 0 }, { opacity: 1 }], shown, 220, "ease-out");
        }
        const struck = this.strike(item.el, m, Math.max(ready, shown) + STRIKE_DELAY_MS);
        spans.set(item.el, { start: shown, end: struck });
        end = Math.max(end, struck);
        return;
      }

      const notBefore = cue + CASCADE_MS;
      const span =
        item.kind === "block"
          ? this.place(item.el, m, ready, notBefore)
          : item.kind === "chips"
            ? this.sweep(m, ready, notBefore)
            : item.kind === "tag"
              ? this.tag(m, ready, notBefore)
              : this.write(item.el, m, ready, notBefore);
      spans.set(item.el, span);
      cue = Math.max(cue, span.start);
      if (item.kind === "tag") gate = Math.max(gate, span.end);
      end = Math.max(end, span.end);
    });

    if (stageEl && stageBox) end = Math.max(end, this.stage(stageEl, stageBox, end));

    this.cue = cue;
    this.building.set(group, end);
    this.cursors.forEach((cursor) => cursor.idle());
  }

  private parentSpan(el: HTMLElement, group: HTMLElement, spans: Map<HTMLElement, Span>) {
    for (let parent = el.parentElement; parent; parent = parent.parentElement) {
      const span = spans.get(parent);
      if (span) return span;
      if (parent === group) break;
    }
    return undefined;
  }

  private measure(item: Item): Measure {
    const { el, kind } = item;
    const box = el.getBoundingClientRect();
    const textOf = item.strike ? (el.querySelector<HTMLElement>(".content") ?? el) : el;
    const writes = item.strike || kind === "head" || kind === "row";
    const kids =
      kind === "chips" || kind === "tag"
        ? (Array.from(el.children) as HTMLElement[]).map((kid) => ({
            el: kid,
            rect: kid.getBoundingClientRect(),
          }))
        : [];
    return { box, lines: writes ? this.lines(textOf) : [], kids };
  }

  private buildQuiet(items: Item[]): void {
    const start = now();
    items.forEach((item, index) => {
      const at = start + index * QUIET_STEP_MS;
      const targets = item.kind === "chips" ? (Array.from(item.el.children) as HTMLElement[]) : [item.el];

      targets.forEach((target, k) => {
        this.animate(
          target,
          [
            { opacity: 0, translate: "0px 8px" },
            { opacity: 1, translate: "0px 0px" },
          ],
          at + k * 24,
          320,
          DROP_EASE,
        );
      });
      if (item.strike) this.later(at + 380, () => item.el.setAttribute("data-struck", ""));
    });
  }

  private local(x: number, y: number): Point {
    return { x: x - this.origin.x, y: y - this.origin.y };
  }

  /** The crew member that can start soonest; on a tie, the least busy, so work spreads across the crew. */
  private pick(job: Job, to: Point, ready: number, notBefore = 0): EngineCursor {
    let best = this.crews[job][0];
    let bestAt = Infinity;
    this.crews[job].forEach((cursor) => {
      const at = cursor.eta(to, ready, notBefore);
      if (at < bestAt - 1 || (at <= bestAt + 1 && cursor.free < best.free)) {
        best = cursor;
        bestAt = Math.min(at, bestAt);
      }
    });
    return best;
  }

  /** platform writes a row line by line: the reveal's edge rides under the cursor, then it returns for the next line. */
  private write(el: HTMLElement, m: Measure, ready: number, notBefore: number): Span {
    const { box, lines } = m;
    const caret = (line: Line, x: number) => this.local(x, line.top + (line.bottom - line.top) * 0.7);
    const first = caret(lines[0], lines[0].left - 2);
    const cursor = this.pick("write", first, ready, notBefore);
    const speed = cursor.speed();
    const t0 = cursor.arrive(first, ready, notBefore);

    // Each line owns a horizontal band of the element; the clip reveals every band
    // above the current line, plus the current band up to the cursor.
    const right = box.width + 6;
    const bands = lines.map((line, k) => ({
      top: k === 0 ? -6 : (lines[k - 1].bottom + line.top) / 2 - box.top,
      bottom: k === lines.length - 1 ? box.height + 6 : (line.bottom + lines[k + 1].top) / 2 - box.top,
    }));
    const shape = (k: number, x: number) => {
      const { top, bottom } = bands[k];
      return `polygon(-6px -6px, ${right}px -6px, ${right}px ${top}px, ${x}px ${top}px, ${x}px ${bottom}px, -6px ${bottom}px)`;
    };

    const stamps: Stamp[] = [{ t: t0, clip: shape(0, -6) }];
    let t = t0;
    lines.forEach((line, k) => {
      if (k > 0) {
        stamps.push({ t, clip: shape(k, -6) });
        t = cursor.line(caret(line, line.left - 2), t, RETURN_MS / speed, "ease-in-out");
        stamps.push({ t, clip: shape(k, -6) });
      }
      stamps.push({ t, clip: shape(k, line.left - box.left - 2), easing: WRITE_EASE });
      const sweep = clamp((line.right - line.left) * 0.5, 120, 380) / speed;
      t = cursor.line(caret(line, line.right + 2), t, sweep, WRITE_EASE);
      stamps.push({ t, clip: shape(k, line.right - box.left + 2) });
    });
    stamps.push({ t, clip: shape(lines.length - 1, right) });

    this.animateStamps(el, stamps);
    return { start: t0, end: t };
  }

  /** ai picks a block up just off its slot, drags it in, and snaps it. */
  private place(el: HTMLElement, m: Measure, ready: number, notBefore: number): Span {
    const { box } = m;
    const corner = this.local(box.left, box.top);
    const grip = { x: corner.x + 18, y: corner.y + 16 };
    const lift = { x: -28, y: 22 };
    const pickup = { x: grip.x + lift.x, y: grip.y + lift.y };
    const cursor = this.pick("arrange", pickup, ready, notBefore);
    const drag = DRAG_MS / cursor.speed();
    const t0 = cursor.arrive(pickup, ready, notBefore);
    const down = cursor.press(t0);
    const drop = cursor.line(grip, down, drag, DROP_EASE);
    cursor.release(drop);

    this.animate(
      el,
      [
        { opacity: 0, translate: px(lift) },
        { opacity: 0.55, translate: px(lift), offset: PRESS_MS / (PRESS_MS + drag), easing: DROP_EASE },
        { opacity: 1, translate: "0px 0px" },
      ],
      t0,
      PRESS_MS + drag,
      "linear",
    );
    this.flashSelect(corner, box.width, box.height, cursor.tone, drop, 480);
    this.flashGuide(corner.x, corner.y - 20, box.height + 40, cursor.tone, drop);
    return { start: t0, end: drop };
  }

  /** ai sweeps across a row of chips and each one pops in as it passes. */
  private sweep(m: Measure, ready: number, notBefore: number): Span {
    const { kids } = m;
    if (kids.length === 0) return { start: ready, end: ready };

    const spot = (rect: DOMRect) => this.local(rect.left + rect.width * 0.5, rect.top + rect.height * 0.72);
    const cursor = this.pick("arrange", spot(kids[0].rect), ready, notBefore);
    const step = clamp(420 / kids.length, 30, 70) / cursor.speed();
    const t0 = cursor.arrive(spot(kids[0].rect), ready, notBefore);

    kids.forEach((kid, i) => {
      const at = t0 + i * step;
      if (i > 0) cursor.line(spot(kid.rect), at - step, step, "ease-in-out");
      this.animate(
        kid.el,
        [
          { opacity: 0, scale: "0.7" },
          { opacity: 1, scale: "1" },
        ],
        at,
        240,
        POP_EASE,
      );
    });
    return { start: t0, end: t0 + kids.length * step };
  }

  /** ai tags a release: clicks the version in, then the rest of the row draws out after it. */
  private tag(m: Measure, ready: number, notBefore: number): Span {
    const [stamp, ...rest] = m.kids;
    if (!stamp) return { start: ready, end: ready };

    const { rect } = stamp;
    const spot = this.local(rect.left + rect.width * 0.6, rect.top + rect.height * 0.8);
    const cursor = this.pick("arrange", spot, ready, notBefore);
    const t0 = cursor.arrive(spot, ready, notBefore);
    const down = cursor.press(t0);
    cursor.release(down + 60);

    this.animate(
      stamp.el,
      [
        { opacity: 0, scale: "0.6" },
        { opacity: 1, scale: "1.14", offset: 0.55 },
        { opacity: 1, scale: "1" },
      ],
      down,
      300,
      "ease-out",
    );
    this.flashSelect(
      this.local(rect.left - 5, rect.top - 3),
      rect.width + 10,
      rect.height + 6,
      cursor.tone,
      down,
      560,
    );
    rest.forEach((kid, i) => {
      this.animate(
        kid.el,
        [{ clipPath: "inset(-2px 100% -2px -2px)" }, { clipPath: "inset(-2px -2px -2px -2px)" }],
        down + 90 + i * 70,
        360,
        WRITE_EASE,
      );
    });
    return { start: t0, end: down + 160 };
  }

  /** product selects an existing line and strikes it on release. */
  private strike(el: HTMLElement, m: Measure, ready: number): number {
    const lines = m.lines;
    const first = lines[0];
    const last = lines[lines.length - 1];
    const left = Math.min(...lines.map((line) => line.left));
    const right = Math.max(...lines.map((line) => line.right));
    const from = this.local(first.left - 2, first.top + (first.bottom - first.top) * 0.7);
    const to = this.local(last.right + 2, last.top + (last.bottom - last.top) * 0.7);

    const cursor = this.pick("review", from, ready);
    const drag = clamp((right - left) * 0.5, 180, 320) / cursor.speed();
    const t0 = cursor.arrive(from, ready);
    const down = cursor.press(t0);
    const up = cursor.line(to, down, drag, "cubic-bezier(0.45, 0, 0.35, 1)");
    cursor.release(up);

    this.flashSelect(
      this.local(left - 4, first.top - 2),
      right - left + 8,
      last.bottom - first.top + 4,
      cursor.tone,
      down,
      drag + 260,
      true,
    );
    this.later(up, () => el.setAttribute("data-struck", ""));
    return up + PRESS_MS;
  }

  /** product stages a finished card the way a hover would. */
  private stage(el: HTMLElement, box: DOMRect, ready: number): number {
    const spot = this.local(box.left + 34, box.top + 22);
    const cursor = this.pick("review", spot, ready + 120);
    const t0 = cursor.arrive(spot, ready + 120);
    const down = cursor.press(t0);
    const up = cursor.release(down + 60);
    cursor.glide({ x: spot.x + 46, y: spot.y + 56 }, up + 40);

    this.later(down, () => el.classList.add("is-staged"));
    this.later(down + STAGE_MS, () => el.classList.remove("is-staged"));
    return down + STAGE_MS;
  }

  /** The element's text, grouped into visual lines (viewport coordinates). */
  private lines(el: HTMLElement): Line[] {
    const rects: DOMRect[] = [];
    const range = document.createRange();
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      if (!node.textContent?.trim()) continue;
      range.selectNodeContents(node);
      rects.push(...Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0));
    }

    const lines: Line[] = [];
    rects
      .sort((a, b) => a.top - b.top)
      .forEach((r) => {
        const line = lines.find(
          (l) =>
            Math.min(l.bottom, r.bottom) - Math.max(l.top, r.top) >
            Math.min(l.bottom - l.top, r.height) * 0.5,
        );
        if (!line) {
          lines.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom });
          return;
        }
        line.left = Math.min(line.left, r.left);
        line.right = Math.max(line.right, r.right);
        line.top = Math.min(line.top, r.top);
        line.bottom = Math.max(line.bottom, r.bottom);
      });

    if (lines.length === 0) {
      const box = el.getBoundingClientRect();
      return [{ left: box.left, right: box.right, top: box.top, bottom: box.bottom }];
    }
    return lines.sort((a, b) => a.top - b.top);
  }

  private flashSelect(
    at: Point,
    width: number,
    height: number,
    tone: Tone,
    from: number,
    duration: number,
    sweep = false,
  ): void {
    const box = document.createElement("div");
    box.className = "swarm-select";
    box.dataset.tone = tone;
    box.append(...Array.from({ length: 4 }, () => document.createElement("i")));
    Object.assign(box.style, {
      left: `${at.x}px`,
      top: `${at.y}px`,
      width: `${width}px`,
      height: `${height}px`,
    });
    this.overlay.append(box);

    const shown = "inset(-4px -4px -4px -4px)";
    const frames: Keyframe[] = sweep
      ? [
          { clipPath: "inset(-4px 100% -4px -4px)", opacity: 1 },
          { clipPath: shown, opacity: 1, offset: 0.6 },
          { clipPath: shown, opacity: 1, offset: 0.8 },
          { clipPath: shown, opacity: 0 },
        ]
      : [
          { opacity: 0 },
          { opacity: 1, offset: 0.12 },
          { opacity: 1, offset: 0.65 },
          { opacity: 0 },
        ];
    this.overlayAnimation(box, frames, from, duration, "linear");
  }

  private flashGuide(x: number, y: number, height: number, tone: Tone, from: number): void {
    const guide = document.createElement("div");
    guide.className = "swarm-guide";
    guide.dataset.tone = tone;
    Object.assign(guide.style, { left: `${x - 0.5}px`, top: `${y}px`, height: `${height}px` });
    this.overlay.append(guide);

    this.overlayAnimation(
      guide,
      [
        { transform: "scaleY(0)", opacity: 1 },
        { transform: "scaleY(1)", opacity: 1, offset: 0.35 },
        { transform: "scaleY(1)", opacity: 1, offset: 0.7 },
        { transform: "scaleY(1)", opacity: 0 },
      ],
      from,
      560,
      "ease-out",
    );
  }

  /** Transient overlay pieces remove themselves however their animation ends. */
  private overlayAnimation(
    el: HTMLElement,
    frames: Keyframe[],
    at: number,
    duration: number,
    easing: string,
  ): void {
    const animation = el.animate(frames, { duration, delay: delayUntil(at), easing, fill: "both" });
    const remove = () => el.remove();
    animation.addEventListener("finish", remove);
    animation.addEventListener("cancel", remove);
    this.reveals.push(animation);
  }

  /** Plays clip-path stamps laid out on absolute time as one reveal. Equal times make a step. */
  private animateStamps(el: HTMLElement, stamps: Stamp[]): void {
    const t0 = stamps[0].t;
    const duration = Math.max(1, stamps[stamps.length - 1].t - t0);
    const frames = stamps.map((stamp) => ({
      clipPath: stamp.clip,
      offset: clamp((stamp.t - t0) / duration, 0, 1),
      easing: stamp.easing ?? "linear",
    }));
    this.animate(el, frames, t0, duration, "linear");
  }

  private animate(
    el: HTMLElement,
    frames: Keyframe[],
    at: number,
    duration: number,
    easing: string,
  ): void {
    this.reveals.push(
      el.animate(frames, { duration, delay: delayUntil(at), easing, fill: "backwards" }),
    );
  }

  private later(at: number, fn: () => void): void {
    const id = window.setTimeout(() => {
      this.timers.delete(id);
      fn();
    }, delayUntil(at));
    this.timers.set(id, fn);
  }
}
