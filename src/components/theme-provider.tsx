import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type ColorTheme = "cosmic" | "royal-gold" | "emerald" | "sapphire" | "anime";
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

const MODE_KEY = "physics-hub-mode";
const COLOR_KEY = "physics-hub-color";

const DEFAULT_COLOR: ColorTheme = "cosmic";

export const COLOR_THEMES: { id: ColorTheme; name: string; subtitle: string; preview: string[] }[] = [
  {
    id: "cosmic",
    name: "كوني (الأصلي)",
    subtitle: "Cosmic — Default",
    preview: ["hsl(245 70% 35%)", "hsl(258 85% 62%)", "hsl(42 96% 56%)", "hsl(188 95% 48%)"],
  },
  {
    id: "royal-gold",
    name: "ذهبي ملكي",
    subtitle: "Royal Gold",
    preview: ["hsl(30 25% 12%)", "hsl(43 78% 52%)", "hsl(38 90% 58%)", "hsl(30 15% 25%)"],
  },
  {
    id: "emerald",
    name: "زمردي فاخر",
    subtitle: "Emerald Luxe",
    preview: ["hsl(160 75% 22%)", "hsl(155 65% 42%)", "hsl(45 85% 55%)", "hsl(170 80% 35%)"],
  },
  {
    id: "sapphire",
    name: "أزرق ياقوتي",
    subtitle: "Midnight Sapphire",
    preview: ["hsl(220 75% 22%)", "hsl(215 85% 55%)", "hsl(210 25% 78%)", "hsl(225 90% 65%)"],
  },
  {
    id: "anime",
    name: "أسلوب أنمي",
    subtitle: "Anime Japan",
    preview: ["hsl(340 85% 62%)", "hsl(280 80% 65%)", "hsl(195 95% 60%)", "hsl(50 100% 65%)"],
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

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<Mode>(getInitialMode);
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(getInitialColor);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    window.localStorage.setItem(MODE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    // Remove any prior theme- class
    Array.from(root.classList)
      .filter((c) => c.startsWith("theme-"))
      .forEach((c) => root.classList.remove(c));
    root.classList.add(`theme-${colorTheme}`);
    window.localStorage.setItem(COLOR_KEY, colorTheme);
  }, [colorTheme]);

  const value: ThemeContextValue = {
    mode,
    colorTheme,
    toggleMode: () => setModeState((m) => (m === "light" ? "dark" : "light")),
    setMode: setModeState,
    setColorTheme: setColorThemeState,
    resetToDefault: () => setColorThemeState(DEFAULT_COLOR),
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
