import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ColorTheme =
  | "cosmic"
  | "royal-gold"
  | "emerald"
  | "sapphire"
  | "anime"
  | "neon";
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
 * Theme support matrix:
 *  - cosmic: both light & dark (the original / default theme)
 *  - royal-gold, emerald, sapphire, anime: LIGHT MODE ONLY (forced)
 *  - neon: DARK MODE ONLY (forced)
 */
export const LIGHT_ONLY_THEMES: ColorTheme[] = ["royal-gold", "emerald", "sapphire", "anime"];
export const DARK_ONLY_THEMES: ColorTheme[] = ["neon"];

export const COLOR_THEMES: {
  id: ColorTheme;
  name: string;
  subtitle: string;
  preview: string[];
  forcedMode?: Mode;
}[] = [
  {
    id: "cosmic",
    name: "كوني (الأصلي)",
    subtitle: "Cosmic — Light + Dark",
    preview: ["hsl(245 70% 35%)", "hsl(258 85% 62%)", "hsl(42 96% 56%)", "hsl(188 95% 48%)"],
  },
  {
    id: "royal-gold",
    name: "ذهبي ملكي",
    subtitle: "Royal Gold — Light only",
    preview: ["hsl(30 25% 12%)", "hsl(43 78% 52%)", "hsl(38 90% 58%)", "hsl(30 15% 25%)"],
    forcedMode: "light",
  },
  {
    id: "emerald",
    name: "زمردي فاخر",
    subtitle: "Emerald Luxe — Light only",
    preview: ["hsl(160 75% 22%)", "hsl(155 65% 42%)", "hsl(45 85% 55%)", "hsl(170 80% 35%)"],
    forcedMode: "light",
  },
  {
    id: "sapphire",
    name: "أزرق ياقوتي",
    subtitle: "Midnight Sapphire — Light only",
    preview: ["hsl(220 75% 22%)", "hsl(215 85% 55%)", "hsl(210 25% 78%)", "hsl(225 90% 65%)"],
    forcedMode: "light",
  },
  {
    id: "anime",
    name: "أسلوب أنمي",
    subtitle: "Anime Japan — Light only",
    preview: ["hsl(340 85% 62%)", "hsl(280 80% 65%)", "hsl(195 95% 60%)", "hsl(50 100% 65%)"],
    forcedMode: "light",
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
    const forced = getForcedMode(initialColor);
    return forced ?? getInitialMode();
  });
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(getInitialColor);

  // Apply mode class
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    window.localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  // Apply color theme class + enforce forced mode
  useEffect(() => {
    const root = document.documentElement;
    Array.from(root.classList)
      .filter((c) => c.startsWith("theme-"))
      .forEach((c) => root.classList.remove(c));
    root.classList.add(`theme-${colorTheme}`);
    window.localStorage.setItem(COLOR_KEY, colorTheme);

    const forced = getForcedMode(colorTheme);
    if (forced && forced !== mode) {
      setModeState(forced);
    }
  }, [colorTheme, mode]);

  const setColorTheme = (c: ColorTheme) => {
    setColorThemeState(c);
    const forced = getForcedMode(c);
    if (forced) setModeState(forced);
  };

  const toggleMode = () => {
    // If current theme forces a mode, switching also switches theme back to cosmic
    const forced = getForcedMode(colorTheme);
    if (forced) {
      setColorThemeState("cosmic");
      setModeState(forced === "light" ? "dark" : "light");
      return;
    }
    setModeState((m) => (m === "light" ? "dark" : "light"));
  };

  const value: ThemeContextValue = {
    mode,
    colorTheme,
    toggleMode,
    setMode: setModeState,
    setColorTheme,
    resetToDefault: () => {
      setColorThemeState(DEFAULT_COLOR);
    },
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
