import { Link } from "react-router-dom";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CategoryCardProps = {
  to: string;
  title: string;
  subtitle?: string;
  description: string;
  icon: LucideIcon;
  variant?: "default" | "accent" | "primary";
  className?: string;
};

const variantStyles: Record<NonNullable<CategoryCardProps["variant"]>, string> = {
  default:
    "bg-gradient-card border border-border hover:border-primary/50",
  primary:
    "bg-gradient-hero border border-white/20 hover:shadow-glow",
  accent:
    "bg-gradient-accent border border-accent/50 hover:shadow-stellar",
};

export const CategoryCard = ({
  to,
  title,
  subtitle,
  description,
  icon: Icon,
  variant = "default",
  className,
}: CategoryCardProps) => {
  const isColored = variant !== "default";
  return (
    <Link
      to={to}
      className={cn(
        "group relative flex flex-col gap-4 overflow-hidden rounded-2xl p-6 md:p-7 shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1",
        variantStyles[variant],
        className
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-smooth",
          isColored ? "bg-white/40" : "bg-primary/30"
        )}
      />

      <div
        className={cn(
          "relative flex h-14 w-14 items-center justify-center rounded-xl transition-smooth group-hover:scale-110 group-hover:rotate-3",
          isColored
            ? "bg-white/15 backdrop-blur-sm ring-1 ring-white/25"
            : "bg-gradient-cosmic text-white shadow-glow"
        )}
      >
        <Icon className="h-7 w-7" />
      </div>

      <div className="relative flex flex-col gap-1.5">
        {subtitle && (
          <span
            className={cn(
              "text-xs font-bold tracking-widest uppercase",
              isColored ? "text-on-hero opacity-90" : "text-primary"
            )}
          >
            {subtitle}
          </span>
        )}
        <h3
          className={cn(
            "font-display text-xl md:text-2xl font-bold leading-tight",
            isColored ? "text-on-hero" : "text-foreground"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed",
            isColored ? "text-on-hero opacity-90" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      </div>

      <div
        className={cn(
          "relative mt-auto inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold backdrop-blur-sm transition-smooth",
          isColored
            ? "border-white/50 bg-white/20 text-on-hero group-hover:bg-white/30 group-hover:border-white/80"
            : "border-primary/30 bg-primary/5 text-primary group-hover:bg-gradient-cosmic group-hover:text-white group-hover:border-transparent group-hover:shadow-glow"
        )}
      >
        <span>اكتشف المحتوى</span>
        <ArrowLeft className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
      </div>
    </Link>
  );
};
