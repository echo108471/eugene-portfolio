# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js App Router portfolio app. The main route entry is `src/app/page.tsx`, with shared layout, metadata, theme setup, and structured data in `src/app/layout.tsx`. Global Tailwind styles, CSS variables, focus states, and motion preferences live in `src/app/globals.css`.

Portfolio sections and reusable UI are in `src/app/components/`, using files such as `home.tsx`, `project_card.tsx`, `experience_section.tsx`, and `dark-mode-toggle.tsx`. Static assets live in `public/`: project screenshots in `public/projects/`, organization logos in `public/logos/`, education assets in `public/education/`, and the public resume at `public/EugeneChoResume.pdf`.

## Build, Test, and Development Commands

Use npm for all project commands:

```bash
npm run dev       # Start the local Next.js development server
npm run build     # Create a production build
npm run start     # Serve the production build
npm run lint      # Run ESLint
npm run lint:fix  # Apply safe ESLint fixes
```

There is no dedicated test suite yet. Before handing off changes, run `npm run lint` and `npm run build`.

## Coding Style & Naming Conventions

- **Tech Stack:** TypeScript, React (App Router), TailwindCSS, Framer Motion, Heroicons.
- **Indentation:** 2-space indentation.
- **Naming:** Component filenames in `src/app/components/` use lowercase snake case (e.g., `project_section.tsx`).
- **Styles:** Use Tailwind utility classes. For complex background effects or theme switching, use CSS variables defined in `globals.css`.
- **Motion:** Use `Reveal`, `Stagger`, and `MotionChild` from `src/app/components/motion.tsx` for consistent entrance animations. Use centralized constants like `cardHover` and `cardTap` for interactions.

## Portfolio Design Direction

Working direction: **Quiet Personal Systems**. The portfolio should read as a personal engineering portfolio, not a SaaS landing page.

- **Person first:** Lead with Eugene as a person. Use direct first-person copy ("Hi, I'm Eugene...").
- **Evidence in context:** Place impact metrics inside relevant experience or project entries rather than hero cards.
- **Typography:** Use `JetBrains Mono` as the primary font to reinforce the engineering identity.
- **Visuals:** Use polished but quiet interactions. Prioritize microinteractions (subtle icon shifts, scale changes) that provide feedback without distraction. Use a static mesh gradient background to keep the UI grounded and professional. Avoid excessive gradients, shimmer effects, and marketing-style CTAs.
- **Accessibility:** Ensure visible keyboard focus states (indigo outline) and respect `prefers-reduced-motion`.

## Testing Guidelines

No testing framework is currently configured. For UI changes, manually validate:
- **Responsive behavior:** Mobile, tablet, and desktop layouts.
- **Theme support:** Light and dark modes.
- **Accessibility:** Keyboard navigation and focus visibility.
- **Motion:** Ensure animations are subtle and respect system settings.

## Commit & Pull Request Guidelines

Use clear imperative commit messages, such as `Improve project card responsiveness` or `Update experience section copy`.

Pull requests should include a brief summary, validation steps taken, and screenshots for visual changes. Keep changes focused and avoid unrelated refactors.
