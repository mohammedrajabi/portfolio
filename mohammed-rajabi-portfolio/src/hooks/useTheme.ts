import { createContext, useContext } from "react";
export type ThemePreference = "light" | "dark" | "system";
export const ThemeContext = createContext<{
  preference: ThemePreference;
  resolvedTheme: "light" | "dark";
  setPreference: (theme: ThemePreference) => void;
} | null>(null);
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme requires ThemeProvider");
  return context;
}
