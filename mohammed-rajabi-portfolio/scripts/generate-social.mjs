import fs from 'node:fs/promises';
import { Resvg } from '@resvg/resvg-js';
const svg = await fs.readFile('src/assets/social-preview.svg','utf8');
await fs.writeFile('public/social-preview.png',new Resvg(svg).render().asPng());
console.log('Generated the original 1200×630 social preview.');
