import type { Project } from "../types/content";

export function getFeaturedProjects(items: readonly Project[]): Project[] {
  return items
    .filter((item) => item.featured)
    .sort(
      (a, b) =>
        a.displayOrder - b.displayOrder || a.title.localeCompare(b.title),
    );
}
export function projectPath(slug: string): string {
  return `/projects/${encodeURIComponent(slug)}`;
}
export function externalUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}
