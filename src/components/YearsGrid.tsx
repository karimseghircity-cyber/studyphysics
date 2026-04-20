import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

type YearsGridProps = {
  years: number[];
  buildHref: (year: number) => string;
  prefix?: string; // e.g. "BAC" or "BEM"
};

export const YearsGrid = ({ years, buildHref, prefix = "BAC" }: YearsGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {years.map((y) => (
        <Link
          key={y}
          to={buildHref(y)}
          className={cn(
            "group relative flex flex-col items-center justify-center gap-2 rounded-2xl p-5 md:p-6",
            "bg-gradient-card border border-border hover:border-primary/50",
            "shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1"
          )}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-cosmic group-hover:text-white group-hover:shadow-glow">
            <Calendar className="h-5 w-5" />
          </div>
          <span className="text-[11px] font-bold tracking-widest uppercase text-primary">
            {prefix}
          </span>
          <span className="font-display text-xl md:text-2xl font-bold text-foreground">
            {y}
          </span>
        </Link>
      ))}
    </div>
  );
};

export const buildYearsRange = (from: number, to: number): number[] => {
  const arr: number[] = [];
  for (let y = from; y <= to; y++) arr.push(y);
  return arr;
};
