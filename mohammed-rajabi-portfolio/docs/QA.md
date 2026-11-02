# Phase 5 QA and release preparation

Audit date: 29 October 2026. Local Windows environment, Node 24.13.1, Lighthouse 13.6.0, headless Chrome 156. No deployment, repository creation, push, domain purchase, or hosting change was performed.

## Assessment

The production build and automated checks pass. The code is prepared for an explicitly authorized staging deployment after the real `SITE_URL` is configured. **Final production release acceptance is not complete:** the final mobile performance goal is unmet, and the final responsive/manual browser matrix could not be completed because the in-app browser stopped reaching the local server. Do not interpret earlier successful samples as a full final-browser pass.

The real production origin is unknown; no canonical URL or absolute sitemap is emitted. Projects remain empty and truthful; work experience/certifications are hidden. The genuine resume PDF is absent and its download remains hidden. These content states are intentional.

## Improvements and findings addressed

- Added build-time rendering from the same real React route/content definitions. Crawlers receive actual homepage HTML and metadata; future genuine project routes receive their own HTML. Unknown routes use a noindex 404 file and local HTTP 404 responses.
- Added the requested exact title/description, OG/Twitter metadata, a 1200×630 sharing graphic, environment-based canonical/sitemap generation, and confirmed-only Person JSON-LD. Client navigation refreshes and removes route-specific metadata.
- Preserved theme initialization before page content, made server snapshots deterministic for hydration, and provided memory fallback when storage fails.
- Switched to lazy Motion features and route chunks. The initial JS entry fell from roughly 409 kB / 132 kB gzip in Phase 4 to 310.56 kB / 101.18 kB gzip. Motion features are a separate 46.58 kB / 17.82 kB gzip chunk; these figures are individual assets, not total page transfer.
- Preloaded two local Latin font assets. Inlined generated CSS (~35.51 kB / 8.10 kB gzip) and the tiny theme initializer to remove their extra blocking requests. Page content is visible in prerendered HTML before JavaScript.
- Fixed the logo's accessible-name/visible-label mismatch. Added wrapping safeguards after discovering overflow with 200% root text at 320px. The latest safeguards still need browser revalidation.
- Added static security headers, exact script hash verification, safe external URL handling without credentials, immutable hashed asset caching, ignored environment files and reproducible production/interaction/audit commands.

## Final command results

| Check | Actual result |
| --- | --- |
| `npm ci` | Passed: 323 packages installed; 324 audited; zero vulnerabilities |
| `npm run typecheck` | Passed |
| `npm run lint` | Passed with zero warnings |
| `npm run test:content` | Passed |
| `npm run test:interactions` | Passed with expected Motion reduced-motion diagnostic |
| `npm run build` | Passed; one genuine route (`/`) plus 404; no invented origin/sitemap |
| `npm run test:production` | Passed; 97 tracked/unignored text files scanned, including this report |
| `npm audit` | Passed: zero known vulnerabilities |
| `git diff --check` | Passed; Windows line-ending notices only |

The production script verifies exact metadata, one h1/main, all 21 skills, the six real sections, real anchor targets, visible SSR content, JSON-LD structure, canonical/sitemap gating, matching CSP hash, HTTP 200/404 behavior, missing-asset handling, nosniff, immutable font caching, unknown-route noindex and absence of test fixture markers from built JS/CSS. The secret scan covers obvious private-key, GitHub, AWS access-key and token patterns; this is a bounded pattern scan, not a guarantee that arbitrary secrets cannot exist. No candidates were found. No secret value is printed on failure. Actual environment files are ignored; only the public SITE_URL is injected deliberately.

## Functional coverage and limits

| Area | Evidence |
| --- | --- |
| Approved identity/content | Rendering assertions preserve exact name, headline/title, contact URLs, 21 skills and expected education/GPA; empty collections remain hidden |
| Copy email | Simulated DOM checks pending state, no premature success, correct write value, success feedback, rejection/unavailable fallback, input focus and full email selection |
| Native clipboard | **Unverified**; a resolved API and UI confirmation are not independent OS paste verification |
| Themes | Simulated live media changes, explicit stored override, System removing override, and listener cleanup pass; earlier dark refresh/System browser samples passed. Actual OS switching and blocked-storage browser scenario remain unverified |
| Resume | Real file absent; no broken download is exposed. Real download path cannot be verified until supplied |
| Projects | Honest empty state and templates covered by isolated tests; optional links/features/media branches and failed-image fallback pass. No fixture ships. Unknown project direct request returns HTTP 404 locally |
| Real project direct navigation/refresh | No genuine projects exist to exercise in a browser. Build generates each real route automatically when supplied; isolated rendering/metadata tests cover templates |
| Back to Top | Simulated scroll threshold, visibility, reduced-motion instant scroll and focus pass; earlier browser keyboard samples passed. Final smooth-scroll/mobile positioning needs manual repeat |
| Navigation | Existing menu Escape/focus, cross-route section anchors, active-section/offset logic and hidden/inert panel retained; earlier keyboard samples passed. Final complete manual regression could not run |
| External destinations | Exact URLs, safe HTTP(S) protocols/no embedded credentials and new-tab attributes checked. Mail delivery and authenticated profile availability are not asserted |

## Accessibility and browser matrix

Automated Lighthouse accessibility scored 100 on mobile and desktop, including automated contrast checks for the audited default theme. The visible-logo/name mismatch was fixed and did not recur. Semantics, landmarks, labels, live feedback, decorative icon hiding, focus styling, reduced-motion handling and mobile menu state were reviewed. There is **no claim of complete WCAG 2.2 AA compliance**; automated tooling does not prove all criteria.

Earlier manual keyboard checks covered Tab/Enter/Escape, menu focus return, contact navigation, skip/section focus and Back to Top. Earlier normal-layout samples included 320, 390, 768, 1024 and 1440px. During Phase 5, 200% text at 320px exposed real wrapping overflow, prompting safeguards. Its final browser repeat and the exact required matrix remain pending:

| Width | Final release check |
| --- | --- |
| 320px | Repeat normal layout and 200% text after wrapping changes |
| 375px | Pending |
| 430px | Pending |
| 768px | Repeat final build |
| 1024px | Repeat final build |
| 1440px | Repeat final build |

Inspect hero stacking, all skill/education/contact cards, menu, floating control overlap, focus, section offsets and document horizontal overflow at each width, in both themes. Test 200% text and reduced motion. The in-app browser supported viewport overrides but no media emulation; its final attempts failed with a local connection timeout despite the server returning HTTP 200 through the command runner. No browser policy or system protection was bypassed.

Chrome 156 ran the automated audits. Firefox and WebKit were unavailable through the connected browser tools and were not tested. Screen-reader, real touch-device, actual OS preference switching, final dark-theme automated contrast, and complete manual keyboard regression remain unverified.

## Lighthouse: actual measurements

Local production preview at `http://127.0.0.1:4173/`; fresh headless Chrome sessions, official mobile/desktop presets, simulated network/CPU throttling. These are laboratory estimates, not field measurements. Raw JSON/HTML reports are in ignored `.qa/lighthouse-mobile.*` and `.qa/lighthouse-desktop.*`; `.qa/lighthouse-summary.json` records scores and metrics.

| Final audit | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 66 | 100 | 100 | 100 | 3.471s | 0.00021 | 1104.5ms |
| Desktop | 99 | 100 | 100 | 100 | 0.573s | 0.00039 | 90ms |

Mobile's 90+ performance and ≤2.5s LCP goals are **not met** by the final measurement. CLS meets the 0.1 goal. Real-user INP was not measured; Lighthouse TBT is not INP.

Earlier Phase 5 runs scored mobile 95–97 and desktop 100, with mobile LCP ~2.61–2.74s and TBT 0–85ms. A later run overlapping compilation fell to mobile 66 and was saved as `lighthouse-mobile-concurrent-build.json`; a repeat after compilation also scored 66, so the latest lower score is retained rather than selecting a better historical result. The repeat showed ~3.22s style/layout and ~1.32s script evaluation under simulated mobile conditions, with ~42 KiB estimated unused JS. The host benchmark also changed (earlier ~3706, later ~2575), so the cause is not attributed solely to an application change. Further profiling on a quiet machine and the actual hosting environment is needed. Font preload, request removal and JS reduction were retained without redesigning the portfolio to chase scores.

## Security and hosting

The static local preview passed response/header tests. CSP permits same-origin scripts plus one exact bootstrap hash, same-origin fonts/connections, HTTPS/data images, and inline styles needed by CSS/Motion. It forbids objects, framing, and form submission. Referrer policy, nosniff, frame denial and restricted camera/mic/location/payment/clipboard-read policies are configured. Clipboard writes remain same-origin. There is no backend, authentication, analytics or credential processing.

Actual HTTPS, HSTS, CDN cache behavior, custom-domain DNS, social crawler fetching and Vercel-hosted nested refreshes remain **not run**, because deployment is expressly prohibited. Vercel's clean URL/static 404 configuration is based on current official guidance. HSTS must be verified on the eventual HTTPS host; broad preload/includeSubDomains was not added blindly.

## Files changed

- Build/routing/SEO: `index.html`, `vite.config.ts`, `src/{App,main,routes,entry-server}.tsx`, `src/vite-env.d.ts`, `src/content/seo.ts`, `src/utils/site-url.ts`, `src/hooks/usePageMetadata.ts`, homepage/project/404 pages, `scripts/prerender.mjs`, `.env.example`.
- Themes/motion/reflow: `src/components/theme/ThemeProvider.tsx`, `src/components/AnimationProvider.tsx`, `src/motion-features.ts`, developer cards, CardEntrance, BackToTop, SiteHeader, `src/styles/interactions.css`, `public/theme-init.js`.
- Assets/security: `src/assets/social-preview.svg`, `public/social-preview.png`, `src/utils/projects.ts`, `vercel.json`, `.gitignore`, social/security-sync/preview scripts.
- Tests/tooling/docs: package manifests, ESLint config, content tests, interaction runner/tests, production checks, Lighthouse script, this report and README.

## Before publication

Follow the exact future Vercel steps in README. Supply the genuine SITE_URL, repeat final manual reflow/browser acceptance and investigate the mobile performance result. After explicit approval, validate protected staging first and check actual headers/statuses/metadata before public release. Do not fill absent projects, employment, certificates or CV with invented material.

Official sources reviewed: [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [static 404 support](https://vercel.com/kb/guide/custom-404-page), [security headers](https://vercel.com/docs/cdn-security/security-headers).
