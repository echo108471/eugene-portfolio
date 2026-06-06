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

1. **Quiet metaphor.** The diff is felt, not shouted. Most of the page is warm, editorial, monochrome. Color appears only where there's a real add/remove.
2. **One animated moment.** Only the project card "stages" on hover. Everything else is static or has minimal state transitions. Restraint reads as confidence.
3. **Honest content.** The concept is load-bearing only if the diffed copy is *true* (e.g. a real trait you've deprecated). Generic filler collapses the whole conceit.
4. **Warm, not terminal.** Paper background, a serif display face, desaturated diff tints — deliberately *not* the black-background, neon-green, monospace terminal cliché.
5. **No dependencies.** Single HTML file, system-native fonts via Google Fonts, CSS custom properties. Nothing to build.

---

## 3. Foundations — Tokens

All tokens are CSS custom properties on `:root`, themed via `[data-theme="light|dark"]`.

### 3.1 Color

Semantic, not literal. Reference tokens by role, never hardcode hexes.

| Token | Role | Light | Dark |
|---|---|---|---|
| `--paper` | Page background | `#f6f3ec` | `#15130e` |
| `--paper-raised` | Cards, raised surfaces | `#fbf9f4` | `#1d1a14` |
| `--ink` | Primary text | `#1b1814` | `#ece6da` |
| `--ink-soft` | Body / secondary text | `#5a534a` | `#a7a092` |
| `--ink-faint` | Metadata, captions | `#8a8377` | `#6f6859` |
| `--line` | Hairline borders | `#e4ded2` | `#2a2620` |
| `--line-strong` | Stronger borders | `#d4cdbe` | `#39342b` |
| `--add` | **Primary / addition** | `#5a7c57` | `#8fb088` |
| `--add-wash` | Add background tint | `rgba(90,124,87,.07)` | `rgba(143,176,136,.08)` |
| `--add-edge` | Add border / focus | `rgba(90,124,87,.55)` | `rgba(143,176,136,.45)` |
| `--del` | Removal / deprecated | `#a86a5c` | `#cf9183` |
| `--del-wash` | Remove background tint | `rgba(168,106,92,.07)` | `rgba(207,145,131,.08)` |
| `--del-edge` | Remove border | `rgba(168,106,92,.45)` | `rgba(207,145,131,.4)` |
| `--shadow` | Elevation (hover only) | `0 1px 2px rgba(27,24,20,.04), 0 8px 24px -12px rgba(27,24,20,.12)` | `0 1px 2px rgba(0,0,0,.3), 0 12px 32px -16px rgba(0,0,0,.6)` |

**Usage rules**
- `--add` is the single accent: primary buttons, links/hover, focus edges, the `+` marker. Action = adding a change.
- `--del` only marks genuine removals (struck bio lines, the `−` marker). Never decorative.
- Washes (`*-wash`) are for backgrounds of diff rows and hover states. Keep them barely-there.

### 3.2 Typography

Three families, three jobs. The serif/mono pairing is what keeps it from feeling like a terminal.

| Family | Role | Weights | Used for |
|---|---|---|---|
| **Fraunces** (serif) | Display | 300–600 | Headlines, card titles, section titles |
| **Hanken Grotesk** (sans) | UI / body | 400/500/600 | Body copy, buttons, paragraphs |
| **JetBrains Mono** | Meta | 400/500 | Captions, metadata, the gutter, commit log, tags |

**Type scale** — ~1.25 ratio. Reference sizes:

| Step | Size | Notes |
|---|---|---|
| Display | `clamp(38px, 6vw, 68px)` | Fraunces 400, `line-height: 1.04`, `letter-spacing: -.02em` |
| H2 | `34px` | Fraunces |
| H3 / section title | `26px` | Fraunces 500, `letter-spacing: -.01em` |
| Body | `17px` | Hanken, `line-height: 1.55–1.65` |
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
<div class="block">
  <div class="gutter"><span class="plus">+</span><span class="minus">−</span><span class="tilde">~</span></div>
  <div class="body"> … content … </div>
</div>
```

- `.block` → `grid-template-columns: 30px 1fr` (22px on mobile).
- `.gutter` → mono, right border, centered marks. `.plus` green, `.minus` red, `.tilde` faint (for "context/unchanged" sections).
- `.body` → `padding-left: 22px`.

Choose markers by meaning: `+` for sections about what you've added/built, `~` for neutral/context sections (tokens, about), `−` rarely.

### 4.2 Diff rows (`.diffbox`)

Used for the bio. A literal diff hunk with a filename header and `−`/`+` rows.

- `.diff-head` → filename + `@@ … @@` range, mono, faint.
- `.diff-row.rem` → `--del-wash` background, struck red content.
- `.diff-row.add` → `--add-wash` background, ink content.

**Content rule:** removed lines must be a real prior self; added lines the current one. This is the most "you" element — write it bravely or cut it.

### 4.3 Staging interaction

The only animated expression of the metaphor. On `.card:hover`:
- left accent bar (`::before`) turns `--add`,
- `.stage-mark` flips from `·` to `+` and appends `" staged"`,
- card lifts (`translateY(-3px)`) with `--shadow` and an `--add-edge` border.

Do not replicate this animation elsewhere — its scarcity is the point.

---

## 5. Components

### Navigation (`nav`)
Sticky, blurred backdrop (`backdrop-filter: blur(10px)`), `1px` bottom border, `62px` tall.
- **Brand** = branch-glyph SVG (`--add`) + name + **branch pill** (`.branch`: dot + `main`).
- **Links** = mono, lowercase, `--ink-soft` → `--ink` on hover.
- **Theme toggle** = `.toggle`, swaps sun/moon SVG (see §6).

### Buttons (`.btn`)
| Variant | Look | Meaning |
|---|---|---|
| `.btn-primary` | Solid `--add`, paper text | "Stage changes" — the additive action |
| `.btn-secondary` | Outline, `--add-wash` on hover | "View diff" — neutral |
| `.btn-ghost` | Text only, `--add-wash` on hover | "Discard" — low emphasis |

`9px` radius, `10px 18px` padding. Primary lifts `1px` on hover.

### Tags / pills (`.tag-pill`)
Mono, `999px` radius, `--line-strong` outline, `--ink-soft`. Variant `.tag-pill.add` (green outline + wash) marks something new. Use for stack chips and version numbers (`v2.1.0`).

### Project card (`.card`)
Raised surface, `14px` radius, left accent bar, extra left padding (`30px`) for the stage marker. Anatomy: `.stage-mark` · `.ctitle` (Fraunces) · `.cmeta` (`commit a4f9c2 · active`) · `.cdesc` · `.cstack`. Grid: `1fr 1fr`, collapses to single column < 680px. See §4.3 for hover.

### Diff box (`.diffbox`)
See §4.2.

### Section header (`.sec-head`)
`.sec-num` (mono, green, `01`) + `.sec-title` (Fraunces) + `.sec-note` (mono, faint, right-aligned aside). Treat sections like numbered commits.

### Footer — commit log (`.commit`)
Mono lines styled as `git log`: green `.hash` + bold `b` (author) + message in conventional-commit voice (`feat:`, `refactor:`, `init:`). A quiet, on-theme way to close the page.

---

## 6. Layout & theming

- **Container:** `.wrap` → `max-width: 980px`, `padding: 0 28px`.
- **Block grid:** `30px` gutter + content; `22px` gutter on mobile.
- **Breakpoint:** single `@media (max-width: 680px)` — cards stack, gutter narrows, some nav links hide.
- **Theming:** `data-theme` on `<html>`; all colors are tokens, so the theme switch is automatic. `toggleTheme()` flips the attribute and swaps the icon path. *(Note: no persistence — see §7. Add `localStorage` or `prefers-color-scheme` when moving off the single-file prototype.)*

---

## 7. Accessibility & known gaps

Honest list of what to fix before this is production:

- **Color is never the *only* signal.** Add/remove are also distinguished by `+`/`−` glyphs and strikethrough, which is the right call — but green/red is the classic color-vision-deficient pairing, so keep the glyph/strikethrough redundancy everywhere. Never rely on hue alone.
- **Faint text contrast.** `--ink-faint` on `--paper` for small mono text is borderline against WCAG AA. Verify with a contrast checker; darken if it fails.
- **No focus-visible styles.** Links, buttons, and the toggle need visible keyboard focus rings (suggest `--add-edge`). Currently hover-only.
- **Cards are `<div>`s with `cursor:pointer`.** Make them real `<a>`/`<button>` elements so they're keyboard- and screen-reader-navigable.
- **`::after` content injection** (`" staged"`) is decorative and invisible to most ATs — fine, since it carries no essential info.
- **Reduced motion.** Add `@media (prefers-reduced-motion: reduce)` to disable the card lift and theme transition.
- **Theme not persisted** across reloads (see §6).

---

## 8. Voice & content guidelines

- **Microcopy uses git vocabulary** — but lightly. `main`, `commit`, `staged`, `view diff`, conventional-commit footer. One or two touches per region; if every label is a git pun it tips from clever into try-hard.
- **Section names** read like commits/areas: `Tokens`, `Components`, `About, as a diff`.
- **The bio diff is the soul.** Removed = a real prior self; added = who you are now. Specific and a little vulnerable beats impressive.
- **Tone:** confident, plain, technical-but-warm. Let the serif and the paper do the softening.

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

This file is a prototype/specimen. To grow it into a full site:

1. Lift the `:root` token blocks into a shared stylesheet.
2. Promote repeated patterns (`.block`, `.card`, `.btn`, `.diffbox`) into components in your framework of choice.
3. Add a **release-history / changelog-of-a-person** section (the strongest extension of the concept — versions of you over time, `+ added` / `− deprecated`).
4. Fix the §7 accessibility gaps.
5. Add focus states and `prefers-reduced-motion` / `prefers-color-scheme` support.

---

*Fonts: Fraunces · Hanken Grotesk · JetBrains Mono (Google Fonts). No build step, no runtime dependencies.*