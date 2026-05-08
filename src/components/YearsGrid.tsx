import { Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type YearsGridProps = {
  years: number[];
  buildHref: (year: number) => string;
  prefix?: string;
  /** When provided, renders a small "الحل" chip linking to the corresponding solution year. */
  buildSolutionHref?: (year: number) => string;
};

export const YearsGrid = ({ years, buildHref, prefix = "BAC", buildSolutionHref }: YearsGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {years.map((y) => (
        <div
          key={y}
          className={cn(
            "group relative flex flex-col items-center justify-center gap-2 rounded-2xl p-5 md:p-6",
            "bg-gradient-card border border-border hover:border-primary/50",
            "shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1"
          )}
        >
          <Link to={buildHref(y)} className="flex flex-col items-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-smooth group-hover:bg-gradient-cosmic group-hover:text-white group-hover:shadow-glow">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-primary">{prefix}</span>
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">{y}</span>
          </Link>

          {buildSolutionHref && (
            <Link
              to={buildSolutionHref(y)}
              className="mt-1 inline-flex items-center gap-1 rounded-full border border-accent/50 bg-accent/15 px-2.5 py-1 text-[11px] font-bold text-accent-foreground/90 hover:bg-accent/30 transition-smooth"
              aria-label={`الحل ${y}`}
            >
              الحل
              <ArrowLeft className="h-3 w-3" />
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export const buildYearsRange = (from: number, to: number): number[] => {
  const arr: number[] = [];
  for (let y = from; y <= to; y++) arr.push(y);
  return arr;
};
