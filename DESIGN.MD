# DESIGN.md

Design system for **Eugene — portfolio (diff)**. A version-control–native visual language: the look and feel of a `git diff` turned into a design system. The metaphor lives in *structure and interaction*, not in loud surface decoration.

> Core rule: **structure over surface.** If a stranger needs the diff explained, it's too loud. If it reads as "tasteful and a little technical," it's right.

---

## 1. Concept

The whole system is built on one idea: a person — and their work — is the accumulated set of changes against a previous version. So the UI borrows the *grammar* of version control:

- **Additions** (`+`, green) = what's present, current, what you've added or grown into.
- **Removals** (`−`, red, struck) = what's been deprecated, outgrown, replaced.
- **The gutter** = a quiet left-hand column of line-markers running down every block, the way a diff view or code editor shows line numbers.
- **Commits / branches / staging** = the vocabulary used for navigation, metadata, and microcopy.

Green is the **primary** color on purpose: growth and action are additive. Red is used sparingly — only where something is genuinely being struck out.

---

## 2. Principles

1. **Quiet metaphor.** The diff is felt, not shouted. Most of the page is muted, editorial, monochrome. Green and red appear only where there's a real add/remove.
2. **One animated moment.** Only the project card "stages" on hover. Everything else is static or has minimal state transitions. Restraint reads as confidence.
3. **Honest content.** The concept is load-bearing only if the diffed copy is *true* (e.g. a real trait you've deprecated). Generic filler collapses the whole conceit.
4. **Source view, not terminal.** Cool paper background, IBM Plex typography, and real diff tints — deliberately *not* the black-background, neon-green, monospace terminal cliché.
5. **Lean stack.** Vite + React + TypeScript + Tailwind, fonts via Google Fonts, design system as CSS custom properties. No animation library; motion is CSS-only.

---

## 3. Foundations — Tokens

All tokens are CSS custom properties on `:root`, with dark values under `:root.dark` (a `.dark` class on `<html>` — see §6).

### 3.1 Color

Semantic, not literal. Reference tokens by role, never hardcode hexes.

| Token | Role | Light | Dark |
|---|---|---|---|
| `--paper` | Page background | `#f6f8fa` | `#0d1117` |
| `--paper-raised` | Cards, raised surfaces | `#ffffff` | `#161b22` |
| `--ink` | Primary text | `#151b23` | `#e6edf3` |
| `--ink-soft` | Body / secondary text | `#46525f` | `#a9b4bf` |
| `--ink-faint` | Metadata, captions | `#6f7b87` | `#7d8590` |
| `--line` | Hairline borders | `#dce3ea` | `#30363d` |
| `--line-strong` | Stronger borders | `#c3cbd4` | `#3d444d` |
| `--add` | Addition | `#1f883d` | `#3fb950` |
| `--add-wash` | Add background tint | `rgba(31,136,61,.08)` | `rgba(63,185,80,.1)` |
| `--add-edge` | Add border / staged edge | `rgba(31,136,61,.55)` | `rgba(63,185,80,.48)` |
| `--del` | Removal / deprecated | `#cf222e` | `#ff7b72` |
| `--del-wash` | Remove background tint | `rgba(207,34,46,.08)` | `rgba(255,123,114,.1)` |
| `--del-edge` | Remove border | `rgba(207,34,46,.45)` | `rgba(255,123,114,.42)` |
| `--accent` | General UI accent | `#0969da` | `#58a6ff` |
| `--accent-wash` | UI hover / focus tint | `rgba(9,105,218,.08)` | `rgba(88,166,255,.12)` |
| `--accent-edge` | UI border / focus edge | `rgba(9,105,218,.45)` | `rgba(88,166,255,.5)` |
| `--shadow` | Elevation (hover only) | `0 1px 2px rgba(21,27,35,.05), 0 8px 24px -12px rgba(21,27,35,.16)` | `0 1px 2px rgba(0,0,0,.3), 0 12px 32px -16px rgba(0,0,0,.6)` |

**Usage rules**
- `--add` is semantic, not a general brand color: `+` markers, add rows, staged-card behavior, and additive changelog signs.
- `--del` only marks genuine removals: struck bio lines, remove rows, and the `−` marker. Never decorative.
- `--accent` is the normal interface accent: links, buttons, icons, focus rings, active nav states, section numbers, and other non-diff affordances.
- Washes (`*-wash`) are for backgrounds of diff rows and hover states. Keep them barely-there.
- **Keep paper cool and `--del` a true diff red, not clay/terracotta.** The old warm paper + sage accent direction read too close to AI-lab editorial branding. The current palette borrows more from source-control surfaces: cool neutrals, sharper diff colors, and blue for non-diff UI.

### 3.2 Typography

Three families, three jobs. The serif/mono pairing is what keeps it from feeling like a terminal.

| Family | Role | Weights | Used for |
|---|---|---|---|
| **IBM Plex Serif** (serif) | Display | 400–600 | Headlines, card titles, section titles |
| **IBM Plex Sans** (sans) | UI / body | 400/500/600 | Body copy, buttons, paragraphs |
| **JetBrains Mono** | Meta | 400/500 | Captions, metadata, the gutter, commit log, tags |

**Type scale** — ~1.25 ratio. Reference sizes:

| Step | Size | Notes |
|---|---|---|
| Display | `clamp(38px, 6vw, 68px)` | IBM Plex Serif 400, `line-height: 1.04`, `letter-spacing: 0` |
| H2 | `34px` | IBM Plex Serif |
| H3 / section title | `26px` | IBM Plex Serif 500, `letter-spacing: 0` |
| Body | `17px` | IBM Plex Sans, `line-height: 1.55–1.65` |
| Small | `13–14px` | UI text, card descriptions |
| Meta | `11–12px` | JetBrains Mono, captions & labels |

Body measure capped at `54–62ch` for readability.

### 3.3 Spacing

8px base, fixed scale. **No arbitrary values.**

| Name | Value |
|---|---|
| xs | `4px` |
| sm | `8px` |
| md | `16px` |
| lg | `24px` |
| xl | `40px` |
| 2xl | `64px` |

### 3.4 Radius, borders, elevation, motion

- **Radius:** pills `999px` · cards `14px` · swatches `11px` · buttons & toggle `9px`.
- **Borders:** `1px solid var(--line)` for hairlines; `var(--line-strong)` for emphasis.
- **Elevation:** flat by default. `--shadow` appears **only** on card hover.
- **Motion:** interactive transitions `.18s–.22s ease`; theme switch `.4s ease`. Signature move: card hover `translateY(-3px)` + shadow + accent edge.

---

## 4. The diff motif (signature system)

The thing that makes this system *this* system. Three mechanisms, used sparingly.

### 4.1 The gutter

Every content block is a 2-column grid: a narrow marker column + content.

```html
<div class="diff-block">
  <div class="diff-gutter"><span class="plus">+</span><span class="minus">−</span><span class="tilde">~</span></div>
  <div class="diff-body"> … content … </div>
</div>
```

- `.diff-block` → 2-column grid (narrow marker column + content).
- `.diff-gutter` → mono, right border, centered marks. `.plus` green, `.minus` red, `.tilde` faint (for "context/unchanged" sections).
- `.diff-body` → the content column.

Choose markers by meaning: `+` for sections about what you've added/built, `~` for neutral/context sections (tokens, about), `−` rarely.

### 4.2 Diff rows (the hero diff + `.spec-panel`)

A literal diff hunk: a filename/`@@ … @@` header with `−`/`+` rows. The hero renders this inline with `.del-text` (struck prior self) and `.add-text` (current self) lines; project cards render a `.spec-panel` specimen with a `.spec-head` header (`@@ file @@` + `.spec-range`) and signed rows.

- header → filename + `@@ … @@` range, mono, faint.
- removal row → `--del-wash` background, struck red content.
- addition row → `--add-wash` background, ink content.

**Content rule:** removed lines must be a real prior self; added lines the current one. This is the most "you" element — write it bravely or cut it.

### 4.3 Staging interaction

The only animated expression of the metaphor. On `.stage-card:hover`:
- left accent bar turns `--add`,
- the `.stage-mark` shifts from a resting dot to a staged `+`,
- card lifts (`translateY(-3px)`) with `--shadow` and an `--add-edge` border.

Do not replicate this animation elsewhere — its scarcity is the point.

---

## 5. Components

### Navigation (`header`)
Sticky, blurred backdrop, `1px` bottom border, `62px` tall. Nav buttons are scroll-spy links that track the active section (`aria-current="page"`); below `lg` they collapse into a Headless UI slide-over menu.
- **Brand** = branch-glyph SVG (`--accent`) + name + **branch pill** (`.branch-pill`: `.branch-dot` + `main`).
- **Links** = mono, lowercase, `--ink-soft` → `--ink`, active link in `--ink`.
- **Theme toggle** = `.flag-pill`, a `--theme=light|dark` flag chip (see §6).

### Buttons (`.btn`)
| Variant | Look | Meaning |
|---|---|---|
| `.btn-primary` | Outlined `--accent`, subtle accent wash on hover | Primary navigation/action |
| `.btn-secondary` | Outline, `--accent-wash` on hover | Secondary action |
| `.btn-ghost` | Text only, `--accent-wash` on hover | Low-emphasis action |

`8px` radius, compact padding. Buttons stay flat; color and border carry state.

### Tags / pills (`.tag-pill`)
Mono, `999px` radius, `--line-strong` outline, `--ink-soft`. Variant `.tag-pill.add` (green outline + wash) marks something new. Use for stack chips and version numbers (`v2.1.0`).

### Project card (`.stage-card`)
Raised surface, left accent bar, extra left padding for the stage marker. Anatomy: `.stage-mark` · `commit log · {date}` meta + `Open ↗` · IBM Plex Serif title · optional `.spec-panel` diff specimen · stack `.tag-pill`s. Cards collapse to a single column on narrow viewports. When a `link` is provided the card renders as a real `<a>` (keyboard- and screen-reader-navigable); otherwise it is a `<div>`. See §4.3 for hover.

### Diff specimen (`.spec-panel`)
See §4.2.

### Section header (`.section-head`)
`.section-num` (mono, blue, `01`) + `.section-title` (IBM Plex Serif) + `.section-note` (mono, faint, right-aligned aside). Treat sections like numbered commits.

### Footer — commit log (`.commit-log`)
Mono lines styled as `git log`, rendered from real recent commits injected at build time (`__RECENT_COMMITS__`): green `.hash` + bold author + commit subject, each linking to GitHub when an origin remote exists. A quiet, on-theme way to close the page. Lives in `contact-me.tsx`.

---

## 6. Layout & theming

- **Container:** `.site-container` — centered, max-width with responsive horizontal padding.
- **Block grid:** narrow diff gutter + content; gutter narrows on mobile.
- **Breakpoints:** Tailwind responsive utilities — cards stack, the gutter narrows, and the desktop nav collapses into a slide-over menu below `lg`.
- **Theming:** a `.dark` class on `<html>`; all colors are tokens, so the switch is automatic. `dark-mode-toggle.tsx` toggles the class and writes the choice to `localStorage`. Theme **is** persisted: an inline script in `index.html` applies the saved theme (falling back to `prefers-color-scheme`) before first paint, so there's no flash, and transitions are suppressed during that initial application.

---

## 7. Accessibility & known gaps

Standing accessibility rules, plus what's already handled:

- **Color is never the *only* signal.** Add/remove are also distinguished by `+`/`−` glyphs and strikethrough, which is the right call — but green/red is the classic color-vision-deficient pairing, so keep the glyph/strikethrough redundancy everywhere. Never rely on hue alone.
- **Faint text contrast.** `--ink-faint` on `--paper` for small mono text is borderline against WCAG AA. Verify with a contrast checker; darken if it fails.
- **Focus-visible styles.** Links, buttons, and form controls use a visible `--accent` focus ring. Keep focus blue so it stays an interface state, not an add/diff state.
- **Cards are real links.** *(Resolved.)* A linked project card renders as an `<a>`, so it's keyboard- and screen-reader-navigable; unlinked cards stay `<div>`s.
- **Decorative-only flourishes** (e.g. the staged-card marker) carry no essential info, so they stay invisible to assistive tech by design.
- **Reduced motion.** *(Resolved.)* `@media (prefers-reduced-motion: reduce)` neutralizes animations, the card lift, and smooth scrolling.
- **Theme persistence.** *(Resolved.)* Saved to `localStorage` with a `prefers-color-scheme` fallback, applied pre-paint (see §6).

---

## 8. Voice & content guidelines

- **Microcopy uses git vocabulary** — but lightly. `main`, `commit`, `staged`, `view diff`, conventional-commit footer. One or two touches per region; if every label is a git pun it tips from clever into try-hard.
- **Section names** read like commits/areas: `Tokens`, `Components`, `About, as a diff`.
- **The bio diff is the soul.** Removed = a real prior self; added = who you are now. Specific and a little vulnerable beats impressive.
- **Tone:** confident, plain, technical but human. Let the content and spacing do the softening.

---

## 9. Do / Don't

**Do**
- Keep green dominant, red rare.
- Reuse tokens; respect the 8px scale.
- Limit the staging animation to project cards.
- Write true, specific diff content.

**Don't**
- Flood the page with red/green or paint every element a diff color.
- Add a second animated "clever" interaction.
- Drift toward black-background terminal styling.
- Ship placeholder bio/work copy — empty content is where this style is most exposed.

---

## 10. Extending the system

This system started as a single-file specimen and now ships as a Vite + React + TypeScript + Tailwind site. The core moves are in place — tokens live in `src/globals.css`, the patterns (`.diff-block`, `.stage-card`, `.btn`, `.spec-panel`) are component classes, theming is persisted, and the accessibility items in §7 are largely resolved. The **release-history / changelog-of-a-person** section (`release-history.tsx`) — the strongest extension of the concept, versions of you over time, `+ added` / `− deprecated` — is built and lives in the `history` section.

When extending further, keep the same discipline: new patterns become component classes referencing tokens by role, motion stays CSS-only and reduced-motion-aware, and any new diff content must be true.

---

*Fonts: IBM Plex Serif · IBM Plex Sans · JetBrains Mono (Google Fonts).*
