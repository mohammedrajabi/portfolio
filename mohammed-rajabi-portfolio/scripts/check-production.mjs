import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { JSDOM } from 'jsdom';
const build=JSON.parse(await fs.readFile('.qa/build.json','utf8'));
const home=await fs.readFile('dist/index.html','utf8');
const document=new JSDOM(home).window.document;
assert.equal(document.title,'Mohammed Rajabi | Software Developer & Cybersecurity Enthusiast');
assert.equal(document.querySelector('meta[name="description"]').content,'Explore the portfolio of Mohammed Rajabi, a software developer and cybersecurity enthusiast building creative, practical, and secure digital experiences.');
assert.equal(document.querySelectorAll('h1').length,1);
assert.equal(document.querySelectorAll('main').length,1);
assert.equal(document.querySelectorAll('.skill-list li').length,21);
assert.deepEqual([...document.querySelectorAll('main section[id]')].map(el=>el.id),['home','about','skills','projects','education','contact']);
assert.ok(document.querySelector('meta[name="twitter:card"]'));
assert.equal(document.querySelectorAll('[style*="opacity:0"]').length,0);
assert.deepEqual([...document.querySelectorAll('a[href^="/#"]')].filter(a=>!document.getElementById(a.getAttribute('href').slice(2))),[]);
const schema=JSON.parse(document.querySelector('#person-schema').textContent);
assert.equal(schema['@type'],'Person');assert.equal(schema.name,'Mohammed Rajabi');
assert.equal(schema.sameAs.length,2);
if (!build.siteUrl) { assert.equal(document.querySelector('link[rel="canonical"]'),null); await assert.rejects(fs.stat('dist/sitemap.xml')); }
else { assert.equal(document.querySelector('link[rel="canonical"]').href,build.siteUrl+'/'); const sitemap=await fs.readFile('dist/sitemap.xml','utf8'); assert.equal((sitemap.match(/<loc>/g)??[]).length,build.routes.length); }
const bootstrap=(await fs.readFile('public/theme-init.js','utf8')).replaceAll('\r\n','\n').trim();
const config=JSON.parse(await fs.readFile('vercel.json','utf8'));
const csp=config.headers[0].headers.find(h=>h.key==='Content-Security-Policy').value;
assert.ok(csp.includes(createHash('sha256').update(bootstrap).digest('base64')));
assert.ok(!csp.includes("script-src 'self' 'unsafe-inline'"));
const base=process.env.QA_BASE_URL || 'http://127.0.0.1:4173';
for (const [route,status] of [['/',200],['/projects/unpublished',404],['/missing-page',404],['/assets/missing.js',404]]) {
 const response=await fetch(base+route);assert.equal(response.status,status,route);assert.equal(response.headers.get('x-content-type-options'),'nosniff');assert.equal(response.headers.get('content-security-policy'),csp);
}
const asset=await fetch(base+'/assets/'+build.fonts[0]);assert.match(asset.headers.get('cache-control'),/immutable/);
const notFound=new JSDOM(await fs.readFile('dist/404.html','utf8')).window.document;
assert.equal(notFound.querySelector('meta[name="robots"]').content,'noindex, follow');
for (const name of await fs.readdir('dist/assets')) if (/\.(js|css)$/.test(name)) assert.doesNotMatch(await fs.readFile(path.join('dist/assets',name),'utf8'),/render-test|__test-only__|example\.invalid/);
let scanned=0;
for (const file of execFileSync('git',['ls-files','--cached','--others','--exclude-standard'],{encoding:'utf8'}).split(/\r?\n/).filter(Boolean)) {
 if (/(^|\/)\.env($|\.)/.test(file) && !file.endsWith('.env.example')) throw new Error('Tracked environment file: '+file);
 if (!/\.(tsx?|jsx?|mjs|json|md|css|html|txt|svg)$/.test(file)) continue;
 const text=await fs.readFile(file,'utf8').catch(()=>null);if(!text)continue;scanned++;
 const secret=/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9]{30,}|\bAKIA[A-Z0-9]{16}\b|\bsk-[A-Za-z0-9]{32,}\b/;
 if(secret.test(text)) throw new Error('Potential secret detected in '+file+' (value withheld)');
}
console.log(`Production checks passed: prerendered content/metadata/schema, sitemap gating, CSP, real 404s, immutable assets, no shipped fixtures, and ${scanned} tracked/unignored text files scanned for obvious secret patterns.`);
