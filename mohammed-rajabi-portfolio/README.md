# Mohammed Rajabi — Developer Portfolio

Phase 1 of 5: project foundation only. The homepage is a design-system preview, not the finished portfolio. No backend, fabricated projects, or professional claims are included.

## Stack

React 19, TypeScript 6, Vite 8, Tailwind CSS 4 with the official Vite plugin, React Router 8 (declarative mode), Motion 14, Lucide React, and npm. Bricolage Grotesque and DM Sans are self-hosted through Fontsource. Exact versions are recorded in package-lock.json.

## Run locally

Requires a Node version supported by Vite 8 (Node 20.19+ or 22.12+); validated with Node 24.13.1 and npm 11.8.0.

```sh
cd mohammed-rajabi-portfolio
npm ci
npm run dev
```

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

Build output: dist/. The repository already has Git initialized in its parent workspace. No remote was created.

## Structure

```text
src/
  components/theme/  Theme provider and accessible three-option toggle
  components/ui/     Buttons, cards, section primitives, ContentGate
  content/           Profile, contacts, education, skills, and empty collections
  hooks/             Theme access and page metadata
  layouts/           Shared header, main, and footer
  pages/             Lazy-loaded homepage, project placeholder, and 404
  sections/          Reserved for later homepage sections
  styles/            Semantic tokens, Tailwind theme, and global components
  types/             Shared content contracts
  utils/             Content visibility helpers
  assets/            Future local artwork and responsive images
public/
  resume/            Place the existing PDF here
  favicon.svg
  robots.txt
```

## Content

All portfolio information lives in typed src/content files. Projects, experience, and certifications are empty arrays. Do not invent entries. ContentGate and hasContent prevent empty collections from producing sections; use them when implementing collection sections in later phases. No full portfolio sections are implemented yet.

Project routes use /projects/:slug and look up src/content/projects.ts. An unknown slug displays an explicit missing-project placeholder. All other unknown paths render the 404 page. These client-rendered states do not set HTTP response status codes; revisit rendering strategy during deployment quality work if server-side SEO is required.

## Design and themes

src/styles/tokens.css defines the five exact base colors, semantic page/surface/ink/muted/line/accent tokens, fonts, spacing, border width, hard shadows, radius, breakpoints, and motion timing. Tailwind uses @import, @theme, and the official @tailwindcss/vite plugin; no legacy Tailwind configuration is needed.

Use semantic colors for content surfaces and text; use the fixed palette for accent panels with charcoal text. Dark mode switches semantic values through data-theme. The mr-theme localStorage key persists an explicit light/dark preference. System mode removes the override and follows OS changes live. An early script prevents a light-theme flash. Storage failures fall back gracefully. Reduced-motion preferences disable transitions and the decorative card rotation. Hover effects apply only on precise pointing devices.

## Resume

Place the real file at public/resume/Mohammed_Rajabi_CV.pdf. The download is gated by a Vite-time filesystem check. Restart the dev server or rebuild after adding/removing the PDF. No fake PDF or broken download is provided.

## Quality and deployment roadmap

The foundation includes semantic HTML, a skip link, visible keyboard focus, accessible theme names and pressed states, live button feedback, route metadata, Open Graph title/description/type, lazy route chunks, local fonts, robots.txt, and a Vercel SPA rewrite that excludes file paths. No production URL is assumed.

- Phase 2: Build the box navigation, split hero with developer cards, and illustrated introduction using these primitives and supplied content. Keep the exact headline and subtitle.
- Phase 3: Add categorized skills, large project showcase when entries exist, education, and contact. Preserve the planned order: hero, about, skills, projects, experience, education, certifications, contact. Hide empty sections.
- Phase 4: Add card hover lifts, scroll reveals, navigation transitions, and back-to-top behavior, with reduced-motion and keyboard/touch support.
- Phase 5: Verify WCAG 2.2 AA, responsive layouts, image sizing/srcset and lazy loading, keyboard behavior, performance, Lighthouse, and Vercel deployment. Once the real production origin is supplied, add canonical/og:url values, a sitemap with absolute URLs, and appropriate Person/website structured data. Finalize share imagery and page-specific metadata.

Sitemap, production-domain metadata, Lighthouse audit, and a complete accessibility audit are deliberately deferred; do not invent a domain or claim audit scores. No site has been published. Stop after Phase 1 until approval for Phase 2.

## Official setup references

- https://vite.dev/guide/
- https://tailwindcss.com/docs/installation/using-vite
- https://reactrouter.com/start/declarative/installation
- https://motion.dev/docs/react-installation

## Phase 1 verification

Executed successfully: npm installation (audit reported zero vulnerabilities), npm run typecheck, npm run lint, and npm run build. The dev server returned HTTP 200. Browser checks verified both themes, light preference persistence after reload, demo button feedback, missing-project content, and the 404 page with route-specific titles. Desktop screenshots were inspected. Mobile breakpoint rules are implemented, but device/viewport testing, Lighthouse, and a full accessibility audit remain outstanding.
