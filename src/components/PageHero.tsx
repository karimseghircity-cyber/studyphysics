import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";

export type Crumb = { label: string; to?: string };

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
};

export const PageHero = ({ eyebrow, title, description, crumbs, children }: PageHeroProps) => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative py-12 md:py-16">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center flex-wrap gap-1.5 text-xs md:text-sm text-primary-foreground/80">
              <li>
                <Link to="/" className="flex items-center gap-1 hover:text-primary-foreground">
                  <Home className="h-3.5 w-3.5" />
                  الرئيسية
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <ChevronLeft className="h-3.5 w-3.5 opacity-60" />
                  {c.to ? (
                    <Link to={c.to} className="hover:text-primary-foreground">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="text-primary-foreground">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-sm mb-4">
            {eyebrow}
          </span>
        )}

        <h1 className="font-display text-3xl md:text-5xl font-extrabold text-balance leading-tight">
          {title}
        </h1>

        {description && (
          <p className="mt-4 max-w-2xl text-base md:text-lg text-primary-foreground/90 leading-relaxed">
            {description}
          </p>
        )}

        {children && <div className="mt-6">{children}</div>}
      </div>
    </section>
  );
};
