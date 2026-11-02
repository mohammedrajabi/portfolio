import fs from 'node:fs/promises';
import { createServer } from 'vite';
import { createHash } from 'node:crypto';
const server = await createServer({ mode: 'production', server: { middlewareMode: true }, appType: 'custom' });
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
try {
  const { renderPage, getPageMetadata, personSchemaJson, siteUrl, projects } = await server.ssrLoadModule('/src/entry-server.tsx');
  const bootstrap = (await fs.readFile('public/theme-init.js','utf8')).replaceAll('\r\n','\n').trim();
  const config = await fs.readFile('vercel.json','utf8');
  if (!config.includes(createHash('sha256').update(bootstrap).digest('base64'))) throw new Error('Theme bootstrap changed: run npm run security:sync and commit the matching CSP hash.');
  let template = (await fs.readFile('dist/index.html','utf8')).replace('<script src="/theme-init.js"></script>', `<script>${bootstrap}</script>`);
  // The generated stylesheet is small; inline it to remove the measured blocking request.
  for (const match of template.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/g)) {
    const css = await fs.readFile(`dist${match[1]}`, 'utf8');
    if (css.includes('</style')) throw new Error('Unexpected style terminator in generated CSS.');
    template = template.replace(match[0], `<style data-prerendered>${css}</style>`);
  }
  const files = await fs.readdir('dist/assets');
  const fontFiles = files.filter(file => /^inter-latin-wght-normal.*\.woff2$/.test(file));
  const routes = ['/', ...projects.map(project => {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) throw new Error('Project slugs must be lowercase kebab-case.');
    return `/projects/${project.slug}`;
  })];
  if (new Set(routes).size !== routes.length) throw new Error('Duplicate project slug.');
  for (const path of [...routes, '/404']) {
    const meta = getPageMetadata(path);
    const tags = {
      'name:description': meta.description, 'name:robots': meta.robots,
      'property:og:title': meta.title, 'property:og:description': meta.description,
      'property:og:type': meta.type, 'property:og:site_name': 'Mohammed Rajabi',
      'property:og:url': meta.canonical, 'property:og:image': meta.image,
      'property:og:image:alt': meta.image ? meta.imageAlt : null,
      'name:twitter:card': meta.image ? 'summary_large_image' : 'summary',
      'name:twitter:title': meta.title, 'name:twitter:description': meta.description,
      'name:twitter:image': meta.image, 'name:twitter:image:alt': meta.image ? meta.imageAlt : null,
      'name:rendered-path': path,
    };
    let head = `<title>${escape(meta.title)}</title>\n`;
    for (const [key,value] of Object.entries(tags)) {
      if (!value) continue;
      const index=key.indexOf(':');
      head += `<meta ${key.slice(0,index)}="${escape(key.slice(index+1))}" content="${escape(value)}" />\n`;
    }
    if (meta.canonical) head += `<link rel="canonical" href="${escape(meta.canonical)}" />\n`;
    head += fontFiles.map(file => `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`).join('\n');
    if (meta.home) head += `\n<script id="person-schema" type="application/ld+json">${personSchemaJson}</script>`;
    const output = template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/,head).replace('<div id="root"></div>',`<div id="root">${renderPage(path)}</div>`);
    if (!output.includes('id="main-content"')) throw new Error('Prerendering produced no main content.');
    const destination = path === '/' ? 'dist/index.html' : `dist${path}.html`;
    if (path.startsWith('/projects/')) await fs.mkdir('dist/projects',{recursive:true});
    await fs.writeFile(destination,output);
  }
  await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}/sitemap.xml\n` : ''}`);
  if (siteUrl) await fs.writeFile('dist/sitemap.xml',`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(path=>`<url><loc>${escape(new URL(path,siteUrl).href)}</loc></url>`).join('')}</urlset>\n`);
  await fs.mkdir('.qa',{recursive:true});
  await fs.writeFile('.qa/build.json',JSON.stringify({ routes, siteUrl, fonts: fontFiles },null,2));
  console.log(`Prerendered ${routes.length} genuine route(s) plus 404. ${siteUrl ? 'Canonical URLs and sitemap enabled.' : 'SITE_URL absent: no canonical URL or absolute sitemap emitted.'}`);
} finally { await server.close(); }
