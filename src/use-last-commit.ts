import { useEffect, useState } from "react";

// Injected at build time by Vite (see vite.config.ts) as the ISO timestamp of
// the last git commit included in this build.
declare const __LAST_COMMIT_DATE__: string;

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const YEAR = 365 * DAY;

// Compact, git-log-style relative label: "just now", "5m ago", "2d ago".
function formatRelative(fromIso: string, now: number): string {
  const then = new Date(fromIso).getTime();
  if (Number.isNaN(then)) return "recently";

  const seconds = Math.max(0, Math.floor((now - then) / 1000));

  if (seconds < MINUTE) return "just now";
  if (seconds < HOUR) return `${Math.floor(seconds / MINUTE)}m ago`;
  if (seconds < DAY) return `${Math.floor(seconds / HOUR)}h ago`;
  if (seconds < WEEK) return `${Math.floor(seconds / DAY)}d ago`;
  if (seconds < MONTH) return `${Math.floor(seconds / WEEK)}w ago`;
  if (seconds < YEAR) return `${Math.floor(seconds / MONTH)}mo ago`;
  return `${Math.floor(seconds / YEAR)}y ago`;
}

// Returns a live "last commit" label that re-renders every minute so it stays
// current while the page is open.
export function useLastCommitLabel(): string {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), MINUTE * 1000);
    return () => window.clearInterval(id);
  }, []);

  return formatRelative(__LAST_COMMIT_DATE__, now);
}
