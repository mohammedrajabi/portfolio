import fs from 'node:fs/promises';
import { createHash } from 'node:crypto';
const source=(await fs.readFile('public/theme-init.js','utf8')).replaceAll('\r\n','\n').trim();
const hash=`'sha256-${createHash('sha256').update(source).digest('base64')}'`;
const config=JSON.parse(await fs.readFile('vercel.json','utf8'));
const header=config.headers[0].headers.find(header=>header.key==='Content-Security-Policy');
header.value=header.value.replace(/script-src[^;]*/,`script-src 'self' ${hash}`);
await fs.writeFile('vercel.json',JSON.stringify(config,null,2)+'\n');
console.log('Synchronized the single approved theme-bootstrap CSP hash.');
