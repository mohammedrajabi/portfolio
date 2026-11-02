import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root = path.resolve('dist');
const config = JSON.parse(await fs.readFile('vercel.json','utf8'));
const types = { '.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.pdf':'application/pdf' };
const globalHeaders = Object.fromEntries(config.headers.find(entry=>entry.source==='/(.*)').headers.map(header=>[header.key,header.value]));
const server = createServer(async (request,response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url,'http://localhost').pathname);
    if (pathname.includes('\0') || pathname.includes('\\')) { response.writeHead(400).end(); return; }
    const candidates = pathname === '/' ? ['index.html'] : [pathname.slice(1), `${pathname.slice(1)}.html`];
    let file; let status=200;
    for (const candidate of candidates) {
      const target = path.resolve(root,candidate);
      if (!target.startsWith(root+path.sep) && target !== root) continue;
      if ((await fs.stat(target).catch(()=>null))?.isFile()) { file=target; break; }
    }
    if (!file) { file=path.join(root,'404.html'); status=404; }
    const ext=path.extname(file);
    const cache=pathname.startsWith('/assets/') && status===200 ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate';
    let data = await fs.readFile(file);
    if (ext === '.html' && process.env.QA_TEXT_SCALE === '200') data = Buffer.from(data.toString().replace('</head>','<style>html{font-size:200%}</style></head>'));
    const compressed = /gzip/.test(request.headers['accept-encoding'] ?? '') && ['.js','.css','.html','.svg','.txt','.xml'].includes(ext);
    const body = compressed ? gzipSync(data) : data;
    response.writeHead(status,{...globalHeaders,'Content-Type':types[ext] ?? 'application/octet-stream','Cache-Control':cache,'Vary':'Accept-Encoding',...(compressed ? { 'Content-Encoding':'gzip' } : {})});
    if (request.method === 'HEAD') response.end(); else response.end(body);
  } catch { response.writeHead(400).end('Bad request'); }
});
const port = Number(process.env.PORT || 4173);
server.listen(port,'127.0.0.1',()=>console.log(`Production static preview: http://127.0.0.1:${port}/`));
