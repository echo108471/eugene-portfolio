// The page swarm: as each `[data-build-group]` scrolls into view, the three
// cursors assemble it. Items inside a group are marked with `data-build`:
//
//   head | row  → platform writes it (a wipe that follows the cursor)
//   block       → ai drags it into place, then snaps it with a selection box
//   chips       → ai sweeps across the children and pops each one in
//   data-strike → product drags across the written row and strikes it
//   data-stage  → product stages the card once everything inside it is built
//
// Content is always in the DOM. `.swarm-build [data-build]:not([data-built])`
// hides it until its group is scheduled; each reveal is a backwards-filling
// animation, so finishing every animation is all a skip has to do.

import {
  clamp,
  curvePoints,
  PRESS_MS,
  PRESS_SCALE,
  type CursorId,
  type Point,
  type Tone,
} from "@/swarm-motion";

type Kind = "head" | "row" | "block" | "chips";

interface Item {
  el: HTMLElement;
  kind: Kind;
  strike: boolean;
}

interface TextExtent {
  box: DOMRect;
  left: number;
  right: number;
  top: number;
  bottom: number;
  start: Point;
  end: Point;
}

const KINDS: readonly Kind[] = ["head", "row", "block", "chips"];
const SPAWN_OFFSET: Record<CursorId, Point> = {
  platform: { x: -80, y: 90 },
  ai: { x: 140, y: -60 },
  product: { x: 100, y: 110 },
};
const BEND: Record<CursorId, number> = { platform: 0.14, ai: -0.16, product: 0.18 };
const TONE: Record<CursorId, Tone> = { platform: "add", ai: "accent", product: "del" };

const IDLE_MS = 900;
// Last-resort cap: a new scroll batch flushes everything once the cursors are
// this far behind. Work that has scrolled out of view is flushed regardless.
const MAX_LAG_MS = 4000;
const BACKLOG_MS = 1200;
const MAX_PACE = 3;
const SPAWN_LEAD_MS = 160;
// The sticky header covers the top of the viewport; work hidden under it isn't seen.
const TOP_INSET_PX = 64;
const DRAG_MS = 280;
const STAGE_MS = 1200;
const QUIET_STEP_MS = 60;
const WRITE_EASE = "cubic-bezier(0.4, 0.1, 0.6, 0.9)";
const DROP_EASE = "cubic-bezier(0.3, 0.7, 0.3, 1)";

const now = () => performance.now();
const px = (p: Point) => `${p.x}px ${p.y}px`;
const delayUntil = (at: number) => Math.max(0, at - now());

function byDocumentOrder(a: Element, b: Element) {
  return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
}

class EngineCursor {
  pos: Point = { x: 0, y: 0 };
  free = 0;
  private visible = false;
  private hideTimer = 0;
  private showTimer = 0;

  constructor(
    readonly id: CursorId,
    readonly el: HTMLElement,
  ) {}

  /** Gets the cursor to `to` no earlier than `at`; spawns nearby if it was hidden. */
  arrive(to: Point, at: number): number {
    window.clearTimeout(this.hideTimer);
    const start = Math.max(at, this.free, now());

    if (!this.visible) {
      const offset = SPAWN_OFFSET[this.id];
      this.jump({ x: to.x + offset.x, y: to.y + offset.y });
      this.visible = true;
      // A cursor whose turn is still a while off stays out of sight until just before it.
      this.showTimer = window.setTimeout(
        () => this.el.classList.add("is-visible"),
        Math.max(0, delayUntil(start) - SPAWN_LEAD_MS),
      );
    }

    return this.glide(to, start);
  }

  /** Scales a duration down as this cursor's queue grows, so a backlog speeds up instead of stalling. */
  paced(ms: number): number {
    return ms / (1 + clamp((this.free - now()) / BACKLOG_MS, 0, MAX_PACE - 1));
  }

  glide(to: Point, at: number): number {
    const start = Math.max(at, this.free);
    const distance = Math.hypot(to.x - this.pos.x, to.y - this.pos.y);
    if (distance < 1) return start;

    const duration = this.paced(clamp(distance * 0.55, 160, 520));
    const frames = curvePoints(this.pos, to, BEND[this.id]).map((p) => ({
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

  /** Fades out once the cursor has had nothing to do for a moment. */
  idle(): void {
    window.clearTimeout(this.hideTimer);
    this.hideTimer = window.setTimeout(() => this.hide(), delayUntil(this.free) + IDLE_MS);
  }

  halt(): void {
    this.el.getAnimations().forEach((animation) => animation.cancel());
    this.hide();
    this.free = 0;
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
  private readonly cursors: Record<CursorId, EngineCursor> | null;
  private readonly pending = new Set<HTMLElement>();
  // Groups with work in flight, and when that work ends.
  private readonly building = new Map<HTMLElement, number>();
  private readonly timers = new Map<number, () => void>();
  private reveals: Animation[] = [];
  private observer: IntersectionObserver | null = null;
  private frame = 0;
  private started = false;

  constructor(
    private readonly root: HTMLElement,
    private readonly overlay: HTMLElement,
    cursorEls: Partial<Record<CursorId, HTMLElement | null>> | null,
  ) {
    const { product, platform, ai } = cursorEls ?? {};
    this.cursors =
      product && platform && ai
        ? {
            product: new EngineCursor("product", product),
            platform: new EngineCursor("platform", platform),
            ai: new EngineCursor("ai", ai),
          }
        : null;
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
    if (this.cursors) Object.values(this.cursors).forEach((cursor) => cursor.halt());
  };

  private readonly onIntersect = (entries: IntersectionObserverEntry[]) => {
    const batch = entries
      .filter((entry) => this.pending.has(entry.target as HTMLElement))
      .sort((a, b) => byDocumentOrder(a.target, b.target));

    // Groups that arrive together queue up together. A later batch cuts earlier
    // work short only once the visitor has moved past it: it is far behind, or
    // a group still being built has left the viewport.
    const cursors = this.cursors;
    if (cursors && batch.some((entry) => entry.isIntersecting)) {
      const t = now();
      this.building.forEach((end, group) => {
        if (end <= t) this.building.delete(group);
      });
      const offscreen = Array.from(this.building.keys()).some((group) => {
        const rect = group.getBoundingClientRect();
        return rect.bottom < TOP_INSET_PX || rect.top > window.innerHeight;
      });
      const behind = Object.values(cursors).some((cursor) => cursor.free - t > MAX_LAG_MS);
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

    const cursors = this.cursors;
    const items = this.claim(group, "building");
    items.forEach((item) => item.el.setAttribute("data-built", ""));
    if (!cursors) {
      this.buildQuiet(items);
      return;
    }

    const origin = this.overlay.getBoundingClientRect();
    const local = (x: number, y: number): Point => ({ x: x - origin.left, y: y - origin.top });
    const start = now();
    const doneAt = new Map<HTMLElement, number>();

    items.forEach((item) => {
      let ready = start;
      for (let parent = item.el.parentElement; parent; parent = parent.parentElement) {
        const parentDone = doneAt.get(parent);
        if (parentDone !== undefined) {
          ready = parentDone;
          break;
        }
        if (parent === group) break;
      }

      const end =
        item.kind === "block"
          ? this.place(cursors.ai, item.el, ready, local)
          : item.kind === "chips"
            ? this.sweep(cursors.ai, item.el, ready, local)
            : this.write(cursors.platform, item.el, ready, local);
      doneAt.set(item.el, end);

      if (item.strike) this.strike(cursors.product, item.el, end, local);
    });

    const stage = group.matches("[data-stage]") ? group : group.querySelector<HTMLElement>("[data-stage]");
    if (stage) this.stage(cursors.product, stage, Math.max(start, ...doneAt.values()), local);

    this.building.set(group, Math.max(start, ...Object.values(cursors).map((cursor) => cursor.free)));
    Object.values(cursors).forEach((cursor) => cursor.idle());
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

  /** platform writes a line: the wipe's edge rides under the cursor. */
  private write(cursor: EngineCursor, el: HTMLElement, ready: number, local: LocalFn): number {
    const text = this.extent(el, local);
    const t0 = cursor.arrive(text.start, ready);
    const sweep = cursor.paced(clamp((text.right - text.left) * 0.7, 160, 460));
    const duration = sweep / 0.86;
    cursor.line(text.end, t0, sweep, WRITE_EASE);

    const hideFrom = text.box.right - text.left;
    const hideTo = Math.max(0, text.box.right - text.right);
    this.animate(
      el,
      [
        { clipPath: `inset(-6px ${hideFrom}px -6px -6px)`, easing: WRITE_EASE },
        { clipPath: `inset(-6px ${hideTo}px -6px -6px)`, offset: 0.86 },
        { clipPath: "inset(-6px -6px -6px -6px)" },
      ],
      t0,
      duration,
      "linear",
    );
    return t0 + sweep;
  }

  /** ai picks a block up just off its slot, drags it in, and snaps it. */
  private place(cursor: EngineCursor, el: HTMLElement, ready: number, local: LocalFn): number {
    const box = el.getBoundingClientRect();
    const corner = local(box.left, box.top);
    const grip = { x: corner.x + 18, y: corner.y + 16 };
    const lift = { x: -28, y: 22 };
    const t0 = cursor.arrive({ x: grip.x + lift.x, y: grip.y + lift.y }, ready);
    const drag = cursor.paced(DRAG_MS);
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
    this.flashSelect(corner, box.width, box.height, TONE[cursor.id], drop, 480);
    this.flashGuide(corner.x, corner.y - 20, box.height + 40, TONE[cursor.id], drop);
    return drop;
  }

  /** ai sweeps across a row of chips and each one pops in as it passes. */
  private sweep(cursor: EngineCursor, el: HTMLElement, ready: number, local: LocalFn): number {
    const kids = Array.from(el.children) as HTMLElement[];
    if (kids.length === 0) return ready;

    const spot = (kid: HTMLElement) => {
      const rect = kid.getBoundingClientRect();
      return local(rect.left + rect.width * 0.5, rect.top + rect.height * 0.72);
    };
    const t0 = cursor.arrive(spot(kids[0]), ready);
    const step = cursor.paced(clamp(420 / kids.length, 30, 70));

    kids.forEach((kid, i) => {
      const at = t0 + i * step;
      if (i > 0) cursor.line(spot(kid), at - step, step, "ease-in-out");
      this.animate(
        kid,
        [
          { opacity: 0, scale: "0.7" },
          { opacity: 1, scale: "1" },
        ],
        at,
        240,
        "cubic-bezier(0.34, 1.56, 0.64, 1)",
      );
    });
    return t0 + kids.length * step;
  }

  /** product selects a written removal and strikes it on release. */
  private strike(cursor: EngineCursor, el: HTMLElement, ready: number, local: LocalFn): void {
    const target = el.querySelector<HTMLElement>(".content") ?? el;
    const text = this.extent(target, local);
    const t0 = cursor.arrive(text.start, ready);
    const down = cursor.press(t0);
    const drag = cursor.paced(clamp((text.right - text.left) * 0.5, 180, 320));
    const up = cursor.line(text.end, down, drag, "cubic-bezier(0.45, 0, 0.35, 1)");
    cursor.release(up);

    this.flashSelect(
      local(text.left - 4, text.top - 2),
      text.right - text.left + 8,
      text.bottom - text.top + 4,
      TONE[cursor.id],
      down,
      drag + 260,
      true,
    );
    this.later(up, () => el.setAttribute("data-struck", ""));
  }

  /** product stages a finished card the way a hover would. */
  private stage(cursor: EngineCursor, el: HTMLElement, ready: number, local: LocalFn): void {
    const box = el.getBoundingClientRect();
    const spot = local(box.left + 34, box.top + 22);
    const t0 = cursor.arrive(spot, ready + 120);
    const down = cursor.press(t0);
    const up = cursor.release(down + 60);
    cursor.glide({ x: spot.x + 46, y: spot.y + 56 }, up + 40);

    this.later(down, () => el.classList.add("is-staged"));
    this.later(down + STAGE_MS, () => el.classList.remove("is-staged"));
  }

  private extent(el: HTMLElement, local: LocalFn): TextExtent {
    const box = el.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 0);

    if (rects.length === 0) {
      const mid = box.top + box.height / 2;
      return {
        box,
        left: box.left,
        right: box.right,
        top: box.top,
        bottom: box.bottom,
        start: local(box.left, mid),
        end: local(box.right, mid),
      };
    }

    const first = rects[0];
    const last = rects[rects.length - 1];
    return {
      box,
      left: Math.min(...rects.map((r) => r.left)),
      right: Math.max(...rects.map((r) => r.right)),
      top: Math.min(...rects.map((r) => r.top)),
      bottom: Math.max(...rects.map((r) => r.bottom)),
      start: local(first.left - 2, first.top + first.height * 0.7),
      end: local(last.right + 2, last.top + last.height * 0.7),
    };
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

type LocalFn = (x: number, y: number) => Point;
