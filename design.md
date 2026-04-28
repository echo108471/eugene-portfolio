# Design Direction

## Portfolio Feel

The portfolio should read as a personal engineering portfolio, not a SaaS landing page. It can still be polished, interactive, and technically sharp, but the first impression should be a person with credible work, not a product with conversion copy.

Working direction: **Quiet Personal Systems**

## Design Principles

- **Person first:** lead with Eugene's name, current role, school, and a short human introduction.
- **Evidence in context:** keep metrics and impact numbers, but place them inside the relevant experience or project instead of presenting them as hero proof points.
- **Calm polish:** use good spacing, typography, and restrained interaction instead of heavy gradients, animated pills, and marketing-style CTAs.
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

Use the existing light/dark CSS variable setup as the base.

- Background: mostly quiet and neutral. Subtle gradients are acceptable, but they should not be the main visual identity.
- Primary accent: indigo/blue for links, focus states, and small active states.
- Secondary accents: cyan, green, rose, or amber only when they help distinguish content types.
- Gradients: use sparingly. Keep them to small details, not large hero typography or repeated card edges.
- Borders: low-contrast at rest, slightly stronger on hover/focus.

Avoid a one-note purple/blue gradient look.

### Typography

- Hero name should be the main display moment.
- The role should be secondary, not a giant product tagline.
- Body text should feel conversational and readable.
- Section headings should be compact and literal: `About`, `Experience`, `Projects`, `Education`, `Contact`.
- Metadata like dates, locations, and tech labels should stay small and consistent.

### Surfaces

Use cards only where they organize repeated content or framed actions.

- Rest: subtle border, minimal shadow.
- Hover: color or border change is usually enough.
- Active/tap: small press feedback is acceptable for clearly interactive elements.
- Focus: visible keyboard focus ring using the primary accent.

Do not put cards inside cards. Avoid making every section a framed module.

## Layout System

### Page Rhythm

Recommended order:

1. Hero: name, short intro, location/status line, and plain links.
2. About: a concise personal paragraph and a few grounded facts.
3. Experience: primary credibility, with impact numbers inside each role.
4. Projects: image-forward work samples with concise explanations.
5. Skills: compact supporting section, not a large badge wall.
6. Education and awards: supporting credibility.
7. Contact: simple link group.

Timeline can stay if it adds clarity, but it should not duplicate too much of the experience section.

### Spacing

- Main container: keep the current `max-w-7xl` scale unless the page feels too wide.
- Hero: give it enough air, but avoid full marketing-hero treatment.
- Section vertical padding: `py-10` to `py-14` for most sections.
- Card padding: `p-4` to `p-6` depending on content density.
- Grid gaps: `gap-4` to `gap-7`.

## Component Rules

### Header

- Keep the header sticky, light, and useful.
- Consider reducing desktop nav items if it feels crowded.
- Active states should be subtle.
- The name/logo area should feel personal and simple.
- Theme toggle should remain accessible and easy to find.

### Hero

- Lead with `Hi, I'm Eugene Cho.` or `Eugene Cho`.
- Use a short first-person paragraph instead of a marketing tagline.
- Use plain text links or restrained buttons for `Resume`, `GitHub`, `LinkedIn`, and `Email`.
- Remove the right-side metric/status card from the hero.
- Avoid feature-chip rows in the hero. If focus areas are needed, mention them in the paragraph.
- Do not use large gradient role text as the main visual hook.

### About

- Make this the most personal section.
- Keep facts grounded: school, current internship, domains, and what kinds of systems Eugene enjoys building.
- Avoid turning facts into achievement cards unless the layout needs structure.

### Experience

- This is where impact metrics belong.
- Keep company, role, dates, location, and bullets easy to scan.
- Use logos if they help recognition, but avoid making company cards feel like product case studies.
- Tech tags should support the story, not dominate the card.

### Projects

- Keep screenshots prominent because projects are the most visual proof.
- Describe what the project is, who it was for, and what Eugene built.
- Use impact numbers only when they are tied directly to that project.
- Link affordances should be clear but restrained.

### Skills

- Keep skills compact and practical.
- Avoid large badge walls or animated chip fields.
- Group by category only if it improves scan speed.

### Timeline

- Timeline should act as a quick orientation, not another marketing section.
- Keep animation minimal.
- Avoid duplicating every experience bullet.
- If the page feels too long, remove or compress the timeline before removing detailed experience.

### Contact

- Keep contact direct: email, GitHub, LinkedIn, resume, website.
- The section can be visually distinct, but it should not read like a sales CTA.
- Prefer "Get in touch" or "Contact" over "Let's build something useful."

## Interaction System

Use interaction as usability feedback, not decoration.

### Timing

- Fast feedback: 120ms to 180ms.
- Standard hover/reveal: 180ms to 250ms.
- Section entrance: 300ms to 450ms if used.
- Avoid ambient background motion unless it is extremely subtle.

### Patterns

- **Text link underline:** inline links and header links.
- **Small icon nudge:** external links can move 2px on hover.
- **Subtle card hover:** border color or slight shadow change.
- **Image settle:** project images can scale from `1` to `1.02` on hover.
- **Focus-visible:** every interactive element needs a clear keyboard state.

Avoid shimmer, pulsing dots, repeated gradient edge glints, and large hover lift across the whole page.

### Reduced Motion

Respect `prefers-reduced-motion`.

- Disable section entrance transforms.
- Disable ambient background animation.
- Keep instant color and focus changes.
- Avoid continuous pulsing or shimmer in all modes.

## Implementation Notes

- Prefer Tailwind utility classes for simple layout and state changes.
- Use Framer Motion only where it adds meaningful clarity.
- Keep animation constants centralized if repeated.
- Avoid new design abstractions unless multiple components need the same behavior.
- Preserve the current light/dark theme model.
- Keep edits localized and avoid changing portfolio content unless the design requires copy cleanup.

## Next Redesign Pass

Recommended implementation pass:

1. Rewrite the hero around a personal introduction and simple links.
2. Move hero metrics into the matching experience/project entries.
3. Remove or reduce hero focus chips and SaaS-style status cards.
4. Simplify section headings to be more literal and less campaign-like.
5. Tone down repeated gradients, hover lift, and card shadows.
6. Check desktop/mobile, light/dark modes, keyboard focus, and image rendering.
