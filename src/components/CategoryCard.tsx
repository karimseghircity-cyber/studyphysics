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
    "bg-gradient-card border border-border hover:border-primary/40",
  primary:
    "bg-gradient-hero border border-primary/30 text-primary-foreground hover:shadow-glow",
  accent:
    "bg-gradient-accent border border-accent/40 text-accent-foreground hover:shadow-glow",
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
        "group relative flex flex-col gap-4 rounded-2xl p-6 md:p-7 shadow-soft hover:shadow-elegant transition-smooth hover:-translate-y-1",
        variantStyles[variant],
        className
      )}
    >
      <div
        className={cn(
          "flex h-14 w-14 items-center justify-center rounded-xl transition-smooth group-hover:scale-110",
          isColored
            ? "bg-white/15 backdrop-blur-sm"
            : "bg-primary/10 text-primary"
        )}
      >
        <Icon className="h-7 w-7" />
      </div>

      <div className="flex flex-col gap-1.5">
        {subtitle && (
          <span
            className={cn(
              "text-xs font-bold tracking-wide uppercase",
              isColored ? "text-primary-foreground/80" : "text-primary"
            )}
          >
            {subtitle}
          </span>
        )}
        <h3
          className={cn(
            "font-display text-xl md:text-2xl font-bold leading-tight",
            isColored ? "text-current" : "text-foreground"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed",
            isColored ? "text-current/85" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      </div>

      <div
        className={cn(
          "mt-auto flex items-center gap-2 text-sm font-semibold",
          isColored ? "text-current" : "text-primary"
        )}
      >
        <span>اكتشف المحتوى</span>
        <ArrowLeft className="h-4 w-4 transition-smooth group-hover:-translate-x-1" />
      </div>
    </Link>
  );
};
