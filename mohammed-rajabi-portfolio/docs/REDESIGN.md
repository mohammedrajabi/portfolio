# Premium Dark + Modern Tech redesign

Implemented locally on 2 November 2026 in the existing React application. No deployment or push. The original Phase 5 SEO, prerendering, routing, headers, content gates and interactive behavior remain in place. `docs/QA.md` records the earlier design's historical results; this document records the redesign.

## Design implementation

- Shared tokens: exact dark background `#0B141A`, elevated surface `#152630`, accent `#40C9E8`, secondary `#85AFC4`, and primary text `#F0F9FC`. Matching light surfaces use a darker cyan for readable text; filled cyan buttons use dark text in both themes.
- Locally served variable Inter replaces the two old font packages. Only one Latin WOFF2 is emitted and preloaded. No external font request, 3D library or new animation runtime.
- Minimal full-width sticky navigation, a restrained active indicator, mobile menu and 44px theme controls. Existing focus, Escape, sticky offset and cross-route behavior are retained.
- Split hero with exact identity/headline/title and an original decorative SVG network: fine connections, nodes, orbital rings and layered geometry. Ambient animation affects transforms only and is disabled by reduced-motion CSS.
- Exact biography with three understated quick facts, using existing content.
- Five category tabs sourced from the original skills collection, preserving all 21 approved skills. Arrow keys (including wrapping), Home/End, mouse and keyboard activation, roving tab order, selected states and tab/panel relationships are implemented. Inactive panels remain in static HTML but are hidden visually and from the accessibility tree.
- Project templates use a two-column desktop/one-column mobile grid, understated surfaces and a 4px hover lift. Existing detail pages and truthful media/optional-link fallbacks are styled consistently. There are no fabricated production projects.
- Education is a thin vertical timeline with cyan markers, expected completion dates, studying status and the supplied GPA only.
- Contact uses one large elevated panel with the requested heading, a primary email action, existing social destinations and the unchanged copy/fallback control.
- Minimal footer, new favicon and matching social-sharing artwork. Legacy shared component names are retained to avoid unnecessary API churn; their rendered styles are completely redesigned.

## New components and main changes

New: `src/components/hero/TechnologyVisual.tsx`, `src/components/about/QuickFacts.tsx`, `src/components/skills/SkillsTabs.tsx`.

Updated: the three shared stylesheet layers and tokens; Hero, About, Skills, Projects and Contact sections; header, contact card and root footer; Inter import/font preload; favicon/social artwork; package manifests; tab interaction assertions; Lighthouse report naming/dark-mode option; README. Content models, approved skills/education/profile arrays and project routes are unchanged. Empty experience/certification collections and absent resume remain hidden.

## Verification

Passed TypeScript, ESLint, content-rendering tests, DOM interaction tests, production build and production-output checks. The interaction suite now exercises every tab category, forward/backward arrow wrapping, Home/End, focus, selected states, panel visibility, exact skill content and ID relationships. Existing copy pending/success/error/manual selection, theme media changes, image error and reduced-motion Back to Top checks remain passing.

The production suite confirms the exact SEO metadata and confirmed Person JSON-LD, all 21 skills in generated HTML, genuine sections/anchors, no shipped test fixtures, no invented canonical/sitemap without SITE_URL, matching CSP hash, static 404s, immutable assets and bounded secret-pattern scanning.

Browser checks used the production preview through the in-app Chromium browser:

- 360, 390, 768, 1024, 1440 and 1920px: no document horizontal overflow in light or dark; header controls fit. Hero stacks below 768px. Tabs and contact panel fit narrow layouts.
- 200% root text at 360px: passed after fixing a genuine tab-label overflow. The tab grid adapts to one column as text grows, and labels can wrap.
- Mobile menu first-link focus, Escape close/focus return and section navigation passed. Desktop navigation and sticky offsets were inspected.
- Tab selection with End/ArrowRight and mouse activation passed in the browser; all keyboard cases additionally pass the DOM suite.
- Light, dark and System modes work. Light persists after refresh; System resolves to the current dark OS preference. Live OS changes are simulated in the automated suite, not tested by changing the actual OS.
- Contact destinations and safe social-link attributes are correct. Enter activation showed successful Clipboard API feedback and retained button focus. **Native OS paste is not independently verified.** Failure/unavailable API and manual selection pass controlled tests.
- Back to Top keyboard activation returned focus to the hero. Unknown project requests display the noindex project-not-found page; Back to Projects recovers the section route and focus. The absent CV and empty hidden sections remain absent.
- The final clean-page reload had no new application console errors. A font-import error from an intermediate failed build was corrected before final verification.

## Accessibility and performance

A contrast finding in scroll reveals was fixed by keeping text fully opaque during movement. A separate light-theme palette calculation found the selected-tab cyan too close to its wash background; the light accent was darkened to `#08748E`. Dark palette values remain exact. The primary filled-button contrast is approximately 8.33:1; light muted text on white is approximately 5.90:1. Visible keyboard focus, labels, landmarks, live feedback and decorative-art hiding remain intact.

Final Lighthouse 13.6.0 / headless Chrome 156 audit used simulated mobile and official desktop presets, forced dark system preference and local production preview. Reports: ignored `.qa/redesign-final-{mobile,desktop}.{json,html}` and `.qa/redesign-final-summary.json`. Earlier files labelled `redesign-light` followed the host's dark preference and must not be treated as light-mode audits.

| Lab result | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 98 | 100 | 100 | 100 | 2.460s | 0 | 0ms |
| Desktop | 100 | 100 | 100 | 100 | 0.614s | 0 | 0ms |

These are sampled lab results, not guaranteed production scores or field INP measurements. The audit preceded only formatting, a footer icon substitution and the light-only contrast refinement; these do not change the audited dark geometry/palette. The final code was rebuilt and checked after those refinements. No full WCAG certification is claimed.

CSS is now about 27.3 kB / 7.05 kB gzip versus the prior 35.5 kB / 8.1 kB. One Inter font is 48.25 kB versus two prior preloaded fonts totaling about 78 kB. The initial JS entry remains about 310 kB / 101 kB gzip, with route/Motion features split separately. These are asset sizes, not total page transfer. Lighthouse still flags unused framework JS (~42 KiB); no large dependencies were added to solve a visual task.

## Dependencies and review limits

`npm audit --omit=dev`: zero production dependency vulnerabilities. The full audit currently reports 16 moderate findings in existing lint/Lighthouse dependency chains (glob/minimatch and their dependents). Several offered fixes are major downgrades or unavailable. No force-upgrade/downgrade was applied during this visual redesign. The Inter package replacement did not introduce a vulnerable runtime package. Current full audit evidence is in ignored `.qa/redesign-audit.json`; do not reuse the historical Phase 5 zero-vulnerability claim for the full current toolchain.

Still requiring manual review: screen-reader/real-device testing, browser-level zoom beyond the root-text test, Firefox/WebKit, actual OS preference switching and native clipboard paste. Reduced-motion branches pass automated simulation and CSS inspection; this browser exposes no preference emulation. A genuine populated-project browser review and real CV download require supplied content. The two-column template layout is implemented and isolated rendering tests pass, but no fake cards were added for a production screenshot. Future hosted refresh/cache/HTTPS/DNS checks and a genuine production SITE_URL remain outside this local-only request.

## Reproduce

Run `npm run typecheck`, `npm run lint`, `npm run test:content`, `npm run test:interactions`, `npm run build`, then `npm run preview`. In a second terminal run `npm run test:production`.

For separate dark Lighthouse reports in PowerShell:

```powershell
$env:QA_REPORT_PREFIX='redesign-final'
$env:QA_DARK='1'
npm run audit:lighthouse
```

The ordinary audit command still works with its original report names. Do not deploy without explicit approval.
