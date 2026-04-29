# Design Direction

## Portfolio Feel

The portfolio should read as a personal engineering portfolio, not a SaaS landing page. It can still be polished, interactive, and technically sharp, but the first impression should be a person with credible work, not a product with conversion copy.

Working direction: **Quiet Personal Systems**

## Design Principles

- **Person first:** lead with Eugene's name, current role, school, and a short human introduction.
- **Evidence in context:** keep metrics and impact numbers, but place them inside the relevant experience or project instead of presenting them as hero proof points.
- **Calm polish:** use good spacing, typography, and restrained interaction instead of heavy gradients, animated pills, and marketing-style CTAs.
- **Love for microinteractions:** prioritize high-signal, subtle interactive details (like icon nudges and smooth scaling) that make the system feel "alive" and responsive without being loud.
- **Recruiter-readable:** make resume, GitHub, LinkedIn, email, experience, and projects easy to scan quickly.
- **Personal specificity:** copy should sound like Eugene describing his work, not a company positioning statement.

## Anti-Goals

Avoid these patterns because they push the site toward SaaS/product marketing:

- A hero that looks like a conversion funnel.
- Large proof/stat cards in the first viewport.
- Rows of focus chips that resemble product feature tags.
- Overuse of gradient text, glowing borders, badge shimmer, and hover lift.
- Section headlines such as "Proof through shipped work" that sound like campaign copy.
- Generic CTAs like "View projects" styled as primary product buttons.

## Copy Voice

Use direct first-person copy in prominent areas.

Good:

```text
Hi, I'm Eugene Cho.

I'm a UC Davis CS senior and software engineering intern at Persist AI. I build
backend-heavy full-stack systems across healthcare, education, and bioinformatics,
with recent work in agents, real-time collaboration, and production APIs.
```

Avoid:

```text
Backend depth with product execution.
Building useful systems with real users.
Proof through shipped work.
```

Section copy should be short and concrete. Prefer "What I worked on" over abstract positioning.

## Visual Language

### Color

The system uses a custom light/dark theme driven by CSS variables in `src/app/globals.css` and mapped in `tailwind.config.ts`.

- **Background (Light):** `#f9fafb` with a subtle pink/indigo glow.
- **Background (Dark):** `#1e2021` (rich charcoal) with a deep indigo/violet glow.
- **Foreground:** High-contrast slate/gray (`#111827` light, `#ebe8e2` dark).
- **Primary Accent:** Indigo (`#6366f1` light, `#818cf8` dark for focus).
- **Subtext/Innertext:** Softened grays and neutrals for readable hierarchy.

### Typography

- **Primary Font:** `JetBrains Mono`. This monospace choice reinforces the "engineering-first" identity while maintaining high readability.
- **Headings:** Semi-bold (`font-weight: 600`), compact, and literal.
- **Body:** Conversational and spacious with `leading-8` in prose sections.

### Background System

The site uses a refined, static mesh gradient:
- **Mesh Layers:** Four corner radial gradients with very low opacity (indigo and pink/violet) overlaid on a primary linear gradient.
- **Static Grounding:** No background animations are used, ensuring a fast, stable, and focused environment.
- **Transition:** Smooth 0.3s transition between light and dark modes.

### Surfaces

- **Cards:** White/80 (light) or White/5 (dark) with thin borders.
- **Project Cards:** Feature a subtle top-border gradient (indigo-cyan-emerald) that reveals on hover.
- **Hover States:** Scale `1.01` or `1.02` with slight shadow/border intensification.
- **Focus States:** 2px indigo outline with an offset, ensuring accessibility.

## Layout System

### Page Rhythm

1. **Hero:** Name, short intro, location/status, and plain social links.
2. **About:** Personal narrative paired with a grid of quick facts.
3. **Experience:** Detailed timeline with logos and tech tags.
4. **Projects:** Visual-forward grid with live links and highlights.
5. **Skills:** Categorized technical expertise.
6. **Education & Awards:** Supporting academic and professional honors.
7. **Contact:** Simple email link and footer.

### Spacing

- **Section Padding:** `py-12` to `py-14` for consistent vertical rhythm.
- **Container:** `max-w-7xl` or similar for desktop, with `px-4/6` for mobile breathing room.
- **Grid Gaps:** `gap-4` to `gap-8` depending on content density.

## Interaction System

### Motion (Framer Motion)

- **Reveal:** Staggered fade-in and slide-up animations for section entrance.
- **Card Hover/Tap:** Centralized constants (`cardHover`, `cardTap`) for consistent interactive feedback.
- **Reduced Motion:** Fully respected via `prefers-reduced-motion`. Background animations and entrance transforms are disabled.

### Feedback Patterns

- **Icon Nudge:** External link icons (ArrowTopRight) shift 2px on hover.
- **Theme Logo:** Custom `theme-logo` utility for automatic SVG switching based on the `dark` class.
- **Image Scale:** Project thumbnails scale slightly within their containers on card hover.
