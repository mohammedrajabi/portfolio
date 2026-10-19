import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
export function ThemeToggle() {
  const { preference, setPreference } = useTheme();
  return (
    <fieldset className="theme-switch">
      <legend className="sr-only">Color theme</legend>
      {(
        [
          ["light", Sun, "Light theme"],
          ["dark", Moon, "Dark theme"],
          ["system", Monitor, "System theme"],
        ] as const
      ).map(([value, Icon, label]) => (
        <button
          key={value}
          type="button"
          aria-label={label}
          aria-pressed={preference === value}
          onClick={() => setPreference(value)}
        >
          <Icon size={18} aria-hidden="true" />
        </button>
      ))}
    </fieldset>
  );
}
