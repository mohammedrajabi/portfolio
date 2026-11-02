import { profile } from './profile';
import { contacts } from './contact';
import { projects } from './projects';
import { projectPath } from '../utils/projects';

export const siteUrl = __SITE_URL__;
export const homepageSeo = {
  title: 'Mohammed Rajabi | Software Developer & Cybersecurity Enthusiast',
  description: 'Explore the portfolio of Mohammed Rajabi, a software developer and cybersecurity enthusiast building creative, practical, and secure digital experiences.',
};
export function getPageMetadata(pathname: string, origin: string | null = siteUrl, items = projects) {
  const project = items.find(item => projectPath(item.slug) === pathname);
  const home = pathname === '/';
  const known = home || !!project;
  const cover = project?.screenshots?.[0];
  const imagePath = cover?.src ?? '/social-preview.png';
  const image = origin ? new URL(imagePath, origin).href : imagePath;
  return {
    title: home ? homepageSeo.title : project ? `${project.title} | ${profile.name}` : `${pathname.startsWith('/projects/') ? 'Project not found' : 'Page not found'} | ${profile.name}`,
    description: home ? homepageSeo.description : project?.summary ?? 'This page could not be found. Return to Mohammed Rajabi’s portfolio.',
    robots: known ? 'index, follow' : 'noindex, follow',
    canonical: known && origin ? new URL(pathname, origin).href : null,
    image: known ? image : null,
    imageAlt: cover?.alt ?? `${profile.name} — ${profile.headline}`,
    type: project ? 'article' : 'website',
    home,
  };
}
// No completed degrees, employment, awards, or fabricated project results.
export const personSchema = {
  '@context': 'https://schema.org', '@type': 'Person', name: profile.name,
  description: profile.title,
  email: contacts.find(contact => contact.kind === 'email')?.value,
  sameAs: contacts.filter(contact => contact.kind !== 'email').map(contact => contact.href),
};
export const personSchemaJson = JSON.stringify(personSchema).replace(/</g, '\\u003c');
