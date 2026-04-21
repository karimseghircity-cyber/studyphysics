import { Moon, Sun, Palette, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme, COLOR_THEMES, ColorTheme } from "./theme-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMode}
      aria-label={mode === "dark" ? "تفعيل الوضع الفاتح" : "تفعيل الوضع الداكن"}
      className="rounded-full"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
};

export const ColorThemePicker = () => {
  const { colorTheme, setColorTheme, resetToDefault } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="تغيير نمط الألوان"
          className="rounded-full relative"
        >
          <Palette className="h-5 w-5" />
          <span className="absolute -bottom-0.5 -left-0.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>نمط الألوان</span>
          <button
            onClick={resetToDefault}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            افتراضي
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {COLOR_THEMES.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => setColorTheme(t.id as ColorTheme)}
            className={cn(
              "flex items-center gap-3 py-2.5 cursor-pointer",
              colorTheme === t.id && "bg-secondary"
            )}
          >
            <div className="flex -space-x-1 rtl:space-x-reverse">
              {t.preview.map((c, i) => (
                <span
                  key={i}
                  className="h-5 w-5 rounded-full ring-2 ring-popover"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold leading-tight">{t.name}</div>
              <div className="text-[11px] text-muted-foreground leading-tight">{t.subtitle}</div>
            </div>
            {colorTheme === t.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
