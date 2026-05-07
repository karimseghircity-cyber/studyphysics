import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ColorTheme = "cosmic" | "neon";
export type Mode = "light" | "dark";

type ThemeContextValue = {
  mode: Mode;
  colorTheme: ColorTheme;
  toggleMode: () => void;
  setMode: (m: Mode) => void;
  setColorTheme: (c: ColorTheme) => void;
  resetToDefault: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const MODE_KEY = "physica-mode";
const COLOR_KEY = "physica-color";
const DEFAULT_COLOR: ColorTheme = "cosmic";

/**
 * Two themes only:
 *  - cosmic: standard mode (light + dark)
 *  - neon:   dark mode only (forced)
 */
export const COLOR_THEMES: {
  id: ColorTheme;
  name: string;
  subtitle: string;
  preview: string[];
  forcedMode?: Mode;
}[] = [
  {
    id: "cosmic",
    name: "الوضع العادي",
    subtitle: "Cosmic — Light + Dark",
    preview: ["hsl(245 70% 35%)", "hsl(258 85% 62%)", "hsl(42 96% 56%)", "hsl(188 95% 48%)"],
  },
  {
    id: "neon",
    name: "نيون داكن",
    subtitle: "Dark Neon — Dark only",
    preview: ["hsl(180 100% 50%)", "hsl(300 100% 60%)", "hsl(120 100% 55%)", "hsl(60 100% 55%)"],
    forcedMode: "dark",
  },
];

const getInitialMode = (): Mode => {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(MODE_KEY) as Mode | null;
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const getInitialColor = (): ColorTheme => {
  if (typeof window === "undefined") return DEFAULT_COLOR;
  const stored = window.localStorage.getItem(COLOR_KEY) as ColorTheme | null;
  if (stored && COLOR_THEMES.some((t) => t.id === stored)) return stored;
  return DEFAULT_COLOR;
};

const getForcedMode = (theme: ColorTheme): Mode | undefined =>
  COLOR_THEMES.find((t) => t.id === theme)?.forcedMode;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<Mode>(() => {
    const initialColor = getInitialColor();
    return getForcedMode(initialColor) ?? getInitialMode();
  });
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(getInitialColor);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    window.localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    Array.from(root.classList)
      .filter((c) => c.startsWith("theme-"))
      .forEach((c) => root.classList.remove(c));
    root.classList.add(`theme-${colorTheme}`);
    window.localStorage.setItem(COLOR_KEY, colorTheme);

    const forced = getForcedMode(colorTheme);
    if (forced && forced !== mode) setModeState(forced);
  }, [colorTheme, mode]);

  const setColorTheme = (c: ColorTheme) => {
    setColorThemeState(c);
    const forced = getForcedMode(c);
    if (forced) setModeState(forced);
  };

  const toggleMode = () => {
    if (colorTheme === "neon") {
      // Switching mode away from neon → fall back to cosmic light
      setColorThemeState("cosmic");
      setModeState("light");
      return;
    }
    setModeState((m) => (m === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        colorTheme,
        toggleMode,
        setMode: setModeState,
        setColorTheme,
        resetToDefault: () => setColorThemeState(DEFAULT_COLOR),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
