# Mohammed Rajabi — Developer Portfolio

Phase 2 of 5 is implemented: core navigation, split hero, and illustrated About Me. This continues the Phase 1 architecture, palette, fonts, theme system, reusable components, and lazy routes. No backend or new dependencies were added.

## Run locally

From the portfolio workspace:

```powershell
cd C:\Users\moham\My-Test-Projects\portfolio\mohammed-rajabi-portfolio
npm ci
npm run dev
```

Use the Local URL printed by Vite. To validate and preview the production output:

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

Build output is `dist/`. The project uses npm, Node 24.13.1 for validation, React 19, TypeScript 6, Vite 8, Tailwind CSS 4 with `@tailwindcss/vite`, React Router 8, Motion 14, Lucide React, and ESLint. Exact versions remain in `package-lock.json`. Fonts are bundled locally through Fontsource. Existing parent Git history is preserved; no remote or deployment was created.

## Phase 2 functionality

- Sticky Neo-Brutalist box navigation with current-section styling and color accents.
- A responsive disclosure menu with meaningful button labels, expanded state, comfortable tap targets, initial link focus, Escape/focus restoration, close on navigation, outside pointer interaction, focus leaving the header, and desktop resize.
- Split hero using the confirmed name, exact headline/title, and an introduction consistent with the supplied biography.
- Three original developer cards for Software Development, Cybersecurity, and Continuous Learning. The illustrative code is decorative, not a project or skill claim.
- Original, accessible inline SVG workspace illustration beside the exact supplied biography and “More Than Just Code.” heading. It does not depict a personal likeness.
- Persistent light/dark/system theme controls, keyboard focus indicators, skip link, semantic sections, local fonts, and route-specific metadata.
- Existing project-placeholder and not-found routes remain functional.

### Phase boundaries and actions

Only `home` and `about` sections are rendered. Projects, experience, and certifications remain empty; the existing verified education and skills data are retained without rendering their future sections. The Phase 1 preview is replaced by the homepage.

**Explore Projects** is intentionally disabled with a visible “Project showcase coming soon” explanation: there is no project data or implemented showcase to link to. It becomes a real section link when the registry enables a populated project section. **Contact Me** opens the confirmed email address via `mailto:`; the dedicated Contact section remains future work. No broken section links are exposed.

The **Download CV** action is present only when the real file exists at `public/resume/Mohammed_Rajabi_CV.pdf`. Restart Vite or rebuild after adding/removing it, because availability is checked in `vite.config.ts`. No resume was generated.

## Components and structure

```text
src/
  components/
    navigation/
      SiteHeader.tsx           Desktop links, mobile disclosure, header measurement
      SectionNavigation.tsx    Hash scrolling and section focus across lazy routes
    hero/DeveloperCards.tsx    Three decorative animated card compositions
    about/DeveloperIllustration.tsx  Original lightweight SVG with title/description
    theme/                     Existing provider and three-option theme toggle
    ui/                        Existing reusable buttons, cards, headings, container, gate
  sections/
    HeroSection.tsx            Profile, actions, developer cards
    AboutSection.tsx           Illustration and exact biography
  content/
    home.ts                    Ordered section registry and interface copy
    profile.ts                 Confirmed identity, biography, short introduction, resume path
    contact.ts                 Confirmed email and professional links
    skills.ts, education.ts    Retained verified content for later sections
    projects.ts, experience.ts, certifications.ts  Empty typed collections
  hooks/
    useActiveSection.ts        Passive scroll/resize listeners, animation-frame scheduling
    usePageMetadata.ts         Existing title and Open Graph description handling
    useTheme.ts                Existing theme access
  layouts/RootLayout.tsx       Skip link, navigation, main, footer
  pages/                     Homepage, project placeholder, 404
  types/                     Content contracts
  styles/                    Tokens and responsive component CSS
  utils/                     Content visibility helper
  assets/                    Reserved local assets
public/                      Favicon, robots.txt, resume directory
```

`BrutalistButton` now accepts native button refs (React 19) for menu focus management. Links continue to use native anchor/Router Link semantics with shared button styles. Cards are not buttons: no fake click affordance or extra tab stops.

## Navigation integration

`src/content/home.ts` defines all planned sections in the approved order: hero, about, skills, projects, experience, education, certifications, contact. Only entries with both `implemented` and `hasContent` true appear in navigation. To integrate a later section, add its component with the matching ID and `tabIndex={-1}` in `HomePage`, then enable its registry entry. Collection sections should reuse `ContentGate`/`hasContent` so empty content never creates a section or link. Do not enable a link before implementing its target.

Links use `/#home` and `/#about`, so they work from project and 404 routes. `SectionNavigation` waits for lazy content with a short-lived MutationObserver, scrolls the target, and moves keyboard focus without a second scroll. A ResizeObserver measures the sticky header and updates `--header-height`; CSS scroll padding reserves that height plus breathing room. The passive, frame-scheduled active-section hook handles the last section when the page is too short to scroll it up to the header. The mobile menu is a disclosure, not a modal: normal Tab navigation remains available, and leaving the header closes it.

## Design, themes, and motion

`src/styles/tokens.css` retains the five exact palette values, semantic light/dark colors, typography, spacing, border/shadow/radius, breakpoints, and timing tokens. Tailwind uses its official Vite plugin and CSS-first `@theme` setup.

Explicit light/dark preference persists under `mr-theme`. System mode removes the override and follows OS changes. The early HTML script avoids theme flash; storage failures still allow theme switching. Accent panels use charcoal text consistently in both themes.

Motion performs one brief transform/opacity entry per developer card. There are no perpetual animation loops, animation-driven React state updates, or layout-property animations. Hover lift/rotation/shadow changes run only on fine pointers with hover support. Reduced-motion preference disables card entry movement, decorative rotations, hover/press transforms, CSS transitions, and smooth anchor scrolling; global `MotionConfig` also preserves the Phase 1 user-preference policy. Touch users receive the same content without requiring hover.

## Routes and deployment limits

- `/`: Phase 2 homepage.
- `/projects/:slug`: existing simple project lookup/placeholder, without fabricated data.
- `*`: existing not-found page.

The client-rendered missing-page states do not set HTTP 404 response codes. The existing `vercel.json` SPA rewrite is retained, but no deployment was performed. Production-origin metadata, absolute sitemap URLs, structured data, share imagery, full WCAG 2.2 AA audit, and Lighthouse remain Phase 5 work. No production origin is invented.

## Next: Phase 3 (not started)

Implement categorized skills, large project showcase only with supplied entries, two-column education cards, and interactive contact cards. Keep experience and certifications hidden until real content is supplied; retain the approved two-column experience layout and certificate grid for when those become eligible. Do not begin Phase 3 without explicit instruction.

## Official setup references

- https://vite.dev/guide/
- https://tailwindcss.com/docs/installation/using-vite
- https://reactrouter.com/start/declarative/installation
- https://motion.dev/docs/react-installation

## Phase 2 verification

Executed successfully: `npm run typecheck`, `npm run lint`, and `npm run build`. Browser checks covered the following:

- Responsive widths 320, 390, 400, 768, 1024, and 1440px: no document, header, or developer-card horizontal overflow; desktop/tablet/mobile layouts inspected.
- Desktop navigation, current-section state (including the short-page bottom edge case), sticky-header clearance, direct hash navigation, and returning from a project placeholder to homepage About.
- Mobile disclosure focus, Tab/Enter selection, close on navigation, Escape with trigger focus restoration, outside pointer dismissal, and Tab-out dismissal.
- Both light and dark layouts, persisted theme after reload, local font loading, one main landmark/one h1, functioning skip link, and no unresolved local section anchors.
- Existing unknown-project and 404 routes and their titles; missing resume correctly produces no download link.

Reduced-motion branches were reviewed in source; this browser offers no media-emulation control, so the reduced-motion preference was not exercised live. Real touch hardware, screen-reader testing, a complete contrast/accessibility audit, Lighthouse, and production-host response codes remain unverified. Contact uses a verified mailto destination; no email was sent and external services were not contacted for testing. No Phase 3 sections or deployment were added.

### Files changed in Phase 2

Created: `components/navigation/SiteHeader.tsx`, `components/navigation/SectionNavigation.tsx`, `components/hero/DeveloperCards.tsx`, `components/about/DeveloperIllustration.tsx`, `sections/HeroSection.tsx`, `sections/AboutSection.tsx`, `hooks/useActiveSection.ts`, and `content/home.ts` (all under `src/`).

Updated: `src/pages/HomePage.tsx`, `src/layouts/RootLayout.tsx`, `src/styles/global.css`, `src/content/profile.ts`, `src/types/content.ts`, `src/components/ui/BrutalistButton.tsx`, `src/pages/ProjectPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/App.tsx`, `src/sections/README.md`, `index.html`, and this README. Dependency manifests, tokens, theme provider/toggle, and existing data collections were preserved. Final browser checks also confirmed system-theme fallback and an empty error console.
