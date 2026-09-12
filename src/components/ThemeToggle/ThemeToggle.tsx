import * as Styled from "./ThemeToggle.styled";
import { useTheme } from "../../contexts/ThemeContext";

export interface ThemeToggleProps {
  className?: string;
}

/**
 * A button that toggles between light and dark mode.
 */
export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Styled.ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={className}
    >
      <Styled.Icon $theme={theme} aria-hidden="true" />
    </Styled.ToggleButton>
  );
}
