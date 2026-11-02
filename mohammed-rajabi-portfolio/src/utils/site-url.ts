export function normalizeSiteUrl(value?: string): string | null {
  if (!value?.trim()) return null;
  const url = new URL(value.trim());
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash || url.pathname !== '/' || ['localhost', '127.0.0.1'].includes(url.hostname)) throw new Error('SITE_URL must be a real HTTPS origin without a path, credentials, query, or fragment.');
  return url.origin;
}
