# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React + TypeScript single-page portfolio app. The entry point is `src/main.tsx`, which mounts `src/App.tsx` (the section composition). The HTML shell and `theme-color` meta live in `index.html`. Global Tailwind styles, CSS variables (design tokens), focus states, and motion preferences live in `src/globals.css`.

Portfolio sections and reusable UI are in `src/components/`, using files such as `about_me.tsx`, `project_card.tsx`, `experience_section.tsx`, `header.tsx`, and `dark-mode-toggle.tsx`. Static assets live in `public/`: organization logos in `public/logos/`, education assets in `public/education/`, and the public resume at `public/EugeneChoResume.pdf`. Project cards render a `git diff` specimen rather than screenshots, so there is no `public/projects/`.

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

- **Tech Stack:** TypeScript, React (Vite SPA), Tailwind CSS, Headless UI, Heroicons. Entrance animations use custom utilities in `src/components/motion.tsx` (no Framer Motion dependency).
- **Indentation:** 2-space indentation.
- **Naming:** Component filenames in `src/components/` use lowercase snake case (e.g., `project_section.tsx`).
- **Styles:** Use Tailwind utility classes. For theme switching and diff-system surfaces, use the CSS variables (design tokens) defined in `src/globals.css`. Reference tokens by role (`--add`, `--del`, `--paper`, `--ink`); never hardcode hexes.
- **Motion:** Use the helpers from `src/components/motion.tsx` (e.g. `Reveal`) for consistent entrance animations. Keep interactions quiet — the project-card hover "stage" is the one signature animated moment.

## Portfolio Design Direction

Working direction: **Quiet Diff System** (see [DESIGN.MD](./DESIGN.MD) for the full spec). The portfolio reads as a version-control–native personal engineering portfolio, not a SaaS landing page. The metaphor lives in structure and interaction, not loud surface decoration.

- **Structure over surface:** a `git diff` visual language — a left gutter of line-markers, `+`/`−` diff rows, staged project cards, and a commit-log footer.
- **Palette:** near-neutral paper surfaces with warm ink; a single sage-green accent (`--add`) for additive/primary actions and a true diff-red (`--del`) reserved for genuine removals. Keep paper near-neutral and `--del` a real red, not clay/terracotta — see DESIGN.MD §3.1.
- **Typography:** Fraunces (serif display), Hanken Grotesk (UI/body), JetBrains Mono (meta/gutter/commit log). The serif + mono pairing is what keeps it from feeling like a terminal.
- **Restraint:** one animated moment (the project-card "stage" on hover). Green dominant, red rare. No second clever interaction; no marketing CTAs, mesh gradients, or shimmer.
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
