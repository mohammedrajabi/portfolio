# Mohammed Rajabi — Developer Portfolio

Premium Dark + Modern Tech redesign, 2 November 2026, built on the existing Phase 5 application. React 19, strict TypeScript 6, Vite 8, Tailwind 4, React Router 8, Motion 14, and Lucide. Node 24.13.1 was used for validation. Nothing has been deployed or pushed.

The graphite/cyan visual system uses locally served Inter, a full-width sticky header, an original SVG technology visual, biography with quick facts, accessible category tabs for all 21 skills, a two-column project grid, an education timeline and a unified contact panel. Existing data, routes, themes, copy feedback, fallback states, SEO and security behavior are preserved. Projects have an honest empty state. Experience, certifications and the absent CV remain hidden. See [redesign verification](docs/REDESIGN.md) for current results; the Phase 5 QA report is historical.

## Local setup and commands

```powershell
cd C:\Users\moham\My-Test-Projects\portfolio\mohammed-rajabi-portfolio
npm ci
npm run dev
```

Use the local URL printed by Vite. Production verification:

```powershell
npm run typecheck
npm run lint
npm run test:content
npm run test:interactions
npm run build
npm run preview
```

Keep preview running in one terminal; in another run:

```powershell
npm run test:production
npm run audit:lighthouse
npm audit
```

Preview binds only to `127.0.0.1:4173`. Stop it with Ctrl+C. Lighthouse uses installed Chrome at its default Windows path; set `CHROME_PATH` if needed. Reports are local ignored files under `.qa/`. The interaction suite uses a simulated DOM and mocked media/clipboard adapters; it does not prove native clipboard or OS behavior.

## Content and structure

`src/content/` holds typed profile, contact, skills, education, project, experience, certification, homepage and SEO data. Contracts are in `src/types/content.ts`. Components and sections consume these collections; `src/routes.tsx` shares routing between browser and build-time rendering. Styles are in `src/styles/`; `tokens.css` owns the confirmed palette and theme tokens.

Edit approved information in its content module. Skills currently contain exactly 21 approved names across five categories; no proficiency levels are inferred. Education retains both expected-completion dates and only the supplied GPA. Empty experience/certification arrays automatically hide their sections and navigation links. Update content assertions only when changes are authorized.

To add a real project:

1. Add a `Project` entry to `src/content/projects.ts` with `id`, unique lowercase kebab-case `slug`, `title`, `summary`, `description`, `technologies`, `featured`, and numeric `displayOrder`.
2. Optional fields: `category`, `completedAt`, `features`, `screenshots`, `repositoryUrl`, and `liveUrl`. Supply real values only. Featured entries sort by display order then title; unfeatured entries still have detail routes.
3. Place compressed real screenshots in `public/projects/<slug>/`. Each image requires `src`, descriptive `alt`, and intrinsic `width`/`height`; optional `srcSet`/`sizes` must describe actual files. Missing or failed media gets a truthful fallback. Missing/invalid external URLs produce no link.
4. Rebuild. The homepage showcase, `/projects/<slug>` detail route, static HTML, project metadata and configured sitemap are generated from the same data. Inspect direct navigation and refresh after adding real content.

Fixtures in `tests/` are isolated and excluded from the production bundle. Never add them to content to populate the site.

## Resume installation

The genuine PDF is absent. Download CV remains hidden. Install the real file at `public/resume/Mohammed_Rajabi_CV.pdf`, then restart development or rebuild. `src/content/resume.ts` defines the download path/name; Vite checks file existence. Verify an actual download after installation. No substitute PDF is generated.

## SEO and build output

Copy `.env.example` to `.env.local` and set `SITE_URL` to the actual HTTPS production origin, with no route, credentials, query or hash. This value is public build-time configuration, never a secret. Do not invent a domain. Rebuild whenever it changes.

`npm run build` emits crawler-readable HTML for `/` and every real project, a `404.html`, generated robots.txt, and (only with a real configured origin) sitemap.xml and canonical/social absolute URLs. Unknown routes are noindex. With SITE_URL absent, canonical URLs and sitemap are deliberately omitted. Person JSON-LD includes only confirmed identity/contact profiles. Social artwork source is `src/assets/social-preview.svg`; `npm run social:generate` updates `public/social-preview.png`.

Client navigation updates metadata. Browser hydration preserves the prerendered page; unknown routes render their appropriate not-found state. No server backend is needed. Route chunks and Motion features load separately. One local Latin Inter font is preloaded; generated CSS is inlined to avoid an extra blocking request. Hashed assets receive immutable caching.

## Security and accessibility

`vercel.json` declares static Vite output, clean URLs, security headers, and asset caching. There is no catch-all rewrite that would turn every missing page into HTTP 200. The local preview exercises equivalent static route/header behavior; hosted behavior still needs validation after authorized deployment.

The CSP restricts scripts to same-origin files and the exact early-theme script hash. Inline styles remain permitted for generated CSS and Motion. After editing `public/theme-init.js`, run `npm run security:sync`, review/commit the changed header configuration, then build. The build fails if its CSP hash is stale. Restart preview after header changes. External links are validated HTTP(S) URLs without embedded credentials and use safe new-tab attributes. `.env*`, build output, dependencies and QA reports are ignored; `.env.example` contains no secrets. Keep credentials out of all browser-delivered data.

The interface provides landmarks, headings, a skip link, visible focus, native controls, accessible menu state, section focus/offset handling, live copy feedback, reduced-motion behavior and light/dark/system themes. Theme initialization runs before page content and supports inaccessible storage with an in-memory preference. Automated accessibility scores are not a full WCAG 2.2 AA certification. See [redesign verification](docs/REDESIGN.md) for current results and manual-test gaps.

## Publish to Vercel — future authorized action

No step below has been executed. Obtain the owner's explicit approval before any repository push, import or deployment.

1. Choose the real production origin. Configure local `SITE_URL`, rebuild, and rerun checks. Confirm canonical, OG image, robots and genuine sitemap URLs.
2. After approval, import an approved repository into Vercel. If the repository contains this parent workspace, set **Root Directory** to `mohammed-rajabi-portfolio`; if this folder is the repository root, leave Root Directory at the root.
3. Select **Vite**, Node **24.x**, Install Command **npm ci**, Build Command **npm run build**, Output Directory **dist**. Keep the checked-in `vercel.json`.
4. Add `SITE_URL` for the Production environment using the actual HTTPS origin. For an authorized preview, either leave it unset or use an approved preview origin; never index a placeholder domain. Keep preview access protected where available.
5. Create the authorized deployment and inspect HTTPS, homepage, assets, all real project direct URLs/refreshes, unknown HTTP 404s, contact, theme persistence, headers, robots, sitemap and sharing metadata. Rerun mobile/desktop Lighthouse against hosting. Resolve any host-specific issues before promoting to production.
6. For a domain already owned by the user, open **Project Settings → Domains**, add it, and apply the exact DNS records Vercel provides at the registrar. Wait for verification and HTTPS. Update `SITE_URL` to the chosen primary origin and redeploy after approval. Do not purchase a domain or guess DNS records.
7. Verify the host's HTTPS/HSTS response. Do not add preload or includeSubDomains without checking ownership and HTTPS readiness of all affected subdomains.

Official references: [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [static custom 404](https://vercel.com/kb/guide/custom-404-page), [security headers](https://vercel.com/docs/cdn-security/security-headers). No deployment URL exists yet.

## Readiness and limitations

See [redesign verification](docs/REDESIGN.md) for current checks and measured results. The requested redesign is implemented and validated locally. Hosted validation and a genuine SITE_URL are still required before public release. Missing projects and CV remain intentional truthful states. The earlier [Phase 5 report](docs/QA.md) is retained as historical evidence.
