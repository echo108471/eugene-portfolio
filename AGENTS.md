# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React + TypeScript single-page portfolio app. The entry point is `src/main.tsx`, which mounts `src/App.tsx` (the section composition). The HTML shell, `theme-color` meta, SEO/Open Graph + JSON-LD metadata, and an inline pre-hydration theme script live in `index.html`. Global Tailwind layers, CSS variables (design tokens), focus states, and motion preferences live in `src/globals.css`. `vite.config.ts` injects the latest commit date and recent commits from git at build time (`__LAST_COMMIT_DATE__`, `__RECENT_COMMITS__`) and aliases `@` to `src/`; `src/use-last-commit.ts` turns the injected date into a live "last commit N ago" label.

Portfolio sections and reusable UI are in `src/components/`, using files such as `about-me.tsx`, `project-card.tsx`, `project-section.tsx`, `experience-section.tsx`, `release-history.tsx`, `skills-section.tsx`, `education-section.tsx`, `award-section.tsx`, `contact-me.tsx`, `header.tsx`, and `dark-mode-toggle.tsx`. Static assets live in `public/`: organization logos in `public/logos/`, education assets in `public/education/`, the favicon at `public/favicon.svg`, and the public resume at `public/EugeneChoResume.pdf`. Project cards render a `git diff` specimen rather than screenshots, so there is no `public/projects/`.

## Build, Test, and Development Commands

Use npm for all project commands:

```bash
npm run dev       # Start the local Vite dev server
npm run build     # Type-check (tsc -b) and create a production build
npm run preview   # Serve the production build locally
npm run lint      # Run ESLint
npm run lint:fix  # Apply safe ESLint fixes
```

There is no dedicated test suite yet. Before handing off changes, run `npm run lint` and `npm run build`.

## Coding Style & Naming Conventions

- **Tech Stack:** TypeScript, React 19 (Vite SPA), Tailwind CSS, Headless UI, Heroicons, react-icons. There is no animation library — motion is CSS-only (transitions and `prefers-reduced-motion` handling in `src/globals.css`).
- **Indentation:** 2-space indentation.
- **Naming:** Component filenames in `src/components/` use lowercase kebab-case (e.g., `project-section.tsx`).
- **Styles:** Use Tailwind utility classes plus the component classes in `src/globals.css` (`.diff-block`, `.spec-panel`, `.stage-card`, `.section-head`, `.btn`, `.tag-pill`, `.commit-log`). For theme switching and diff-system surfaces, use the CSS variables (design tokens) defined in `src/globals.css`. Reference tokens by role (`--add`, `--del`, `--paper`, `--ink`, `--accent`); never hardcode hexes.
- **Motion:** Keep interactions quiet — the project-card hover "stage" is the one signature animated moment. Everything else is static or a minimal state transition, and all motion respects `prefers-reduced-motion`.

## Portfolio Design Direction

Working direction: **Quiet Diff System** (see [DESIGN.MD](./DESIGN.MD) for the full spec). The portfolio reads as a version-control–native personal engineering portfolio, not a SaaS landing page. The metaphor lives in structure and interaction, not loud surface decoration.

- **Structure over surface:** a `git diff` visual language — a left gutter of line-markers, `+`/`−` diff rows, staged project cards, and a commit-log footer.
- **Palette:** cool source-control neutrals; sharper diff green (`--add`) and red (`--del`) reserved for true add/remove semantics, plus a separate source-control blue (`--accent`) for normal links, buttons, icons, focus, and navigation. Keep paper cool and neutral so the site reads like a source view, not warm AI-lab editorial branding — see DESIGN.MD §3.1.
- **Typography:** IBM Plex Serif (display), IBM Plex Sans (UI/body), JetBrains Mono (meta/gutter/commit log). The Plex + mono pairing keeps the page technical and authored without drifting into terminal cosplay.
- **Restraint:** one animated moment (the project-card "stage" on hover). Green/red stay semantic, blue stays restrained for normal UI. No second clever interaction; no marketing CTAs, mesh gradients, or shimmer.
- **Honest content:** the diffed copy (especially the bio diff) must be true — a real prior self removed, the current self added. Filler collapses the concept.
- **Accessibility:** visible keyboard focus states (green `--add` outline) and respect `prefers-reduced-motion`.

## Testing Guidelines

No testing framework is currently configured. For UI changes, manually validate:
- **Responsive behavior:** Mobile, tablet, and desktop layouts.
- **Theme support:** Light and dark modes.
- **Accessibility:** Keyboard navigation and focus visibility.
- **Motion:** Ensure animations are subtle and respect system settings.

## Commit & Pull Request Guidelines

Use clear imperative commit messages, such as `Improve project card responsiveness` or `Update experience section copy`.

Pull requests should include a brief summary, validation steps taken, and screenshots for visual changes. Keep changes focused and avoid unrelated refactors.
