import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { getPageMetadata, personSchemaJson } from '../content/seo';
export function usePageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = getPageMetadata(pathname);
    document.title = meta.title;
    const values: Record<string,string | null> = {
      'name:description': meta.description, 'name:robots': meta.robots,
      'property:og:title': meta.title, 'property:og:description': meta.description,
      'property:og:type': meta.type, 'property:og:url': meta.canonical,
      'property:og:image': meta.image, 'property:og:image:alt': meta.image ? meta.imageAlt : null,
      'name:twitter:card': meta.image ? 'summary_large_image' : 'summary',
      'name:twitter:title': meta.title, 'name:twitter:description': meta.description,
      'name:twitter:image': meta.image, 'name:twitter:image:alt': meta.image ? meta.imageAlt : null,
    };
    for (const [selector, value] of Object.entries(values)) {
      const separator = selector.indexOf(':');
      const attribute = selector.slice(0, separator);
      const name = selector.slice(separator + 1);
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      if (!value) { tag?.remove(); continue; }
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute(attribute,name); document.head.append(tag); }
      tag.content = value;
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (meta.canonical) { if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); } canonical.href = meta.canonical; } else canonical?.remove();
    let schema = document.getElementById('person-schema');
    if (meta.home) { if (!schema) { schema = document.createElement('script'); schema.id='person-schema'; schema.setAttribute('type','application/ld+json'); document.head.append(schema); } schema.textContent = personSchemaJson; } else schema?.remove();
  }, [pathname]);
}
