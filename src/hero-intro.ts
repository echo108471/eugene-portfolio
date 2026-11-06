// Shared state for the hero's self-assembling intro (see DESIGN.md §4.4).
// The hero renders its finished state by default; while the intro runs, each
// stage class releases one beat of the diff so CSS can transition it in.

export const INTRO_STAGES = ["enter", "strike", "type", "settle", "done"] as const;
export type IntroStage = (typeof INTRO_STAGES)[number];

/** Gap between headline words appearing. Drives both the CSS stagger and the cursor path. */
export const WORD_STEP_MS = 50;

const PLAYED_KEY = "hero-intro-played";

/**
 * The intro plays once per browser session. `?intro` forces a replay for review;
 * reduced motion always wins, and deep links or background tabs land finished.
 */
export function shouldPlayIntro(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (new URLSearchParams(window.location.search).has("intro")) return true;
  if (document.visibilityState === "hidden") return false;
  if (window.location.hash && window.location.hash !== "#home") return false;

  try {
    return window.sessionStorage.getItem(PLAYED_KEY) === null;
  } catch {
    return true;
  }
}

let enabled: boolean | undefined;

/** Decided once per page load, so the hero and the page assembly always agree. */
export function introEnabled(): boolean {
  if (enabled === undefined) enabled = shouldPlayIntro();
  return enabled;
}

// The page swarm waits for the hero to finish so two sets of cursors never overlap.
const HERO_DONE_EVENT = "swarm:hero-done";
let heroDone = false;

export function markHeroDone(): void {
  if (heroDone) return;
  heroDone = true;
  window.dispatchEvent(new Event(HERO_DONE_EVENT));
}

export function onHeroDone(callback: () => void): () => void {
  if (heroDone) {
    callback();
    return () => {};
  }

  window.addEventListener(HERO_DONE_EVENT, callback, { once: true });
  return () => window.removeEventListener(HERO_DONE_EVENT, callback);
}

export function markIntroPlayed(): void {
  try {
    window.sessionStorage.setItem(PLAYED_KEY, "1");
  } catch {
    // Storage unavailable (private mode, blocked site data): the intro may replay.
  }
}

export function introClassName(stage: IntroStage): string {
  if (stage === "done") return "";

  const index = INTRO_STAGES.indexOf(stage);
  const reached = (target: IntroStage) => index >= INTRO_STAGES.indexOf(target);

  return [
    "hero-grid--intro",
    reached("strike") && "is-struck",
    reached("type") && "is-typing",
    reached("settle") && "is-settled",
  ]
    .filter(Boolean)
    .join(" ");
}
