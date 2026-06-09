// Generates public/og.png — the social share card for link previews
// (LinkedIn, iMessage, Slack, Discord, X). Run with `npm run og`.
//
// The card mirrors the site's "Quiet Diff System": cool source-control paper,
// a left diff gutter, and identity rendered as a real `git diff` (a prior self
// removed in red, the current self added in green). Brand tokens are kept in
// sync with src/globals.css by hand — they rarely change.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../public/og.png");

const W = 1200;
const H = 630;

// Design tokens (light theme) — mirror of src/globals.css :root.
const PAPER = "#f6f8fa";
const SURFACE = "#ffffff";
const INK = "#151b23";
const MUTED = "#59636e";
const LINE = "#dce3ea";
const ADD = "#1f883d";
const DEL = "#cf222e";
const ACCENT = "#0969da";
const ADD_BG = "#e6f4ea";
const DEL_BG = "#fbe9ea";

const MONO = "'SF Mono','JetBrains Mono',Menlo,Consolas,monospace";
const SANS = "'Helvetica Neue',Helvetica,Arial,sans-serif";

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>

  <!-- diff window -->
  <rect x="64" y="72" width="1072" height="486" rx="14" fill="${SURFACE}" stroke="${LINE}" stroke-width="2"/>

  <!-- window title bar -->
  <rect x="64" y="72" width="1072" height="56" rx="14" fill="${PAPER}"/>
  <rect x="64" y="110" width="1072" height="18" fill="${PAPER}"/>
  <line x1="64" y1="128" x2="1136" y2="128" stroke="${LINE}" stroke-width="2"/>
  <text x="96" y="107" font-family="${MONO}" font-size="22" fill="${MUTED}">identity.diff</text>
  <text x="1104" y="107" text-anchor="end" font-family="${MONO}" font-size="22" fill="${MUTED}">branch: main</text>

  <!-- gutter -->
  <rect x="64" y="128" width="72" height="430" fill="${PAPER}"/>
  <line x1="136" y1="128" x2="136" y2="558" stroke="${LINE}" stroke-width="2"/>

  <!-- diff rows -->
  <!-- removed -->
  <rect x="138" y="176" width="996" height="58" fill="${DEL_BG}"/>
  <text x="100" y="214" text-anchor="end" font-family="${MONO}" font-size="30" fill="${DEL}">-</text>
  <text x="164" y="214" font-family="${MONO}" font-size="30" fill="${DEL}">Aspiring web developer.</text>

  <!-- added: name -->
  <rect x="138" y="248" width="996" height="78" fill="${ADD_BG}"/>
  <text x="100" y="300" text-anchor="end" font-family="${MONO}" font-size="30" fill="${ADD}">+</text>
  <text x="164" y="306" font-family="${SANS}" font-size="56" font-weight="700" fill="${INK}">Eugene Cho</text>

  <!-- added: role -->
  <rect x="138" y="340" width="996" height="58" fill="${ADD_BG}"/>
  <text x="100" y="378" text-anchor="end" font-family="${MONO}" font-size="30" fill="${ADD}">+</text>
  <text x="164" y="379" font-family="${SANS}" font-size="32" fill="${INK}">Software Engineer — full-stack systems, built for the user.</text>

  <!-- meta footer -->
  <text x="164" y="470" font-family="${MONO}" font-size="24" fill="${MUTED}">UC Davis CS · multi-agent platforms · event-driven backends</text>
  <text x="164" y="510" font-family="${MONO}" font-size="24" fill="${ACCENT}">eacho.me</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(OUT);
console.log(`wrote ${OUT}`);
