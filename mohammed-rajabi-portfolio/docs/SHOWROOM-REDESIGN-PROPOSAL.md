# Signal & Structure — redesign proposal for approval

Status: research and planning only. No implementation code, dependencies, content collections, or hosting configuration changed for this task. Existing uncommitted hero changes are retained. This proposal follows the brief's instruction to obtain approval before implementation.

## 1. Reference inspection: what was actually observed

Reference: [Reboot01 Showroom](https://showroom.reboot01.com/). Inspected in a real Chromium browser on 2 November 2026, including desktop at 1280px and mobile at 390px. This describes the live version available during inspection, not a reconstruction of an earlier version.

Coverage: the whole public homepage, its process cards, interactive walkthrough, feature collage, people accordion and footer; the Projects page and Grid/Focus/Rows/Explore controls; Spotlight; the Contact page; the submission sign-in gate; theme switching; desktop navigation; mobile menu; keyboard focus and sample interactions. No authentication or real form submission was performed.

| Observation | What gives it coherence | Adaptation for this portfolio |
| --- | --- | --- |
| Dark violet canvas, teal accent, dotted texture, white text, recurring code-shaped graphics | The same palette and graphic vocabulary connect otherwise different layouts | Keep Mohammed's graphite/cyan identity; develop an original signal-and-node motif instead of using Reboot's brackets or assets |
| Large Poppins typography; approximately 72px main heading and 64px secondary heading at the sampled desktop width | Typography establishes the visual scale and supplies much of the artwork | Retain Inter; enlarge the name and section typography while maintaining supporting text and readable line lengths |
| A sticky opening canvas is progressively covered by the next section | Depth comes from relationships between sections, not a separate effect on every card | One controlled hero-to-biography overlap, with normal document scrolling and a simpler mobile treatment |
| Individual character elements and visible intermediate reveal states in large headings | Text entrance, graphic entrance and section order feel related | A coordinated name/headline introduction and a few deliberately chosen line reveals, not letter animation on every paragraph |
| Process cards have contrasting white, violet and teal treatments, corner cutouts and a shared progress rail | Different visual weights still follow one visual grammar | Vary composition and surface emphasis; use a shared margin signal rather than copy the three-card layout or cutouts |
| The walkthrough follows a winding illuminated connector and alternates text with media | The line becomes a narrative device and directs attention between steps | A quieter signal that aligns with section markers, skills selection and the education timeline; no reproduction of the exact winding path |
| Walkthrough buttons jump to their sections; the local rating example updates visibly when selected | Visitors can participate in the explanation instead of watching a passive animation | Keep real skills selection and contact feedback as the interactive story; do not add ratings or simulated project results |
| A collage mixes unequal feature panels, outlined background type, a counter, code imagery and a graph | Changing scale breaks the repetition of an ordinary card grid | Use asymmetry in biography, skills and education; use only real portfolio facts and no achievement counters |
| People panels expand when selected; moving keyboard focus also expanded a panel | Visual response has an accessible input alternative | Focus and touch selection receive the same preview treatment as pointer interaction |
| The project-page opening uses layered screenshot artwork; its public gallery currently reports zero projects | An expressive introduction remains possible even without a populated gallery | Make the honest empty state designed and intentional without fake thumbnails or inactive project links |
| Gallery modes open focused/dialog-style views; Track currently offers only the all-tracks empty state | Presentation can change while content and controls remain recognizable | Do not add gallery modes or filters to an empty personal portfolio; prioritize one excellent showcase when real entries exist |
| Navigation uses a translucent pill, an active code-shaped treatment and a floating logo; several CSS transitions report 300ms and an ease-out curve | Small state changes repeat the main visual vocabulary | Retain a personal full-width navigation bar, add a quiet moving indicator and section numerals; do not copy the pill or logo |
| Mobile puts the hero graphic above centered text, stacks process cards and turns the walkthrough into a numbered vertical story | Mobile changes the composition, not just the font size | A name-first mobile introduction, smaller secondary graphic, single-column narrative and no long pinned scenes |
| Mobile menu is a bottom sheet over a dimmed/blurred page; Escape returned focus to the opener | Responsive navigation has its own intentional interaction design | A compact accessible sheet for existing anchors, retaining the current theme choices and keyboard behavior |
| Light mode uses white with dark violet text while retaining teal and selected contrasting panels | Theme switching preserves the art direction | Keep the existing light/dark/system model and test contrast for both themes |

### Inspection limits

- The reference gallery and Spotlight archive were empty. Actual populated-card hover effects, live project-detail routes, filtering with results and shared project transitions could not be verified. The homepage's walkthrough recordings are recordings, not evidence of live detail-route behavior.
- Submission content requires Gitea sign-in. Authenticated upload/dashboard behavior was not inspected. External institutional sites were outside the visual-reference scope.
- CSS navigation timing was inspected, but exact JavaScript timeline durations, easing curves, animation library, pointer-following behavior, magnetic effects and every hover state are unverified. Small decorative glyphs were visible; that alone does not establish how they track input.
- Reduced-motion preference emulation was not available in the connected browser. Reference reduced-motion behavior and real touch-device performance are unverified.
- Some screenshots caught intermediate, temporarily sparse reveal states. The proposal deliberately avoids long blank gaps or delaying access to text while an animation finishes.

## 2. Existing portfolio audit

The existing application is a sound foundation. React 19, TypeScript 6, Vite 8, Tailwind 4, React Router 8, Motion 14, Lucide and locally served Inter are already configured. Shared routes are used for client rendering and build-time prerendering. The current presentation is consistent and readable, but sections mostly share the same container/card rhythm and their motion is largely independent.

Current structure:

- `src/content/`: typed profile, skills, education, contact, project and section data. Keep these as the source of truth.
- `src/routes.tsx`, `src/App.tsx`, `src/entry-server.tsx`: homepage, `/projects/:slug`, not-found handling, lazy routes and server rendering.
- `src/layouts/RootLayout.tsx`: skip link, navigation, main landmark, footer and Back to Top.
- `src/components/navigation/`: active-section detection, hash navigation, focus/offset handling, responsive menu and scroll control.
- `src/components/theme/`: persisted light/dark/system preferences, live system subscriptions and deterministic server snapshots. `public/theme-init.js` applies the initial theme early.
- `src/components/skills/SkillsTabs.tsx`: functioning keyboard tabs, five categories, all 21 skills; this behavior should survive a visual replacement.
- `src/components/projects/`: real-content templates, safe optional links, image failure states, detail pages and technology tags.
- `src/components/contact/`: correct contact destinations and pending/success/error/manual-copy feedback.
- `src/styles/`: semantic theme tokens, layout layers, micro-interactions, simple scroll-driven CSS reveals and reduced-motion fallbacks.
- `scripts/prerender.mjs`, `src/content/seo.ts`, `usePageMetadata.ts`, `vercel.json`: crawlable static output, page metadata, confirmed Person schema, origin-gated sitemap/canonical output, CSP and static 404 configuration.

A local production preview was visually inspected on desktop and mobile. No new code validation or Lighthouse benchmark is claimed in this planning task. Existing reports are historical; a fresh baseline is part of implementation.

### Non-negotiable content constraints

The latest hero stays: the greeting, **Mohammed Rajabi** as the dominant name, **Beyond Code. Building Solutions That Matter.**, **Software Developer**, and the current supplied description. Do not restore the old hero wording.

Keep the exact biography, all 21 skills and their five categories, both expected education records, GPA 3.7 only for Bahrain Polytechnic, and all confirmed contact destinations. Developer/cybersecurity positioning continues through the biography, capabilities and education; it does not require inventing a cybersecurity job title or credential.

Projects, experience and certifications currently have empty collections. Projects remain an honest visible empty state; experience and certifications remain hidden. The genuine resume is absent, so its download stays hidden. Do not add fake work, client logos, testimonials, employment, credentials, completion claims or performance statistics.

## 3. Recommended creative direction: Signal & Structure

The portfolio should feel like a personal interactive editorial: Mohammed introduces himself, reveals how he thinks, shows his capabilities, presents real work when available, and invites a conversation.

A thin cyan signal moves through an original geometric field, becomes a margin marker, connects the skills index, aligns with the education timeline, and resolves into the contact underline. It is one visual thread with several purposeful states, not a full-page animated background.

Keep the exact existing dark palette: background `#0B141A`, surfaces `#152630`, accent `#40C9E8`, secondary `#85AFC4`, text `#F0F9FC`. Retain the existing accessible light palette. Add sparse static dot/line texture and a few large outline words only where they help composition. Do not introduce Reboot's purple brand, brackets, portraits, screenshots or logos.

Use Inter throughout. Proposed desktop scale: name roughly 96–128px on wide screens, section display headings 64–88px, secondary hero line 32–48px, body 16–18px. These are responsive ranges, not fixed sizes. Mobile name roughly 48–64px with natural wrapping, section headings 36–44px and body at least 16px for primary prose. Supporting content remains around a 1200px maximum width; decorative framing can extend beyond it without horizontal overflow.

## 4. Section-by-section experience

| Section | Proposed composition and behavior | Mobile / reduced-motion treatment |
| --- | --- | --- |
| Header and navigation | Personal name/monogram left, numbered section links right, a slim active marker. The header becomes visually quieter while scrolling. Keep all current anchors and theme choices. Mobile menu uses a bottom sheet with correct dialog semantics, focus containment, Escape/outside close and focus restoration. | Large touch targets, a scrollable sheet if text is enlarged, no hover dependency. Reduced motion uses immediate state changes. |
| Hero | Name-led editorial opening spanning the composition, with the existing headline and introduction below. Replace the continuously orbiting cube with an original geometric field related to the initials MR. A coordinated short entrance settles type, then lines and nodes, then CTA accents. On desktop, the graphic shifts slightly as the next section approaches. | Content comes first, graphic follows at a smaller scale. No pinned mobile hero, cursor requirement, endless spinning or blocking loader. All text remains visible without JavaScript. |
| About | Preserve the complete biography as readable prose. Replace three equal quick-fact cards with an asymmetric composition: a large heading, biography and three existing interest labels aligned to the shared signal. A short desktop sticky graphic changes emphasis as development, cybersecurity and learning enter view. | Normal stacked reading order. All biography sentences remain readable; emphasis changes must not dim body text below contrast requirements. Sticky behavior is removed for narrow or short viewports. |
| Skills | A capability index rather than a card grid: five substantial category selectors on one side and a shared skills stage on the other. Selection reveals the real badges and adjusts the signal geometry. Honest skill counts may be derived from existing data; no ratings or proficiency levels. Retain tab roles, keyboard wrapping, Home/End, focus and panel relationships. | Controls wrap or stack and remain labelled. No drag gesture is required. Panel changes become immediate with reduced motion. |
| Featured projects | A large editorial section title and spacious preview-led entries, one strong project composition at a time rather than repeated small tiles. Each genuine entry supports a real screenshot, summary, tags and existing links. Preview crop changes, a restrained image scale and an animated details underline respond equally to hover/focus. | Screenshot and all actions remain visible without hover. Items become normal single-column entries; no forced horizontal scroll or gallery mode switcher. |
| Current project empty state | An intentional open frame and oversized section number, with the existing truthful empty-state wording. The frame joins the shared signal as it enters. No fake thumbnails, loading skeletons, disabled sample links or fabricated project statistics. | Compact static frame with readable copy. The design is considered complete even while the collection is empty. |
| Project details | Keep `/projects/:slug`, direct refresh behavior and all conditional fields. Use an oversized title, generous overview, large real media and a clear return link. Preserve context through color, project numbering and a brief header entrance. Do not make navigation wait for a cinematic exit. | Predictable document flow, useful image dimensions/alt text, safe optional links and the existing failed-image fallback. |
| Education | Turn the existing timeline into a quieter editorial chapter: large dates in one column and institution/qualification/status in another. The shared signal draws along the timeline as each record reaches view. Both programs remain explicitly expected/in progress. | One-column timeline, no pinning or draggable interaction. Static line for reduced motion. |
| Contact and footer | A full-width closing composition with the existing contact heading and a large personal email action. The signal ends as an underline/endpoint beside the email. Keep Copy email, success/failure/manual selection, GitHub, LinkedIn and Back to Top. Footer uses the name/monogram, not a fictional agency sign-off. | Stable targets, readable email wrapping and no new form/backend. Focus stays where it belongs during clipboard feedback. |

The headline and semantic order remain personal and recruiter-friendly. The visual story supports the content; it does not present an invented agency process or imply completed client work.

## 5. Motion priorities and proposed timing

These are proposed specifications, not claimed measurements of the reference.

| Priority | Interaction | Proposed limits |
| --- | --- | --- |
| 1 | Coordinated hero entrance | Approximately 600–900ms total; name first, headline/graphic following; 35–55ms text-group staggering where useful. Never block CTA access. |
| 1 | Hero-to-About continuity | A short desktop overlap and graphic transform linked to natural scrolling. Decorative translation capped around 24–40px. Avoid a long artificial scroll runway. |
| 1 | Skills-stage selection | Approximately 220–320ms; deliberate geometry and badge transition. No automatic category cycling. |
| 1 | Project preview response | Approximately 250–400ms, image scale no more than about 1.03, small framing/underline changes. Equivalent keyboard feedback and full touch access. |
| 2 | About chapter emphasis / education line | A bounded scroll-linked scene with normal reading order. At most one short desktop storytelling scene; disable pinning on mobile, short screens and reduced motion. |
| 2 | Menu and theme feedback | Approximately 180–300ms. Animate local surfaces/indicators without a whole-screen flashing theme wipe. |
| 2 | Contact action | Icon/underline movement of approximately 4–6px; keep the clickable target and focus ring stationary. This supplies magnetic-like feedback without a moving target. |

Favor smooth ease-out transitions, not strong elastic/bounce effects. Avoid simultaneous competing entrance, hover and scroll animations on the same property. No custom cursor, looping marquee, autoplay background video or decorative number counters are required.

## 6. Recommended technology and lifecycle strategy

Retain React, TypeScript, Vite, Tailwind, React Router, Lucide, Inter and the existing static rendering pipeline.

Recommend **GSAP + ScrollTrigger as the single JavaScript choreography engine**, with CSS for ordinary hover/focus/theme states. The coordinated timelines and bounded scroll scenes justify it. ScrollTrigger supports scroll-linked animation and pinning; [official documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) covers these mechanisms.

Do not add Lenis or ScrollSmoother: native scrolling already works with section anchors, keyboard input, focus and Back to Top. Do not add Three.js, a second smooth-scroll engine or a new UI framework.

As the new scenes replace existing Motion wrappers, move small UI transitions to CSS and remove Motion only once its remaining imports are gone and behavior is verified. The finished design should not ship GSAP and Motion merely to animate the same UI. This is a targeted animation migration, not a routing or application-framework rewrite.

Use a small scoped scene hook, not a large animation framework. [GSAP context](https://gsap.com/docs/v3/GSAP/gsap.context()/) provides scoped animation collection/reversion, and [matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/) supports responsive conditions and cleanup. Scene initialization must be client-only and safe under React StrictMode, SSR, route changes and resize.

Specific safeguards:

- Render real text and content first. Dynamic animation loading or failure must never leave a blank hero or hidden biography.
- Keep decorative graphics hidden from assistive technology. Split visual text must retain one coherent accessible name and sensible heading structure.
- Use scoped cleanup; do not globally kill unrelated scroll triggers. Disconnect observers/listeners and cancel pointer frames on unmount.
- Use DOM transforms directly for frame-by-frame motion, not React state updates on every scroll tick.
- Refresh measured scenes when fonts/media dimensions actually settle. Reserve media space and avoid repeated layout measurements in scroll callbacks.
- Build separate desktop/mobile conditions and respond to reduced-motion changes. Disable parallax, pinning, tilt and text choreography when reduced motion is requested; every section stays present and usable.
- Animate only an original small SVG field and bounded paths. Use static texture; avoid a full-window canvas particle system unless a later measured need justifies it.
- Keep the early theme script and CSP intact. No third-party scripts, asset origins or header relaxation are needed for this design.

## 7. What is preserved, replaced or restructured

| Preserve | Replace / restructure |
| --- | --- |
| Latest name-first hero wording and exact biography | Hero composition and decorative SVG geometry |
| All original typed collections and content contracts | Repetitive section/card rhythm and generic wrappers where no longer useful |
| Existing routes, native links, project URLs and static 404s | Homepage project grid presentation, without changing the project model |
| Skill category data and keyboard/ARIA behavior | Skills visual arrangement and transitions |
| Theme preference/system subscriptions and early initialization | Theme-control styling and local state feedback |
| Clipboard utility, feedback semantics, selection fallback and contact destinations | Contact layout and visual action treatment |
| Resume gate and hidden empty sections | No new experience/certification/achievement sections |
| Prerendering, metadata/schema, robots/sitemap gating and security headers | Social artwork may be refreshed to the approved identity; no unrelated metadata/content rewrite |
| Existing tests and meaningful behavioral coverage | Tests tied to obsolete layout class names can be updated while keeping their original behavioral assertions |

## 8. Implementation phases after approval

| Phase | Specific files / proposed additions | Verification gate |
| --- | --- | --- |
| A. Baseline and boundaries | Audit the existing diff without resetting it; `docs/`, `tests/`, package scripts; capture current routes/content/theme states and baseline measurements | Existing typecheck/lint/content/interaction/build/production checks pass or pre-existing failures are recorded; genuine content and hidden gates are locked down |
| B. Visual and motion foundation | `styles/tokens.css`, `global.css`; evolve `components/AnimationProvider.tsx` and add a scoped `hooks/useSceneTimeline.ts` / reduced-motion helper as needed; package manifests for GSAP | No SSR/window errors, no empty no-JS content, cleanup passes repeated mounting/navigation, reduced-motion conditions work |
| C. Hero and navigation | `HeroSection.tsx`, `TechnologyVisual.tsx`, `SiteHeader.tsx`, theme-control styling; a small mobile sheet component only if it simplifies ownership | Name remains dominant; latest exact copy, CTA destinations and CV gate unchanged; desktop/mobile menu, Escape, Tab and focus restoration work |
| D. Biography and capabilities | `AboutSection.tsx`, `QuickFacts.tsx`, `SkillsSection.tsx`, `SkillsTabs.tsx`, relevant shared styles | Exact biography and all 21 skills preserved; every category keyboard-accessible; sticky scene has a short-screen fallback; no opacity/contrast regression |
| E. Work and detail pages | `ProjectsSection.tsx`, `ProjectShowcase.tsx`, `ProjectMedia.tsx`, `ProjectDetails.tsx`, `ProjectPage.tsx` | Honest empty production state; isolated real-shaped fixtures exercise one/multiple entries, optional URLs, missing/failed images and navigation; fixtures never ship |
| F. Education and closing | `EducationSection.tsx`, `EducationCard.tsx`, `ContactSection.tsx`, `ContactCard.tsx`, `BackToTop.tsx`, `RootLayout.tsx` | Expected education/GPA unchanged; clipboard pending/success/error/manual focus preserved; external links safe; Back to Top works; new visuals complete the same signal motif |
| G. Consolidation and visual QA | Remove obsolete animation imports/styles and Motion dependency only when unused; `tests/`, `scripts/`, README and QA documentation | Full checks, browser matrix, performance comparison and honest report of remaining limits; no push/deployment |

No genuine-project data is required to implement and verify the template safely. A populated public project showcase remains gated on real supplied content. Approval of this plan authorizes these local implementation phases, not publication or invented content.

## 9. Acceptance criteria and review matrix

Run `npm run typecheck`, `npm run lint`, `npm run test:content`, `npm run test:interactions`, `npm run build`, and `npm run test:production`. Retain the existing social-generation/security-sync procedures when their inputs change. Record `npm audit` findings without forcing unrelated breaking updates.

Browser review at 360, 390, 768, 1024, 1440 and 1920px, plus short laptop heights. Inspect both themes, System behavior, 200% text sizing, keyboard-only navigation, anchor/focus offsets, route refresh and unknown routes. Test mouse, focus and touch equivalents; do not infer screen-reader or real-device success from a screenshot.

Motion review includes quick scrolling, reversing direction, resizing, opening a menu during a scene, jumping past a sticky section using a nav anchor, Back/Forward navigation and repeated route mounts. No trapped scrolling, pinned overlap, detached focus or lingering observers may remain.

Measure Lighthouse mobile and desktop after a fresh build on a quiet machine. Aim for performance 90+, accessibility/best-practices/SEO 95+, CLS at most 0.1 and lab LCP around 2.5s or better; treat these as targets, not guarantees or field INP measurements. Compare route transfer and scripting with a fresh baseline, not an old report from before the hero update. If an effect causes a meaningful regression, simplify that effect before adding optimization machinery.

Implementation is complete only when the actual site has been inspected and discrepancies fixed. The planning task itself adds this document only; it does not claim those future checks have run.

## Approval requested

Approve **Signal & Structure**, its name-first identity and cyan continuity motif, the section plan, the GSAP/ScrollTrigger migration with native scrolling, and the phased local implementation. Application code will remain unchanged until that approval. Deployment and pushes require separate explicit approval.
