import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { ThemeContext, type ThemePreference } from '../../hooks/useTheme';
const key = 'mr-theme';
let memoryPreference: ThemePreference = 'system';
let storageAvailable = true;
function getPreference(): ThemePreference {
  if (!storageAvailable) return memoryPreference;
  try { const value = window.localStorage.getItem(key); return value === 'light' || value === 'dark' ? value : 'system'; } catch { storageAvailable = false; return memoryPreference; }
}
function systemIsDark() { return window.matchMedia('(prefers-color-scheme: dark)').matches; }
function applyTheme() {
  const preference = getPreference();
  const theme = preference === 'system' ? (systemIsDark() ? 'dark' : 'light') : preference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
}
function subscribePreference(onChange: () => void) {
  const storage = (event: StorageEvent) => { if (event.key === key || event.key === null) onChange(); };
  window.addEventListener('storage', storage);
  window.addEventListener('mr-theme-change', onChange);
  return () => { window.removeEventListener('storage', storage); window.removeEventListener('mr-theme-change', onChange); };
}
function subscribeSystem(onChange: () => void) {
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}
function setPreference(preference: ThemePreference) {
  memoryPreference = preference;
  try { if (preference === 'system') window.localStorage.removeItem(key); else window.localStorage.setItem(key, preference); } catch { storageAvailable = false; }
  applyTheme();
  window.dispatchEvent(new Event('mr-theme-change'));
}
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Server snapshots keep prerendering/hydration deterministic; the early script colors the page.
  const preference = useSyncExternalStore(subscribePreference, getPreference, () => 'system' as const);
  const systemDark = useSyncExternalStore(subscribeSystem, systemIsDark, () => false);
  const resolvedTheme = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
  useEffect(() => { applyTheme(); }, [preference, resolvedTheme]);
  return <ThemeContext value={{ preference, resolvedTheme, setPreference }}>{children}</ThemeContext>;
}
