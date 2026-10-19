import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type ThemePreference } from "../../hooks/useTheme";
function initialPreference(): ThemePreference {
  try {
    const value = localStorage.getItem("mr-theme");
    return value === "dark" || value === "light" ? value : "system";
  } catch {
    return "system";
  }
}
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] =
    useState<ThemePreference>(initialPreference);
  const [systemDark, setSystemDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const resolvedTheme =
    preference === "system" ? (systemDark ? "dark" : "light") : preference;
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setSystemDark(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.style.colorScheme = resolvedTheme;
    try {
      if (preference === "system") localStorage.removeItem("mr-theme");
      else localStorage.setItem("mr-theme", preference);
    } catch {
      /* Theme works without storage. */
    }
  }, [preference, resolvedTheme]);
  return (
    <ThemeContext value={{ preference, resolvedTheme, setPreference }}>
      {children}
    </ThemeContext>
  );
}
