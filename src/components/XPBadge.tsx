import { Link } from "react-router-dom";
import { Trophy, Coins } from "lucide-react";
import { useProgress, progressInLevel } from "@/hooks/useProgress";
import { useAuth } from "@/hooks/useAuth";

export const XPBadge = () => {
  const { user } = useAuth();
  const { stats } = useProgress();
  if (!user) return null;
  const pct = progressInLevel(stats.xp);

  return (
    <Link
      to="/stats"
      className="hidden md:flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-2.5 py-1 hover:bg-secondary transition-smooth"
      aria-label="إحصائياتي"
    >
      <span className="flex items-center gap-1 text-[11px] font-extrabold text-primary">
        <Trophy className="h-3.5 w-3.5" />
        Lv {stats.level}
      </span>
      <span className="relative h-1.5 w-16 rounded-full bg-muted overflow-hidden">
        <span
          className="absolute inset-y-0 right-0 bg-gradient-cosmic rounded-full"
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="flex items-center gap-1 text-[11px] font-bold text-accent-foreground/80">
        <Coins className="h-3.5 w-3.5 text-accent" />
        {stats.coins}
      </span>
    </Link>
  );
};
