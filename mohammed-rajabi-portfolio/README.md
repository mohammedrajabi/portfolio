# Mohammed Rajabi — Developer Portfolio

Phase 4 of 5 is implemented. The homepage now contains Hero, About Me, Skills & Technologies, Featured Projects, Education, and Contact, in that order. Contact has the three confirmed profiles, Clipboard API feedback, and a manual-copy fallback. A floating Back to Top control and interaction refinements complete this phase. Projects remain truthfully empty; experience and certifications stay hidden. No backend, new dependencies, Phase 5 implementation, or deployment was added.

## Run and validate

```powershell
cd C:\Users\moham\My-Test-Projects\portfolio\mohammed-rajabi-portfolio
npm ci
npm run dev
```

Use the Local URL printed by Vite.

```sh
npm run typecheck
npm run lint
npm run test:content
npm run build
npm run preview
```

The stack and dependencies are unchanged: React 19, TypeScript 6 in strict mode, Vite 8, Tailwind CSS 4 with its official Vite plugin, React Router 8, Motion 14, Lucide React, ESLint, and npm. Fonts (Bricolage Grotesque and DM Sans) are local Fontsource assets. Validation uses Node 24.13.1. Exact dependencies remain in the lockfile. Build output is `dist/`.

## Architecture and component structure

```text
src/
  content/             Typed portfolio data and interface copy
  types/content.ts     Shared content contracts
  components/
    contact/
      ContactCard.tsx         Fixed-palette cards and exact confirmed links
      CopyEmailButton.tsx     Pending/success/error Clipboard API interaction
      CopyFeedback.tsx       Live status and selectable manual-copy fallback
    navigation/BackToTop.tsx Floating scroll control with threshold-based updates
    skills/SkillCategoryCard.tsx
    projects/
      ProjectShowcase.tsx    Alternating large screenshot/copy rows
      ProjectDetails.tsx     Simple details layout
      ProjectMedia.tsx       Responsive image, lazy loading, truthful fallback
      ProjectLinks.tsx       Optional repository/demo links
      TechnologyTags.tsx
    journey/
      EducationCard.tsx
      ExperienceCard.tsx
    certifications/CertificationCard.tsx
    ui/CardEntrance.tsx     Brief transform/opacity entry, reduced-motion support
    ui/                     Existing reusable card/button/heading/container/gate
    navigation/             Existing sticky header and section navigation
    theme/                  Existing persistent light/dark/system themes
    hero/, about/           Preserved Phase 2 compositions
  sections/
    HeroSection.tsx, AboutSection.tsx   Preserved
    SkillsSection.tsx, ProjectsSection.tsx
    EducationSection.tsx, ExperienceSection.tsx, JourneySections.tsx
    CertificationsSection.tsx, ContactSection.tsx
  pages/               Homepage, project details/not-found, general 404
  styles/
    tokens.css         Existing exact palette and semantic theme values
    global.css         Existing core interface styles
    sections.css       Phase 3 section, card, showcase, and detail layouts
    interactions.css   Contact, floating control, and mobile-menu transitions
  hooks/               Existing metadata, active-section, and theme hooks
  utils/               Content gates, project ordering/URLs, date formatting
scripts/check-content.mjs   Vite SSR runner for isolated rendering checks
tests/content-rendering.tsx Rendering checks; fixtures never enter site content
public/                    Favicon, robots.txt, real resume and future screenshots
```

The original hero, About section, theme provider, design tokens, and data-driven portfolio sections remain the shared foundation. Phase 4 adds Contact, clipboard feedback, Back to Top, and targeted interaction refinements. Existing project templates and hidden-section gates remain functional, and dependency versions are unchanged. The `test:content` script covers content rendering and the new clipboard behavior.

## Editing skills and education

Edit `src/content/skills.ts`. Category and skill names are rendered directly from this data; no levels, percentages, or years of experience are inferred. Category accents/icons and optional technology icons live in `SkillCategoryCard.tsx`. These are representative Lucide symbols rather than third-party brand logos. The five approved categories contain exactly 21 skills. Update the approved-content assertions in the rendering checks if the user later authorizes a different skill list.

Edit `src/content/education.ts`. Each record has an ID, institution, qualification, display period, status, and optional numeric GPA. Preserve the expected-completion qualifier in the period. The current records show Bahrain Polytechnic (2024–2029 expected, GPA 3.7) and Reboot Programming Institute (2025–2027 expected, no GPA), both currently studying. GPA renders only when provided. Education uses two cards side by side on desktop and stacks on narrow screens.

## Adding a real project

1. Add a typed entry to the exported array in `src/content/projects.ts`, using confirmed information only. Leave the array empty until the project details are supplied.
2. Provide the required fields below. Use a unique, stable, lowercase kebab-case slug (letters/numbers/hyphens, no dots or slashes). This works with both the Router path and the existing Vercel file-excluding SPA rewrite.
3. Set `featured: true` for homepage display. Featured entries sort by ascending `displayOrder`, then title as a tie-breaker. Unfeatured projects remain accessible at their real detail route but are not listed in Featured Projects.
4. Add screenshots and external links only if available. Missing fields do not create broken buttons or placeholder URLs.
5. Run all checks and inspect both the homepage showcase and `/projects/<your-real-slug>`, including a refresh. No UI component or route declaration needs editing.

| Field                      | Purpose                                                                    |
| -------------------------- | -------------------------------------------------------------------------- |
| `id`                       | Unique internal ID and card heading identifier                             |
| `slug`                     | Unique URL segment; detail URLs are created centrally with `projectPath()` |
| `title`                    | Project title and per-project page title                                   |
| `summary`                  | Short description for showcase, detail introduction, and SEO description   |
| `description`              | Full overview; plain text with line breaks supported                       |
| `technologies`             | List of real technologies; may be empty                                    |
| `featured`                 | Whether to include the project in the homepage showcase                    |
| `displayOrder`             | Numeric homepage ordering value                                            |
| `category`                 | Optional category label                                                    |
| `screenshots`              | Optional array of image assets; can be omitted or empty                    |
| `repositoryUrl`, `liveUrl` | Optional real HTTP(S) links; no link renders when absent/invalid           |
| `completedAt`              | Optional ISO date/year/month, displayed in English                         |
| `features`                 | Optional supplied key features; omitted section when empty                 |

`summary` and `description` retain the original Phase 1 field names; they are the short and full descriptions. No existing project content needed migration because the collection is empty.

### Screenshots

Place real screenshots under `public/projects/<slug>/` and reference them with an absolute site path beginning `/projects/`. Images are not required. Each screenshot asset needs `src`, meaningful `alt`, and its real intrinsic `width` and `height`. Optional `srcSet` and `sizes` support responsive variants you actually provide; widths in `srcSet` must match those files.

The first screenshot is the showcase/detail cover. Additional screenshots appear in a simple detail gallery. Fixed aspect-ratio containers reserve space; `object-fit: contain` preserves the full image. Homepage/gallery images load lazily; the detail cover loads eagerly with high fetch priority. Images decode asynchronously. A missing/failed image uses an intentional geometric fallback labeled “No screenshot provided” or “Preview image unavailable”; it never invents a screenshot. Keep image files compressed and appropriately sized. Optional credential images share this media renderer.

### Empty and unknown states

Featured Projects remains visible with an honest empty state even while its collection is empty. The hero **Explore Projects** link is now active and navigates to `/#projects`. There are no fake project cards or links to nonexistent slugs. `/projects/:slug` looks up real static data; an unknown slug displays Project Not Found with Back to Projects navigation. The existing general 404 page is preserved.

Project metadata uses each real title and summary. No structured data or project metadata is generated for fabricated entries. Client-rendered not-found pages still return the host's SPA response status rather than setting HTTP 404 server responses.

## Enabling experience and certifications

Add only genuine entries to the existing typed arrays. Their section components are already integrated and marked implemented in `src/content/home.ts`; adding content automatically enables the section and its navigation link. Empty arrays render neither a section wrapper nor a navigation item.

Experience entries contain `id`, `role`, `organization`, `startDate`, optional `endDate`, `description`, and optional `responsibilities`. Use ISO dates such as a real year/month; omitted end date displays Present. `JourneySections` places Work Experience and Education in two desktop columns when both have content, and stacks them on smaller screens. Education takes the available width with its own two-card grid while experience is empty. No structural rewrite is needed to enable work records.

Certification/achievement entries contain `id`, `title`, `issuer`, `date`, `category` (`certification` or `achievement`), optional `image`, and optional `credentialUrl`. Their reusable Certificate Grid adapts from one to three columns. A missing badge uses a neutral award symbol rather than a fake credential. Verification links only render when a real HTTP(S) URL is supplied.

## Navigation, themes, and accessibility

The ordered section registry remains the source of navigation eligibility. `implemented` plus `hasContent` is the normal gate. Projects alone sets `showWhenEmpty: true`, because its empty state is intentional. Contact is implemented and enabled through its populated typed collection. Do not use this exception to reveal empty experience/certification sections.

All added homepage section IDs match their navigation entries and accept programmatic focus. Existing cross-route hash navigation, sticky-header offset measurement, active-section updates, mobile-menu focus/Escape/outside behavior, skip link, and theme persistence are preserved. Cards have semantic headings and lists; decorative icons are hidden from assistive technology. External project links announce opening a new tab and use `noopener noreferrer`.

New cards reuse semantic surfaces/text/borders and fixed palette accents. Motion entries affect opacity/transform only, with capped stagger delays and no loops. CSS lifts apply only to hover-capable fine pointers with no reduced-motion preference. Reduced-motion users receive static cards and immediate anchor scrolling. Important information never depends on hover.

The real resume remains gated by the existing Vite-time file check at `public/resume/Mohammed_Rajabi_CV.pdf`. Restart/rebuild after adding or removing it. Contact Me now uses a Router link to /#contact; the email action lives in its contact card.

## Validation and limits

The content-rendering suite uses isolated test-only values to exercise project media/link/feature branches and future experience/certificate cards without adding fake entries to the portfolio. It checks the approved skills and education, section gates, featured ordering, encoded links, optional fields, image attributes, and safe external URL protocols. Fixture-only image/URL strings are never requested by the browser or imported into the site.

Production deployment and Lighthouse remain outside Phase 4. A real populated-project browser review/hosted refresh requires supplied project data; the templates are covered through isolated rendering checks. Full WCAG 2.2 AA auditing, screen-reader and real-touch testing, image performance with real screenshots, sitemap/production-origin metadata, and structured data remain future quality work. No production domain or audit scores are invented.

## Remaining Phase 5 work (not started)

Perform the full accessibility and performance audits, Lighthouse checks, real-device and screen-reader validation, final SEO/share assets, real-image optimization, and production routing/status verification. Once a real production origin is supplied, finalize canonical metadata, sitemap, structured data, and deployment readiness. Obtain real project information and the existing resume as content becomes available. Do not deploy or begin Phase 5 without explicit instruction.

## Official setup references

- https://vite.dev/guide/
- https://tailwindcss.com/docs/installation/using-vite
- https://reactrouter.com/start/declarative/installation
- https://motion.dev/docs/react-installation

### Historical Phase 3 checks

- Passed `npm run typecheck`, `npm run lint`, `npm run test:content`, and `npm run build`; `git diff --check` reported no whitespace errors.
- Browser verified the exact five categories/21 skills, both expected education periods, the single supplied GPA, the project empty state, and no visible experience/certification/Contact sections or links.
- Layout checks passed at 320, 390, 768, 1024, and 1440px with no document, header, or new-card horizontal overflow. Desktop and narrow-phone layouts were visually inspected in both themes.
- Verified mobile-menu initial focus, Escape restoration, keyboard selection of Education, active-section states, sticky-header clearance, hero Explore Projects, and cross-route Back to Projects.
- Verified theme persistence after reload, unknown project direct navigation and refresh, existing general 404/return-home behavior, no invalid homepage anchors, no missing visible images, and a clean browser error console. The absent real resume still produces no download link.
- Reduced-motion support was reviewed in the Motion/CSS code. The browser exposes viewport controls but no media-emulation control, so a live reduced-motion preference test remains unverified. No populated real-project route could be reviewed/refreshed in the browser because the approved collection is empty; isolated rendering tests cover its optional content paths. No hosted Vercel refresh or deployment was performed.

## Phase 4 contact and interactions

Edit `src/content/contact.ts` to update confirmed contact details. Each typed record contains a stable `kind`, `label`, display `value`, actual `href`, short `description`, and palette `accent`. Email is yellow, GitHub blue, and LinkedIn coral. The confirmed addresses were preserved exactly. Section copy is in `src/content/sections.ts`; no profile statistics or inferred metadata are fetched.

The section heading is **Let's Connect!** and the desktop/mobile registry now includes Contact. The hero Contact Me action scrolls/focuses `/#contact`, including when section navigation originates from project routes. Cards use real links and buttons rather than nested or fake clickable surfaces. Icons are decorative and focus indicators stay charcoal against the fixed light accent surfaces in either theme.

- The email address is a semantic `mailto:` link. No email is sent automatically.
- Copy email calls `navigator.clipboard.writeText` through `utils/clipboard.ts` during the click event. The button displays pending state, remains keyboard-focusable with aria-disabled, and ignores repeated activation during the request. Success is announced only after the returned promise resolves. There is no optimistic success notification.
- Denied/unavailable/failed writes reveal a read-only input containing the same email, focus/select it for manual copying, and announce useful instructions. The email link remains available. The fallback does not depend on deprecated copy APIs.
- A stable `role=status` region with polite, atomic announcements handles pending/success/error feedback. Feedback remains visible rather than disappearing on a short timer.
- GitHub and LinkedIn links use the exact supplied URLs, open in new tabs with `noopener noreferrer`, and announce the new-tab behavior in their accessible names. Browser checks inspect these destinations without signing in or fetching profile metadata.

### Resume installation

The real PDF is currently **absent**, so no Download CV link is rendered. Place the existing PDF at:

```text
C:\Users\moham\My-Test-Projects\portfolio\mohammed-rajabi-portfolio\public\resume\Mohammed_Rajabi_CV.pdf
```

The canonical URL and download filename now live in `src/content/resume.ts`. `profile.resume` reuses that object, and `vite.config.ts` checks the corresponding public file at dev-server start/build time. Restart Vite or rebuild after installing or removing the PDF. The hero's native anchor uses that URL and the configured `download` filename only when the file exists. No fake/empty PDF or resume service was created.

### Back to Top

`components/navigation/BackToTop.tsx` lives in the shared root layout. It appears after scrolling more than the larger of 400px or 60% of the viewport height. It stays absent near the top. A passive scroll listener schedules at most one check per animation frame; React visibility state updates only when the threshold result changes. Scroll/resize listeners and scheduled frames are cleaned up.

A native button with an upward icon and the accessible name Back to top supports keyboard activation. On the homepage it replaces the URL hash with `#home`, reusing reduced-motion-aware section navigation and moving focus to the hero. On other routes it scrolls to zero and focuses main content. Motion provides a brief opacity/transform entrance and exit, or an immediate transition with reduced motion. Safe-area positioning, extra footer clearance, and scroll padding keep the floating control clear of the end of the page and focused content.

### Interaction and theme refinements

Mobile navigation keeps its existing focus, Escape, outside-click, and route behavior, with progressive CSS opacity/transform/display transitions. A closed panel is both hidden and inert, so transition timing never leaves invisible links focusable. Browsers lacking discrete display transitions still have a functioning immediate menu. Existing pressed-button, card hover, and hero motion patterns are preserved; contact actions use the same hard-shadow feedback. Contact cards lift only on fine, hover-capable pointers when reduced motion is not requested. Education's decorative outward arrow was replaced with a book icon to avoid implying a nonexistent link.

The functioning ThemeProvider was preserved: explicit preference persists, System removes the override and follows its media-query change listener, and the early script applies the initial theme without adding distracting global theme animations. Fixed contact accents retain charcoal text in both themes. No custom cursor, tracker, external service, or continuous animation loop was added.

### Phase 4 files

Created: `src/content/resume.ts`, `src/utils/clipboard.ts`, `src/components/contact/ContactCard.tsx`, `CopyEmailButton.tsx`, `CopyFeedback.tsx`, `src/components/navigation/BackToTop.tsx`, `src/sections/ContactSection.tsx`, and `src/styles/interactions.css`.

Updated: contact/content types and modules, section registry/copy, profile resume reference, Hero/HomePage/RootLayout, SiteHeader, EducationCard, global styles/imports, Vite resume check, rendering checks/runner, and the README files. Dependency manifests and all real skills/education/project/experience/certification collections were preserved.

### Phase 4 validation scope

`npm run test:content` now also checks the exact contact destinations and accents, secure link attributes, initial/failed copy feedback markup, manual-copy instructions, and clipboard pending/success/rejection/unavailable behavior with controlled test adapters. These tests do not insert fake data into the portfolio or change browser permissions. The script awaits the async assertions before closing its Vite SSR runner.

Known verification limits: a live browser permission-denial scenario and native OS clipboard paste could not be independently exercised; the browser reported a successful Clipboard API promise and showed the resulting confirmation, while the failure paths are covered in isolated tests. This browser has no media-emulation control, so live OS theme-change and reduced-motion preference changes remain unverified; their existing media listeners and conditional branches are retained/reviewed. External destination attributes are checked, but mail-client delivery and authenticated external-profile availability are not asserted. The real-resume-present download path remains unverified until the genuine PDF is supplied. Full WCAG 2.2 AA compliance and Lighthouse results require Phase 5 audits and are not claimed.

### Phase 4 checks performed

- Passed `npm run typecheck`, `npm run lint`, `npm run test:content`, and `npm run build` after the final keyboard-focus refinement.
- Browser verified the six visible sections in the approved order, exact mailto/GitHub/LinkedIn destinations, secure external-link attributes, the hero Contact Me anchor, and desktop/mobile Contact navigation with sticky-header clearance.
- Clipboard API success feedback was observed with mouse and Enter activation. Keyboard focus stayed on the copy button. Controlled tests covered pending writes (no premature success), successful resolution, rejected writes, unavailable API, and accessible manual-copy fallback markup. Native OS paste and live permission denial remain unverified as noted above.
- Back to Top was absent at page top, appeared after scrolling, returned to zero with Enter, focused the hero, and disappeared again. The threshold listener uses boundary-only state updates and cleanup.
- Layout checks passed at 320, 390, 768, 1024, and 1440px without document, header, or Contact-card overflow. No Contact action intersected the floating control in the sampled layouts. Both palette themes were inspected.
- Verified dark preference after refresh, System fallback matching the current OS preference, mobile menu initial focus/Tab/Enter/Escape, hidden/inert closed navigation, project-not-found and 404 routes, cross-route Contact navigation, and a clean application error console.
- Confirmed no resume download while the real file is missing, no unresolved homepage anchors, and no rendered experience or certification sections. Their collections remain empty. No new dependencies or deployment were added.
