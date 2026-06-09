# eugene-portfolio

Personal portfolio for Eugene Cho, built with Vite, React, TypeScript, and Tailwind CSS.

## Design Direction

The site reads like a version-control–native engineering portfolio, not a SaaS landing page. The design target is the **Quiet Diff System**: cool source-control paper surfaces, a left-hand diff gutter, a bio rendered as a real `git diff`, staged project cards, and a `git log` footer. The metaphor lives in structure and interaction, not loud surface decoration.

See [DESIGN.MD](./DESIGN.MD) for the full design system and [AGENTS.md](./AGENTS.md) for contributor conventions.

## Tech Stack

- Vite 6 (SPA)
- React 19
- TypeScript 5
- Tailwind CSS 3
- Headless UI + Heroicons + react-icons

## Getting Started

```bash
npm install
npm run dev       # Start the local Vite dev server
npm run build     # Type-check (tsc -b) and create a production build
npm run preview   # Serve the production build locally
npm run lint      # Run ESLint
npm run lint:fix  # Apply safe ESLint fixes
```

There is no test suite; before handing off changes, run `npm run lint` and `npm run build`.

## Project Layout

- `index.html` — HTML shell, fonts, SEO/Open Graph + JSON-LD metadata, and an inline pre-hydration script that applies the saved theme before paint.
- `src/main.tsx` → mounts `src/App.tsx`, which composes the sections.
- `src/components/` — sections and reusable UI (kebab-case filenames).
- `src/globals.css` — Tailwind layers, design tokens, and component styles.
- `src/use-last-commit.ts` — formats the build-time commit timestamp into a live "last commit N ago" label.
- `vite.config.ts` — injects the latest commit date and recent commits from git at build time (`__LAST_COMMIT_DATE__`, `__RECENT_COMMITS__`) and aliases `@` to `src/`.
- `public/` — `EugeneChoResume.pdf`, `favicon.svg`, organization logos (`logos/`), and education assets (`education/`).
