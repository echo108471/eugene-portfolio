# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router portfolio app. The main route entry is `src/app/page.tsx`, with shared layout, metadata, theme setup, and structured data in `src/app/layout.tsx`. Global Tailwind styles, CSS variables, focus states, and motion preferences live in `src/app/globals.css`.

Portfolio sections and reusable UI are in `src/app/components/`, using files such as `home.tsx`, `project_card.tsx`, `experience_section.tsx`, and `dark-mode-toggle.tsx`. Static assets live in `public/`: project screenshots in `public/projects/`, organization logos in `public/logos/`, education assets in `public/education/`, and the public resume at `public/EugeneChoResume.pdf`.

## Build, Test, and Development Commands

Use npm for all project commands:

```bash
npm run dev       # Start the local Next.js development server
npm run build     # Create a production build with webpack
npm run start     # Serve the production build
npm run lint      # Run ESLint
npm run lint:fix  # Apply safe ESLint fixes
```

There is no dedicated test suite yet. Before handing off changes, run `npm run lint` and `npm run build`.

## Coding Style & Naming Conventions

Use TypeScript, React functional components, and Next.js App Router conventions. Match the existing style: two-space indentation, double quotes, semicolons, concise component-local data arrays, and Tailwind utilities for styling.

Component filenames in `src/app/components/` use lowercase snake case, for example `project_section.tsx` and `award_section.tsx`. Keep edits localized and avoid new dependencies unless the existing stack cannot reasonably solve the task.

## Portfolio Design Direction

Design changes should keep the site feeling like a personal engineering portfolio, not a SaaS landing page. Lead with Eugene as a person, use direct first-person copy in prominent areas, keep recruiter-readable links easy to find, and place impact metrics inside the relevant experience or project instead of the hero.

Avoid marketing-style hero proof cards, large conversion CTAs, excessive feature chips, repeated gradient text, shimmer effects, and section headlines that sound like product positioning. Use polished but quiet interactions: subtle link states, restrained card hover, visible keyboard focus, and minimal motion that respects `prefers-reduced-motion`.

## Testing Guidelines

No testing framework or coverage target is currently configured. For UI changes, validate responsive behavior, light and dark modes, keyboard focus states, and image/link rendering manually. If tests are added later, colocate them near the component or feature they cover and document the command in `package.json`.

## Commit & Pull Request Guidelines

Recent history uses short messages such as `update` and `gitignore`; prefer clearer imperative commits going forward, such as `Improve project card responsiveness` or `Update portfolio experience copy`.

Pull requests should include a brief summary, validation commands run, screenshots for visual changes, asset or content notes, and linked issues when applicable. Keep PRs focused and avoid unrelated refactors.

## Security & Configuration Tips

Do not hardcode secrets, API keys, analytics, or tracking scripts. For external links opened in a new tab, include `rel="noopener noreferrer"`. Preserve working links, existing portfolio entries, and `public/EugeneChoResume.pdf` unless explicitly asked to change them.
